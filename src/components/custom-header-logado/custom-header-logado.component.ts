import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { AlertController, App, MenuController } from "ionic-angular";
import { AuthService } from "../../providers/auth/auth.service";

@Component({
    selector: 'custom-header-logado',
    templateUrl: 'custom-header-logado.component.html'
}
)
export class CustomHeaderLogadoComponent extends BaseComponent {

    @Input() titulo: string;

    constructor(public alertCtrl: AlertController,
                public authService: AuthService,
                public app: App,
                public menuCtrl: MenuController) {

        super(alertCtrl,authService,app,menuCtrl);
    }

}
