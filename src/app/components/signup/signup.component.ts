import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/CreateUserDto';
import { userServices } from 'src/app/services/UserServices/userServices';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;focus1;focus2;
    public isChecked:boolean=true;
    public noRequiredName:boolean=true;
    public noRequiredPassword:boolean=true;
    public noRequiredEmail:boolean=true;
    public MinLenght:boolean=true;
    public validEmail:boolean=true;
    public subbmited:boolean=false
    public Success:boolean;
    public showBar:boolean=false;
    urls:string[] = ['']
    base64:string[] = ['']
    
    userForm = new FormGroup({
        name: new FormControl('',Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,Validators.minLength(8)])
    });
    
    constructor(private signupService:userServices,private router:Router) {
    }

    ngOnInit() {
        this.isChecked=false;
        const token = sessionStorage.getItem('token');
        if(token!=null){
          this.router.navigate(['/home']);
        }
    }

    crearUsuario(name:string, email:string, password:string){
        this.showBar=true;
        this.noRequiredName=true;
        this.noRequiredEmail=true;
        this.noRequiredPassword=true;
        this.MinLenght=true;
        this.validEmail=true;
        this.subbmited=false;
        if(this.isChecked && this.userForm.valid){
            var user = new CreateUserDto(); user.name=name; user.email=email; user.password=password; user.imgProfile=this.base64[0];
            this.signupService.UserCreate(user).subscribe(data =>{
                console.log(data);
                if(data["success"]){
                    this.Success=true;
                    this.router.navigate(['/login']);
                }else{
                    this.Success=false;
                }
                this.subbmited=true;
                this.showBar=false;
            });
        }else{
            if(this.userForm.get('name').errors!=null){
                this.noRequiredName=false;
                this.showBar=false
            }
            if(this.userForm.get('email').errors!=null && this.userForm.get('email').errors.email){
                this.validEmail=false;
                this.showBar=false
            }else if(this.userForm.get('email').errors!=null && this.userForm.get('email').errors.required){
                this.noRequiredEmail=false;
                this.showBar=false
            }
            if(this.userForm.get('password').errors!=null && this.userForm.get('password').errors.required){
                this.noRequiredPassword=false;
                this.showBar=false
            }else if(password.length<8){
                this.MinLenght=false;
                this.showBar=false
            }
        }
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
          }
        }
      }
}
