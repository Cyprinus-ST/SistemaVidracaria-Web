import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { UsersComponent } from  "./views/admin/users/users.component";
import { PlanComponent } from './views/admin/plan/plan.component';

//#region user views
import { AccountComponent } from "./views/user/account/account.component";
import { UserPlanComponent } from './views/user/user-plan/user-plan.component';
import { MaterialComponent } from "./views/user/material/list/material.component";
import { RegisterComponent as RegisterMaterial } from './views/user/material/register/register.component';
import { ProviderComponent } from './views/user/provider/list/provider.component';
import { ProjectsComponent } from './views/user/projects/list/projects.component';
import { ProjectsDetailsComponent } from './views/user/projects/register/projects-details.component';
import { RegisterComponent as RegisterProvider } from './views/user/provider/register/register.component';
import { CustomersComponent } from './views/user/customers/list/customers.component';
import { RegisterComponent as RegisterCustomer} from './views/user/customers/register/register.component';
import { BudgetComponent } from './views/user/budget/list/budget.component';
import { RegisterComponent as RegisterBudget } from './views/user/budget/register/register.component';
////#endregion

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { ForgotPasswordComponent } from "./views/auth/forgot-password/forgot-password.component";
import { RecoveryPasswordComponent } from './views/auth/recovery-password/recovery-password.component';

//auth guard
import { AuthGuardService as AuthGuard } from "./services/utils/auth/auth-guard.service";


//Rotas que precisam de autenticação adicionar o canActivate: [AuthGuard], 
//pois o mesmo valida se o usuário está logo e o tempo de expiração do token - Vilas

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      {path: "users", component: UsersComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "plan", component: PlanComponent },
    ],
  },
  {
    path:"user",
    component: AdminComponent,
    canActivate : [AuthGuard],
    children:[
      { path: "account", component: AccountComponent },
      { path: "material", component: MaterialComponent },
      { path: "plan", component: UserPlanComponent},
      { path: "material/register", component: RegisterMaterial},
      { path: "provider", component: ProviderComponent },
      { path: "provider/register", component: RegisterProvider},
      { path: "projects", component: ProjectsComponent },
      { path: "projects/register", component: ProjectsDetailsComponent},
      { path: "customers", component: CustomersComponent},
      { path: "customers/register", component: RegisterCustomer},
      { path: "budget", component: BudgetComponent},
      { path: "budget/register", component: RegisterBudget },
    ]
  },

  // auth views
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot", component: ForgotPasswordComponent },
      { path: "recoveryPassword", component: RecoveryPasswordComponent},
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
