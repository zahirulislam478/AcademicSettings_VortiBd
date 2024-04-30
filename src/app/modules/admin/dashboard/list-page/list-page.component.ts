/** @format */
import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import ConstantNames from "app/Urlconfig/constantNames";
import Utils from "app/Utility/utils";
import { isEmpty } from "lodash-es";
import { Subject, distinctUntilChanged, forkJoin, takeUntil } from "rxjs";
import { Dummy_Pair, FormParam_Interface } from "../dashboard.data";
import { DashboardService } from "../dashboard.service";
import { FuseConfigService } from "@fuse/services/config";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-list-page",
  templateUrl: "./list-page.component.html",
  styleUrls: ["./list-page.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class DashboardListPageComponent
{
  appData = [
    {
      id: "1",
      url: "https://vortibd.com/media/icon/2018_10_21_12_23_25_logo.gif",
      collegeName: "Dhaka Cantonment Girls' Public School & College",
      appStatus: "Applied for Eight",
      appDate: "Created Nov 01,2022",
      paymentStatus: "Paid",
      appUrl: "assets/images/avatars/brian-hughes.jpg",
      appName: "Asifur Rahman",
      applicationId: "Application ID 220112",
      status: "Download",
      peek: "Hide",
    },
    {
      id: "2",
      url: "https://vortibd.com/media/icon/2022_11_15_11_45_26_2021_11_14_12_24_53_spsc.jpg",
      collegeName: "Shaheed Police Smrity College",
      appStatus: "Apply for Nine",
      appDate: "Created Nov 01,2022",
      paymentStatus: "Unpaid",
      appUrl: "assets/images/avatars/female-01.jpg",
      appName: "Dorin Islam",
      applicationId: "Application ID 220162",
      status: "Pay Now",
      peek: "Hide",
    },
    {
      id: "3",
      url: "https://vortibd.com/media/icon/2018_11_07_05_15_02_logo_header.png",
      collegeName: "Ispahani Public School & College",
      appStatus: "Applied for Eight",
      appDate: "Created Nov 01,2022",
      paymentStatus: "Draft",
      appUrl: "assets/images/avatars/female-04.jpg",
      appName: "Pial Paul",
      applicationId: "Application ID 223412",
      status: "Apply Now",
      peek: "Hide",
    },
  ];

  displayedColumns: string[] = ["ProgramName", "VersionName", "ShiftName", "SessionName", "GroupName", "FormAmount", "ConvAmount", "Action",];
  institueName: string;

  collegeOptions: boolean = false;
  isResetButtonDisabled: boolean = true;
  isNextButtonDisabled: boolean = true;
  isSchoolNextButtonDisabled: boolean = true;
  isInstituteVisibleOne: boolean = false;
  isInstituteVisibleTwo: boolean = true;
  isListPage: boolean = false;
  isProfileVisible = false;
  firstNextButton: boolean = true;
  showStepper: boolean = false;
  schoolNextButton = false;
  schoolResettButton = false;
  schoolResetButtonTwo = false;
  applicantBanner = false;
  imageSrc = "./assets/images/placeholderImage.png";

  versionControl = new FormControl();
  circularControl = new FormControl();
  categoryControl = new FormControl();
  sessionControl = new FormControl();
  shiftControl = new FormControl();
  institutionControl = new FormControl("");
  admissionClassControl = new FormControl({ value: "", disabled: true });
  groupControl = new FormControl({ value: "", disabled: true });
  schoolGroupControl = new FormControl({ value: "", disabled: true });
  sscRollControl = new FormControl({ value: "", disabled: false });
  boardControl = new FormControl({ value: "", disabled: false });
  sscPassingYearControl = new FormControl({ value: "", disabled: false });
  profileControl = new FormControl({ value: "", disabled: false });
  searchControl = new FormControl({ value: "", disabled: true });

  public data: any[] = [];
  public delayedData: any[] = [];
  selectedStudent: any;
  Selected_AutoSearchProfile: any;
  schoolStudents: any;
  circularFields: any;
  showGroupNameColumn: boolean = true;

  schools = Dummy_Pair;
  programs = Dummy_Pair;
  versions = null;
  categories = null;
  sessions = null;
  shifts = null;
  groups = null;
  boards = null;
  sscYears = null;
  circulars = null;
  Main_InstituteData = null;
  Main_OpenProgramData = null;
  Main_OpenCircularData = null;
  studentName = null;
  studentImage = null;
  fetchingData = true;
  foundError = false;
  ProgramType = "";
  clientData = null;
  clientType = 'APPLICANT';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private matSnackBar: MatSnackBar,
    private _fuseConfigService: FuseConfigService,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,

  )
  {


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
    this.clientData = JSON.parse(this._authService.clientData);

    if (this.clientData.User.RoleNames.includes("ADMIN") == true)
    {
      this.setLayout('classy');
      this.clientType = 'ADMIN';

    } else
    {
      this.setLayout('admin');
      this.clientType = 'APPLICANT';
      this.getInitialData();
    }

    setTimeout(() =>
    {
      this.applicantBanner = true;
      this.delayedData = this.data;
    }, 2000);

    // this.sscRollControl.valueChanges.subscribe((val) =>
    // {
    //   if (val.length === 6)
    //   {
    //     this.boardControl.enable();
    //     this.groupControl.disable();
    //   } else if (val.length >= 1)
    //   {
    //     this.boardControl.disable();
    //     this.groupControl.disable();
    //   } else
    //   {
    //     this.boardControl.disable();
    //     this.groupControl.enable();
    //   }
    // });


    this.searchControl = new FormControl('', [Validators.pattern('^[a-zA-Z .]*$')]);

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe((value) =>
      {
        if (value.length >= 2 && /^[a-zA-Z]+$/.test(value))
        {
          this._dashboardService.AutoCompleteStudent({ q: value }).subscribe((data) =>
          {
            console.log(data, 'AutoCompleteStudent');
            this.schoolStudents = data.data;
          });
          // this.boardControl.disable();
          this.schoolGroupControl.disable();
          this.groupControl.disable();
          this.isSchoolNextButtonDisabled = false;
          this.admissionClassControl.disable();
          this.categoryControl.disable();
        } else if (value.length < 2 || /\d/.test(value))
        {
          this.schoolStudents = [];
          this.Selected_AutoSearchProfile = null;
          this.isSchoolNextButtonDisabled = true;
        } else
        {
          this.isSchoolNextButtonDisabled = false;
        }
      });
  }

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  showAll()
  {
    this.delayedData = this.appData;
  }

  showPaid()
  {
    this.delayedData = this.appData.filter(item => item.paymentStatus === 'Paid');
  }

  showUnpaid()
  {
    this.delayedData = this.appData.filter(item => item.paymentStatus === 'Unpaid');
  }

  showDraft()
  {
    this.delayedData = this.appData.filter(item => item.paymentStatus === 'Draft');
  }

  hideItem(item: any)
  {
    this.delayedData = this.delayedData.filter(x => x !== item);
  }

  hideAll()
  {
    this.delayedData = [];
  }

  getInitialData(): void
  {
    let ibody = "0";
    forkJoin([
      this._dashboardService.GetInstituteData(ibody),
      this._dashboardService.GetDashboardProfiles()
    ]).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response: any) =>
      {
        console.log(response, "getInitialData");
        this.Main_InstituteData = response[0].data;
        if (this.Main_InstituteData != null)
        {
          this.schools = this.Main_InstituteData.VortiBDClients;
        }

        let _SelectedClient = localStorage.getItem('_SelectedClient');
        if (_SelectedClient != null)
        {
          this.institutionControl.setValue(_SelectedClient.toString());
          this.institutionControl.disable();
          this.instituteChange(_SelectedClient);
          this.admissionClassControl.enable();
        }

        this.data = response[1].data;

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

  getInstituteData(): void
  {
    let ibody = "0";
    this._dashboardService.GetInstituteData(ibody).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (data: any) =>
      {
        console.log(data, "getInstituteData");
        this.Main_InstituteData = data.data;
        if (this.Main_InstituteData != null)
        {
          this.schools = this.Main_InstituteData.VortiBDClients;
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

  getOpenProgramsData(ibody): void
  {
    this._dashboardService.GetOpenProgramsData(ibody).subscribe(
      (data: any) =>
      {
        console.log(data, "getOpenProgramsData");

        this.Main_OpenProgramData = data.data;

        if (this.Main_OpenProgramData != null)
        {
          this.programs = this.Main_OpenProgramData.AddmissionOpenPrograms;
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

  getOpenProgramsDetails(ibody): void
  {
    this._dashboardService.GetOpenProgramsDetails(ibody).subscribe(
      (data: any) =>
      {
        console.log(data, "getOpenProgramsDetails");
        this.Main_OpenProgramData = data.data;
        if (this.Main_OpenProgramData != null)
        {
          if (!isEmpty(this.Main_OpenProgramData.OpenProgramVersions))
          {
            this.versions = this.Main_OpenProgramData.OpenProgramVersions;
            if (this.versions.length == 1)
            {
              this.versionControl.setValue(this.versions[0].value);
            }
            // console.log(this.versions, "versions");
          }
          if (!isEmpty(this.Main_OpenProgramData.OpenCirculars))
          {
            this.circulars = this.Main_OpenProgramData.OpenCirculars;
            if (this.circulars.length == 1)
            {
              this.circularControl.setValue(this.circulars[0].value);
            }
            // console.log(this.circulars, "circulars");
          }
          if (!isEmpty(this.Main_OpenProgramData.OpenProgramCategories))
          {
            this.categories = this.Main_OpenProgramData.OpenProgramCategories;
            // if (this.categories.length == 1)
            // {
            //   this.categoryControl.setValue(this.categories[0].value);
            // }
          }
          if (!isEmpty(this.Main_OpenProgramData.OpenProgramSessions))
          {
            this.sessions = this.Main_OpenProgramData.OpenProgramSessions;
            if (this.sessions.length == 1)
            {
              this.sessionControl.setValue(this.sessions[0].value);
            }
          }
          if (!isEmpty(this.Main_OpenProgramData.OpenProgramShifts))
          {
            this.shifts = this.Main_OpenProgramData.OpenProgramShifts;
            if (this.shifts.length == 1)
            {
              this.shiftControl.setValue(this.shifts[0].value);
            }
          }

          if (!isEmpty(this.Main_OpenProgramData.OpenProgramBoards))
          {
            this.boards = this.Main_OpenProgramData.OpenProgramBoards;
            if (this.boards.length == 1)
            {
              this.boardControl.setValue(this.boards[0].value);
            }
          }
          if (!isEmpty(this.Main_OpenProgramData.SSCPassingYear))
          {
            this.sscYears = this.Main_OpenProgramData.SSCPassingYear;
            let preselected = this.sscYears.filter(
              (year) => year.selected == true
            );
            // this.sscPassingYearControl.setValue(preselected[0].value);
          }
          if (!isEmpty(this.Main_OpenProgramData.AddmissionOpenProgramDetails))
          {
            this.ProgramType =
              this.Main_OpenProgramData.AddmissionOpenProgramDetails.ProgramType.toUpperCase();
          }
          if (!isEmpty(this.Main_OpenProgramData.OpenProgramGroups))
          {
            this.groups = this.Main_OpenProgramData.OpenProgramGroups;
            if (this.groups.length == 1)
            {
              if (this.ProgramType == "C")
              {
                this.groupControl.setValue(this.groups[0].value);
                this.groupControl.enable();
                this.schoolGroupControl.disable();
              } else
              {
                this.schoolGroupControl.setValue(this.groups[0].value);
                this.schoolGroupControl.enable();
                this.groupControl.disable();
              }
            }
            if (this.ProgramType == "C")
            {
              this.groupControl.enable();
              this.schoolGroupControl.disable();
            }
            else
            {
              this.schoolGroupControl.enable();
              this.groupControl.disable();
            }
          }
        }
        this.fetchingData = false;
        // console.log( this.Main_OpenProgramData.AddmissionOpenProgramDetails.ProgramId, "programId" );
      },
      (error: any) =>
      {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, "error");
      }
    );
  }

  Select_AutoProfile(value): void
  {
    this.Selected_AutoSearchProfile = value;
    // console.log(this.Selected_AutoSearchProfile, 'Selected_AutoSearchProfile');
  }

  getOpenCirculars(ibody): void
  {
    this._dashboardService.GetOpenCirculars(ibody).subscribe(
      (data: any) =>
      {
        this.Main_OpenCircularData = data.data;

        if (this.Main_OpenCircularData != null)
        {
          this.circulars = this.Main_OpenCircularData.OpenCirculars;
          console.log(this.circulars, 'this.circulars');

          const uniqueRowsMap = new Map<string, any>();
          this.circulars.forEach(row =>
          {
            const uniqueId = `${row.ProgramName}-${row.VersionName}-${row.ShiftName}-${row.SessionName}-${row.FormAmount}-${row.ConvAmount}`;
            if (!uniqueRowsMap.has(uniqueId))
            {
              uniqueRowsMap.set(uniqueId, row);
            }
          });
          this.circularFields = Array.from(uniqueRowsMap.values());

          console.log(this.circularFields, 'this.circularFields');

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

  getOpenCirculars_N(): void
  {
    let body = {
      "clientId": this.institutionControl.value,
      "programId": this.admissionClassControl.value,
      "groupId": this.ProgramType == "C" ? this.groupControl.value : this.schoolGroupControl.value,
      "studentCatId": this.categoryControl.value
    }
    console.log(body, 'body getOpenCirculars_N');

    // debugger;
    this._dashboardService.GetOpenCircularsByGroupCat(body).subscribe(
      (data: any) =>
      {
        console.log(data, 'getOpenCirculars_N');
        this.Main_OpenCircularData = data.data;
        if (data.data.OpenCirculars != null)
        {
          this.circularFields = data.data.OpenCirculars;

          console.log(this.circularFields, 'this.circularFields');

          if (this.circularFields[0].GroupName == '')
          {
            this.displayedColumns = this.displayedColumns.filter(column => column !== 'GroupName');
          }
          else
          {
            this.displayedColumns = ["ProgramName", "VersionName", "ShiftName", "SessionName", "GroupName", "FormAmount", "ConvAmount", "Action",]
          }
        }

        // this.Main_OpenCircularData = data.data;

        // if (this.Main_OpenCircularData != null)
        // {
        //   this.circulars = this.Main_OpenCircularData.OpenCirculars;
        //   console.log(this.circulars, 'this.circulars');

        //   const uniqueRowsMap = new Map<string, any>();
        //   this.circulars.forEach(row =>
        //   {
        //     const uniqueId = `${row.ProgramName}-${row.VersionName}-${row.ShiftName}-${row.SessionName}-${row.FormAmount}-${row.ConvAmount}`;
        //     if (!uniqueRowsMap.has(uniqueId))
        //     {
        //       uniqueRowsMap.set(uniqueId, row);
        //     }
        //   });
        //   this.circularFields = Array.from(uniqueRowsMap.values());

        //   console.log(this.circularFields, 'this.circularFields');

        // }
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
    // debugger;
    let value = null;
    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }
    const result = this.schools.filter((ins) => ins.value == value);
    this.institueName = result[0].name.split("~")[0];
    this.imageSrc = `https://cloudcampus24-cdn.s3.ap-southeast-1.amazonaws.com/cdn/img/client/logo/${Utils.getInstituteName(result[0].name)}.png`;
    this.ClearControlsForInstitute();
    this.getOpenProgramsData(value);
    this.admissionClassControl.enable();
    // this.groupControl.disable();
    // this.schoolGroupControl.disable();
    // this.sscRollControl.disable();
    // this.boardControl.disable();
    // this.sscPassingYearControl.disable();
    this.profileControl.disable();
    this.isResetButtonDisabled = false;
  }

  admissionClassChange(event)
  {
    // console.log(event.source.value, event.source.selected);
    let body = `${this.institutionControl.value}/${event.source.value}`;
    console.log(body, 'body');

    this.ClearControlsForClass();
    this.getOpenProgramsDetails(body);
    // this.getOpenCirculars(body);
    this.institutionControl.disable();

    // this.sscRollControl.disable();
    // this.boardControl.disable();
    // this.sscPassingYearControl.disable();
    this.searchControl.enable();
    this.firstNextButton = false;
    this.Main_OpenProgramData = null;
    this.schoolResetButtonTwo = false;
    this.schoolResettButton = true;
    // console.log(this.institutionControl.value, "ins");
    // console.log(this.institutionControl, "ins");
    // console.log(event.source.value, "class");
  }

  versionChange(event): void
  {
    // console.log(event.source.value, event.source.selected);
  }

  categoryChange(event): void
  {
    this.schoolGroupControl.disable();
    // this.groupControl.disable();
    this.admissionClassControl.disable();
    this.isProfileVisible = true;
    this.schoolNextButton = true;
    // console.log(event.source.value, event.source.selected);
  }

  sessionChange(event): void
  {
    // console.log(event.source.value, event.source.selected);
  }

  shiftChange(event): void
  {
    // console.log(event.source.value, event.source.selected);
  }

  groupChange(event): void
  {
    this.institutionControl.disable();
    this.admissionClassControl.disable();
    // this.boardControl.disable();
    // this.sscPassingYearControl.disable();
    this.sscRollControl.enable();
    // console.log(event.source.value, event.source.selected);
  }

  sscRollChange(event): void
  {
    // console.log(event.target.value);
  }

  boardChange(event): void
  {
    this.institutionControl.disable();
    this.admissionClassControl.disable();
    // this.groupControl.disable();
    // this.sscRollControl.disable();
    this.sscPassingYearControl.enable();
    this.sscPassingYearControl.patchValue('--');
    // console.log(event.source.value, event.source.selected);
  }

  sscPassingYearChange(event): void
  {
    // this.boardControl.disable();
    this.isNextButtonDisabled = false;
    // console.log(event.source.value, event.source.selected);
  }

  showList()
  {
    this.getOpenCirculars_N();
    this.sscPassingYearControl.disable();
    this.profileControl.disable();
    this.searchControl.disable();
    this.isListPage = true;
    this.schoolNextButton = false;
    this.schoolResetButtonTwo = true;
    this.schoolResettButton = false;
    this.isNextButtonDisabled = true;
    // console.log(this.searchControl.value, "searchControl");
  }

  goToForm(circular)
  {
    // console.log(circular, "circular");
    // console.log(circular.ShiftId, "circular");

    let FormParam: FormParam_Interface = {};
    if (this.ProgramType == "C")
    {
      if (this.sscRollControl.value == "")
      {
        this.sscRollControl.markAsTouched();
        this.matSnackBar.open("Please Enter SSC Roll", "Close", {
          verticalPosition: "top",
          duration: 2000,
        });
        return;
      }
      if (!isEmpty(this.boards) && this.boardControl.value == "")
      {
        this.boardControl.markAsTouched();
        this.matSnackBar.open("Please Select A Board", "Close", {
          verticalPosition: "top",
          duration: 2000,
        });
        return;
      }
      if (!isEmpty(this.sscYears) && this.sscPassingYearControl.value == "")
      {
        this.sscPassingYearControl.markAsTouched();
        this.matSnackBar.open("Please Select SSC Passing Year", "Close", {
          verticalPosition: "top",
          duration: 2000,
        });
        return;
      }
      FormParam = {
        // AddmissionOpenProgramDetails: this.Main_OpenProgramData.AddmissionOpenProgramDetails,
        SelectedInstituteId: this.institutionControl.value,
        SelectedInstituteText: this.institutionControl.value != "" ? this.schools != null ? this.schools.filter((ins) => ins.value == this.institutionControl.value)[0].name : "" : "",



        SelectedBoard: this.boardControl.value,
        SelectedBoardText: this.boardControl.value != "" ? this.boards != null ? this.boards.filter((brd) => brd.value == this.boardControl.value)[0].name : "" : "",

        // SelectedCategory: this.categoryControl.value,
        // SelectedCategoryText: this.categoryControl.value != "" ? this.categories != null ? this.categories.filter((cat) => cat.value == this.categoryControl.value)[0].name : "" : "",

        SelectedCategory: circular.StudentCatId,
        SelectedCategoryText: circular.StudentCatName,
        SelectedCategoryType: circular.IsDefense,

        // SelectedCategoryType: this.categoryControl.value != "" ? this.categories != null ? this.categories.filter((cat) => cat.value == this.categoryControl.value)[0].isDefense.toUpperCase() : "" : "N",

        // SelectedGroup: this.groupControl.value,
        // SelectedGroupText: this.groupControl.value != "" ? this.groups != null ? this.groups.filter((grp) => grp.value == this.groupControl.value)[0].name : "" : "",

        SelectedGroup: circular.GroupId,
        SelectedGroupText: circular.GroupName,

        SelectedSSCYear: this.sscPassingYearControl.value,
        SelectedSSCYearText: this.sscPassingYearControl.value != "" ? this.sscYears != null ? this.sscYears.filter((yr) => yr.value == this.sscPassingYearControl.value)[0].name : "" : "",
        SelectedSSCRoll: this.sscRollControl.value,


        SelectedProgramId: circular.ProgramId,
        SelectedProgramName: circular.ProgramName,
        SelectedProgramType: circular.ProgramType,
        SelectedVersionName: circular.VersionName,
        SelectedShiftName: circular.ShiftName,
        SelectedSessionName: circular.SessionName,
        SelectedVersionId: circular.VersionId,
        SelectedShiftId: circular.ShiftId,
        SelectedSessionId: circular.SessionId,
        SelectedFormAmount: circular.FormAmount,
        SelectedConvAmount: circular.ConvAmount,

        SelectedStudentMasterId: this.Selected_AutoSearchProfile != null ? this.Selected_AutoSearchProfile.StudentId : 0,

        AutoCompleteName: this.searchControl.value,
        AutoCompleteImage: this.Selected_AutoSearchProfile != null ? this.Selected_AutoSearchProfile.CandidateImage : "",
        SelectedCircularDetailId: circular.CircularDetailId,
        SelectedCircularId: circular.CircularId,

        SelectedApplicationFlag: 'NewApplication',
      };
    }

    if (this.ProgramType == "S")
    {
      if (!isEmpty(this.categories) && this.categoryControl.value == "")
      {
        this.categoryControl.markAsTouched();
        this.matSnackBar.open("Please Select A Category", "Close", {
          verticalPosition: "top",
          duration: 2000,
        });
        return;
      }
      // console.log(circular.ShiftId, "circular.shiftID");
      FormParam = {
        // AddmissionOpenProgramDetails: this.Main_OpenProgramData.AddmissionOpenProgramDetails,
        SelectedInstituteId: this.institutionControl.value,
        SelectedInstituteText: this.schools != null ? this.schools.filter((ins) => ins.value == this.institutionControl.value)[0].name : "",

        // SelectedCategory: this.categoryControl.value,
        // SelectedCategoryText: this.categories != null ? this.categories.filter((cat) => cat.value == this.categoryControl.value)[0].name : "",

        SelectedCategory: circular.StudentCatId,
        SelectedCategoryText: circular.StudentCatName,
        SelectedCategoryType: circular.IsDefense,

        // SelectedCategoryType: this.categories != null ? this.categories.filter((cat) => cat.value == this.categoryControl.value)[0].isDefense.toUpperCase() : "N",

        SelectedGroup: circular.GroupId,
        SelectedGroupText: circular.GroupName,

        // SelectedGroup: this.groupControl.value,
        // SelectedGroupText: this.groups != null ? this.groups.filter((grp) => grp.value == this.groupControl.value)[0].name : "",

        AutoCompleteName: this.searchControl.value,
        AutoCompleteImage: this.Selected_AutoSearchProfile != null ? this.Selected_AutoSearchProfile.CandidateImage : "",


        SelectedProgramId: circular.ProgramId,
        SelectedProgramName: circular.ProgramName,
        SelectedProgramType: circular.ProgramType,
        SelectedVersionName: circular.VersionName,
        SelectedShiftName: circular.ShiftName,
        SelectedSessionName: circular.SessionName,
        SelectedVersionId: circular.VersionId,
        SelectedShiftId: circular.ShiftId,
        SelectedSessionId: circular.SessionId,
        SelectedFormAmount: circular.FormAmount,
        SelectedConvAmount: circular.ConvAmount,

        SelectedStudentMasterId: this.Selected_AutoSearchProfile != null ? this.Selected_AutoSearchProfile.StudentId : 0,

        SelectedCircularDetailId: circular.CircularDetailId,
        SelectedCircularId: circular.CircularId,

        SelectedApplicationFlag: 'NewApplication',

      };
      // console.log(circular.ShiftId);
    }
    localStorage.removeItem(ConstantNames.FormParam);
    this._dashboardService.FormParam = JSON.stringify(FormParam);

    localStorage.removeItem('studentSaveData');
    localStorage.removeItem('guardianSaveData');
    localStorage.removeItem('addressSaveData');
    localStorage.removeItem('prevAcademicForSchoolSaveData');
    localStorage.removeItem('prevAcademicForCollegeSaveData');
    localStorage.removeItem('courseCurriculumSaveData');
    localStorage.removeItem('acb');

    this._router.navigateByUrl("/dashboard/Apply");
    // console.log(this.circulars);
    // console.log(FormParam.SelectedShiftId, "SelectedShiftId");
    // console.log(FormParam.SelectedSSCRoll, "FormParam"); 
  }

  ClearControlsForInstitute(): void
  {
    this.admissionClassControl.setValue("");
    this.versionControl.setValue("");
    this.circularControl.setValue("");
    this.categoryControl.setValue("");
    this.sessionControl.setValue("");
    this.shiftControl.setValue("");
    this.groupControl.setValue("");
    this.schoolGroupControl.setValue("");
    this.sscRollControl.setValue("");
    this.boardControl.setValue("");
    this.sscPassingYearControl.setValue("");
    this.profileControl.setValue("");
    this.emptyDropDowns();
  }

  ClearControlsForClass(): void
  {
    this.versionControl.setValue("");
    this.circularControl.setValue("");
    this.categoryControl.setValue("");
    this.sessionControl.setValue("");
    this.shiftControl.setValue("");
    this.groupControl.setValue("");
    this.schoolGroupControl.setValue("");
    this.sscRollControl.setValue("");
    this.boardControl.setValue("");
    this.sscPassingYearControl.setValue("");
    this.profileControl.setValue("");
    this.emptyDropDowns();
  }

  ClearAllControls(): void
  {
    this.institutionControl.setValue("");
    this.admissionClassControl.setValue("");
    this.versionControl.setValue("");
    this.circularControl.setValue("");
    this.categoryControl.setValue("");
    this.sessionControl.setValue("");
    this.shiftControl.setValue("");
    this.groupControl.setValue("");
    this.schoolGroupControl.setValue("");
    this.sscRollControl.setValue("");
    this.boardControl.setValue("");
    this.sscPassingYearControl.setValue("");
    this.profileControl.setValue("");
    this.searchControl.setValue("");
  }

  emptyDropDowns(): void
  {
    this.versions = null;
    this.circulars = null;
    this.categories = null;
    this.sessions = null;
    this.shifts = null;
    this.groups = null;
    this.boards = null;
    this.ProgramType = "";
  }

  formReset(): void
  {
    this.ClearAllControls();
    this.admissionClassControl.disable();
    this.profileControl.enable();
    this.institutionControl.enable();
    this.categoryControl.enable();
    this.emptyDropDowns();
    this.imageSrc = "./assets/images/placeholderImage.png";
    this.isResetButtonDisabled = true;
    this.isInstituteVisibleOne = true;
    this.firstNextButton = true;
    this.schoolNextButton = false;
    this.isInstituteVisibleTwo = false;
    this.collegeOptions = false;
    this.isProfileVisible = false;
    this.isListPage = false;
    this.schoolResetButtonTwo = false;
    this.schoolResettButton = false;
    this.isNextButtonDisabled = true;
    this.Selected_AutoSearchProfile = null;
  }

  onCloseStepper(eventData: any)
  {
    // console.log(eventData, "onCloseStepper");
    this.showStepper = eventData.close;
    this.formReset();
    window.scroll({ top: 0, left: 0, behavior: "smooth", });
  }

  Download_admitCard(item): void
  {
    // let body = {
    //   "clientId": item.ClientId,
    //   "circularDetailId": item.CircularDetailId,
    //   "studentMasterId": item.StudentMasterId,
    //   "profileNo": ""
    // }

    this._dashboardService.DlAdminCard(item.ApplicationId).subscribe((data: any) =>
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

  Download_applicationForm(item): void
  {
    this._dashboardService.DlApplicationForm(item.ApplicationId).subscribe((data: any) =>
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

  Download_idCard(item): void
  {
    this._dashboardService.DlIdCard(item.ApplicationId).subscribe((data: any) =>
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

  Download_libraryCard(item): void
  {
    this._dashboardService.DlLibraryCard(item.ApplicationId).subscribe((data: any) =>
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

  Download_transportApplyForm(item): void
  {
    this._dashboardService.DlTransportApplyForm(item.ApplicationId).subscribe((data: any) =>
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

  ResumeApplyForm(circular): void
  {
    let FormParam: FormParam_Interface = {};
    FormParam = {
      SelectedInstituteId: circular.ClientId,
      SelectedInstituteText: circular.ClientName,


      SelectedBoard: null,
      SelectedBoardText: null,

      SelectedCategory: circular.StudentCatId,
      SelectedCategoryText: circular.StudentCatName,
      SelectedCategoryType: circular.IsDefense,
      SelectedGroup: circular.GroupId,
      SelectedGroupText: circular.GroupName,

      SelectedSSCRoll: null,

      SelectedProgramId: circular.ProgramId,
      SelectedProgramName: circular.ProgramName,
      SelectedProgramType: circular.ProgramType,
      SelectedShiftId: circular.ShiftId,
      SelectedShiftName: circular.ShiftName,
      SelectedVersionId: circular.VersionId,
      SelectedVersionName: circular.VersionName,
      SelectedSessionId: circular.SessionId,
      SelectedSessionName: circular.SessionName,
      SelectedFormAmount: circular.FormAmount,
      SelectedConvAmount: circular.ConvAmount,



      AutoCompleteName: null,
      AutoCompleteImage: "",
      SelectedCircularDetailId: circular.CircularDetailId,
      SelectedCircularId: circular.CircularId,
      SelectedCircularTitle: circular.CircularTitle,
      SelectedProfileNo: circular.ProfileNo,
      SelectedStudentMasterId: circular.StudentMasterId,
      SelectedStudentName: circular.StudentName,
      SelectedStudentId: circular.StudentId,

      SelectedApplicationFlag: 'InCompleteApplication',
    };

    localStorage.removeItem(ConstantNames.FormParam);
    this._dashboardService.FormParam = JSON.stringify(FormParam);

    localStorage.removeItem('studentSaveData');
    localStorage.removeItem('guardianSaveData');
    localStorage.removeItem('addressSaveData');
    localStorage.removeItem('prevAcademicForSchoolSaveData');
    localStorage.removeItem('prevAcademicForCollegeSaveData');
    localStorage.removeItem('courseCurriculumSaveData');
    localStorage.removeItem('acb');

    this._router.navigateByUrl("/dashboard/Apply");
  }

  ResumePayment(data): void
  {
    console.log(data, 'ResumePayment param');

    let body = {
      "applicantId": data.ApplicationId,
      // "clientId": 204, //data.ClientId,
      "studentMasterId": data.StudentMasterId,
      // "formPrice": 200,
      // "vortiBdCharge": 30,
      // "bankCharge": 0,
      // "totalTranAmount": 230
    }

    console.log(body, 'ResumePayment body');

    this._dashboardService.GetInitiatePayment(body).subscribe((data: any) =>
    {
      console.log(data, "data");

      // debugger;
      if (data.isError == false)
      {
        // this.matSnackBar.open("Initiate Payment Successful", 'Close', {
        //   verticalPosition: 'top',
        //   duration: 2000,
        // });

        if (data.data.status == "SUCCESS")
        {
          window.location.href = data.data.GatewayPageURL;
        }
        else
        {
          this.matSnackBar.open(data.data.failedreason, 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
        }


      } else
      {
        this.matSnackBar.open("Something Went Wrong, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
    }, (error: any) =>
    {
      this.matSnackBar.open("Something Went Wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  ShowDLOption(item: any)
  {
    let result: boolean;

    if (item.Applied && item.Transactions && item.Transactions.length > 0 && item.Transactions[0].TranStatus !== 0)
    {
      result = true;
    }
    else
    {
      result = false;
    }

    return result;
  }

  ShowPayOption(item: any)
  {
    let result: boolean;

    if (item.Applied && item.Transactions && item.Transactions.length == 0)
    {
      result = true;
    }
    else
    {
      result = false;
    }

    return result;
  }
}



let hghg = {
  "StudentMasterId": 104376,
  "StudentId": "E7EL8UPU1N",
  "CircularId": 4,
  "CircularDetailId": 38,
  "ClientId": 225,
  "ApplicationId": 5563,
  "ClientName": "Tamirul Millat Kamil Madrasah",
  "ClientShortName": "TMKM",
  "CircularTitle": "School Admission 2024 Boys",
  "StudentName": "MD. SHIDUL ISLAM",
  "Applied": true,
  "ApplyDate": "2023-10-31T13:39:44.143",
  "ProfileNo": "7WJ3FBMI2NIN",
  "ProgramId": 86,
  "ProgramName": "Shishu - Boys",
  "ProgramType": "S",
  "VersionName": "Bangla",
  "ShiftName": "Boys",
  "SessionName": "2024",
  "VersionId": 12,
  "ShiftId": 10,
  "SessionId": 1045,
  "GroupId": 0,
  "GroupName": "",
  "FormAmount": 200,
  "ConvAmount": 30,
  "IsDefense": "N",
  "PhotoPathS": "https://allpicture.blob.core.windows.net/vortibd\\students\\104376.jpg",
  "AdmitCard": true,
  "AdmitDownloadDate": "2023-10-22T14:31:52",
  "AdmissionForm": false,
  "IDCard": false,
  "TransportCard": false,
  "LibraryCard": false,
  "Transactions": [
    {
      "Id": 20021,
      "ClientId": 225,
      "OrderId": "e720ca5e-6667-4d92-b36e-d0f89f4a817b",
      "TranDate": "2023-10-31T19:19:48",
      "ApplyId": 5563,
      "TranAmount": 30,
      "FeeAmount": 10,
      "VortiBDCharge": 10,
      "BankCharge": 10,
      "TranStatus": 2,
      "FeeType": 0,
      "VerifyMethod": 1,
      "ManualVerifyReference": null,
      "GatewayId": 1,
      "BankTranId": "2310311920030jNQbbpKCSsFacK",
      "ChannelName_Vendor": "BKASH-BKash",
      "AgentId": "digiTaxPortal|N/A|1.0",
      "ActiveStatus": false
    },
    {
      "Id": 30036,
      "ClientId": 225,
      "OrderId": "c5f5e429-a1e6-4f62-a28e-2c5e8e35b99f",
      "TranDate": "2023-11-01T12:40:19",
      "ApplyId": 5563,
      "TranAmount": 230,
      "FeeAmount": 200,
      "VortiBDCharge": 30,
      "BankCharge": 0,
      "TranStatus": 2,
      "FeeType": 0,
      "VerifyMethod": 1,
      "ManualVerifyReference": null,
      "GatewayId": 1,
      "BankTranId": "2311011240420lBMEoYcnBdJ2i5",
      "ChannelName_Vendor": "BKASH-BKash",
      "AgentId": "digiTaxPortal|N/A|1.0",
      "ActiveStatus": false
    },
    {
      "Id": 30039,
      "ClientId": 225,
      "OrderId": "61b468f4-cd57-4894-b49c-d5a3e790d7e2",
      "TranDate": "2023-11-01T12:53:46",
      "ApplyId": 5563,
      "TranAmount": 230,
      "FeeAmount": 200,
      "VortiBDCharge": 30,
      "BankCharge": 0,
      "TranStatus": 2,
      "FeeType": 0,
      "VerifyMethod": 1,
      "ManualVerifyReference": null,
      "GatewayId": 1,
      "BankTranId": "231101125409njqtDHJFUVgSwrt",
      "ChannelName_Vendor": "BKASH-BKash",
      "AgentId": "digiTaxPortal|N/A|1.0",
      "ActiveStatus": false
    },
    {
      "Id": 30040,
      "ClientId": 225,
      "OrderId": "bd3d9271-22cd-43df-9ec3-72357854617d",
      "TranDate": "2023-11-01T13:07:10",
      "ApplyId": 5563,
      "TranAmount": 230,
      "FeeAmount": 200,
      "VortiBDCharge": 30,
      "BankCharge": 0,
      "TranStatus": 2,
      "FeeType": 0,
      "VerifyMethod": 1,
      "ManualVerifyReference": null,
      "GatewayId": 1,
      "BankTranId": "2311011307251FfuDWyNoKwyTR4",
      "ChannelName_Vendor": "BKASH-BKash",
      "AgentId": "digiTaxPortal|N/A|1.0",
      "ActiveStatus": false
    },
    {
      "Id": 40061,
      "ClientId": 225,
      "OrderId": "90e8abfe-909d-45ad-9133-3d202403e521",
      "TranDate": "2023-11-04T08:28:34",
      "ApplyId": 5563,
      "TranAmount": 230,
      "FeeAmount": 200,
      "VortiBDCharge": 30,
      "BankCharge": 0,
      "TranStatus": 2,
      "FeeType": 0,
      "VerifyMethod": 1,
      "ManualVerifyReference": null,
      "GatewayId": 1,
      "BankTranId": "23110482845WzjTtxH5FrpCJMl",
      "ChannelName_Vendor": "BKASH-BKash",
      "AgentId": "digiTaxPortal|N/A|1.0",
      "ActiveStatus": false
    }
  ]
}
