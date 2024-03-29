export class FilterProject {
    start: number;
    maxResults: number;
    projectType: number;
    numberGlass: number;
    page: number;
    title: string;
    idUser : string;
}

export class ProjectModel extends Array{
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

export class AddProject {
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

export class GlassColorResponse{
    data: GlassColorModel[];
}

export class AluminiumColorResponse{
    data: AluminiumColorModel[];
}

export class StructureColorResponse{
    data: StructureColorModel[];
}

export class GlassColorModel{
    id: number;
    description : string;
}

export class AluminiumColorModel{
    id: number;
    description : string;
}

export class StructureColorModel{
    id: number;
    description : string;
}