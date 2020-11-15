import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

import { FileItem } from '../../models/file-items'

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  estaSobreDrop = false;
  archivos: FileItem[] = [];
  constructor( private _cargaImagenes: CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos(){
    this.archivos = [];
  }

  // pruebaSobreElemanto(event){
  //   console.log(event);
  // }

}
