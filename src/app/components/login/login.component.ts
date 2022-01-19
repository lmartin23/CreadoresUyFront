import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { userServices } from 'src/app/services/UserServices/userServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  public checked:boolean;
  public subbmited:boolean=false
  public Success:boolean;
  public loginForm:FormGroup;
  public noRequiredPassword:boolean = true;
  public noRequiredEmail:boolean=true;
  public validEmail:boolean=true;
  public showBar:boolean=false;

  constructor(private http:userServices, private router:Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if(token!=null){
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',Validators.required)
    });
  }

  Login(email:string,password:string){
    this.showBar=true;
    this.subbmited=false;
    this.noRequiredPassword = true;
    this.noRequiredEmail=true;
    this.validEmail=true;
    var user = new User();
    user.email = email;
    user.password = password;
    if(this.loginForm.valid){
      this.http.UserLogin(user).subscribe(res =>{
        if(res["success"]){
          this.Success=true;
          const token = res["obj"]["token"];
          if(token != null){
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('name', res["obj"]["name"]);
            sessionStorage.setItem('userId', (res["obj"]["userId"]).toString());
            sessionStorage.setItem('email', res["obj"]["email"]);
            sessionStorage.setItem('imgProfile',res["obj"]["imgProfile"]);
            if(res["obj"]["creatorId"] != 0){
              sessionStorage.setItem('userType', "creator");
              sessionStorage.setItem('nickname', res['obj']['nickname']);
              sessionStorage.setItem('creatorId', res["obj"]['creatorId'].toString());
              this.router.navigate(['/creator-Profile', sessionStorage.getItem('nickname')]);

            }else if(res["obj"]["isAdmin"]){
              sessionStorage.setItem('userType', "admin");
              this.router.navigate(['/backOffice']);
            }else{
              sessionStorage.setItem('userType', "user");
              this.router.navigate(['/feed']);
            }
          }
        }else{
          this.Success=false;
          this.showBar=false;
        }
        this.subbmited=true;
      });
    }else{
      if(this.loginForm.get('password').errors!=null){
        this.noRequiredPassword=false;
        this.showBar=false;
      }
      if(this.loginForm.get('email').errors!=null && this.loginForm.get('email').errors.email){
        this.validEmail=false;
        this.showBar=false;
      }else if(this.loginForm.get('email').errors!=null && this.loginForm.get('email').errors.required){
        this.noRequiredEmail=false;
        this.showBar=false;
      }
    }
  }

  getToken(){
    return sessionStorage.getItem('token');
  }
}
