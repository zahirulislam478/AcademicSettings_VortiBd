import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    safeSrc: SafeResourceUrl;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        private _router: Router
    )
    {
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/06jGNYc5MYE");
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            // email: ['hughes.brian@company.com', [Validators.required, Validators.email]],

            username: ['admin', Validators.required],
            password: ['Azr@123456', Validators.required],

            // Applicant
            // username: ['01818076768', Validators.required],
            // password: ['Abc@123456', Validators.required],

            // ADMIN IT
            // username: ['01781636277', Validators.required],
            // password: ['Ccpc1234', Validators.required],

            // username: ['+8801759255565', Validators.required],
            // password: ['Test@123', Validators.required],

            // username: ['01819627823', Validators.required],
            // password: ['Robi627823', Validators.required],

            // username: ['', Validators.required],
            // password: ['', Validators.required],

            // rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if (this.signInForm.invalid)
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        // this._authService.signIn(this.signInForm.value)
        this._authService.login(this.signInForm.value)
            .subscribe(
                () =>
                {

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) =>
                {

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Wrong username or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}


// 4561 3562 3560 3559 1497 2970


let fgfg = `
Admission
- Scholl & college Admission
____________________________

+Circular
>> Manage Circular

+Manage Application
>> Applicant Info Update
>> Applicant List

+Transactions
>> Verify Transaction #
>> Transaction Report

+Manage Result
>> Short-listed Applicants #
>> Upload Board/ Univarsity Result ~~student import

_____________________________________________


Job Portal
-Education Job
____________________________

+Settings
 >> Customize Admission Form ~~ ui config

 _____________________________________________

Event Registration
-Alumni Registration & Other Events
____________________________


_____________________________________________
`
