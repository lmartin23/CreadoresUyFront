import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Plan } from 'src/app/model/Plan';
import { Router } from '@angular/router';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { FormControl } from '@angular/forms';
import { PlanPost } from 'src/app/model/PlanPost';
import { PlanAndNickname } from 'src/app/model/PlanAndNickname';

@Component({
  selector: 'app-planconfig',
  templateUrl: './planconfig.component.html',
  styleUrls: ['./planconfig.component.css'],
})
export class CreateplanComponent implements OnInit {

@ViewChild('textarea') myEditor: any;
@ViewChild('textareaEdit') myEditorEdit: any;
@ViewChild('titleEdit') myTitle: ElementRef<HTMLInputElement>;
@ViewChild('priceEdit') myPrice: ElementRef<HTMLInputElement>;
@ViewChild('mensajeEdit') myMensaje: ElementRef<HTMLInputElement>;
@ViewChild('linkEdit') myLink: ElementRef<HTMLInputElement>;
@ViewChild('profileEdit') myProfile: ElementRef<HTMLInputElement>;
@ViewChild('benefitInputEdit') myBenefitEdit: ElementRef<HTMLInputElement>;
@ViewChild('benefitInput') myBenefit: ElementRef<HTMLInputElement>;
plans:Plan[] = [];
actualPlan:Plan;
addPlan:boolean = false;
editPlan:boolean= false;
textArea:string = '';
textAreaEdit:string=''
editor= ClassicEditor;
urls:string[] = [''];
base64:string[] = [''];
actualImage:string = '';
showBar:boolean=false;
planId:number;

benefitsControl = new FormControl();
benefitsControlEditor = new FormControl();

benefits: string[] = [];

constructor(private router:Router, private http:CreatorServiceService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if(token==null || sessionStorage.getItem('userType')!='creator'){ 
       this.router.navigate(['/home']);
     }
    this.plans=[];
    this.http.getPlanByCreator(sessionStorage.getItem('creatorId')).subscribe(res =>{
      console.log(res)
      res['obj'].forEach(element => {
        this.plans.push(element);
      });
      this.plans.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    });
  }

  displayAddForm(){
    this.http.getDefaultBenefits().subscribe(res=>{
      this.benefits=res['obj'];
    });
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); 
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 12);
    this.addPlan = true;
  }

  displayPlanEditor(plan:Plan){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); 
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 12);
    this.editPlan=true;
    this.http.getDefaultBenefits().subscribe(res=>{
      this.benefits=res['obj'];
      plan.benefits.forEach(element => {
        if(!this.benefits.includes(element)){
          this.benefits.push(element);
        }
      });
      this.benefitsControlEditor.setValue(plan.benefits);
      console.log(plan);
      this.myTitle.nativeElement.value=plan.name;
      this.myPrice.nativeElement.value=plan.price.toString();
      this.myMensaje.nativeElement.value=plan.subscriptionMsg;
      this.myLink.nativeElement.value=plan.welcomeVideoLink;
      this.urls[1]=plan.image;
      this.actualImage = plan.image;
      this.setArticleContent(plan.description);
      this.planId=plan.idPlan;
    });
  }

  displayCard(){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); 
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 12);
    this.addPlan = false;
    this.editPlan=false;
    this.benefits=[];
  }

  getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }
    return '';
  }

  getArticleContentEdit() {
    if (this.myEditorEdit && this.myEditorEdit.editorInstance) {
      return this.myEditorEdit.editorInstance.getData();
    }
    return '';
  }

  setArticleContent(content:string) {
    this.myEditorEdit.editorInstance.setData(content);
  }

  detectFiles(event) {
    let files = event.target.files;
    if (files.length > 1) {
      alert("You can select only 1 images");
    }else{
      let reader = new FileReader();
      if(event.target.id == "formFileLg"){
        reader.onload = (e: any) => {
          this.urls[0]=(e.target.result);
          var n = e.target.result.lastIndexOf(',');
          this.base64[0]=(e.target.result.substring(n + 1));
        }
        reader.readAsDataURL(files[0]); 
      }else{
        reader.onload = (e: any) => {
          this.urls[1]=(e.target.result);
          var n = e.target.result.lastIndexOf(',');
          this.base64[1]=(e.target.result.substring(n + 1));
          console.log(this.urls[1]);
        }
        reader.readAsDataURL(files[0]); 
      }
    }
  }

  addBenefit(){
    if (this.myBenefit.nativeElement.value != ''){
      this.benefits.push(this.myBenefit.nativeElement.value);
      this.myBenefit.nativeElement.value='';
    }
  }

  addBenefitEdit(){
    if (this.myBenefitEdit.nativeElement.value != ''){
      this.benefits.push(this.myBenefitEdit.nativeElement.value);
      this.myBenefitEdit.nativeElement.value='';
    }
  }

  crearPlan(title:string,price:string,link:string,mensaje:string){
    if(title!='' && price!=''){
      var planPost = new PlanPost();
      planPost.name = title; planPost.price=parseFloat(price),planPost.welcomeVideoLink=link; planPost.subscriptionMsg=mensaje;
      planPost.description=this.getArticleContent(); planPost.benefits=this.benefitsControl.value; planPost.image=this.base64[0];
      var newPlan = new(PlanAndNickname);
      newPlan.nickname=sessionStorage.getItem('nickname');
      newPlan.pandB=planPost;
      console.log(newPlan);
      this.showBar=true;
      this.http.postPlan(newPlan).subscribe(res=>{
        console.log(res);
        this.addPlan=false;
        this.showBar=false;
        this.ngOnInit();
      })
    }
  }

  EditarPlan(){
    var newPlan = new Plan();
    newPlan.idPlan=this.planId; newPlan.description=this.getArticleContentEdit(); newPlan.name=this.myTitle.nativeElement.value;
    newPlan.price=parseFloat(this.myPrice.nativeElement.value); newPlan.subscriptionMsg=this.myMensaje.nativeElement.value;
    newPlan.welcomeVideoLink=this.myLink.nativeElement.value; newPlan.benefits=this.benefitsControlEditor.value;
    if(this.actualImage == this.urls[1]){
      newPlan.image='';
    }else{
      newPlan.image=this.base64[1];
    }
    this.showBar=true;
    this.http.updatePlan(sessionStorage.getItem('nickname'),newPlan).subscribe(res=>{
      console.log(res);
      this.editPlan=false;
      this.showBar=false;
      this.ngOnInit();
    });
  }
}
