import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryComplet } from 'src/app/model/CategoryComplete';
import { CategoryService } from '../../service/CategoryServices/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  public idUser: string;
  public image: any;
  public message: string;
  imgURL: any;
  public imagePath;
  public errorMessage: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: CategoryService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
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
    }
    return true;
  }
  handleUpload(event, userFile) {
    if (!this.preview(userFile)) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
      console.log(this.image);
    };
  }
  verDatos(input: string) {
    console.log(input);
  }

  enviarDatos(name: string) {
    var category = new CategoryComplet();
    category.Name = name;
    this.http.createCategory(category, this.errorMessage);
  }
}
