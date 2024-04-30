/** @format */

import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import Utils from "app/Utility/utils";
import { filter, Subject } from "rxjs";
import { CircularCollegeModalComponent } from "../../circular-modal/circular-modal-college/circular-modal-college.component";
import { CircularSchoolModalComponent } from "../../circular-modal/circular-modal-school/circular-modal-school.component";
import { FormParam_Interface, Institute_Pair } from "../../superAdmin.data";
import { SuperAdminService } from "../../superAdmin.service";
import { FuseConfigService } from "@fuse/services/config";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";


@Component({
  selector: "app-circular-setting-list",
  templateUrl: "./circular-setting-list.component.html",
  styleUrls: ["./circular-setting-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CircularSettingComponent
{

  showDetails: boolean = false;
  detailValue: string;


  imageSrc = "./assets/images/placeholderImage.png";

  Circular_InstituteData: any;
  circularFields: any;
  circularActiveFields = [];
  circularShownFields = [];
  fetchingData = true;
  isChecked = true;
  foundError = false;
  public hideInactive = false;

  circulars = null;
  Circular_OpenCirculars = null;

  institueName: string;

  institutes = Institute_Pair;

  CircularType = "";

  clientData: any = null;

  circularInstitutionControl = new FormControl("");
  listInactiveToggle = new FormControl(false);
  searchControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  schoolDialogRef: MatDialogRef<CircularSchoolModalComponent>;
  collegeDialogRef: MatDialogRef<CircularCollegeModalComponent>;

  constructor(
    private _router: Router,
    private _superAdminService: SuperAdminService,
    private matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _fuseConfigService: FuseConfigService,
    private changeDetector: ChangeDetectorRef,
  )
  {
    this.setLayout('classy');
    this.clientData = JSON.parse(localStorage.getItem('clientData'));
    this.getCircularInstituteData();
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

  ngOnInit(): void { }

  openSchoolDialog()
  {
    this.schoolDialogRef = this._matDialog.open(CircularSchoolModalComponent, {
      disableClose: true,
      data: {
        institutes: this.institutes
      }
    });
    this.schoolDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      if (result.type == "call_InitialPage")
      {
        this.getCircularInstituteData();

        if (this.clientData.User.ClientId == 0)
        {
          this.circularInstitutionControl.setValue(result.clientId.toString());
          this.circularInstituteChange(result.clientId.toString())
        }
      }
      // this.circulars.push({});
    })
  }

  openEditSchoolDialog(circular)
  {
    this.schoolDialogRef = this._matDialog.open(CircularSchoolModalComponent, {
      disableClose: true,
      data: {
        institutes: this.institutes,
        circular: circular
      }
    });
    this.schoolDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      if (result.type == "call_InitialPage")
      {
        this.getCircularInstituteData();

        if (this.clientData.User.ClientId == 0)
        {
          this.circularInstitutionControl.setValue(result.clientId.toString());
          this.circularInstituteChange(result.clientId.toString())
        }
      }
      // this.circulars.push({});
    })
  }

  openCollegeDialog()
  {
    this.collegeDialogRef = this._matDialog.open(CircularCollegeModalComponent, {
      disableClose: true,
      data: {
        institutes: this.institutes
      }
    });
    this.collegeDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      if (result.type == "call_InitialPage")
      {
        this.getCircularInstituteData();

        if (this.clientData.User.ClientId == 0)
        {
          this.circularInstitutionControl.setValue(result.clientId.toString());
          this.circularInstituteChange(result.clientId.toString())
        }
      }
      // this.circulars.push({});
    })
  }

  openEditCollegeDialog(circular)
  {
    this.collegeDialogRef = this._matDialog.open(CircularCollegeModalComponent, {
      disableClose: true,
      data: {
        institutes: this.institutes,
        circular: circular
      }
    });
    this.collegeDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(result =>
    {
      if (result.type == "call_InitialPage")
      {
        this.getCircularInstituteData();

        if (this.clientData.User.ClientId == 0)
        {
          this.circularInstitutionControl.setValue(result.clientId.toString());
          this.circularInstituteChange(result.clientId.toString())
        }
      }
      // this.circulars.push({});
    })
  }

  ngOnDestroy(): void
  {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getCircularInstituteData(): void
  {
    this._superAdminService.GetCircularClients().subscribe(
      (data: any) =>
      {
        console.log(data, 'getCircularInstituteData');
        this.Circular_InstituteData = data.data;
        if (this.Circular_InstituteData != null)
        {
          this.institutes = this.Circular_InstituteData.VortiBDClients;

          if (this.clientData.User.ClientId != 0)
          {
            this.circularInstitutionControl.setValue(this.clientData.User.ClientId.toString());
            this.circularInstitutionControl.disable();
            this.circularInstituteChange(this.clientData.User.ClientId.toString())
          }
          // this.circularInstituteChange('206')
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

  getCircularOpenCirculars(ibody): void
  {
    this._superAdminService.GetCircularOpenCirculars(ibody).subscribe(
      (data: any) =>
      {
        console.log(data, 'getCircularOpenCirculars');
        this.Circular_OpenCirculars = data.data;
        if (this.Circular_OpenCirculars != null)
        {
          // this.circulars = this.Circular_OpenCirculars.Circulars;
          // this.circularFields = this.circulars;
          this.circularFields = this.Circular_OpenCirculars.Circulars;
          console.log(this.circularFields, 'circularFields');
          if (this.circularFields.length != 0)
          {
            this.circularActiveFields = this.circularFields.filter(item => item.ActiveStatus === true);
          }
          if (this.circularActiveFields.length != 0)
          {
            this.circularShownFields = this.circularActiveFields;
          }
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

  circularInstituteChange(event)
  {
    let result = null;
    let body = '';
    if (event.value != null)
    {
      result = this.institutes.filter((ins) => ins.value == event.value);
      body = `${event.value}`;
    } else
    {
      result = this.institutes.filter((ins) => ins.value == event);
      body = `${event}`;
    }
    this.institueName = result[0].name.split("~")[0];
    this.imageSrc = `https://cloudcampus24-cdn.s3.ap-southeast-1.amazonaws.com/cdn/img/client/logo/${Utils.getInstituteName(result[0].name)}.png`;
    this.getCircularOpenCirculars(body);
  }

  toggleDetails()
  {
    this.showDetails = !this.showDetails;
  }

  onValueAdded(value: string)
  {
    this.detailValue = value;
  }

  viewAll(): void
  {
    console.log("View all circulars clicked!");
  }

  onListInactiveToggle(event: MatSlideToggleChange)
  {
    if (event.checked)
    {
      this.circularShownFields = this.circularFields;
    }
    else
    {
      this.circularShownFields = this.circularActiveFields;
    }
    this.changeDetector.markForCheck();
  }

  create(circular)
  {
    console.log(circular, "circular");

    let FormParam: FormParam_Interface = {};

    FormParam = {
      selectedInstituteId: this.circularInstitutionControl.value,
      SelectedInstituteName: this.institueName,
      SelectedCircularId: circular.CircularId,
      SelectedClientId: circular.ClientId,
      SelectedClientName: circular.ClientName,
      SelectedClientShortName: circular.ClientShortName,
      SelectedCircularTitle: circular.CircularTitle,
      SelectedCircularType: circular.CircularType,
      SelectedCircularOpenDate: circular.CircularOpenDate,
      SelectedCircularCloseDate: circular.CircularCloseDate,
      SelectedTotalApplied: circular.TotalApplied,
      SelectedTotalAmount: circular.TotalAmount,
      SelectedInstituteImage: this.imageSrc,
    };

    // this._superAdminService.FormParam = JSON.stringify(FormParam);

    localStorage.setItem('CircularFormParam', JSON.stringify(FormParam));
    this._router.navigateByUrl("/superAdmin/Create");
    console.log(this.circulars);
    console.log(FormParam, "FormParam");

    console.log(FormParam.SelectedInstituteName, "SelectedCircularId");
  }

  openUrlInNewTab(url: string)
  {
    window.open(url, '_blank');
  }
}
