import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetDTO } from 'src/app/models/Budget/BudgetModel';
import { CostumerModel } from 'src/app/models/Costumer/CostumerModel';
import { ProjectModel } from 'src/app/models/Project/ProjectModel';
import { CostumerService } from 'src/app/services/costumer/costumer.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { AlertsService } from 'src/app/services/utils/alerts.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  listCostumer: CostumerModel[];
  listProjects : ProjectModel[];
  idUser: string;
  openTab = 1;
  hasCostumerSelected = false;
  formBudget : FormGroup;
  Budget : BudgetDTO;
  
  constructor(
    public CostumerService : CostumerService,
    public ProjectService : ProjectService,
    public AlertService : AlertsService,
    private router: Router,
    public fb : FormBuilder,

  ) { }

  ngOnInit(): void {
    this.Budget = new BudgetDTO();
    const user = JSON.parse(localStorage.getItem('user')); 
    this.idUser = user.id;
    this.getAllCostumer(user.id);
    this.initForm();

  }

  initForm() : void {
    console.log("oi");
    this.formBudget = this.fb.group({
      IdCostumer : [
        null
      ],
      Email : [
        ""
      ],
      Phone : [
        ""
      ]
    })
  };
  

  //#region Métodos de listagem
  
  getAllCostumer(idUser : string){
    try{
      this.CostumerService.GetAllCostumer(idUser).subscribe(data=>{
        console.log(data);
        if(data.valid)
          this.listCostumer = data.listCostumers;
      }, ex =>{
        if(ex.status === 401){
          this.AlertService.errorAutenticacao();
        }
        this.AlertService.showError(ex.error);
      });
    }
    catch(ex){
      this.AlertService.showError(ex.error)
    }
  };

  getAllProjects(idUser : string){
    try{

    }
    catch(ex){

      if(ex == null)
        ex.error = "Ocorreu um erro ao buscar os projetos cadastrados, tente novamente mais tarde!";

      this.AlertService.showError(ex.error);
    }
  }

  //#endregion

  //#region Métodos para avançar
  
  goToProject(){
    if(this.EnsureBudget(this.Budget,2) == false)
      this.AlertService.showError("Favor selecionar um cliente primeiro!");
    else
      this.toggleTabs(2);
  };  

  toggleTabs($tabNumber: number){
    
    //Validando se ele já preencheu o campo de usuário
    console.log(this.formBudget)
    this.openTab = $tabNumber;
  };
  
    // Vai para rota de cadastro de cliente
    registerCostumer() : void {
      this.router.navigate(['user/customers/register'],{
        queryParams:{
          backRoute: 'user/budget/register',
          type : "Cadastrar",
          costumer : null
        }
      });
    };
  //#endregion

  //#region  Métodos onChange
    onChangeCostumer(){
      console.log(this.formBudget);
      const form = this.formBudget.value;
      if(form.IdCostumer != null || form.IdCostumer != ""){
        this.Budget.Costumer = this.listCostumer.find(e => e.id == form.IdCostumer);
        console.log(this.Budget);
      }

    };
  //#endregion

  //#region Métodos Verificadores
  EnsureBudget(Budget : BudgetDTO, step: number): boolean{
    
    if(Budget == undefined || Budget == null)
      return false;
    if(Budget.Costumer == undefined || Budget.Costumer == null)
      return false;

    return true;
  }
  //#endregion

}
