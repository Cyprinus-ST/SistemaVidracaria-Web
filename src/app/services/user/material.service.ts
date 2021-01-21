import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListMaterialResponse,MaterialModel } from '../../models/Material/MaterialModel';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {


  token = JSON.parse(localStorage.getItem("token"));
  apiUrl = "http://localhost:20209/api/Material";


   httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }),
  };

  constructor(private httpClient : HttpClient) { }
  
  public GetAllMaterial(idUser : string): Observable<ListMaterialResponse>{
    return this.httpClient.get<ListMaterialResponse>(
      this.apiUrl + `?idUser=${idUser}`,
      this.httpOptions
    );
  }
}
