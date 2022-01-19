import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatorDto } from 'src/app/model/CreatorDto';
import { CreatorContentProfile } from 'src/app/model/CreatorContentProfile';
import { CreatorProfile } from 'src/app/model/CreatorProfile';
import { Response } from 'src/app/model/Response';
import { infoPago } from 'src/app/model/infoPago';

import * as dev from 'src/dev';
import { PlanBasic } from 'src/app/model/PlanBasic';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { CreatorContentString } from 'src/app/model/CreatorContentString';
import { DatePipe } from '@angular/common';
import { CreatorPlansToUser } from 'src/app/model/CreatorPlansToUser';
import { Plan } from 'src/app/model/Plan';
import { PlanAndNickname } from 'src/app/model/PlanAndNickname';
import { WelcomePlan } from 'src/app/model/WelcomePlan';
import { GraphDto } from 'src/app/model/GraphDto';

@Injectable({
  providedIn: 'root'
})
export class CreatorServiceService {

  Url = `${dev.apiurl}`;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  creatorCreate(name: string, nickname: string, link: string, description: string, namePayment: string, account: string, selectedItem: string, toppings: string[], base64: string[], textArea: string) {
    var creatorDto = new CreatorDto();
    var infoPagos = new infoPago();
    infoPagos.nombreTitular = namePayment; infoPagos.numeroDeCuenta = parseInt(account); infoPagos.nombreEntidadFinanciera = selectedItem;
    creatorDto.idUser = parseInt(sessionStorage.getItem('userId')); creatorDto.creatorName = name; creatorDto.nickName = nickname; creatorDto.contentDescription = description;
    creatorDto.biography = textArea; creatorDto.youtubeLink = link; creatorDto.creatorImage = base64[0]; creatorDto.coverImage = base64[1]; creatorDto.infoPago = infoPagos;
    creatorDto.category1 = toppings[0];
    if (toppings.length == 2) {
      creatorDto.category2 = toppings[1];
    } else {
      creatorDto.category2 = '';
    }
    console.log(creatorDto);
    return this.http.post<Response<String>>(`${this.Url}` + "/api/Creator/SignUp", { CreatorDto: creatorDto }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  creatorCategoires() {
    return this.http.get<Response<String[]>>(`${this.Url}` + "/api/Creator/GetCategoryes")
  }

  creatorProfileLoader(nickname: string) {
    let url = `${this.Url}` + "/api/Creator/GetProfile?" + "nickname=" + nickname;
    return this.http.get<Response<CreatorProfile>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  creatorProfileContentLoader(nickname: string, idUser: string, pageNumer: string, pageSize: string) {
    let url = `${this.Url}` + "/api/Creator/GetContentByUser?" + "nickname=" + nickname + "&idUser=" + idUser
      + "&pageNumber=" + pageNumer + "&pageSize=" + pageSize;
    return this.http.get<Response<CreatorContentProfile>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getPlanBasic(nickname: string) {
    let url = `${this.Url}` + "/api/Creator/GetCreatorPlansBasic?" + "nickname=" + nickname;
    return this.http.get<Response<PlanBasic>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getNewDraft(content: CreatorContent) {
    return this.http.post<Response<CreatorContent>>(`${this.Url}` + '/api/Content/CreateNewDraftContent', { content }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getEstadistica(nicnkame: string) {
    console.log(`${this.Url}` + "/api/PaymentsBackOffice/GetAllPendingPaymentsByNickname/?nickname=" + nicnkame);
    return this.http.get<Response<GraphDto>>(`${this.Url}` + "/api/PaymentsBackOffice/GetAllPendingPaymentsByNickname?nickname=" + nicnkame, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }
  updateDraft(c: CreatorContent) {
    var fecha = (this.datepipe.transform(c.publishDate, 'MM-dd-yyyy, HH:mm a'));
    var date = fecha.split(',', 1,);
    var n = fecha.indexOf(',');
    var time = (fecha.substring(n + 2)).split(':', 2);
    console.log(fecha)
    var datePart = date[0].split('-', 3);
    if (time[1].includes('AM')) {
      let index = time[1].indexOf('AM');
      var contentDate = time[1].substring(0, index - 1);
    } else if (time[1].includes('PM')) {
      let index = time[1].indexOf('PM');
      var contentDate = time[1].substring(0, index - 1);
    }
    var year = '';
    var day = '';
    if (datePart[0] === '01') {
      year = '12';
    } else {
      year = (parseInt(datePart[0]) - 1).toString();
      if (parseInt(year) < 10) {
        year = '0' + year;
      }
    }
    console.log(year)
    var contentNewDate = datePart[2] + '-' + datePart[0] + '-' + datePart[1] + 'T' + time[0] + ':' + contentDate + ':00.375Z';
    var content = new CreatorContentString(c.id, c.title, c.description, c.idCreator, c.nickName, c.addedDate, c.draft, contentNewDate, c['isPublic'], c.type);
    content.plans = c.plans; content.tags = c.tags; content.dato = c.dato; content.creatorImage = '';
    return this.http.put<Response<CreatorContentString>>(`${this.Url}` + '/api/Content/UpdateContent', { content }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

  getDraft(nickname: string) {
    let url = `${this.Url}` + "/api/Content/GetContentDraft?" + "nickname=" + nickname;
    return this.http.get<Response<CreatorContent>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } })
  }

  getPlanToUser(idUser: string, nickname: string) {
    console.log(idUser)
    let url = `${this.Url}` + "/api/Creator/GetCreatorPlansSubsc?" + "idUser=" + idUser + '&nickname=' + nickname;
    return this.http.get<Response<CreatorPlansToUser>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getPlanByCreator(idCreator: string) {
    let url = `${this.Url}` + "/api/Creator/GetCreatorPlansById?" + "id=" + idCreator;
    return this.http.get<Response<Plan[]>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getDefaultBenefits() {
    let url = `${this.Url}` + "/api/Creator/GetDefaultBenefits"
    return this.http.get<Response<string[]>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  postPlan(newPlan: PlanAndNickname) {
    var nickname = newPlan.nickname;
    var pandB = newPlan.pandB;
    return this.http.post<Response<string>>(`${this.Url}` + '/api/Creator/CreatePlanAndBenefits', { nickname, pandB }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  updatePlan(nickname: string, pandB: Plan) {
    return this.http.put<Response<string>>(`${this.Url}` + '/api/Creator/UpdatePlansAndBenefits', { nickname, pandB }, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getChatBool(id: string, nickname: string) {
    let url = `${this.Url}` + "/api/Creator/GetBoolSubsc?" + "id=" + id + '&nickname=' + nickname;
    return this.http.get<boolean>(url);
  }

  getWecolmeInfo(idPlan: string) {
    let url = `${this.Url}` + "/api/Creator/GetInfoPlan?" + "idPlan=" + idPlan;
    return this.http.get<Response<WelcomePlan>>(url);
  }

}
