import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    focus;
    focus1;
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    nickname:string = sessionStorage.getItem('nickname');
    searchText:string = '';

    constructor(public location: Location, private router: Router, private http:CreatorServiceService) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    setValue(event:Event){
        this.searchText =(<HTMLInputElement>event.target).value;
    }

    navToSearch(){
        if(this.searchText!=''){
            this.router.navigate([`/search/${this.searchText}`]);
    }   else{
            this.navToCat();
        }
    }

    navToCat(){
        this.http.creatorCategoires().subscribe(res=>{
          let category = (Math.floor(Math.random() * (res['obj'].length - 1 + 1) + 1)) - 1;
          this.router.navigate([`/search/` + res['obj'][category]]);
        });
      }

    getToken(){
        return sessionStorage.getItem('token');
    }

    getUserType(){
        return sessionStorage.getItem('userType');
    }

    getName(){
        return sessionStorage.getItem('name');
    }

    getNickname(){
        return sessionStorage.getItem('nickname')
    }

    getimgProfile(){
        return sessionStorage.getItem('imgProfile');
    }

    getPath(){
        return this.router.url;
    }
}
