import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatorComplet } from 'src/app/model/CreatorComplete';
import { CreatorService } from '../../service/CreatorServices/creator.service';
import { CategoryService } from '../../service/CategoryServices/category.service';
import { UserService } from '../../service/UserServices/user.service';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-add',
  templateUrl: './creator-add.component.html',
  styleUrls: ['./creator-add.component.css']
})
export class CreatorAddComponent implements OnInit {

  public idUser: string;
  public image: any;
  imgURL: any;
  public imagePath;
  public message: string;

  public image2: any;
  imgURL2: any;
  public imagePath2;
  public message2: string;


  categoria1Control = new FormControl('', Validators.required);
  categoria2Control = new FormControl('', Validators.required);
  usuarioControl = new FormControl('', Validators.required);

  categorias: [];
  usuarios: [];

  public videosrc: any;
  public inputVideo: any;
  public rawvideolink: string;
  constructor(private router: Router, private route: ActivatedRoute, private http: CreatorService,
    private httpC: CategoryService, private _sanitizer: DomSanitizer, private httpU: UserService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.LoadCategoria();
    this.LoadUsuarios();
  }
  getVideoIframe(url: string) {
    console.log(url);
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    this.rawvideolink = "www.youtube.com/embed/" + this.getId(url);
    this.videosrc = this._sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/" + this.getId(url));
  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  LoadCategoria() {
    this.httpC.getCategory().subscribe(res => {
      this.categorias = res['obj'];
      console.log(res);
    })
  }
  LoadUsuarios() {
    this.httpU.getUser().subscribe(res => {
      this.usuarios = res['obj'];
      console.log(res);
    })
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


  preview2(event, files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message2 = "Only images are supported.";
      return false;
    }
    this.imagePath2 = files;

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL2 = reader.result;
      this.image2 = (_event.target.result).toString().split("base64,")[1];
      console.log(this.image2);

    }
    return true;
  }
  handleUpload2(event, userFile) {
    if (!this.preview2(event, userFile)) return;
  }



  verDatos(input: string) {
    console.log(input);
  }
  enviarDatos(name: string, nickname: string, biografia: string, description: string, userValue: string,
    category1Value: string, category2Value: string) {
    var user = new CreatorComplet();
    user.creatorName = name;
    user.nickName = nickname;
    user.biography = biografia;
    user.contentDescription = description;
    user.userId = parseInt(userValue);
    user.category1 = category1Value;
    user.category2 = category2Value;
    user.creatorImage = this.image;
    user.coverImage = this.image2;
    user.youtubeLink = this.rawvideolink;

    this.http.createCreator(user);
  }
}
