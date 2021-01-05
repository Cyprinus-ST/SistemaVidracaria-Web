export class ForgotPasswordInput {

  Email: string;
}

export class ForgotPasswordResponse {
  
  sentEmail: boolean;
  message: string;
}