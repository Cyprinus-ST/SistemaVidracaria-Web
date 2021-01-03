import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from "src/app/models/User/UserModel";
import { LoginService } from "src/app/services/login/login.service";
import { ViacepService } from "src/app/services/utils/viacep.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = {
    show : false,
    message : ""
  };

  submited = false;

  constructor(
    private fb : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    public LoginService : LoginService,
    public ViaCepService : ViacepService
  ) {
    
  }

  ngOnInit(): void {
    this.initForm();

  }

  closeError(){
    this.error.show = false;
    this.error.message= "";
  }

  openError(message : string){
    this.error.show = true;
    this.error.message= message;
  }


  initForm(){
    this.registerForm = this.fb.group({
      Name : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(320), 
        ]),
      ],
      Email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      Password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      CPF : [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(14), 
        ]),
      ],
      CEP : [
        "",
        Validators.compose([
          Validators.maxLength(20), 
        ]),
      ],
      City : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Complement : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Country : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Neighborhood : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      State : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Street : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Number : [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Phone : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ]
    });
  }

  getCep(){
    let cep = this.registerForm.controls.CEP.value;

    if(cep != null){
      this.ViaCepService.getCepData(cep).subscribe(data =>{
        console.log(data)
        if(data != null){
          this.registerForm.controls.Country.setValue("Brasil");
          this.registerForm.controls.City.setValue(data.localidade);
          this.registerForm.controls.State.setValue(data.uf);
          this.registerForm.controls.Street.setValue(data.logradouro);
        }
      });
    }
  }

  doRegister(){
    try{
      console.log(this.registerForm);
      this.submited = true;
      if(this.registerForm.status == "INVALID")
        this.openError("Favor preencher todos os campos obrigatórios");
      else{

        let user = new UserModel();
        user = this.registerForm.value;
        user.Type = "user";
        user.CPF = user.CPF.toString();
        user.Phone = user.Phone.toString();
        console.log(user);
        this.LoginService.registerUser(user).subscribe(data =>{
          console.log(data);
        });
        
      }
      
    }
    catch(ex){
      this.openError(ex);
    }
    

  }
}
