import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    safeSrc: SafeResourceUrl;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
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
        this.signUpForm = this._formBuilder.group({
            // name      : ['', Validators.required],
            // email     : ['', [Validators.required, Validators.email]],
            // password  : ['', Validators.required],
            // company   : [''],
            // agreements: ['', Validators.requiredTrue],
            userType: ['3'],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['--'],
            caption: ['--'],
            confirmCaption: ['--'],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],

        },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm')
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid)
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.register(this.signUpForm.value)
            .subscribe(
                (response) =>
                {
                    // debugger;
                    let mob = this.signUpForm.controls['phone'].value;

                    // Navigate to the confirmation required page
                    // this._router.navigateByUrl(`/otp-verification/${mob}`);
                    this._router.navigate(["otp-verification", mob]);
                },
                (response) =>
                {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

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

    call()
    {
        this._router.navigate(["otp-verification", '01916387657']);
    }
}
