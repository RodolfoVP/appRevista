import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { MesureService } from 'src/app/services/mesure.service';
import { DataService } from 'src/app/services/data.service';
import { IMesure } from 'src/app/models/mesure.interface';

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
  selector: 'app-mesures-table',
  templateUrl: './mesures-table.component.html',
  styleUrls: ['./mesures-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class MesuresTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: dataMesure[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'DESCRIPTION', 'UNIDAD', 'TIPO', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private mesureService: MesureService , private dataService: DataService ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
    
    this.mesureService.getTableMesures( sessionStorage.getItem('token') , '' , '' , '' ).subscribe(
      (response:IMesureList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<dataMesure>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener usuarios:  ${error}`); console.log(error); },
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

  goNuevaUnidad(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        mesureId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/unidad'] , navigationExtras );
  }
  
  goEstado( pm_estado:string , pm_desciption:string , mesureId: string ) {

     // Abre el dialog con el componente DialogComponent
     const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Cuenta ', mensaje: '¿Está seguro de ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' unidad de medida ' + pm_desciption }
      //data: { estado: pm_estado , name_lastname: 'unidad de medida '+ pm_desciption }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.mesureService.cambiarEstadoMesure( mesureId  , pm_estado ).subscribe(
          (response:IMesure) =>{
           this.mesureObtener( sessionStorage.getItem('token') );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el usaurio:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });

  }
  goEditar( mesureId:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        mesureId: mesureId, 
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/unidad'] , navigationExtras );

  }

  mesureObtener( token: any ):void{
    
    this.mesureService.getTableMesures( token , '' , '' , '' ).subscribe(
       (response:IMesureList) =>{

        this.datos = response.data;
        this.dataSource = new MatTableDataSource<dataMesure>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener unidades de medida:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }
}
