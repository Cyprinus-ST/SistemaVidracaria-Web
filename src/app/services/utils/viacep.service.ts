import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepModel } from 'src/app/models/ViaCep/CepModel';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  apiUrl = "https://viacep.com.br/ws/";
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getCepData(cep: string): Observable<CepModel>{
    return this.httpClient.get<CepModel>(this.apiUrl + cep + "/json/",this.httpOptions);
  }
}
