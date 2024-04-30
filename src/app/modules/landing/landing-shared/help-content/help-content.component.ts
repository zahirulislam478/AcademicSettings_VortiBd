import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'landing-help-content',
    templateUrl: './help-content.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHelpContentComponent
{
    data: any;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
