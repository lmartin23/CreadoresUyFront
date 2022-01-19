import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if(token != null){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('imgProfile');

      if(sessionStorage.getItem('userType') === "creator"){
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('creatorId');
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('creatorId');
      }else{
        sessionStorage.removeItem('userType');
      }
    }
    this.router.navigate(['home']);
  }

}
