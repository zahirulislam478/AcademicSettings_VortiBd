import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'landing-institute',
    templateUrl: './institute.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingInstituteComponent
{
    safeSrc: SafeResourceUrl;
    cData: any;

    ClientId: any;
    CircularId: any;

    fetchingData = true;

    /**
     * Constructor
     */
    constructor(
        private sanitizer: DomSanitizer,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private router: Router,
    )
    {
        // console.log(this._activatedRoute.snapshot.paramMap.get('id'), '_activatedRoute');

        this._activatedRoute.params.subscribe(params =>
        {
            this.ClientId = params['ClientId'];
            this.CircularId = params['CircularId'];


            // You can now use param1 and param2 in your component.
        });

        if (this.ClientId == null)
        {
            this.router.navigate(['home']);
        }
        if (this.ClientId != null && this.CircularId != null)
        {
            this.GetData();
        }
    }

    GetData(): void
    {
        this._authService.GetCircularInstructions(this.ClientId, this.CircularId)
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

    OpenSignUp()
    {
        localStorage.setItem('_SelectedClient', this.ClientId);
        this.router.navigate(['sign-up']);
    }
}
