import { Component , OnInit} from '@angular/core';
import { IFuncModule } from 'src/app/models/funcsModule.interface';
import { DataService } from 'src/app/services/data.service';
import { FuncsModuleService } from 'src/app/services/funcs-module.service';

@Component({
  selector: 'app-inicio-fertirriego-page',
  templateUrl: './inicio-fertirriego-page.component.html',
  styleUrls: ['./inicio-fertirriego-page.component.scss']
})
export class InicioFertirriegoPageComponent implements OnInit {
  id: any | undefined;
  funcionalidades: any[] = [  ];

  constructor( private funcService:FuncsModuleService , private dataService:DataService ){}
  ngOnInit(): void {

    let navegacionData = this.dataService.getData();
    
    // Obtener funcionalidades del modulo 
    this.funcionObtener( sessionStorage.getItem('token') , navegacionData.idModulo );

  }

  funcionObtener( token: any , idModulo:any ):void{
    
    this.funcService.funcsObtener( token , idModulo , '' ).subscribe(
       (response:IFuncModule) =>{
        this.funcionalidades = response.data;
      },
      (error) => { console.error(`Ha ocurrido un error al obtener funcionalidades de fertirriego:  ${error}`); console.log(error); },
      //() => console.info('Peticion de funcionalidades de fertirriego terminada')
    )
    
  }
}
