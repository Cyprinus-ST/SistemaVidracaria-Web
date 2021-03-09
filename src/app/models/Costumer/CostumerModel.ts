export class CostumerModel extends Array {
    Name : string;
    Email : string;
    Phone : string;
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