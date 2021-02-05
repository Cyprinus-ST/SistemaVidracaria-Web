import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListMaterialResponse,MaterialModel,MessageResponse } from '../../models/Material/MaterialModel';

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

  public DeleteMaterial(idMaterial : string): Observable<MessageResponse>{
    return this.httpClient.delete<MessageResponse>(
      this.apiUrl + `?id=${idMaterial}`,
      this.httpOptions
    );
  }

  public GetMaterial(idMaterial : string): Observable<MaterialModel>{
    return this.httpClient.get<MaterialModel>(
      this.apiUrl + `${idMaterial}`,
      this.httpOptions
    )
  }

  public AddMaterial(material : MaterialModel) : Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(
      this.apiUrl,
      material,
      this.httpOptions
    )
  }

  public UpdateMaterial(material : MaterialModel) : Observable<MessageResponse>{
    return this.httpClient.put<MessageResponse>(
      this.apiUrl,
      material,
      this.httpOptions
    )
  }
}
