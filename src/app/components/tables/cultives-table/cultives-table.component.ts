import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { DataCultive, ICultiveList } from 'src/app/models/cultiveList.interface';
import { CultiveService } from 'src/app/services/cultive.service';
import { DataService } from 'src/app/services/data.service';
import { ICultive } from 'src/app/models/cultive.interface';

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
  selector: 'app-cultives-table',
  templateUrl: './cultives-table.component.html',
  styleUrls: ['./cultives-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class CultivesTableComponent {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataCultive[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'CULTIVECODE', 'DESCRIPTION', 'VARIEDADES', 'FENOLOGIAS', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private cultiveService: CultiveService , private dataService: DataService ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;
    
    this.cultiveService.getCultiveTable( sessionStorage.getItem('token') , '' ).subscribe(
      (response:ICultiveList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataCultive>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener cultivos:  ${error}`); console.log(error); },
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


  goNewCultive(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        cultiveId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/cultivo'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , cultiveId: string ) {

    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
     data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Cultivo ', mensaje: '¿Está seguro que desea ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' el cultivo ' + pm_desciption }
     //data: { estado: pm_estado , name_lastname: 'unidad de medida '+ pm_desciption }
   });

   // Recibe el valor devuelto por el dialog yuh7al cerrarse
   dialogRef.afterClosed().subscribe(result => {

     if( result ){
       // Liberar busqueda
       this.borrartexto();
       this.mostrarTabla = false;
       // Enviar variable para recargar tabla
       this.cultiveService.cambiarEstadoCultive( cultiveId  , pm_estado ).subscribe(
         (response:ICultive) =>{
          this.mesureObtener( sessionStorage.getItem('token') );           
        },
        (error) => { console.error(`Ha ocurrido un error al actualizar el cultivo:  ${error}`); console.log(error); },
        //() => console.info('Peticion de actualizar usuario Terminada')
      )

     }


   });

 }
 goEditar( cultiveId:string){

   let navigationExtras: NavigationExtras = {
     queryParams :{
       cultiveId: cultiveId, 
       tipoFormulario: false
     }
   }

   this.router.navigate(['/menu/cultivo'] , navigationExtras );

 }

 mesureObtener( token: any ):void{
   
   this.cultiveService.getCultiveTable( token , '' ).subscribe(
      (response:ICultiveList) =>{

       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataCultive>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener cultivos:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )
   
 }

 goPhenology( cultiveId:string , description:string ){

  let dato = { cultiveid: cultiveId , description: description  };
  this.dataService.setcultivo( dato );

  this.router.navigate([ '/menu/fenologias' ]);

 }
 goVariety( cultiveId:string , description:string ){

  let dato = { cultiveid: cultiveId , description: description  };
  this.dataService.setcultivo( dato );
  
  this.router.navigate([ '/menu/variedades' ]);
 }
}
 