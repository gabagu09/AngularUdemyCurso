import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1/"; 
  private apiKey= "AIzaSyD8YA-JjUev-k4SPFm_Azraa8o6QJ0NwJ8";

  userToken: string;
  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient) {
    this.leerToken();
   }

  login( usuario: UsuarioModel ){
    const authData ={
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}accounts:signInWithPassword?key=${this.apiKey}`, 
      authData
    ).pipe(
      map( resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  public logout(){
    localStorage.removeItem('token');
  }

  nuevoUsuario( usuario: UsuarioModel ){
    const authData ={
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}accounts:signUp?key=${this.apiKey}`, 
      authData
    ).pipe(
      map( resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  private leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {
    if(this.userToken.length < 2){
      return false;
    }

    const expira= Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    
    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }

}
