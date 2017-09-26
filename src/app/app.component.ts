import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../providers/auth/auth.service';
import { UsuarioService } from '../providers/usuario/usuario.service';

import * as firebase from 'firebase/app';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage:any = LoginPage;
    usuarioAtual: Usuario;

    constructor(platform: Platform, 
                statusBar: StatusBar, 
                splashScreen: SplashScreen,
                authService: AuthService,
                usuarioService: UsuarioService) {

        authService
          .afAuth
          .authState
          .subscribe((authUsuario: firebase.User) => {

              if (authUsuario) {
                  usuarioService.usuarioAtual
                  .subscribe((usuario: Usuario) => {
                      this.usuarioAtual = usuario;
                  })
              }
          })
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
      });
    }
}

