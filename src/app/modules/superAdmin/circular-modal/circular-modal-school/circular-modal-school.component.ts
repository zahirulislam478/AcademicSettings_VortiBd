import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Institute_Pair } from 'app/modules/superAdmin/superAdmin.data';
import { SuperAdminService } from 'app/modules/superAdmin/superAdmin.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-circular-modal-school',
    templateUrl: './circular-modal-school.component.html',
    styleUrls: ["./circular-modal-school.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CircularSchoolModalComponent implements OnInit
{
    @ViewChild('signImage') mySignPhotoInputVariable: ElementRef;
    @ViewChild('schoolCircularNgForm') schoolCircularNgForm: NgForm;
    schoolCircularModalForm: UntypedFormGroup;

    Circular_InstituteData: any;

    isChecked = true;
    fetchingData = true;
    foundError = false;

    school = Institute_Pair;

    todayDate = new Date();

    details: string;
    institueName: string;
    errorMessage: string = null;
    alert: any;
    data_: any;
    public Editor = ClassicEditor;

    ckData = `<p>Hello, world! ckData</p>`
    clientData: any;
    circular: any;
    CircularData: any;
    signFilename: string = null;
    signBase64File: string = null;
    signImageUrl: any = "/assets/images/signature.png";

    constructor(
        private _superAdminService: SuperAdminService,
        private _matDialog: MatDialogRef<CircularSchoolModalComponent>,
        private _formBuilder: UntypedFormBuilder,
        private matSnackBar: MatSnackBar,
        private changeDetector: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public dialogdata: any
    )
    {
        // this.getCircularInstituteData();
        this.school = this.dialogdata.institutes;
        this.circular = this.dialogdata.circular;
        this.clientData = JSON.parse(localStorage.getItem('clientData'));

        this.schoolCircularModalForm = this._formBuilder.group({
            instituteName: ['', Validators.required],
            circularName: ['', [Validators.required]],
            openDate: ['', Validators.required],
            closeDate: [{ value: '', disabled: true }, Validators.required],
            circularUrl: ['', Validators.required],
            videoUrl: ['',],
            status: [true, Validators.required],
            uniqStudentBirthID: [true, Validators.required],
            // signature: [false,],
            // signatureLabel: ['', []],
            ckData: [''],
        });

        if (this.clientData.User.ClientId != 0)
        {
            this.schoolCircularModalForm.patchValue({
                instituteName: this.clientData.User.ClientId.toString(),
            });

            this.schoolCircularModalForm.controls['instituteName'].disable();
        }

        if (this.circular != null)
        {
            this.getCircularData(this.circular.CircularId)
        }

    }

    ngOnInit(): void
    {
        // this.schoolCircularModalForm.get('signature').valueChanges.subscribe((value) =>
        // {
        //     if (value)
        //     {
        //         this.schoolCircularModalForm.get('signatureLabel').setValidators([Validators.required]);
        //     }
        //     else
        //     {
        //         this.schoolCircularModalForm.get('signatureLabel').clearValidators();
        //         this.removeSignPhotoFile();
        //     }
        //     this.schoolCircularModalForm.get('signatureLabel').updateValueAndValidity();
        // });
    }

    getCircularData(id): void
    {
        this._superAdminService.GetCircularSingleCircular(id).subscribe(
            (data: any) =>
            {
                console.log(data, 'getCircularData');

                this.CircularData = data.data;



                this.schoolCircularModalForm.patchValue({
                    collegeCircularType: this.CircularData.IsStrictMode ? 'StrictMode' : 'FlexibleMode',
                    instituteName: this.CircularData.ClientId.toString(),
                    circularName: this.CircularData.CircularTitle,
                    openDate: new Date(this.CircularData.CircularOpenDate),
                    closeDate: new Date(this.CircularData.CircularCloseDate),
                    circularUrl: this.CircularData.Url,
                    videoUrl: this.CircularData.VideoUrl,
                    status: this.CircularData.ActiveStatus,
                    uniqStudentBirthID: this.CircularData.UniqStudentBirthID,
                    // signature: this.CircularData.Signature,
                    // signatureLabel: this.CircularData.SignatureLabel,
                    ckData: this.CircularData.ApplyInstructions,
                })
                // this.ckData = this.CircularData.ApplyInstructions;
                // this.signImageUrl = this.CircularData.SignaturePath;
                this.schoolCircularModalForm.get('closeDate').enable();

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

    getCircularInstituteData(): void
    {
        this._superAdminService.GetCircularClients().subscribe(
            (data: any) =>
            {
                this.Circular_InstituteData = data.data;
                if (this.Circular_InstituteData != null)
                {
                    this.school = this.Circular_InstituteData.VortiBDClients;
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

    circularInstituteChange(event): void
    {
        const result = this.school.filter((ins) => ins.value == event.source.value);
    }

    createSchoolCircular()
    {
        let csc_form = this.schoolCircularModalForm.getRawValue();

        // if (csc_form.signature && this.signBase64File == null)
        // {
        //     this.matSnackBar.open("Signature photo is required", 'Close', {
        //         verticalPosition: 'top',
        //         duration: 2000,
        //     });
        //     return;
        // }

        let body = {
            // "clientId": csc_form.instituteName ? csc_form.instituteName : "",
            // "circularTitle": csc_form.circularName ? csc_form.circularName : "",
            // "circularType": "School",
            // "url": csc_form.circularUrl ? csc_form.circularUrl : "",
            // "openDate": csc_form.openDate ? csc_form.openDate : "",
            // "closeDate": csc_form.closeDate ? csc_form.closeDate : "",
            // "isStrictMode": false

            "id": 0,
            "clientId": csc_form.instituteName ? csc_form.instituteName : "",
            "circularTitle": csc_form.circularName ? csc_form.circularName : "",
            "circularType": "School",
            "url": csc_form.circularUrl ? csc_form.circularUrl : "",
            "openDate": csc_form.openDate ? csc_form.openDate : "",
            "closeDate": csc_form.closeDate ? csc_form.closeDate : "",
            "isStrictMode": false,
            "activeStatus": true,
            "applyInstructions": csc_form.ckData ? csc_form.ckData : "",
            "alertSMSAfterApply": false,
            "smsTemplate": "DEFAULT",
            "admitCard": false,
            "admitCardTemplate": "DEFAULT",
            "admitCardAvailableFrom": moment(new Date()).format(),
            "admitCardExamSchedule": false,
            "admitCardInstructions": "DEFAULT",
            "admissionForm": false,
            "admissionFormTemplate": "DEFAULT",
            "idCard": false,
            "idCardTemplate": "DEFAULT",
            "transportCard": false,
            "transportCardTemplate": "DEFAULT",
            "libraryCard": false,
            "libraryCardTemplate": "DEFAULT",
            "uniqStudentBirthID": csc_form.uniqStudentBirthID,
            // "signature": csc_form.signature,
            // "signaturePath": "",
            // "signatureLabel": csc_form.signatureLabel ? csc_form.signatureLabel : "",
            "videoUrl": csc_form.videoUrl ? csc_form.videoUrl : "",
            // "applyDeclaration": "",
            // "admitSignName": this.signFilename != null ? this.signFilename : '',
            // "admitSignBase64": this.signBase64File != null ? this.signBase64File : '',
        };

        console.log(body, 'createSchoolCircular body');
        // debugger;

        this._superAdminService.SaveCircular(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("School Circular Created", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
                this._matDialog.close({ 'type': "call_InitialPage", "clientId": csc_form.instituteName })
            } else
            {
                this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
            }
        }, (error: any) =>
        {
            this.errorMessage = error.message;
            this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            console.log(error, "error");
        });

    }

    updateSchoolCircular()
    {
        let csc_form = this.schoolCircularModalForm.getRawValue();

        // if (csc_form.signature && this.signImageUrl != this.CircularData.SignaturePath)
        // {
        //     this.matSnackBar.open("Signature photo is required", 'Close', {
        //         verticalPosition: 'top',
        //         duration: 2000,
        //     });
        //     return;
        // }

        let body = {

            "id": this.CircularData.CircularId,
            "clientId": csc_form.instituteName ? csc_form.instituteName : "",
            "circularTitle": csc_form.circularName ? csc_form.circularName : "",
            "circularType": "School",
            "url": csc_form.circularUrl ? csc_form.circularUrl : "",
            "openDate": csc_form.openDate ? csc_form.openDate : "",
            "closeDate": csc_form.closeDate ? csc_form.closeDate : "",
            "isStrictMode": false,
            "activeStatus": csc_form.status,
            "applyInstructions": csc_form.ckData ? csc_form.ckData : "",
            "uniqStudentBirthID": csc_form.uniqStudentBirthID,
            // "signature": csc_form.signature,
            // "signaturePath": "",
            // "signatureLabel": csc_form.signatureLabel ? csc_form.signatureLabel : "",
            "videoUrl": csc_form.videoUrl ? csc_form.videoUrl : "",
            // "applyDeclaration": "",
            // "admitSignName": this.signFilename != null ? this.signFilename : '',
            // "admitSignBase64": this.signBase64File != null ? this.signBase64File : '',
        };

        console.log(body, 'updateSchoolCircular body');
        // debugger;

        this._superAdminService.UpdateCircular(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("School Circular Created", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
                this._matDialog.close({ 'type': "call_InitialPage", "clientId": csc_form.instituteName })
            } else
            {
                this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
            }
        }, (error: any) =>
        {
            this.errorMessage = error.message;
            this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            console.log(error, "error");
        });

    }

    fromDateChanged(event: MatDatepickerInputEvent<Date>): void
    {
        const toDateControl = this.schoolCircularModalForm.get('closeDate');
        if (toDateControl?.value && toDateControl.value < event.value)
        {
            toDateControl.setValue(null);
        }
        toDateControl?.enable();
        toDateControl?.updateValueAndValidity({
            onlySelf: true,
            emitEvent: false,
        });
    }

    clearForm(): void
    {
        this.schoolCircularNgForm.resetForm();
    }

    handleSignPhotoFileInput(event)
    {
        // let file = event.target.files[0];
        if (event.target.files && event.target.files && event.target.files[0].size > 102400)
        {
            this.matSnackBar.open("File Size Limit is 100 Kilobytes(KB)!", 'Close', {
                verticalPosition: 'top',
                duration: 200000,
            });
            this.mySignPhotoInputVariable.nativeElement.value = "";
            this.removeSignPhotoFile();
            // this.changeDetector.markForCheck();
        }
        else
        {
            if (event.target.files && event.target.files[0])
            {
                let signImg = new Image();
                signImg.src = window.URL.createObjectURL(event.target.files[0])
                signImg.onload = () =>
                {
                    if (signImg.width <= 300 && signImg.height <= 80)
                    {
                        let signReader = new FileReader(); // HTML5 FileReader API
                        let signFile = event.target.files[0];
                        signReader.readAsDataURL(signFile);

                        // When file uploads set it to file formcontrol
                        signReader.onload = () =>
                        {
                            this.signImageUrl = signReader.result;
                            this.signBase64File = (<string>signReader.result).split(',')[1];
                            this.signFilename = signFile.name;
                        }
                    } else
                    {
                        this.matSnackBar.open("Image Can Not Exceed Height of 80px & Width of 300px!", 'Close', {
                            verticalPosition: 'top',
                            duration: 200000,
                        });
                        this.mySignPhotoInputVariable.nativeElement.value = "";
                        this.removeSignPhotoFile();
                    }
                }
                // ChangeDetectorRef since file is loading outside the zone
                this.changeDetector.markForCheck();
            }
        }
    }
    removeSignPhotoFile(): void
    {
        this.signBase64File = null; this.signFilename = null;
        this.signImageUrl = "/assets/images/signature.png";
    }

}
