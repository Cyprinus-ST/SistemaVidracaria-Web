import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderModel } from 'src/app/models/Provider/ProviderModel';
import { ProviderService } from 'src/app/services/user/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  type: string;
  backRoute : string; 
  formGroup: FormGroup;
  submited : boolean;
  idUser: string;
  provider : ProviderModel;
  error = {
    show : false,
    message: ""
  };
  constructor(
    public activedRoute: ActivatedRoute,
    public router : Router,
    private fb : FormBuilder,
    public ProviderService : ProviderService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.backRoute = params['backRoute'];
      this.provider = JSON.parse(params['provider']);
    });

    this.submited = false;
    const user  = JSON.parse(window.localStorage.getItem('user'));
    this.idUser = user.id;

    if(this.type == 'Editar'){
      this.populaForm()
    }
  }

  populaForm(){
    this.formGroup.controls.name.setValue(this.provider.name);
    this.formGroup.controls.description.setValue(this.provider.description);
    this.formGroup.controls.email.setValue(this.provider.email);
    this.formGroup.controls.phone.setValue(this.provider.phone);
  }

  initForm(){

    this.formGroup = this.fb.group({
      name : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      ],
      email : [
        "",
        Validators.compose([
          Validators.email,
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
      ],
      phone : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      ],
      description : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
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

  goBack(){
    this.router.navigate([this.backRoute]);
  }

  submit(){
    console.log(this.formGroup);
    this.submited = true; 
    
    try{

      let provider = new ProviderModel();
      provider = this.formGroup.value;

      if(this.formGroup.valid){

        if(this.type == 'Cadastrar'){
          
          provider.idUser = this.idUser;
          this.ProviderService.AddProvider(provider).subscribe(data =>{
            if(data.valid){
              Swal.fire(
                'Sucesso!',
                'Fornecedor salvo!',
                'success'
                )
                this.goBack();
              }
              else{
                throw data.message;
              }
            },ex => {
              Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar o fornecedor!',
                text: 'Error: ' + ex.error
              });
        });
      }
      else{
        
        provider.id = this.provider.id;
        provider.idUser = this.provider.idUser;
        this.ProviderService.UpdateProvider(provider).subscribe(data =>{
          if(data.valid){
            Swal.fire(
              'Sucesso!',
              'Fornecedor salvo!',
              'success'
              )
              this.goBack();
            }
            else{
              throw data.message;
            }
          },ex => {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao salvar o fornecedor!',
              text: 'Error: ' + ex.error
            });
          });
        }
      }
    }
    catch(ex){
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Ocorreu um erro ao salvar o fornecedor! Tente novamente mais tarde.' 
      });
    }
  }
}
