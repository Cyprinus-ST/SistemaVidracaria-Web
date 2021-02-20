import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel, ProjectTypeModel } from 'src/app/models/Project/ProjectModel';
import { ProjectService } from 'src/app/services/project/project.service';
import { AlertsService } from 'src/app/services/utils/alerts.service';
import { FormatService } from 'src/app/services/utils/format.service';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {

  type: string;
  backRoute : string; 
  formGroup: FormGroup;
  idUser: string;
  submited : boolean;
  error = {
    show : false,
    message: ""
  };
  projectsTypes : ProjectTypeModel[];
  constructor(
    public activedRoute: ActivatedRoute,
    public router : Router,
    private fb : FormBuilder,
    public ProjectService : ProjectService,
    public AlertService : AlertsService,
    public FormatService : FormatService
  ) { 
    this.initForm();
    this.getProjectType();
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.idUser = user.id;
    this.activedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.backRoute = params['backRoute'];
    });
    this.submited = false;
  }

  initForm(): void{

    this.formGroup = this.fb.group({
      Title : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      ],
      NumberGlass : [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      Descripition: [
        "",
        Validators.compose([
          Validators.maxLength(300)
        ])
      ],
      ProjectType: [
        Validators.compose([
          Validators.required
        ])
      ],
      ImageUrl: ['']
    });

  }

  getProjectType(): void{
    this.ProjectService.GetProjectType().subscribe(data =>{
      if(data.valid)
        this.projectsTypes = data.result;
      console.log(this.projectsTypes);
    });
  }

  closeError(){
    this.error.show = false;
    this.error.message= "";
  }

  openError(message : string){
    this.error.show = true;
    this.error.message= message;
  }

  goBack(){
    this.router.navigate([this.backRoute]);
  }

  submit(){
    
    try{
      
      this.submited = true;
      let project = new ProjectModel();
      
      project.descripition =  this.formGroup.get('Descripition').value;
      project.numberGlass = this.formGroup.get('NumberGlass').value;
      project.projectType = this.formGroup.get('ProjectType').value;
      project.title = this.formGroup.get('Title').value;
      project.idUser = this.idUser;
      project.imageUrl = null;
      
      this.ProjectService.PostProject(project).subscribe(data =>{
        if(data.valid){
          const file = this.formGroup.get('ImageUrl').value;
          if(file != "" && file != null){
            if(this.FormatService.validType(file)){ 
              const formData = new FormData();
              formData.append('file',file);
              formData.append('idUser',project.idUser);
              formData.append('idProject',data.idProject);

              this.ProjectService.UploadFile(formData).subscribe(data =>{
                console.log(data);
              });

            }else{
              this.AlertService.showError("A imagem deve ser no formato .PNG, .JPG ou .JPEG!");
            }
          }
          else{
            this.AlertService.showSucess("Projeto Cadastrado com sucesso!");
          }
        }
        else{
          this.AlertService.showError(data.message);
        }
      },ex => {
        if(ex.status == 401)
          this.AlertService.errorAutenticacao();
        this.AlertService.showError(ex.error);
      });
    }
    catch(ex){
      this.AlertService.showError(ex);
    } 
  }

  onFileChange(event){

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        ImageUrl: file
      });
    }

  }

}
