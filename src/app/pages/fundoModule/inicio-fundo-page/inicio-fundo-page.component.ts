import { Component , OnInit } from '@angular/core';
import { IFuncModule } from 'src/app/models/funcsModule.interface';
import { DataService } from 'src/app/services/data.service';
import { FuncsModuleService } from 'src/app/services/funcs-module.service';

@Component({
  selector: 'app-inicio-fundo-page',
  templateUrl: './inicio-fundo-page.component.html',
  styleUrls: ['./inicio-fundo-page.component.scss']
})
export class InicioFundoPageComponent implements OnInit {

  id: any | undefined;
  funcionalidades: any[] = [  ];

  constructor(  private funcService:FuncsModuleService , private dataService:DataService ){}
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
      (error) => { console.error(`Ha ocurrido un error al obtener funcionalidades:  ${error}`); console.log(error); },
      //() => console.info('Peticion de funcionalidades terminada')
    )
    
  }


}
