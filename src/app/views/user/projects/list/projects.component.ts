import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterProject, ProjectModel, ProjectTypeModel } from 'src/app/models/Project/ProjectModel';
import { ProjectService } from 'src/app/services/project/project.service';
import { AlertsService } from 'src/app/services/utils/alerts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  collapse: boolean;
  projectsTypes : ProjectTypeModel[];
  filterForm : FormGroup;
  listProjects : ProjectModel[];

  constructor(
    private fb : FormBuilder,
    public ProjectService : ProjectService,
    public AlertService : AlertsService
  ) {
    this.getProjectType();
    this.initForm();
  }

  getProjectType(): void{
    this.ProjectService.GetProjectType().subscribe(data =>{
      if(data.valid)
        this.projectsTypes = data.result;
      console.log(this.projectsTypes);
    });
  }

  ngOnInit(): void {
    this.collapse = true;
  }

  GetProjects(){
    let filter = new FilterProject();
    filter = this.filterForm.value;

    if(filter.numberGlass === null)
      filter.numberGlass = 0;

    if(filter.projectType === null){
      filter.projectType = 99;
    }

    try{
      this.ProjectService.PostFilterProject(filter).subscribe(response =>{
        if(response.data.length > 0){
          this.listProjects = response.data;
          console.log(this.listProjects)
        }
        else{
          this.AlertService.showError("Não foram encontrados registros com os parâmetros passados!")
        }

      }, ex =>{
        if(ex.status == 401)
          ex.error = "Ocorreu ao autenticar o usuário, por favor faça o login novamente!";
        this.AlertService.showError(ex.error);
      });
    }
    catch(ex){
      console.log(ex);
      this.AlertService.showError(ex.error);
    }

  }

  initForm(): void{
    this.filterForm = this.fb.group({
      title: [
        ""
      ],
      numberGlass:[
        null
      ],
      projectType: [
        null
      ],
      maxResults: [
        10
      ]
    });
  }

  toggleButton(){
    this.collapse = !this.collapse;
    console.log(this.collapse);
  }
}
