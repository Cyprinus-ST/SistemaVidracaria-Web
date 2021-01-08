import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordInput } from 'src/app/models/inputs/forgotPasswordInput';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ["../../../../assets/styles/main.css"],
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm : FormGroup;
  error = {
    show: false,
    message : ""
  };

  submited = false;

  constructor(
    private fb : FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
    public LoginService : LoginService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.error = {
      show: false,
      message: ""
    }

    this.forgotForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
    });
  }

  closeError(){
    this.error.show = false;
    this.error.message= "";
  }

  openError(message : string){
    this.error.show = true;
    this.error.message= message;
  }

  doForgotPassword() {
    try {
      this.submited = true;
      if(this.forgotForm.status == "INVALID"){
        if(this.forgotForm.controls.email.errors){

          if(this.forgotForm.controls.email.errors.required)
            this.openError("E-mail é um campo obrigatório!")
          if(this.forgotForm.controls.email.errors.email)
            this.openError("E-mail inválido!")
        }
      }
      else{
        
        let input = new ForgotPasswordInput();
        input.Email = this.forgotForm.value.email;
  
        this.LoginService.forgotPassword(input).subscribe(data => {
          if(data.sentEmail){
            this.router.navigate(['/login'])
          }
          else{
            return this.openError(data.message);
          }
        });
  
      }

    }
    catch(ex){
      this.openError(ex)
    }
  }

}
