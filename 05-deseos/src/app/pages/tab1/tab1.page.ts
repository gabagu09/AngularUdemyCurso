import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


//Services
import { DeseosService } from 'src/app/services/deseos.service';

//Model
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = [];
  
  constructor( public deseosService: DeseosService, 
                private router: Router,
                public alertCtrl: AlertController) {
    this.listas = deseosService.listas;
  }

  async agregarLista(){
    //this.router.navigateByUrl('/tabs/tab1/agregar')
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Agregar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Titulo de la lista'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          }
        }, {
          text: 'Agregar',
          handler: ( data ) => {
            if(data.titulo.length === 0){
              return;
            }
            let idLista = this.deseosService.agregarLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);
            // console.log(data);
          }
        }
      ]
    });

    alert.present();
  }


 
}
