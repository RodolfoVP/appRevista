import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPass } from 'src/app/models/confirm.interface';
import { ToasterPosition } from 'src/app/models/toast.interface';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-confirmation-password-page',
  templateUrl: './confirmation-password-page.component.html',
  styleUrls: ['./confirmation-password-page.component.scss']
})
export class ConfirmationPasswordPageComponent {
  constructor( private router: Router, private authService: LoginService , private notifyService:NotificationService ){ }

  ngOnInit(): void {    
  }

  confirmPassUser( value: any):void{

    let {password,passwordNew} = value;
    
    this.authService.confirmPass( password , passwordNew ).subscribe(
       (response:IPass) =>{
        console.log(response);
        if( response.data.CONFIRM === 'CONFIRMADO' ){
          
          //TODO Implementar pagina home segun privilegios
          this.router.navigate(['/menu']);
        }
        else{
          // Toast error en validación de contraseña
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al confirmar el cambio de contraseña:  ${error}`); console.log(error); },
      () => console.info('Peticion de cambio contraseña terminado')
    )
    
  }
}
