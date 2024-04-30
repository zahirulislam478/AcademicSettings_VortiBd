import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subject, forkJoin, map, takeUntil } from "rxjs";
import { MatStepper, MatStepperIntl, StepperOrientation } from "@angular/material/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { FuseConfigService } from "@fuse/services/config";
import { BaseControl } from "app/models/dynamic-form";
import { DashboardService } from "../admin/dashboard/dashboard.service";
import Utils from "app/Utility/utils";
import * as moment from 'moment';
import { AdmssionStudentImportService } from "./admssion-student-import.service";
import { AdmssionStudentInfoService } from "../admssion-student-info/admssion-student-info.service";
import { SuperAdminService } from "../superAdmin/superAdmin.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddNewStudentModalComponent } from "./add-new-student-modal/add-new-student-modal.component";

@Component({
  selector: "app-admssion-student-import",
  templateUrl: "./admssion-student-import.component.html",
  styleUrls: ["./admssion-student-import.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AdmssionStudentImportComponent
{
  maxDate = new Date();


  firstDay = getFirstDayOfMonth(
    this.maxDate.getFullYear(),
    this.maxDate.getMonth(),
  );
  institutionControl = new FormControl("");
  circularControl = new FormControl("");
  classControl = new FormControl("");
  versionControl = new FormControl("");
  groupControl = new FormControl("");
  shiftControl = new FormControl("");
  categoryControl = new FormControl("");
  sessionControl = new FormControl("");
  dateFromControl = new FormControl(this.firstDay.toISOString());
  dateToControl = new FormControl(this.maxDate.toISOString());
  tranStatusControl = new FormControl("2");
  genderControl = new FormControl("B");
  orderByControl = new FormControl("APPLID");
  singleDropControl = new FormControl("ApplicantId");
  singleTextControl = new FormControl("");


  dummy = [{
    "Value": "none",
    "Text": "none",
  }];

  dummu_single_drop = dummy_single;

  dummy_tran_drop = dummy_tran;

  dummy_gender_drop = dummy_gender;

  dummy_order_drop = dummy_order;

  fetchingData = true;

  foundError = false;







  clientData = null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  Main_InstituteData: any;
  schools: any;
  Circular_OpenCirculars: any;
  circularFields: any;
  Circular_Dropdowns: any;

  fileName: string;
  file: File;

  private dialogRef1: MatDialogRef<AddNewStudentModalComponent>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _matStepperIntl: MatStepperIntl,
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    private matSnackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private _fuseConfigService: FuseConfigService,
    private _admssionStudentImportService: AdmssionStudentImportService,
    private _dashboardService: DashboardService,
    private _superAdminService: SuperAdminService,
    private dialog: MatDialog,

  )
  {
    this.clientData = JSON.parse(localStorage.getItem('clientData'));
    this.getInitialData();





  }


  getInitialData(): void
  {
    let ibody = "0";
    forkJoin([
      this._dashboardService.GetInstituteData(ibody),

    ]).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response: any) =>
      {
        console.log(response, "getInitialData");
        this.Main_InstituteData = response[0].data;
        if (this.Main_InstituteData != null)
        {
          this.schools = this.Main_InstituteData.VortiBDClients;
        }

        if (this.clientData.User.ClientId != 0)
        {
          this.institutionControl.setValue(this.clientData.User.ClientId.toString());
          this.institutionControl.disable();
          this.instituteChange(this.clientData.User.ClientId.toString())
        }

        this._changeDetectorRef.markForCheck();

        this.fetchingData = false;
      },
      (error: any) =>
      {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, "error");
      }
    );
  }

  instituteChange(event: any): void
  {
    this.circularFields = null;
    this.Circular_Dropdowns = null;
    this.circularControl.setValue('');
    this.singleDropControl.setValue('ApplicantId');
    this.singleTextControl.setValue("");

    this.tranStatusControl.setValue('2');
    this.genderControl.setValue('B');
    this.orderByControl.setValue('APPLID');

    this.classControl.setValue("");
    this.versionControl.setValue("");
    this.groupControl.setValue("");
    this.shiftControl.setValue("");
    this.categoryControl.setValue("");
    this.sessionControl.setValue("");
    this.dateFromControl.setValue(this.firstDay.toISOString());
    this.dateToControl.setValue(this.maxDate.toISOString());


    let body = '';
    if (event.value != null)
    {
      body = `${event.value}`;
    } else
    {
      body = `${event}`;
    }

    this.getCircularOpenCirculars(body);
  }

  getCircularOpenCirculars(ibody): void
  {
    this._superAdminService.GetCircularOpenCirculars(ibody).subscribe(
      (data: any) =>
      {
        console.log(data, 'getCircularOpenCirculars');
        this.Circular_OpenCirculars = data.data;
        if (this.Circular_OpenCirculars != null)
        {
          this.circularFields = this.Circular_OpenCirculars.Circulars;
          console.log(this.circularFields, 'circularFields');

          // if (this.circularFields.length == 1)
          // {
          //   this.circularControl.setValue(this.circularFields[0].CircularId)
          // }
        }
        this.fetchingData = false;
      },
      (error: any) =>
      {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, "error");
      }
    );
  }

  CircularChange(event: any): void
  {
    this.Circular_Dropdowns = null;
    this.singleDropControl.setValue('ApplicantId');
    this.singleTextControl.setValue("");

    this.tranStatusControl.setValue('2');
    this.genderControl.setValue('B');
    this.orderByControl.setValue('APPLID');

    this.classControl.setValue("");
    this.versionControl.setValue("");
    this.groupControl.setValue("");
    this.shiftControl.setValue("");
    this.categoryControl.setValue("");
    this.sessionControl.setValue("");
    this.dateFromControl.setValue(this.firstDay.toISOString());
    this.dateToControl.setValue(this.maxDate.toISOString());

    let body = '';
    if (event.value != null)
    {
      body = `${event.value}`;
    } else
    {
      body = `${event}`;
    }

    this.getCircularDropdowns(body);
  }

  getCircularDropdowns(CircularId): void
  {
    this._superAdminService.GetCircularDropdowns(this.institutionControl.value, CircularId).subscribe(
      (data: any) =>
      {
        console.log(data, 'getCircularDropdowns');
        this.Circular_Dropdowns = data.data;
        if (this.Circular_Dropdowns.OpenProgramGroups.length == 0)
        {
          this.groupControl.disable();
        }

        this.fetchingData = false;
      },
      (error: any) =>
      {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, "error");
      }
    );
  }


  SearchStudents(type): void
  {
    let body = {
      "clientId": Number(this.institutionControl.value),
      "isOnlySuccess": true,
      "circularId": type == 'all' ? this.circularControl.value : 0,
      "circularDetailId": 0,
      "tranStatus": type == 'all' ? Number(this.tranStatusControl.value) : 0,
      "programID": type == 'all' ? Number(this.classControl.value) : 0,
      "versionID": type == 'all' ? Number(this.versionControl.value) : 0,
      "shiftID": type == 'all' ? Number(this.shiftControl.value) : 0,
      "studentCatID": type == 'all' ? Number(this.categoryControl.value) : 0,
      "sessionID": type == 'all' ? Number(this.sessionControl.value) : 0,
      "groupID": type == 'all' ? Number(this.groupControl.value) : 0,
      "gender": type == 'all' ? this.genderControl.value != 'B' ? this.genderControl.value : '' : '',
      "applyDateFrom": type == 'all' ? this.dateFromControl.value : this.firstDay.toISOString(),
      "applyDateTo": type == 'all' ? this.dateToControl.value : this.maxDate.toISOString(),
      "applicantId": type == 'single' ? this.singleDropControl.value == 'ApplicantId' ? Number(this.singleTextControl.value) : 0 : 0,
      "contactNo": type == 'single' ? this.singleDropControl.value == 'MobileNumber' ? this.singleTextControl.value : '' : '',
      "applicantName": type == 'single' ? this.singleDropControl.value == 'ApplicantName' ? this.singleTextControl.value : '' : '',
      "bankTransactionId": type == 'single' ? this.singleDropControl.value == 'TransectionID' ? this.singleTextControl.value != '' ? this.singleTextControl.value : '' : '' : '',
      "orderBy": type == 'all' ? this.orderByControl.value : '',
    }

    console.log(body, 'body');
    // debugger;

    this._superAdminService.GetAppliedCandidates(body).subscribe((response: any) =>
    {
      // debugger;
      console.log(response, "response");

    }, (error: any) =>
    {

      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Refresh(): void
  {
  }

  OpenAddNewModal(): void
  {
    this.dialogRef1 = this.dialog.open(AddNewStudentModalComponent, {
      disableClose: true,
      data: {
        ClientId: this.institutionControl.value,
        CircularId: this.circularControl.value,
      }
    });

    this.dialogRef1.afterClosed().subscribe(result =>
    {
      if (result == "call_GetInitialPageData")
      {
        // this.GetInitialPageData();
      }
    });
  }

  ngOnDestroy(): void
  {


    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  onFileSelected(event: Event): void
  {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files)
    {
      // for (let i = 0; i < inputElement.files.length; i++)
      // {
      //   // const file = inputElement.files[i];
      //   this.file = inputElement.files[0];
      //   this.fileName = inputElement.files[0].name;
      //   console.log(this.file, "file");
      // }

      this.file = inputElement.files[0];
      this.fileName = inputElement.files[0].name;
      console.log(this.file, "file");
    }
  }

  UploadExcel(): void
  {
    const formData = new FormData();
    formData.append('file', this.file);

    this._admssionStudentImportService.UploadStudentsExcel(this.institutionControl.value, this.circularControl.value, formData).subscribe(
      (response: any) =>
      {
        // Handle success response
        console.log(response, 'response');

        if (response.isError == false)
        {
          this.matSnackBar.open("Upload successfully!", "Close", {
            duration: 3000,
          });
          
        } else
        {
          this.matSnackBar.open("Failed to Upload.", "Close", {
            duration: 3000,
          });
        }
      },
      (error: any) =>
      {
        // Handle error response
        this.matSnackBar.open("Something went wrong.", "Close", {
          duration: 3000,
        });
        console.error(error);
      }
    );
  }



  removeFile()
  {
    this.file = null;
    this.fileName = '';
    console.log(this.file, "file");

  }






}



let dummy_single = [
  {
    "Value": "ApplicantId",
    "Text": "Applicant Id",
  },
  {
    "Value": "MobileNumber",
    "Text": "Mobile Number",
  },
  {
    "Value": "TransectionID",
    "Text": "Transection ID",
  },
  {
    "Value": "ApplicantName",
    "Text": "Applicant Name",
  },
];

let dummy_tran = [
  {
    "Value": "2",
    "Text": "Success",
  },
  {
    "Value": "0",
    "Text": "Processing",
  },
  {
    "Value": "3",
    "Text": "Cancelled",
  },
  {
    "Value": "4",
    "Text": "Failed",
  },
]

let dummy_gender = [
  {
    "Value": "B",
    "Text": "Both",
  },
  {
    "Value": "M",
    "Text": "Male",
  },
  {
    "Value": "F",
    "Text": "Female",
  },
]

let dummy_order = [
  {
    "Value": "APPLID",
    "Text": "Tracking No",
  },
  {
    "Value": "ROLL",
    "Text": "Roll No",
  }
]

function getFirstDayOfMonth(year, month)
{
  return new Date(year, month, 1);
}
