import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { JobPortalService } from 'app/modules/job-portal/job-portal.service';
import { Institute_Pair } from 'app/modules/superAdmin/superAdmin.data';
import * as moment from 'moment';

@Component({
  selector: 'app-job-circular-setup',
  templateUrl: './job-circular-setup.component.html',
  styleUrls: ['./job-circular-setup.component.scss'],
})
export class JobCircularSetupModalComponent implements OnInit {
  @ViewChild('jobCircularNgForm') jobCircularNgForm: NgForm;
  jobCircularModalForm: UntypedFormGroup;

  Circular_InstituteData: any;

  isChecked = true;
  fetchingData = true;
  foundError = false;

  job = Institute_Pair;

  todayDate = new Date();

  details: string;
  institueName: string;
  errorMessage: string = null;
  alert: any;
  data_: any;
  public Editor = ClassicEditor;

  ckData = `<p>Hello, world! ckData</p>`;
  clientData: any;
  circular: any;
  CircularData: any;
  signFilename: string = null;
  signImageUrl: any = '/assets/images/signature.png';

  constructor(
    private _jobPortalService: JobPortalService,
    private _matDialog: MatDialogRef<JobCircularSetupModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) {
    this.job = this.dialogdata.institutes;
    this.circular = this.dialogdata.circular;
    this.clientData = JSON.parse(localStorage.getItem('clientData'));

    this.jobCircularModalForm = this._formBuilder.group({
      instituteName: ['', Validators.required],
      circularName: ['', [Validators.required]],
      openDate: ['', Validators.required],
      closeDate: [{ value: '', disabled: true }, Validators.required],
      circularUrl: ['', Validators.required],
      videoUrl: [''],
      status: [true, Validators.required],
      uniqueApplyCheckByNID: [true, Validators.required],
      ckData: [''],
    });

    if (this.clientData.User.ClientId != 0) {
      this.jobCircularModalForm.patchValue({
        instituteName: this.clientData.User.ClientId.toString(),
      });

      this.jobCircularModalForm.controls['instituteName'].disable();
    }

    if (this.circular != null) {
      this.getCircularData(this.circular.CircularId);
    }
  }

  ngOnInit(): void {}

