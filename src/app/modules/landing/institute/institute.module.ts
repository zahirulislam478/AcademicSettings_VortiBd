import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';

import { LandingSharedModule } from '../landing-shared/landing.shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LandingInstituteComponent } from './institute.component';
import { landingInstituteRoutes } from './institute.routing';

@NgModule({
    declarations: [
        LandingInstituteComponent,

    ],
    imports: [
        RouterModule.forChild(landingInstituteRoutes),
        LandingSharedModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatProgressSpinnerModule,

    ],
    exports: [
        LandingInstituteComponent
    ],
})
export class LandingInstituteModule
{
}
