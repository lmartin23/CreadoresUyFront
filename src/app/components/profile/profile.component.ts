import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentViwer } from 'src/app/model/ContentViwer';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { userServices } from 'src/app/services/UserServices/userServices';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  urls = new Array<string>();
  nickname:string;
  creatorName:string
  video:string;
  biografia:string;
  descripcion:string;
  cantSubs:number;
  cantFollowers:number;
  img:string;
  coverimg:string;
  follow:boolean=false;
  public videosrc: any;
  public rawvideolink: string;
  public flags = true;
  public welcomeVideo:string='';
  public welcomeMensaje:string='';
  tags: string[] = [];
  tagControl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  

  public stopper:boolean = false;
  public genericContent = new CreatorContent("999999999","Soy un credor nuevo en creadoresUy!", "Acabo de comenzar en creadorUy, asegurese de revisar mi perfil en la brevedad para ver nuevas actualizaciones y suscribase si es de su agrado",9999,"",
         (new Date()),false,(new Date()),true,"","","./assets/img/brand/1.png",0);  

  public contentViwer:ContentViwer[] = [];
  public genericLoaded:boolean=false;
  public page:number = 1;
  public contentByPage:number=20;
  public chatbolean:boolean = false;
  
  constructor(private router:Router, private route:ActivatedRoute, private http:CreatorServiceService, private userServices:userServices,private _sanitizer: DomSanitizer) {}

  async ngOnInit(){
    this.nickname = this.route.snapshot.paramMap.get('nickname'); 
    this.profileLoader();
    this.chatBool();
    this.getWelcome();
    this.onScroll();   
  }

  async profileLoader(){
    this.http.creatorProfileLoader(this.nickname).subscribe(res =>{
      if(res['success']){
        this.creatorName=res['obj']['creatorName'];
        this.video=res['obj']['youtubeLink'];
        this.getVideoIframe(this.video);
        this.video=this.videosrc
        this.biografia=res['obj']['biography'];
        this.descripcion=res['obj']['contentDescription'];
        this.cantSubs=res['obj']['cantSubscriptores'];
        this.cantFollowers=res['obj']['cantSeguidores'];
        this.img=res['obj']['creatorImage'];
        this.coverimg=res['obj']['coverImage'];
      }else{
        this.router.navigate(['/home']);
      }
    });
  }

  onScroll(){
    setTimeout(() => {
      if(!this.stopper && this.flags){
        this.flags=false;
        this.http.creatorProfileContentLoader
        (this.nickname,this.getUserId(),this.page.toString(),this.contentByPage.toString()).subscribe(res =>{
          if(res['success']){
            console.log(res);
            this.follow = res['obj']['follower'];
            if(JSON.stringify(res["obj"]['contentsAndBool']) === '[]' || res['obj']['results']!=this.contentByPage){
              this.stopper = true;
            }
            if(JSON.stringify(res["obj"]['contentsAndBool']) !== '[]'){ 
              this.page++;
              res["obj"]["contentsAndBool"].forEach(element => {
                if(element['content']['dato']=='' || !element['authorized'])
                  element['content']['dato']="./assets/img/brand/1.jpg"; 
                this.contentViwer.push(new ContentViwer(false,element['authorized'],element['content']));
                console.log(element['content'])
              });
            }else if(!this.genericLoaded && this.page==1){
              this.genericContent.nickName=this.nickname;
              this.contentViwer[0]= new ContentViwer(false,true,this.genericContent);
              this.contentViwer[0]['content']['dato']='./assets/img/brand/1.png'
              this.genericLoaded=true;
            }
          }
          this.flags=true;
        });
      }
    }, 250);
  }

  scrollToStart(e) {
    (e.target as Element).parentElement.parentElement.scrollIntoView({block: "start"});
  }

  increaseShow(){
    this.onScroll();
  }

  getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    this.rawvideolink = "www.youtube.com/embed/" + this.getId(url);
    this.videosrc = ("//www.youtube.com/embed/" + this.getId(url));
  }

  getVideoIframeView(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    return ("//www.youtube.com/embed/" + this.getId(url));
  }

  followCreator(){
    this.userServices.followCreator((this.getUserId()),this.nickname).subscribe(res =>{
      if(res['success']){
        this.follow=true;
        this.profileLoader();
      }
    });
  }

  unfollowCreator(){
    this.userServices.unfollowCreator(this.getUserId(),this.nickname).subscribe(res =>{
      if(res['success']){
        this.follow=false;
        this.profileLoader();
      }
    });
  }

  chatBool(){
    this.http.getChatBool(sessionStorage.getItem('userId'),this.nickname).subscribe(res=>{
      this.chatbolean = res;
    });
  }

  getWelcome(){
    if(sessionStorage.getItem('idPlan')!=null){
      this.http.getWecolmeInfo(sessionStorage.getItem('idPlan')).subscribe(res=>{
        console.log(res)
        this.welcomeMensaje=res['obj']['subscriptionMsg'];
        this.welcomeVideo=res['obj']['welcomeVideoLink'];
        sessionStorage.removeItem('idPlan')
      });
    }
  }

  navToSuscribe(){
    this.router.navigate([`/creator-Profile/${this.nickname}/suscribe`]);
  }

  getUserId(){
    if(sessionStorage.getItem('userId')!=null){
      return sessionStorage.getItem('userId');
    }else{
      return "0";
    }
  }

  getNickname(){
    if(sessionStorage.getItem('nickname') !=null)
      return sessionStorage.getItem('nickname');
    else
      return '0';
  }
}