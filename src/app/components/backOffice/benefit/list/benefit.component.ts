import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BenefitService } from '../../service/BenefitServices/benefit.service';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {

  listbenefits: any;
  public page: number;
  filterpost = '';
  benefits: any[] = [];

  constructor(private router: Router, private http: BenefitService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getBenefit().subscribe(res => {
      this.benefits = res['obj'];
      console.log(this.benefits);
    });
  }
  onChange($event, id) {
    this.http.deleteBenefit(id);
  }

}
