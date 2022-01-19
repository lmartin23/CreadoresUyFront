import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { Router } from '@angular/router';

import { CategoryComplet } from 'src/app/model/CategoryComplete';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }

  getCategory() {
    return this.http.get<Response<CategoryComplet>>(`${this.Url}` + "/api/CategoryBackOffice/GetAll", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

  getCategoryById(categoryId: string) {
    let url = `${this.Url}` + "/api/CategoryBackOffice/" + categoryId;
    return this.http.get<Response<CategoryComplet>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  createCategory(Category: CategoryComplet, errorMsg: any) {

    var body = {
      "name": Category.Name
    }
    console.log(body);
    return this.http.post<Response<string>>(`${this.Url}` + "/api/CategoryBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        if (data["success"]) {
          this.router.navigate(['/backOffice/categoria']);
          errorMsg = false;
        } else {
          errorMsg = "Error: Ya existe una categoría con ese nombre";
        }
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        errorMsg = "Error al ingresar la categoría";
        console.error('There was an error!', error);
      }
    });;
  }

  updateCategory(Category: CategoryComplet) {
    var body = {
      "id": Category.id,
      "name": Category.Name,
      "deleted": Category.deleted
    }
    console.log(body);
    return this.http.put<Response<string>>(`${this.Url}` + "/api/CategoryBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        if (data["success"]) {
          this.router.navigate(['/backOffice/categoria']);
        }
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  deleteCategory(CategoryId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/CategoryBackOffice/" + CategoryId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
}
