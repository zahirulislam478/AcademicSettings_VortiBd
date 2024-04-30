import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthOtpVerificationComponent } from './otp-verification.component';
import { authOtpVerificationRoutes } from './otp-verification.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AuthOtpVerificationComponent
    ],
    imports     : [
        RouterModule.forChild(authOtpVerificationRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class AuthOtpVerificationModule
{
}
