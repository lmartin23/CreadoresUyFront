import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryComplet } from 'src/app/model/CategoryComplete';
import { CategoryService } from '../../service/CategoryServices/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  public idCategory: string;
  public category: CategoryComplet = new CategoryComplet();

  constructor(private router: Router, private route: ActivatedRoute, private http: CategoryService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/home']);
    }
    this.idCategory = this.route.snapshot.paramMap.get('idCategoria');
    this.CategoryLoader();
  }

  CategoryLoader() {
    this.http.getCategoryById(this.idCategory).subscribe(res => {
      console.log(res);
      this.category = res['obj'];
      console.log(this.category);
    })
  }

  verDatos(input: string) {
    console.log(input);
  }

  enviarDatos(name: string) {
    var category = new CategoryComplet();
    category.id = this.category.id;
    category.deleted = this.category.deleted;
    category.Name = name;

    this.http.updateCategory(category);
  }
}
