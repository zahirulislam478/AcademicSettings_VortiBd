import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from "@angular/material/stepper";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { MY_FORMATS } from "./admin.shared.data";
import { AdminSharedService } from "./admin.shared.service";
import { AdminPhotoUploadComponent } from "./photo-upload/photo-upload.component";


@NgModule({
  declarations: [AdminPhotoUploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
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
    MatDividerModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [
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

    AdminSharedService,
  ],
  exports: [AdminPhotoUploadComponent],
})
export class AdminSharedModule { }
