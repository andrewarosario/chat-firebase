import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario/usuario.service';


@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    mensagens: string[] = [];
    tituloPagina: string;
    remetente: Usuario;
    destinatario: Usuario;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public authService: AuthService,
                public usuarioService: UsuarioService) {
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
            })
    }

    enviarMensagem(novaMensagem: string): void {
        this.mensagens.push(novaMensagem);
    }

}
