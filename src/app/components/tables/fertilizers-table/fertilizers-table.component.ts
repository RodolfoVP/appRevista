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
import { DialogFertilizerNutrientComponent } from '../../dialogs/dialog-fertilizer-nutrient/dialog-fertilizer-nutrient.component';

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
  selector: 'app-fertilizers-table',
  templateUrl: './fertilizers-table.component.html',
  styleUrls: ['./fertilizers-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class FertilizersTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataFerilizer[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'FERTILIZERCODE', 'DESCRIPTION', 'MESUREDESCRIPTION', 'PRICE', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private fertilizersService: FertilizerService , private dataService: DataService ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
    
    this.fertilizersService.getTableFertilizers( sessionStorage.getItem('token') , '' , '' , '' ).subscribe(
      (response:IFertilizerList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataFerilizer>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener fertilizantes:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )    

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

  goNewFertilizer(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        fertilizerId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/fertilizante'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , fertilizerId: string ) {

    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
     data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Fertilizante ', mensaje: '¿Está seguro de ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' fertilizante ' + pm_desciption }
   });

   // Recibe el valor devuelto por el dialog yuh7al cerrarse
   dialogRef.afterClosed().subscribe(result => {

    
     if( result ){
       // Liberar busqueda
       this.borrartexto();
       this.mostrarTabla = false;
       // Enviar variable para recargar tabla
       this.fertilizersService.cambiarEstadoFertilizer( fertilizerId  , pm_estado ).subscribe(
         (response:IFertilizer) =>{
          this.mesureObtener( sessionStorage.getItem('token') );           
        },
        (error) => { console.error(`Ha ocurrido un error al actualizar el fertilizante:  ${error}`); console.log(error); },
        //() => console.info('Peticion de actualizar usuario Terminada')
      )

     }
     


   });

 }
 goEditar( fertilizerId:string){

   let navigationExtras: NavigationExtras = {
     queryParams :{
       fertilizerId: fertilizerId, 
       tipoFormulario: false
     }
   }

   this.router.navigate(['/menu/fertilizante'] , navigationExtras );

 }

 mesureObtener( token: any ):void{
   
   this.fertilizersService.getTableFertilizers( token , '' , '' , '' ).subscribe(
      (response:IFertilizerList) =>{

       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataFerilizer>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener fertilizantes:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
   
 }

 goNutrients( description:string , fertilizerid:string ){
  
  //Obtener lista de fenologías por variedad a enviar 
  this.fertilizersService.getConcentrationNutrientFertilizer( sessionStorage.getItem('token') , fertilizerid ).subscribe(
    (response:INutrientFertilizerList) =>{
     
     //Abrir modal de fenologías por variedad.
    const dialogDuracion = this.dialog.open(DialogFertilizerNutrientComponent, {
      data: { titulo: description, mensaje: '' , fertilizerNutrient: response.data },
      minWidth: window.innerWidth <= 938 ? '100vw' : '',
      enterAnimationDuration: 0
    });

   },
   (error) => { console.error(`Ha ocurrido un error al obtener Concentración por estado nutriente:  ${error}`); console.log(error); },
   //() => console.info('Peticion de usuarios terminada')
 )

 }

}
