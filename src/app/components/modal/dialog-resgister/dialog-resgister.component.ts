import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AddPlanInput } from "src/app/models/Plan/inputs/AddPlanInput";
import { UpdatePlanInput } from "src/app/models/Plan/inputs/UpdatePlanInput";
import { PlanModel } from "src/app/models/Plan/PlanModel";
import { PlanService } from "src/app/services/plan/plan.service";
import Swal from "sweetalert2";

export interface DialogData {
  plan: PlanModel;
}

@Component({
  selector: "app-dialog-resgister",
  templateUrl: "./dialog-resgister.component.html",
  styleUrls: ["./dialog-resgister.component.css"],
})
export class DialogResgisterComponent implements OnInit {
  descriptionList: any = ['MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'];
  statusList: any = ['Ativo', 'Desativado'];

  registerForm: FormGroup;
  error = {
    show: false,
    message: "",
  };

  submited = false;
  formActionButtonText: String;
  priceValue;
  valueSelect: String;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb?: FormBuilder,
    public PlanService?: PlanService,
    private route?: ActivatedRoute,
    private router?: Router,
    public dialog?: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.error = {
      show: false,
      message: "",
    };

    this.registerForm = this.fb.group({
      Name: [
        this.data.plan.name == null ? "" : this.data.plan.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      Description: [
        this.data.plan.description == null ? "" : this.data.plan.description,
        Validators.compose([Validators.maxLength(500)]),
      ],
      Installments: [
        this.data.plan.installments == null ? "" : this.data.plan.installments,
        Validators.compose([Validators.required]),
      ],
      Status: [
        this.data.plan.status == null ? "" : this.data.plan.status,
      ],
    });

    if (this.data.plan.id != null) {
      this.calculatePriceValue(this.data.plan.installments, this.data.plan.description);
      this.formActionButtonText = "Atualizar";
    } else {
      this.formActionButtonText = "Cadastrar";
    }
  }

  openError(message: string) {
    this.error.show = true;
    this.error.message = message;
  }

  closeError() {
    this.error.show = false;
    this.error.message = "";
  }

  fillPriceField() {
    let data = this.registerForm.value;
    this.calculatePriceValue(data.Installments, data.Description);
  }

  calculatePriceValue(installmentsValue, period: String) {
    switch (period) {
      case "MENSAL":
        this.valueSelect = (installmentsValue * 1).toString();
        break;
      case "TRIMESTRAL":
        this.valueSelect = (installmentsValue * 3).toString();
        break;
      case "SEMESTRAL":
        this.valueSelect = (installmentsValue  * 6).toString();
        break;
      case "ANUAL":
        this.valueSelect = (installmentsValue * 12).toString();
        break;
      default:
        this.valueSelect = "";
    }
  }


  submit() {
    this.submited = true;

    if (this.registerForm.status == "INVALID") {
      this.openError("Favor preencher todos os campos obrigatórios!");
    } else {
      if (this.data.plan.id == null) {
        let planData = new AddPlanInput();
        planData = this.registerForm.value;

        this.addPlan(planData);
      } else {
        let planData = new UpdatePlanInput();
        planData = this.registerForm.value;

        this.updatePlan(planData);
      }
    }
  }

  addPlan(plan: AddPlanInput) {
    try {
      this.PlanService.addPlan(plan).subscribe((data) => {
        if (data.valid) {
          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Plano cadastrado com sucesso!",
          });
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(["/admin/plan"]));
          this.dialog.ngOnDestroy;
        } else {
          Swal.fire({
            icon: "error",
            title: "Falha ao cadastrar o plano!",
            text: data.message,
          });
        }
      });
      this.router.navigate(["/admin/plan"]);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar o plano!",
        text: "Error: " + e,
      });
    }
  }

  updatePlan(plan: UpdatePlanInput) {
    try {
      this.PlanService.updatePlan(this.data.plan.id, plan).subscribe((data) => {
        if (data.valid) {
          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Plano atualizado com sucesso!",
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
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar o plano!",
        text: "Error: " + e,
      });
    }
  }
}
