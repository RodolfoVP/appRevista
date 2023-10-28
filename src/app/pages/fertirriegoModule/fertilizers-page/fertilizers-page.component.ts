import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-fertilizers-page',
  templateUrl: './fertilizers-page.component.html',
  styleUrls: ['./fertilizers-page.component.scss']
})
export class FertilizersPageComponent {

  @HostListener('document:click', ['$event'])
    cierraToast(event: MouseEvent) {
      this.notifyService.cerrarToast(); 
    }

    constructor( private notifyService:NotificationService){}
}
