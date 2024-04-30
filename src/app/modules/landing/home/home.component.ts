import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
    safeSrc: SafeResourceUrl;
    cData: any;

    fetchingData = true;

    /**
     * Constructor
     */
    constructor(
        private sanitizer: DomSanitizer,
        private _authService: AuthService,

    )
    {
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/06jGNYc5MYE");
        this.GetData();
    }

    GetData(): void
    {
        this._authService.GetAllCirculars()
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
}
