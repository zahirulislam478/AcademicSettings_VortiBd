export default class UrlConfig {
  static apiVersion = 1;

  // static readonly rootUrl: string = 'https://sandbox.cloudcampus24.com/';
  // static readonly apiUrl: string = 'https://sandbox.cloudcampus24.com/api/';

  // static readonly rootUrl: string = 'https://sandbox2.cloudcampus24.com/';
  // static readonly apiUrl: string ='https://sandbox2.cloudcampus24.com/api/';

  // static readonly rootUrl: string = 'https://apps.cloudcampus24.com/';
  // static readonly apiUrl: string = 'https://apps.cloudcampus24.com/api/';

  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  // static readonly rootUrl: string = "http://sandboxapi.vortibd.com";
  // static readonly apiUrl: string = "http://sandboxapi.vortibd.com/api/";
  // static readonly apiUrlV1: string = "http://sandboxapi.vortibd.com/api/v1/";
  ////////////////////////////////////////

  ////////////////////////////////////////
  // static readonly rootUrl: string = "http://betaapi.vortibd.com";
  // static readonly apiUrl: string = "http://betaapi.vortibd.com/api/";
  // static readonly apiUrlV1: string = "http://betaapi.vortibd.com/api/v1/";
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  // static readonly rootUrl: string = 'https://vortibdsandboxapi.cloudcampus24.com';
  // static readonly apiUrl: string = 'https://vortibdsandboxapi.cloudcampus24.com/api/';
  // static readonly apiUrlV1: string = 'https://vortibdsandboxapi.cloudcampus24.com/api/v1/';

  // static readonly rootUrl: string = "https://vortibdliveapi.cloudcampus24.com";
  // static readonly apiUrl: string = "https://vortibdliveapi.cloudcampus24.com/api/";
  // static readonly apiUrlV1: string = "https://vortibdliveapi.cloudcampus24.com/api/v1/";

  static readonly rootUrl: string = "https://vortibdtestapi.cloudcampus24.com";
  static readonly apiUrl: string =
    "https://vortibdtestapi.cloudcampus24.com/api/";
  static readonly apiUrlV1: string =
    "https://vortibdtestapi.cloudcampus24.com/api/v1/";

  // https://vortibdliveapi.cloudcampus24.com/
  // --------------------------------------------------------------
  // https://vortibdsandbox.cloudcampus24.com/
  // https://vortibdsandboxapi.cloudcampus24.com/
  // ---------------------------------------------------------------
  // https://vortibdtest.cloudcampus24.com/
  // https://vortibdtestapi.cloudcampus24.com/

  public static get LOGIN(): string {
    return UrlConfig.apiUrl + `UserAuth/login`;
  }

  public static get REGISTRATION(): string {
    return UrlConfig.apiUrl + `UserAuth/registration`;
  }

  public static get VERIFYPHONENUMBER(): string {
    return UrlConfig.apiUrl + `UserAuth/verifyPhoneNumber`;
  }

  public static get FORGOTPASSWORD(): string {
    return UrlConfig.apiUrl + `UserAuth/forgotpassword`;
  }

  public static get RESETPASSWORD(): string {
    return UrlConfig.apiUrl + `UserAuth/resetpassword`;
  }

  public static get ALL_CIRCULARS(): string {
    return UrlConfig.apiUrlV1 + `CircularDashBoard/all-circulars/`;
  }

  public static get CIRCULARS_INSTRUCTIONS(): string {
    return UrlConfig.apiUrlV1 + `CircularDashBoard/circular-instructions/`;
  }

  public static get ADMISSION_UI_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `UIConfig/ui-configs`;
  }

  public static get ADMISSION_CLONE_UI_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `UIConfig/clone-ui-config`;
  }

  public static get ADMISSION_RESET_UI_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `UIConfig/reset-ui-config`;
  }

  public static get ADMITCARD(): string {
    return UrlConfig.apiUrlV1 + `Profile/admitcard/`;
  }

  public static get UI_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `Profile/get-ui-configs/`;
  }

  public static get DROPDOWN_CONTROLS(): string {
    return UrlConfig.apiUrlV1 + `Profile/default-controls/`;
  }

  public static get INSTITUTE_DATA(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/dashboard-controls/`;
  }

  public static get OPEN_PROGRAM_DATA(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/admission-open-programs/`;
  }

  public static get OPEN_PROGRAM_DETAILS(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/admission-open-program-details/`;
  }

  public static get PROFILE_SUBJECTS(): string {
    return UrlConfig.apiUrlV1 + `Profile/subjects/`;
  }

  public static get PROFILE_POLICE_STATION(): string {
    return UrlConfig.apiUrlV1 + `Profile/police-station/`;
  }

  public static get OPEN_CIRCULARS(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/open-circulars/`;
  }

  public static get OPEN_CIRCULARS_BY_GROUP_CAT(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/open-circulars-by-group-cat`;
  }

  public static STUDENT_SAVE_NEW(id): string {
    return (
      UrlConfig.apiUrlV1 + `Profile/save-student-info/${id}/NewApplication`
    );
  }

  // ExistingApplication

  public static get STUDENT_SAVE_INCOMPLETE(): string {
    return UrlConfig.apiUrlV1 + `Profile/save-incomplete-student-info`;
  }

  public static get GUARDIAN_SAVE(): string {
    return UrlConfig.apiUrlV1 + `Profile/save-guardian-info`;
  }

  public static get ADDRESS_SAVE(): string {
    return UrlConfig.apiUrlV1 + `Profile/save-student-address`;
  }

  public static get PREVIOUSCOLLEGE_SAVE(): string {
    return UrlConfig.apiUrlV1 + `Profile/save-student-pre-edu`;
  }

  public static get PREVIOUSSCHOOL_SAVE(): string {
    return UrlConfig.apiUrlV1 + `Profile/save-student-last-edu`;
  }

  public static COURSECURRICULUM_COLLEGE(id, groupID): string {
    return (
      UrlConfig.apiUrlV1 + `Profile/save-course-curriculum/${id}/${groupID}`
    );
  }

  public static get PROFILE_DOWNLOAD_BULK_IMAGE(): string {
    return UrlConfig.apiUrlV1 + `Profile/download-bulk-image/`;
  }

  public static get JOBPORTAL_EXAM_SKILL_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/exam-skill-configs/`;
  }

  public static get JOBPORTAL_SAVE_EXAM_SKILL_CONFIGS(): string {
    return (
      UrlConfig.apiUrlV1 + `JobCircularSetup/save-Skill-Configs-For-JobCircular`
    );
  }

  public static get AUTOCOMPLETE(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/profile-autocomplete`;
  }

  public static get CIRCULARCLIENT_DATA(): string {
    return UrlConfig.apiUrlV1 + `CircularDashBoard/clients`;
  }

  public static CIRCULAR_OPENCIRCULARS(id): string {
    return UrlConfig.apiUrlV1 + `CircularDashBoard/circulars/${id}`;
  }

  public static CIRCULAR_SINGLECIRCULAR(id): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/circular/${id}`;
  }

  public static CIRCULAR_CIRCULARDETAILS(id): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/circular-details-list/${id}`;
  }

  public static get CIRCULAR_CHECKAPPLIED(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/check-applied`;
  }

  public static get CIRCULAR_EXAM_CODES(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/exam-codes/`;
  }

  public static get CIRCULAR_SAVE_CIRCULAR_PREEDU(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/save-circular-preedu`;
  }

  public static get CIRCULAR_SAVEROLLRANGE(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/save-roll-range`;
  }

  public static get PROFILE_APPLIED_CANDIDATES(): string {
    return UrlConfig.apiUrlV1 + `Profile/applied-candidates`;
  }

  public static get PROFILE_DOWNLOAD_APPLIED_CANDIDATES(): string {
    return UrlConfig.apiUrlV1 + `Profile/download-applied-candidates`;
  }

  public static get SAVE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `CircularDashBoard/save-circular`;
  }

  public static get UPDATE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `CircularDashBoard/update-circular`;
  }

  public static get UPDATE_CIRCULAR_CONFIGURATION(): string {
    return (
      UrlConfig.apiUrlV1 + `CircularDashBoard/update-circular-configuration`
    );
  }

  public static get CIRCULAR_SETUP_SAVEROLL(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/save-roll-range`;
  }

  public static get CIRCULARDEFAULT_CONTROLS(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/default-controls/`;
  }

  public static get CIRCULAR_UPDATE_CIRCULAR_DETAILS(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/update-detail-circular`;
  }

  public static get CIRCULAR_COPY_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/copy-circular`;
  }

  public static get CIRCULAR_DELETE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/delete-circular/`;
  }

  public static get CIRCULAR_SETUP_INACTIVE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/inactive-circular/`;
  }

  public static get CIRCULAR_SAVE_CIRCULAR_DETAILS(): string {
    return UrlConfig.apiUrlV1 + `CircularSetup/save-circulars`;
  }

  public static get DASHBOARD_PROFILES(): string {
    return UrlConfig.apiUrlV1 + `DashBoard/profiles`;
  }

  public static get PROFILE_APPLY(): string {
    return UrlConfig.apiUrlV1 + `Profile/apply`;
  }

  public static get PROFILE_ADMIT_CARD(): string {
    return UrlConfig.apiUrlV1 + `Profile/admit-card/`;
  }

  public static get PROFILE_APPLIED_DATA(): string {
    return UrlConfig.apiUrlV1 + `Profile/applied-data/`;
  }

  public static get PROFILE_ADMISSION_FORM(): string {
    return UrlConfig.apiUrlV1 + `Profile/admission-form/`;
  }

  public static get PROFILE_ID_CARD(): string {
    return UrlConfig.apiUrlV1 + `Profile/id-card/`;
  }

  public static get PROFILE_LIBRARY_CARD(): string {
    return UrlConfig.apiUrlV1 + `Profile/library-card/`;
  }

  public static get PROFILE_TRANSPORT_APPLY_FORM(): string {
    return UrlConfig.apiUrlV1 + `Profile/transport-apply-form/`;
  }

  public static get PROFILE_GET_CURRENT_PROFILE(): string {
    return UrlConfig.apiUrlV1 + `Profile/get-current-profile/`;
  }

  public static get PAYMENTSSL_INITIATE_PAYMENT(): string {
    return UrlConfig.apiUrlV1 + `PaymentSSL/InitiatePayment`;
  }

  public static get PAYMENTSSL_DOWNLOAD_PERMISSION(): string {
    return UrlConfig.apiUrlV1 + `PaymentSSL/downloads-permission/`;
  }

  public static get PAYMENTSSL_DOWNLOAD_PERMISSION_APPLICANTID(): string {
    return (
      UrlConfig.apiUrlV1 + `PaymentSSL/downloads-permission-by-applicantId/`
    );
  }

  public static get PROFILE_GET_APPLIED_PROFILE(): string {
    return UrlConfig.apiUrlV1 + `Profile/get-applied-profile/`;
  }

  public static get PROFILE_LOTTERY_TOKEN(): string {
    return UrlConfig.apiUrlV1 + `Profile/lottery-token/`;
  }

  public static get PROFILE_SUMMARY_REPORT(): string {
    return UrlConfig.apiUrlV1 + `Profile/summary-report/`;
  }

  public static get IMPORTCANDIDATE_DROPDOWNS(): string {
    return UrlConfig.apiUrlV1 + `ImportCandidate/dropdowns/`;
  }

  public static get IMPORTCANDIDATE_SAVE_CANDIDATE(): string {
    return UrlConfig.apiUrlV1 + `ImportCandidate/save-candidate`;
  }

  public static get IMPORTCANDIDATE_SAVE_CANDIDATE_EXCEL(): string {
    return UrlConfig.apiUrlV1 + `ImportCandidate/save-candidate-excel/`;
  }

  /* JOB PORTAL UI CONFIG*/

  public static get JOBPORTALCLIENT_DATA(): string {
    return UrlConfig.apiUrlV1 + `ManageCircular/clients`;
  }

  public static get JOBPORTALCLIENT_UI_CONFIG(): string {
    return UrlConfig.apiUrlV1 + `JobPortalUIConfig/job-ui-configs`;
  }

  public static get JOBPORTALCLIENT_UI_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `JobPortalUIConfig/job-clone-ui-config`;
  }

  public static get JOBPORTALCLIENTS_RESET_UI_CONFIGS(): string {
    return UrlConfig.apiUrlV1 + `JobPortalUIConfig/job-reset-ui-config`;
  }

  /* JOB PORTAL CIRCULAR SETUP */

  public static JOBPORTALCIRCULAR_OPENCIRCULARS(id): string {
    return UrlConfig.apiUrlV1 + `ManageCircular/job-circulars/${id}`;
  }

  public static JOBPORTALCIRCULAR_SINGLECIRCULAR(id): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/circular/${id}`;
  }

  public static get JOBPORTALSAVE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `ManageCircular/save-job-circular`;
  }

  public static get JOBPORTALUPDATE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `ManageCircular/update-job-circular`;
  }

  public static get JOBPORTALCIRCULAR_DELETE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/delete-circular/`;
  }

  public static get JOBPORTALCIRCULAR_SETUP_INACTIVE_CIRCULAR(): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/inactive-circular/`;
  }

  public static JOBPORTALCIRCULAR_CIRCULARDETAILS(id): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/circular-details-list/${id}`;
  }

  public static JOBPORTALCIRCULAR_CIRCULARDETAILSBYID(id): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/circular-details/${id}`;
  }

  public static get JOBPORTALCIRCULAR_SAVE_CIRCULARDETAILS(): string {
    return UrlConfig.apiUrlV1 + `jobCircularSetup/save-circulars`;
  }

  public static get JOBPORTALCIRCULAR_UPDATE_CIRCULAR_DETAILS(): string {
    return UrlConfig.apiUrlV1 + `JobCircularSetup/copy-circular`;
  }

  public static get JOBPORTAL_UPDATE_CIRCULAR_CONFIGURATION(): string {
    return (
      UrlConfig.apiUrlV1 + `ManageCircular/update-job-circular-configuration`
    );
  }

  public static DEFAULT_CONTROLS(id): string {
    return UrlConfig.apiUrlV1 + `JobProfile/job-profile-default-controls/${id}`;
  }

  /* SETUP UI CONFIG */
  public static SETUP_CLIENTS(clientStatus: string): string {
    return UrlConfig.apiUrlV1 + `Setup/clients/${clientStatus}`;
  }

  public static get SETUP_SYNC_CLIENTS(): string {
    return UrlConfig.apiUrlV1 + `Setup/sync-clients`;
  }

  public static SETUP_CLIENT_STATUS(clientId: number): string {
    return UrlConfig.apiUrlV1 + `Setup/client-status/${clientId}`;
  }

  public static SETUP_VORTIBD_ACTIVE_INACTIVE(
    clientId: number,
    actionTag: string
  ): string {
    return (
      UrlConfig.apiUrlV1 +
      `Setup/vortibd-active-inactive/${clientId}/${actionTag}`
    );
  }

  public static SETUP_CLIENT_GATEWAY(clientId: number): string {
    return UrlConfig.apiUrlV1 + `Setup/client-gateway/${clientId}`;
  }

  public static get SETUP_UPDATE_GATEWAY(): string {
    return UrlConfig.apiUrlV1 + `Setup/update-vortibd-gateway`;
  }

  public static get SETUP_VORTIBD_CLIENTS(): string {
    return UrlConfig.apiUrlV1 + `Setup/get-vortibd-clients`;
  }

  public static SETUP_TABLES_DATA(clientId: number, table: string): string {
    return UrlConfig.apiUrlV1 + `Setup/get-tables-data/${clientId}/${table}`;
  }

  public static SETUP_EXTRA_TABLES_DATA(
    clientId: number,
    table: string
  ): string {
    return (
      UrlConfig.apiUrlV1 + `Setup/get-extra-tables-data/${clientId}/${table}`
    );
  }

  public static get SETUP_SYNC_TABLES(): string {
    return UrlConfig.apiUrlV1 + `Setup/sync-tables`;
  }
}

// Processing = 0,

// Pending = 1,

// Success = 2,

// Cancelled = 3,

// Failed = 4,

// Error = 5,

// SystemCancelled = 6,

// OperatorCancelled = 7,

// CancelledByCustomerRequest = 8,
