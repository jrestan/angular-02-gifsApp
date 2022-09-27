import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'  //que el provider este aqui en root ya no hace falta que lo especifique en gifs.module.ts en providers
})                    //ademas estado aqui como root puede ser usado de manera global en la aplicacion
export class GifsService {

  private serviceUrl: string  = "https://api.giphy.com/v1/gifs";
  private apikey    : string  = "NCm2krG0X17DybBug40HCIpJbOw1zhpI";
  private _historial: string[]= [];

  //TODO: cambiar any por su tipo de datos correspondiente
  //En https://quicktype.io/ se ha generado las interfaces segun el json obtenido
  public resultados: Gif[] = [];
  
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

      localStorage.setItem("historial", JSON.stringify(this._historial));
    }
    
    console.log(this._historial);

    const parametros = new HttpParams()
      .set("api_key", this.apikey)
      .set("q", query)
      .set("limit", 20);

    console.log(parametros.toString());



    //Como en javascript
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
    //En https://quicktype.io/ se ha generado las interfaces segun el json obtenido
    //el nombre que le asignamos es SearchGifsResponse
    //es mas seguro que manejarlo como any
    //this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=NCm2krG0X17DybBug40HCIpJbOw1zhpI&q=${query}&limit=10`)
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params: parametros} )
    .subscribe((resp)=>{
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem("resultado", JSON.stringify(this.resultados));
    });

  }

  constructor(private http: HttpClient) {
    /*if(localStorage.getItem("historial")){
      //se supone que con el if ya se valido pero aun asi muestra error...
      //por eso le agrego el sigo "!" para asegurar que no hay error...(video 88 Local Storage)
      this._historial = JSON.parse(localStorage.getItem("historial")!);
    }*/
    //Tambien se podria hacer asi en una sola linea
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];

    this.resultados = JSON.parse(localStorage.getItem("resultado")!) || [];
    /*if(this._historial.length){
      this.buscarGifs(this._historial[0]);
    }*/

  }
}
