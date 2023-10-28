import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
import { VarietyService } from 'src/app/services/variety.service';
import { IVariety } from 'src/app/models/variety.interface';

@Component({
  selector: 'app-variety-page',
  templateUrl: './variety-page.component.html',
  styleUrls: ['./variety-page.component.scss']
})
export class VarietyPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private varietyService:VarietyService, private notifyService:NotificationService ){}

  registrarVariety( value: any ):void{

    let { varietyIdReg, varietyCode, description , cultiveId  } = value;
    
    this.varietyService.insertVariety( varietyCode, description, cultiveId  ).subscribe(
       (response:IVariety) =>{
  
        if( response.data.VARIETYID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/variedades']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar variedad:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarVariety( value:any){

    let { varietyIdReg, varietyCode, description , cultiveId  } = value;
    
    this.varietyService.updateVariety( varietyIdReg, varietyCode, description , cultiveId  ).subscribe(
       (response:IVariety) =>{
  
        if( response.data.VARIETYID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/variedades']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al actualizar variedad:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }
}
