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

export class ProjectAddResponse{
    valid : boolean;
    message : string;
    idProject : string;
}

export class ProjectTypeResponse{
    valid: string;
    result : ProjectTypeModel[]
}

export class ProjectTypeModel{
    id: number;
    type: string;
}