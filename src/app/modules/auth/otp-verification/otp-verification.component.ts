import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-otp-verification',
    templateUrl: './otp-verification.component.html',
    styleUrls: ["./otp-verification.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthOtpVerificationComponent implements OnInit
{
    @ViewChild('otpVerificationNgForm') otpVerificationNgForm: NgForm;
    safeSrc: SafeResourceUrl;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    otpVerificationForm: UntypedFormGroup;
    showAlert: boolean = false;

    mobileNo = "";

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        private _router: Router,
        private matSnackBar: MatSnackBar,

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
        // debugger;

        this.mobileNo = this._activatedRoute.snapshot.paramMap.get('mobileNo');

        if (this.mobileNo == null)
        {
            this.mobileNo = "";
        }

        // Create the form
        this.otpVerificationForm = this._formBuilder.group({
            // email: ['hughes.brian@company.com', [Validators.required, Validators.email]],
            code: ['', Validators.required],
            phoneNumber: [this.mobileNo, Validators.required],
            // rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    codeVerify(): void
    {
        // Return if the form is invalid
        if (this.otpVerificationForm.invalid)
        {
            return;
        }

        // Disable the form
        this.otpVerificationForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        // this._authService.signIn(this.otpVerificationForm.value)
        this._authService.OtpVerify(this.otpVerificationForm.value)
            .subscribe(
                () =>
                {

                    this.matSnackBar.open("Phone Verification Successfull! Login To Your Account", 'Close', {
                        verticalPosition: 'top',
                        duration: 4000,
                    });
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/sign-in');



                },
                (response) =>
                {

                    // Re-enable the form
                    this.otpVerificationForm.enable();

                    // Reset the form
                    this.otpVerificationNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
