import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cost-centers-page',
  templateUrl: './cost-centers-page.component.html',
  styleUrls: ['./cost-centers-page.component.scss']
})
export class CostCentersPageComponent {

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private notifyService:NotificationService){}

}
