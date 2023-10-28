import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICultiveList } from '../models/cultiveList.interface';
import { ICultive, ICultiveNutrientIrrigationList, ICultiveNutrientList, ICultiveNutrientPhenologyList } from '../models/cultive.interface';

@Injectable({
  providedIn: 'root'
})
export class CultiveService {

  private apicultiveTable: string   = apiHost.host + apiRuta.cultiveList;
  private apicultivetInsert: string = apiHost.host + apiRuta.cultiveInsert;
  private apicultiveUpdate: string  = apiHost.host + apiRuta.cultiveUpdate;
  private apicultiveNutrientIrrigationTable: string   = apiHost.host + apiRuta.cultiveNutrientIrrigationList;
  private apicultiveNutrientTable: string   = apiHost.host + apiRuta.cultiveNutrienList;
  private apicultiveNutrientPhenologyTable: string   = apiHost.host + apiRuta.cultiveNutrienPhenologyList;

  constructor( private http: HttpClient  ) { }

  getCultiveTable(token: string | any , cultiveId:string ): Observable<ICultiveList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_cultiveid: cultiveId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultiveList>(this.apicultiveTable, body, httpOptions );
    return respuesta;  

  }

  insertCultive( cultiveCode: string , description: string  ): Observable<ICultive> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_cultivecode: cultiveCode , pm_description: description };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultive>(this.apicultivetInsert, body, httpOptions );

    return respuesta; 

  }
  updateCultive( cultiveId: string, cultiveCode: string , description: string   ): Observable<ICultive> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_cultiveid: cultiveId, pm_description: description, pm_cultivecode: cultiveCode  };
    console.log(data);

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultive>(this.apicultiveUpdate, body, httpOptions );

    return respuesta; 

  }

  cambiarEstadoCultive( cultivetId: string, status: string  ): Observable<ICultive> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_cultiveid: cultivetId, pm_status: status  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultive>(this.apicultiveUpdate, body, httpOptions );

    return respuesta; 

  }
  getCultiveNutrientIrrigationTable(token: string | any , cultiveId:string ): Observable<ICultiveNutrientIrrigationList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_cultiveid: cultiveId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultiveNutrientIrrigationList>(this.apicultiveNutrientIrrigationTable, body, httpOptions );
    return respuesta;  

  }
  getCultiveNutrientTable(token: string | any , cultiveId:string ): Observable<ICultiveNutrientList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_cultiveid: cultiveId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultiveNutrientList>(this.apicultiveNutrientTable, body, httpOptions );
    return respuesta;  

  }

  getCultiveNutrientPhenologyTable(token: string | any , nutxCultId:string , cultiveId:string ): Observable<ICultiveNutrientPhenologyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_nutxcultid: nutxCultId , pm_cultiveid: cultiveId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICultiveNutrientPhenologyList>(this.apicultiveNutrientPhenologyTable, body, httpOptions );
    return respuesta;  

  }

}
