import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComplet } from 'src/app/model/UserComplete';
import { UserService } from '../../service/UserServices/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

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
  verDatos(input: string) {
    console.log(input);
  }

  enviarDatos(name: string, email: string, description: string, password: string) {
    var user = new UserComplet();
    user.name = name;
    user.email = email;
    user.password = password;
    user.description = description;
    user.imgProfile = this.image;
    this.http.createUser(user);
  }
}
