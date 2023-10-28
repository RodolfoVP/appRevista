import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { IUser } from 'src/app/models/user.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: ['./usuario-page.component.scss']
})
export class UsuarioPageComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

constructor( private router:Router , private userService:UserService , private notifyService:NotificationService ){}

ngOnInit(): void {
  
}

registrarUser( value: any ):void{

  let { usercode, password, correo, nombres, apellidos, rol  } = value;
  
  this.userService.insertUsuario(usercode, password, correo, nombres, apellidos, rol ).subscribe(
     (response:IUser) =>{

      if( response.data.USERID ){
        this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
        //  Mostrar Mensaje exitoso y retornar a table usuarios
        this.router.navigate(['/menu/usuarios']);
      }
      else{
        // Toast error en validación de contraseña
        this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
      }
    },
    (error) => { console.error(`Ha ocurrido un error al registrar el usaurio:  ${error}`); console.log(error); },
    //() => console.info('Peticion de registro de usuario Terminada')
  )
  
}

actualizaarUser( value: any ):void{

  let { usercode, password, correo, nombres, apellidos, rol  } = value;
  
  this.userService.updatetUsuario(usercode, password, correo, nombres, apellidos, rol ).subscribe(
     (response:IUser) =>{

      if( response.data.USERID ){
        this.notifyService.showSuccess( response.msj , "", ToasterPosition.bottomCenter )
        //  Mostrar Mensaje exitoso y retornar a table usuarios
        this.router.navigate(['/menu/usuarios']);
      }
      else{
        // Toast error en validación de contraseña
        this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
      }
    },
    (error) => { console.error(`Ha ocurrido un error al actualizar el usaurio:  ${error}`); console.log(error); },
    //() => console.info('Peticion de actualizar usuario Terminada')
  )
  
}

}
