import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { UsersComponent } from  "./views/admin/users/users.component";

//#region user views
import { AccountComponent } from "./views/user/account/account.component";
import { PlanComponent } from './views/admin/plan/plan.component';
import { MaterialComponent } from "./views/user/material/material.component";
import { ProviderComponent } from './views/user/provider/provider.component';
import { ProjectsComponent } from './views/user/projects/projects.component';
import { ProjectsDetailsComponent } from './views/user/projects-details/projects-details.component';
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
      { path: "provider", component: ProviderComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "projects-details", component: ProjectsDetailsComponent}
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
