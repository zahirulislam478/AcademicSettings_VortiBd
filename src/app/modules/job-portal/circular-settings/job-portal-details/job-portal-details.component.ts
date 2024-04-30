import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { JobPortalService } from '../../job-portal.service';
import { JobCircularDetailsSetupComponent } from '../../modal/circular-setup/job-circular-details-setup/job-circular-details-setup.component';
import { filter } from 'rxjs';
import { ConfigureDownloadComponent } from '../../modal/configure-download/configure-download.component';
import { QualificationSetupComponent } from '../../modal/qualification-setup/qualification-setup.component';

@Component({
  selector: 'app-job-portal-details',
  templateUrl: './job-portal-details.component.html',
  styleUrls: ['./job-portal-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobPortalDetailsComponent implements OnInit {
  Circular_SingleCircular: any = null;
  Circular_CircularDetails: any = null;
  FormParam: any;
  fetchingData = true;
  foundError = false;
  circularId: number;
  imageSrc = './assets/images/placeholderImage.png';

  constructor(
    private _jobPortalService: JobPortalService,
    private _matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.FormParam = JSON.parse(localStorage.getItem('CircularFormParam'));

    if (this.FormParam && this.FormParam.SelectedCircularId) {
      this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
      this.getCircularDetails(this.FormParam.SelectedCircularId);
    }

    if (this.FormParam && this.FormParam.SelectedInstituteImage) {
      this.imageSrc = this.FormParam.SelectedInstituteImage;
    }
  }

  ngOnInit(): void {}

  getCircularSingleCircular(circularId: number): void {
    this._jobPortalService.GetCircularSingleCircular(circularId).subscribe(
      (data: any) => {
        this.Circular_SingleCircular = data.data;
        console.log(data, 'circular');

        this.circularId = this.Circular_SingleCircular.CircularId;
        console.log(this.circularId, 'circularId');
        this.fetchingData = false;
      },
      (error: any) => {
        this.foundError = true;
        this.fetchingData = false;
      }
    );
  }

  getCircularDetails(circularId: number): void {
    this._jobPortalService.GetCircularDetails(circularId).subscribe(
      (data: any) => {
        this.Circular_CircularDetails = data.data.filter(item => item.ActiveStatus);
        console.log(data, 'details');
        this.fetchingData = false;
      },
      (error: any) => {
        this.foundError = true;
        this.fetchingData = false;
      }
    );
  }

  openClassSetup(circularDetails) {
    const dialogRef = this._matDialog.open(JobCircularDetailsSetupComponent, {
      data: {
        CircularId: circularDetails.CircularId,
        CircularTitle: circularDetails.CircularTitle,
        action: 'create',
        ClientId: circularDetails.ClientId,
      },
    });
    console.log(circularDetails, 'circularDetails'),

    dialogRef
      .afterClosed()
      .pipe(filter((name) => name))
      .subscribe((result) => {
        if (result == 'call_InitialPage') {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }
      });
  }

  editCircular(Id: number, circularDetails) {
    const dialogRef = this._matDialog.open(JobCircularDetailsSetupComponent, {
      data: {
        Id: Id,
        CircularTitle: circularDetails.CircularTitle,
        CircularId: circularDetails.CircularId,
        action: 'edit', // add this line
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((name) => name))
      .subscribe((result) => {
        if (result == 'call_InitialPage') {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }
      });
  }

  duplicateCircular(Id: number, circularDetails) {
    const dialogRef = this._matDialog.open(JobCircularDetailsSetupComponent, {
      data: {
        Id: Id,
        CircularTitle: circularDetails.CircularTitle,
        CircularId: circularDetails.CircularId,
        action: 'duplicate', // add this line
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((name) => name))
      .subscribe((result) => {
        if (result == 'call_InitialPage') {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }
      });
  }

  OpenConfig(circularDetails) {
    console.log(this.circularId, 'id');
    const dialogRef = this._matDialog.open(ConfigureDownloadComponent, {
      data: {
        CircularId: circularDetails.CircularId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((name) => name))
      .subscribe((result) => {
        if (result == 'call_InitialPage') {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }
      });
  }

  openQualificationSetup(circularDetails) {
    console.log(this.circularId, 'id');
    const dialogRef = this._matDialog.open(QualificationSetupComponent, {
      data: {
        CircularId: circularDetails.CircularId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((name) => name))
      .subscribe((result) => {
        if (result == 'call_InitialPage') {
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        }
      });
  }

  deleteCircular(id): void {
    this._jobPortalService.deleteCircularDetails(id).subscribe(
      (data: any) => {
        if (data.isError == false) {
          this.matSnackBar.open('Circular Deleted Successfully', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.getCircularSingleCircular(this.FormParam.SelectedCircularId);
          this.getCircularDetails(this.FormParam.SelectedCircularId);
        } else {
          this.matSnackBar.open(
            "Couldn't Deleted Circular, Please Try Again",
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.matSnackBar.open(
          'Something Went Wrong, Please Try Again',
          'Close',
          {
            verticalPosition: 'top',
            duration: 2000,
          }
        );
      }
    );
  }

  ConfirmDeleteCircular(id): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Circular',
      message: 'Are you sure you want to delete this circular?',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.deleteCircular(id);
      }
    });
  }
}
