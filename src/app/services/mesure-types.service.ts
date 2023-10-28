import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMesureTypeList } from '../models/mesureTypes.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';

@Injectable({
  providedIn: 'root'
})
export class MesureTypesService {

  private apiMesureTypesTable: string = apiHost.host + apiRuta.mesureTypeList;

  constructor( private http: HttpClient  ) { }

  getTableMesureTypes(token: string | any ): Observable<IMesureTypeList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IMesureTypeList>(this.apiMesureTypesTable, body, httpOptions );
    return respuesta;  

  }
}
