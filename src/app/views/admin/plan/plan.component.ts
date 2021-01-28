import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogResgisterComponent } from './../../../components/modal/dialog-resgister/dialog-resgister.component';
import { PlanModel } from 'src/app/models/Plan/PlanModel';
import { PlanService } from 'src/app/services/plan/plan.service';
import { MaterialModalComponent } from 'src/app/components/modal/material-modal/material-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  showModal = false;
  registerForm : FormGroup;
  error = {
    show: false,
    message : ""
  };

  plans : Array<PlanModel>;
  selectedPlan : PlanModel = new PlanModel();

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
    this.listPlans();
  }

  initForm() {
    this.error = {
      show: false,
      message: ""
    }
  }
  
  openDialog() {
    var dialogRef = this.dialog.open(DialogResgisterComponent, {data: {plan: new PlanModel()}, autoFocus: true, restoreFocus : false, position: { top: '-25%', left: '28%'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  listPlans() {
    this.PlanService.listPlan().subscribe(element => {
      this.plans = element;
    });
  }

  openUpdatePlanDialog(plan: PlanModel) {
    this.selectedPlan = plan;
    var dialogRef = this.dialog.open(DialogResgisterComponent, {data: {plan: plan}, autoFocus: true, restoreFocus : false, position: { top: '-25%', left: '28%'}});
  }

  deletePlan(plan: PlanModel) {
    this.PlanService.deletePlan(plan.id).subscribe((data) => {
      if (data.valid) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Plano excluído com sucesso!",
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(["/admin/plan"]));
        this.dialog.ngOnDestroy;
      } else {
        Swal.fire({
          icon: "error",
          title: "Falha ao atualizar o plano!",
          text: data.message,
        });
      }
    });
  }

}
