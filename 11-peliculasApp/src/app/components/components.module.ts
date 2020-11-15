import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//las estrellas de dal calsificacion
import { RatingModule } from 'ng-starrating';

import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';

//Pipes
import { PipesModule } from '../pipes/pipes.module';




@NgModule({
  declarations: [ //declaracion de componentes que forman parte de mi modulo
    NavbarComponent, 
    SlideshowComponent, 
    PeliculasPosterGridComponent, CastSlideshowComponent
  ],
  exports: [
    NavbarComponent, //xporto porque voy a utilizar este componente afuera de este modulo
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule, 
    PipesModule
  ]
})
export class ComponentsModule { }
