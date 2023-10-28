import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICultive } from 'src/app/models/cultive.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { CultiveService } from 'src/app/services/cultive.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cultive-page',
  templateUrl: './cultive-page.component.html',
  styleUrls: ['./cultive-page.component.scss']
})
export class CultivePageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }  

  constructor( private router:Router, private cultiveService:CultiveService, private notifyService:NotificationService ){}

  registrarCultive( value: any ):void{

    let { cultiveIdReg , cultiveCode, description } = value;
    console.log(value);
    
    this.cultiveService.insertCultive( cultiveCode , description  ).subscribe(
       (response:ICultive) =>{
  
        if( response.data.CULTIVEID  ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/cultivos']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar cultivo:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarCultive( value:any){
    let { cultiveIdReg , cultiveCode, description } = value;
    console.log(value);
    
    this.cultiveService.updateCultive( cultiveIdReg , cultiveCode, description  ).subscribe(
       (response:ICultive) =>{
  
        if( response.data.CULTIVEID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/cultivos']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al actualizar cultivo:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }
}
