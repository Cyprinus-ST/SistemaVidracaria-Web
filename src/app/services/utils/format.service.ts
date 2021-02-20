import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  public formatDate(date){
    
    if(date == null || date == "0001-01-01T00:00:00"){
      return "-";
    }
    else{

      var data = new Date(date),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
      
      return diaF+"/"+mesF+"/"+anoF;
    }
  };
  
  public validType(file){
    const type = file.type;
    if(type == "image/jpeg" || type == "image/png" || type == "image/jpg"){
      return true;
    }
    else{
      return false;
    }
  }
}
