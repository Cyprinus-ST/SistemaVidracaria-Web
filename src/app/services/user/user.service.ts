import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse, FileMessageResponse } from 'src/app/models/Response/MessageResponse';
import { UserModel } from 'src/app/models/User/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  token = JSON.parse(localStorage.getItem("token"));

  apiUrl = "http://localhost:20209/api/";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.token
    }),
  };

  httpOptionsFormData = {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + this.token
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

  public updateAvatarFile(formData: FormData):Observable<FileMessageResponse>{
    return this.httpClient.post<FileMessageResponse>(
      this.apiUrl + "User/uploadFile",
      formData,
      this.httpOptionsFormData
    );
  }
}
