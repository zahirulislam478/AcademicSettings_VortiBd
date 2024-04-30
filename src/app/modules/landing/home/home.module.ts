import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { LandingSharedModule } from '../landing-shared/landing.shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        LandingHomeComponent,

    ],
    imports: [
        RouterModule.forChild(landingHomeRoutes),
        LandingSharedModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatProgressSpinnerModule,

    ],
    exports: [
        LandingHomeComponent
    ],
})
export class LandingHomeModule
{
}
