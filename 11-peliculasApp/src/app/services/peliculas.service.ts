import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Cartelera, Movie } from '../interfaces/cartelera'
import { PeliculaDetalles } from '../interfaces/peliculaDetalle'
import { Cast, Credios } from '../interfaces/creditos'

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor( private http: HttpClient) { }

  get params(){
    return{
      api_key:'89f897fa0d40e8065b4d60a383ed0930',
      language:'es-ES',
      page: this.carteleraPage.toString()
    }
  }
  
  reserCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{

    if(this.cargando){
      return of([]);
    }
    this.cargando = true;
    
    return this.http.get<Cartelera>(`${this.baseURL}/movie/now_playing`, {
      params:this.params
    }).pipe(
      map( (resp) => resp.results),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
        console.log("llamando api");
      })
    ); 
  }


  buscarPeiculas( texto:string): Observable<Movie[]>{
    const params = {...this.params ,page : '1', query: texto}
    //https://api.themoviedb.org/3/search/movie?api_key=89f897fa0d40e8065b4d60a383ed0930&language=es-ES&page=1&include_adult=false
    return this.http.get<Cartelera>(`${this.baseURL}/search/movie`,{
      params: params
    }).pipe(
      map( resp => resp.results)
    );
  }

  //https://api.themoviedb.org/3/movie/560050?api_key=89f897fa0d40e8065b4d60a383ed0930&language=en-US
  
  getPeliculaDetalle(id: string):Observable<PeliculaDetalles>{
    return this.http.get<PeliculaDetalles>(`${this.baseURL}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getCast(id: string):Observable<Cast[]>{
    return this.http.get<Credios>(`${this.baseURL}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]))
    );
  }
}
