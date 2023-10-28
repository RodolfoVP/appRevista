import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {

  token:any = null;

  constructor(){
    this.token = sessionStorage.getItem('token');
  }

}
