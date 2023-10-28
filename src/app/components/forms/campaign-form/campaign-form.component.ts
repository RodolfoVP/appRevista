import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
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
export class CampaignFormComponent implements OnInit {
 
  campaignForm: FormGroup = new FormGroup({});

  campaign!: DataCampaign;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  campaignId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  //Formatos 
  //letrasEspacios = /^[a-zA-Z-áéíóúüÜñÑ ]+$/;
  //letrasNumeros = /^[a-zA-Z-0-9]+$/;

  letrasEspacios = validacion.letrasEspacios;
  letrasNumeros = validacion.letrasNumeros;
  
  @Output() confirmarCampaign: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarCampaign: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute , 
    private campaignService:CampaignService,
    //private _adapter: DateAdapter<any>,
    //@Inject(MAT_DATE_LOCALE) private _locale: string
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.campaignId = params.campaignId;
      this.tipoFomrulario = params.tipoFormulario;

      this.campaignForm = this.formBuilder.group({ 
        campaignIdReg: [ ''  ],
        campaignCode: [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        description:  [ '' , Validators.compose( [ Validators.required ] ) ],
        startdate:    [ '', Validators.compose( [ Validators.required ] ) ],
        finishdate:   [ '' ]
      }); 

      //this.startdate?.disabled;

      if( this.campaignId !== '' ){
        this.cargarCampaign( this.campaignId );
      }
      else{
        this.titulo = 'Crea una nueva Campaña';
        this.formularioListo = true;
      }
    });
  }

  get campaignIdReg(){   return this.campaignForm.get('campaignIdReg'); }
  get campaignCode(){   return this.campaignForm.get('campaignCode'); }
  get description(){  return this.campaignForm.get('description'); }
  get startdate(){       return this.campaignForm.get('startdate'); }
  get finishdate(){   return this.campaignForm.get('finishdate'); }

  goCancelar(){
    this.router.navigate(['/menu/campanias']);
  }

  ejecutarFormulario(){ 
    if( this.campaignId === '' ){
      this.submitCampaign();
    }
    else{
      this.updateCampaign();
    }  
    
  }

  submitCampaign(){

    if(this.campaignForm.valid){
      this.confirmarCampaign.emit( this.campaignForm.value);
    }
  }

  updateCampaign(){

    if(this.campaignForm.valid){
      this.actualizarCampaign.emit( this.campaignForm.value);
    }
  }

  cargarCampaign( campaignId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.campaignService.getTableCampaign( token , campaignId , '' ).subscribe(
      (response:ICampaignList) =>{

      this.titulo = 'Actualiza una Campaña';

      this.campaign = response.data[0];

      this.campaignIdReg?.setValue( campaignId );

      this.campaignCode?.setValue( this.campaign.CAMPAIGNCODE);
      this.description?.setValue( this.campaign.DESCRIPTION);

      if( this.campaign.STARTDATE !== '' ){
        let fecha = new Date( this.campaign.STARTDATE + ' 00:00:00' );
        this.startdate?.setValue( fecha.toISOString()  ); 
      }

      if( this.campaign.FINISHDATE !== '' ){
        let fechaFin = new Date( this.campaign.FINISHDATE + ' 00:00:00' );
        this.finishdate?.setValue( fechaFin.toISOString()  ); 
      }

      this.esReadOnly = true; 

       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener Campaña para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de Campaña para actualizar terminada')
   )
  }

  limpiarFecha() {
    this.finishdate?.setValue( '' );
  }


}
