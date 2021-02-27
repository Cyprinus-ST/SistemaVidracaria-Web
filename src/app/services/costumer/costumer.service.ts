import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';
import { CostumerModel,ListCostumerResponse } from '../../models/Costumer/CostumerModel';

@Injectable({
  providedIn: 'root'
})
export class CostumerService {

  token = JSON.parse(localStorage.getItem("token"));
  apiUrl = "http://localhost:20209/api/Costumer";


   httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }),
  };
  
  constructor(private httpClient : HttpClient) { }

    
  public GetAllCostumer(idUser : string): Observable<ListCostumerResponse>{
    return this.httpClient.get<ListCostumerResponse>(
      this.apiUrl + `?idUser=${idUser}`,
      this.httpOptions
    );
  }

  public DeleteCostumer(idCostumer : string): Observable<MessageResponse>{
    return this.httpClient.delete<MessageResponse>(
      this.apiUrl + `?id=${idCostumer}`,
      this.httpOptions
    );
  }

  public GetCostumer(idCostumer : string): Observable<CostumerModel>{
    return this.httpClient.get<CostumerModel>(
      this.apiUrl + `${idCostumer}`,
      this.httpOptions
    )
  }

  public AddCostumer(Costumer : CostumerModel) : Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(
      this.apiUrl,
      Costumer,
      this.httpOptions
    )
  }

  public UpdateCostumer(Costumer : CostumerModel) : Observable<MessageResponse>{
    return this.httpClient.put<MessageResponse>(
      this.apiUrl,
      Costumer,
      this.httpOptions
    )
  }

}
