import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { DataNutrient, INutrientsList } from 'src/app/models/nutrientsList.interface';
import { validacion } from 'src/app/models/regex.interface';
import { MesureService } from 'src/app/services/mesure.service';
import { NutrientsService } from 'src/app/services/nutrients.service';

@Component({
  selector: 'app-nutrient-form',
  templateUrl: './nutrient-form.component.html',
  styleUrls: ['./nutrient-form.component.scss']
})
export class NutrientFormComponent  implements OnInit {

  nutrientForm: FormGroup = new FormGroup({});

  nutrient!: DataNutrient;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  nutrientId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  mesureOpciones: dataMesure[] = [  ];

  //Formatos 
  //letrasEspacios = /^[a-zA-Z-áéíóúüÜñÑ ]+$/;
  letrasEspacios = validacion.letrasEspacios;

  @Output() confirmarNutrient: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarNutrient: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private mesureService: MesureService , 
    private router: Router, 
    private route: ActivatedRoute , 
    private nutrientService:NutrientsService 
  ){}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:any) => {
      this.nutrientId = params.nutrientId;
      console.log( this.nutrientId );
      this.tipoFomrulario = params.tipoFormulario;

      this.nutrientForm = this.formBuilder.group({ 
        nutrientCode: [ ''  ],
        description:  [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ],
        symbol:       [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ],
        mesure:       [ '' , Validators.compose( [ Validators.required ] ) ]
      }); 

      // Obtener datos para seleccionable Tipos de unidades de medida 
      let token = sessionStorage.getItem('token')?.toString();
      this.mesureService.getTableMesures( token ,'' , '1' , '1,3' ).subscribe(
        (response:IMesureList) =>{
          this.mesureOpciones = response.data; 

          console.log( this.nutrientId );
          //Cargar datos en update
          if( this.nutrientId !== '' ){
            this.cargarNutrient( this.nutrientId );
          }
          else{
            this.titulo = 'Crea un Nutriente';
            this.formularioListo = true;
          }
          
        },
        (error) => { console.error(`Ha ocurrido un error al obtener unidades de medida:  ${error}`); console.log(error); },
        //() => console.info('Peticion de roles terminada')
      );
    });
    
  }

  get nutrientCode(){   return this.nutrientForm.get('nutrientCode'); }
  get description(){  return this.nutrientForm.get('description'); }
  get symbol(){       return this.nutrientForm.get('symbol'); }
  get mesure(){   return this.nutrientForm.get('mesure'); }

  goCancelar(){
    this.router.navigate(['/menu/nutrientes']);
  }

  ejecutarFormulario(){ 
    if( this.nutrientId === '' ){
      this.submitNutrient();
    }
    else{
      this.updateNutrient();
    }  
    
  }

  submitNutrient(){

    if(this.nutrientForm.valid){
      this.confirmarNutrient.emit( this.nutrientForm.value);
    }
  }

  updateNutrient(){

    if(this.nutrientForm.valid){
      this.actualizarNutrient.emit( this.nutrientForm.value);
    }
  }

  cargarNutrient( nutrientId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.nutrientService.getNutrientTable( token , nutrientId ).subscribe(
      (response:INutrientsList) =>{

      this.titulo = 'Actualiza un Nutriente';

      this.nutrient = response.data[0];
      this.nutrientCode?.setValue( this.nutrient.NUTRIENTID );

      //Bloquear campo USERCODE
      this.esReadOnly = true;

      this.description?.setValue( this.nutrient.DESCRIPTION );
      this.symbol?.setValue( this.nutrient.SYMBOL );
      this.mesure?.setValue( this.nutrient.MESUREID );

       //Marcar formulario listo
       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener nutriente para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de nutriente para actualizar terminada')
   )
  }

}
