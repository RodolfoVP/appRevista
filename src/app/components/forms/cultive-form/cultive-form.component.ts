import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCultive, ICultiveList } from 'src/app/models/cultiveList.interface';
import { validacion } from 'src/app/models/regex.interface';
import { CultiveService } from 'src/app/services/cultive.service';

@Component({
  selector: 'app-cultive-form',
  templateUrl: './cultive-form.component.html',
  styleUrls: ['./cultive-form.component.scss']
})
export class CultiveFormComponent {
  cultiveForm: FormGroup = new FormGroup({});

  cultive!: DataCultive;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  cultiveId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  //Formatos 
  //letrasEspacios = /^[a-zA-Z-áéíóúüÜñÑÁÉÍÓÚ ]+$/;
  //letrasNumeros = /^[a-zA-Z-0-9]+$/;

  letrasEspacios = validacion.letrasEspacios;
  letrasNumeros = validacion.letrasNumeros;

  @Output() confirmarCultive: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarCultive: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute , 
    private cultiveService:CultiveService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.cultiveId = params.cultiveId;
      this.tipoFomrulario = params.tipoFormulario;

      this.cultiveForm = this.formBuilder.group({ 
        cultiveIdReg: [ ''  ],
        cultiveCode: [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        description:  [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ]
      }); 

      //this.startdate?.disabled;

      if( this.cultiveId !== '' ){
        this.cargarCultive( this.cultiveId );
      }
      else{
        this.titulo = 'Crea un nuevo Cultivo';
        this.formularioListo = true;
      }
    });
  }

  get cultiveIdReg(){   return this.cultiveForm.get('cultiveIdReg'); }
  get cultiveCode(){   return this.cultiveForm.get('cultiveCode'); }
  get description(){  return this.cultiveForm.get('description'); }

  goCancelar(){
    this.router.navigate(['/menu/cultivos']);
  }

  ejecutarFormulario(){ 
    if( this.cultiveId === '' ){
      this.submitCultive();
    }
    else{
      this.updateCultive();
    }  
    
  }

  submitCultive(){

    if(this.cultiveForm.valid){
      this.confirmarCultive.emit( this.cultiveForm.value);
    }
  }

  updateCultive(){

    if(this.cultiveForm.valid){
      this.actualizarCultive.emit( this.cultiveForm.value);
    }
  }

  cargarCultive( cultiveId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.cultiveService.getCultiveTable( token , cultiveId ).subscribe(
      (response:ICultiveList) =>{

      this.titulo = 'Actualiza un Cultivo';

      this.cultive = response.data[0];

      this.cultiveIdReg?.setValue( cultiveId );

      this.cultiveCode?.setValue( this.cultive.CULTIVECODE);
      this.description?.setValue( this.cultive.DESCRIPTION);

      this.esReadOnly = true; 

       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener cultivo para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de cultivo para actualizar terminada')
   )
  }
}
