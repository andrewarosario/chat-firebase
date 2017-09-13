import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from "../../providers/usuario/usuario.service";
import { AuthService } from "../../providers/auth/auth.service";
import { Usuario } from "../../models/usuario.model";

import * as firebase from 'firebase/app';

import 'rxjs/add/operator/first';
import { HomePage } from "../home/home";

@Component({
    selector: 'page-registrar',
    templateUrl: 'registrar.html',
})

export class RegistrarPage {

    registrarForm: FormGroup;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public usuarioService: UsuarioService,
        public authService: AuthService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        this.registrarForm = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3)]],
            usuario: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            senha: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    criarConta(): void {

        let loading: Loading = this.mostrarLoading();
        let formUsuario = this.registrarForm.value;
        let usuario: string = formUsuario.usuario;

        this.usuarioService.usuarioJaExiste(usuario)
            .first()
            .subscribe((usuarioJaExiste: boolean) => {
                if (!usuarioJaExiste) {

                    this.authService.criarAuthUsuario({
                        email: formUsuario.email,
                        senha: formUsuario.senha
                    }).then((authUsuario: firebase.User) => {
            
                        delete formUsuario.senha;
                        let uuid: string = authUsuario.uid;
            
                        this.usuarioService.criar(formUsuario, uuid)
                            .then(() => {
                                console.log('Usuário cadastrado!');
                                this.navCtrl.setRoot(HomePage);
                                loading.dismiss();
                            }).catch((error: any) => {
                                console.log(error);
                                loading.dismiss();
                                this.mostrarAlert(error);
                            });
            
                    }).catch((error: any) => {
                        console.log(error);
                        loading.dismiss();
                        this.mostrarAlert(error);
                    });

                } else {
                    this.mostrarAlert(`O usuário ${usuario} já está sendo utilizado!`);
                    loading.dismiss();
                }
            });

    }

    private mostrarLoading(): Loading {
        let loading: Loading = this.loadingCtrl.create({
            content: 'Aguarde...'
        });

        loading.present();
        return loading;
    }

    private mostrarAlert(mensagem: string): void {
        this.alertCtrl.create({
            message: mensagem,
            buttons: ['Ok']
        }).present();
    }

}