import { Component, EventEmitter, OnInit, Output, AfterContentInit } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
 MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICampaignList , DataCampaign } from 'src/app/models/campaignList.interface';
import { CampaignService } from 'src/app/services/campaign.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { validacion } from 'src/app/models/regex.interface';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { MesureService } from 'src/app/services/mesure.service';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { CostCenterValve, ICostcenterValveList } from 'src/app/models/costCenter.interface';
import { DataService } from 'src/app/services/data.service';
import { DataValve, IValve, IValveList, Valve } from 'src/app/models/valve.interface';
import { ValveService } from 'src/app/services/valve.service';

@Component({
  selector: 'app-cost-center-valve-form',
  templateUrl: './cost-center-valve-form.component.html',
  styleUrls: ['./cost-center-valve-form.component.scss'],
  providers: [
    // El locale predeterminado es 'en-US', pero con esta línea se cambia a 'es-ES'.
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class CostCenterValveFormComponent implements OnInit, AfterContentInit {
 
  costCenterValveForm: FormGroup = new FormGroup({});

  costCenterValve!: CostCenterValve;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  costCenterValveId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  letrasEspacios = validacion.letrasEspacios;
  letrasNumeros = validacion.letrasNumeros;

  //Seleccionables
  mesureOpciones: dataMesure[]      = [  ];
  campaignOpciones: DataCampaign[]  = [  ];
  valveOpciones:DataValve[] = [];

  //Arreglo auxiliar 
  valvedata: any = {};
  
  @Output() confirmarCostCenterValve: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarCostCenterValve: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute , 
    private costCenterService:CostCenterService,
    private mesureService: MesureService,
    private campaignService: CampaignService,
    private dataService: DataService,
    private valveService:ValveService
  ){
    let token = sessionStorage.getItem('token')?.toString();
    this.campaignService.getTableCampaign( token, '' , '1' ).subscribe(
      (response:ICampaignList) =>{
        this.campaignOpciones = response.data;
      },
      (error) => { console.error(`Ha ocurrido un error al obtener campañas:  ${error}`); console.log(error); },
      //() => console.info('Peticion de roles terminada')
    );

    this.valveService.getValveList( token, '' , '1' ).subscribe(
      (response:IValveList) =>{
        this.valveOpciones = response.data;

        this.valveOpciones.forEach( ( value, index ) =>{
          //console.log( index, value );
          let valveid = value.VALVEID, area = value.AREA, mesureid = value.MESUREID; 
          this.valvedata[ valveid ] = { 'AREA' : area , 'MESUREID' : mesureid };
        });
        console.log( this.valvedata );

      },
      (error) => { console.error(`Ha ocurrido un error al obtener válvulas disponibles:  ${error}`); console.log(error); },
      //() => console.info('Peticion de roles terminada')
    );

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.costCenterValveId = params.costCenterValveId;
      this.tipoFomrulario = params.tipoFormulario;

      this.costCenterValveForm = this.formBuilder.group({ 
        costcValveIdReg:  [ ''  ],
        costCenterId:     [ ''  ],
        valveId:          [ '' , Validators.compose( [ Validators.required ] ) ],
        campaign:         [ '' , Validators.compose( [ Validators.required ] ) ],
        startDate:        [ '' , Validators.compose( [ Validators.required ] ) ],
        finishDate:       [ '' ],
        area:             [ '' , Validators.compose( [ Validators.required ] ) ],
        mesureId:         [ '' , Validators.compose( [ Validators.required ] ) ]
      }); 

    });
  }
  ngAfterContentInit(): void {

    // Obtener datos para seleccionable Tipos de unidades de medida 
    let token = sessionStorage.getItem('token')?.toString();
    this.mesureService.getTableMesures( token ,'' , '1' , '2' ).subscribe(
      (response:IMesureList) =>{
        this.mesureOpciones = response.data; 

        //Cargar datos en update
        if( this.costCenterValveId !== '' ){
          this.getCostCenterValve( this.costCenterValveId );
        }
        else{
          this.titulo = 'Crea una nueva válvula para ' + this.dataService.getCentroCosto().description;
          
          this.costCenterId?.setValue( this.dataService.getCentroCosto().costCenterId );
          this.campaign?.setValue( this.dataService.getCentroCosto().campaignId );

          this.formularioListo = true;
        }
        
      },
      (error) => { console.error(`Ha ocurrido un error al obtener unidades de medida:  ${error}`); console.log(error); },
      //() => console.info('Peticion de roles terminada')
    );
    
  }

  get costcValveIdReg(){return this.costCenterValveForm.get('costcValveIdReg');}
  get costCenterId(){   return this.costCenterValveForm.get('costCenterId');}
  get valveId(){        return this.costCenterValveForm.get('valveId');}
  get campaign(){       return this.costCenterValveForm.get('campaign');}
  get startDate(){      return this.costCenterValveForm.get('startDate');}
  get finishDate(){     return this.costCenterValveForm.get('finishDate');}
  get area(){           return this.costCenterValveForm.get('area');}
  get mesureId(){       return this.costCenterValveForm.get('mesureId');}

  goCancelar(){
    this.router.navigate(['/menu/centros-costos-valvulas']);
  }

  ejecutarFormulario(){ 
    if( this.costCenterValveId === '' ){
      this.submitCostCenterValve();
    }
    else{
      this.updateCostCenterValve();
    }  
    
  }

  submitCostCenterValve(){

    if(this.costCenterValveForm.valid){
      this.confirmarCostCenterValve.emit( this.costCenterValveForm.value);
    }
  }

  updateCostCenterValve(){

    if(this.costCenterValveForm.valid){
      this.actualizarCostCenterValve.emit( this.costCenterValveForm.value);
    }
  }

  getCostCenterValve( costCenterValveId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.costCenterService.getTableValveCostCenter( token , costCenterValveId , this.dataService.getCentroCosto().costCenterId ).subscribe(
      (response:ICostcenterValveList) =>{

      this.titulo = 'Edita una válvula para ' + this.dataService.getCentroCosto().description;

      this.costCenterValve = response.data[0];

      this.costcValveIdReg?.setValue( costCenterValveId );
        
      this.costCenterId?.setValue( this.costCenterValve.COSTCENTERID);
      this.valveId?.setValue( this.costCenterValve.VALVEID);
      this.campaign?.setValue( this.costCenterValve.CAMPAIGNID);

      if( this.costCenterValve.STARTDATE !== '' ){
        let fecha = new Date( this.costCenterValve.STARTDATE );
        this.startDate?.setValue( fecha.toISOString()  ); 
      }

      if( this.costCenterValve.FINISHDATE !== '' ){
        let fechaFin = new Date( this.costCenterValve.FINISHDATE );
        this.finishDate?.setValue( fechaFin.toISOString()  ); 
      }

      this.area?.setValue( this.costCenterValve.AREA);
      this.mesureId?.setValue( this.costCenterValve.MESUREID);


      this.esReadOnly = true; 

       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener Campaña para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de Campaña para actualizar terminada')
   )
  }

  limpiarFecha() {
    this.finishDate?.setValue( '' );
  }


  changeValve(){
    let valvulaSelected = this.valveId?.value;
    console.log(valvulaSelected);
    console.log(this.valvedata[valvulaSelected].AREA);
    console.log(this.valvedata[valvulaSelected].MESUREID);

    this.area?.setValue( this.valvedata[valvulaSelected].AREA);
    this.mesureId?.setValue( this.valvedata[valvulaSelected].MESUREID);

  }

}

