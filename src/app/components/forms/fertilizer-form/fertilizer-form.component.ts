import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFerilizer, IFertilizerList } from 'src/app/models/fertilizersList.interface';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { validacion } from 'src/app/models/regex.interface';
import { FertilizerService } from 'src/app/services/fertilizer.service';
import { MesureService } from 'src/app/services/mesure.service';

@Component({
  selector: 'app-fertilizer-form',
  templateUrl: './fertilizer-form.component.html',
  styleUrls: ['./fertilizer-form.component.scss']
})
export class FertilizerFormComponent {

  fertilizerForm: FormGroup = new FormGroup({});

  fertilizer!: DataFerilizer;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  fertilizerIdReg!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  mesureOpciones: dataMesure[] = [  ];

  //Formatos 
  letrasNumeros = validacion.letrasNumeros;
  decimal = validacion.decimal;

  @Output() confirmarFertilizer: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarFertilizer: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private mesureService: MesureService , 
    private router: Router, 
    private route: ActivatedRoute , 
    private fertilizerService:FertilizerService 
  ){}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:any) => {
      this.fertilizerIdReg = params.fertilizerId;
      
      this.tipoFomrulario = params.tipoFormulario; 

      this.fertilizerForm = this.formBuilder.group({ 
        fertilizerid:   [ ''  ],
        fertilizercode: [ ''  ],
        description:    [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        abbreviation:   [ '' , Validators.compose( [ Validators.required ] ) ],
        mesureid:       [ '' , Validators.compose( [ Validators.required ] ) ],
        fertilizertype: [ '' , Validators.compose( [ Validators.required ] ) ],
        price:          [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.decimal)] ) ],
      }); 

      // Obtener datos para seleccionable Tipos de unidades de medida 
      let token = sessionStorage.getItem('token')?.toString();
      this.mesureService.getTableMesures( token ,'' , '1' , '1,3' ).subscribe(
        (response:IMesureList) =>{
          this.mesureOpciones = response.data; 

          //Cargar datos en update
          if( this.fertilizerIdReg !== '' ){
            this.cargarFertilizer( this.fertilizerIdReg );
          }
          else{
            this.titulo = 'Crea un Fertilizante';
            this.formularioListo = true;
          }
          
        },
        (error) => { console.error(`Ha ocurrido un error al obtener unidades de medida:  ${error}`); console.log(error); },
        //() => console.info('Peticion de roles terminada')
      );
    });
    
  }

  get fertilizerid(){   return this.fertilizerForm.get('fertilizerid'); }
  get fertilizercode(){   return this.fertilizerForm.get('fertilizercode'); }
  get description(){  return this.fertilizerForm.get('description'); }
  get abbreviation(){       return this.fertilizerForm.get('abbreviation'); }
  get mesureid(){   return this.fertilizerForm.get('mesureid'); }
  get fertilizertype(){   return this.fertilizerForm.get('fertilizertype'); }
  get price(){   return this.fertilizerForm.get('price'); }

  goCancelar(){
    this.router.navigate(['/menu/fertilizantes']);
  }

  ejecutarFormulario(){ 
    if( this.fertilizerIdReg === '' ){
      this.submitFertilizer();
    }
    else{
      this.updateFertilizer();
    }  
    
  }

  submitFertilizer(){

    if(this.fertilizerForm.valid){
      this.confirmarFertilizer.emit( this.fertilizerForm.value);
    }
  }

  updateFertilizer(){

    if(this.fertilizerForm.valid){
      this.actualizarFertilizer.emit( this.fertilizerForm.value);
    }
  }

  cargarFertilizer( fertilizerId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString(); 
    this.fertilizerService.getTableFertilizers( token , fertilizerId , '' , '' ).subscribe(
      (response:IFertilizerList) =>{

      this.titulo = 'Actualiza un Fertilizante';

      this.fertilizer = response.data[0];
      this.fertilizerid?.setValue(fertilizerId);
      this.fertilizercode?.setValue( this.fertilizer.FERTILIZERCODE );

      //Bloquear campo USERCODE
      this.esReadOnly = true;

      this.description?.setValue( this.fertilizer.DESCRIPTION );
      this.abbreviation?.setValue( this.fertilizer.ABBREVIATION );
      this.mesureid?.setValue( this.fertilizer.MESUREID );
      this.price?.setValue( this.fertilizer.PRICE );
      this.fertilizertype?.setValue( this.fertilizer.FERTILIZERTYPE );

       //Marcar formulario listo
       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener fertilizante para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de nutriente para actualizar terminada')
   )
  }

}
