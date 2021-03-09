import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CostumerModel } from 'src/app/models/Costumer/CostumerModel';
import { CostumerService } from 'src/app/services/costumer/costumer.service';
import { AlertsService } from 'src/app/services/utils/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  type: string;
  backRoute: string;
  formGroup : FormGroup;
  submited : boolean;
  idUser :  string;
  Costumer : any;

  constructor(
    public activedRoute : ActivatedRoute,
    public router : Router,
    public fb : FormBuilder,
    public CostumerService : CostumerService,
    public AlertService : AlertsService,
  ) { }

  ngOnInit(): void {
    
    this.initForm();
    this.activedRoute.queryParams.subscribe( params =>{
      this.type = params['type'];
      this.backRoute = params['backRoute'];
      this.Costumer = JSON.parse(params['costumer']);
    });

    this.submited = false;
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.idUser = user.id;
    
    if(this.type == 'Editar'){
      this.popularForm();
    }
  }

  popularForm() : void{
    this.formGroup.controls.Name.setValue(this.Costumer.name);
    this.formGroup.controls.Email.setValue(this.Costumer.email);
    this.formGroup.controls.Phone.setValue(this.Costumer.phone);
  }

  initForm() : void{

    this.formGroup = this.fb.group({
      Name : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      ],
      Email :[""],
      Phone :[""]
    });

  }

  submit() : void{
    try{

      let costumer = new CostumerModel();
      costumer = this.formGroup.value;
      costumer.idUser = this.idUser;

      if(costumer.Name == null || costumer.Name == "" || costumer.Name == undefined){
        throw("O campo nome não pode ser vazio!");
      }
      if(this.type == 'Cadastrar'){

        this.CostumerService.AddCostumer(costumer).subscribe(data =>{
          this.AlertService.showSucess(data.message);
          this.goBack();
        },ex =>{
          this.AlertService.showError(ex.error);
        });
      }
      else{
        costumer.id = this.Costumer.id;
        this.CostumerService.UpdateCostumer(costumer).subscribe(data =>{
          this.AlertService.showSucess(data.message);
          this.goBack();
        },ex =>{
          this.AlertService.showError(ex.error);
        });
      }
    }
    catch(ex){
      let msg = "";
      if(ex.error == null || ex.error == "")
        msg = ex;
      else
        msg = ex.error;
      this.AlertService.showError(msg);
    }
  }

  goBack(){
    this.router.navigate([this.backRoute]);
  }

}
