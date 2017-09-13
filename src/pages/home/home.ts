import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrarPage } from "../registrar/registrar";
import { FirebaseListObservable } from "angularfire2/database";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../providers/usuario/usuario.service";
import { AuthService } from "../../providers/auth/auth.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {    

    usuarios: FirebaseListObservable<Usuario[]>;
    view: string = 'chats';

    constructor(public navCtrl: NavController, public usuarioService: UsuarioService, public authService: AuthService) {

    }

    ionViewCanEnter(): Promise<boolean> {
        return this.authService.autenticado;
    }

    ionViewDidLoad() {
        this.usuarios = this.usuarioService.usuarios;
    }

    abrirChat(usuario: Usuario): void {

    }

    registrar(): void {
        this.navCtrl.push(RegistrarPage);
    }  

}
