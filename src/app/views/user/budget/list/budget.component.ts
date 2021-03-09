import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }  

}
