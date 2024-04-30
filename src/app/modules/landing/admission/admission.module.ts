import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingAdmissionComponent } from './admission.component';
import { landingAdmissionRoutes } from './admission.routing';
import { LandingSharedModule } from '../landing-shared/landing.shared.module';




@NgModule({
    declarations: [
        LandingAdmissionComponent,
    ],
    imports: [
        RouterModule.forChild(landingAdmissionRoutes),
        MatButtonModule,
        LandingSharedModule,
        MatIconModule,
        SharedModule
    ],
    exports: [
        LandingAdmissionComponent,
    ]
})
export class LandingAdmissionModule {
}
