import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginInput } from "src/app/models/inputs/loginInput";
import { LoginService } from '../../../services/login/login.service';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../../../../assets/styles/main.css", "./login.component.css"],
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;
  error = {
    show: false,
    message : ""
  };

  constructor(
    private fb : FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
    public LoginService : LoginService
  ) {}


  ngOnInit(): void {
    this.initForm();
  }
  
  //Função para iniciar o formulário e auxiliar na validação
  initForm(){
    
    this.error = {
      show : false,
      message : ""
    };

    this.loginForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
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

  doLogin(){

    try {

      if(this.loginForm.status == "INVALID"){

        if(this.loginForm.controls.email.errors){

          if(this.loginForm.controls.email.errors.required)
            this.openError("E-mail é um campo obrigatório!")
          if(this.loginForm.controls.email.errors.email)
            this.openError("E-mail inválido!")
        }

        if(this.loginForm.controls.password.errors){
          if(this.loginForm.controls.password.errors.required)
          this.openError("Senha é um campo obrigatório!")
        }

      }
      else{

        let user = new LoginInput();
        user.Email = this.loginForm.value.email;
        user.Password = this.loginForm.value.password;
  
        this.LoginService.doLoginUser(user).subscribe(data => {
          if(data.authenticated){
            //entrou
            localStorage.setItem('user',JSON.stringify(data.user));
            localStorage.setItem('token',JSON.stringify(data.acessToken));
            this.router.navigate(['admin/dashboard'])
          }
          else{
            this.openError(data.message);
          }
        });
  
      }

    }
    catch(ex){
        this.openError(ex)
    }
  }
}
