import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { DataNutrient, INutrientsList } from 'src/app/models/nutrientsList.interface';
import { NutrientsService } from 'src/app/services/nutrients.service';
import { DataService } from 'src/app/services/data.service';
import { INutrient } from 'src/app/models/nutrient.interface';

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
  selector: 'app-nutrients-table',
  templateUrl: './nutrients-table.component.html',
  styleUrls: ['./nutrients-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class NutrientsTableComponent implements  OnInit{

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataNutrient[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'DESCRIPTION', 'SYMBOL', 'MESURE', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private nutrientService: NutrientsService , private dataService: DataService ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
    
    this.nutrientService.getNutrientTable( sessionStorage.getItem('token') , '' ).subscribe(
      (response:INutrientsList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataNutrient>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener nutrientes:  ${error}`); console.log(error); },
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

  goNuevoNutriente(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        nutrientId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/nutriente'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , nutrientId: string ) {

    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
     data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Nutriente ', mensaje: '¿Está seguro de ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' nutriente ' + pm_desciption }
     //data: { estado: pm_estado , name_lastname: 'unidad de medida '+ pm_desciption }
   });

   // Recibe el valor devuelto por el dialog yuh7al cerrarse
   dialogRef.afterClosed().subscribe(result => {

     if( result ){
       // Liberar busqueda
       this.borrartexto();
       this.mostrarTabla = false;
       // Enviar variable para recargar tabla
       this.nutrientService.cambiarEstadoNutrient( nutrientId  , pm_estado ).subscribe(
         (response:INutrient) =>{
          this.mesureObtener( sessionStorage.getItem('token') );           
        },
        (error) => { console.error(`Ha ocurrido un error al actualizar el nutriente:  ${error}`); console.log(error); },
        //() => console.info('Peticion de actualizar usuario Terminada')
      )

     }


   });

 }
 goEditar( nutrientId:string){

   let navigationExtras: NavigationExtras = {
     queryParams :{
       nutrientId: nutrientId, 
       tipoFormulario: false
     }
   }

   this.router.navigate(['/menu/nutriente'] , navigationExtras );

 }

 mesureObtener( token: any ):void{
   
   this.nutrientService.getNutrientTable( token , '' ).subscribe(
      (response:INutrientsList) =>{

       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataNutrient>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener nutrientes:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
   
 }

}
