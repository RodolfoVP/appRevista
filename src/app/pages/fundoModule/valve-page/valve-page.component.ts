import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
import { ValveService } from 'src/app/services/valve.service';
import { IValve } from 'src/app/models/valve.interface';

@Component({
  selector: 'app-valve-page',
  templateUrl: './valve-page.component.html',
  styleUrls: ['./valve-page.component.scss']
})
export class ValvePageComponent {
  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private valveService:ValveService, private notifyService:NotificationService ){}

  registrarValve( value: any ):void{

    let {valveIdReg, valveCode, description, area,  mesureId, status } = value;
    
    this.valveService.insertValve( valveCode, description, area,  mesureId, status ).subscribe(
       (response:IValve) =>{
  
        if( response.data.VALVEID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/valvulas']);
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

  actualizarValve( value:any){
    let {valveIdReg, valveCode, description, area,  mesureId, status } = value;
    
    this.valveService.updateValve( valveIdReg, valveCode, description, area,  mesureId, status).subscribe(
       (response:IValve) =>{
  
        if( response.data.VALVEID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/valvulas']);
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
