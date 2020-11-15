import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'

//importando mis modulos
import { ComponentsModule } from './components/components.module'
import { PagesModule } from './pages/pages.module'
import { PipesModule } from './pipes/pipes.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule, // Importo el modulo de componentes  y puedo utilizar todos los componentes que tego exportados ahi
    PagesModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
