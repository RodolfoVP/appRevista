import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IValve, IValveList } from '../models/valve.interface';

@Injectable({
  providedIn: 'root'
})
export class ValveService {

  private apiValveTable: string = apiHost.host + apiRuta.valveList;
  private apiValveInsert: string = apiHost.host + apiRuta.valveInsert;
  private apiValveUpdate: string = apiHost.host + apiRuta.valveUpdate;

  constructor( private http: HttpClient  ) { }

  getValveList(token: string | any , valveId:string , status: string ): Observable<IValveList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_valveid: valveId , pm_status: status };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IValveList>(this.apiValveTable, body, httpOptions );
    return respuesta;  

  }

  insertValve( valveCode: string, description: string, area: string, mesureId:string, status: string   ): Observable<IValve> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_valvecode : valveCode, pm_description : description, pm_area : area, pm_mesureid : mesureId, pm_status : status  };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IValve>(this.apiValveInsert, body, httpOptions );

    return respuesta; 

  }
  updateValve( valveId: string, valveCode: string, description: string, area: string, mesureId:string, status: string ): Observable<IValve> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_valveid : valveId, pm_valvecode : valveCode, pm_description : description, pm_area : area, pm_mesureid : mesureId, pm_status : status  };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IValve>(this.apiValveUpdate, body, httpOptions );

    return respuesta; 

  }

  changeStatusValve( valveId: string, status: string  ): Observable<IValve> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_valveid: valveId, pm_status: status  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IValve>(this.apiValveUpdate, body, httpOptions );

    return respuesta; 

  }
}
