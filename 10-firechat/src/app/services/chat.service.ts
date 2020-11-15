import { Injectable } from '@angular/core';
import  {  AngularFirestore ,  AngularFirestoreCollection  }  from  '@angular/fire/firestore'; 
import { map } from 'rxjs/operators';

import { Mensaje } from '../interfaces/mensaje.interface'


import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  chats: any[] =[];

  public usuario: any = {};

  constructor(private afs: AngularFirestore,
    public auth: AngularFireAuth) {
      this.auth.authState.subscribe( user => {
        console.log('estado del usuario', user);
        if(!user){
          return;
        }
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;

      })
    }

    login( proveedor: string) {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
      this.usuario = {};
      this.auth.signOut();
    }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map( (messages: Mensaje[])=> {
        // console.log (messages);
        // this.chats = messages;
        this.chats = [];
        for(let mensaje of messages){
          this.chats.unshift(mensaje);
        }
      }));
  }

  agregarMensaje( texto: string){
    let mensaje: Mensaje ={
      nombre: this.usuario.nombre ,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
     return this.itemsCollection.add(mensaje);
  }
}
