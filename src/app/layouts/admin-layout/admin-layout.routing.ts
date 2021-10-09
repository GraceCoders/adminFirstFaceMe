import { Routes } from '@angular/router';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { EditUserComponent } from '../../edit-user/edit-user.component';
import { UsersListComponent } from '../../users-list/users-list.component';
import { SubscriptionComponent } from '../../subscription/subscription.component';
import { ReportsComponent } from '../../reports/reports.component';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { InterestsComponent } from '../../interests/interests.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuardService] },
    { path: 'users', component: UsersListComponent, canActivate: [AuthGuardService] },
    { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuardService] },
    { path: 'subscriptions', component: SubscriptionComponent, canActivate: [AuthGuardService] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuardService] },
    { path: 'interests', component: InterestsComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '' }
];


