import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../service/planServices/plan.service';

@Component({
  selector: 'app-category',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  listusers: any;
  public page: number;
  filterpost = '';
  plans: any[] = [];

  constructor(private router: Router, private http: PlanService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getPlan().subscribe(res => {
      this.plans = res['obj'];
    });
  }
  onChange($event, id) {
    this.http.deletePlan(id);
  }

}
