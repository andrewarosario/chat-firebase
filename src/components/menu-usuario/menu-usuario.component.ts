import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'menu-usuario',
    templateUrl: 'menu-usuario.component.html'
})

export class MenuUsuarioComponent extends BaseComponent{

    @Input('usuario') usuarioAtual: Usuario;

    constructor(public alertCtrl: AlertController,
        public authService: AuthService,
        public app: App,
        public menuCtrl: MenuController) {

            super(alertCtrl,authService,app,menuCtrl);

    }

    abrirPerfil() :void {
        
    }
}
