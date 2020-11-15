import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre:string = "Capitán America";
  nombre2:string = "GaBrieL aGustiN VIlla AlVEz"
  arreglo:number[] = [1,2,3,4,5,6,7,8,9];
  PI: number = Math.PI;

  activar: boolean=true;

  porcentaje: number = 0.234;
  salario: number = 1234.5;
  idioma = "es";

  videoUrl: string = "https://www.youtube.com/embed/Uxpnia_hg0k" ;

  valorPromesa = new Promise<string>( (resolve) => {
    setTimeout(()=>{resolve('Llego la data')},4500);
  });

  heroe ={
    nombre: 'Logan',
    clave:'Wolverine',
    edad:500,
    direccion:{
      calle:'Primera',
      casa:20
    }
  }

  fecha: Date = new Date();

  setIdioma(idioma:string){
    this.idioma = idioma;
  }
}



