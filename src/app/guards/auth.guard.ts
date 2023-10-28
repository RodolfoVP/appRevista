import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenVerificationService } from '../services/token-verification.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router= inject(Router);

  let token:any   = sessionStorage.getItem('token')?.toString();
    if( token == '' ){
      router.navigate(['/login']);
      return false
    }
    else{
      return true;
    }

  
  const tokenService = inject(TokenVerificationService);
  //return true;
  /*
  //TODO - Evaluar token, si no cumple retornar a login 

  if(tokenService.getTokenVerification()){
    return true;
  }
  else{
    router.navigate(['/login']);
    //TODO - Mensaje de alerta sobre inicio de sesión concurrente
    return false;
  }
  */

};
