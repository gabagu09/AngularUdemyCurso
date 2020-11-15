import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform( poster: string): String {
    if(poster){
      return 'http://image.tmdb.org/t/p/w500' + poster;
    }else{
      return './assets/no-image.jpg';
    }
    //http://image.tmdb.org/t/p/w500{{ pelicula.poster_path}}
  }

}
