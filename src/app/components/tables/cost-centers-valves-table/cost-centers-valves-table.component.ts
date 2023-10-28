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
import { CostCenterValve, ICostcenterValve, ICostcenterValveList } from 'src/app/models/costCenter.interface';
import { CostCenterService } from 'src/app/services/cost-center.service';

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
  selector: 'app-cost-centers-valves-table',
  templateUrl: './cost-centers-valves-table.component.html',
  styleUrls: ['./cost-centers-valves-table.component.scss']
})
export class CostCentersValvesTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: CostCenterValve[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'VALVE_DESCRIPTION', 'AREA_MESURE', 'CAMPAIGN_DESCRIPTION', 'RANGO_FECHAS', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( 
    private router: Router, 
    public dialog: MatDialog , 
    private costCenterService: CostCenterService , 
    private dataService: DataService , 
    private notifyService:NotificationService
  ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;

    this.getCostCenterValve();

  }

  ngOnInit(): void { }

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
        costCenterValveId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/centro-costo-valvula'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , costCenterValveId: string ) {
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Válvula ', mensaje: '¿Está seguro que desea ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' la válvula ' + pm_desciption }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.costCenterService.changeStateValveCostCenter( costCenterValveId  , pm_estado , '' ).subscribe(
          (response:ICostcenterValve) =>{
           this.getCostCenterValve( );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar la válvula:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }

  goEditar( costCenterValveId:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        costCenterValveId: costCenterValveId,
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/centro-costo-valvula'] , navigationExtras );

  }
  

  getCostCenterValve(  ):void{
    
    this.costCenterService.getTableValveCostCenter( sessionStorage.getItem('token') , '' , this.dataService.getCentroCosto().costCenterId ).subscribe(
       (response:ICostcenterValveList) =>{

        this.datos = response.data;
        this.dataSource = new MatTableDataSource<CostCenterValve>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener válvulas del centro de costo:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

   goCerrar( costCenterValveId:string, pm_desciption:string ){
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: 'Cerrar Válvula', mensaje: '¿Está seguro de cerrar la válvula ' + pm_desciption }

    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.costCenterService.changeStateValveCostCenter( costCenterValveId  , '2' , '1' ).subscribe(
          (response:ICostcenterValve) =>{

            if(response.data.COSTCVALVEID){
              this.getCostCenterValve(  );
            }           
            else{
              // Toast error en validación de contraseña
              this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter );
              this.mostrarTabla = true;
            }
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el usaurio:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }

}
