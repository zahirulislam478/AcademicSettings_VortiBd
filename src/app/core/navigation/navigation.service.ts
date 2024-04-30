import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Navigation } from "app/core/navigation/navigation.types";
import { cloneDeep } from "lodash-es";
import { Observable, ReplaySubject, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { AuthUtils } from "../auth/auth.utils";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private _navigation: ReplaySubject<Navigation> =
    new ReplaySubject<Navigation>(1);

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for navigation
   */
  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all navigation data
   */
  // get(): Observable<Navigation>
  // {
  //     return this._httpClient.get<Navigation>('api/common/navigation').pipe(
  //         tap((navigation) => {
  //             this._navigation.next(navigation);
  //         })
  //     );
  // }

  get(): Observable<Navigation> {
    let accessToken = localStorage.getItem("accessToken");
    if (
      accessToken != "" &&
      accessToken != null &&
      !AuthUtils.isTokenExpired(this._authService.clientData)
    ) {
      let menus = null;

      let clientData = JSON.parse(this._authService.clientData);

      // if (clientData.User.RoleNames.includes("ADMIN") == true)
      // {
      //     menus = this.getMenus(menuAdmin);
      // }
      // else
      // {
      //     menus = this.getMenus(menuApplicant);
      // }

      // switch (clientData.User.RoleNames)
      // {
      //     case "ADMIN":
      //         menus = this.getMenus(menuAdmin2);
      //         break;

      //     case "ADMINIT":
      //         menus = this.getMenus(menuAdmin2);
      //         break;

      //     case "Applicant":
      //         menus = this.getMenus(menuApplicant);
      //         break;

      //     case "APPLICANT":
      //         menus = this.getMenus(menuApplicant);
      //         break;

      //     // case "":
      //     //     menus = this.getMenus(menuAdminIt);
      //     //     break;
      // }

      let role = clientData.User.RoleNames.toUpperCase();

      switch (role) {
        case "ADMIN":
        case "ADMINIT":
          menus = this.getMenus(menuAdmin2);
          break;

        case "APPLICANT":
          menus = this.getMenus(menuApplicant);
          break;
      }

      return menus.map((navigation) => {
        this._navigation.next(navigation);
      });
    } else {
      return this._httpClient.get<Navigation>("api/common/navigation").pipe(
        tap((navigation) => {
          this._navigation.next(navigation);
        })
      );
    }
  }

  getMenus(menu: any): any {
    let compactNavigation = menu;
    let defaultNavigation = menu;
    let futuristicNavigation = menu;
    let horizontalNavigation = menu;
    let landingNavigation = menu;

    // debugger;
    // Fill compact navigation children using the default navigation
    compactNavigation.forEach((compactNavItem) => {
      defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === compactNavItem.id) {
          compactNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });

    // Fill futuristic navigation children using the default navigation
    futuristicNavigation.forEach((futuristicNavItem) => {
      defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === futuristicNavItem.id) {
          futuristicNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });

    // Fill horizontal navigation children using the default navigation
    horizontalNavigation.forEach((horizontalNavItem) => {
      defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === horizontalNavItem.id) {
          horizontalNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });

    return [
      200,
      {
        compact: cloneDeep(compactNavigation),
        default: cloneDeep(defaultNavigation),
        futuristic: cloneDeep(futuristicNavigation),
        horizontal: cloneDeep(horizontalNavigation),
      },
    ];
  }
}

let menuApplicant = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "basic",
    icon: "heroicons_outline:chart-pie",
    link: "/dashboard",
  },
];

let menuAdminIt = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "basic",
    icon: "heroicons_outline:chart-pie",
    link: "/dashboard",
  },
  {
    id: "apps.adminUiConfig",
    title: "Admimission Ui Config",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/adminUiConfig",
  },
  {
    id: "apps.superAdmin",
    title: "Manage Circular",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/superAdmin",
  },
  {
    id: "apps.superAdmin",
    title: "Admimission Student Update",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/studentUpdate",
  },
  {
    id: "apps.superAdmin",
    title: "Admimission Student Info",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/studentInfo",
  },
  {
    id: "apps.superAdmin",
    title: "Admimission Student Import",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/studentImport",
  },
];

let menuAdmin = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "basic",
    icon: "heroicons_outline:chart-pie",
    link: "/dashboard",
  },
  {
    id: "apps.adminUiConfig",
    title: "Admimission Ui Config",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/adminUiConfig",
  },
  {
    id: "apps.superAdmin",
    title: "Manage Circular",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/superAdmin",
  },
  {
    id: "apps.superAdmin",
    title: "Admimission Student Update",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/studentUpdate",
  },
  {
    id: "apps.superAdmin",
    title: "Admimission Student Info",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/studentInfo",
  },
  {
    id: "apps.superAdmin",
    title: "Admimission Student Import",
    type: "basic",
    icon: "heroicons_outline:check-circle",
    link: "/studentImport",
  },
];

let menuAdmin2 = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "",
    type: "group",
    icon: "heroicons_outline:home",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "basic",
        icon: "heroicons_outline:chart-pie",
        link: "/dashboard",
      },
    ],
  },
  {
    id: "pages",
    title: "Pages",
    type: "collapsable",
    icon: "heroicons_outline:chart-pie",
    children: [
      {
        id: "apps.academicSettings",
        title: "Academic Settings",
        type: "basic",

        link: "/academicSettings",
      },
      {
        id: "apps.adminUiConfig",
        title: "Admimission Ui Config",
        type: "basic",

        link: "/adminUiConfig",
      },
      {
        id: "apps.superAdmin",
        title: "Manage Circular",
        type: "basic",

        link: "/superAdmin",
      },
      {
        id: "apps.superAdmin",
        title: "Admimission Student Update",
        type: "basic",

        link: "/studentUpdate",
      },
      {
        id: "apps.superAdmin",
        title: "Admimission Student Info",
        type: "basic",

        link: "/studentInfo",
      },
      {
        id: "apps.superAdmin",
        title: "Admimission Student Import",
        type: "basic",

        link: "/studentImport",
      },
    ],
  },
  {
    id: "jobportal",
    title: "Job Portal",
    subtitle: "",
    type: "group",
    icon: "heroicons_outline:home",
    children: [
      {
        id: "jobportal",
        title: "Job Portal",
        type: "collapsable",
        icon: "heroicons_outline:chart-pie",
        children: [
          {
            id: "apps.jobportal",
            title: "Application UI Config",
            type: "basic",
            link: "/jobportaluiconfig",
          },
          {
            id: "apps.jobportal",
            title: "Manage Circular",
            type: "basic",
            link: "/jobportal",
          },
        ],
      },
    ],
  },
  // {
  //   id: 'jobportal',
  //   title: 'Job Portal',
  //   type: 'collapsable',
  //   icon: 'heroicons_outline:chart-pie',
  //   children: [
  //     {
  //       id: 'apps.jobportal',
  //       title: 'Application UI Config',
  //       type: 'basic',
  //       link: '/jobportaluiconfig',
  //     },
  //     {
  //       id: 'apps.jobportal',
  //       title: 'Manage Circular',
  //       type: 'basic',
  //       link: '/jobportal',
  //     },
  //   ],
  // },
];
