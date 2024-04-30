import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ["./reset-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthResetPasswordComponent implements OnInit
{
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    mobileNo: any;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _activatedRoute: ActivatedRoute,
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
        this.mobileNo = this._activatedRoute.snapshot.paramMap.get('mobileNo');

        if (this.mobileNo == null)
        {
            this.mobileNo = "";
        }

        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
            phoneNumber: [this.mobileNo, Validators.required],
            otp: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
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
     * Reset password
     */
    resetPassword(): void
    {
        // Return if the form is invalid
        if (this.resetPasswordForm.invalid)
        {
            return;
        }

        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        this._authService.ResetMyPassword(this.resetPasswordForm.value)
            .pipe(
                finalize(() =>
                {

                    // Re-enable the form
                    this.resetPasswordForm.enable();

                    // Reset the form
                    this.resetPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) =>
                {
                    // debugger;
                    console.log(response);

                    if (response.Error == true)
                    {
                        this.alert = {
                            type: 'error',
                            message: response.Message
                        };
                    }
                    else
                    {
                        this.matSnackBar.open("Password Reset Successful, Please Sign In Using New Password ", 'Close', {
                            verticalPosition: 'top',
                            duration: 4000,
                        });


                        this._router.navigate(["sign-in"]);
                    }

                    // // Set the alert
                    // this.alert = {
                    //     type: 'success',
                    //     message: 'Your password has been reset.'
                    // };
                },
                (response) =>
                {

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Something went wrong, please try again.'
                    };
                }
            );
    }
}
