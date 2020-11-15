import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//interfaces // modelo
import { Movie } from 'src/app/interfaces/cartelera';

//Services
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

 texto: string = '';
 peliculas: Movie[] = [];

  constructor( private activatedRoute: ActivatedRoute,
                private peliculasService: PeliculasService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.texto = params.texto;
      //TODO llamar al servicio
      this.peliculasService.buscarPeiculas(params.texto).subscribe( peliculas => {
        //console.log(peliculas);
        this.peliculas = peliculas;
      });
    });
  }

}
