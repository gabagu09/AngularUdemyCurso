import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/creditos';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() casting : Cast[];

  private mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
    //console.log(this.casting);
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      // loop: true
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15

    })
  }

}
