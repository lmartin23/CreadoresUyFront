import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitComplete } from 'src/app/model/BenefitComplete';
import { BenefitService } from '../../service/BenefitServices/benefit.service';

@Component({
  selector: 'app-benefit-edit',
  templateUrl: './benefit-edit.component.html',
  styleUrls: ['./benefit-edit.component.css']
})
export class BenefitEditComponent implements OnInit {

  public idBenefit: string;
  public benefit: BenefitComplete;

  constructor(private router: Router, private route: ActivatedRoute, private http: BenefitService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
    this.idBenefit = this.route.snapshot.paramMap.get('idCategoria');
    this.BenefitLoader();
  }

  BenefitLoader() {
    this.http.getBenefitById(this.idBenefit).subscribe(res => {
      console.log(res);
      this.benefit = res['obj'];
      console.log(this.benefit);
    })
  }

  verDatos(input: string) {
    console.log(input);
  }

  enviarDatos(description: string) {
    var benefit = new BenefitComplete(description);
    benefit.id = this.benefit.id;
    benefit.deleted = this.benefit.deleted;

    this.http.updateBenefit(benefit);
  }
}
