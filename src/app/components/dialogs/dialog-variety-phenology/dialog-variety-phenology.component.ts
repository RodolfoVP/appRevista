import { Component, Inject ,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { DataVarietyPhenology, IVarietyPhenologyList } from 'src/app/models/varietyPhenology.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { VarietyService } from 'src/app/services/variety.service';

@Component({
  selector: 'app-dialog-variety-phenology',
  templateUrl: './dialog-variety-phenology.component.html',
  styleUrls: ['./dialog-variety-phenology.component.scss']
})
export class DialogVarietyPhenologyComponent implements OnInit {

  datosDuracion!: DataVarietyPhenology[]; 
  todosInputsTienenValor = false;
  tablaDisponible = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private varietyService:VarietyService , private notifyService: NotificationService ) {
    this.datosDuracion = data.variedadFenologia;

    if( this.datosDuracion.length <= 0 ){
      this.tablaDisponible = true;
    }

  }

  ngOnInit(): void {
    this.verificarInputs();
  }

  actualizaDuracion(){
    this.extraerValores();

  }
  

  public verificarInputs(): void {
    this.todosInputsTienenValor = this.datosDuracion.every(data => data.DURATION !== '' );
  }

  extraerValores(): void {
    const valores = this.datosDuracion.map((data, i) => {
      const input = document.getElementById('input-' + data.PHENOLOGYID) as HTMLInputElement;
      return { DESCRIPTION: data.DESCRIPTION,  VARIETYID: data.VARIETYID , PHENOLOGYID: data.PHENOLOGYID, DURATION: input.value };
    });
  
    //Ejecutar servicio que graba datos 
    this.varietyService.insertDurationVarietyPhenology( sessionStorage.getItem('token') , JSON.stringify( valores ) ).subscribe(
      (response:IVarietyPhenologyList) =>{ 
        
        if( response.data ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      
      },
     (error) => { console.error(`Ha ocurrido un error al obtener Duración por estado fenológico:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
  
  }

}
