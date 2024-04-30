import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';

import { LandingSharedModule } from '../landing-shared/landing.shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LandingAdmitcardComponent } from './admitcard.component';
import { landingAdmitcardRoutes } from './admitcard.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        LandingAdmitcardComponent,

    ],
    imports: [
        RouterModule.forChild(landingAdmitcardRoutes),
        LandingSharedModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,

    ],
    exports: [
        LandingAdmitcardComponent
    ],
})
export class LandingAdmitcardModule
{
}
