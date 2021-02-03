export class MessageResponse {
    valid : string;
    message: string;
}

export class ProviderModel {
    id : string
    name : string
    email : string
    phone : string
    description : string
    idUser : string
}

export class ListProviderResponse{
    valid : string;
    message? : string;
    listProvider : ProviderModel[]
}
