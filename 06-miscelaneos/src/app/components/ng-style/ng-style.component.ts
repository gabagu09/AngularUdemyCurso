import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [style.fontSize.px]="tamano">
     Hola mundo está es una etiqueta html
    </p>
    <button class="btn btn-primary" (click)="tamano = tamano + 2">
     <i class="fa fa-plus"></i>
    </button>
    <button class="btn btn-primary" (click)="tamano = tamano - 2">
     <i class="fa fa-minus"></i>
    </button>
  `,
  styles: [
  ]
})
export class NgStyleComponent implements OnInit {

  tamano: number = 40;

  constructor() { }

  ngOnInit(): void {
  }

}
