/** @format */

import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ExampleComponent } from "app/modules/admin/example/example.component";
import { DashboardModule } from "../dashboard/dashboard.module";

const exampleRoutes: Route[] = [
  {
    path: "",
    component: ExampleComponent,
  },
];

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    RouterModule.forChild(exampleRoutes),
    DashboardModule,
  ],
})
export class ExampleModule {}
