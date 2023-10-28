import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataCultiveNutrient, ICultiveNutrientList, ICultiveNutrientPhenologyList } from 'src/app/models/cultive.interface';
import { CultiveService } from 'src/app/services/cultive.service';
import { DataService } from 'src/app/services/data.service';
import { DialogNutrientPhenologyComponent } from '../../dialogs/dialog-nutrient-phenology/dialog-nutrient-phenology.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: ['./threshold-list.component.scss']
})
export class ThresholdListComponent {

  mostrarTabla!:boolean;
  nombreRetorno!:string;

  dataNutrients!: DataCultiveNutrient[];

  constructor( private router: Router, 
    private dataService:DataService , 
    private cultiveService:CultiveService, 
    public dialog: MatDialog , 
    private elementRef: ElementRef 
    ){
    //let retornoArbol = this.dataService.getArbol();
    //let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = 'umbrales'; //retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
    
    this.getCultiveNutrient();

  }

  public getCheck( elemento:string ) {
    const element = this.elementRef.nativeElement.querySelector( elemento );
    
    console.log( element );
    return element.checked;
  }

  getTablePhenology( nutxcultid:string ){

    //Obtener lista de fenologías por variedad a enviar 
    this.cultiveService.getCultiveNutrientPhenologyTable( sessionStorage.getItem('token') , nutxcultid , this.dataService.getcultivo().cultiveid ).subscribe(
      (response:ICultiveNutrientPhenologyList) =>{
       
       //Abrir modal de fenologías por variedad.
      const dialogDuracion = this.dialog.open(DialogNutrientPhenologyComponent, {
        data: { cultiveNutrientPhenology: response.data },
        minWidth: window.innerWidth <= 938 ? '100vw' : '',
        enterAnimationDuration: 0
      });

     },
     (error) => { console.error(`Ha ocurrido un error al obtener Duración por estado fenológico:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )

    console.log(nutxcultid);
  }

  setLog( dato:any ){
    console.log(dato);
  }
  setSwitch( nutrientId:string ){
    
    //Phenology
    const phenology = document.getElementById('phenology_'+nutrientId);
    if( phenology != null ){
      if( phenology.style.display === 'none' ){
        phenology.style.display = '';
      }
      else{
        phenology.style.display = 'none';
      }
      
    }
    console.log(phenology);

    //Edit
    const edit = document.getElementById('edit_'+nutrientId );
    if( edit != null ){
      if( edit.getAttribute('disabled') != null ){
        edit.removeAttribute('disabled');
      }
      else{
        edit.setAttribute('disabled','');
      }
      
    }
    console.log(edit);

    console.log(nutrientId);
  }

  volverGeneral(){

    //let retornoArbol = this.dataService.getArbol();
    //let navegationData = this.dataService.getData();

    //let rutaRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].url;
    this.router.navigate([ '/menu/umbrales' ]);
  } 

  getCultiveNutrient( ):void{
    
    this.cultiveService.getCultiveNutrientTable( sessionStorage.getItem('token')  , this.dataService.getcultivo().cultiveid  ).subscribe(
       (response:ICultiveNutrientList) =>{

        this.dataNutrients = response.data;        
        this.mostrarTabla = true;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener Cultivos con nutrientes activos:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

  toggleInputs(item: any) {
    item.inputDisabled = !item.inputDisabled;
  }

}
