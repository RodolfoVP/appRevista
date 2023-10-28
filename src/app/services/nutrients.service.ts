import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INutrientsList } from '../models/nutrientsList.interface';
import { INutrient } from '../models/nutrient.interface';


@Injectable({
  providedIn: 'root'
})
export class NutrientsService {

  private apiNutrientTable: string = apiHost.host + apiRuta.nutrientList;
  private apiNutrientInsert: string = apiHost.host + apiRuta.nutrientInsert;
  private apiNutrientUpdate: string = apiHost.host + apiRuta.nutrientUpdate;

  constructor( private http: HttpClient  ) { }

  getNutrientTable(token: string | any , nutrientId:string ): Observable<INutrientsList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_nutrientid: nutrientId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<INutrientsList>(this.apiNutrientTable, body, httpOptions );
    return respuesta;  

  }

  insertNutrient( description: string, symbol: string , mesureId: string  ): Observable<INutrient> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_description: description, pm_symbol: symbol, pm_mesureid: mesureId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<INutrient>(this.apiNutrientInsert, body, httpOptions );

    return respuesta; 

  }
  updateNutrient( nutrientId: string, description: string, symbol: string , mesureId: string  ): Observable<INutrient> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_nutrientid: nutrientId, pm_description: description, pm_symbol: symbol, pm_mesureid: mesureId  };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<INutrient>(this.apiNutrientUpdate, body, httpOptions );

    return respuesta; 

  }

  cambiarEstadoNutrient( nutrientId: string, status: string  ): Observable<INutrient> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_nutrientid: nutrientId, pm_status: status  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<INutrient>(this.apiNutrientUpdate, body, httpOptions );

    return respuesta; 

  }

}
