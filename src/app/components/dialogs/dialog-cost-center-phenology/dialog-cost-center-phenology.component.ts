import { Component, Inject ,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataCostCenterPhenology, IcostCenterPhenologyList } from 'src/app/models/costCenterPhenology.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { NotificationService } from 'src/app/services/notification.service';



@Component({
  selector: 'app-dialog-cost-center-phenology',
  templateUrl: './dialog-cost-center-phenology.component.html',
  styleUrls: ['./dialog-cost-center-phenology.component.scss']
})
export class DialogCostCenterPhenologyComponent implements OnInit {

  datosDuracion!: DataCostCenterPhenology[]; 
  todosInputsTienenValor = false;
  tablaDisponible = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private costCenterService:CostCenterService , private notifyService: NotificationService ) {
    this.datosDuracion = data.costCenterFenologia;

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
      return { DESCRIPTION: data.DESCRIPTION,  COSTCENTERID: data.COSTCENTERID , PHENOLOGYID: data.PHENOLOGYID, DURATION: input.value };
    });
  
    //Ejecutar servicio que graba datos 
    this.costCenterService.insertDurationCostCenterPhenology( sessionStorage.getItem('token') , JSON.stringify( valores ) ).subscribe(
      (response:IcostCenterPhenologyList) =>{ 
        
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
