import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'landing-payment-method',
    templateUrl: './payment-method.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingPaymentMethodComponent
{
    data: any;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
