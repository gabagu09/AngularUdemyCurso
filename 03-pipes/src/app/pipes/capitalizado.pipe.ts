import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    value = value.toLocaleLowerCase();
    let palabras = value.split(' ');


    palabras = palabras.map( palabra => {
      return palabra[0].toUpperCase() + palabra.substr(1);
    })
    return palabras.join(' ');
  }

}
