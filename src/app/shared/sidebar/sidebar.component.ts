import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  //styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  buscar(termino: string){
    //console.log(termino);
    this.gifsService.buscarGifs(termino);
  }

  get historial(): string[]{
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

}
