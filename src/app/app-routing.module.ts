import { NgModule } from "@angular/core";
import { Routes, RouterModule,CanActivate } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

//#region user views
import { AccountComponent } from "./views/user/account/account.component";
////#endregion

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

//auth guard
import { AuthGuardService as AuthGuard } from "./services/utils/auth/auth-guard.service";
import { ForgotPasswordComponent } from "./views/auth/forgot-password/forgot-password.component";


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
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  {
    path:"user",
    component: AdminComponent,
    canActivate : [AuthGuard],
    children:[
      { path: "account", component: AccountComponent }
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
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
