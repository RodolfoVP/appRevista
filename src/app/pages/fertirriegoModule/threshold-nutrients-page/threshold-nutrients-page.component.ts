import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-threshold-nutrients-page',
  templateUrl: './threshold-nutrients-page.component.html',
  styleUrls: ['./threshold-nutrients-page.component.scss']
})
export class ThresholdNutrientsPageComponent {

  nombreCultivo: string = 'Sin cultivo';

  constructor( dataService: DataService ){
    this.nombreCultivo = dataService.getcultivo().description;
  }

}
