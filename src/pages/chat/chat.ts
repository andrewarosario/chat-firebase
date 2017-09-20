import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Mensagem } from '../../models/mensagem.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { MensagemService } from '../../providers/mensagem/mensagem.service';

import * as firebase from 'firebase/app';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    mensagens: FirebaseListObservable<Mensagem[]>
    tituloPagina: string;
    remetente: Usuario;
    destinatario: Usuario;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public authService: AuthService,
                public usuarioService: UsuarioService,
                public mensagemService: MensagemService)
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

            let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

            this.mensagemService.criar(
                new Mensagem(this.remetente.$key,novaMensagem,timestamp),
                this.mensagens
            );
        }
    }

}
