import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userServices } from 'src/app/services/UserServices/userServices';
import { UserComplet } from 'src/app/model/UserComplete';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public subs:any[];
  public follw:any[];
  nickname:string;
  idUser:string;
  username: string;

  constructor(private router:Router,private route:ActivatedRoute, private userServices:userServices) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if(token==null){ 
      this.router.navigate(['/home']);
    }
    this.getSubsByUser();
    this.getFollsByUser();
  }


  getSubsByUser(){
    this.userServices.getSubsByUser(this.getUserId()).subscribe(res=>{
      if(res['success']){
        this.subs = res['obj'];
      }
    });
  }

  getFollsByUser(){
    this.userServices.getFollsByUser(this.getUserId()).subscribe(res=>{
      if(res['success']){
        this.follw = res['obj'];
      }
    });
  }

  getimgProfile(){
    return sessionStorage.getItem('imgProfile');
  }

  getName(){
    return sessionStorage.getItem('name');
  }

  getUserId(){
    return sessionStorage.getItem('userId');
  }


}
