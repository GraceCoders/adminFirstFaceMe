import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { EditUserComponent } from '../../edit-user/edit-user.component';
import { UsersListComponent } from '../../users-list/users-list.component';
import { SubscriptionComponent } from '../../subscription/subscription.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { ReportsComponent } from '../../reports/reports.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterestsComponent } from '../../interests/interests.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    AmazingTimePickerModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CKEditorModule,
    GooglePlaceModule,
    NgbModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    ResetPasswordComponent,
    EditUserComponent,
    UsersListComponent,
    ReportsComponent,
    SubscriptionComponent,
    InterestsComponent
  ]
})

export class AdminLayoutModule {}
