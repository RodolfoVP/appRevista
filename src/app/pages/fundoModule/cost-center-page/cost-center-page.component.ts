import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { ICostCenter } from 'src/app/models/costCenter.interface';

@Component({
  selector: 'app-cost-center-page',
  templateUrl: './cost-center-page.component.html',
  styleUrls: ['./cost-center-page.component.scss']
})
export class CostCenterPageComponent {
  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private costCenterService:CostCenterService, private notifyService:NotificationService ){}

  registrarCostCenter( value: any ):void{
    
    let { costCenterIdReg, costCenterCode, description, cultiveId, varietyId, campaign, startDate, finishDate, area, mesureId } = value;
    console.log(value);
    this.costCenterService.insertCostCenter( costCenterCode, description, varietyId, campaign, startDate, finishDate, area, mesureId  ).subscribe(
       (response:ICostCenter) =>{
  
        if( response.data.COSTCENTERID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/centros-costos']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Centro de costo:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarCostCenter( value:any){
    let { costCenterIdReg, costCenterCode, description, cultiveId, varietyId, campaign, startDate, finishDate, area, mesureId } = value;
    console.log(value);
    this.costCenterService.updateCostCenter( costCenterIdReg, costCenterCode, description, varietyId, campaign, startDate, finishDate, area, mesureId ).subscribe(
       (response:ICostCenter) =>{

        console.log( response.data);
        if( response.data.COSTCENTERID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/centros-costos']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Centro de costo:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }
}
