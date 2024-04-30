import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CircularModalCollegeClassSetupComponent } from '../../circular-modal/circular-modal-college-class-setup/circular-modal-college-class-setup.component';
import { CircularModalSchoolClassSetupComponent } from '../../circular-modal/circular-modal-school-class-setup/circular-modal-school-class-setup.component';
import { SuperAdminService } from '../../superAdmin.service';
import { FuseConfigService } from '@fuse/services/config';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { ConfigureDownloadsModalComponent } from '../../circular-modal/configure-downloads-modal/configure-downloads-modal.component';
import { RollStartModalComponent } from '../../circular-modal/roll-start-modal/roll-start-modal.component';
import { filter } from "rxjs";
import { FuseConfirmationService } from '@fuse/services/confirmation';
import Utils from 'app/Utility/utils';
import { ConfigureExamCodesModalComponent } from '../../circular-modal/exam-codes-modal/exam-codes-modal.component';
import { capitalize, upperCase } from 'lodash';
@Component({
  selector: 'app-circular-setting-dashboard',
  templateUrl: './circular-setting-dashboard.component.html',
  styleUrls: ['./circular-setting-dashboard.component.scss']
})
export class CircularSettingDashboardComponent implements OnInit
{

  Circular_SingleCircular: any = null;
  Circular_CircularDetails: any = null;
  FormParam: any;
  FormParamSchoolClassSetup: any;
  circularFields: any;
  // selectedCircularDetail: any;
  fileUrl;

  fetchingData = true;
  foundError = false;

  circulars = null;
  selectedCircularDetail: any = null;
  selectedProgramCircularDetail: any = null;

  programCircular = false;

  panelData = [];
  selectedCircularId: { CircularId: number } = null;


  imageSrc = "./assets/images/placeholderImage.png";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  schoolClassSetupDialogRef: MatDialogRef<CircularModalSchoolClassSetupComponent>;
  collegeClassSetupDialogRef: MatDialogRef<CircularModalCollegeClassSetupComponent>;
  configureDownloadsDialogRef: MatDialogRef<ConfigureDownloadsModalComponent>;
  configureExamCodesDialogRef: MatDialogRef<ConfigureExamCodesModalComponent>;
  rollStartDialogRef: MatDialogRef<RollStartModalComponent>;

