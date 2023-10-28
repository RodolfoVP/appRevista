import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRolesList } from '../models/rolesList.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiRolesSelect: string = apiHost.host + apiRuta.rolesList;
  constructor( private http: HttpClient) { }

  getRolesSelect(token: string | any ): Observable<IRolesList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IRolesList>(this.apiRolesSelect, body, httpOptions );
    return respuesta;  

  }
}
