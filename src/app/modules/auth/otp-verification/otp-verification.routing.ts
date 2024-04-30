import { Route } from '@angular/router';
import { AuthOtpVerificationComponent } from './otp-verification.component';

export const authOtpVerificationRoutes: Route[] = [
    {
        path     : '',
        component: AuthOtpVerificationComponent
    },
    // {
    //     path: ':mobileNo',
    //     component: AuthOtpVerificationComponent,
    // }
];
