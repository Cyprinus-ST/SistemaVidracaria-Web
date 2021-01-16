
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

//Classe que é o retorno da api, aonde vem message de erro ou algo do tipo
export class UserResponse{

    authenticated: boolean;
    created? : Date;
    expiration? : Date;
    acessToken? : string;
    message: string;
    user : UserModel;
}

export class UsersDTO {
        Name : string;
        Email : string;
        CPF: string; 
        Type: string; 
        Street : string;
        Neighborhood : string;
        City : string;
        State : string;
        Country : string;
        Number : string;
        Complement : string;
        Phone : string;
        CEP : string;
        CreateAt : Date;

        IdPlan : string
        StatusPlan : string;
        DateAcquisition : Date;
        DateExpired : Date;
        
        NamePlan : string;
}

export class ListUsers {
    users : UsersDTO[];
}

