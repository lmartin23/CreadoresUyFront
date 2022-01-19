import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { userServices } from 'src/app/services/UserServices/userServices';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { ContentViwer } from 'src/app/model/ContentViwer';
import { Subscriptions } from 'src/app/model/Subscriptions';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  focus; focus1;

  public idCreator:string;
  public subs:any[];
  public stopped:boolean = true;
  public filterByCreator:boolean = false;
  public nPage:string = "0";
  public contentNumer:string = "15";
  public genericLoaded:boolean = false;
  public genericContent = new CreatorContent("999999999","Bienvenido a creadoresUy " + this.getUserNickname(), "Le recomendamos que revise algunos perfiles de creadores que le puedan interesar através de la busqueda por categorias en el buscador!",9999,"",
        (new Date()),false,(new Date()),true,"","","./assets/img/brand/1.jpg",0);
  public genericContent1 = new CreatorContent("999999999","Este creador no tiene contenido aún!", "El creador seleccionado no tiene contenido para tu plan de suscripción todavía",9999,"",
        (new Date()),false,(new Date()),true,"","","./assets/img/brand/1.jpg",0);
  public contentViwer:ContentViwer[]=[];
  public flag=true;
  public creatorImage:string='';
  tags: string[] = [];
  tagControl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  
  constructor(private router:Router,private http:userServices,private creatorService:CreatorServiceService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
     if(token==null){ 
        this.router.navigate(['/home']);
      }
      this.stopped=false;
      this.genericLoaded=false;
      this.contentViwer = [];
      this.getSubsByUser();
      this.onScroll();
  }

  onScroll(){
    setTimeout(() => {
      if(!this.stopped && this.flag){
        if(!this.filterByCreator){
          this.flag=false;
          this.http.userContent(sessionStorage.getItem("userId"),this.nPage,this.contentNumer).subscribe(res =>{
            if(JSON.stringify(res["obj"]) === '[]' || res["obj"].length<this.contentNumer){
              this.stopped=true;
            }
            if((!this.genericLoaded) && this.nPage=='0' && (JSON.stringify(res["obj"]) === '[]')){
              this.genericContent.nickName = 'CreadoresUy'
              this.contentViwer.push(new ContentViwer(false,true,this.genericContent));
              console.log(this.contentViwer);
              this.genericLoaded=true;
            }else if(JSON.stringify(res["obj"]) !== '[]'){
              res["obj"].forEach(element => {
                this.contentViwer.push(new ContentViwer(false,true,element));
              });
              this.nPage = (parseInt(this.nPage)+1).toString();
            }
            console.log(this.contentViwer);
            this.flag=true;
          });
        }else{
          this.getFeedByCreator();
        }
      }
    }, 250);
  }

  increaseShow(e:Event) {
    this.onScroll();
  }

  scrollToStart(e:any) {
    (e.target as Element).parentElement.parentElement.scrollIntoView({block: "start"});
  }

  getSubsByUser(){
    this.http.getSubsByUser(this.getUserId()).subscribe(res=>{
      if(res['success']){
        this.subs = res['obj'];
      }
    });
  }

  getFeedByCreator(){
    this.http.getContentByCreator(sessionStorage.getItem("userId"),this.idCreator,this.nPage,this.contentNumer).subscribe(res =>{
      if(res['success']){
        if(JSON.stringify(res["obj"]) === '[]' || res["obj"].length<this.contentNumer){
          this.stopped=true;
        }
        if((!this.genericLoaded) && this.nPage=='0' && (JSON.stringify(res["obj"]) === '[]')){
          this.genericContent1.nickName = 'CreadoresUy'
          this.contentViwer.push(new ContentViwer(false,true,this.genericContent1));
          this.genericLoaded=true;
        }else if(JSON.stringify(res["obj"]) !== '[]'){
          res["obj"].forEach(element => {
            this.contentViwer.push(new ContentViwer(false,true,element));
          });
          this.nPage = (parseInt(this.nPage)+1).toString();
          console.log(res);
        }
      }
    });
  }

  creatorFilter(idCreator:string,creatorImage:string){
    this.creatorImage=creatorImage;
    this.stopped = false;
    this.filterByCreator = true;
    this.nPage = '0';
    this.idCreator = idCreator;
    this.genericLoaded = false;
    this.contentViwer=[];
    this.getFeedByCreator()
  }

  getVideoIframeView(url: string) {
    console.log(url);
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    return ("//www.youtube.com/embed/" + this.getId(url));
  }

  getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  navToCat(){
    this.creatorService.creatorCategoires().subscribe(res=>{
      let category = (Math.floor(Math.random() * (res['obj'].length - 1 + 1) + 1)) - 1;
      this.router.navigate([`/search/` + res['obj'][category]]);
    });
  }

  getUserImage(){
    return sessionStorage.getItem('imgProfile');
  }

  getUserNickname(){
    return sessionStorage.getItem('name');
  }

  getUserId(){
    return sessionStorage.getItem('userId');
  }
}
