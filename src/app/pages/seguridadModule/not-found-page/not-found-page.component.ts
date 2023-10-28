import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {

  token:any = null;

  constructor( private router:Router ){

    this.token = sessionStorage.getItem('token');

    if( this.token == '' ){
      this.router.navigate(['/login']);
    }

  }
}
