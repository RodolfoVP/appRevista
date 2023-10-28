import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { ICostcenterValve } from 'src/app/models/costCenter.interface';

@Component({
  selector: 'app-cost-center-valve-page',
  templateUrl: './cost-center-valve-page.component.html',
  styleUrls: ['./cost-center-valve-page.component.scss']
})
export class CostCenterValvePageComponent {
  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private costCenterService:CostCenterService, private notifyService:NotificationService ){}

  registrarCostCenterValve( value: any ):void{

    let { costcValveIdReg, costCenterId, valveId, campaign, startDate, finishDate, area, mesureId } = value;
    
    console.log(value);
    this.costCenterService.insertValveCostCenter( costCenterId, valveId, campaign, startDate, finishDate, area, mesureId ).subscribe(
       (response:ICostcenterValve) =>{
  
        if( response.data.COSTCVALVEID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/centros-costos-valvulas']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Válvula:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarCostCenterValve( value:any){
    let { costcValveIdReg, costCenterId, valveId, campaign, startDate, finishDate, area, mesureId } = value;
    
    this.costCenterService.updateValveCostCenter( costcValveIdReg, costCenterId, valveId, campaign, startDate, finishDate, area, mesureId ).subscribe(
       (response:ICostcenterValve) =>{

        console.log( response.data);
        if( response.data.COSTCVALVEID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/centros-costos-valvulas']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Válvula:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }
}