export class MaterialModel {
    name : string;
    amount : number;
    idUser : string;
    id : string;
    createAt : Date;
    updateAt : Date;
}

export class ListMaterialResponse{
    valid : string;
    message? : string;
    listMaterial : MaterialModel[]
}

export class MessageResponse {
    valid : string;
    message: string;
}