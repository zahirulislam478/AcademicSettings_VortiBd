import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/example'
  // { path: '', pathMatch: 'full', redirectTo: 'example' },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Redirect signed in user to the '/example'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  // { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'landing',
    },
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () =>
          import(
            'app/modules/auth/confirmation-required/confirmation-required.module'
          ).then((m) => m.AuthConfirmationRequiredModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import(
            'app/modules/auth/forgot-password/forgot-password.module'
          ).then((m) => m.AuthForgotPasswordModule),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('app/modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'reset-password/:mobileNo',
        loadChildren: () =>
          import('app/modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('app/modules/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('app/modules/auth/sign-up/sign-up.module').then(
            (m) => m.AuthSignUpModule
          ),
      },
      {
        path: 'otp-verification',
        loadChildren: () =>
          import(
            'app/modules/auth/otp-verification/otp-verification.module'
          ).then((m) => m.AuthOtpVerificationModule),
      },
      {
        path: 'otp-verification/:mobileNo',
        loadChildren: () =>
          import(
            'app/modules/auth/otp-verification/otp-verification.module'
          ).then((m) => m.AuthOtpVerificationModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('app/modules/landing/home/home.module').then(
            (m) => m.LandingHomeModule
          ),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('app/modules/landing/help/help.module').then(
            (m) => m.LandingHelpModule
          ),
      },
      {
        path: 'admission',
        loadChildren: () =>
          import('app/modules/landing/admission/admission.module').then(
            (m) => m.LandingAdmissionModule
          ),
      },
      {
        path: 'faqs',
        loadChildren: () =>
          import('app/modules/landing/faq/faq.module').then(
            (m) => m.LandingFaqModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('app/modules/landing/about/about.module').then(
            (m) => m.LandingAboutModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('app/modules/landing/contact/contact.module').then(
            (m) => m.LandingContactModule
          ),
      },
      {
        path: 'institute',
        loadChildren: () =>
          import('app/modules/landing/institute/institute.module').then(
            (m) => m.LandingInstituteModule
          ),
      },
      {
        path: 'institute/:ClientId/:CircularId',
        loadChildren: () =>
          import('app/modules/landing/institute/institute.module').then(
            (m) => m.LandingInstituteModule
          ),
      },
      {
        path: 'institute/:ClientId',
        loadChildren: () =>
          import('app/modules/landing/institute/institute.module').then(
            (m) => m.LandingInstituteModule
          ),
      },
      {
        path: 'admitcard',
        loadChildren: () =>
          import('app/modules/landing/admitcard/admitcard.module').then(
            (m) => m.LandingAdmitcardModule
          ),
      },
      {
        path: 'admitcard/:admitcardId',
        loadChildren: () =>
          import('app/modules/landing/admitcard/admitcard.module').then(
            (m) => m.LandingAdmitcardModule
          ),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('app/modules/auth/sign-out/sign-out.module').then(
            (m) => m.AuthSignOutModule
          ),
      },
      {
        path: 'unlock-session',
        loadChildren: () =>
          import('app/modules/auth/unlock-session/unlock-session.module').then(
            (m) => m.AuthUnlockSessionModule
          ),
      },
    ],
  },

  // Landing routes
  // {
  //     path: '',
  //     component  : LayoutComponent,
  //     data: {
  //         layout: 'empty'
  //     },
  //     children   : [
  //         {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
  //     ]
  // },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    // data: {
    //     layout: 'admin'
    // },
    children: [
      // { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
      // { path: 'stepper', loadChildren: () => import('app/modules/admin/stepper/stepper.module').then(m => m.StepperModule) },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('app/modules/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },

  // Super Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    // data: {
    //     layout: 'compact'
    // },
    children: [
      {
        path: 'superAdmin',
        loadChildren: () =>
          import('app/modules/superAdmin/superAdmin.module').then(
            (m) => m.SuperAdminModule
          ),
      },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    // data: {
    //     layout: 'compact'
    // },
    children: [
      {
        path: 'adminUiConfig',
        loadChildren: () =>
          import(
            'app/modules/admssion-ui-config/admssion-ui-config.module'
          ).then((m) => m.AdmssionUIConfigModule),
      },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    // data: {
    //     layout: 'compact'
    // },
    children: [
      {
        path: 'studentUpdate',
        loadChildren: () =>
          import(
            'app/modules/admssion-student-update/admssion-student-update.module'
          ).then((m) => m.AdmssionStudentUpdateModule),
      },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    // data: {
    //     layout: 'compact'
    // },
    children: [
      {
        path: 'studentInfo',
        loadChildren: () =>
          import(
            'app/modules/admssion-student-info/admssion-student-info.module'
          ).then((m) => m.AdmssionStudentInfoModule),
      },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    // data: {
    //     layout: 'compact'
    // },
    children: [
      {
        path: 'studentImport',
        loadChildren: () =>
          import(
            'app/modules/admssion-student-import/admssion-student-import.module'
          ).then((m) => m.AdmssionStudentimportModule),
      },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'jobportaluiconfig',
        loadChildren: () =>
          import(
            'app/modules/jobportal-ui-config/jobportal-ui-config.module'
          ).then((m) => m.JobPortalUiConfigModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'jobportal',
        loadChildren: () =>
          import('app/modules/job-portal/job-portal.module').then(
            (m) => m.JobPortalModule
          ),
      },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: "academicSettings",
        loadChildren: () =>
          import("app/modules/academic-settings/academic-settings.module").then(
            (m) => m.AcademicSettingsModule
          ),
      },
    ],
  }
];
