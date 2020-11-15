import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

//Modelo, Interfaces
import { PeliculaDetalles } from 'src/app/interfaces/peliculaDetalle';
import { Cast } from 'src/app/interfaces/creditos';

//Servicios
import { PeliculasService } from 'src/app/services/peliculas.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: PeliculaDetalles;
  casting: Cast[]= [];

  constructor( private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router ) { }

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    // const id = this.activatedRoute.snapshot.params.id;

  combineLatest([ this.peliculasService.getPeliculaDetalle(id),
                  this.peliculasService.getCast(id) ])
                .subscribe( ([pelicula, cast]) => { //desestructuracion de arreglos ([pelicula, cast]) typescript
                  if(!pelicula){
                    this.router.navigateByUrl('/home');
                    return;
                  }
                  this.pelicula = pelicula;
                  this.casting = cast.filter( actor => actor.profile_path !== null);
                })
    // COMBINO LAS DOS PETICIONES CON EL combineLatest arriba mejor manera de hacer
    // que separado como abajo
    // this.peliculasService.getPeliculaDetalle(id)
    //     .subscribe( result => {
    //       if(!result){
    //         this.router.navigateByUrl('/home');
    //         return;
    //       }
    //       this.pelicula = result;
    //     });

    // this.peliculasService.getCast(id)
    //   .subscribe(result => {
    //     // console.log(result)
    //     //this.casting = result;
    //     //filtrando solo los actores que tienen imagen
    //     this.casting = result.filter( actor => actor.profile_path !== null);
    //   });
  }

  regresar(){
    this.location.back();
  }

}
