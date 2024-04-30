import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingFaqComponent } from './faq.component';
import { landingFaqRoutes } from './faq.routing';
import { MatExpansionModule } from '@angular/material/expansion';
import { LandingSharedModule } from '../landing-shared/landing.shared.module';


@NgModule({
    declarations: [
        LandingFaqComponent,
    ],
    imports: [
        RouterModule.forChild(landingFaqRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatExpansionModule,
        LandingSharedModule
    ]
})
export class LandingFaqModule {
}
