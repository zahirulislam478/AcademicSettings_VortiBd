import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialExampleModule } from 'app/material.module';
import { SharedModule } from 'app/shared/shared.module';

import { AdminSharedModule } from '../admin/admin-shared/admin.shared.module';
import { JobPortalDashboardComponent } from './circular-settings/job-portal-dashboard/job-portal-dashboard.component';
import { JobPortalDetailsComponent } from './circular-settings/job-portal-details/job-portal-details.component';
import { JobPortalComponent } from './job-portal.component';
import { JobCircularSetupModalComponent } from './modal/circular-setup/job-circular-setup/job-circular-setup.component';
import { JobCircularDetailsSetupComponent } from './modal/circular-setup/job-circular-details-setup/job-circular-details-setup.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ConfigureDownloadComponent } from './modal/configure-download/configure-download.component';
import { QualificationSetupComponent } from './modal/qualification-setup/qualification-setup.component';

const jobportalRoutes: Route[] = [
  {
    path: '',
    component: JobPortalDashboardComponent,
  },
  {
    path: 'create',
    component: JobPortalDetailsComponent,
  },
];

@NgModule({
  declarations: [
    JobPortalComponent,
    JobCircularSetupModalComponent,
    JobPortalDashboardComponent,
    JobPortalDetailsComponent,
    JobCircularDetailsSetupComponent,
    ConfigureDownloadComponent,
    QualificationSetupComponent,
  ],
  imports: [
    RouterModule.forChild(jobportalRoutes),
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
    CKEditorModule,
    MatPaginatorModule,
    MaterialExampleModule,

    MatSnackBarModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
})
export class JobPortalModule {}
