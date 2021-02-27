import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  public showError(message : string){

    if(message == null || message == "")
      message = "Ocorreu um erro ao processar sua requisição! Tente novamente mais tarde!";
      
    return  Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message
    });
  }

  public showSucess(message: string){
    return Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: message
    });
  }
  
  public errorAutenticacao(){
    return  Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Ocorreu ao autenticar o usuário, por favor faça o login novamente!'
    });
  }
}
