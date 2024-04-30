import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingAboutComponent } from './about.component';
import { landingAboutRoutes } from './about.routing';
import { LandingSharedModule } from '../landing-shared/landing.shared.module';



@NgModule({
    declarations: [
        LandingAboutComponent
    ],
    imports: [
        RouterModule.forChild(landingAboutRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        LandingSharedModule

    ],
    exports: [
        LandingAboutComponent
    ],
})
export class LandingAboutModule {
}
