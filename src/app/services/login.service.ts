import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { IPass } from '../models/confirm.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLogin: string    = apiHost.host + apiRuta.login;
  private apiconfirm: string  = apiHost.host + apiRuta.confirmPass;

  constructor( private http: HttpClient) { }

  login(usercode: string, password: string): Observable<IUser> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_usercode: usercode, pm_password: password };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };


    let respuesta = this.http.post<IUser>(this.apiLogin, body, httpOptions );


    return respuesta; 

  }

  confirmPass(password: string, passwordNew: string): Observable<IPass> {

    const user    = apiCredenciales.usuario; 
    const pass    = apiCredenciales.password;
    const token  = sessionStorage.getItem('token')?.toString();
    let data = { pm_token: token, pm_password: password, pm_passwordNew: passwordNew };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };


    let respuesta = this.http.post<IPass>(this.apiconfirm, body, httpOptions );


    return respuesta; 

  }


}
