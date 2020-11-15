import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor( private el: ElementRef) {
    console.log("Directiva llamada");
    //el.nativeElement.style.backgroundColor ="yellow";
  }

  @HostListener('mouseenter') mouseEntro(){
    this.el.nativeElement.style.backgroundColor ="yellow";
  }
  @HostListener('mouseleave') mouseSalio(){
    this.el.nativeElement.style.backgroundColor = null;
  }
}
