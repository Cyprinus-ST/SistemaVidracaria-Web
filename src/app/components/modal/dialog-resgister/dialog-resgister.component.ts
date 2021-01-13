import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPlanInput } from 'src/app/models/Plan/inputs/AddPlanInput';
import { PlanService } from 'src/app/services/plan/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-resgister',
  templateUrl: './dialog-resgister.component.html',
  styleUrls: ['./dialog-resgister.component.css']
})
export class DialogResgisterComponent implements OnInit {

  registerForm : FormGroup;
  error = {
    show: false,
    message : ""
  };

  submited = false;

  constructor(
    private fb : FormBuilder,
    public PlanService : PlanService,
    private route : ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.error = {
      show: false,
      message: ""
    }

    this.registerForm = this.fb.group({
      Name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      Description: [
        "",
        Validators.compose([
          Validators.maxLength(500), 
        ]),
      ],
      Price: [
        "",
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  openError(message : string){
    this.error.show = true;
    this.error.message= message;
  }

  closeError(){
    this.error.show = false;
    this.error.message= "";
  }

  submit(){
    try{

        this.submited = true;
        let plan = new AddPlanInput();
        plan = this.registerForm.value;

        if(this.registerForm.status == "INVALID"){
          this.openError("Favor preencher todos os campos obrigatórios!");
        }else{
          this.PlanService.addPlan(plan).subscribe(data =>{
            if(data.valid){
              Swal.fire({
                'icon':'success',
                title: 'Sucesso!',
                text: 'Plano cadastrado com sucesso!'
              });
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Falha ao cadastrar o plano!',
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
