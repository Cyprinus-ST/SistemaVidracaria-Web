import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormatService } from '../../../../services/utils/format.service';
import { CostumerService } from  '../../../../services/costumer/costumer.service';
import { AlertsService } from 'src/app/services/utils/alerts.service';
import { CostumerModel } from '../../../../models/Costumer/CostumerModel';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  listCostumer: CostumerModel[];
  showModal = false;
  idUser: string;

  constructor(
    public FormatService: FormatService,
    public CostumerService : CostumerService,
    public AlertService : AlertsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user')); 
    this.idUser = user.id;
    this.getAll(user.id);

  }

  getAll(idUser : string){
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
  }
 
  dataAtualFormatada(date){
    if(date != null)
       return this.FormatService.formatDate(date);
     else
      return "-";
 }

 goToRegister( type : string, costumer: CostumerModel){
    this.router.navigate(['user/customers/register'],{
      queryParams:{
        backRoute: 'user/customers',
        type : type,
        material : JSON.stringify(costumer)
      }
    });
  } 


deleteCostumer(idCostumer: string){
    this.CostumerService.DeleteCostumer(idCostumer).subscribe(data =>{
        this.AlertService.showSucess(data.message);
        this.getAll(this.idUser);
    },ex => {
      this.AlertService.showError(ex.error);
    });
  }
}
