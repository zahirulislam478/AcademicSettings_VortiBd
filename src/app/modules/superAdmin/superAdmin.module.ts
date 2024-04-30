import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from "@angular/material/tooltip";
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from "app/shared/shared.module";
import { CircularSettingComponent } from './circularSetting/circular-setting-list/circular-setting-list.component';
import { SuperAdminService } from './superAdmin.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CircularSchoolModalComponent } from './circular-modal/circular-modal-school/circular-modal-school.component';
import { CircularCollegeModalComponent } from './circular-modal/circular-modal-college/circular-modal-college.component';
import { DATE_FORMATS } from './superAdmin.data';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CircularSettingDashboardComponent } from './circularSetting/circular-setting-dashboard/circular-setting-dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { CircularModalSchoolClassSetupComponent } from './circular-modal/circular-modal-school-class-setup/circular-modal-school-class-setup.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from 'app/material.module';
import { CircularModalCollegeClassSetupComponent } from './circular-modal/circular-modal-college-class-setup/circular-modal-college-class-setup.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ConfigureDownloadsModalComponent } from './circular-modal/configure-downloads-modal/configure-downloads-modal.component';
import { RollStartModalComponent } from './circular-modal/roll-start-modal/roll-start-modal.component';
import { ConfigureExamCodesModalComponent } from './circular-modal/exam-codes-modal/exam-codes-modal.component';

const superAdminRoutes: Route[] = [
  {
    path: "",
    component: CircularSettingComponent,
  },
  {
    path: 'Create',
    component: CircularSettingDashboardComponent
  }
];

@NgModule({
  declarations: [
    CircularSettingComponent,
    CircularSchoolModalComponent,
    CircularCollegeModalComponent,
    CircularSettingDashboardComponent,
    CircularModalSchoolClassSetupComponent,
    CircularModalCollegeClassSetupComponent,
    ConfigureDownloadsModalComponent,
    ConfigureExamCodesModalComponent,
    RollStartModalComponent,
  ],
  imports: [
    RouterModule.forChild(superAdminRoutes),
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
    MatMenuModule,
    CommonModule,
    MatSnackBarModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatChipsModule,
    HttpClientModule,
    MaterialExampleModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    CircularSettingComponent,
    SuperAdminService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class SuperAdminModule
{
}
