import { Injectable } from '@angular/core';


import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { YoutubeResponse } from '../models/youtube.models'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  //https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCKMrt9X-X1AJbfL2liAX0HPt-r0U4GfKU&playlistId=UUuaPTYj15JSkETGnEseaFFg&maxResults=10
  private youtubeURL = 'https://www.googleapis.com/youtube/v3';
  private apikey= 'AIzaSyCKMrt9X-X1AJbfL2liAX0HPt-r0U4GfKU';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
  
  constructor( private http: HttpClient ) { }


  getVideos(){

    const url = `${ this.youtubeURL }/playlistItems`;

    const params = new HttpParams()
          .set('part','snippet')
          .set('maxResults','10')
          .set('playlistId', this.playlist)
          .set('key', this.apikey)
          .set('pageToken', this.nextPageToken);
    return this.http.get<YoutubeResponse>( url , { params: params })
              .pipe(
                map( resp => {
                  this.nextPageToken = resp.nextPageToken;
                  return resp.items;
                }),
                map( item => {
                  return item.map( video => video.snippet );
                })
              );
  }
}
