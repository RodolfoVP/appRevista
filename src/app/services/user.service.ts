import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserList } from '../models/userList.interface';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUserTable: string = apiHost.host + apiRuta.userList;
  private apiUserInsert: string = apiHost.host + apiRuta.userInsert;
  private apiUserUpdate: string = apiHost.host + apiRuta.userUpdate;
  constructor( private http: HttpClient) { }

  getTableUser(token: string | any , userCode:string ): Observable<IUserList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_usercode: userCode };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IUserList>(this.apiUserTable, body, httpOptions );
    return respuesta;  
 
  }
  
  insertUsuario(usercode: string, password: string , email: string , name: string , lastname: string , roleid: string  ): Observable<IUser> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_usercode: usercode, pm_password: password, pm_name: name, pm_lastname: lastname, pm_roleid: roleid, pm_email: email };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IUser>(this.apiUserInsert, body, httpOptions );

    return respuesta; 

  }

  updatetUsuario(usercode: string, password: string , email: string , name: string , lastname: string , roleid: string  ): Observable<IUser> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_usercode: usercode, pm_password: password, pm_name: name, pm_lastname: lastname, pm_roleid: roleid, pm_email: email };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IUser>(this.apiUserUpdate, body, httpOptions );

    return respuesta; 

  }

  cambiarEstadotUsuario(usercode: string, status: string  ): Observable<IUser> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_usercode: usercode, pm_status: status };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IUser>(this.apiUserUpdate, body, httpOptions );

    return respuesta; 

  }

}
