import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AddAccountAdminComponent } from 'src/app/AddAccountAdmin/AddAccountAdmin.component';
import { BranchDetailsShowComponent } from 'src/app/BranchDetailsShow/BranchDetailsShow.component';
import { AddBranchAdminComponent } from 'src/app/AddBranchAdmin/AddBranchAdmin.component';
import { ExpireCardDetailsComponent } from 'src/app/ExpireCardDetails/ExpireCardDetails.component';
import { AddDriverDetailsComponent } from 'src/app/AddDriverDetails/AddDriverDetails.component';
import { EditProfileComponent } from 'src/app/EditProfile/EditProfile.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { NgIf } from '@angular/common';

export const appRoutes : Routes = [

    {path : '', redirectTo : 'login', pathMatch : 'full'},
    {path : 'login' , component : LoginComponent },
    {
        
        path : '',
        runGuardsAndResolvers:"always",
        canActivate : [AuthGuard],
        children : [
            {path : 'dashboard' , component : DashboardComponent},
            {path : 'addaccount' , component : AddAccountAdminComponent , data: {roles: ['AccountAdminCreater']}},
            {path : 'branchdetails' , component : BranchDetailsShowComponent , data: {roles: ['AccountAdminCreater','BranchAdminCreater']}} ,
            {path : 'addbranchdetails' , component : AddBranchAdminComponent ,data: {roles: ['AccountAdminCreater','BranchAdminCreater']}},
            {path : 'adddriverdetails' , component : AddDriverDetailsComponent ,data: {roles: ['AccountAdminCreater','BranchAdminCreater','DriverCreater']}},
            {path : 'expirecards' , component : ExpireCardDetailsComponent},
            {path : 'editprofile' , component : EditProfileComponent}
        ]
    },
    {path : '**' , component : LoginComponent}
    
];

