import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { PlanBasic } from 'src/app/model/PlanBasic';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { name } from 'src/app/model/name';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  visualizan: string[] = ['Público', 'Sólo suscriptores','Seleccionar Suscripción'];
  tipoSuscripcion: PlanBasic[] = [];
  tipoSuscripcionId:number[] = [];
  contSelec: string;
  focus; focus1;
  tipovisAsig: 'Público' | 'Sólo suscriptores' | 'Seleccionar Suscripción'; 
  tipoSusAsig: string;

  labelPosition: 'Si' | 'No' = 'No';
  today:Date = new Date();

  @ViewChild('date') myDate: ElementRef<HTMLInputElement>;
  @ViewChild('time') myTime: ElementRef<HTMLInputElement>;
  editor= ClassicEditor;
  draft:CreatorContent;
  textArea:string = '';
  title:string = '';
  tags: string[] = [];
  draftDate:Date;
  publishDate:string = this.datepipe.transform(this.today, 'yyyy-MM-dd');
  publishTime:string = '00:00';
  inputDate:Date = new Date();
  inputTime:string = '00:00'
  publishDateComplet:Date;
  plansId:number[] = [];

  titleValidator:boolean=true;
  timeAlert:boolean=true;
  dateAlert:boolean=false;

  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private router:Router, private http:CreatorServiceService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem('token')!=null && (sessionStorage.getItem('userType')=='creator' || sessionStorage.getItem('userType')=='admin'))){
      this.router.navigate(['/home']);
    }
    this.getPlanBasic();
    this.http.getDraft(sessionStorage.getItem('nickname')).subscribe(res => {
      if(res['success']){
        this.draft = res['obj'];
        this.title = this.draft.title;
        this.setArticleContent(this.draft.description);
        this.textArea = this.draft.description;
        this.textArea= this.draft.dato;
        if(res['obj']['dato']!='' && res['obj']['type']==1){
          this.textArea = this.draft.description;
          this.textArea= this.draft.dato;
        }else{
          this.draft.dato= '';
        }
        if(JSON.stringify(res['obj']['tags'])!=='[]'){
          this.draft.tags.forEach(element => {
            this.tags.push(element.name);
          });
        }else{
          this.tags.push('Arte');
          this.draft.tags.push(new name('Arte'));
          this.http.updateDraft(this.draft).subscribe();
        }
        if(this.draft['isPublic']){
          this.tipovisAsig = 'Público';
        }else if(this.draft.plans.sort().join(',') === this.tipoSuscripcionId.sort().join(',')){
          this.tipovisAsig = 'Sólo suscriptores';
        }else{
          this.tipovisAsig = 'Seleccionar Suscripción';
          this.draft.plans = [];
          this.draft.plans.push(0);
        }
        var date = new Date (this.draft.publishDate);
        var time = this.datepipe.transform(this.draft.publishDate, 'HH:mm');
        if(date > this.today){
          this.labelPosition = 'Si';
          this.inputDate = date;
          this.inputTime = time;
        }else{
          this.labelPosition = 'No';
        }
        console.log(this.draft); 
        console.log(1);
        this.draft.type = 1;
      }else{
        this.draft = res['obj']; this.draft.nickName=sessionStorage.getItem('nickname'); this.draft.idCreator = parseInt(sessionStorage.getItem('creatorId'));
        this.draft.type = 1; this.draft.plans.push(0); this.draft.draft = true; this.draft.Public =false; this.draft.publishDate = this.today;
        this.http.getNewDraft(this.draft).subscribe(res1 =>{
          if(res1['success']){
            this.draft = res1['obj'];
            console.log(res1);
            console.log(this.draft);
            this.title = this.draft.title;
            this.setArticleContent(this.draft.description);
            this.textArea = this.draft.description;
            this.textArea= this.draft.dato;
            if(JSON.stringify(res1["obj"]['tags'])!=='[]'){
              this.draft.tags.forEach(element => {
                this.tags.push(element.name);
              });
            }else{
              this.tags.push('Arte');
              this.draft.tags.push(new name('Arte'));
              this.http.updateDraft(this.draft).subscribe();
            }
          }
          console.log(this.draft); 
          console.log(2); 
        });
      }
    });
  }

  

  @ViewChild('textarea') myEditor: any;
  getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }
    return '';
  }

  setArticleContent(content:string) {
    this.myEditor.editorInstance.setData(content);
  }

  getPlanBasic(){
    this.http.getPlanBasic(sessionStorage.getItem('nickname')).subscribe(res=>{
      if(res['success']){
        res['obj'].forEach(element => {
          this.tipoSuscripcion.push(element);
          this.tipoSuscripcionId.push(element.id);
        });
      }
    });
  }

  getTitle(title:string){
    this.title = title;
  }

 

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    var member = false;
    this.tags.forEach(element => {
      if(element.toLowerCase()==value.toLowerCase()){
        member=true;
      }
      console.log(member);
    });
    if(!member){
      if (value) {
        this.tags.push(value);
        this.draft.tags.push(new name(value));
        console.log(this.draft);
      }
      event.value!='';
      this.tagControl.setValue(null);
      this.http.updateDraft(this.draft).subscribe();
    }else{
      event.value!='';
      this.tagControl.setValue(null);
      alert('Etiqueta ya agregada');
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.draft.tags.splice(index, 1,);
      this.http.updateDraft(this.draft).subscribe();
    }
  }

  updateTitle(){
    if(this.title != ''){
      this.draft.title = this.title;
      this.http.updateDraft(this.draft).subscribe();
    }else{
      this.title = this.draft.title;
    }
  }

 

  updateDescription(){
    this.textArea = this.getArticleContent();
    if(this.textArea != ''){
      this.draft.description = this.textArea;
      this.draft.dato = this.textArea;
      this.http.updateDraft(this.draft).subscribe();
    }else{
      this.textArea = this.draft.description;
      this.textArea = this.draft.dato;
      this.setArticleContent(this.draft.description);
    }
  }

  checkDate(date:string){
    if(date<this.datepipe.transform(this.today, 'yyyy-MM-dd')){
      this.dateAlert = true;
    }else{
      this.dateAlert=false;
      this.publishDate = date;
      var yyyy = this.publishDate.split('-',3);
      var time = this.publishTime.split(':',2);
      this.publishDateComplet = new Date(parseInt(yyyy[0]),parseInt(yyyy[1]),parseInt(yyyy[2]),parseInt(time[0]),parseInt(time[1]),0);
      this.draft.publishDate = this.publishDateComplet;
      console.log(this.draft)
      this.http.updateDraft(this.draft).subscribe();
      console.log(this.publishDateComplet)
    }
  }

  checkTime(time:string){
    console.log(this.draft);
    console.log((time + ':00'));
    if(this.myDate.nativeElement.value==this.datepipe.transform(this.today, 'yyyy-MM-dd')){
      var curretHour = new Date().getHours();
      var curretMin = new Date().getMinutes();
      if(parseInt(curretHour.toString())>(parseInt(time.substring(0,2))) 
      ||(parseInt(curretHour.toString())==(parseInt(time.substring(0,2))) 
      && parseInt(curretMin.toString())>(parseInt(time.substring(3,5))))){
        this.timeAlert=false;
      }else{
        this.timeAlert = true;
        this.publishTime= time;
        var yyyy = this.publishDate.split('-',3);
        var hh = this.publishTime.split(':',2);
        this.publishDateComplet = new Date(parseInt(yyyy[0]),parseInt(yyyy[1]),parseInt(yyyy[2]),parseInt(hh[0]),parseInt(hh[1]),0);
        this.draft.publishDate = this.publishDateComplet;
        this.http.updateDraft(this.draft).subscribe();
        console.log(this.draft)
      }
    }else if(this.myDate.nativeElement.value<this.datepipe.transform(this.today, 'yyyy-MM-dd') || this.dateAlert){
      this.timeAlert=false;
    }else{
      this.timeAlert=true;
      this.publishTime = time;
      var yyyy = this.publishDate.split('-',3);
      var hh = this.publishTime.split(':',2);
      this.publishDateComplet = new Date(parseInt(yyyy[0]),parseInt(yyyy[1]),parseInt(yyyy[2]),parseInt(hh[0]),parseInt(hh[1]),0);
      this.draft.publishDate = this.publishDateComplet;
      this.http.updateDraft(this.draft).subscribe();
      console.log(this.draft)
    }
  }

  changeComboo(event) {
    console.log('chnaged',event.value);
    this.draft.plans = [];
    this.draft.plans.push(0);
    if(event.value === 'Público'){
      this.draft['isPublic']=true;
    }else if(event.value == 'Sólo suscriptores'){
      this.draft.plans = [];
      this.tipoSuscripcion.forEach(element => {
        this.draft.plans.push(element.id);
      });
      this.draft.Public=false;
    }else{
      this.draft.Public=false;
    }
    this.http.updateDraft(this.draft).subscribe();
  }

  resetDate(event){
    if(event.value === 'No'){
      this.draft.publishDate = new Date();
      this.http.updateDraft(this.draft).subscribe();
    }
  }

  changePlan(plan:PlanBasic){
    var member = false;
    if(this.draft.plans[0] === 0){
      this.draft.plans = [];
    }
    this.plansId.forEach(element => {
      if(element==plan.id){
        member=true;
        const index = this.plansId.indexOf(element);
        const index1 = this.draft.plans.indexOf(element);
        this.plansId.splice(index, 1);
        this.draft.plans.splice(index, 1);
        console.log(this.draft.plans)
      }
    });
    if(!member){
      this.plansId.push(plan.id);
      this.draft.plans.push(plan.id);
      console.log(this.draft.plans)
    }
    if(this.draft.plans.length === 0){
      this.draft.plans.push(0);
    }
    console.log(this.draft.plans);
    this.http.updateDraft(this.draft).subscribe();
  }

  contentUpdate(){
    if((this.labelPosition == 'Si' && this.draft.publishDate>this.today) || this.labelPosition=='No'){
      if(this.draft.plans[0] !=0 || this.draft['isPublic']){
          this.draft.draft=false;
          this.http.updateDraft(this.draft).subscribe();
          this.router.navigate(['/creator-Profile', sessionStorage.getItem('nickname')]);
      }
    }
  }
}
