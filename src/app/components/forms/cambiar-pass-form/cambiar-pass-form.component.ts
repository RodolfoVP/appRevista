import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-pass-form',
  templateUrl: './cambiar-pass-form.component.html',
  styleUrls: ['./cambiar-pass-form.component.scss']
})
export class CambiarPassFormComponent {

  confirmPassForm: FormGroup = new FormGroup({});
  @Output() confirmPassAction: EventEmitter<{}> = new EventEmitter<{}>();
  hide:boolean = true;
  hideNew:boolean = true;
  maxLengthPass   = 14;
  maxLengthPassNew= 14;
 
  constructor( private formBuilder: FormBuilder ){}

  ngOnInit(): void {
    this.confirmPassForm = this.formBuilder.group({
      password: [ '' , Validators.compose( [ Validators.required ] )],
      passwordNew: [ '' , Validators.compose( [ Validators.required ] )]
    }); 
  }

  registraPass( event: any):void{
    let inputValue = event.target.value;
    if (inputValue.length > this.maxLengthPass) {
      inputValue = inputValue.substring(0, this.maxLengthPass);
    }
    event.target.value = inputValue;
  }

  registraPassNew( event: any):void{
    let inputValue = event.target.value;
    if (inputValue.length > this.maxLengthPassNew) {
      inputValue = inputValue.substring(0, this.maxLengthPassNew);
    }
    event.target.value = inputValue;
  }

  get password(){
    return this.confirmPassForm.get('password');
  }

  get passwordNew(){
    return this.confirmPassForm.get('passwordNew');
  }

  submitConfirmPass(){

    if(this.confirmPassForm.valid){
      this.confirmPassAction.emit( this.confirmPassForm.value);
    }
  }
}
