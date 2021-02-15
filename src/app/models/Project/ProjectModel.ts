import { ProjectsComponent } from "src/app/views/user/projects/projects.component";

export class FilterProject {
    start: number;
    maxResults: number;
    projectType: number;
    numberGlass: number;
    page: number;
    title: string;
}

export class ProjectModel{
    title: string;
    numberGlass: number;
    descripition: string;
    idUser: string;
    imageUrl: string;
    projectType: string;
    id: string;
    createAt: Date;
    updateAt: Date;
}

export class FilterProjectResponse {
    data : ProjectModel[];
    pages : number;
    actualPage : number;
}