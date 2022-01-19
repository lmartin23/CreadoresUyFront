import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatorComplet } from 'src/app/model/CreatorComplete';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  Url = `${dev.apiurl}`;
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient) { }
  getCreatorbyId(CreatorId: string) {
    let url = `${this.Url}` + "/api/CreatorBackOffice/" + CreatorId;
    console.log(url);
    return this.http.get<Response<CreatorComplet>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }
  getCreator() {
    return this.http.get<Response<CreatorComplet>>(`${this.Url}` + "/api/CreatorBackOffice/GetAll", { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  createCreator(creatorBODto: CreatorComplet) {
    console.log({ creatorBODto });
    return this.http.post<Response<string>>(`${this.Url}` + "/api/CreatorBackOffice", { creatorBODto }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/backOffice/creador']);

      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  updateCreator(Creator: CreatorComplet) {

    var body = {
      "id": Creator.id,
      "CreatorName": Creator.creatorName,
      "NickName": Creator.nickName,
      "ContentDescription": Creator.contentDescription,
      "biography": Creator.biography,
      "youtubeLink": Creator.youtubeLink,
      "CreatorImage": Creator.creatorImage,
      "CoverImage": Creator.coverImage,
      "Followers": Creator.followers,
      "Category1": Creator.category1,
      "Category2": Creator.category2,
    }
    console.log(body);
    return this.http.put<Response<string>>(`${this.Url}` + "/api/CreatorBackOffice", body, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/backOffice/creador']);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });;
  }
  deleteCreator(CreatorId: number) {
    return this.http.delete<Response<string>>(`${this.Url}` + "/api/CreatorBackOffice/" + CreatorId, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } }).subscribe({
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
