import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  styles: [`
  .mat-card-content:not([class*=mat-elevation-z0]){
    box-shadow: none;
  }
  `]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  @Output() loginAction: EventEmitter<{}> = new EventEmitter<{}>();
  hide:boolean = true;
  maxLengthUserCode = 11;
  maxLengthPass     = 14;
 
  constructor( private formBuilder: FormBuilder ){
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ //, Validators.max(11)
      usercode: [ '' , Validators.compose( [ Validators.required , Validators.pattern('^[0-9]*$') , Validators.minLength(8) ])],
      password: [ '' , Validators.compose( [ Validators.required ] )]
    }); 

  }

  registraUsercode(event: any): void {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue.length > this.maxLengthUserCode) {
      inputValue = inputValue.substring(0, this.maxLengthUserCode);
    }
    event.target.value = inputValue;
  }


  registraPass( event: any):void{
    let inputValue = event.target.value;
    if (inputValue.length > this.maxLengthPass) {
      inputValue = inputValue.substring(0, this.maxLengthPass);
    }
    event.target.value = inputValue;
  }

  get usercode(){
    return this.loginForm.get('usercode');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submitLogin(){

    if(this.loginForm.valid){
      this.loginAction.emit( this.loginForm.value);
    }
  }

}
