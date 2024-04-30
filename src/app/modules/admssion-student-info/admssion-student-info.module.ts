import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from "@angular/material/tooltip";
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from "app/shared/shared.module";
import { MY_FORMATS } from '../admin/admin-shared/admin.shared.data';
import { AdminSharedModule } from '../admin/admin-shared/admin.shared.module';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DashboardService } from '../admin/dashboard/dashboard.service';
import { AdmssionStudentInfoService } from './admssion-student-info.service';
import { AdmssionStudentInfoComponent } from './admssion-student-info.component';
import { SuperAdminService } from '../superAdmin/superAdmin.service';


const dashboardRoutes: Route[] = [
  {
    path: "",
    component: AdmssionStudentInfoComponent,
  }
];

@NgModule({
  declarations: [
    AdmssionStudentInfoComponent,

  ],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDividerModule,
    AdminSharedModule,
    MatMenuModule,
    MatListModule,
    CommonModule,

    MatSnackBarModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSlideToggleModule,




    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AdmssionStudentInfoService,
    DashboardService,
    SuperAdminService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // {
    //     provide: MAT_DATE_FORMATS,
    //     useValue: {
    //         parse: {
    //             dateInput: moment.ISO_8601
    //         },
    //         display: {
    //             dateInput: 'LL',
    //             monthYearLabel: 'MMM YYYY',
    //             dateA11yLabel: 'LL',
    //             monthYearA11yLabel: 'MMMM YYYY'
    //         }
    //     }
    // },

  ]
})
export class AdmssionStudentInfoModule
{
}
