import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rutaActual: any; 
  private arbolRutas: any;
  private cultivo: any;
  private centroCosto: any;
  private cargando: boolean = false;

  constructor() { }

  setData(rutaActual:any){ this.rutaActual = rutaActual; }
  getData(){ return this.rutaActual; }
  
  setArbol(arbolRutas:any){ this.arbolRutas = arbolRutas;}
  getArbol(){ return this.arbolRutas; }
  
  setcultivo(cultivo:any){ this.cultivo = cultivo;}
  getcultivo(){ return this.cultivo; }

  setCargando(cargando:boolean){ this.cargando = cargando;}
  getCargando(){ return this.cargando; }

  setCentroCosto(centroCosto:any){ this.centroCosto = centroCosto;}
  getCentroCosto(){ return this.centroCosto; }
}
