import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminComplet } from 'src/app/model/AdminComplete';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private http: HttpClient) { }
  getAdminbyId(userId: string) {
    let url = `${this.Url}` + "/api/AdminBackOffice/" + userId;
    return this.http.get<Response<AdminComplet>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }
  getAdmin() {
    return this.http.get<Response<AdminComplet>>(`${this.Url}` + "/api/AdminBackOffice/GetAll", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  createAdmin(CreateAdminDto: AdminComplet) {


    console.log({ CreateAdminDto });
    return this.http.post<Response<string>>(`${this.Url}` + "/api/AdminBackOffice", { CreateAdminDto }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  updateAdmin(user: AdminComplet) {

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
    return this.http.put<Response<string>>(`${this.Url}` + "/api/AdminBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  deleteAdmin(userId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/AdminBackOffice/Remove/" + userId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  disableAdmin(userId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/AdminBackOffice/disable/" + userId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
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
