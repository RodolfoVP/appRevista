import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken } from '../models/token.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenVerificationService {

  private apiToken: string = apiHost.host + apiRuta.tokenVerificar;
  constructor( private http: HttpClient) { }

  tokenVerificar(token: string , userid:string): Observable<IToken> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token, pm_userid: userid};

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };


    let respuesta = this.http.post<IToken>(this.apiToken, body, httpOptions );
    //console.log(respuesta);
    return respuesta;  

  }

  getTokenVerification(): boolean{

    // Validando la existencia de token para continuar 
    let token:any   = sessionStorage.getItem('token')?.toString();
    if( token == '' ){
      return false
    }else{
      return true;
    }
    
    
    /*
    let token:any   = sessionStorage.getItem('token')?.toString();
    let userid:any  = sessionStorage.getItem('user_id')?.toString();
    
    this.tokenVerificar( token , userid ).subscribe(
       (response:IToken) =>{
        console.log(response);
      },
      (error) => { console.error(`Ha ocurrido un error al hacer login:  ${error}`); console.log(error); },
      () => console.info('Peticion de login terminado')
    )
    */    
  }
}
