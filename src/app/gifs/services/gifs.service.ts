import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  //que el provider este aqui en root ya no hace falta que lo especifique en gifs.module.ts en providers
})                    //ademas estado aqui como root puede ser usado de manera global en la aplicacion
export class GifsService {

  private key: string = "NCm2krG0X17DybBug40HCIpJbOw1zhpI";
  private _historial: string[] = [];
  
  get historial(){
    //Aqui funciona pero es mejor ponerlo en buscar
    //this._historial = this._historial.splice(0, 10);
    return [...this._historial];
  }

  buscarGifs(query: string = ''){ //con esto = '' se asegura que siempre debe tener un valor. No lo he probado.

    query = query.trim().toLowerCase();
    
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    
    console.log(this._historial);

    //Con esto funciona.. Devuelve el json
    //Aqui se maneja el concepto de promesas que lo vi tambien en javascript o en spingboot
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=NCm2krG0X17DybBug40HCIpJbOw1zhpI&q=Dua Lipa&limit=10')
    .then(
      resp=>{
        resp.json().then(data=>{
          console.log(data);
        })
      }
    )*/

    //Con esto tambien funciona
    //se debe agregar el async en la declaracion de buscarGifs
    /*
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=NCm2krG0X17DybBug40HCIpJbOw1zhpI&q=Dua Lipa&limit=10');
    const data = await resp.json();
    console.log(data);
    */

    //Con angular se va a trabajar en base a observable que son mas poderoso que las promesas
    //tiene mas control qye la promesa
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=NCm2krG0X17DybBug40HCIpJbOw1zhpI&q=Dua Lipa&limit=10')
    .subscribe((resp: any)=>{
      console.log(resp.data);
    }
    )

  }

  constructor(private http: HttpClient) { }
}
