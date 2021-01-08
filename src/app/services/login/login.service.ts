import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { UserModel, UserResponse } from "../../models/User/UserModel";
import {
  ForgotPasswordInput,
  ForgotPasswordResponse,
} from "src/app/models/inputs/forgotPasswordInput";
import { LoginInput } from "src/app/models/inputs/loginInput";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  apiUrl = "http://localhost:20209/api/"; 

  httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public doLoginUser(user: LoginInput): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      this.apiUrl + "Login/",
      user,
      this.httpOptions
    );
  }

  public registerUser(user: UserModel): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      this.apiUrl + "Login/register",
      user,
      this.httpOptions
    );
  }

  public forgotPassword(
    input: ForgotPasswordInput
  ): Observable<ForgotPasswordResponse> {

    return this.httpClient.put<ForgotPasswordResponse>(
      this.apiUrl + "Login/forgotPassword?email="+input.Email,
      { headers: this.httpHeaders }
    );
  }
}
