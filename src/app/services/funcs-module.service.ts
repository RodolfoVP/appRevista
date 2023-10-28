import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IFuncModule } from '../models/funcsModule.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncsModuleService {

  private apiFunc: string = apiHost.host + apiRuta.moduleFuncs;
  constructor( private http: HttpClient ) { }

  funcsObtener(token: string , moduleId:string , funcId:string): Observable<IFuncModule> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token, pm_id_modulo: moduleId , pm_id_func: funcId };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };


    let respuesta = this.http.post<IFuncModule>(this.apiFunc, body, httpOptions );
    //console.log(respuesta);
    return respuesta;  

  }
}
