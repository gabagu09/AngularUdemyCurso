import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    // const lista1 = new Lista('Recolectar las piedras del infinito');
    // const lista2 = new Lista('Heroes');

    // this.listas.push(lista1, lista2);
    this.obtenerStorage();
    // console.log(this.listas);
  }


  agregarLista( titulo: string){
    let nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guradarStorage();
    return nuevaLista.id;
  }

  borrarLista( lista: Lista){
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id);
    this.guradarStorage();
    this.obtenerStorage();
    return this.listas;
  }

  getLista(idLista: string | number){
    idLista = Number(idLista);
    // console.log(idLista);
    return this.listas.find( listaData => listaData.id === idLista); 
  }

  guradarStorage(){
    localStorage.setItem( "data", JSON.stringify(this.listas));
  }

  obtenerStorage(){
    if(localStorage.getItem("data")){
      this.listas = JSON.parse(localStorage.getItem("data"))
    }

   
  }
}
