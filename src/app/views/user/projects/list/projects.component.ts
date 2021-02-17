import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectTypeModel } from 'src/app/models/Project/ProjectModel';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  collapse: boolean;
  projectsTypes : ProjectTypeModel[];

  constructor(
    private fb : FormBuilder,
    public ProjectService : ProjectService
  ) {
    this.getProjectType();
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

  toggleButton(){
    this.collapse = !this.collapse;
    console.log(this.collapse);
  }
}
