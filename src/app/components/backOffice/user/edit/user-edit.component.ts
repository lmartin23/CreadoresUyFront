import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComplet } from 'src/app/model/UserComplete';
import { UserService } from '../../service/UserServices/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public idUser: string;
  public user: UserComplet = new UserComplet();
  public image: any;
  public message: string;
  imgURL: any;
  public imagePath;

  constructor(private router: Router, private route: ActivatedRoute, private http: UserService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.UserLoader();
  }

  UserLoader() {
    this.http.getUserbyId(this.idUser).subscribe(res => {
      this.user = res['obj'];
    })
  }

  verDatos(input: string) {
    console.log(input);
  }
  preview(event, files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return false;
    }
    this.imagePath = files;

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.image = (_event.target.result).toString().split("base64,")[1];
      console.log(this.image);

    }
    return true;
  }
  handleUpload(event, userFile) {
    if (!this.preview(event, userFile)) return;

    /*
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
      console.log(this.image);
    };
    */
  }
  enviarDatos(name: string, email: string, description: string, created: string, lasLogin: string) {
    var user = new UserComplet();
    user.id = this.user.id; user.deleted = this.user.deleted; user.name = name;
    user.email = email; user.password = this.user.password; user.description = description;
    user.created = new Date(created); user.creatorId = this.user.creatorId;
    if (lasLogin != '') {
      user.lasLogin = new Date(lasLogin);
    } else {
      user.lasLogin = this.user.lasLogin;
    }
    if (this.image === undefined) {
      user.imgProfile = "";
    } else {
      user.imgProfile = this.image;
    }

    console.log(this.user);
    this.http.updateUser(user);
  }
}
