import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


//Services
import { DeseosService } from 'src/app/services/deseos.service';


//Model
import { Lista } from '../../models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem= '';

  constructor( private deseosService: DeseosService, 
              private route: ActivatedRoute) { 
    const idLista = this.route.snapshot.paramMap.get('idLista');
    // console.log(idLista);
    this.lista = this.deseosService.getLista(idLista);
    // console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.nombreItem ='';
    // console.log(nuevoItem);
    this.lista.items.push(nuevoItem);
    this.deseosService.guradarStorage();
    // console.log(this.lista);
  }


  checkItem(item: ListaItem){

    const pendientes = this.lista.items.filter( itemData => { return !itemData.completado }).length;
    // console.log({pendientes});
    if(pendientes === 0){
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    }else{
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }
    // console.log(this.lista);
    this.deseosService.guradarStorage();
  }

  borrar(i: number){
    this.lista.items.splice( i, 1);
    this.deseosService.guradarStorage();
  }
}
