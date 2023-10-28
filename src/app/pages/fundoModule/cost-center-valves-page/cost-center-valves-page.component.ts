import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-cost-center-valves-page',
  templateUrl: './cost-center-valves-page.component.html',
  styleUrls: ['./cost-center-valves-page.component.scss']
})
export class CostCenterValvesPageComponent {

  centroCostoNombre: string = 'Sin centro costo';

  @HostListener('document:click', ['$event'])
  cierraToast(event: MouseEvent) {
    this.notifyService.cerrarToast(); 
  }

  constructor( private notifyService:NotificationService, private dataService: DataService ){

    this.centroCostoNombre = this.dataService.getCentroCosto().description;

  }

}
