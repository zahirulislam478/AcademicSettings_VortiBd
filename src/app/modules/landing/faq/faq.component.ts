/** @format */

import { Component, ViewEncapsulation } from "@angular/core";
import { faqData } from "./faqdata";
import { fuseAnimations } from "@fuse/animations";
@Component({
  selector: "landing-faq",
  templateUrl: "./faq.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class LandingFaqComponent {
  faqData: { id: Number; question: string; answer: string }[] = faqData;

  Question: boolean = true;
  visible: boolean = false;
  onclick() {
    this.visible = !this.visible;
  }
  /**
   * Constructor
   */
  constructor() {}
}
