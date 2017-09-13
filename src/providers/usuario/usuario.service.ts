import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';

import { Usuario } from "../../models/usuario.model";
import { BaseService } from "../base/base.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService extends BaseService{

    usuarios: FirebaseListObservable<Usuario[]>;

    constructor(public db: AngularFireDatabase) {
        super();
        this.usuarios = this.db.list(`/usuario`);
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
