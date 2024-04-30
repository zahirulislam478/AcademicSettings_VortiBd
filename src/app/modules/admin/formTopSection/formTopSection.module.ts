/** @format */

import { NgModule } from "@angular/core";
import { FormTopSectionComponent } from "./formTopSection.component";
import { Route, RouterModule } from "@angular/router";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "app/shared/shared.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AdminSharedModule } from "../admin-shared/admin.shared.module";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FuseCardModule } from "../../../../@fuse/components/card/card.module";

const formTopSectionRoutes: Route[] = [
  {
    path: "",
    component: FormTopSectionComponent,
  },
];

@NgModule({
  declarations: [FormTopSectionComponent],
  imports: [
    RouterModule.forChild(formTopSectionRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDividerModule,
    AdminSharedModule,
    SharedModule,
    FuseCardModule,
  ],
})
export class FormTopSectionModule {}
