import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComplet } from 'src/app/model/UserComplete';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { param } from 'jquery';
import { PlanComplet } from 'src/app/model/PlanComplete';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }

  getPlan() {
    return this.http.get<Response<UserComplet>>(`${this.Url}` + "/api/PlanBackOffice/GetAll", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

  getPlanById(userId: string) {
    let url = `${this.Url}` + "/api/PlanBackOffice/" + userId;
    return this.http.get<Response<UserComplet>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  createPlan(createPlanDto: PlanComplet) {

    var body = {
      createPlanDto
    }
    console.log(body);
    return this.http.post<Response<string>>(`${this.Url}` + "/api/PlanBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
        if (data["success"]) {
          this.router.navigate(['/backOffice/plan']);
        }
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }

  updateUser(user: PlanComplet) {

    var body = {
      "id": user.id,
      "name": user.name,
      "Image": user.image,
      "price": user.price,
      "description": user.description,
      "SubscriptionMsg": user.subscriptionMsg,
      "WelcomeVideoLink": user.welcomeVideoLink,
      "Benefits": user.benefits
    }
    console.log(body);
    return this.http.put<Response<string>>(`${this.Url}` + "/api/PlanBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/backOffice/plan']);

      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  deletePlan(userId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/PlanBackOffice/" + userId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
}
