import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticateResponseClass } from 'src/app/model/AuthenticateResponse';
import { CreateUserDto } from 'src/app/model/CreateUserDto';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { dto } from 'src/app/model/dto';
import { Response } from 'src/app/model/Response';
import { searchProfile } from 'src/app/model/SearchProfile';
import { Subscriptions } from 'src/app/model/Subscriptions';
import { User } from 'src/app/model/user';
import * as dev from 'src/dev';

@Injectable({
  providedIn: 'root'
})
export class userServices {

  Url=`${dev.apiurl}`;

  constructor(private http:HttpClient) {}

  UserCreate(user:CreateUserDto): Observable<Response<String>>{
    console.log(user.name);
    return this.http.post<Response<String>>(`${this.Url}` + "/api/User" ,{createUserDto:user}); 
  }

  UserLogin(user:User){
    return this.http.post<Response<AuthenticateResponseClass>>(`${this.Url}` + "/api/User/Authenticate"​,{User:user}); 
  }

  userContent(userId:string, page:string, contentPerPage:string){
    let url = `${this.Url}` + "/api/Content/Feed?"​ + "IdUser=" + userId + "&" + 
    "Page=" + page + "&" + "ContentPerPage=" + contentPerPage;
    return this.http.get<Response<CreatorContent>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  getUsers(): Observable<AuthenticateResponseClass[]> {
    return this.http.get<AuthenticateResponseClass[]>(`${this.Url}` + "/api/User");
  }

  getCreatorByUserSearch(searchText:string, pageNumber:string, pageSize:string){
    let url = `${this.Url}` + "/api/Creator/GetCreatorBySearch?"​ + "searchText=" + searchText + "&" + 
    "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
    return this.http.get<Response<searchProfile[]>>(url);
  }

  getCreatorByCategorySearch(searchText:string, pageNumber:string, pageSize:string){
    let url = `${this.Url}` + "/api/Creator/GetCreatorsByCategory?"​ + "category=" + searchText + "&" + 
    "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
    return this.http.get<Response<searchProfile[]>>(url);
  }

  followCreator(idUser:string, nickname:string){
    return this.http.post<Response<String>>(`${this.Url}` + "/api/User/Follow",{idUser,nickname},{headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}})
  }

  unfollowCreator(idUser:string, nickname:string){
    return this.http.post<Response<String>>(`${this.Url}` + "/api/User/Unfollow",{idUser,nickname},{headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}})
  }

  getSubsByUser(idUser:string){
    let url = `${this.Url}` + "/api/User/SubscribedTo?"​ + "idUser=" + idUser;
    return this.http.get<Response<Subscriptions[]>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}})
  }

  getFollsByUser(idUser:string){
    let url = `${this.Url}` + "/api/User/FollowingTo?"​ + "idUser=" + idUser;
    return this.http.get<Response<string>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}})
  }
  
  getContentByCreator(idUser:string, idCreador:string, pageNumber:string, pageSize:string){
    let url = `${this.Url}` + "/api/Content/FeedById?"​ + "idUser=" + idUser + "&" + "IdCreator=" + idCreador + "&" +
    "Page=" + pageNumber + "&" + "ContentPerPage=" + pageSize;
    return this.http.get<Response<CreatorContent[]>>(url);
  }

  suscriber(dto:dto){
    return this.http.post<Response<string>>(`${this.Url}` + "/api/User/SubscribeTo",{dto},{headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  unSuscriber(idUser:string, idPlan:number){
    return this.http.post<Response<string>>(`${this.Url}` + "/api/User/Unsubscribed",{idUser,idPlan}, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}})
  }
}