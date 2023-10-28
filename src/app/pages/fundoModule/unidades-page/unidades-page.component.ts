import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-unidades-page',
  templateUrl: './unidades-page.component.html',
  styleUrls: ['./unidades-page.component.scss']
})
export class UnidadesPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private notifyService:NotificationService){}

}
