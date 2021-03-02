import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { UsersComponent } from './views/admin/users/users.component';

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { PlanComponent } from './views/admin/plan/plan.component';

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { ForgotPasswordComponent } from './views/auth/forgot-password/forgot-password.component';
import { RecoveryPasswordComponent } from './views/auth/recovery-password/recovery-password.component';

//user views
import { AccountComponent } from './views/user/account/account.component';
import { UserPlanComponent } from './views/user/user-plan/user-plan.component';
import { MaterialComponent } from './views/user/material/list/material.component';
import { RegisterComponent as MaterialRegister } from './views/user/material/register/register.component';
import { ProviderComponent } from './views/user/provider/list/provider.component';
import { ProjectsComponent } from './views/user/projects/list/projects.component';
import { ProjectsDetailsComponent } from './views/user/projects/register/projects-details.component';
import { RegisterComponent as ProviderRegister } from './views/user/provider/register/register.component';
import { TutorialComponent } from './views/admin/tutorial/tutorial.component';
import { UserAccessComponent } from './views/admin/user-access/user-access.component';
import { CustomersComponent } from './views/user/customers/list/customers.component';
import { RegisterComponent as CostumerRegister } from './views/user/customers/register/register.component';
import { BudgetComponent } from './views/user/budget/budget.component';
// components for views and layouts
import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { DialogResgisterComponent } from './components/modal/dialog-resgister/dialog-resgister.component';

//Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AccountComponent,
    RecoveryPasswordComponent,
    AccountComponent,
    PlanComponent,
    DialogResgisterComponent,
    UsersComponent,
    MaterialComponent,
    ProviderComponent,
    UserPlanComponent,
    ProjectsComponent,
    ProjectsDetailsComponent,
    MaterialRegister,
    ProviderRegister,
    TutorialComponent,
    UserAccessComponent,
    CustomersComponent,
    BudgetComponent,
    CostumerRegister
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatInputModule,
      MatIconModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  entryComponents:[DialogResgisterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
