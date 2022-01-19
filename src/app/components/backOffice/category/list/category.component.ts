import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/CategoryServices/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listcategorys: any;
  public page: number;
  filterpost = '';
  categorys: any[] = [];

  constructor(private router: Router, private http: CategoryService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getCategory().subscribe(res => {
      this.categorys = res['obj'];
    });
  }
  onChange($event, id) {
    this.http.deleteCategory(id);
  }

}
