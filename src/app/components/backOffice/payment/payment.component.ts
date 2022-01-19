import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../service/PaymentServices/payment.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  listPayments: any;
  public page: number;
  filterpost = '';
  categorys: any[] = [];

  constructor(private router: Router, private http: PaymentService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getPayments().subscribe(res => {
      console.log(res['obj']);
      this.listPayments = res['obj'];
    });
  }
  borrarPago(nickname) {
    this.http.paymentOne(nickname);
  }

}
