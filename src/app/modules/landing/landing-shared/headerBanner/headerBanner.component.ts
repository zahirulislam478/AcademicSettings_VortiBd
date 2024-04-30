import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'landing-banner',
    templateUrl: './headerBanner.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingBannerComponent {
    @Input()
    data: any;
    @Input()
    paragraph: boolean;
     
    /**
     * Constructor
     */
    constructor() {
    }
}
