import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation, landingNavigation } from 'app/mock-api/common/navigation/data';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;
    private readonly _landingNavigation: FuseNavigationItem[] = landingNavigation;

    // _compactNavigation: FuseNavigationItem[];
    // _defaultNavigation: FuseNavigationItem[];
    // _futuristicNavigation: FuseNavigationItem[];
    // _horizontalNavigation: FuseNavigationItem[];
    // _landingNavigation: FuseNavigationItem[];

    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _authService: AuthService
    )
    {

        // let menu = this._authService.userMenu;

        // let hasMenu = menu != null && menu != "";

        // this._compactNavigation = hasMenu ? menu : compactNavigation;
        // this._defaultNavigation = hasMenu ? menu : defaultNavigation;
        // this._futuristicNavigation = hasMenu ? menu : futuristicNavigation;
        // this._horizontalNavigation = hasMenu ? menu : horizontalNavigation;
        // this._landingNavigation = hasMenu ? menu : landingNavigation;

        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() =>
            {

                // debugger;
                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if (defaultNavItem.id === compactNavItem.id)
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if (defaultNavItem.id === futuristicNavItem.id)
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if (defaultNavItem.id === horizontalNavItem.id)
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response

                if (!AuthUtils.isTokenExpired(this._authService.clientData))
                {
                    return [
                        200,
                        {
                            compact: cloneDeep(this._compactNavigation),
                            default: cloneDeep(this._defaultNavigation),
                            futuristic: cloneDeep(this._futuristicNavigation),
                            horizontal: cloneDeep(this._horizontalNavigation)
                        }
                    ];
                }
                else
                {
                    return [
                        200,
                        {
                            compact: cloneDeep(this._landingNavigation),
                            default: cloneDeep(this._landingNavigation),
                            futuristic: cloneDeep(this._landingNavigation),
                            horizontal: cloneDeep(this._landingNavigation)
                        }
                    ];
                }
            });
    }
}
