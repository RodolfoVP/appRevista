import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-nutrients-page',
  templateUrl: './nutrients-page.component.html',
  styleUrls: ['./nutrients-page.component.scss']
})
export class NutrientsPageComponent {

  @HostListener('document:click', ['$event'])
    cierraToast(event: MouseEvent) {
      this.notifyService.cerrarToast(); 
    }

    constructor( private notifyService:NotificationService){}

}
