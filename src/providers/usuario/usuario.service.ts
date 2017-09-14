import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';

import { Usuario } from "../../models/usuario.model";
import { BaseService } from "../base/base.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UsuarioService extends BaseService{

    usuarios: FirebaseListObservable<Usuario[]>;
    usuarioAtual: FirebaseObjectObservable<Usuario>;

    constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
        super();
        
        this.receberUsuarioLogado();
    }

    private listarUsuarios(uidUsuarioLogado: string): void {
        this.usuarios = <FirebaseListObservable<Usuario[]>>this.db.list(`/usuario`, {
            query: {
                orderByChild: 'nome'
            }
        }).map((usuarios: Usuario[]) => {
            return usuarios.filter((usuario: Usuario) => usuario.$key !== uidUsuarioLogado);
        })
    }

    private receberUsuarioLogado(): void {
        this.afAuth
            .authState
            .subscribe((authUsuario: firebase.User) => {
                if (authUsuario) {
                    this.usuarioAtual = this.db.object(`/usuario/${authUsuario.uid}`);
                    this.listarUsuarios(authUsuario.uid);
                }
            })
    }

    criar(usuario: Usuario, uuid: string): firebase.Promise<void> {
        return this.db.object(`/usuario/${uuid}`)
                .set(usuario)
                .catch(this.handlePromiseError);
    }

    usuarioJaExiste(usuario: string): Observable<boolean> {
        return this.db.list(`/usuario`, {
            query: {
                orderByChild: 'usuario',
                equalTo: usuario
            }
        }).map((usuarios: Usuario[]) => {
            return usuarios.length > 0;
        }).catch(this.handleObservableError);        
    }
}
