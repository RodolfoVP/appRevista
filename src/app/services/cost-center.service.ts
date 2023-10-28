import { Injectable } from '@angular/core';
import { apiCredenciales, apiHost, apiRuta } from '../models/api.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICostCenterList } from '../models/costCenterList.interface';
import { CostCenterValve, ICostCenter, ICostcenterValve, ICostcenterValveList } from '../models/costCenter.interface';
import { IcostCenterPhenologyList } from '../models/costCenterPhenology.interface';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  private apiCostCenterTable: string = apiHost.host + apiRuta.costCenterList;
  private apiCostCenterInsert: string = apiHost.host + apiRuta.costCenterInsert;
  private apiCostCenterUpdate: string = apiHost.host + apiRuta.costCenterUpdate;
  private apiCostCenterPhenologyTable: string = apiHost.host + apiRuta.costCenterPhenologyList;
  private apiCostCenterPhenologyInsert: string = apiHost.host + apiRuta.costCenterPhenologyInsert;
  private apiCostCenterValveTable: string = apiHost.host + apiRuta.costCenterValveList;
  private apiCostCenterValveInsert: string = apiHost.host + apiRuta.costCenterValveInsert;
  private apiCostCenterValveUpdate: string = apiHost.host + apiRuta.costCenterValveUpdate;

  constructor( private http: HttpClient ) { }

  getTableCostCenter(token: string | any , costCenterIdReg:string ): Observable<ICostCenterList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_costcenterid: costCenterIdReg };
    
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostCenterList>(this.apiCostCenterTable, body, httpOptions );
    return respuesta;  

  }
  
  insertCostCenter( costCenterCode:string, description: string, varietyId:string, campaign:string, startDate: string , finishDate: string , area:string, mesureId:string ): Observable<ICostCenter> {
    
    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_costcentercode: costCenterCode, pm_description: description, pm_varietyid: varietyId, pm_campaign: campaign, pm_startdate: startDate, pm_finishdate: finishDate, pm_area: area, pm_mesureid: mesureId };
  
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostCenter>(this.apiCostCenterInsert, body, httpOptions );

    return respuesta; 

  }
  updateCostCenter( costCenterIdReg:string, costCenterCode:string, description: string, varietyId:string, campaign:string, startDate: string , finishDate: string , area:string, mesureId:string ): Observable<ICostCenter> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_costcenterid: costCenterIdReg, pm_costcentercode: costCenterCode, pm_description: description, pm_varietyid: varietyId, pm_campaign: campaign, pm_startdate: startDate, pm_finishdate: finishDate, pm_area: area, pm_mesureid: mesureId };
    
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostCenter>(this.apiCostCenterUpdate, body, httpOptions );

    return respuesta; 

  }


  cambiarEstadoCostCenter( costCenterIdReg: string, status: string, cerrar: string  ): Observable<ICostCenter> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_costcenterid: costCenterIdReg, pm_status: status , pm_cerrar: cerrar  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostCenter>(this.apiCostCenterUpdate, body, httpOptions );

    return respuesta; 

  }

  getdurationCostCenterPhenology(token: string | any , costCenterId:string , cultiveid:string ): Observable<IcostCenterPhenologyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_costcenterid: costCenterId , pm_cultiveid: cultiveid };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IcostCenterPhenologyList>(this.apiCostCenterPhenologyTable, body, httpOptions );
    return respuesta;  

  }

  insertDurationCostCenterPhenology(token: string | any , duration:string ): Observable<IcostCenterPhenologyList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token , pm_duracion: duration };

    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<IcostCenterPhenologyList>(this.apiCostCenterPhenologyInsert, body, httpOptions );
    return respuesta;  

  }

  getTableValveCostCenter(token: string | any, costcValveId:string , costCenterId:string ): Observable<ICostcenterValveList> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_token: token ,pm_costcvalveid: costcValveId, pm_costcenterid: costCenterId };
    
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostcenterValveList>(this.apiCostCenterValveTable, body, httpOptions );
    return respuesta;  

  }
  
  insertValveCostCenter( costcenterid:string, valveid:string, campaign:string, startdate:string, finishdate:string, area:string, mesureid:string ): Observable<ICostcenterValve> {
    
    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_costcenterid: costcenterid, pm_valveid: valveid, pm_campaign: campaign, pm_startdate: startdate, pm_finishdate: finishdate, pm_area: area, pm_mesureid: mesureid };
 
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostcenterValve>(this.apiCostCenterValveInsert, body, httpOptions );

    return respuesta; 

  }
  updateValveCostCenter( costcvalveid:string, costcenterid:string, valveid:string, campaign:string, startdate:string, finishdate:string, area:string, mesureid:string ): Observable<ICostcenterValve> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    let data = { pm_costcvalveid: costcvalveid, pm_costcenterid: costcenterid, pm_valveid: valveid, pm_campaign: campaign, pm_startdate: startdate, pm_finishdate: finishdate, pm_area: area, pm_mesureid: mesureid };

    
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostcenterValve>(this.apiCostCenterValveUpdate, body, httpOptions );

    return respuesta; 

  }

  changeStateValveCostCenter( costcvalveid: string, status: string, cerrar: string  ): Observable<ICostcenterValve> {

    const user = apiCredenciales.usuario; 
    const pass = apiCredenciales.password;
    
    let data = { pm_costcvalveid: costcvalveid, pm_status: status , pm_cerrar: cerrar  };
    let body: HttpParams = new HttpParams().set( 'pm_parametros' , JSON.stringify(data)  );

    const httpOptions = {
      headers: new HttpHeaders().set( 'Content-Type' , 'application/x-www-form-urlencoded' )
      .append('Content-Length', body.toString().length.toString() )
      .append( 'Authorization', 'Basic ' + btoa(user + ':' + pass) )
    };

    let respuesta = this.http.post<ICostcenterValve>(this.apiCostCenterValveUpdate, body, httpOptions );

    return respuesta; 

  }

}
