import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { IMesureTypeList, MesureTypeData } from 'src/app/models/mesureTypes.interface';
import { validacion } from 'src/app/models/regex.interface';
import { MesureTypesService } from 'src/app/services/mesure-types.service';
import { MesureService } from 'src/app/services/mesure.service';

@Component({
  selector: 'app-mesure-form',
  templateUrl: './mesure-form.component.html',
  styleUrls: ['./mesure-form.component.scss']
})
export class MesureFormComponent implements OnInit {

  mesureForm: FormGroup = new FormGroup({});

  mesure!: dataMesure;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  mesureId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  mesureTypeOpciones: MesureTypeData[] = [  ];

  //Formatos 
  //letrasEspacios = /^[a-zA-Z-áéíóúüÜñÑ ]+$/;

  letrasEspacios = validacion.letrasEspacios;


  @Output() confirmarMesure: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarMesure: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private mesureTypesService: MesureTypesService , 
    private router: Router, 
    private route: ActivatedRoute , 
    private mesureService:MesureService 
  ){}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:any) => {
      this.mesureId = params.mesureId;
      this.tipoFomrulario = params.tipoFormulario;

      this.mesureForm = this.formBuilder.group({ 
        mesureCode:   [ ''  ],
        description:  [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ],
        symbol:       [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ],
        mesureType:   [ '' , Validators.compose( [ Validators.required ] ) ]
      }); 

      // Obtener datos para seleccionable Tipos de unidades de medida 
      let token = sessionStorage.getItem('token')?.toString();
      this.mesureTypesService.getTableMesureTypes( token ).subscribe(
        (response:IMesureTypeList) =>{
          this.mesureTypeOpciones = response.data; 

          //Cargar datos en update
          if( this.mesureId !== '' ){
            this.cargarMesure( this.mesureId );
          }
          else{
            this.titulo = 'Crea una Unidad de Medida';
            this.formularioListo = true;
          }
          
        },
        (error) => { console.error(`Ha ocurrido un error al obtener roles:  ${error}`); console.log(error); },
        () => console.info('Peticion de roles terminada')
      );
    });
    
  }

  get mesureCode(){   return this.mesureForm.get('mesureCode'); }
  get description(){  return this.mesureForm.get('description'); }
  get symbol(){       return this.mesureForm.get('symbol'); }
  get mesureType(){   return this.mesureForm.get('mesureType'); }

  goCancelar(){
    this.router.navigate(['/menu/unidades']);
  }


  ejecutarFormulario(){ 
    if( this.mesureId === '' ){
      this.submitMesure();
    }
    else{
      this.updateMesure();
    }  
    
  }

  submitMesure(){

    if(this.mesureForm.valid){
      this.confirmarMesure.emit( this.mesureForm.value);
    }
  }

  updateMesure(){

    if(this.mesureForm.valid){
      this.actualizarMesure.emit( this.mesureForm.value);
    }
  }

  cargarMesure( mesureId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.mesureService.getTableMesures( token , mesureId , '' , '' ).subscribe(
      (response:IMesureList) =>{

      this.titulo = 'Actualiza una unidad de medida';

      this.mesure = response.data[0];
      this.mesureCode?.setValue( this.mesure.MESUREID );

      //Bloquear campo USERCODE
      this.esReadOnly = true;

      this.description?.setValue( this.mesure.DESCRIPTION );
      this.symbol?.setValue( this.mesure.UNIDAD );
      this.mesureType?.setValue( this.mesure.MESURETYPEID );

       //Marcar formulario listo
       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener Unidad de medida para actualizar:  ${error}`); console.log(error); },
     () => console.info('Peticion de Unidad de medida para actualizar terminada')
   )
  }

}
