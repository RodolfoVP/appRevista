import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhenology } from 'src/app/models/phenology.interface';
import { DataPhenology, IPhenologyList } from 'src/app/models/phenologyList.interface';

import { validacion } from 'src/app/models/regex.interface';
import { DataService } from 'src/app/services/data.service';
import { PhenologyService } from 'src/app/services/phenology.service';

@Component({
  selector: 'app-phenology-form',
  templateUrl: './phenology-form.component.html',
  styleUrls: ['./phenology-form.component.scss']
})
export class PhenologyFormComponent {

  phenologyForm: FormGroup = new FormGroup({});

  phenology!: DataPhenology;

  formularioListo: boolean = false;
  titulo:string = '';
  esReadOnly!:boolean;

  phenologyId!:string;
  tipoFomrulario!:boolean //true INSERT, false UPDATE

  letrasEspacios = validacion.letrasEspacios;
  Numeros = validacion.entero;
  enteroMayorCero = validacion.enteroMayorCero;

  @Output() confirmarPhenology: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarPhenology: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute , 
    private phenologyService:PhenologyService,
    private dataService:DataService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.phenologyId = params.phenologyId;
      this.tipoFomrulario = params.tipoFormulario;

      this.phenologyForm = this.formBuilder.group({ 
        phenologyidReg: [ ''  ],
        sequens: [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.Numeros) ] ) ],
        description:  [ '' , Validators.compose( [ Validators.required ] ) ],
        fertsappl: [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.enteroMayorCero) ] ) ],
        cultiveId: [ ''  ]
      }); 

      this.cultiveId?.setValue(this.dataService.getcultivo().cultiveid);

      if( this.phenologyId !== '' ){
        this.cargarPhenology( this.phenologyId );
      }
      else{
        this.titulo = 'Crea un nuevo Estado Fenológico para ' + this.dataService.getcultivo().description;
        this.formularioListo = true;
      }
    });
  }

  get phenologyidReg(){ return this.phenologyForm.get('phenologyidReg'); }
  get sequens(){        return this.phenologyForm.get('sequens'); }
  get description(){    return this.phenologyForm.get('description'); }
  get fertsappl(){      return this.phenologyForm.get('fertsappl'); }
  get cultiveId(){      return this.phenologyForm.get('cultiveId'); }

  goCancelar(){
    this.router.navigate(['/menu/fenologias']);
  }

  ejecutarFormulario(){ 
    if( this.phenologyId === '' ){
      this.submitPhenology();
    }
    else{
      this.updatePhenology();
    }  
    
  }

  submitPhenology(){

    if(this.phenologyForm.valid){
      this.confirmarPhenology.emit( this.phenologyForm.value);
    }
  }

  updatePhenology(){

    if(this.phenologyForm.valid){
      this.actualizarPhenology.emit( this.phenologyForm.value);
    }
  }

  cargarPhenology( phenologyId:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.phenologyService.getPhenologyTable( token , phenologyId , '' ).subscribe(
      (response:IPhenologyList) =>{

      this.titulo = 'Actualiza un Estado Fenológico para ' + this.dataService.getcultivo().description ;

      this.phenology = response.data[0];

      this.phenologyidReg?.setValue( phenologyId );

      this.sequens?.setValue( this.phenology.SEQUENS);
      this.description?.setValue( this.phenology.DESCRIPTION);
      this.fertsappl?.setValue( this.phenology.FERTSAPPL);

      this.esReadOnly = true; 

       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener fenología para actualizar:  ${error}`); console.log(error); },
     //() => console.info('Peticion de cultivo para actualizar terminada')
   )
  }

}
 