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
import { HasRoleDirective } from './_directives/hasRole.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogueComponent } from './ConfirmDialogue/ConfirmDialogue.component';
import { EditPasswordComponent } from './EditPassword/EditPassword.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EditResolver } from './_resolvers/EditResolver';
import { BranchDetailsResolver } from './_resolvers/BranchDetailsResolver';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { DriverDetailsShowComponent } from './DriverDetailsShow/DriverDetailsShow.component';
import { DriverDetailsResolver } from './_resolvers/DriverDetailsResolver';
import { LicenseComponentComponent } from './LicenseComponent/LicenseComponent.component';
import { DriverDetailsEditComponent } from './DriverDetailsShow/DriverDetailsEdit/DriverDetailsEdit.component';
import { SpinnerComponent } from './Spinner/Spinner.component';
import { SpinnerOverlayComponent } from './SpinnerOverlay/SpinnerOverlay.component';
import { ReportsComponent } from './Reports/Reports.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

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
      ForgotPasswordComponent,
      HasRoleDirective,
      ConfirmDialogueComponent,
      EditPasswordComponent,
      DriverDetailsShowComponent,
      LicenseComponentComponent,
      DriverDetailsEditComponent,
      SpinnerComponent,
      SpinnerOverlayComponent,
      ReportsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains : ['localhost:5000'],
          disallowedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [AuthGuard,EditResolver,UserService,AuthService,BranchDetailsResolver,DriverDetailsResolver],
  bootstrap: [AppComponent],
  entryComponents : [ConfirmDialogueComponent, LicenseComponentComponent]
})
export class AppModule { }
