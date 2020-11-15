import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos que voy a utilizar en este modulo
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';


//Componentes que forman parte de este modulo
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
import { RatingModule } from 'ng-starrating';




@NgModule({
  declarations: [
    HomeComponent, 
    PeliculaComponent, 
    BuscarComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule
  ]
})
export class PagesModule { }
