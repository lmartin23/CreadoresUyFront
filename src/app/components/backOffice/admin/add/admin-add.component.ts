import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminComplet } from 'src/app/model/AdminComplete';
import { AdminService } from '../../service/AdminServices/admin.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  public idUser: string;
  public image: any;
  public message: string;
  imgURL: any;
  public imagePath;

  constructor(private router: Router, private route: ActivatedRoute, private http: AdminService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.UserLoader();
  }

  UserLoader() {
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
  }



  verDatos(input: string) {
    console.log(input);
  }

  enviarDatos(name: string, email: string, description: string, password: string) {
    var user = new AdminComplet();
    user.name = name;
    user.email = email;
    user.password = password;
    user.imgProfile = this.image;
    this.http.createAdmin(user);
  }
}
