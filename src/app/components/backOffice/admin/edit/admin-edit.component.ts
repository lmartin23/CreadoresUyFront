import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminComplet } from 'src/app/model/AdminComplete';
import { AdminService } from '../../service/AdminServices/admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  public idUser: string;
  public user: AdminComplet = new AdminComplet();
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
    this.user.lasLogin = new Date();
    this.UserLoader();
  }

  UserLoader() {
    this.http.getAdminbyId(this.idUser).subscribe(res => {
      console.log(res['obj']);
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
  }
  enviarDatos(name: string, email: string, description: string) {
    var user = new AdminComplet();
    user.id = this.user.id; user.deleted = this.user.deleted; user.name = name;
    user.email = email; user.password = this.user.password; user.description = description;
    user.creatorId = this.user.creatorId;
    if (this.image === undefined) {
      user.imgProfile = "";
    } else {
      user.imgProfile = this.image;
    }

    console.log(this.user);
    this.http.updateAdmin(user);
  }
}
