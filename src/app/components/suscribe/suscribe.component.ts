import { Component, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { Plan } from 'src/app/model/Plan';
import { ActivatedRoute, Router } from '@angular/router';
import { userServices } from 'src/app/services/UserServices/userServices';
import { dto } from 'src/app/model/dto';
import { SharedService } from 'src/app/services/SharedServices/shared.service';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.component.html',
  styleUrls: ['./suscribe.component.css']
})

export class SuscribeComponent implements OnInit {
  @ViewChild('closeButton') closebutton;
  closeResult: string;
  modalReference:any;
  show = false;
  nickname:string = '';
  plans:Plan[] = [];
  public payPalConfig?: IPayPalConfig;
  planActual:number = 0;
  success:boolean=false;
  

  constructor(private router:Router, private route:ActivatedRoute, private modalService: NgbModal, private creatorServices:CreatorServiceService, private userServices:userServices) {}

  ngOnInit(): void {
    this.plans = [];
    this.nickname = this.route.snapshot.paramMap.get('nickname');
    console.log(this.nickname);
    this.creatorServices.getPlanToUser(sessionStorage.getItem('userId'),this.nickname).subscribe(res =>{
      console.log(res)
      res['obj']['plans'].forEach(element => {
        this.plans.push(element);
      });
      this.planActual = res['obj']['subscribedTo'];
      this.plans.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
      console.log(this.plans);
      console.log(this.planActual);
    });
  }

  private initConfig(price:number, planId:number): void {
    const headers = {
      'Accept': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token'
    };
    var precio = (Math.round(price * 100)/100).toString();
    console.log(planId);
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AR6r31Q1-UBExv3N0jKTOAJBVR0s7lFj9peXOxgf_1opCSdk9On_TtR2VVDdukqlOeSb2DYjYxyRWALR',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: precio,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: precio
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: precio,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        if(this.planActual!=0){
          this.userServices.unSuscriber(sessionStorage.getItem('userId'),this.planActual).subscribe(res=>{
            console.log(res)
            var payment = parseFloat(data.purchase_units[0].amount.value)
            var dato = new dto();
            dato.idUser = parseInt(sessionStorage.getItem('userId'));
            dato.idPlan=planId; dato.nickName=this.nickname; dato.paymentAmount=payment; dato.externalPaymentId=data.id;
            console.log(dato);
            this.userServices.suscriber(dato).subscribe(res1=>{
              console.log(res1);
              this.onSave();
              this.success=true;
              sessionStorage.setItem('idPlan', dato.idPlan.toString());
              this.router.navigate(['/creator-Profile', this.nickname]);
            });
          });
        }else{
          var payment = parseFloat(data.purchase_units[0].amount.value)
          var dato = new dto();
          dato.idUser = parseInt(sessionStorage.getItem('userId'));
          dato.idPlan=planId; dato.nickName=this.nickname; dato.paymentAmount=payment; dato.externalPaymentId=data.id;
          console.log(dato);
          this.userServices.suscriber(dato).subscribe(res=>{
            console.log(res);
            this.onSave();
            sessionStorage.setItem('idPlan', dato.idPlan.toString());
            this.router.navigate(['/creator-Profile', this.nickname]);
          });
        }
      },
      onCancel: (data, actions) => {
      },
      onError: err => {
      },
      onClick: (data, actions) => {
      },
    };
  }
    
  triggerModal(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public onSave() {
    this.modalReference.close();
  }
}
