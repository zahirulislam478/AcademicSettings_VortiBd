import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MY_FORMATS } from '../admin/admin-shared/admin.shared.data';
import { AdminSharedModule } from '../admin/admin-shared/admin.shared.module';
import { JobportalUiConfigComponent } from './jobportal-ui-config.component';
import { JobPortalUiConfigService } from './jobportal-ui-config.service';

const jobportalRoutes: Route[] = [
  {
    path: '',
    component: JobportalUiConfigComponent,
  },
];

@NgModule({
  declarations: [JobportalUiConfigComponent],
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

    MatSnackBarModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSlideToggleModule,

    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    JobPortalUiConfigService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class JobPortalUiConfigModule {}
