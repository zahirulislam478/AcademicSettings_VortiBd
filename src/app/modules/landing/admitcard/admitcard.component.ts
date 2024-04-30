import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'landing-admitcard',
    templateUrl: './admitcard.component.html',
    styleUrls: ["./admitcard.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class LandingAdmitcardComponent
{
    safeSrc: SafeResourceUrl;
    cData: any;
    StudentControl = new FormControl('');

    admitcardId: any;

    fetchingData = false;

    /**
     * Constructor
     */
    constructor(
        private sanitizer: DomSanitizer,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        private matSnackBar: MatSnackBar,

    )
    {
        // console.log(this._activatedRoute.snapshot.paramMap.get('id'), '_activatedRoute');

        this._activatedRoute.params.subscribe(params =>
        {
            this.admitcardId = params['admitcardId'];


            // You can now use param1 and param2 in your component.
        });

        if (this.admitcardId != null)
        {
            this.StudentControl.setValue(this.admitcardId.toString())
            this.GetData();
        }

    }



    GetData(): void
    {
        if (this.StudentControl.value == '')
        {
            this.matSnackBar.open("Please Enter SSC Roll", "Close", {
                verticalPosition: "top",
                duration: 2000,
            });
            return;
        }
        this.fetchingData = true;
        this.cData = null;
        this._authService.GetAdmitcard(this.StudentControl.value)
            .pipe()
            .subscribe(
                (response) =>
                {
                    console.log(response, 'response');

                    if (response.isError == false)
                    {
                        this.cData = response.data;
                        this.fetchingData = false;
                    }
                },
                (response) =>
                {

                    console.log(response, 'error');
                    this.fetchingData = false;

                }
            );
    }

    // *ngIf="!fetchingData && cData != null"

    openExternalLink(url: string)
    {
        // debugger;
        let myUrl = '';
        if (url.includes('https://') == false)
        {
            myUrl = `https://${url}`;
        }
        else
        {
            myUrl = url;
        }
        window.open(myUrl, '_blank');
    }
}


let da = {
    "ClientName": "Chattogram Cantonment Public College",
    "ClientShortName": "CCPC",
    "ClientAddress": "Baizid Bostami-4210, Chattogram Cantonment, ",
    "ClientLogo": "https://allpicture.blob.core.windows.net/tsp/Images//Uploads/Institutes/Logo/ccpc-logo.jpg",
    "ClientEmail": "ccpc1961@yahoo.com",
    "Age": "0 years 0 months",
    "ClientPhone": "02339243170",
    "ClientWebUrl": "http://ccpc.edu.bd/",
    "AppliedCircularTitle": "School Admission 2024",
    "ApplicantId": 3573,
    "AdmissionRoll": 0,
    "Program": "Three",
    "Version": "Bangla",
    "Session": "2024",
    "RollNo": null,
    "Shift": "--",
    "Category": "Civil",
    "Group": "",
    "StudentName": "MD. SHIDUL ISLAM",
    "FatherName": "Father",
    "MotherName": "--",
    "PresentAddress": "Mirpur",
    "PermanentAddress": "Mirpur",
    "ContactNo": "018******68",
    "DateOfBirth": "2023-11-07T00:00:00",
    "Gender": "M",
    "PhotoPathS": "https://allpicture.blob.core.windows.net/vortibd\\students\\84387.jpg"
}
