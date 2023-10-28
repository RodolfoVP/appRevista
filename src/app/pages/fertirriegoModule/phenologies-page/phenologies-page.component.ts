import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-phenologies-page',
  templateUrl: './phenologies-page.component.html',
  styleUrls: ['./phenologies-page.component.scss']
})
export class PhenologiesPageComponent {

  cultivoNombre: string = 'Sin cultivo';

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private notifyService:NotificationService, private dataService: DataService ){

    this.cultivoNombre = this.dataService.getcultivo().description;

  }

}
