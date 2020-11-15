import { Pipe, PipeTransform } from '@angular/core';

//Model
import { Lista } from '../models/lista.model'

@Pipe({
  name: 'filtroCompletados',
  pure: false
})
export class FiltroCompletadosPipe implements PipeTransform {

  transform( listas: Lista[], terminado: boolean = true): Lista[] {
    return listas.filter( lista => lista.completada === terminado);
  }

}
