/** @format */
import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import ConstantNames from "app/Urlconfig/constantNames";
import Utils from "app/Utility/utils";
import { isEmpty } from "lodash-es";
import { Subject, distinctUntilChanged, forkJoin, takeUntil } from "rxjs";
import { Dummy_Pair, FormParam_Interface } from "../dashboard.data";
import { DashboardService } from "../dashboard.service";
import { FuseConfigService } from "@fuse/services/config";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-download-page",
  templateUrl: "./download-page.component.html",
  styleUrls: ["./download-page.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class DashboardDownloadPageComponent
{

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  acb = null;

  TypeList = typeList;
  TypeList2 = typeList;
  IsError: string;
  ErrorMessage: string;
  OrderId: string;
  PaymentStatus: string;
  clientData: any;

  TranStatus: any;
  PermissionData: any;

  hasDlPermission = false;
  fetchingDlPermission = false;

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private matSnackBar: MatSnackBar,
    private _fuseConfigService: FuseConfigService,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _route: ActivatedRoute,

  )
  {
    this.clientData = JSON.parse(this._authService.clientData);

    if (this.clientData.User.RoleNames.includes("ADMIN") == false)
    {
      this.setLayout('admin');
    }

    // let acb = {
    //   ApplicationId: 8189
    // }
    // localStorage.setItem('acb', JSON.stringify(acb));
    this.acb = JSON.parse(localStorage.getItem('acb'));
    console.log(this.acb, 'this.acb');

    const HasIsError = this._route.snapshot.queryParamMap.has('IsError');
    const HasErrorMessage = this._route.snapshot.queryParamMap.has('ErrorMessage');
    const HasOrderId = this._route.snapshot.queryParamMap.has('OrderId');
    const HasPaymentStatus = this._route.snapshot.queryParamMap.has('PaymentStatus');

    console.log(HasIsError, 'HasIsError');
    console.log(HasErrorMessage, 'HasErrorMessage');
    console.log(HasOrderId, 'HasOrderId');
    console.log(HasPaymentStatus, 'HasPaymentStatus');

    if (HasIsError)
    {
      this.IsError = this._route.snapshot.queryParamMap.get('IsError');
    }
    if (HasErrorMessage)
    {
      this.ErrorMessage = this._route.snapshot.queryParamMap.get('ErrorMessage');
    }
    if (HasOrderId)
    {
      this.OrderId = this._route.snapshot.queryParamMap.get('OrderId');
    }
    if (HasPaymentStatus)
    {
      this.PaymentStatus = this._route.snapshot.queryParamMap.get('PaymentStatus');
    }

    if (this.OrderId != null)
    {
      this.Get_Download_Permission();
    }
    else
    {
      this.Get_Download_Permission_ApplicantId();
    }

  }


  setLayout(layout: string): void
  {
    // Clear the 'layout' query param to allow layout changes
    this._router.navigate([], {
      queryParams: {
        layout: null
      },
      queryParamsHandling: 'merge'
    }).then(() =>
    {

      // Set the config
      this._fuseConfigService.config = { layout };
    });
  }

  ngOnInit()
  {



    // http://localhost:4200/dashboard/download?IsError=False&ErrorMessage=Success&OrderId=0c02ef37-a97b-44c3-865f-788e112a4c74&PaymentStatus=2


    // https://vortibdsandbox.cloudcampus24.com/home?redirectURL=%2Fdashboard%2Fdownload%3FIsError%3DFalse%26ErrorMessage%3DSuccess%26OrderId%3D5297317c-3638-4b0e-b4d8-6fb85092cc81%26PaymentStatus%3D2

    // http://localhost:4200/dashboard/download?IsError=False&ErrorMessage=Success&OrderId=5297317c-3638-4b0e-b4d8-6fb85092cc81&PaymentStatus=2

    
    
  }


  Get_Download_Permission(): void
  {

    this._dashboardService.DlPermission(this.OrderId).subscribe((data: any) =>
    {
      console.log(data, "data");

      this.PermissionData = data.data;

      this.TranStatus = data.data.TranStatus;

      if (this.PermissionData.AdmitCard == false)
      {
        this.TypeList = this.TypeList.filter(function (obj)
        {
          return obj.id !== 'AdmitCard';
        });
      }

      if (this.PermissionData.AdmissionForm == false)
      {
        this.TypeList = this.TypeList.filter(function (obj)
        {
          return obj.id !== 'AdmissionForm';
        });
      }

      if (this.PermissionData.IDCard == false)
      {
        this.TypeList = this.TypeList.filter(function (obj)
        {
          return obj.id !== 'IDCard';
        });
      }

      if (this.PermissionData.TransportCard == false)
      {
        this.TypeList = this.TypeList.filter(function (obj)
        {
          return obj.id !== 'TransportCard';
        });
      }

      if (this.PermissionData.LibraryCard == false)
      {
        this.TypeList = this.TypeList.filter(function (obj)
        {
          return obj.id !== 'LibraryCard';
        });
      }
      this.TypeList2 = [];
      // Utils.getImage_m(data.data)
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Get_Download_Permission_ApplicantId(): void
  {
    this.fetchingDlPermission = true;
    this._dashboardService.DlPermissionApplicantID(this.acb.ApplicationId).subscribe((data: any) =>
    {
      console.log(data, "data");

      this.PermissionData = data.data;

      if (this.PermissionData != null)
      {
        this.hasDlPermission = true;
        this.TranStatus = data.data.TranStatus;

        if (this.PermissionData.AdmitCard == false)
        {
          this.TypeList2 = this.TypeList2.filter(function (obj)
          {
            return obj.id !== 'AdmitCard';
          });
        }

        if (this.PermissionData.AdmissionForm == false)
        {
          this.TypeList2 = this.TypeList2.filter(function (obj)
          {
            return obj.id !== 'AdmissionForm';
          });
        }

        if (this.PermissionData.IDCard == false)
        {
          this.TypeList2 = this.TypeList2.filter(function (obj)
          {
            return obj.id !== 'IDCard';
          });
        }

        if (this.PermissionData.TransportCard == false)
        {
          this.TypeList2 = this.TypeList2.filter(function (obj)
          {
            return obj.id !== 'TransportCard';
          });
        }

        if (this.PermissionData.LibraryCard == false)
        {
          this.TypeList2 = this.TypeList2.filter(function (obj)
          {
            return obj.id !== 'LibraryCard';
          });
        }

      }
      else
      {
        this.hasDlPermission = false;
      }
      this.fetchingDlPermission = false;
      this.TypeList = [];
      console.log(this.OrderId, 'OrderId');

      // Utils.getImage_m(data.data)
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.fetchingDlPermission = false;
      this.hasDlPermission = false;
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }



  Download_ac(): void
  {

    this._dashboardService.DlAdminCard(this.acb).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      // Utils.getImage_m(data.data)
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  Download_admitCard(): void
  {
    this._dashboardService.DlAdminCard(this.acb != null ? this.acb.ApplicationId : this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Admit Card')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_applicationForm(): void
  {
    this._dashboardService.DlApplicationForm(this.acb != null ? this.acb.ApplicationId : this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Application Form')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_idCard(): void
  {
    this._dashboardService.DlIdCard(this.acb != null ? this.acb.ApplicationId : this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'ID Card')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_libraryCard(): void
  {
    this._dashboardService.DlLibraryCard(this.acb != null ? this.acb.ApplicationId : this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Library Card')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_transportApplyForm(): void
  {
    this._dashboardService.DlTransportApplyForm(this.acb != null ? this.acb.ApplicationId : this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Transport Apply Form')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  executeFunction(functionName: string)
  {
    switch (functionName)
    {
      case 'Download_admitCard':
        this.Download_admitCard();
        break;

      case 'Download_applicationForm':
        this.Download_applicationForm();
        break;

      case 'Download_idCard':
        this.Download_idCard();
        break;

      case 'Download_libraryCard':
        this.Download_libraryCard();
        break;

      case 'Download_transportApplyForm':
        this.Download_transportApplyForm();
        break;

    }
  }


}


let typeList = [
  {
    "sl": "1",
    "id": "AdmitCard",
    "type": 'Admit Card',
    "actionName": 'Download_admitCard'
  },
  {
    "sl": "2",
    "id": "AdmissionForm",
    "type": 'Application Form',
    "actionName": 'Download_applicationForm'
  },
  {
    "sl": "3",
    "id": "IDCard",
    "type": 'Id Card',
    "actionName": 'Download_idCard'
  },
  {
    "sl": "4",
    "id": "LibraryCard",
    "type": 'Library Card',
    "actionName": 'Download_libraryCard'
  },
  {
    "sl": "5",
    "id": "TransportCard",
    "type": 'Transport Apply Form',
    "actionName": 'Download_transportApplyForm'
  },

]


// public enum PaymentStatus
// {
//     [Display(Name = "Processing")]
//     Processing = 0,
//     [Display(Name = "Pending")]
//     Pending = 1,
//     [Display(Name = "Success")]
//     Success = 2,
//     [Display(Name = "Cancelled")]
//     Cancelled = 3,
//     [Display(Name = "Failed")]
//     Failed = 4,
//     [Display(Name = "Error")]
//     Error = 5,
//     [Display(Name = "System Cancelled")]
//     SystemCancelled = 6,
//     [Display(Name = "Operator Cancelled")]
//     OperatorCancelled = 7,
//     [Display(Name = "Cancelled By Customer Request")]
//     CancelledByCustomerRequest = 8,
// }



// public enum FeeType
// {
//     [Display(Name = "NotApplicable")]
//     NotApplicable = 0,
//     [Display(Name = "Admission Form Price School")]
//     AdmissionFormPriceSchool = 1,
//     [Display(Name = "Admission Form Price College")]
//     AdmissionFormPriceCollege = 2,
//     [Display(Name = "Admission Fee School")]
//     AdmissionFeeSchool = 3,
//     [Display(Name = "AdmissionFeeCollege")]
//     AdmissionFeeCollege = 4,            
// }

//    public enum TranVerifyMethod
//    {
//        Deafult = 0,
//        SYSTEM_AUTO_URL = 1,
//        SYSTEM_MANUAL_USER = 2,
//        SYSTEM_IPN = 3
//    }

//   public enum PaymentGeteways
//   {
//       None = 0,
//       SSLCommerz = 1
//   }
