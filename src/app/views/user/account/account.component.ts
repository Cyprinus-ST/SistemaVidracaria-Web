import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user/user.service';
import { ViacepService } from 'src/app/services/utils/viacep.service';
import { FormatService } from '../../../services/utils/format.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})

//Implementar pesquisa via cep aqui tbm - Vilas
export class AccountComponent implements OnInit{

  updateForm : FormGroup;
  userData;
  submited;
  showModal : boolean;
  pathAvatar;
  type : string;
  idUser;
  fileUrl : string;
  error = {
    show : false,
    message: ""
  };

  constructor(
    private fb : FormBuilder,
    public UserService : UserService,
    public ViaCepService : ViacepService,
    public route : Router,
    public activedRoute: ActivatedRoute,
    public FormatService : FormatService
  ) { 

  }

  ngOnInit() {
    const user =JSON.parse(localStorage.getItem('user')); 
    this.fileUrl = "../../../../assets/files/";

    this.activedRoute.queryParams.subscribe(params => {
      this.idUser = params['user'];
    });

    this.type = user.type;

    if(this.idUser == user.id)
      this.type = 'user';

    this.initForm();   

  }

  populaForm(){

    try{
        this.UserService.getById(this.idUser).subscribe(data =>{
          console.log(data)
          this.userData = data;

          if(data == null){
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Ocorreu um erro ao buscar os dados do usuário!'
            });
          }
           

          if(this.userData.pathAvatar == null || this.userData.pathAvatar == "")
            this.pathAvatar = "../../../../assets/img/user.png";
          else{
            this.pathAvatar = this.userData.pathAvatar; 
          }
    
          this.updateForm.controls.Email.setValue(this.userData.email);
          this.updateForm.controls.Name.setValue(this.userData.name);
          this.updateForm.controls.CPF.setValue(this.userData.cpf);
          this.updateForm.controls.CEP.setValue(this.userData.cep);
          this.updateForm.controls.City.setValue(this.userData.city);
          this.updateForm.controls.Complement.setValue(this.userData.complement);
          this.updateForm.controls.Country.setValue(this.userData.country);
          this.updateForm.controls.Neighborhood.setValue(this.userData.neighborhood);
          this.updateForm.controls.State.setValue(this.userData.state);
          this.updateForm.controls.Street.setValue(this.userData.street);
          this.updateForm.controls.Number.setValue(this.userData.number);
          this.updateForm.controls.Phone.setValue(this.userData.phone);

        });
      }
      catch(ex){
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar o cadastro do usuário!',
          text: 'Error: ' + ex
        });
      }
  }

  initForm(){

    this.updateForm = this.fb.group({
      Email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      Name : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
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
      ],
      PathAvatarFile: [
        ''
      ],
      FileSource:['']
    });
    this.populaForm();
  }

  closeError(){
    this.error.show = false;
    this.error.message= "";
  }

  openError(message : string){
    this.error.show = true;
    this.error.message= message;
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.patchValue({
        FileSource: file
      });
    }
  }

  submit(){
    
    try{

        this.submited = true;
        let user = new UserModel();
        user = this.updateForm.value;
        user.id = this.userData.id;
        user.Type =this.userData.type;
        user.CPF = user.CPF.toString();
        user.Phone = user.Phone.toString();

        const file = this.updateForm.get('FileSource').value;

        if(this.updateForm.status == "INVALID"){
          this.openError("Favor preencher todos os campos obrigatórios!");
        }else{

          if(file != "" && file != null){
          
            const formData = new FormData();
            
            if(!this.validType(file))
              throw "A imagem deve ser no formato .PNG, .JPG ou .JPEG!";

            formData.append('file',file);
            formData.append('idUser',user.id);

            this.UserService.updateAvatarFile(formData).subscribe(data =>{
              if(data.valid){
                user.PathAvatar = data.path;
                this.pathAvatar = user.PathAvatar;
                this.sendUpdate(user);
                window.location.reload();
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Erro ao realizar o upload da imagem de perfil!',
                  text:  data.message
                });
              }
            });
          }
          else{
            user.PathAvatar = this.pathAvatar;
            this.sendUpdate(user)
          }
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

  sendUpdate(user){
    this.UserService.updateUser(user).subscribe(data =>{
      if(data.valid){
        this.pathAvatar = user.PathAvatar;
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

  validType(file): Boolean{

    const type = file.type;
    if(type == "image/jpeg" || type == "image/png" || type == "image/jpg"){
      return true;
    }
    else{
      return false;
    }
  }

  getUrl(){
    if(this.pathAvatar == null || this.pathAvatar == "")
      return this.fileUrl + "/Default/User.png";
    else
      return this.fileUrl + this.pathAvatar;
  }

   getUser = async() => {
    this.UserService.getById(this.idUser).toPromise().then
  }

  formatDate(date){
    return this.FormatService.formatDate(date);
  }
}

