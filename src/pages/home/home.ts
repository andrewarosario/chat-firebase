import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrarPage } from "../registrar/registrar";
import { FirebaseListObservable } from "angularfire2/database";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../providers/usuario/usuario.service";
import { AuthService } from "../../providers/auth/auth.service";
import { ChatPage } from '../chat/chat';
import { ChatService } from '../../providers/chat/chat.service';
import { Chat } from '../../models/chat.model';

import * as firebase from 'firebase/app';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {    

    usuarios: FirebaseListObservable<Usuario[]>;
    chats: FirebaseListObservable<Chat[]>;
    view: string = 'chats';

    constructor(public navCtrl: NavController, 
                public usuarioService: UsuarioService, 
                public authService: AuthService,
                public chatService: ChatService) {

    }

    ionViewCanEnter(): Promise<boolean> {
        return this.authService.autenticado;
    }

    ionViewDidLoad() {
        this.chats = this.chatService.chats;
        this.usuarios = this.usuarioService.usuarios;
    }

    criarChat(usuarioDestinatario: Usuario): void {

        this.usuarioService.usuarioAtual
            .first()
            .subscribe((usuarioAtual: Usuario) => {
                this.chatService.getDeepChat(usuarioAtual.$key,usuarioDestinatario.$key)
                    .first()
                    .subscribe((chat: Chat) => {

                        if (chat.hasOwnProperty('$value')) {

                            let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

                            let chatRemetente = new Chat('', timestamp, usuarioDestinatario.nome,'')
                            this.chatService.criar(chatRemetente, usuarioAtual.$key,usuarioDestinatario.$key);

                            let chatDestinatario = new Chat('', timestamp, usuarioAtual.nome,'')
                            this.chatService.criar(chatDestinatario, usuarioDestinatario.$key,usuarioAtual.$key);

                        }
                    })
            })

        this.navCtrl.push(ChatPage, {
            usuarioDestinatario: usuarioDestinatario
        })
    }

    abrirChat(chat: Chat): void {

        let uidUsuarioDestinatario: string = chat.$key;

        this.usuarioService.get(uidUsuarioDestinatario)
            .first()
            .subscribe((usuario: Usuario) => {
                this.navCtrl.push(ChatPage, {
                    usuarioDestinatario: usuario
                })
            })
    }

    registrar(): void {
        this.navCtrl.push(RegistrarPage);
    }  

}
