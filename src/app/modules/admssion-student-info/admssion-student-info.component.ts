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
import { AdmssionStudentInfoService } from "./admssion-student-info.service";
import { SuperAdminService } from "../superAdmin/superAdmin.service";

@Component({
  selector: "app-admssion-student-info",
  templateUrl: "./admssion-student-info.component.html",
  styleUrls: ["./admssion-student-info.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AdmssionStudentInfoComponent
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
  dateFromControl = new FormControl("");
  dateToControl = new FormControl("");
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

  studentData = [];

  foundError = false;







  clientData = null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  Main_InstituteData: any;
  schools: any;
  Circular_OpenCirculars: any;
  circularFields: any;
  Circular_Dropdowns: any;


  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _matStepperIntl: MatStepperIntl,
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    private matSnackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private _fuseConfigService: FuseConfigService,
    private _admssionStudentInfoService: AdmssionStudentInfoService,
    private _dashboardService: DashboardService,
    private _superAdminService: SuperAdminService,
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
    this.dateFromControl.setValue("");
    this.dateToControl.setValue("");


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
    this.dateFromControl.setValue("");
    this.dateToControl.setValue("");

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
      "circularId": Number(this.circularControl.value),
      "circularDetailId": 0,
      "tranStatus": type == 'all' ? Number(this.tranStatusControl.value) : 0,
      "programID": type == 'all' ? Number(this.classControl.value) : 0,
      "versionID": type == 'all' ? Number(this.versionControl.value) : 0,
      "shiftID": type == 'all' ? Number(this.shiftControl.value) : 0,
      "studentCatID": type == 'all' ? Number(this.categoryControl.value) : 0,
      "sessionID": type == 'all' ? Number(this.sessionControl.value) : 0,
      "groupID": type == 'all' ? Number(this.groupControl.value) : 0,
      "gender": type == 'all' ? this.genderControl.value != 'B' ? this.genderControl.value : '' : '',
      // "applyDateFrom": type == 'all' ? this.dateFromControl.value : this.firstDay.toISOString(),
      // "applyDateTo": type == 'all' ? this.dateToControl.value : this.maxDate.toISOString(),
      "applicantId": type == 'single' ? this.singleDropControl.value == 'ApplicantId' ? Number(this.singleTextControl.value) : 0 : 0,
      "contactNo": type == 'single' ? this.singleDropControl.value == 'MobileNumber' ? this.singleTextControl.value : '' : '',
      "applicantName": type == 'single' ? this.singleDropControl.value == 'ApplicantName' ? this.singleTextControl.value : '' : '',
      "bankTransactionId": type == 'single' ? this.singleDropControl.value == 'TransectionID' ? this.singleTextControl.value != '' ? this.singleTextControl.value : '' : '' : '',
      "orderBy": type == 'all' ? this.orderByControl.value : '',
      "applyDateFrom": type == 'all' ? this.dateFromControl.value == "" ? null : moment(this.dateFromControl.value).toISOString() : null,
      "applyDateTo": type == 'all' ? this.dateToControl.value == "" ? null : moment(this.dateToControl.value).toISOString() : null,
    }

    console.log(body, 'body');
    // debugger;

    this._superAdminService.GetAppliedCandidates(body).subscribe((response: any) =>
    {
      // debugger;
      console.log(response, "response");

      this.studentData = response.data;

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

  ngOnDestroy(): void
  {


    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
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


// Sl.	App.ID	Roll Prefix	Roll No	Index No	Name	Father's Name	Mother's Name	Date of Birth	Religion	Mobile	App. Date	Tran ID	Status	Program	Group	Version	Shift	Category	Session	Form Price	Bank Charge	Active

let ggg = [
  {
    "Id": 87683,
    "TrackingNo": 5758,
    "ApplicationDate": "2023-11-17T09:56:50.033",
    "StudentRollPrefix": "24EA9",
    "AdmissionRoll": 2001,
    "RollNo": "24EA902001",
    "StudentName": "Test Student After Roll Issue Fix",
    "NameforNameplate": "--",
    "InterestedClubs": "",
    "FatherName": "Abc",
    "FatherOffice": "dd",
    "FatherNID": "1234",
    "MotherName": "mn",
    "MotherOffice": "dd",
    "MotherNID": "1234",
    "BirthDate": "Nov 17 2023 12:00AM",
    "BirthID": "12121111111111111",
    "BloodGroup": "O+",
    "ReligionName": "Islam",
    "GenderName": "Male",
    "ContactNo": "01818076768",
    "TransactionID": "oVPCtjcKVntXpzctJEUsSjw2PuM=",
    "TranStatus": 2,
    "ProgramName": "Nine",
    "VersionName": "English",
    "ShiftName": "Morning",
    "StudentCatName": "Teacher/Staff Child",
    "SessionName": "2024",
    "GroupName": "",
    "FormAmount": 500,
    "BankCharge": 15,
    "IsActive": "Y",
    "UnitName": "",
    "Station": "",
    "Rank": null,
    "RegimentNumber": "",
    "FatherMobile": "01700000000",
    "MotherMobile": "5546",
    "PresentAddress": "dd",
    "ParmanentAddress": "dd",
    "LastExam": "dd",
    "LastExamRoll": "",
    "LastExamResult": null,
    "LastSchoolName": null,
    "InstLeaveReasons": null,
    "LegalGuardianName": "Abc",
    "GuardianIncome": null,
    "RelationWithGuardian": "Father",
    "Skill": null,
    "SiblingOneName": null,
    "SiblingOneClass": null,
    "SiblingOneSection": "--",
    "SiblingOneRoll": null,
    "SiblingTwoName": null,
    "SiblingTwoClass": null,
    "SiblingTwoSection": "--",
    "SiblingTwoRoll": null,
    "FreedomFighterQuota": "N",
    "PreEdu": {
      "SrlNo": 0,
      "ExamName": null,
      "GroupName": null,
      "BoardName": null,
      "SubjectName": null,
      "Area": null,
      "CentreCode": null,
      "EducationIns": null,
      "TotalMarks": null,
      "Without4th": null,
      "With4th": null,
      "Result": null,
      "ResultOn": null,
      "PassYear": null,
      "Session1": null,
      "Session2": null,
      "RgdNo": null,
      "RollNo": null,
      "Duration": null,
      "TotalCredit": null,
      "ExamHeld": null,
      "PreEduIsRegular": null,
      "CasualRoll": null,
      "IssueNo": null,
      "IssueDate": null,
      "IssueType": null,
      "TotalMarksWithTenSub": 0,
      "TotalMarksWithoutSub": 0
    }
  }
]
