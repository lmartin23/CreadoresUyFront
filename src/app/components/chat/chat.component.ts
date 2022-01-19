import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/ChatServices/chat-service.service';
import { CreatorChatDto } from "../../model/CreatorChatDto"

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public idUser: string;
  public img: string;
  public nombre: any;
  public message: string = "";
  public errorMessage: any;
  public usuarios = [1, 2, 3, 4]
  public nickname: string = "default"
  public currentUser: CreatorChatDto;
  public usersChats: CreatorChatDto[];


  //firebase
  mensaje: string = "";
  elemento: any;
  constructor(private router: Router, private route: ActivatedRoute, public http: ChatService, public form: FormsModule, public datepipe: DatePipe) { }
  ngOnInit(): void {
    this.idUser = sessionStorage.getItem('userId');
    this.img = sessionStorage.getItem('imgProfile');
    console.log(this.idUser);
    this.elemento = document.getElementById('app-mensajes');
    if (sessionStorage.getItem('userType') == "creator") {
      this.nombre = sessionStorage.getItem('nickname');
    }
    else {
      this.nombre = sessionStorage.getItem('name');
    }

    let nick = this.route.snapshot.paramMap.get('nickname');
    if (nick) {
      this.http.getUserByNickname(nick).subscribe(res => {
        console.log(res['obj']);
        this.currentUser = res['obj'];
        console.log(this.currentUser);
        //carga mensajes con el creador actual
        this.http.cargarChats(sessionStorage.getItem('userId'))
          .subscribe(() => {
            if (this.http.chats.length != 0) {
              var chatsList: string[] = [];
              console.log(this.http.chats);
              this.http.chats.forEach(element => {
                chatsList.push(element.usuario);
              });
              this.usersChats = [];
              console.log(chatsList);
              this.http.getUsersChats(chatsList).subscribe(res => {
                this.usersChats = res['obj']
                console.log(this.usersChats);
                this.changeChat(this.currentUser.idUser, this.currentUser.name, this.currentUser.imgProfile)
              });
            }
          });
      });
    } else {
      this.http.cargarChats(sessionStorage.getItem('userId'))
        .subscribe(() => {
          if (this.http.chats.length != 0) {
            var chatsList: string[] = [];
            console.log(this.http.chats);
            this.http.chats.forEach(element => {
              chatsList.push(element.usuario);
            });
            this.usersChats = [];
            console.log(chatsList);
            this.http.getUsersChats(chatsList).subscribe(res => {
              this.usersChats = res['obj']
              console.log(this.usersChats);
              this.changeChat(this.usersChats[0].idUser, this.usersChats[0].name, this.usersChats[0].imgProfile)
            });
          }
        });
    }


  }

  changeChat(id, name, img) {
    this.currentUser = new CreatorChatDto();
    this.currentUser.idUser = id;
    this.currentUser.name = name;
    this.currentUser.imgProfile = img;

    this.http.cargarMensajes(sessionStorage.getItem('userId'), id)
      .subscribe(() => {
        setTimeout(() => {
        }, 20);

      });
  }

  changeChatBtn(id, name, img) {
    this.currentUser = new CreatorChatDto();
    this.currentUser.idUser = id;
    this.currentUser.name = name;
    this.currentUser.imgProfile = img;
    console.log(id, " ", name, "  ", img);

    this.http.cargarMensajes(sessionStorage.getItem('userId'), this.currentUser.idUser)
      .subscribe(() => {
        setTimeout(() => {
        }, 20);

      });
  }

  enviar_mensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    var chateoAntes = false;

    console.log(this.usersChats);
    if (this.usersChats !== undefined) {
      this.usersChats.forEach(element => {
        if (element.idUser == this.currentUser.idUser) chateoAntes = true;
      });
    }

    if (!chateoAntes) {

      this.http.agregarChat(this.currentUser.idUser).then(function () {
        this.http.agregarMensaje(this.mensaje, this.currentUser.idUser, this.nombre)
          .then(() => console.log('Mensaje enviado'))
          .catch((err) => console.error('Error al enviar', err));
      })
        .catch((err) => console.error('Error al enviar', err));
    } else {
      this.http.agregarMensaje(this.mensaje, this.currentUser.idUser, this.nombre)
        .then(() => console.log('Mensaje enviado'))
        .catch((err) => console.error('Error al enviar', err));
    }
  }

  handleSubmit(event) {
    if (event.keyCode == 13) {
      this.enviar_mensaje();
      (<HTMLInputElement>document.getElementById("mandarMsg")).value = "";
    }
  }
  onclickMsg() {
    this.enviar_mensaje();
    (<HTMLInputElement>document.getElementById("mandarMsg")).value = "";

  }



}
