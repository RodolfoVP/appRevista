import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { DataValve, IValve, IValveList } from 'src/app/models/valve.interface';
import { ValveService } from 'src/app/services/valve.service';
import { DataService } from 'src/app/services/data.service';

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
  selector: 'app-valves-table',
  templateUrl: './valves-table.component.html',
  styleUrls: ['./valves-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class ValvesTableComponent {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataValve[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'VALVECODE', 'DESCRIPTION', 'AREA_MESURE', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private valveService: ValveService , private dataService: DataService  ){

    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
  
    this.getValves();
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

  goNewValve(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        valveId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/valvula'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , valveId: string ) {

    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
     data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Válvula ', mensaje: '¿Está seguro que desea ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' la válvula ' + pm_desciption }
     //data: { estado: pm_estado , name_lastname: 'unidad de medida '+ pm_desciption }
   });

   // Recibe el valor devuelto por el dialog yuh7al cerrarse
   dialogRef.afterClosed().subscribe(result => {

     if( result ){
       // Liberar busqueda
       this.borrartexto();
       this.mostrarTabla = false;
       // Enviar variable para recargar tabla
       this.valveService.changeStatusValve( valveId  , pm_estado ).subscribe(
         (response:IValve) =>{
          this.getValves( );           
        },
        (error) => { console.error(`Ha ocurrido un error al actualizar la válvula:  ${error}`); console.log(error); },
        //() => console.info('Peticion de actualizar usuario Terminada')
      )

     }


   });

 }
 goEditar( valveId:string){

   let navigationExtras: NavigationExtras = {
     queryParams :{
       valveId: valveId, 
       tipoFormulario: false
     }
   }

   this.router.navigate(['/menu/valvula'] , navigationExtras );

 }

 getValves( ):void{
   
  this.valveService.getValveList( sessionStorage.getItem('token') , '' , '' ).subscribe(
    (response:IValveList) =>{
    
     this.datos = response.data;
     this.dataSource = new MatTableDataSource<DataValve>(this.datos);
     this.dataSource.paginator = this.paginator;
     this.mostrarTabla = true;
     this.dataSource.sort = this.sort;

   },
   (error) => { console.error(`Ha ocurrido un error al obtener valvulas:  ${error}`); console.log(error); },
   //() => console.info('Peticion de usuarios terminada')
 )  
   
 }

}
