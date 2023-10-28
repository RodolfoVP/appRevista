import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router }  from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { ToasterPosition } from 'src/app/models/toast.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor( private router: Router, private authService: LoginService , private notifyService:NotificationService ){ }

  ngOnInit(): void {    
  }

  loginUser( value: any):void{

    let {usercode,password} = value;
    
    this.authService.login( usercode , password ).subscribe(
       (response:IUser) =>{
        console.log(response);
        if( response.data.STATUS === '1' ){
          
          sessionStorage.setItem('token',response.data.TOKEN);
          // Implementar pagina home segun privilegios
          this.router.navigate(['/menu']);
        }
        else if( response.data.STATUS === '2' ){
          
          sessionStorage.setItem('token',response.data.TOKEN);
          // Implementar pagina confirmar contraseña
          this.router.navigate(['/confirmPassword']);
        }
        else{
          // Toast usuario sin acceso, mostrar mensaje de servicio
          this.notifyService.showError( response.msj , "", ToasterPosition.bottomCenter )
        }
      },
      (error) => { console.error(`Ha ocurrido un error al hacer login:  ${error}`); console.log(error); },
      () => console.info('Peticion de login terminado')
    )
    
  }
  

}
