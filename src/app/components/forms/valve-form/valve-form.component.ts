import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMesureList, dataMesure } from 'src/app/models/mesureList.interface';
import { validacion } from 'src/app/models/regex.interface';
import { DataValve, IValveList } from 'src/app/models/valve.interface';
import { MesureService } from 'src/app/services/mesure.service';
import { ValveService } from 'src/app/services/valve.service';

@Component({
  selector: 'app-valve-form',
  templateUrl: './valve-form.component.html',
  styleUrls: ['./valve-form.component.scss']
})
export class ValveFormComponent  implements OnInit {

  valveForm: FormGroup = new FormGroup({});

  valve!: DataValve;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  valveId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  mesureOpciones: dataMesure[] = [  ];

  //Formatos 
  letrasEspacios = validacion.letrasEspacios;
  letrasNumeros = validacion.letrasNumeros;

  @Output() confirmarValve: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarValve: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private mesureService: MesureService , 
    private router: Router, 
    private route: ActivatedRoute , 
    private valveService:ValveService 
  ){}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:any) => {
      console.log( params );
      this.valveId = params.valveId;
      
      this.tipoFomrulario = params.tipoFormulario;

      this.valveForm = this.formBuilder.group({ 
        valveIdReg: [ ''  ],
        valveCode:   [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        description:  [ '' , Validators.compose( [ Validators.required ] ) ],
        mesureId:       [ '' , Validators.compose( [ Validators.required ] ) ],
        area:             [ '' , Validators.compose( [ Validators.required ] ) ],
      }); 

      // Obtener datos para seleccionable Tipos de unidades de medida 
      let token = sessionStorage.getItem('token')?.toString();
      this.mesureService.getTableMesures( token ,'' , '1' , '2' ).subscribe(
        (response:IMesureList) =>{
          this.mesureOpciones = response.data; 

          //Cargar datos en update
          if( this.valveId !== '' ){
            this.loadValve( this.valveId );
          }
          else{
            this.titulo = 'Crea una válvula';
            this.formularioListo = true;
          }
          
        },
        (error) => { console.error(`Ha ocurrido un error al obtener unidades de medida:  ${error}`); console.log(error); },
        //() => console.info('Peticion de roles terminada')
      );
    });
    
  }

  get valveIdReg(){   return this.valveForm.get('valveIdReg')}
  get valveCode(){    return this.valveForm.get('valveCode')}
  get description(){  return this.valveForm.get('description')}
  get mesureId(){     return this.valveForm.get('mesureId')}
  get area(){         return this.valveForm.get('area')}

  goCancelar(){
    this.router.navigate(['/menu/valvulas']);
  }

  ejecutarFormulario(){ 
    if( this.valveId === '' ){
      this.submitValve();
    }
    else{
      this.updateValve();
    }  
    
  }

  submitValve(){

    if(this.valveForm.valid){
      this.confirmarValve.emit( this.valveForm.value);
    }
  }

  updateValve(){

    if(this.valveForm.valid){
      this.actualizarValve.emit( this.valveForm.value);
    }
  }

  loadValve( valveId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.valveService.getValveList( token , valveId ,'' ).subscribe(
      (response:IValveList) =>{

      this.titulo = 'Actualiza una válvula';

      this.valve = response.data[0];
      this.valveIdReg?.setValue( this.valve.VALVEID );
      this.valveCode?.setValue( this.valve.VALVECODE );

      //Bloquear campo USERCODE
      this.esReadOnly = true;

      this.description?.setValue( this.valve.DESCRIPTION );
      this.area?.setValue( this.valve.AREA );
      this.mesureId?.setValue( this.valve.MESUREID );

       //Marcar formulario listo
       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener nutriente para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de nutriente para actualizar terminada')
   )
  }
}
