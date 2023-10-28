import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
import { PhenologyService } from 'src/app/services/phenology.service';
import { IPhenology } from 'src/app/models/phenology.interface';

@Component({
  selector: 'app-phenology-page',
  templateUrl: './phenology-page.component.html',
  styleUrls: ['./phenology-page.component.scss']
})
export class PhenologyPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private phenologyService:PhenologyService, private notifyService:NotificationService ){}

  registrarPhenology( value: any ):void{

    let { phenologyidReg, sequens, description , cultiveId , fertsappl } = value;
    
    this.phenologyService.insertPhenology( sequens, description , cultiveId , fertsappl  ).subscribe(
       (response:IPhenology) =>{
  
        if( response.data.PHENOLOGYID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/fenologias']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar fenologia:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarPhenology( value:any){

    let { phenologyidReg, sequens, description , cultiveId , fertsappl } = value;
    
    this.phenologyService.updatePhenology( phenologyidReg, sequens, description , cultiveId , fertsappl ).subscribe(
       (response:IPhenology) =>{
  
        if( response.data.PHENOLOGYID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/fenologias']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al actualizar fenología:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }

}