  constructor(
    private _superAdminService: SuperAdminService,
    private _matDialog: MatDialog,
    private _fuseConfigService: FuseConfigService,
    private _router: Router,
    private matSnackBar: MatSnackBar,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,

  )
  {

    this.setLayout('classy');


    this.FormParam = JSON.parse(localStorage.getItem('CircularFormParam'));

    // if (this._superAdminService.FormParam)
    // {
    //   this.FormParam = JSON.parse(this._superAdminService.FormParam);
    // }

    if (this.FormParam && this.FormParam.SelectedCircularId)
    {
      this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
      this.getCircularDetails(this.FormParam.SelectedCircularId);
    }

    if (this.FormParam && this.FormParam.SelectedInstituteImage)
    {
      this.imageSrc = this.FormParam.SelectedInstituteImage;
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

  ngOnInit(): void
  {
    // let url: string = this._superAdminService.GetAppliedCandidatesUrl();
    // console.log(url, 'his._superAdminService.GetAppliedCandidates');
  }

  toggleProgramCircular()
  {
    this.programCircular = !this.programCircular;
  }

  getCircularSingleCircular(circularId: number): void
  {
    this._superAdminService.GetCircularSingleCircular(circularId).subscribe(
      (data: any) =>
      {
        console.log(data, 'getCircularSingleCircular');
        this.Circular_SingleCircular = data.data;
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

  AlreadyApplied()
  {
    this.matSnackBar.open("This Circular Cant be Modified, Students Already Have Applied", 'Close', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  openClassSetup(CircularData, SelectType, ActionType)
  {
    const programCircularDetailsArray = [].concat(...this.Circular_CircularDetails.map(item => item.ProgramCircularDetails));
    // if (this.FormParam.SelectedCircularType === 'College' || this.FormParam.SelectedCircularType === 'Collage')
    // {
    this.collegeClassSetupDialogRef = this._matDialog.open(CircularModalCollegeClassSetupComponent, {
      disableClose: true,
      data: {
        CircularData: CircularData,
        programCircularDetailsArray: SelectType == 'multi' ? programCircularDetailsArray : [],
        SelectType: SelectType,
        ActionType: ActionType,
        CircularType: this.FormParam.SelectedCircularType
      }
    });
    this.collegeClassSetupDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      // console.log(result);
      if (result == "call_InitialPage")
      {
        this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
        this.getCircularDetails(this.FormParam.SelectedCircularId);
      }

    })
    // }
    // else if (this.FormParam.SelectedCircularType === 'School')
    // {
    //   const dialogRef = this._matDialog.open(CircularModalSchoolClassSetupComponent);
    //   dialogRef.afterClosed().subscribe(result =>
    //   {
    //     if (result)
    //     {
    //       this.FormParamSchoolClassSetup = result;
    //       this.getCircularDetails(this.FormParam.SelectedCircularId);
    //       console.log(this.FormParamSchoolClassSetup, "FormParamSchoolClassSetupSettings");
    //     }
    //   });
    // }

  }

  openConfigureDownloads(CircularData)
  {
    if (this.FormParam.SelectedCircularType === 'College' || this.FormParam.SelectedCircularType === 'Collage')
    {
      this.configureDownloadsDialogRef = this._matDialog.open(ConfigureDownloadsModalComponent, {
        disableClose: true,
        data: {
          CircularData: CircularData
        }
      });
      this.configureDownloadsDialogRef.afterClosed().pipe(
        filter(name => name)
      ).subscribe(result =>
      {
        if (result == "call_InitialPage")
        {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }

      })
    }
    else if (this.FormParam.SelectedCircularType === 'School')
    {
      this.configureDownloadsDialogRef = this._matDialog.open(ConfigureDownloadsModalComponent, {
        disableClose: true,
        data: {
          CircularData: CircularData
        }
      });
      this.configureDownloadsDialogRef.afterClosed().pipe(
        filter(name => name)
      ).subscribe(result =>
      {
        if (result == "call_InitialPage")
        {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }

      })
      // const dialogRef = this._matDialog.open(ConfigureDownloadsModalComponent);
      // dialogRef.afterClosed().subscribe(result =>
      // {
      //   if (result)
      //   {
      //     this.FormParamSchoolClassSetup = result;
      //     this.getCircularDetails(this.FormParam.SelectedCircularId);
      //     console.log(this.FormParamSchoolClassSetup, "FormParamSchoolClassSetupSettings");
      //   }
      // });
    }

  }

  openExamCodeModal(CircularData)
  {
    this.configureExamCodesDialogRef = this._matDialog.open(ConfigureExamCodesModalComponent, {
      disableClose: true,
      data: {
        CircularData: CircularData
      }
    });
    this.configureExamCodesDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      if (result == "call_InitialPage")
      {
        this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
        this.getCircularDetails(this.FormParam.SelectedCircularId);
      }

    })


  }

  openRollConfigure(CircularId, ProgramId, RangeFrom)
  {
    this.rollStartDialogRef = this._matDialog.open(RollStartModalComponent, {
      disableClose: true,
      data: {
        CircularId: CircularId,
        ProgramId: ProgramId,
        RangeFrom: RangeFrom
      }
    });
    this.rollStartDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      if (result == "call_InitialPage")
      {
        this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
        this.getCircularDetails(this.FormParam.SelectedCircularId);
      }
    })

    // if (this.FormParam.SelectedCircularType === 'College' || this.FormParam.SelectedCircularType === 'Collage')
    // {
    //   this.rollStartDialogRef = this._matDialog.open(RollStartModalComponent, {
    //     disableClose: true,
    //     data: {
    //       CircularId: CircularId,
    //       ProgramId: ProgramId,
    //       RangeFrom: RangeFrom
    //     }
    //   });
    //   this.rollStartDialogRef.afterClosed().pipe(
    //     filter(name => name)
    //   ).subscribe(result =>
    //   {
    //     if (result == "call_InitialPage")
    //     {
    //       this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
    //       this.getCircularDetails(this.FormParam.SelectedCircularId);
    //     }
    //   })
    // }
    // else if (this.FormParam.SelectedCircularType === 'School')
    // {
    //   const dialogRef = this._matDialog.open(RollStartModalComponent);
    //   dialogRef.afterClosed().subscribe(result =>
    //   {
    //     if (result)
    //     {
    //       console.log(result);

    //       // this.FormParamSchoolClassSetup = result;
    //       // this.getCircularDetails(this.FormParam.SelectedCircularId);
    //       // console.log(this.FormParamSchoolClassSetup, "FormParamSchoolClassSetupSettings");
    //     }
    //   });
    // }

  }

  deleteCircular(id): void
  {
    this._superAdminService.deleteCircularDetails(id).subscribe((data: any) =>
    {
      console.log(data, "data");
      if (data.isError == false)
      {
        this.matSnackBar.open("Circular Deleted Successfully", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
        this.getCircularDetails(this.FormParam.SelectedCircularId);
      } else
      {
        this.matSnackBar.open("Couldn't Deleted Circular, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    }, (error: any) =>
    {
      this.matSnackBar.open("Something Went Wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }


  ConfirmDeleteCircular(id): void
  {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Circular',
      message: 'Are you sure you want to delete this circular?',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) =>
    {

      // If the confirm button pressed...
      if (result === 'confirmed')
      {

        // Delete the list
        this.deleteCircular(id)
      }
    });
  }


  ChangeCircularStatus(id, actionTag): void
  {
    this._superAdminService.changeCircularStatus(id, actionTag).subscribe((data: any) =>
    {
      console.log(data, "data");
      if (data.isError == false)
      {
        this.matSnackBar.open(`Circular ${capitalize(actionTag)}d Successfully`, 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
        this.getCircularDetails(this.FormParam.SelectedCircularId);
      } else
      {
        this.matSnackBar.open(`Couldn't ${capitalize(actionTag)} Circular, Please Try Again`, 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    }, (error: any) =>
    {
      this.matSnackBar.open("Something Went Wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  ConfirmStatusChangeCircular(id, status): void
  {
    let actionTag = status ? 'inactive' : 'active';
    let actionText = status ? 'Inactive' : 'Active';

    const confirmation = this._fuseConfirmationService.open({
      title: `Make Circular ${actionText}`,
      message: `Are you sure you want to make this circular ${actionText} ? `,
      actions: {
        confirm: {
          label: `${actionText}`
        }
      }
    });


    confirmation.afterClosed().subscribe((result) =>
    {
      if (result === 'confirmed')
      {
        this.ChangeCircularStatus(id, actionTag)
      }
    });
  }


  // setProgramCircular(event): void {
  //   this.Circular_CircularDetails.forEach((circularDetail) => {
  //     circularDetail.ProgramCircularDetails.forEach((programCircularDetail) => {
  //       if (circularDetail.ProgramId === programCircularDetail.ProgramId) {
  //             this.programCircular = !this.programCircular;
  //       }
  //       console.log(programCircularDetail.ProgramId, "programCircular");
  //     });
  //   });
  // }

  getCircularDetails(circularId: number): void
  {
    this._superAdminService.GetCircularDetails(circularId).subscribe(
      (data: any) =>
      {
        console.log(data, 'getCircularDetails');
        this.Circular_CircularDetails = data.data;
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

  GetAppliedCandidatesExcel(): void
  {
    // let body = {
    //   "applicantId": 0,
    //   "clientId": 0,
    //   "circularId": this.FormParam.SelectedCircularId, //1,
    //   "circularDetailId": 0,
    //   "tranStatus": 0,
    //   "programID": 0,
    //   "versionID": 0,
    //   "shiftID": 0,
    //   "studentCatID": 0,
    //   "sessionID": 0,
    //   "groupID": 0,
    //   "gender": "string",
    //   "fromDate": "2023-09-24T11:48:22.042Z",
    //   "toDate": "2023-09-24T11:48:22.042Z"
    // }

    let body = {
      "applicantId": 0,
      "clientId": 0,
      "circularId": 2,
      "circularDetailId": 0,
      "tranStatus": 0,
      "programID": 0,
      "versionID": 0,
      "shiftID": 0,
      "studentCatID": 0,
      "sessionID": 0,
      "groupID": 0,
      "gender": "string",
      "fromDate": "2023-09-24T11:48:22.042Z",
      "toDate": new Date(),
      "contactNo": "string",
      "applicantName": "string",
      "bankTransactionId": "string",
      "orderBy": "string"
    }
    console.log(body, 'body GetAppliedCandidatesExcel');


    this._superAdminService.GetAppliedCandidates(body).subscribe((response: any) =>
    {
      // debugger;
      console.log(response, "response");

      // if (data.isError == false)
      // {
      //   this.matSnackBar.open("School Circular Created", 'Close', {
      //     verticalPosition: 'top',
      //     duration: 2000,
      //   });
      // }
      // else
      // {
      //   this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
      //     verticalPosition: 'top',
      //     duration: 2000,
      //   });
      // }
    }, (error: any) =>
    {

      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  downloadTemplate(success): any
  {
    // debugger;
    const accessToken = localStorage.getItem('accessToken');
    let body1 = {
      // "applicantId": 0,
      // "clientId": 0,
      // "isOnlySuccess": true,
      // "circularId": this.FormParam.SelectedCircularId,
      // "circularDetailId": 0,
      // "tranStatus": 0,
      // "programID": 0,
      // "versionID": 0,
      // "shiftID": 0,
      // "studentCatID": 0,
      // "sessionID": 0,
      // "groupID": 0,
      // "gender": "string",
      // "fromDate": "2023-09-24T11:48:22.042Z",
      // "toDate": new Date().toISOString(),
    }

    let body = {
      "clientId": 0,
      "isOnlySuccess": success == 'true' ? true : false,
      "circularId": this.FormParam.SelectedCircularId,
      "circularDetailId": 0,
      "tranStatus": 0,
      "programID": 0,
      "versionID": 0,
      "shiftID": 0,
      "studentCatID": 0,
      "sessionID": 0,
      "groupID": 0,
      "gender": "",
      "applyDateFrom": null,
      "applyDateTo": null,
      "applicantId": 0,
      "contactNo": "",
      "applicantName": "",
      "bankTransactionId": "",
      "orderBy": ""
    }

    console.log(body, 'body');

    return this.http.post(this._superAdminService.GetDownloadAppliedCandidatesUrl(), body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }), responseType: 'blob'
    }).subscribe(
      res =>
      {
        console.log(res, 'res');

        saveAs(res, 'AppliedCandidates.xlsx');

        this.matSnackBar.open("Download Successful", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      },
      error =>
      {
        this.matSnackBar.open("Something went wrong, please try again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        console.log(error, 'error');
      })
  }

  DownloadLotteryToken(): void
  {
    this._superAdminService.GetLotteryToken(this.FormParam.SelectedClientId, this.FormParam.SelectedCircularId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Lottery Token')
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

  DownloadSummaryReport(): void
  {
    this._superAdminService.GetSummaryReport(this.FormParam.SelectedClientId, this.FormParam.SelectedCircularId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Summary Report')
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

  DownloadBulkImage(): void
  {
    this._superAdminService.GetBulkImage(this.FormParam.SelectedCircularId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Bulk Image')
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

  closeDetails(): void
  {
    this.selectedCircularId = null;
  }

}



