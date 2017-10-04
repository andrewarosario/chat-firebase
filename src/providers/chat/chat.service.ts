import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseService } from '../base/base.service';
import { Chat } from '../../models/chat.model';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ChatService extends BaseService {

    chats: FirebaseListObservable<Chat[]>;

    constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
        super();
        this.listarChats();
    }

    private listarChats() :void {
        this.afAuth
            .authState
            .subscribe((authUsuario: firebase.User) => {
                if (authUsuario) {
                    this.chats = <FirebaseListObservable<Chat[]>>this.db.list(`/chat/${authUsuario.uid}`, {
                        query: {
                            orderByChild: 'timestamp'
                        }
                    })
                    .map((chats: Chat[]) => {
                      return chats.reverse()
                    })
                    .catch(this.handleObservableError);
                }
            })
    }

    criar(chat: Chat, uidRemetente: string, uidDestinatario: string): firebase.Promise<void> {
        return this.db.object(`/chat/${uidRemetente}/${uidDestinatario}`)
          .set(chat)
          .catch(this.handlePromiseError);
    }

    getDeepChat(uidRemetente: string, uidDestinatario: string): FirebaseObjectObservable<Chat> {
        return <FirebaseObjectObservable<Chat>>this.db.object(`/chat/${uidRemetente}/${uidDestinatario}`)
          .catch(this.handleObservableError);
    }

    atualizaFoto(chat: FirebaseObjectObservable<Chat>, fotoChat: string, fotoDestinatario: string): firebase.Promise<boolean> {   
        if (fotoChat != fotoDestinatario) {
            return chat.update({
                foto: fotoDestinatario
            }).then(() => {
                return true;
            }).catch(this.handlePromiseError);
        }
        return Promise.resolve(false);

    }

}
