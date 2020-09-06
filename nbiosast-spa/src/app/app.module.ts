import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AddAccountAdminComponent } from './AddAccountAdmin/AddAccountAdmin.component';
import { AddBranchAdminComponent } from './AddBranchAdmin/AddBranchAdmin.component';
import { AddDriverDetailsComponent } from './AddDriverDetails/AddDriverDetails.component';
import { ExpireCardDetailsComponent } from './ExpireCardDetails/ExpireCardDetails.component';
import { BranchDetailsShowComponent } from './BranchDetailsShow/BranchDetailsShow.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'routes';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [												
    AppComponent,
      DashboardComponent,
      SidebarComponent,
      FooterComponent,
      TopbarComponent,
      AddAccountAdminComponent,
      AddBranchAdminComponent,
      AddDriverDetailsComponent,
      ExpireCardDetailsComponent,
      BranchDetailsShowComponent,
      EditProfileComponent,
      LoginComponent,
      ForgotPasswordComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
