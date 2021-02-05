import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PlanModel } from 'src/app/models/Plan/PlanModel';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-user-plan',
  templateUrl: './user-plan.component.html',
  styleUrls: ['./user-plan.component.css']
})
export class UserPlanComponent implements OnInit {
  plans: Array<PlanModel>;

  error = {
    show: false,
    message: ""
  };

  @ViewChild('divPurchase', { static: false }) d1: ElementRef;

  constructor(
    public PlanService: PlanService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listPlans();
  }

  createScript() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";

    this.renderer.appendChild(this.d1.nativeElement, s);
  }

  ngAfterViewInit() {
    /*//var divPurchase = document.getElementById("divPurchase");    
    var s = document.createElement("script");
    //s.setAttribute("id", "purchasePlan");
    s.type = "text/javascript";
    s.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    this.elementRef.nativeElement.appendChild(s);*/

  }

  initForm() {
    this.error = {
      show: false,
      message: ""
    }
  }

  listPlans() {
    this.PlanService.listPlan().subscribe(element => {
      this.plans = element;
    });
  }

}
