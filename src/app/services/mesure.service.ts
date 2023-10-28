import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMesureList } from '../models/mesureList.interface';
import { IMesure } from '../models/mesure.interface';

@Injectable({
  providedIn: 'root'
})
export class MesureService {

  private apiMesureTable: string = apiHost.host + apiRuta.mesureList;
  private apiMesureInsert: string = apiHost.host + apiRuta.mesureInsert;
  private apiMesureUpdate: string = apiHost.host + apiRuta.mesureUpdate;

  constructor( private http: HttpClient  ) { }

  getTableMesures(token: string | any , pm_mesureId:string , pm_status: string , mesureType:string ): Observable<IMesureList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_mesureid: pm_mesureId , pm_status: pm_status , pm_mesureType: mesureType };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IMesureList>(this.apiMesureTable, body, httpOptions );
    return respuesta;  

  }

  insertMesure( description: string, symbol: string , mesuretypeid: string  ): Observable<IMesure> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_description: description, pm_symbol: symbol, pm_mesuretypeid: mesuretypeid };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IMesure>(this.apiMesureInsert, body, httpOptions );

    return respuesta; 

  }
  updateMesure( mesureId: string, description: string, symbol: string , mesuretypeid: string  ): Observable<IMesure> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_mesureid: mesureId, pm_description: description, pm_symbol: symbol, pm_mesuretypeid: mesuretypeid  };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IMesure>(this.apiMesureUpdate, body, httpOptions );

    return respuesta; 

  }

  cambiarEstadoMesure( mesureId: string, status: string  ): Observable<IMesure> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_mesureid: mesureId, pm_status: status  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IMesure>(this.apiMesureUpdate, body, httpOptions );

    return respuesta; 

  }

}
