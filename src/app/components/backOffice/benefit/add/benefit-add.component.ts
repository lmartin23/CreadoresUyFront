import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitComplete } from 'src/app/model/BenefitComplete';
import { BenefitService } from '../../service/BenefitServices/benefit.service';

@Component({
  selector: 'app-benefit-add',
  templateUrl: './benefit-add.component.html',
  styleUrls: ['./benefit-add.component.css']
})
export class BenefitAddComponent implements OnInit {

  public idUser: string;
  public message: string;
  public errorMessage: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: BenefitService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
  }


  enviarDatos(description: string) {
    var benefit = new BenefitComplete(description);
    this.http.createBenefit(benefit, this.errorMessage);
  }
}
