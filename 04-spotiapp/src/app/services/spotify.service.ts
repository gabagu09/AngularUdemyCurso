import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { }


  getQuery( query: string){
    const url= `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDsKg3Wm38b-J0bD1DHAnhAPOVT4DJi8_f_vzz5LY0nvyvMbPVk19BmGESbfOK_xK1ZuTzt1AZhmyOZrK'
    }); 

    return this.http.get( url , { headers });
  }


  getNewReleases(){
    

    return this.getQuery('browse/new-releases?limit=20')
        .pipe( map( data =>{
          return data['albums'].items;
        }));
    // this.http.get('https://api.spotify.com/v1/browse/new-releases' , {headers})
    //   .pipe( map( data =>{
    //     return data['albums'].items;
    //   }));
  }

  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe( map( data => data['artists'].items ));
    //  return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist` , {headers})
    
  }

  getArtista(id: string){
     return this.getQuery(`artists/${id}`)
     // .pipe( map( data => data['artists'].items ));
    //  return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist` , {headers})
    
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe( map( data => data['tracks'] ));
   //  return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist` , {headers}) 
 }
}
