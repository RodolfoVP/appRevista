import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFertilizerList } from '../models/fertilizersList.interface';
import { IFertilizer } from '../models/fertilizer.interface';
import { INutrientFertilizerList } from '../models/nutrientFertilizer.interface';


@Injectable({
  providedIn: 'root'
})
export class FertilizerService {

  private apiFertilizerTable: string = apiHost.host + apiRuta.fertilizeryList;
  private apiFertilizerInsert: string = apiHost.host + apiRuta.fertilizerInsert;
  private apiFertilizerUpdate: string = apiHost.host + apiRuta.fertilizerUpdate;
  private apiNutrientFertilizerTable: string = apiHost.host + apiRuta.nutrientFertilizerList;
  private apiNutrientFertilizerInsert: string = apiHost.host + apiRuta.nutrientFertilizerInsert;

  constructor( private http: HttpClient  ) { }

  getTableFertilizers(token: string | any , fertilizerId:string , pm_status: string , fertilizertype:string ): Observable<IFertilizerList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_fertilizerid: fertilizerId , pm_status: pm_status , pm_fertilizertype: fertilizertype };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IFertilizerList>(this.apiFertilizerTable, body, httpOptions );
    return respuesta;  

  }
  
  //Implementar api insert y update
  insertFertilizer( fertilizercode:string , description: string, status: string , abbreviation: string , mesureid:string , fertilizertype:string , price:string ): Observable<IFertilizer> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_fertilizercode: fertilizercode , pm_description: description, pm_status: status ,  pm_abbreviation: abbreviation, pm_mesureid: mesureid , pm_fertilizertype: fertilizertype, pm_price: price };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IFertilizer>(this.apiFertilizerInsert, body, httpOptions );

    return respuesta; 

  }
  updatefertilizer( fertilizerid:string, fertilizercode:string , description: string, status: string , abbreviation: string , mesureid:string , fertilizertype:string , price:string  ): Observable<IFertilizer> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_fertilizerid: fertilizerid, pm_fertilizercode: fertilizercode , pm_description: description, pm_status: status ,  pm_abbreviation: abbreviation, pm_mesureid: mesureid , pm_fertilizertype: fertilizertype, pm_price: price };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IFertilizer>(this.apiFertilizerUpdate, body, httpOptions );

    return respuesta; 

  }

  cambiarEstadoFertilizer( fertilizerid: string, status: string  ): Observable<IFertilizer> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_fertilizerid: fertilizerid, pm_status: status };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IFertilizer>(this.apiFertilizerUpdate, body, httpOptions );

    return respuesta; 

  }

  getConcentrationNutrientFertilizer(token: string | any , fertilizerid:string ): Observable<INutrientFertilizerList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token, pm_fertilizerid: fertilizerid };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<INutrientFertilizerList>(this.apiNutrientFertilizerTable, body, httpOptions );
    return respuesta;  

  }

  insertConcentrationNutrientFertilizer(token: string | any , concentration:string ): Observable<INutrientFertilizerList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_concentracion: concentration };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<INutrientFertilizerList>(this.apiNutrientFertilizerInsert, body, httpOptions );
    return respuesta;  

  }
  
}
