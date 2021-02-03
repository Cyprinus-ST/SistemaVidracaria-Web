import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListProviderResponse, MessageResponse, ProviderModel } from 'src/app/models/Provider/ProviderModel';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  
  token = JSON.parse(localStorage.getItem("token"));
  apiUrl = "http://localhost:20209/api/Provider";


   httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }),
  };
  
  constructor(private httpClient : HttpClient) { }

  public GetAllProvider(idUser: string): Observable<ListProviderResponse>{
    return this.httpClient.get<ListProviderResponse>(
      this.apiUrl + `?idUser=${idUser}`,
      this.httpOptions
    );
  }

  public DeleteProvider(idProvider : string): Observable<MessageResponse>{
    return this.httpClient.delete<MessageResponse>(
      this.apiUrl + `?Id=${idProvider}`,
      this.httpOptions
    );
  }

  
  public GetProvider(idProvider : string): Observable<ProviderModel>{
    return this.httpClient.get<ProviderModel>(
      this.apiUrl + `${idProvider}`,
      this.httpOptions
    )
  }

  public AddProvider(provider : ProviderModel) : Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(
      this.apiUrl,
      provider,
      this.httpOptions
    )
  }

  public UpdateProvider(provider : ProviderModel) : Observable<MessageResponse>{
    return this.httpClient.put<MessageResponse>(
      this.apiUrl,
      provider,
      this.httpOptions
    )
  }
}
