import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { Router } from '@angular/router';

import { BenefitComplete } from 'src/app/model/BenefitComplete';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }

  getBenefit() {
    return this.http.get<Response<BenefitComplete>>(`${this.Url}` + "/api/BenefitBackOffice/GetAll", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

  getBenefitById(BenefitId: string) {
    let url = `${this.Url}` + "/api/BenefitBackOffice/" + BenefitId;
    return this.http.get<Response<BenefitComplete>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  createBenefit(Benefit: BenefitComplete, errorMsg: any) {

    var body = {
      "description": Benefit.description
    }
    console.log(body);
    return this.http.post<Response<string>>(`${this.Url}` + "/api/BenefitBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        if (data["success"]) {
          this.router.navigate(['/backOffice/beneficio']);
          errorMsg = false;
        } else {
          errorMsg = "Error: Ya existe una categoría con ese nombre";
        }
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        errorMsg = "Error al ingresar la categoría";
        console.error('There was an error!', error);
      }
    });;
  }

  updateBenefit(Benefit: BenefitComplete) {
    var body = {
      "id": Benefit.id,
      "description": Benefit.description,
      "deleted": Benefit.deleted
    }
    console.log(body);
    return this.http.put<Response<string>>(`${this.Url}` + "/api/BenefitBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        if (data["success"]) {
          this.router.navigate(['/backOffice/beneficio']);
        }
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  deleteBenefit(BenefitId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/BenefitBackOffice/" + BenefitId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
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
