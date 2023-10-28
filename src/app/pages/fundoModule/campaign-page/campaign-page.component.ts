import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICampaign } from 'src/app/models/campaign.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { CampaignService } from 'src/app/services/campaign.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private campaignService:CampaignService, private notifyService:NotificationService ){}

  registrarCampaign( value: any ):void{
    
    let { campaignIdReg, campaignCode,  description, startdate,finishdate  } = value;
    console.log(value);
    this.campaignService.insertCampaign( campaignCode,  description, startdate,finishdate ).subscribe(
       (response:ICampaign) =>{
  
        if( response.data.CAMPAIGNID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/campanias']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Campaña:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarCampaign( value:any){
    let { campaignIdReg, campaignCode,  description, startdate,finishdate  } = value;
    console.log(value);
    this.campaignService.updateCampaign( campaignIdReg, campaignCode,  description, startdate,finishdate ).subscribe(
       (response:ICampaign) =>{
  
        if( response.data.CAMPAIGNID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/campanias']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Campaña:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }

}
