import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera';

import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() peliculas: Movie[];

  private mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true
    })
  }

  onSlidePrev(){
    if(this.mySwiper == null){ return;}
      this.mySwiper.slidePrev();  
  }
  onSlideNext(){
    if(this.mySwiper == null){ return;}
      this.mySwiper.slideNext();
  }

}
