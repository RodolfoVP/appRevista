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
import { ToasterPosition } from 'src/app/models/toast.interface';
import { DataVariety, IVarietyList } from 'src/app/models/varietyList.interface';
import { VarietyService } from 'src/app/services/variety.service';
import { IVariety } from 'src/app/models/variety.interface';
import { DialogVarietyPhenologyComponent } from '../../dialogs/dialog-variety-phenology/dialog-variety-phenology.component';
import { IVarietyPhenologyList } from 'src/app/models/varietyPhenology.interface';

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
  selector: 'app-varieties-table',
  templateUrl: './varieties-table.component.html',
  styleUrls: ['./varieties-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class VarietiesTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataVariety[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'VARIETYCODE', 'DESCRIPTION', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( 
    private router: Router, 
    public dialog: MatDialog , 
    private varietyService: VarietyService , 
    private dataService: DataService , 
    private notifyService:NotificationService
    ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;

    this.varietyService.getVarietyTable( sessionStorage.getItem('token') , '' , this.dataService.getcultivo().cultiveid ).subscribe(
      (response:IVarietyList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataVariety>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener variedades:  ${error}`); console.log(error); },
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

  goNewVariety(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        varietyId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/variedad'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , varietyId: string ) {
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Variedad ', mensaje: '¿Está seguro que desea ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' la variedad ' + pm_desciption }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.varietyService.cambiarEstadoVariety( varietyId  , pm_estado ).subscribe(
          (response:IVariety) =>{
           this.varietyObtener( sessionStorage.getItem('token') );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar la variedad:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }

  goEditar( varietyId:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        varietyId: varietyId,
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/variedad'] , navigationExtras );

  }
  

  varietyObtener( token: any ):void{
    
    this.varietyService.getVarietyTable( token , '' , this.dataService.getcultivo().cultiveid ).subscribe(
       (response:IVarietyList) =>{

        this.datos = response.data;
        this.dataSource = new MatTableDataSource<DataVariety>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener variedad:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

  goPhenology( description:string , varietyid:string ){
  
    //Obtener lista de fenologías por variedad a enviar 
    this.varietyService.getdurationVarietyPhenology( sessionStorage.getItem('token') , varietyid , this.dataService.getcultivo().cultiveid ).subscribe(
      (response:IVarietyPhenologyList) =>{
       
       //Abrir modal de fenologías por variedad.
      const dialogDuracion = this.dialog.open(DialogVarietyPhenologyComponent, {
        data: { titulo: this.dataService.getcultivo().description + ' ' + description, mensaje: '' , variedadFenologia: response.data },
        minWidth: window.innerWidth <= 938 ? '100vw' : '',
        enterAnimationDuration: 0
      });

     },
     (error) => { console.error(`Ha ocurrido un error al obtener Duración por estado fenológico:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
  
   }

}
