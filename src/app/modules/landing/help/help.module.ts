import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHelpComponent } from './help.component';
import { landingHelpRoutes } from './help.routing';
import { LandingSharedModule } from '../landing-shared/landing.shared.module';



@NgModule({
    declarations: [
        LandingHelpComponent
    ],
    imports: [
        RouterModule.forChild(landingHelpRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        LandingSharedModule
    ],
    exports: [
        LandingHelpComponent
    ],
})
export class LandingHelpModule {
}
