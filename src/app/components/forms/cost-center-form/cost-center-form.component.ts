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
import { DataCostCenter, ICostCenterList } from 'src/app/models/costCenterList.interface';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { MesureService } from 'src/app/services/mesure.service';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { DataCultive } from 'src/app/models/cultiveList.interface';
import { DataVariety } from 'src/app/models/varietyList.interface';
import { PhenologyService } from 'src/app/services/phenology.service';
import { Cultivo, IPhenologyCultiveVarietyList } from 'src/app/models/phenologyCultiveVarietyList.interface';

@Component({
  selector: 'app-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  styleUrls: ['./cost-center-form.component.scss'],
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
export class CostCenterFormComponent implements OnInit, AfterContentInit {
 
  costCenterForm: FormGroup = new FormGroup({});

  costCenter!: DataCostCenter;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  costCenterId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  letrasEspacios = validacion.letrasEspacios;
  letrasNumeros = validacion.letrasNumeros;

  //Seleccionables
  mesureOpciones: dataMesure[]      = [  ];
  campaignOpciones: DataCampaign[]  = [  ];
  cultiveOpciones: Cultivo[]    = [  ];
  variertyOpciones: DataVariety[]   = [  ];

  //Datos para seleccionable cultivos y variedades
  dataCultiveVariety!: any;
  cultivoset!:string;
  
  @Output() confirmarCostCenter: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarCostCenter: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute , 
    private costCenterService:CostCenterService,
    private mesureService: MesureService,
    private campaignService: CampaignService,
    private phenologyService: PhenologyService
  ){
    
    //Agregar seleccionable de cultivos y centros de costo
    let token = sessionStorage.getItem('token')?.toString();
    this.campaignService.getTableCampaign( token, '' , '1' ).subscribe(
      (response:ICampaignList) =>{
        this.campaignOpciones = response.data;
      },
      (error) => { console.error(`Ha ocurrido un error al obtener campañas:  ${error}`); console.log(error); },
      //() => console.info('Peticion de roles terminada')
    );

    this.phenologyService.getPhenologyCultiveVarietyList( token ).subscribe(
      (response:IPhenologyCultiveVarietyList) =>{
        this.dataCultiveVariety = response.data.cultivos_variedades;

        this.cultiveOpciones = response.data.cultivos;
        //this.cultivoset = this.cultiveOpciones[0].CULTIVEID ?? '';
        //this.variertyOpciones = this.dataCultiveVariety[ this.cultivoset ];

      },
      (error) => { console.error(`Ha ocurrido un error al obtener cultivos y variedades con fenologías:  ${error}`); console.log(error); },
      //() => console.info('Peticion de roles terminada')
    );

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.costCenterId = params.costCenterId;
      this.tipoFomrulario = params.tipoFormulario;

      this.costCenterForm = this.formBuilder.group({ 
        costCenterIdReg:  [ ''  ],
        costCenterCode:   [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        description:      [ '' , Validators.compose( [ Validators.required ] ) ],
        cultiveId:        [ '' , Validators.compose( [ Validators.required ] ) ],
        varietyId:        [ '' , Validators.compose( [ Validators.required ] ) ],
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

        console.log( this.costCenterId );
        //Cargar datos en update
        if( this.costCenterId !== '' ){
          this.cargarCostCenter( this.costCenterId );
        }
        else{
          this.titulo = 'Crea un nuevo centro de costos';
          this.formularioListo = true;
        }
        
      },
      (error) => { console.error(`Ha ocurrido un error al obtener unidades de medida:  ${error}`); console.log(error); },
      //() => console.info('Peticion de roles terminada')
    );
    
  }

  get costCenterIdReg(){return this.costCenterForm.get('costCenterIdReg');}
  get costCenterCode(){ return this.costCenterForm.get('costCenterCode');}
  get description(){    return this.costCenterForm.get('description');}
  get cultiveId(){      return this.costCenterForm.get('cultiveId');}
  get varietyId(){      return this.costCenterForm.get('varietyId');}
  get campaign(){       return this.costCenterForm.get('campaign');}
  get startDate(){      return this.costCenterForm.get('startDate');}
  get finishDate(){     return this.costCenterForm.get('finishDate');}
  get area(){           return this.costCenterForm.get('area');}
  get mesureId(){       return this.costCenterForm.get('mesureId');}

  goCancelar(){
    this.router.navigate(['/menu/centros-costos']);
  }

  ejecutarFormulario(){ 
    if( this.costCenterId === '' ){
      this.submitCostCenter();
    }
    else{
      this.updateCostCenter();
    }  
    
  }

  submitCostCenter(){

    if(this.costCenterForm.valid){
      this.confirmarCostCenter.emit( this.costCenterForm.value);
    }
  }

  updateCostCenter(){

    if(this.costCenterForm.valid){
      this.actualizarCostCenter.emit( this.costCenterForm.value);
    }
  }

  cargarCostCenter( costCenterId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.costCenterService.getTableCostCenter( token , costCenterId ).subscribe(
      (response:ICostCenterList) =>{

      this.titulo = 'Actualiza un centro de costos';

      this.costCenter = response.data[0];

      this.costCenterIdReg?.setValue( costCenterId );

      this.costCenterCode?.setValue( this.costCenter.COSTCENTERCODE);
      this.description?.setValue( this.costCenter.DESCRIPTION);
      this.cultiveId?.setValue( this.costCenter.CULTIVEID);
      //this.cultivoset =  this.costCenter.CULTIVEID;
      this.varietyId?.setValue( this.costCenter.VARIETYID);
      this.campaign?.setValue( this.costCenter.CAMPAIGNID);

      if( this.costCenter.STARTDATE !== '' ){
        let fecha = new Date( this.costCenter.STARTDATE );
        this.startDate?.setValue( fecha.toISOString()  ); 
      }

      if( this.costCenter.FINISHDATE !== '' ){
        let fechaFin = new Date( this.costCenter.FINISHDATE );
        this.finishDate?.setValue( fechaFin.toISOString()  ); 
      }

      this.area?.setValue( this.costCenter.AREA);
      this.mesureId?.setValue( this.costCenter.MESUREID);


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


}

