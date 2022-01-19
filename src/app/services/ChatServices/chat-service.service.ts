
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/model/Response';

import { Mensaje } from '../../Inteface/Mensaje.Interface';
import { Chat } from '../../Inteface/Chat.Interface';

import { map } from 'rxjs/operators';
import * as dev from 'src/dev';

import { AngularFireAuth } from '@angular/fire/auth';

import { CreatorChatDto } from "../../model/CreatorChatDto"

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  Url = `${dev.apiurl}`;

  private itemsCollectionMensaje: AngularFirestoreCollection<Mensaje>;
  private itemsCollectionChat: AngularFirestoreCollection<Chat>;

  public mensajes: Mensaje[] = [];
  public chats: Chat[] = [];

  public usuario: any = {};

  public idsUsuarios: string;

  constructor(private afs: AngularFirestore,
    public auth: AngularFireAuth, private http: HttpClient) {

    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);

      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;

    })

  }
  getUserByNickname(nickname: string) {
    let url = `${this.Url}` + "/api/User/GetUserForChat/" + nickname;
    return this.http.get<Response<CreatorChatDto>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }

  getUsersChats(ids: string[]) {
    var idsString: string = "";
    ids.forEach(function (i, idx, array) {
      if (idx === array.length - 1) {
        idsString += i;
      } else {
        idsString += i + "-";
      }
      console.log(i);
    });
    console.log(ids);

    let url = `${this.Url}` + "/api/User/GetUsersChats/" + idsString;

    console.log(url);
    return this.http.get<Response<CreatorChatDto[]>>(url, { headers: { 'Authorization': ` Bearer ${sessionStorage.getItem('token')}` } });
  }


  logout() {
    this.auth.signOut();
    this.usuario = {}
      ;
  }
  cargarChats(idUser) {
    this.itemsCollectionChat = this.afs.collection<Chat>('userchat-' + idUser);
    return this.itemsCollectionChat.valueChanges().pipe(
      map((chats: Chat[]) => {
        console.log(chats);
        this.chats = [];
        for (let chat of chats) {
          this.chats.unshift(chat);

        }
        return this.chats;
      }));
  }


  cargarMensajes(idUser, IdReserptor) {
    if (idUser > IdReserptor) {
      let num = idUser;
      idUser = IdReserptor;
      IdReserptor = num;
    }

    this.itemsCollectionMensaje = this.afs.collection<Mensaje>('chats-' + idUser + "-" + IdReserptor, ref => ref.orderBy('fecha', 'desc')
      .limit(15));
    return this.itemsCollectionMensaje.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.mensajes = [];
        for (let mensaje of mensajes) {
          this.mensajes.unshift(mensaje);

        }
        return this.mensajes;
      }));
  }
  // Falta el UID del usuario
  agregarMensaje(texto: string, id, nombre) {
    let mensaje: Mensaje = {
      nombre: nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: id
    }
    return this.itemsCollectionMensaje.add(mensaje);

  }
  agregarChat(id) {
    this.itemsCollectionChat = this.afs.collection<Chat>('userchat-' + id);
    let chat: Chat = {
      usuario: sessionStorage.getItem('userId')
    }


    this.itemsCollectionChat.add(chat);
    this.itemsCollectionChat = this.afs.collection<Chat>('userchat-' + sessionStorage.getItem('userId'));
    let chat2: Chat = {
      usuario: id

    };

    this.itemsCollectionChat.valueChanges().pipe(
      map((chats: Chat[]) => {
        console.log(chats);
        this.chats = [];
        for (let chat of chats) {
          this.chats.unshift(chat);
        }
      }));


    return this.itemsCollectionChat.add(chat2);
    ;

  }
}