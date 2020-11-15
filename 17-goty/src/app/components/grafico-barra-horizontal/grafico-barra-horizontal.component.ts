import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnDestroy {
  
  @Input()  results: any[] = [];

  // results: any[] = [
  //   {
  //     "name": "Juego 1",
  //     "value": 233
  //   },
  //   {
  //     "name": "Juego 2",
  //     "value": 342
  //   },
  //   {
  //     "name": "Juego 3",
  //     "value": 143
  //   },
  //   {
  //     "name": "Juego 4",
  //     "value": 310
  //   }
  // ];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  //intervalo;

  constructor() {
    const newResult = [...this.results];
    // this.intervalo = setInterval( () => {
    //   console.log('pwd');
    //   for(let i in newResult){
    //     newResult[i].value = Math.round(Math.random()*500);
    //   } 
    //   this.results = [...newResult];
    // }, 1500);
  }

  ngOnDestroy(){
    //clearInterval(this.intervalo);
  }

  onSelect(event) {
    console.log(event);
  }
}
