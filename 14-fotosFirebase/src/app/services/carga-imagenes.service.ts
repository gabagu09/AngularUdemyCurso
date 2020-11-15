import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-items';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  
  private CARPETA_IMAGENES = 'img';   
  constructor( private db: AngularFirestore) { }

  cargarImagenesFirebase( imagenes: FileItem[]){
   // console.log(imagenes);
   const storageRef = firebase.default.storage().ref();
   for( const item of imagenes ){
     item.estaSubiendo = true;
     if(item.progreso >= 100){
       continue;
     } 

     const uploadTask: firebase.default.storage.UploadTask= storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombre}`)
     .put( item.archivo);

     uploadTask.on( firebase.default.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.default.storage.UploadTaskSnapshot ) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ,
        (error) => console.log("Error al subir", error),
        async () => {
          console.log("Imagen cargada correctamente");
          item.url =  await uploadTask.snapshot.ref.getDownloadURL();
          item.estaSubiendo = false
          this.guardarImagen({
            nombre: item.nombre,
            url: item.url
          })
        }

      )
   }
  }

  guardarImagen( imagen: { nombre: string , url: string }) {
    this.db.collection<{ nombre: string , url: string }>(`${ this.CARPETA_IMAGENES }`)
        .add(imagen); 
  }
}
