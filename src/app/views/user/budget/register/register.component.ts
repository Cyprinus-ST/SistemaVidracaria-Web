import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetDTO } from 'src/app/models/Budget/BudgetModel';
import { CostumerModel } from 'src/app/models/Costumer/CostumerModel';
import { FilterProject, ProjectModel, ProjectTypeModel } from 'src/app/models/Project/ProjectModel';
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
  listProjectsTypes : ProjectTypeModel[];
  idUser: string;
  urlImage: string;
  openTab = 1;
  hasCostumerSelected = false;
  formBudget : FormGroup;
  filterForm : FormGroup;
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
    this.getAllProjectType();
    this.initForm();

  }

  initForm() : void {

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

    this.filterForm = this.fb.group({
      idProject: [
        ""
      ],
      numberGlass:[
        null
      ],
      projectType: [
        null
      ]
    });
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

  getAllProjects(){
    let filter = new FilterProject();
    filter = this.filterForm.value;
    filter.maxResults = 100;
    filter.idUser = this.idUser;
    if(filter.numberGlass === null)
      filter.numberGlass = 0;

      try{
        this.ProjectService.PostFilterProject(filter).subscribe(response =>{
          if(response.data.length > 0){
            this.listProjects = response.data;
            console.log(this.listProjects)
          }
          else{
            this.AlertService.showError("Não foram encontrados registros com os parâmetros passados!")
          }
  
        }, ex =>{
          if(ex.status === 401){
            this.AlertService.errorAutenticacao();
          }
          this.AlertService.showError(ex.error);
        });
    }
    catch(ex){

      if(ex == null)
        ex.error = "Ocorreu um erro ao buscar os projetos cadastrados, tente novamente mais tarde!";

      this.AlertService.showError(ex.error);
    }
  }

  getAllProjectType(): void{
    this.ProjectService.GetProjectType().subscribe(data =>{
      if(data.valid)
        this.listProjectsTypes = data.result;
    });
  }


  //#endregion

  //#region Métodos para avançar
  
  goToProject(){
    if(this.EnsureBudget(this.Budget,2) == false)
      this.AlertService.showError("Favor selecionar um cliente primeiro!");
    else
      this.toggleTabs(2);
  };  
  
  goToInfo(){
    if(this.EnsureBudget(this.Budget,3) == false)
      this.AlertService.showError("Favor selecionar um projeto primeiro!");
    else
      this.toggleTabs(3);
  };

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  };
  
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
      const form = this.formBudget.value;
      if(form.IdCostumer != null || form.IdCostumer != ""){
        this.Budget.Costumer = this.listCostumer.find(e => e.id == form.IdCostumer);
        console.log(this.Budget);
      }
    };

    onChangeProject(){
      const form = this.filterForm.value;
      if(this.EnsureValue(form.idProject)){
        this.Budget.Project = this.listProjects.find(e => e.id == form.idProject);
        this.urlImage = this.Budget.Project.imageUrl;
      }
    }
  //#endregion

  //#region Métodos Verificadores

  EnsureBudget(Budget : BudgetDTO, step: number): boolean{

    if(Budget == undefined || Budget == null)
      return false;
    if(Budget.Costumer == undefined || Budget.Costumer == null)
      return false;

    //Validando para ir para a tela de informação adicional
    if(step == 3){
      if(Budget.Project == undefined || Budget.Project == null)
        return false;
    }
    return true;

  }

  EnsureValue(value : string): boolean{

    if(value != null || value != undefined || value != "")
      return true;
    else
      return false;

  }

  //#endregion


}
