import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AddAccountAdminComponent } from 'src/app/AddAccountAdmin/AddAccountAdmin.component';
import { BranchDetailsShowComponent } from 'src/app/BranchDetailsShow/BranchDetailsShow.component';
import { AddBranchAdminComponent } from 'src/app/AddBranchAdmin/AddBranchAdmin.component';
import { ExpireCardDetailsComponent } from 'src/app/ExpireCardDetails/ExpireCardDetails.component';
import { AddDriverDetailsComponent } from 'src/app/AddDriverDetails/AddDriverDetails.component';
import { EditProfileComponent } from 'src/app/EditProfile/EditProfile.component';
import { LoginComponent } from 'src/app/login/login.component';

export const appRoutes : Routes = [
    {path : '' , component  : LoginComponent},
    {path : 'login' , component  : LoginComponent},

    {
        path : '',
        children : [

            {path : 'dashboard' , component : DashboardComponent},
            {path : 'addaccount' , component : AddAccountAdminComponent},
            {path : 'branchdetails' , component : BranchDetailsShowComponent},
            {path : 'addbranchdetails' , component : AddBranchAdminComponent},
            {path : 'adddriverdetails' , component : AddDriverDetailsComponent},
            {path : 'expirecards' , component : ExpireCardDetailsComponent},
            {path : 'editprofile' , component : EditProfileComponent}
            
        ]

    },
    {path : '**' , redirectTo : 'login' , pathMatch: 'full'}
    
];

