import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DataPhenology, IPhenologyList } from 'src/app/models/phenologyList.interface';
import { PhenologyService } from 'src/app/services/phenology.service';
import { IPhenology } from 'src/app/models/phenology.interface';

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
  selector: 'app-phenologies-table',
  templateUrl: './phenologies-table.component.html',
  styleUrls: ['./phenologies-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class PhenologiesTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataPhenology[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'SEQUENS', 'DESCRIPTION', 'FERTSAPPL', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( 
    private router: Router, 
    public dialog: MatDialog , 
    private phenologyService: PhenologyService , 
    private dataService: DataService , 
    private notifyService:NotificationService
    ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;

    this.phenologyService.getPhenologyTable( sessionStorage.getItem('token') , '' , this.dataService.getcultivo().cultiveid ).subscribe(
      (response:IPhenologyList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataPhenology>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener fenologías:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
  }

  ngOnInit(): void {
    
  }

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

  goNewPhenology(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        phenologyId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/fenologia'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , phenologyId: string ) {
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' estado fenológico ', mensaje: '¿Está seguro que desea ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' el Estado Fenológico ' + pm_desciption }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.phenologyService.cambiarEstadoPhenology( phenologyId  , pm_estado ).subscribe(
          (response:IPhenology) =>{
           this.varietyObtener( sessionStorage.getItem('token') );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el estado fenológico:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }

  goEditar( phenologyId:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        phenologyId: phenologyId,
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/fenologia'] , navigationExtras );

  }
  

  varietyObtener( token: any ):void{
    
    this.phenologyService.getPhenologyTable( token , '' , this.dataService.getcultivo().cultiveid ).subscribe(
       (response:IPhenologyList) =>{

        this.datos = response.data;
        this.dataSource = new MatTableDataSource<DataPhenology>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener estados fenológicos:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

}
