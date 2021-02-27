export class CostumerModel {
    name : string;
    email : string;
    phone : string;
    idUser : string;
    id : string;
    createAt : Date;
    updateAt : Date;
}

export class ListCostumerResponse{
    valid : string;
    message? : string;
    listCostumers : CostumerModel[]
}