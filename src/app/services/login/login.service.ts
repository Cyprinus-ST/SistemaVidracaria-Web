import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel,UserResponse } from '../../models/User/UserModel';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  apiUrl = "http://localhost:20209/api/";
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public doLoginUser(user : UserModel) : Observable<UserResponse>{
    return this.httpClient.post<UserResponse>(this.apiUrl + "Login/Login",user,this.httpOptions);
  }

  public registerUser(user: UserModel) : Observable<UserResponse>{
    return this.httpClient.post<UserResponse>(this.apiUrl + "Login/Register",user,this.httpOptions);
  }
}
