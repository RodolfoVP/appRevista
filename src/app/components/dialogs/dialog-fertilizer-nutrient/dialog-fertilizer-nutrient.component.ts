import { Component, Inject ,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataNutrientFertilizer, INutrientFertilizerList } from 'src/app/models/nutrientFertilizer.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { FertilizerService } from 'src/app/services/fertilizer.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-dialog-fertilizer-nutrient',
  templateUrl: './dialog-fertilizer-nutrient.component.html',
  styleUrls: ['./dialog-fertilizer-nutrient.component.scss']
})
export class DialogFertilizerNutrientComponent implements OnInit {

  datosConcentration!: DataNutrientFertilizer[]; 
  todosInputsTienenValor = false;
  tablaDisponible = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private nutrientFertilizerService:FertilizerService , private notifyService: NotificationService ) {
    this.datosConcentration = data.fertilizerNutrient;
    console.log( this.datosConcentration );

    if( this.datosConcentration.length <= 0 ){
      this.tablaDisponible = true;
    }

  }

  ngOnInit(): void {
    console.log('Aqui');
    this.verificarInputs();
  }

  actualizaDuracion(){
    this.extraerValores();

  }
  

  public verificarInputs(): void {
    console.log( this.datosConcentration );
    this.todosInputsTienenValor = this.datosConcentration.every(data => data.CONCENTRATION !== '' );
  }

  extraerValores(): void {
    const valores = this.datosConcentration.map((data, i) => {
      const input = document.getElementById('input-' + data.NUTRIENTID) as HTMLInputElement;
      return { DESCRIPTION: data.DESCRIPTION,  NUTRIENTID: data.NUTRIENTID , FERTILIZERID: data.FERTILIZERID, CONCENTRATION: input.value };
    });
  
    //Ejecutar servicio que graba datos 
    this.nutrientFertilizerService.insertConcentrationNutrientFertilizer( sessionStorage.getItem('token') , JSON.stringify( valores ) ).subscribe(
      (response:INutrientFertilizerList) =>{ 
        
        if( response.result ){
          this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
          //  Mostrar Mensaje exitoso
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      
      },
     (error) => { console.error(`Ha ocurrido un error al obtener nutrientes por fertilizante:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
  
  }

}