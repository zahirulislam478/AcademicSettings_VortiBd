/** @format */

import { Component, ViewEncapsulation } from "@angular/core";
import { formTopSectionData } from "./formTopSectionData";

@Component({
  selector: "formTopSection",
  templateUrl: "./formTopSection.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class FormTopSectionComponent {
  /**
   * Constructor
   */
  formTopSectionData: {
    id: string;
    url: string;
    collegeName: string;
    motto: string;
    schoolCode: string;
    class: string;
    session: string;
    sscGroup: string;
    sscRoll: string;
    collegeIT: string;
  }[] = formTopSectionData;

  constructor() {}
}
