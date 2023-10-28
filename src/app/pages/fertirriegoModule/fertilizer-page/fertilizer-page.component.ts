import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { HostListener } from '@angular/core';
import { FertilizerService } from 'src/app/services/fertilizer.service';
import { IFertilizer } from 'src/app/models/fertilizer.interface';

@Component({
  selector: 'app-fertilizer-page',
  templateUrl: './fertilizer-page.component.html',
  styleUrls: ['./fertilizer-page.component.scss']
})
export class FertilizerPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private fertilizertService:FertilizerService, private notifyService:NotificationService ){}

  registrarFertilizer( value: any ):void{

    let { fertilizerid, fertilizercode , description, status , abbreviation , mesureid , fertilizertype , price } = value;
    
    this.fertilizertService.insertFertilizer( fertilizercode , description, status , abbreviation , mesureid , fertilizertype , price ).subscribe(
       (response:IFertilizer) =>{
  
        if( response.data.FERTILIZERID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/fertilizantes']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar fertilizante:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarFertilizer( value:any){
    let { fertilizerid, fertilizercode , description, status , abbreviation , mesureid , fertilizertype , price } = value;
    
    this.fertilizertService.updatefertilizer( fertilizerid, fertilizercode , description, status , abbreviation , mesureid , fertilizertype , price ).subscribe(
       (response:IFertilizer) =>{
  
        if( response.data.FERTILIZERID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/fertilizantes']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al actualizar fertilizante:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }

}
