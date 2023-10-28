import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMesure } from 'src/app/models/mesure.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { MesureService } from 'src/app/services/mesure.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-unidad-page',
  templateUrl: './unidad-page.component.html',
  styleUrls: ['./unidad-page.component.scss']
})
export class UnidadPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private mesureSService:MesureService, private notifyService:NotificationService ){}

  registrarMesure( value: any ):void{

    let { mesureCode, description , symbol , mesureType  } = value;
    console.log(value);
    this.mesureSService.insertMesure( description, symbol, mesureType  ).subscribe(
       (response:IMesure) =>{
  
        if( response.data.MESUREID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/unidades']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar Unidad de medida:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarMesure( value:any){
    let { mesureCode, description , symbol , mesureType  } = value;
    console.log(value, mesureCode);
    this.mesureSService.updateMesure( mesureCode, description, symbol, mesureType  ).subscribe(
       (response:IMesure) =>{
  
        if( response.data.MESUREID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/unidades']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al actualizar Unidad de medida:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }

  
}
