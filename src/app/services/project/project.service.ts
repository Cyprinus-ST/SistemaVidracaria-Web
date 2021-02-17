import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectTypeResponse } from 'src/app/models/Project/ProjectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  token = JSON.parse(localStorage.getItem("token"));
  apiUrl = "http://localhost:20209/api/Project";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }),
  };

  constructor(private httpClient : HttpClient) { }

  public GetProjectType() : Observable<ProjectTypeResponse>{
    return this.httpClient.get<ProjectTypeResponse>(
      this.apiUrl + "/ProjectType",
      this.httpOptions
    );
  }
}
