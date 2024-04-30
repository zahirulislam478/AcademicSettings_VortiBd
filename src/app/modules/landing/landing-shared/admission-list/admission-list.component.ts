import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'landing-admission-list',
    templateUrl: './admission-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingAdmissionListComponent
{
    data: any;
    @Input() cData: any;
    /**
     * Constructor
     */
    constructor(private router: Router)
    {
    }

    ngOnInit(): void
    {
        this.data = DummyClients;
    }

    GoToIns(mainitem, childitem): void
    {
        this.router.navigate(['institute', mainitem.ClientId, childitem.CircularId]);
    }

}

let DummyClients = [
    // {
    //     "ClientName": "Dhaka Cantonment Girls' Public School & College",
    //     "ClientLogo": "https://vortibd.com/media/icon/2018_10_21_12_23_25_logo.gif",
    //     "ClientId": "1"
    // },
    // {
    //     "ClientName": "Shaheed Police Smrity College",
    //     "ClientLogo": "https://vortibd.com/media/icon/2021_11_14_12_24_53_spsc.jpg",
    //     "ClientId": "3"
    // },
    // {
    //     "ClientName": "Knowledgium School & College",
    //     "ClientLogo": "https://vortibd.com/media/icon/2018_10_21_04_41_20_logo.jpg",
    //     "ClientId": "4"
    // },
    // {
    //     "ClientName": "Bangladesh International School & College",
    //     "ClientLogo": "https://vortibd.com/media/icon/2018_10_19_09_45_25_BISC.gif",
    //     "ClientId": "5"
    // },
    // {
    //     "ClientName": "Gazipur Cantonment Public School & College",
    //     "ClientLogo": "https://vortibd.com/media/icon/2018_10_30_12_41_46_bofpsc_logo.png",
    //     "ClientId": "8"
    // },

    {
        "ClientName": "Chattogram Cantonment Public College",
        "ClientLogo": "http://ccpc.edu.bd/media/logos/Ze5gz3KSmCLGdA5HijM0LDrnZ98Mb0JsQKWQFEix.jpg",
        "ClientId": "1"
    }
]
