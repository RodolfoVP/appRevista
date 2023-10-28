import { Component, ViewChild , OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUserList, Usuario } from 'src/app/models/userList.interface';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.interface';

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
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class UsersTableComponent implements  OnInit { //AfterViewInit
  
  texto: string | null = '';
  mostrarLupa: boolean = false;

  datos!: Usuario[] ;
  dataSource: any;
  displayedColumns: string[] = ['STATUS', 'USERCODE', 'EMAIL', 'NAME_LASTNAME', 'ROLE', 'ACCIONES'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTabla: boolean = false;

  constructor( private router: Router, public dialog: MatDialog , private usersService: UserService ) {

    this.usersService.getTableUser( sessionStorage.getItem('token') , '' ).subscribe(
      (response:IUserList) =>{
      
       this.datos = response.data.usuarios;
       this.dataSource = new MatTableDataSource<Usuario>(this.datos);
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

  goNuevoUsuario(){
    let navigationExtras: NavigationExtras = {
      queryParams :{
        userCode: '', 
        tipoFormulario: true
      }
    }
    this.router.navigate(['/menu/usuario'] , navigationExtras );
  }
  
  goEstado( pm_estado:string , pm_name_lastname:string , pm_usercode: string ) {

    // Abre el dialog con el componente DialogComponent
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: ( pm_estado == 'Activo' ? 'Desactivar' : 'Activar' )+ ' Cuenta ', mensaje: '¿Está seguro de ' + ( pm_estado == 'Activo' ? 'desactivar' : 'activar' ) + ' la cuenta de ' + pm_name_lastname }
    });

    // Recibe el valor devuelto por el dialog yuh7al cerrarse
    dialogRef.afterClosed().subscribe(result => {

      if( result ){
        // Liberar busqueda
        this.borrartexto();
        this.mostrarTabla = false;
        // Enviar variable para recargar tabla
        this.usersService.cambiarEstadotUsuario( pm_usercode  , pm_estado ).subscribe(
          (response:IUser) =>{
           this.usuariosObtener( sessionStorage.getItem('token') );           
         },
         (error) => { console.error(`Ha ocurrido un error al actualizar el usaurio:  ${error}`); console.log(error); },
         //() => console.info('Peticion de actualizar usuario Terminada')
       )

      }


    });
    
  }

  goEditar( userCode:string){

    let navigationExtras: NavigationExtras = {
      queryParams :{
        userCode: userCode,
        tipoFormulario: false
      }
    }

    this.router.navigate(['/menu/usuario'] , navigationExtras );

  }

  usuariosObtener( token: any ):void{
    
    this.usersService.getTableUser( token , '' ).subscribe(
       (response:IUserList) =>{

        this.datos = response.data.usuarios;
        this.dataSource = new MatTableDataSource<Usuario>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.mostrarTabla = true;
        this.dataSource.sort = this.sort;

      },
      (error) => { console.error(`Ha ocurrido un error al obtener usuarios:  ${error}`); console.log(error); },
      //() => console.info('Peticion de usuarios terminada')
    )
    
  }

}

