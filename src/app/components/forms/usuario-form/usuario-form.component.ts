import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validacion } from 'src/app/models/regex.interface';
import { Datum, IRolesList } from 'src/app/models/rolesList.interface';
import { IUserList, Usuario } from 'src/app/models/userList.interface';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({}); 
  @Output() confirmarUsuario: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() actualizarUsuario: EventEmitter<{}> = new EventEmitter<{}>();
  hide:boolean = true;

  userCod: string = '';
  usuario: Usuario | undefined | null;
  tipoFomrulario: boolean = true; // Insert TRUE, update FALSE

  esReadOnly!:boolean;

  titulo:string = '';

  maxLengthUserCode = 11;
  maxLengthPass     = 14;
  maxlengthAlfanumerico = 256;

  //letrasEspacios = /^[a-zA-Z-áéíóúüÜñÑ ]+$/;
  letrasEspacios = validacion.letrasEspacios;

  rolesOpciones: Datum[] = [  ];

  formularioListo: boolean = false;
 
  constructor( private formBuilder: FormBuilder, 
    private rolesService: RolesService , 
    private router: Router , 
    private route: ActivatedRoute , 
    private usersService:UserService 
    ){
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:any) => {
      this.userCod = params.userCode;
      this.tipoFomrulario = params.tipoFormulario;

      this.usuarioForm = this.formBuilder.group({ 
        usercode:   [ '' , Validators.compose( [ Validators.required , Validators.pattern('^[0-9]*$') , Validators.minLength(8) ])],
        password:   [ '' , Validators.compose( [ Validators.required ] ) ],
        correo:     [ '' ,  [ Validators.required , Validators.email , this.emailDomainValidator ] ],
        nombres:    [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ],
        apellidos:  [ '' , Validators.compose( [ Validators.required , Validators.pattern(this.letrasEspacios) ] ) ],
        rol:        [ '' , Validators.compose( [ Validators.required ] ) ]
      }); 
    });

    // Obtener datos para seleccionable roles 
    let token = sessionStorage.getItem('token')?.toString();
    this.rolesService.getRolesSelect( token ).subscribe(
      (response:IRolesList) =>{
        this.rolesOpciones = response.data; 

        //Cargar datos en update
        if( this.userCod !== '' ){
          this.cargarUsuario( this.userCod );
        }
        else{
          this.titulo = 'Crea un nuevo usuario';
          this.formularioListo = true;
        }
        
      },
      (error) => { console.error(`Ha ocurrido un error al obtener roles:  ${error}`); console.log(error); },
      () => console.info('Peticion de roles terminada')
    );


  }

  cargarUsuario( userCode:string ){

    // Implementar servicio para recuperar datos de una sola persona
    let token = sessionStorage.getItem('token')?.toString();
    this.usersService.getTableUser( token , userCode ).subscribe(
      (response:IUserList) =>{

      this.titulo = 'Actualiza un usuario';

      this.usuario = response.data.usuarios[0];
      this.usercode?.setValue( this.usuario.USERCODE );

      //Bloquear campo USERCODE
      this.esReadOnly = true;

      //Deshavilitar required de contraseña
      this.usuarioForm.get('password')?.clearValidators();
      this.usuarioForm.get('password')?.updateValueAndValidity();

      this.correo?.setValue( this.usuario.EMAIL );
      this.nombres?.setValue( this.usuario.NAME );
      this.apellidos?.setValue( this.usuario.LASTNAME );
      this.rol?.setValue( this.usuario.ROLEID );

       //Marcar formulario listo
       this.formularioListo = true;

     },
     (error) => { console.error(`Ha ocurrido un error al obtener usuario para actualizar:  ${error}`); console.log(error); },
     () => console.info('Peticion de usuario para actualizar terminada')
   )
  }

  registraUsercode(event: any): void {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue.length > this.maxLengthUserCode) {
      inputValue = inputValue.substring(0, this.maxLengthUserCode);
    }
    event.target.value = inputValue;
  }

  registraPass( event: any):void{
    let inputValue = event.target.value;
    if (inputValue.length > this.maxLengthPass) {
      inputValue = inputValue.substring(0, this.maxLengthPass);
    }
    event.target.value = inputValue;
    this.usuarioForm.value.password = inputValue;
  }

  registrAlfanumerico(event: any): void {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^a-zA-Z-áéíóúüÜñÑ ]/g, ''); 
    if (inputValue.length > this.maxlengthAlfanumerico) {
      inputValue = inputValue.substring(0, this.maxlengthAlfanumerico);
    }
    event.target.value = inputValue;
  }

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [, domain] = email.split('@');
      if (!domain.includes('.') || domain.endsWith('.')) {
        return { invalidDomain: true };
      }
    }
    return null;
  }

  get usercode(){
    return this.usuarioForm.get('usercode');
  }

  get password(){
    return this.usuarioForm.get('password');
  }

  get correo(){
    return this.usuarioForm.get('correo');
  }

  get nombres(){
    return this.usuarioForm.get('nombres');
  }

  get apellidos(){
    return this.usuarioForm.get('apellidos');
  }

  get rol(){
    return this.usuarioForm.get('rol');
  }

  goCancelar(){
      this.router.navigate(['/menu/usuarios']);
  }


  ejecutarFormulario(){ 
    if( this.userCod === '' ){
      this.submitUsuario();
    }
    else{
      this.updateUsuario();
    }  
    
  }

  submitUsuario(){

    if(this.usuarioForm.valid){
      this.confirmarUsuario.emit( this.usuarioForm.value);
    }
  }

  updateUsuario(){

    if(this.usuarioForm.valid){
      this.actualizarUsuario.emit( this.usuarioForm.value);
    }
  }


}
