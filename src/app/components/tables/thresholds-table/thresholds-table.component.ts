import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

import { DataService } from 'src/app/services/data.service';
import { FertilizerService } from 'src/app/services/fertilizer.service';
import { DataFerilizer, IFertilizerList } from 'src/app/models/fertilizersList.interface';
import { IFertilizer } from 'src/app/models/fertilizer.interface';
import { INutrientFertilizerList } from 'src/app/models/nutrientFertilizer.interface';
import { DialogVarietyPhenologyComponent } from '../../dialogs/dialog-variety-phenology/dialog-variety-phenology.component';
import { DialogFertilizerNutrientComponent } from '../../dialogs/dialog-fertilizer-nutrient/dialog-fertilizer-nutrient.component';
import { CultiveService } from 'src/app/services/cultive.service';
import { ICultiveNutrientIrrigation, ICultiveNutrientIrrigationList } from 'src/app/models/cultive.interface';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize`Primera página`;
  itemsPerPageLabel = $localize`Filas por página`;
  lastPageLabel = $localize`Última página`;

  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página Anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-thresholds-table',
  templateUrl: './thresholds-table.component.html',
  styleUrls: ['./thresholds-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class ThresholdsTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: ICultiveNutrientIrrigation[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'CULTIVE_DESCRIPTION' ,  'NUTRIENTES', 'ACCIONES']; //'IRRIGATION_DESCRIPTION',

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private cultiveNutrientIrrigationService: CultiveService , private dataService: DataService ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
    
    this.getCultiveNutrientIrrigation();

  }

  ngOnInit(): void {  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.activarBusqueda();
  }

  borrartexto(){
    this.texto = '';
    this.dataSource.filter = '';
    this.activarBusqueda();
  }

  activarBusqueda(){
    if( this.dataSource.filter === '' ){
      this.mostrarLupa = false;

    }else{
      this.mostrarLupa =  true;
    }
  }

  volverGeneral(){

    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();

    let rutaRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].url;
    this.router.navigate([ '/menu/' + rutaRetorno ]);
  }

 getCultiveNutrientIrrigation( ):void{
   
  this.cultiveNutrientIrrigationService.getCultiveNutrientIrrigationTable( sessionStorage.getItem('token') , '' ).subscribe(
    (response:ICultiveNutrientIrrigationList) =>{
    
     this.datos = response.data;
     this.dataSource = new MatTableDataSource<ICultiveNutrientIrrigation>(this.datos);
     this.dataSource.paginator = this.paginator;
     this.mostrarTabla = true;
     this.dataSource.sort = this.sort;

   },
   (error) => { console.error(`Ha ocurrido un error al obtener cultivos con nutrientes y riego:  ${error}`); console.log(error); },
   //() => console.info('Peticion de usuarios terminada')
   );    
   
 }

 goIrrigation( description:string , cultiveid:string ){}

 goNutrients( description:string , cultiveid:string ){

  let dato = { cultiveid: cultiveid , description: description  };
  this.dataService.setcultivo( dato );

  this.router.navigate([ '/menu/umbrales-nutrientes' ]);

 }

}
