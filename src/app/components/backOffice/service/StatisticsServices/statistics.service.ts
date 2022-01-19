import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComplet } from 'src/app/model/UserComplete';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { param } from 'jquery';
import { GraphDto } from 'src/app/model/GraphDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }


  getFinancial() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/GetFinances", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  getNewUsers() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/GetNewUsers", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  getCreatorsSubs() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/CreatorsSubs", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  getCreatorCategory() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/CreatorCategory", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

  getLogs() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/GetLogs", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  getSubs() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/CreatorsFollowers", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  getUnsubs() {
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/Statistics/CreatorsUnfollowers", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

}
