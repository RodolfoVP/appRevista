import { Component , Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit  {
  
  @Input() data: any[] | null = null;
  columnasGrid = 3;
  columnaHeight:string = '550px';
  
  constructor(){}
  
  ngOnInit(): void {
    let windowWidth = window.innerWidth ;
    if (windowWidth >= 938) {  
      this.columnasGrid = 3;
      this.columnaHeight = '550px';
    } else {
      this.columnasGrid = 1;
      this.columnaHeight = '100px';
    }
  }
  @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      let windowWidth = (event.target as Window).innerWidth ;
      console.log( windowWidth );
      this.getDimension( windowWidth);
    }

   getDimension( windowWidth:number){
    
      if (windowWidth >= 938) {  
        this.columnasGrid = 3;
        this.columnaHeight = '550px';
      } else {
        this.columnasGrid = 1;
        this.columnaHeight = '100px';
      }
   } 

   goCard( ruta:string  ){

   }

}
