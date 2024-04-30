import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { LandingAdmissionListComponent } from "./admission-list/admission-list.component";
import { LandingBannerComponent } from "./headerBanner/headerBanner.component";
import { LandingHelpContentComponent } from "./help-content/help-content.component";
import { LandingPaymentMethodComponent } from "./payment-method/payment-method.component";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
    declarations: [
        LandingAdmissionListComponent,
        LandingHelpContentComponent,
        LandingPaymentMethodComponent,
        LandingBannerComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
    ],
    exports: [
        LandingAdmissionListComponent,
        LandingHelpContentComponent,
        LandingPaymentMethodComponent,
        LandingBannerComponent,
    ]
})
export class LandingSharedModule {
}
