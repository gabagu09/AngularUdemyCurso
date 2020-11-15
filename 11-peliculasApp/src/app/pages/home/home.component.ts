import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera';
import {PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  peliculas: Movie[] = [];
  peliculasSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop ||document.body.scrollTop ) + 1000;
    const max =(document.documentElement.scrollHeight ||document.body.scrollHeight );
    if(pos> max){
      if(  this.peliculasService.cargando ){ return;}
      this.peliculasService.getCartelera().subscribe( resp => {
        this.peliculas.push(...resp);
      });
    }
  }

  constructor( private peliculasService: PeliculasService ) { }

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe( resp => {
      // console.log(resp.results);
      this.peliculas = resp;
      this.peliculasSlideShow = resp;
    });
  }

  ngOnDestroy(): void{
    this.peliculasService.reserCarteleraPage();
  }
}
