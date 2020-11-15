import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';


//Services
import { DeseosService } from 'src/app/services/deseos.service';

//Model
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  listas: Lista[] = [];

  @ViewChild ( IonList, {static:false} ) list: IonList; 
  @Input() terminadas = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              public alertCtrl: AlertController
    ) {
      this.listas = this.deseosService.listas;
    }

  ngOnInit() {
  }

  seleccionarLista(idLista: number){
    this.listas = this.deseosService.listas;
    if(this.terminadas){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${idLista}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);
    }
    this.listas = this.deseosService.listas;
  }

  borrarLista(lista: Lista){
    //this.listas = this.deseosService.listas;
    this.listas = this.deseosService.borrarLista(lista);
    //this.listas = this.deseosService.listas;
  }

  async renombrarLista(lista: Lista){
    const alert = await this.alertCtrl.create({
      header: 'Renombrar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Titulo de la lista'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
            this.list.closeSlidingItems();
          }
        }, {
          text: 'Renombrar',
          handler: ( data ) => {
            if(data.titulo.length === 0){
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guradarStorage();
            this.list.closeSlidingItems();
            // console.log(data);
          }
        }
      ]
    });

    alert.present();
  }
}
