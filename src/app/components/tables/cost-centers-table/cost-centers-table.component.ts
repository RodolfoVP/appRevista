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
import { DataCostCenter, ICostCenterList } from 'src/app/models/costCenterList.interface';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { ICostCenter } from 'src/app/models/costCenter.interface';
import { IcostCenterPhenologyList } from 'src/app/models/costCenterPhenology.interface';
import { DialogCostCenterPhenologyComponent } from '../../dialogs/dialog-cost-center-phenology/dialog-cost-center-phenology.component';

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
  selector: 'app-cost-centers-table',
  templateUrl: './cost-centers-table.component.html',
  styleUrls: ['./cost-centers-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class CostCentersTableComponent implements  OnInit  {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataCostCenter[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'COSTCENTERCODE', 'DESCRIPTION', 'CULTIVE_VARIETY', 'CAMPAIGND_ESCRIPTION', 'RANGO_FECHAS', 'AREA_HA', 'ACCIONES'];

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

    this.costCenterService.getTableCostCenter( sessionStorage.getItem('token') , '' ).subscribe(
      (response:ICostCenterList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataCostCenter>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener centros de costo:  ${error}`); console.log(error); },
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

  goNewCostCenter(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        costCenterId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/centro-costo'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , costCenterId: string ) {
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Centro de costo ', mensaje: '¿Está seguro de ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' el centro de costo ' + pm_desciption }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.costCenterService.cambiarEstadoCostCenter( costCenterId  , pm_estado , '' ).subscribe(
          (response:ICostCenter) =>{
           this.costCenterObtener( sessionStorage.getItem('token') );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el centro de costo:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }

  goEditar( costCenterId:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        costCenterId: costCenterId,
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/centro-costo'] , navigationExtras );

  }

  goCerrar( costCenterId:string, pm_desciption:string ){
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: 'Cerrar Centro de costo', mensaje: '¿Está seguro de cerrar el centro de costo ' + pm_desciption }

    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.costCenterService.cambiarEstadoCostCenter( costCenterId , '2' , '1' ).subscribe(
          (response:ICostCenter) =>{

            if(response.data.COSTCENTERID){
              this.costCenterObtener( sessionStorage.getItem('token') );
            }           
            else{
              // Toast error en validación de contraseña
              this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter );
              this.mostrarTabla = true;
            }
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el centro de costo:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }
  

  costCenterObtener( token: any ):void{
    
    this.costCenterService.getTableCostCenter( token , '' ).subscribe(
       (response:ICostCenterList) =>{

        this.datos = response.data;
        this.dataSource = new MatTableDataSource<DataCostCenter>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener centros de costo:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

  goPhenology( description:string,  varietyId:string , cultiveId:string  ){

    //Obtener lista de fenologías por variedad a enviar 
    this.costCenterService.getdurationCostCenterPhenology( sessionStorage.getItem('token') , varietyId , cultiveId ).subscribe(
      (response:IcostCenterPhenologyList) =>{
       
       //Abrir modal de fenologías por variedad.
      const dialogDuracion = this.dialog.open(DialogCostCenterPhenologyComponent, {
        data: { titulo: description, mensaje: '' , costCenterFenologia: response.data },
        minWidth: window.innerWidth <= 938 ? '100vw' : '',
        enterAnimationDuration: 0
      });

     },
     (error) => { console.error(`Ha ocurrido un error al obtener Duración por estado fenológico:  ${error}`); console.log(error); },
     //() => console.info('Peticion de usuarios terminada')
   )

    

  }
  goValves( description:string,  costCenterId:string , campaign:string ){

    let dato = { costCenterId: costCenterId , description: description , campaignId:campaign };
    this.dataService.setCentroCosto( dato );
    
    this.router.navigate([ '/menu/centros-costos-valvulas' ]);

  }

}
