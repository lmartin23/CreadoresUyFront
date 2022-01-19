import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanComplet } from 'src/app/model/PlanComplete';
import { PlanService } from '../../service/planServices/plan.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {

  public idUser: string;
  public plan: PlanComplet = new PlanComplet();
  public image: any;
  public message: string;
  public videosrc: any;
  public inputVideo: any;
  public rawvideolink: string;
  public buttonMsg: string;

  imgURL: any;
  public imagePath;
  listArr = [];
  inputTxt = '';
  constructor(private router: Router, private route: ActivatedRoute, private http: PlanService, private _sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
    this.idUser = this.route.snapshot.paramMap.get('idPlan');
    this.planLoader();
  }

  planLoader() {
    this.http.getPlanById(this.idUser).subscribe(res => {
      this.plan = res['obj'];
      console.log(this.plan);

      this.imgURL = this.plan.image;
      this.getVideoIframe(this.plan.welcomeVideoLink)
      this.listArr = this.plan.benefits;
      console.log(this.listArr);

    })
  }

  isInList(list, val) {
    var resVal: boolean = false;
    list.forEach(element => {
      if (element.description == val) resVal = true;
    });
    return resVal;
  }

  addToList() {
    console.log("res es : " + this.inputTxt);
    if (this.inputTxt != '') {
      if (!this.isInList(this.listArr, this.inputTxt)) {
        this.listArr.push({
          "description": this.inputTxt,
          "val": this.listArr.length
        }
        );
      }
    }
  }
  removeItem(index: number) {
    this.listArr.splice(index, 1);
  }
  UserLoader() {
  }
  getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return false;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.image = (_event.target.result).toString().split("base64,")[1];
    }
    return true;
  }
  handleUpload(event, userFile) {
    if (!this.preview(userFile)) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.image = (_event.target.result).toString().split("base64,")[1];
    };
  }
  verDatos(input: string) {
    console.log(input);
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
  enviarDatos(name: string, description: string, price: number, subscriptionMsg: string) {
    if (name == "" || description == "" || price == null || subscriptionMsg == "") {
      this.buttonMsg = "Debe llenar todos los campos"
      return;
    }
    this.buttonMsg = null;

    var plan = new PlanComplet();
    plan.id = this.plan.id;
    plan.name = name;
    plan.deleted = false;
    plan.description = description;
    plan.price = price;
    plan.image = this.imgURL;
    plan.subscriptionMsg = subscriptionMsg;

    plan.welcomeVideoLink = this.rawvideolink;
    plan.benefits = [];
    this.listArr.forEach(element => {
      plan.benefits.push(element);
    });


    this.http.updateUser(plan);
  }
}
