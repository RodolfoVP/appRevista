import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPhenologyList } from '../models/phenologyList.interface';
import { IPhenology } from '../models/phenology.interface';
import { IPhenologyCultiveVarietyList } from '../models/phenologyCultiveVarietyList.interface';

@Injectable({
  providedIn: 'root'
})
export class PhenologyService {

  private apiPhenologyTable: string   = apiHost.host + apiRuta.phenologyList;
  private apiPhenologyInsert: string = apiHost.host + apiRuta.phenologyInsert;
  private apiPhenologyUpdate: string  = apiHost.host + apiRuta.phenologyUpdate;
  private apiPhenologyCultiveVarietyTable: string   = apiHost.host + apiRuta.phenologyCultiveVarietyList;

  constructor( private http: HttpClient  ) { }

  getPhenologyTable(token: string | any , phenologyId:string , cultiveid:string  ): Observable<IPhenologyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_phenologyid: phenologyId , pm_cultiveid: cultiveid  };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IPhenologyList>(this.apiPhenologyTable, body, httpOptions );
    return respuesta;  

  }

  insertPhenology( sequens: string , description: string , cultiveid: string , fertsappl: string  ): Observable<IPhenology> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;

    let data = { pm_sequens: sequens , pm_description: description , pm_cultiveid: cultiveid, pm_fertsappl: fertsappl };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IPhenology>(this.apiPhenologyInsert, body, httpOptions );

    return respuesta; 
    
  }
  updatePhenology( phenologyid: string, sequens: string , description: string , cultiveid: string , fertsappl: string  ): Observable<IPhenology> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_phenologyid : phenologyid , pm_sequens: sequens , pm_description: description , pm_cultiveid: cultiveid, pm_fertsappl: fertsappl };
    console.log(data);

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IPhenology>(this.apiPhenologyUpdate, body, httpOptions );

    return respuesta; 

  }
  
  cambiarEstadoPhenology( phenologyid: string, status: string  ): Observable<IPhenology> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_phenologyid: phenologyid, pm_status: status  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IPhenology>(this.apiPhenologyUpdate, body, httpOptions );

    return respuesta; 

  }

  getPhenologyCultiveVarietyList(token: string | any ): Observable<IPhenologyCultiveVarietyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IPhenologyCultiveVarietyList>(this.apiPhenologyCultiveVarietyTable, body, httpOptions );
    return respuesta;  

  }


}
