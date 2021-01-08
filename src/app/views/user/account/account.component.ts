import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user/user.service';
import { ViacepService } from 'src/app/services/utils/viacep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  updateForm : FormGroup;
  
  userData;
  
  submited;

  error = {
    show : false,
    message: ""
  };

  constructor(
    private fb : FormBuilder,
    public UserService : UserService,
    public ViaCepService : ViacepService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){

    this.userData = JSON.parse(localStorage.getItem("user"));
    console.log(this.userData);
    this.updateForm = this.fb.group({
      Name : [
        this.userData.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(320), 
        ]),
      ],
      Email: [
        this.userData.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      Password: [ // A senha por se tratar de um hash, se for diferente de alterar_senha, será alterada
        "alterar_senha",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      CPF : [
        this.userData.cpf,
        Validators.compose([
          Validators.required,
          Validators.maxLength(14), 
        ]),
      ],
      CEP : [
        this.userData.cep,
        Validators.compose([
          Validators.maxLength(20), 
        ]),
      ],
      City : [
        this.userData.city,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Complement : [
        this.userData.complement,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Country : [
        this.userData.country,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Neighborhood : [
        this.userData.neighborhood,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      State : [
        this.userData.state,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Street : [
        this.userData.street,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Number : [
        this.userData.number,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ],
      Phone : [
        this.userData.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150), 
        ]),
      ]
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

  submit(){
    try{

        this.submited = true;
        let user = new UserModel();
        user = this.updateForm.value;
        user.id = this.userData.id;
        user.Type = "user";
        user.CPF = user.CPF.toString();
        user.Phone = user.Phone.toString();

        if(this.updateForm.status == "INVALID"){
          this.openError("Favor preencher todos os campos obrigatórios!");
        }else{
          this.UserService.updateUser(user).subscribe(data =>{
            if(data.valid){
              Swal.fire({
                'icon':'success',
                title: 'Sucesso!',
                text: 'Usuário atualizado!'
              });
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Erro ao atualizar o cadastro do usuário!',
                text:  data.message
              });
            }
          });
        }

    }
    catch(ex){
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar o cadastro do usuário!',
        text: 'Error: ' + ex
      });
    }
  }
}
