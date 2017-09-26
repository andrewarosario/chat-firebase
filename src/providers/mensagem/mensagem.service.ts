import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Mensagem } from '../../models/mensagem.model';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { BaseService } from '../base/base.service';

import * as firebase from 'firebase/app';

@Injectable()
export class MensagemService extends BaseService{

    constructor(public db: AngularFireDatabase) {
        super();
    }

    criar(mensagem: Mensagem, listaDeMensagens: FirebaseListObservable<Mensagem[]>): firebase.Promise<void> {
        return listaDeMensagens.push(mensagem)
            .catch(this.handlePromiseError);
    }

    getMensagens(uidRemetente: string, uidDestinatario: string): FirebaseListObservable<Mensagem[]> {
        return <FirebaseListObservable<Mensagem[]>>this.db.list(`/mensagem/${uidRemetente}-${uidDestinatario}`, {
            query: {
                orderByChild: 'timestamp',
                limitToLast: 30
            }
        }).catch(this.handleObservableError);
    }

}
