import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
 
import { Game } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
  juegos: Game[] = [];

  constructor( private http: HttpClient ) { }

  getNominados(){
    if(this.juegos.length === 0){
      return this.http.get<Game[]>(`${ environment.url }/api/goty`)
        .pipe(
          tap( resp => this.juegos = resp )
        );
    }else{
      return of(this.juegos);
    }
  }

  votarJuego(id: string){
    return this.http.post(`${ environment.url }/api/goty/${id}`,{})
        .pipe(
          catchError( err => {
            return of( err.error);
          })
        )
  }
}
