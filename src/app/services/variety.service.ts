import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVarietyList } from '../models/varietyList.interface';
import { IVariety } from '../models/variety.interface';
import { IVarietyPhenologyList } from '../models/varietyPhenology.interface';

@Injectable({
  providedIn: 'root'
})
export class VarietyService {

  private apiVarietyTable: string           = apiHost.host + apiRuta.varietyList;
  private apiVarietyInsert: string          = apiHost.host + apiRuta.varietyInsert;
  private apiVarietyUpdate: string          = apiHost.host + apiRuta.varietyUpdate;
  private apiVarietyPhenologyList: string   = apiHost.host + apiRuta.varietyPhenologyList;
  private apiVarietyPhenologyInsert: string   = apiHost.host + apiRuta.varietyPhenologyInsert;  

  constructor( private http: HttpClient  ) { }

  getVarietyTable(token: string | any , varietyId:string , cultiveid:string ): Observable<IVarietyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_varietyid: varietyId , pm_cultiveid: cultiveid };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IVarietyList>(this.apiVarietyTable, body, httpOptions );
    return respuesta;  

  }
  insertVariety( varietyCode: string , description: string , cultiveid: string  ): Observable<IVariety> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_varietycode: varietyCode , pm_description: description , pm_cultiveid: cultiveid };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IVariety>(this.apiVarietyInsert, body, httpOptions );

    return respuesta; 
    
  }
  updateVariety( varietyid: string, varietyCode: string , description: string , cultiveid: string   ): Observable<IVariety> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_varietyid: varietyid, pm_varietycode: varietyCode , pm_description: description , pm_cultiveid: cultiveid };
    console.log(data);

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IVariety>(this.apiVarietyUpdate, body, httpOptions );

    return respuesta; 

  }
  cambiarEstadoVariety( varietytId: string, status: string  ): Observable<IVariety> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_varietyid: varietytId, pm_status: status  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IVariety>(this.apiVarietyUpdate, body, httpOptions );

    return respuesta; 

  }

  getdurationVarietyPhenology(token: string | any , varietyId:string , cultiveid:string ): Observable<IVarietyPhenologyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_varietyid: varietyId , pm_cultiveid: cultiveid };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IVarietyPhenologyList>(this.apiVarietyPhenologyList, body, httpOptions );
    return respuesta;  

  }

  insertDurationVarietyPhenology(token: string | any , duration:string ): Observable<IVarietyPhenologyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_duracion: duration };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IVarietyPhenologyList>(this.apiVarietyPhenologyInsert, body, httpOptions );
    return respuesta;  

  }
  
}
