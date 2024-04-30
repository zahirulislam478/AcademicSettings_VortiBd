import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Institute_Pair } from 'app/modules/superAdmin/superAdmin.data';
import { SuperAdminService } from 'app/modules/superAdmin/superAdmin.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-circular-modal-college',
    templateUrl: './circular-modal-college.component.html',
    styleUrls: ["./circular-modal-college.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CircularCollegeModalComponent implements OnInit
{

    details: string;
    institueName: string;
    @ViewChild('signImage') mySignPhotoInputVariable: ElementRef;
    @ViewChild('supportNgForm') supportNgForm: NgForm;

    collegeCircularModalForm: UntypedFormGroup;

    Circular_InstituteData: any;

    fetchingData = true;
    foundError = false;
    isCollegeModeSelected = false;
    iscollegeStrictModeCircular = false;
    collegeCircularTypeForm = true;

    errorMessage: string = null;

    college = Institute_Pair;

    circular = null;
    CircularData = null;
    public Editor = ClassicEditor;

    ckd = new FormControl("<p>hello, o</p>");
    // ckData = "";

    // public ckData: string = "<p>hello</p>";
    clientData: any = null;
    signFilename: string = null;
    signBase64File: string = null;
    signImageUrl: any = "/assets/images/signature.png";

    constructor(
        private _superAdminService: SuperAdminService,
        private _matDialog: MatDialogRef<CircularCollegeModalComponent>,
        private _formBuilder: UntypedFormBuilder,
        private matSnackBar: MatSnackBar,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public dialogdata: any

    )
    {
        // this.getCircularInstituteData();
        this.college = this.dialogdata.institutes;
        this.circular = this.dialogdata.circular;
        this.clientData = JSON.parse(localStorage.getItem('clientData'));

        this.collegeCircularModalForm = this._formBuilder.group({
            collegeCircularType: ['', Validators.required],
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
            this.collegeCircularModalForm.patchValue({
                instituteName: this.clientData.User.ClientId.toString(),
            });

            this.collegeCircularModalForm.controls['instituteName'].disable();
        }

        if (this.circular != null)
        {
            this.next();
            this.getCircularData(this.circular.CircularId)
        }
    }

    ngOnInit(): void
    {

    }

    getCircularData(id): void
    {
        this._superAdminService.GetCircularSingleCircular(id).subscribe(
            (data: any) =>
            {
                console.log(data, 'getCircularData');

                this.CircularData = data.data;



                this.collegeCircularModalForm.patchValue({
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
                // this.signImageUrl = this.CircularData.SignaturePath;
                this.collegeCircularModalForm.get('closeDate').enable();

                // this.ckData = this.CircularData.ApplyInstructions;


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
                    this.college = this.Circular_InstituteData.VortiBDClients;
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
        const result = this.college.filter((ins) => ins.value == event.source.value);
    }

    createCollegeCircular()
    {
        let ccc_form = this.collegeCircularModalForm.getRawValue();

        // if (ccc_form.signature && this.signBase64File == null)
        // {
        //     this.matSnackBar.open("Signature photo is required", 'Close', {
        //         verticalPosition: 'top',
        //         duration: 2000,
        //     });
        //     return;
        // }


        let body = {
            // "clientId": ccc_form.instituteName ? ccc_form.instituteName : "",
            // "circularTitle": ccc_form.circularName ? ccc_form.circularName : "",
            // "circularType": "College",
            // "url": ccc_form.circularUrl ? ccc_form.circularUrl : "",
            // "openDate": ccc_form.openDate ? ccc_form.openDate : "",
            // "closeDate": ccc_form.closeDate ? ccc_form.closeDate : "",
            // "isStrictMode": false

            "id": 0,
            "clientId": ccc_form.instituteName ? ccc_form.instituteName : "",
            "circularTitle": ccc_form.circularName ? ccc_form.circularName : "",
            "circularType": "Collage",
            "url": ccc_form.circularUrl ? ccc_form.circularUrl : "",
            "openDate": ccc_form.openDate ? moment(ccc_form.openDate).format() : "",
            "closeDate": ccc_form.closeDate ? moment(ccc_form.closeDate).format() : "",
            "isStrictMode": ccc_form.collegeCircularType == 'StrictMode' ? true : false,
            "activeStatus": true,
            "applyInstructions": ccc_form.ckData ? ccc_form.ckData : "",
            "alertSMSAfterApply": false,
            "smsTemplate": "DEFAULT",
            "admitCard": false,
            "admitCardTemplate": "DEFAULT",
            "admitCardAvailableFrom": "2023-10-04 12:00:44.269Z",
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
            "uniqStudentBirthID": ccc_form.uniqStudentBirthID,
            // "signature": null,
            // "signaturePath": "",
            // "signatureLabel": "",
            "videoUrl": ccc_form.videoUrl ? ccc_form.videoUrl : "",
            // "admitSignName": '',
            // "admitSignBase64": '',
        };

        console.log(body, 'SaveCircular body');
        // debugger;

        this._superAdminService.SaveCircular(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("College Circular Created", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
                this._matDialog.close({ 'type': "call_InitialPage", "clientId": ccc_form.instituteName })
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

    UpdateCollegeCircular()
    {
        let ccc_form = this.collegeCircularModalForm.getRawValue();

        // if (ccc_form.signature && this.signImageUrl != this.CircularData.SignaturePath)
        // {
        //     this.matSnackBar.open("Signature photo is required", 'Close', {
        //         verticalPosition: 'top',
        //         duration: 2000,
        //     });
        //     return;
        // }

        let body = {
            "id": this.CircularData.CircularId,
            "clientId": ccc_form.instituteName ? ccc_form.instituteName : "",
            "circularTitle": ccc_form.circularName ? ccc_form.circularName : "",
            // "circularType": "Collage",
            "url": ccc_form.circularUrl ? ccc_form.circularUrl : "",
            "openDate": ccc_form.openDate ? moment(ccc_form.openDate).format() : "",
            "closeDate": ccc_form.closeDate ? moment(ccc_form.closeDate).format() : "",
            "isStrictMode": ccc_form.collegeCircularType == 'StrictMode' ? true : false,
            "activeStatus": ccc_form.status,
            "applyInstructions": ccc_form.ckData ? ccc_form.ckData : "",
            "uniqStudentBirthID": ccc_form.uniqStudentBirthID,
            // "signature": null,
            // "signaturePath": "",
            // "signatureLabel": "",
            "videoUrl": ccc_form.videoUrl ? ccc_form.videoUrl : "",
            // "admitSignName": '',
            // "admitSignBase64": '',
        };

        console.log(body, 'SaveCircular body');
        // debugger;

        this._superAdminService.UpdateCircular(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("College Circular Updated", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
                this._matDialog.close({ 'type': "call_InitialPage", "clientId": ccc_form.instituteName })
            } else
            {
                this.matSnackBar.open("Couldn't Update Information, Please Try Again", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
            }
        }, (error: any) =>
        {
            this.errorMessage = error.message;
            this.matSnackBar.open("Couldn't Update Information, Please Try Again", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            console.log(error, "error");
        });

    }

    collegeModeSelect(): void
    {
        this.isCollegeModeSelected = true;
        // console.log('strict Mode Selected');
    }


    clearForm(): void
    {
        // this.supportNgForm.resetForm();
        this.collegeCircularModalForm.patchValue({ collegeCircularType: '' });
        this.isCollegeModeSelected = false;
        this.iscollegeStrictModeCircular = false;
        this.collegeCircularTypeForm = true;
    }

    ClearMainForm(): void
    {
        // debugger;
        // this.supportNgForm.resetForm();
        this.collegeCircularModalForm.patchValue({
            instituteName: '',
            circularName: '',
            openDate: '',
            closeDate: '',
            circularUrl: '',
            status: true,
            uniqStudentBirthID: true,
            ckData: '',
            videoUrl:'',
        });
        // this.ckData = null;
        this._changeDetectorRef.markForCheck();

    }

    fromDateChanged(event: MatDatepickerInputEvent<Date>): void
    {
        const toDateControl = this.collegeCircularModalForm.get('closeDate');
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

    next(): void
    {
        this.iscollegeStrictModeCircular = true;
        this.collegeCircularTypeForm = false;
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
                this._changeDetectorRef.markForCheck();
            }
        }
    }
    removeSignPhotoFile(): void
    {
        this.signBase64File = null; this.signFilename = null;
        this.signImageUrl = "/assets/images/signature.png";
    }

}
