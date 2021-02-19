import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  public showError(message : string){
    return  Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message
    });
  }

  public teste(){
    return "Oi";
  }
}
