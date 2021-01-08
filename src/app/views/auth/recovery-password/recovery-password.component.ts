import { query } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdatePasswordInput } from "src/app/models/inputs/updatePasswordInput";
import { RecoveryTokenIsValidOutput } from "src/app/models/inputs/recoveryTokenIsValidOutput";
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: "app-recovery-password",
  templateUrl: "./recovery-password.component.html",
  styleUrls: ["../../../../assets/styles/main.css"],
})
export class RecoveryPasswordComponent implements OnInit {
  token: string;
  output: RecoveryTokenIsValidOutput;

  recoveryForm : FormGroup;
  error = {
    show: false,
    message : ""
  };

  submited = false;

  constructor(
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public LoginService: LoginService) {}

  ngOnInit() {
    this.actRoute.queryParamMap.subscribe((params) => {
      console.log(params);
      this.token = params.get("token");
    });
    this.verifyToken(this.token);
    this.initform();
  }

  verifyToken(recoveryToken: string) {
    this.LoginService.recoveryTokenIsValid(recoveryToken).subscribe(data => {
      if(!data.recoveryTokenIsValid){
        this.router.navigate(['/login']);
      } else {
        this.output = data;
      }
    });
  }

  initform(){
    
    this.error = {
      show : false,
      message : ""
    };

    this.recoveryForm = this.fb.group({
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      confirm_password: [
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


  doRecoveryPassword() {
    try {
      this.submited = true;
      if(this.recoveryForm.controls.password.value != this.recoveryForm.controls.confirm_password.value){
        return this.openError("As senha não são iguais!")
      }

      if(this.recoveryForm.status == "INVALID"){

        if(this.recoveryForm.controls.password.errors){

          if(this.recoveryForm.controls.password.errors.required)
            this.openError("Nova senha é um campo obrigatório!")
        }

        if(this.recoveryForm.controls.confirm_password.errors){
          if(this.recoveryForm.controls.confirm_password.errors.required)
          this.openError("Por favor confirme sua senha!")
        }

      }
      else{
        let user_data = new UpdatePasswordInput();
        user_data.user_id = this.output.userId;
        user_data.password = this.recoveryForm.value.password;

        this.LoginService.updatePassword(user_data).subscribe(data => {
          if(data){
            this.router.navigate(['']);
          }
          else{
            this.openError('Ocorreu um erro ao atualizar sua senha. Por favor tente novamente!');
          }
        });
      }

    }
    catch(ex){
        this.openError(ex)
    }
  }
}
