import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import UrlConfig from 'app/Urlconfig/urlConfig';
import ConstantNames from 'app/Urlconfig/constantNames';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem(ConstantNames.accessToken, token);
    }

    get accessToken(): string
    {
        return localStorage.getItem(ConstantNames.accessToken) ?? '';
    }

    set clientData(data: any)
    {
        localStorage.setItem(ConstantNames.clientData, data);
    }

    get clientData(): any
    {
        return localStorage.getItem(ConstantNames.clientData) ?? null
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if (this._authenticated)
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) =>
            {


                // Return a new observable with the response
                return of(response);
            })
        );
    }


    login(value: any): any
    {
        // const body = 'username=' + userName + '&password=' + password + '&grant_type=password';

        // let body = new HttpParams()
        //     .set(`username`, value.username)
        //     .set(`password`, value.password)
        //     .set(`grant_type`, `password`);

        let body = { 'username': value.username, 'password': value.password };

        return this._httpClient.post(UrlConfig.LOGIN, body).pipe(
            switchMap((response: any) =>
            {

                // Store the access token in the local storage
                this.accessToken = response.data.AccessToken;

                this.clientData = JSON.stringify(response.data);


                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.data.User;

                // Return a new observable with the response
                return of(response);
            })
        );
    }


    register(value: any): any
    {
        let body = {
            "userType": value.userType,
            "name": value.name,
            "phone": value.phone,
            "email": value.email,
            "caption": value.caption,
            "confirmCaption": value.confirmCaption,
            "password": value.password,
            "passwordConfirm": value.passwordConfirm,
        };

        console.log(body, 'register body');


        return this._httpClient.post(UrlConfig.REGISTRATION, body).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    OtpVerify(value: any): any
    {
        let body = {
            "code": value.code,
            "phoneNumber": value.phoneNumber
        };

        return this._httpClient.post(UrlConfig.VERIFYPHONENUMBER, body).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    ForgotMyPassword(value: any): any
    {
        let body = {
            "phoneNumber": value
        };

        return this._httpClient.post(UrlConfig.FORGOTPASSWORD, body).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    ResetMyPassword(value: any): any
    {
        let body = {
            "newPassword": value.password,
            "confirmPassword": value.passwordConfirm,
            "userName":value.phoneNumber,
            "otp": value.otp,
            "isPasswordGenerate": true,
            "phoneNumber": value.phoneNumber,
        };

        return this._httpClient.post(UrlConfig.RESETPASSWORD, body).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    GetAllCirculars(): any
    {
        return this._httpClient.get(UrlConfig.ALL_CIRCULARS).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    GetCircularInstructions(clientId: any, circularId: any): any
    {
        return this._httpClient.get(UrlConfig.CIRCULARS_INSTRUCTIONS + `${clientId}/${circularId}`).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    GetAdmitcard(clientId: any): any
    {
        return this._httpClient.get(UrlConfig.ADMITCARD + `${clientId}`).pipe(
            switchMap((response: any) =>
            {
                // Return a new observable with the response
                return of(response);
            })
        );
    }


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) =>
            {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken)
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem(ConstantNames.accessToken);
        localStorage.removeItem(ConstantNames.clientData);
        localStorage.removeItem(ConstantNames.FormParam);
        localStorage.removeItem('prevAcademicForCollegeSaveData');
        localStorage.removeItem('guardianSaveData');
        localStorage.removeItem('courseCurriculumSaveData');
        localStorage.removeItem('addressSaveData');
        localStorage.removeItem('studentSaveData');
        localStorage.removeItem('acb');
        localStorage.removeItem('CircularFormParam');
        localStorage.removeItem('_SelectedClient');


        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if (this._authenticated)
        {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken)
        {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.clientData))
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
