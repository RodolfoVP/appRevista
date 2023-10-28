import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-varieties-page',
  templateUrl: './varieties-page.component.html',
  styleUrls: ['./varieties-page.component.scss']
})
export class VarietiesPageComponent {

  cultivoNombre: string = 'Sin cultivo';

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private notifyService:NotificationService, private dataService: DataService ){

    this.cultivoNombre = this.dataService.getcultivo().description;

  }

}
