import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { Router } from '@angular/router';

import { Payment } from 'src/app/model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }

  getPayments() {
    return this.http.get<Response<Payment>>(`${this.Url}` + "/api/PaymentsBackOffice/GetAllPendingPayments", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }


  paymentOne(nickname: string) {
    var body = {
      "nicknames": [nickname]
    };
    return this.http.put<Response<string>>(`${this.Url}` + "/api/PaymentsBackOffice/EndAllPayments", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        if (data["success"]) {
          this.router.navigate(['/backOffice/pagos']);
        }
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }


}
