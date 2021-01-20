
//Model seguindo exemplo da API, a classe de usuário
export class UserModel{
    id: string;
    Name : string;
    Email : string;
    Password : string;
    CPF : string;
    PathAvatar : string;
    Type : string;
    Street : string;
    Neighborhood : string;
    City : string;
    State : string;
    Country : string;
    Number : string;
    Complement : string;
    Phone : string;
    TokenPassword : string;
    CEP : string;
}

export class UserModelResponse{
    id: string;
    name : string;
    pathAvatar : string;
    type : string;
}

//Classe que é o retorno da api, aonde vem message de erro ou algo do tipo
export class UserResponse{

    authenticated: boolean;
    created? : Date;
    expiration? : Date;
    acessToken? : string;
    message: string;
    user : UserModelResponse;
}

export class UsersDTO {
        name : string;
        email : string;
        cpf: string; 
        type: string; 
        street : string;
        neighborhood : string;
        city : string;
        state : string;
        country : string;
        number : string;
        complement : string;
        phone : string;
        cep : string;
        createAt : Date;
        pathAvatar?: string;

        idPlan : string
        statusPlan : string;
        dateAcquisition : Date;
        dateExpired : Date;
        
        namePlan : string;
        description: string;
        price: number;
        status: string;
}

export class ListUsers {
    users : UsersDTO[];
}

