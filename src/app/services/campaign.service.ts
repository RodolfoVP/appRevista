import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICampaignList } from '../models/campaignList.interface';
import { ICampaign } from '../models/campaign.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiCampaignTable: string = apiHost.host + apiRuta.campaignList;
  private apiCampaignInsert: string = apiHost.host + apiRuta.campaignInsert;
  private apiCampaignUpdate: string = apiHost.host + apiRuta.campaignUpdate;

  constructor( private http: HttpClient ) { }

  getTableCampaign(token: string | any , campaignId:string , status: string ): Observable<ICampaignList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_campaignid: campaignId , pm_status: status };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICampaignList>(this.apiCampaignTable, body, httpOptions );
    return respuesta;  

  }

  insertCampaign( campaigncode:string, description: string, startdate: string , finishdate: string  ): Observable<ICampaign> {
    
    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_campaigncode: campaigncode, pm_description: description, pm_startdate: startdate, pm_finishtdate: finishdate };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICampaign>(this.apiCampaignInsert, body, httpOptions );

    return respuesta; 

  }
  updateCampaign( campaignId:string, campaigncode:string, description: string, startdate: string , finishtdate: string  ): Observable<ICampaign> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_campaignId: campaignId, pm_campaigncode: campaigncode, pm_description: description, pm_startdate: startdate, pm_finishtdate: finishtdate  };
    console.log(data);
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICampaign>(this.apiCampaignUpdate, body, httpOptions );

    return respuesta; 

  }

  cambiarEstadoCampaign( campaignId: string, status: string, cerrar: string  ): Observable<ICampaign> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_campaignId: campaignId, pm_status: status , pm_cerrar: cerrar  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICampaign>(this.apiCampaignUpdate, body, httpOptions );

    return respuesta; 

  }

}
