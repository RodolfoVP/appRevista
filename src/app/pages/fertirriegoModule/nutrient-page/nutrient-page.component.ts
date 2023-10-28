import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INutrient } from 'src/app/models/nutrient.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { NutrientsService } from 'src/app/services/nutrients.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-nutrient-page',
  templateUrl: './nutrient-page.component.html',
  styleUrls: ['./nutrient-page.component.scss']
})
export class NutrientPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private router:Router, private nutrientService:NutrientsService, private notifyService:NotificationService ){}

  registrarNutrient( value: any ):void{

    let { nutrientCode, description , symbol , mesure  } = value;
    
    this.nutrientService.insertNutrient( description, symbol, mesure  ).subscribe(
       (response:INutrient) =>{
  
        if( response.data.NUTRIENTID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/nutrientes']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al registrar nutriente:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
    
  }

  actualizarNutrient( value:any){
    let { nutrientCode, description , symbol , mesure  } = value;
    
    this.nutrientService.updateNutrient( nutrientCode, description, symbol, mesure  ).subscribe(
       (response:INutrient) =>{
  
        if( response.data.NUTRIENTID ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso y retornar a table usuarios
          this.router.navigate(['/menu/nutrientes']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al actualizar nutriente:  ${error}`); console.log(error); },
      //() => console.info('Peticion de registro de Unidad de medida Terminada')
    )
  }

}
