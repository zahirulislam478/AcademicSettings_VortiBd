import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingContactComponent } from './contact.component';
import { landingContactRoutes } from './contact.routing';
import { LandingSharedModule } from '../landing-shared/landing.shared.module';



@NgModule({
    declarations: [
        LandingContactComponent
    ],
    imports: [
        RouterModule.forChild(landingContactRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        LandingSharedModule
    ],
    exports: [
        LandingContactComponent
    ],
})
export class LandingContactModule {
}
