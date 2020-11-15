import { Pipe, PipeTransform } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, activa: boolean): string {
    // if(activa){
    //   let letras = value.split('');
    //   letras = letras.map( letra => {
    //     return "*";
    //   })
    //   return letras.join('');
    // }else{
    //   return value;
    // }
    // Alternativa a lo de arriba
    return (activa) ? '*'.repeat(value.length) : value;
  }

}
