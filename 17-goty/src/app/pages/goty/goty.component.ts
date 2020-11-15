import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'

import { Game } from '../../interfaces/interfaces'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor( private gameService: GameService) { }

  ngOnInit(): void {

    this.gameService.getNominados().subscribe( resp => {
      console.log(resp);
      this.juegos = resp;
    });
  }

  votarJuego(juego: Game){
      let proces = true;
      if(proces){
        Swal.fire({
          title: 'Gracias',
          text: 'Estamos procesando su voto',
          icon: 'success'
        });
      }

      this.gameService.votarJuego( juego.id ).subscribe( (resp: any) => {
      //console.log(resp);
      if(resp.ok){
        Swal.fire({
          title: 'Gracias',
          text: resp.mensaje,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }else{
        Swal.fire({
          title: 'Oops',
          text: resp.mensaje,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }


}
