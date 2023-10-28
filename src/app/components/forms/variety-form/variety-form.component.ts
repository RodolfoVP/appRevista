import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { validacion } from 'src/app/models/regex.interface';
import { IVariety } from 'src/app/models/variety.interface';
import { DataVariety, IVarietyList } from 'src/app/models/varietyList.interface';
import { DataService } from 'src/app/services/data.service';
import { VarietyService } from 'src/app/services/variety.service';


@Component({
  selector: 'app-variety-form',
  templateUrl: './variety-form.component.html',
  styleUrls: ['./variety-form.component.scss']
})
export class VarietyFormComponent {

  varietyForm: FormGroup = new FormGroup({});

  variety!: DataVariety;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  varietyId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  letrasEspacios = validacion.letrasEspacios;
  letrasNumeros = validacion.letrasNumeros;

  @Output() confirmarVariety: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarVariety: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute , 
    private varietyService:VarietyService,
    private dataService:DataService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.varietyId = params.varietyId;
      this.tipoFomrulario = params.tipoFormulario;

      this.varietyForm = this.formBuilder.group({ 
        varietyIdReg: [ ''  ],
        varietyCode: [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        description:  [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasNumeros) ] ) ],
        cultiveId: [ ''  ]
      }); 

      this.cultiveId?.setValue(this.dataService.getcultivo().cultiveid);

      if( this.varietyId !== '' ){
        this.cargarVariety( this.varietyId );
      }
      else{
        this.titulo = 'Crea una nueva variedad de ' + this.dataService.getcultivo().description;
        this.formularioListo = true;
      }
    });
  }

  get varietyIdReg(){   return this.varietyForm.get('varietyIdReg'); }
  get varietyCode(){   return this.varietyForm.get('varietyCode'); }
  get description(){  return this.varietyForm.get('description'); }
  get cultiveId(){  return this.varietyForm.get('cultiveId'); }

  goCancelar(){
    this.router.navigate(['/menu/variedades']);
  }

  ejecutarFormulario(){ 
    if( this.varietyId === '' ){
      this.submitVariety();
    }
    else{
      this.updateVariety();
    }  
    
  }

  submitVariety(){

    if(this.varietyForm.valid){
      this.confirmarVariety.emit( this.varietyForm.value);
    }
  }

  updateVariety(){

    if(this.varietyForm.valid){
      this.actualizarVariety.emit( this.varietyForm.value);
    }
  }

  cargarVariety( varietyId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.varietyService.getVarietyTable( token , varietyId , '' ).subscribe(
      (response:IVarietyList) =>{

      this.titulo = 'Actualiza una nueva variedad de ' + this.dataService.getcultivo().description ;

      this.variety = response.data[0];

      this.varietyIdReg?.setValue( varietyId );

      this.varietyCode?.setValue( this.variety.VARIETYCODE);
      this.description?.setValue( this.variety.DESCRIPTION);

      this.esReadOnly = true; 

       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener variedad para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de cultivo para actualizar terminada')
   )
  }

}
