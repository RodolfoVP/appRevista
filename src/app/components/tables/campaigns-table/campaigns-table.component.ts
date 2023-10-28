import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { DataService } from 'src/app/services/data.service';
import { DataCampaign, ICampaignList } from 'src/app/models/campaignList.interface';
import { CampaignService } from 'src/app/services/campaign.service';
import { ICampaign } from 'src/app/models/campaign.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { ToasterPosition } from 'src/app/models/toast.interface';

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
  selector: 'app-campaigns-table',
  templateUrl: './campaigns-table.component.html',
  styleUrls: ['./campaigns-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class CampaignsTableComponent implements  OnInit {

  texto: string | null = '';
  mostrarLupa: boolean = false;
  nombreRetorno:string = '';

  datos!: DataCampaign[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'CAMPAIGNCODE', 'DESCRIPTION', 'RANGO_FECHAS', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( 
    private router: Router, 
    public dialog: MatDialog , 
    private campaignService: CampaignService , 
    private dataService: DataService , 
    private notifyService:NotificationService
    ){
    let retornoArbol = this.dataService.getArbol();
    let navegationData = this.dataService.getData();
    
    this.nombreRetorno  = retornoArbol[ navegationData.idModulo ][ 'navegacion' ][ navegationData.idFunc ].nombre;

    this.campaignService.getTableCampaign( sessionStorage.getItem('token') , '' , '' ).subscribe(
      (response:ICampaignList) =>{
      
       this.datos = response.data;
       this.dataSource = new MatTableDataSource<DataCampaign>(this.datos);
       this.dataSource.paginator = this.paginator;
       this.mostrarTabla = true;
       this.dataSource.sort = this.sort;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener campañas:  ${error}`); console.log(error); },
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

  goNewCampaign(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        campaignId: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/campania'] , navigationExtras );
  }

  goEstado( pm_estado:string , pm_desciption:string , campaignId: string ) {
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Campaña ', mensaje: '¿Está seguro de ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' la campaña ' + pm_desciption }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.campaignService.cambiarEstadoCampaign( campaignId  , pm_estado , '' ).subscribe(
          (response:ICampaign) =>{
           this.campaignObtener( sessionStorage.getItem('token') );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el usaurio:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
  }

  goEditar( campaignId:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        campaignId: campaignId,
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/campania'] , navigationExtras );

  }

  goCerrar( campaignId:string, pm_desciption:string ){
    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: 'Cerrar Campaña', mensaje: '¿Está seguro de cerrar la campaña ' + pm_desciption }

    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.campaignService.cambiarEstadoCampaign( campaignId  , '2' , '1' ).subscribe(
          (response:ICampaign) =>{

            if(response.data.CAMPAIGNID){
              this.campaignObtener( sessionStorage.getItem('token') );
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
  

  campaignObtener( token: any ):void{
    
    this.campaignService.getTableCampaign( token , '' , '' ).subscribe(
       (response:ICampaignList) =>{

        this.datos = response.data;
        this.dataSource = new MatTableDataSource<DataCampaign>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener campañas:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

}
