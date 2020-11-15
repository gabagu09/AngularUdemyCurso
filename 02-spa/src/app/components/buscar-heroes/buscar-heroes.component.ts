import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router'

//Services
import { HeroesService } from '../../servicios/heroes.service'

@Component({
  selector: 'app-buscar-heroes',
  templateUrl: './buscar-heroes.component.html',
  styles: [
  ]
})
export class BuscarHeroesComponent implements OnInit {

  heroes:any[] = [];
  term:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _heroeService: HeroesService
  ) { 
    this.activatedRoute.params.subscribe( params => {
      this.term = params['term'];
      this.heroes = this._heroeService.buscarHeroe(params['term']);
      console.log(this.heroes);
    })
  }

  ngOnInit(): void {
  }

}
