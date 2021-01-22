import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';
import { AddPlanInput } from 'src/app/models/Plan/inputs/AddPlanInput';
import { PlanModel } from 'src/app/models/Plan/PlanModel';
import { UpdatePlanInput } from 'src/app/models/Plan/inputs/UpdatePlanInput';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  token = JSON.parse(localStorage.getItem("token"));

  apiUrl = "http://localhost:20209/api/";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.token
    }),
  };

  constructor(private httpClient : HttpClient) { }

  public addPlan(plan: AddPlanInput): Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(
      this.apiUrl + "Plan",
      plan,
      this.httpOptions
    );
  }

  public listPlan(): Observable<Array<PlanModel>>{
    return this.httpClient.get<Array<PlanModel>>(
      this.apiUrl + "Plan", this.httpOptions
    );
  }

  public updatePlan(idPlan: String, input: UpdatePlanInput): Observable<MessageResponse>{
    return this.httpClient.put<MessageResponse>(
      this.apiUrl + "Plan/"+idPlan, input, this.httpOptions
    );
  }
}
