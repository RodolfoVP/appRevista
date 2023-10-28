import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-cultives-page',
  templateUrl: './cultives-page.component.html',
  styleUrls: ['./cultives-page.component.scss']
})
export class CultivesPageComponent {
  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private notifyService:NotificationService){}
}
