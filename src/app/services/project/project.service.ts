import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProject, AluminiumColorResponse, FilterProject, FilterProjectResponse, GlassColorResponse, ProjectAddResponse, ProjectTypeResponse, StructureColorResponse } from 'src/app/models/Project/ProjectModel';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';

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

  httpOptionsFormData = {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + this.token
    }),
  };

  constructor(private httpClient : HttpClient) { }

  public GetProjectType() : Observable<ProjectTypeResponse>{
    return this.httpClient.get<ProjectTypeResponse>(
      this.apiUrl + "/ProjectType",
      this.httpOptions
    );
  }

  public GetGlassColor() : Observable<GlassColorResponse>{
    return this.httpClient.get<GlassColorResponse>(
      this.apiUrl + "/GlassColor",
      this.httpOptions
    );
  }

  public GetAluminiumColor() : Observable<AluminiumColorResponse>{
    return this.httpClient.get<AluminiumColorResponse>(
      this.apiUrl + "/AluminiumColor",
      this.httpOptions
    );
  }

  public GetStructureColor() : Observable<StructureColorResponse>{
    return this.httpClient.get<StructureColorResponse>(
      this.apiUrl + "/StructureColor",
      this.httpOptions
    );
  }

  
  public PostFilterProject(filterProject : FilterProject): Observable<FilterProjectResponse>{
    return this.httpClient.post<FilterProjectResponse>(
      this.apiUrl + "/ListFiltered",
      filterProject,
      this.httpOptions,
    )
  }

  public PostProject(project : AddProject) : Observable<ProjectAddResponse>{
    return this.httpClient.post<ProjectAddResponse>(
        this.apiUrl,
        project,
        this.httpOptions
      );
  }
  
  public PutProject(project : AddProject): Observable<MessageResponse>{
    return this.httpClient.put<MessageResponse>(
      this.apiUrl,
      project,
      this.httpOptions
    );
  }

  public UploadFile(formData : FormData) : Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(
      this.apiUrl + "/uploadFile",
      formData,
      this.httpOptionsFormData
    );
  }

  public DeleteProject(idProject : string) : Observable<MessageResponse>{
    return this.httpClient.delete<MessageResponse>(
      this.apiUrl + "?ID=" + idProject,
      this.httpOptions
    )
  }

}
