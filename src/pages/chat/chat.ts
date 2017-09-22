import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Mensagem } from '../../models/mensagem.model';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MensagemService } from '../../providers/mensagem/mensagem.service';

import * as firebase from 'firebase/app';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../providers/chat/chat.service';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    mensagens: FirebaseListObservable<Mensagem[]>
    tituloPagina: string;
    remetente: Usuario;
    destinatario: Usuario;

    private chatRemetente: FirebaseObjectObservable<Chat>;
    private chatDestinatario: FirebaseObjectObservable<Chat>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public authService: AuthService,
                public usuarioService: UsuarioService,
                public mensagemService: MensagemService,
                public chatService: ChatService)
                 {
    }

    ionViewCanEnter(): Promise<boolean> {
        return this.authService.autenticado;

    }

    ionViewDidLoad() {
        this.destinatario = this.navParams.get('usuarioDestinatario');
        this.tituloPagina = this.destinatario.nome;

        this.usuarioService.usuarioAtual
            .first()
            .subscribe((usuarioAtual: Usuario) => {
                this.remetente = usuarioAtual;

                this.chatRemetente = this.chatService.getDeepChat(this.remetente.$key, this.destinatario.$key)
                this.chatDestinatario = this.chatService.getDeepChat(this.destinatario.$key, this.remetente.$key)

                this.mensagens = this.mensagemService.
                    getMensagens(this.remetente.$key,this.destinatario.$key);

                this.mensagens
                    .first()
                    .subscribe((mensagens: Mensagem[]) => {
                        if (mensagens.length === 0) {
                            this.mensagens = this.mensagemService.
                            getMensagens(this.destinatario.$key,this.remetente.$key);
                        }
                    })
            })
    }

    enviarMensagem(novaMensagem: string): void {
        if (novaMensagem) {

            let timestampAtual: Object = firebase.database.ServerValue.TIMESTAMP;

            this.mensagemService.criar(
                new Mensagem(this.remetente.$key,novaMensagem,timestampAtual),
                this.mensagens
            ).then(() => {
                this.chatRemetente.update({
                    ultimaMensagem: novaMensagem,
                    timestamp: timestampAtual
                });

                this.chatDestinatario.update({
                    ultimaMensagem: novaMensagem,
                    timestamp: timestampAtual
                });
            });
        }
    }

}