  getCircularData(id): void {
    this._jobPortalService.GetCircularSingleCircular(id).subscribe(
      (data: any) => {
        console.log(data, 'getCircularData');

        this.CircularData = data.data;

        this.jobCircularModalForm.patchValue({
          instituteName: this.CircularData.ClientId.toString(),
          circularName: this.CircularData.CircularTitle,
          openDate: new Date(this.CircularData.CircularOpenDate),
          closeDate: new Date(this.CircularData.CircularCloseDate),
          circularUrl: this.CircularData.Url,
          videoUrl: this.CircularData.VideoUrl,
          status: this.CircularData.ActiveStatus,
          uniqueApplyCheckByNID: this.CircularData.uniqueApplyCheckByNID,
          ckData: this.CircularData.ApplyInstructions,
        });
        this.jobCircularModalForm.get('closeDate').enable();
        this.jobCircularModalForm.get('instituteName').disable();

        this.fetchingData = false;
      },
      (error: any) => {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, 'error');
      }
    );
  }

  getCircularInstituteData(): void {
    this._jobPortalService.GetCircularClients().subscribe(
      (data: any) => {
        this.Circular_InstituteData = data.data;
        if (this.Circular_InstituteData != null) {
          this.job = this.Circular_InstituteData.VortiBDClients;
        }
        this.fetchingData = false;
      },
      (error: any) => {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, 'error');
      }
    );
  }

  circularInstituteChange(event): void {
    const result = this.job.filter((ins) => ins.value == event.source.value);
  }

  createJobCircular() {
    let csc_form = this.jobCircularModalForm.getRawValue();

    let body = {
      id: 0,
      clientId: csc_form.instituteName ? csc_form.instituteName : '',
      circularTitle: csc_form.circularName ? csc_form.circularName : '',
      circularType: 'Job',
      url: csc_form.circularUrl ? csc_form.circularUrl : '',
      openDate: csc_form.openDate ? csc_form.openDate : '',
      closeDate: csc_form.closeDate ? csc_form.closeDate : '',
      isStrictMode: false,
      activeStatus: true,
      applyInstructions: csc_form.ckData ? csc_form.ckData : '',
      alertSMSAfterApply: false,
      smsTemplate: 'DEFAULT',
      admitCard: false,
      admitCardTemplate: 'DEFAULT',
      admitCardAvailableFrom: moment(new Date()).format(),
      admitCardExamSchedule: false,
      admitCardInstructions: 'DEFAULT',
      admissionForm: false,
      admissionFormTemplate: 'DEFAULT',
      idCard: false,
      idCardTemplate: 'DEFAULT',
      transportCard: false,
      transportCardTemplate: 'DEFAULT',
      libraryCard: false,
      libraryCardTemplate: 'DEFAULT',
      uniqueApplyCheckByNID: csc_form.uniqueApplyCheckByNID,
      videoUrl: csc_form.videoUrl ? csc_form.videoUrl : '',
      signature: true,
      signaturePath: '',
      signatureLabel: '',
      applyDeclaration: '',
      admitSignName: '',
      applicantCV: true,
      applicantCVTemplate: '',
    };

    console.log(body, 'createJobCircular body');

    this._jobPortalService.SaveCircular(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Job Circular Created', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this._matDialog.close({
            type: 'call_InitialPage',
            clientId: csc_form.instituteName,
          });
        } else {
          this.matSnackBar.open(
            "Couldn't Save Information, Please Try Again",
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.matSnackBar.open(
          "Couldn't Save Information, Please Try Again",
          'Close',
          {
            verticalPosition: 'top',
            duration: 2000,
          }
        );
        console.log(error, 'error');
      }
    );
  }

  updateJobCircular() {
    let csc_form = this.jobCircularModalForm.getRawValue();

    let body = {
      id: this.CircularData.CircularId,
      clientId: csc_form.instituteName ? csc_form.instituteName : '',
      circularTitle: csc_form.circularName ? csc_form.circularName : '',
      circularType: 'Job',
      url: csc_form.circularUrl ? csc_form.circularUrl : '',
      openDate: csc_form.openDate ? csc_form.openDate : '',
      closeDate: csc_form.closeDate ? csc_form.closeDate : '',
      isStrictMode: false,
      activeStatus: csc_form.status,
      applyInstructions: csc_form.ckData ? csc_form.ckData : '',
      uniqueApplyCheckByNID: csc_form.uniqueApplyCheckByNID,
      videoUrl: csc_form.videoUrl ? csc_form.videoUrl : '',
      signature: true,
      signatureLabel: '',
      applyDeclaration: 'sring',
      admitSignName: '',
      signaturePath: '',
    };

    console.log(body, 'updateJobCircular body');

    this._jobPortalService.UpdateCircular(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Job Circular Created', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this._matDialog.close({
            type: 'call_InitialPage',
            clientId: csc_form.instituteName,
          });
        } else {
          this.matSnackBar.open(
            "Couldn't Save Information, Please Try Again",
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.matSnackBar.open(
          "Couldn't Save Information, Please Try Again",
          'Close',
          {
            verticalPosition: 'top',
            duration: 2000,
          }
        );
        console.log(error, 'error');
      }
    );
  }

  fromDateChanged(event: MatDatepickerInputEvent<Date>): void {
    const toDateControl = this.jobCircularModalForm.get('closeDate');
    if (toDateControl?.value && toDateControl.value < event.value) {
      toDateControl.setValue(null);
    }
    toDateControl?.enable();
    toDateControl?.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false,
    });
  }

  clearForm(): void {
    this.jobCircularNgForm.resetForm();
  }
}
