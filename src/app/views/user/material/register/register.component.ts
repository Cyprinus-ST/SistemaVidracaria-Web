import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModel } from 'src/app/models/Material/MaterialModel';
import { MaterialService } from 'src/app/services/user/material.service';
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
  material : MaterialModel;
  error = {
    show : false,
    message: ""
  };

  constructor(    
    public activedRoute: ActivatedRoute,
    public router : Router,
    private fb : FormBuilder,
    public MaterialService : MaterialService
    ) { }

  ngOnInit(): void {

    this.initForm();
    this.activedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.backRoute = params['backRoute'];
      this.material = JSON.parse(params['material']);
    });

    this.submited = false;
    const user  = JSON.parse(window.localStorage.getItem('user'));
    this.idUser = user.id;

    if(this.type == 'Editar'){
      this.populaForm()
    }
  }

  populaForm(){
    this.formGroup.controls.name.setValue(this.material.name);
    this.formGroup.controls.amount.setValue(this.material.amount);
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
      amount : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
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

  goBack(){
    this.router.navigate([this.backRoute]);
  }

  submit(){
    this.submited = true;

    try{
      
      let material = new MaterialModel();
      material = this.formGroup.value;

      if(this.type == 'Cadastrar'){

        material.idUser = this.idUser;

        this.MaterialService.AddMaterial(material).subscribe(data =>{
          if(data.valid){
            Swal.fire(
              'Sucesso!',
              'Material salvo!',
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
            title: 'Erro ao salvar o material!',
            text: 'Error: ' + ex.error
          });
        });
      }
      else{
        material.id = this.material.id;
        material.idUser = this.material.idUser;
        
        this.MaterialService.UpdateMaterial(material).subscribe(data =>{
          if(data.valid){
            Swal.fire(
              'Sucesso!',
              'Material salvo!',
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
            title: 'Erro ao salvar o material!',
            text: 'Error: ' + ex.error
          });
        });
      }
    }
    catch(ex){
      Swal.fire({
        icon: 'error',
        title: 'Erro ao salvar o material!',
        text: 'Error: ' + ex
      });
    }
  }
}
