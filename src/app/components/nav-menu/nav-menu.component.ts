import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PrivilegesService } from 'src/app/services/privileges.service';
import { IPrivilege } from 'src/app/models/privilege.interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Output() menuPrivilegeAction: EventEmitter<{}> = new EventEmitter<{}>();



  menuModule: any | null = null;
  menuFunc: any | null = null;
  moduleDefault: any = null;
  private breakpointObserver = inject(BreakpointObserver);
  showFiller = false;

  opcionSeleccionada:string = '';
  opcionSeleccionadaNav:string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( private router:Router, private permService: PrivilegesService , private dataService:DataService ){ }
  
  ngOnInit():void{
    
    let token:any = sessionStorage.getItem('token')?.toString()
    
    this.permService.menuObtener( token ).subscribe(
       (response:IPrivilege) =>{
        if( response.result){
          
          this.menuModule = response.data.modulos;
          this.menuFunc = response.data.arbol;
          // Obtener el primer modulo del arbol
          this.moduleDefault = response.data.moduloDefault;
          let paginaInicio = response.data.moduloPageDefault;
          //Cargar la pagina del modulo
          
          let funcDefault = Object.keys( response.data.arbol[ this.moduleDefault ][ 'navegacion' ] )[0];
          
          let datoUrl = { idModulo: this.moduleDefault, idFunc: funcDefault };

          this.dataService.setData( datoUrl );
          this.dataService.setArbol( this.menuFunc );

          this.opcionSeleccionada = response.data.moduloDefault;
          this.opcionSeleccionadaNav = response.data.moduloPageDefault;

          this.router.navigate(['/menu/' + paginaInicio ] );

        }
        else{
          // Redirigir a login si falla 
          this.router.navigate(['/login']);
        }
      },
      (error) => { console.error(`Ha ocurrido un error al obtener menu:  ${error}`); console.log(error); },
      //() => { }
    )

  }  

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  seleccionaModulo( modulo:any ){

    this.moduleDefault = modulo;

    let funcDefault = Object.keys( this.menuFunc[ modulo ][ 'navegacion' ] )[0];

    let datoUrl = { idModulo: this.opcionSeleccionada, idFunc: funcDefault };
    this.dataService.setData( datoUrl );

    //Seleccionar nav primero de la lista 
    this.opcionSeleccionadaNav =   this.menuFunc[ modulo ][ 'navegacion' ][funcDefault].url;

    //Lanzar primer modulo de la lista
    this.router.navigate([ '/menu/' + this.opcionSeleccionadaNav ] );
  }

  seleccionaMenu(ruta:string, func:string):void{

    if( ruta !== '' ){

      let datoUrl = { idModulo: this.opcionSeleccionada, idFunc: func };
      this.dataService.setData( datoUrl );
 
      this.router.navigate([ '/menu/' + ruta ] );
      //TODO - Ocultar barra
      //drawer.toggle();
    }
    else{
      this.router.navigate([ '/menu' ]);
    }
  }

  miCuenta(){
    console.log('Ir a mi cuenta');
    this.router.navigate(['/menu/myCount']);
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
