import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComplet } from 'src/app/model/UserComplete';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }
  getUserbyId(userId: String) {
    let url = `${this.Url}` + "/api/UserBackOffice/" + userId;
    return this.http.get<Response<UserComplet>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }
  getUser() {
    return this.http.get<Response<UserComplet>>(`${this.Url}` + "/api/UserBackOffice/GetAll", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  createUser(user: UserComplet) {

    var body = {
      "name": user.name,
      "email": user.email,
      "password": user.password,
      "image": user.imgProfile,
    }
    console.log(body);
    return this.http.post<Response<string>>(`${this.Url}` + "/api/UserBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/backOffice/usuario']);

      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  updateUser(user: UserComplet) {

    var body = {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "password": user.password,
      "description": user.description,
      "created": user.created,
      "lasLogin": user.lasLogin,
      "imgProfile": user.imgProfile
    }
    console.log(body);
    return this.http.put<Response<string>>(`${this.Url}` + "/api/UserBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/backOffice/usuario']);

      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  deleteUser(userId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/UserBackOffice/" + userId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
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
