import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';
import { UserModel } from 'src/app/models/User/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:20209/api/";

  httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  
  constructor(private httpClient : HttpClient) { }

  public updateUser(user: UserModel): Observable<MessageResponse>{
    return this.httpClient.put<MessageResponse>(
      this.apiUrl + "User",
      user,
      this.httpOptions
    );
  }
}
