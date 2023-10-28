import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private toastr: ToastrService) { }
  showSuccess(message:string, title:string , position:any){

    const toast = this.toastr.success(message, title , { positionClass: position} );

  }

  showError(message:string, title:string , position:any){
    const toast =  this.toastr.error(message, title , { positionClass: position} )
  }

  showInfo(message:string, title:string){
    const toast =  this.toastr.info(message, title)
  }

  showWarning(message:string, title:string){
    const toast =  this.toastr.warning(message, title)
  }

  cerrarToast(){
    this.toastr.clear();
  }
}
