import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ["./forgot-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthForgotPasswordComponent implements OnInit
{
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private matSnackBar: MatSnackBar,

    )
    {
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
        this.forgotPasswordForm = this._formBuilder.group({
            phoneNo: ['', [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid)
        {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this._authService.ForgotMyPassword(this.forgotPasswordForm.get('phoneNo').value)
            .pipe(
                finalize(() =>
                {

                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Reset the form
                    // this.forgotPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) =>
                {
                    if (response.Error == true)
                    {
                        this.alert = {
                            type: 'error',
                            message: response.Message
                        };
                    }
                    else
                    {
                        this.matSnackBar.open("OTP Verification Code sent! You\'ll receive an Verification Code if you are registered on our system.", 'Close', {
                            verticalPosition: 'top',
                            duration: 4000,
                        });

                        let mob = this.forgotPasswordForm.controls['phoneNo'].value;

                        this._router.navigate(["reset-password", mob]);
                    }

                },
                (response) =>
                {

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Mobile No is not found! Are you sure you are already a member?'
                    };
                }
            );
    }
}
