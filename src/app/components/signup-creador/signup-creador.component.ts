import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { FormControl } from '@angular/forms';
import { userServices } from 'src/app/services/UserServices/userServices';

@Component({
  selector: 'app-signup-creador',
  templateUrl: './signup-creador.component.html',
  styleUrls: ['./signup-creador.component.css']
})
export class SignupCreadorComponent implements OnInit {
  focus;
  htmlContent = '';
  public editor= ClassicEditor;
  toppings = new FormControl();
  textArea:string = '';
  selectedItem:string = ''
  selected:boolean=true;
  showBar:boolean=false;
  
  
  urls:string[] = ['','']
  base64:string[] = ['','']
 
  dropdownList = [];
  selectedItems:string[] = ['',''];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    limitSelection: 2,
    allowSearchFilter: true
  };
  limitSelection = false;

  constructor(private router:Router, private http:CreatorServiceService, private userServices:userServices) {}

  ngOnInit() {
    this.getCategories();
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
      }else{
        reader.onload = (e: any) => {
          this.urls[1]=(e.target.result);
          var n = e.target.result.lastIndexOf(',');
          this.base64[1]=(e.target.result.substring(n + 1));
        } 
        reader.readAsDataURL(files[0]);
      }
    }
  }

  onItemSelect(){
    this.selectedItems = [];
    this.selectedItems = this.toppings.value;
  }

  @ViewChild('textarea') myEditor: any;
  gettext(){
    this.textArea = this.getArticleContent();
  }

  private getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }
    return '';
  }

  selectOption(e:Event){
    this.selectedItem = ((<HTMLInputElement> e.target).value);
    this.selected=false;
  }

  creatorMaker(name:string,nickname:string,link:string, description:string,namePayment:string, account:string){
    this.showBar=true;
    this.textArea = '<p' + this.textArea.substring(this.textArea.indexOf('>'));
    console.log(this.textArea)
    this.http.creatorCreate(name,nickname,link,description,namePayment,account,this.selectedItem, this.toppings.value,this.base64,this.textArea).subscribe(res =>{
      if(res['success']){
          sessionStorage.setItem('userType', "creator");
          sessionStorage.setItem('nickname', nickname);
          sessionStorage.setItem('creatorId', res['obj']);
          this.router.navigate(['/creator-Profile', sessionStorage.getItem('nickname')]);
      }else{
        this.router.navigate(['/home']);
      }
    });
  }

  getCategories(){
    this.http.creatorCategoires().subscribe(res=>{
      this.dropdownList = res['obj'];
    });
  }
}
