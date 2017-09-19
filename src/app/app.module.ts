import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrarPage } from "../pages/registrar/registrar";
import { UsuarioService } from "../providers/usuario/usuario.service";
import { AuthService } from '../providers/auth/auth.service';
import { LoginPage } from "../pages/login/login";
import { CustomHeaderLogadoComponent } from "../components/custom-header-logado/custom-header-logado.component";
import { CapitalizePipe } from "../pipes/capitalize.pipe";
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyAPxwo9lHdDXDJBNXQLyHj5f_PA7YYbAO8",
    authDomain: "chat-firebase-7cad8.firebaseapp.com",
    databaseURL: "https://chat-firebase-7cad8.firebaseio.com",
    projectId: "chat-firebase-7cad8",
    storageBucket: "chat-firebase-7cad8.appspot.com",
    messagingSenderId: "735843606451"
  };
    
@NgModule({
    declarations: [
      MyApp,
      HomePage,
      RegistrarPage,
      LoginPage,
      CustomHeaderLogadoComponent,
      CapitalizePipe,
      ChatPage
    ],
    imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseAppConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,   
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp,
      HomePage,
      RegistrarPage,
      LoginPage,
      ChatPage
    ],
    providers: [
      StatusBar,
      SplashScreen,
      UsuarioService,
      AuthService,
      ChatService,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {}
