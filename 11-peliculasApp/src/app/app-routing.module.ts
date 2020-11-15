import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/pages/home/home.component'
import { PeliculaComponent } from '../app/pages/pelicula/pelicula.component'
import { BuscarComponent } from '../app/pages/buscar/buscar.component'

const routes: Routes = [
  { path:'home' , component: HomeComponent},
  { path:'pelicula/:id' , component: PeliculaComponent},
  { path:'buscar/:texto' , component: BuscarComponent},
  { path:'**' , pathMatch: 'full' , redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
