import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const router= inject(Router);

  let token:any   = sessionStorage.getItem('token')?.toString();
    if( token == '' ){
      router.navigate(['/login']);
      return false
    }
    else{
      return true;
    }
};
