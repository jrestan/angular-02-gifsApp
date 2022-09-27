import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  //Con el signo de admiracion "!" garantizo de que el objeto no es nulo, si no lo pongo me marca como error
  //ElementRef solo de por si es de tipo generico, entonces habria que tiparlo como un HTMLInputElement
  //para que se pueda manejar como un input
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(termino: string){
    
    //console.log(termino);

    //termino=''; //esto no va a funcionar porque termino no tiene la referencia del objeto

    //No me funciona porque dice que el elemento podria ser null
    //modo javascript
    //Pero agregandole tambien el ! me funciono
    //document.querySelector('input')!.value='';

    //con esto ya no hace falta enviar el parametro "termino" que esta impreso arriba.
    //pero lo dejo ahi para tener el concepto

    const value = this.txtBuscar.nativeElement.value;
    //console.log(this.txtBuscar);
    //console.log(value);

    if(value.trim().length === 0){return;}

    this.gifsService.buscarGifs(value);

    //Con esto se limpia la caja de texto
    this.txtBuscar.nativeElement.value = ''; //si no se hubiera tipado como HTMLInputElement no se podria hacer esto
                                             //sin embargo en las pruebas que hice me funciono aun sin especificar <HTMLInputElement> en ElementRef
                                             
  }
  
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void { }
}
