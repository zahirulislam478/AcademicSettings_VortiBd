import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Institute_Pair } from 'app/modules/superAdmin/superAdmin.data';
import { SuperAdminService } from 'app/modules/superAdmin/superAdmin.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import Utils from 'app/Utility/utils';


@Component({
    selector: 'app-configure-downloads-modal',
    templateUrl: './configure-downloads-modal.component.html',
    styleUrls: ["./configure-downloads-modal.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ConfigureDownloadsModalComponent implements OnInit
{
    @ViewChild('signImage') mySignPhotoInputVariable: ElementRef;
    @ViewChild('schoolCircularNgForm') schoolCircularNgForm: NgForm;
    configureDownloadsForm: UntypedFormGroup;

    Circular_InstituteData: any;

    isChecked = true;
    fetchingData = true;
    foundError = false;

    school = Institute_Pair;

    details: string;
    institueName: string;
    errorMessage: string = null;
    alert: any;
    data_: any;
    public Editor = ClassicEditor;

    ckData = `<p>Hello, world! ckData</p>`
    CircularData: any;
    signFilename: string = null;
    signBase64File: string = null;
    signImageUrl: any = "/assets/images/signature.png";

    constructor(
        private _superAdminService: SuperAdminService,
        private _matDialog: MatDialogRef<ConfigureDownloadsModalComponent>,
        private _formBuilder: UntypedFormBuilder,
        private matSnackBar: MatSnackBar,
        private changeDetector: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public dialogdata: any
    )
    {
        // this.getCircularInstituteData();

        this.CircularData = this.dialogdata.CircularData;

        this.configureDownloadsForm = this._formBuilder.group({
            smsCtrl: [this.CircularData.AlertSMSAfterApply != null ? this.CircularData.AlertSMSAfterApply : false, Validators.required],

            smsTemplateCtrl: [this.CircularData.SMSTemplate != '' ? this.CircularData.SMSTemplate : 'DEFAULT', Validators.required],

            instantAdmitCardCtrl: [this.CircularData.AdmitCard != null ? this.CircularData.AdmitCard : false, Validators.required],

            admitCardDateCtrl: [this.CircularData.AdmitCardAvailableFrom != '' ? new Date(this.CircularData.AdmitCardAvailableFrom) : '', Validators.required],

            instantAdmitCardTemplateCtrl: [this.CircularData.AdmitCardTemplate != '' ? this.CircularData.AdmitCardTemplate : 'DEFAULT', Validators.required],

            admissionFormCtrl: [this.CircularData.AdmissionForm != null ? this.CircularData.AdmissionForm : false, Validators.required],

            admissionFormTemplateCtrl: [this.CircularData.AdmissionFormTemplate != '' ? this.CircularData.AdmissionFormTemplate : 'DEFAULT', Validators.required],

            idCardCtrl: [this.CircularData.IDCard != null ? this.CircularData.IDCard : false, Validators.required],

            idCardTemplateCtrl: [this.CircularData.IDCardTemplate != '' ? this.CircularData.IDCardTemplate : 'DEFAULT', Validators.required],

            transportCardCtrl: [this.CircularData.TransportCard != null ? this.CircularData.TransportCard : false, Validators.required],

            transportCardTemplateCtrl: [this.CircularData.TransportCardTemplate != '' ? this.CircularData.TransportCardTemplate : 'DEFAULT', Validators.required],

            libraryCardCtrl: [this.CircularData.LibraryCard != null ? this.CircularData.LibraryCard : false, Validators.required],

            libraryCardTemplateCtrl: [this.CircularData.LibraryCardTemplate != '' ? this.CircularData.LibraryCardTemplate : 'DEFAULT', Validators.required],

            // admitCardInsCtrl: ['', Validators.required],

            examScheduleCtrl: [this.CircularData.AdmitCardExamSchedule != null ? this.CircularData.AdmitCardExamSchedule : false, Validators.required],

            signature: [this.CircularData.Signature != null ? this.CircularData.Signature : false, Validators.required],

            signatureLabel: [this.CircularData.SignatureLabel != null ? this.CircularData.SignatureLabel : '', []],

            applyDeclaration: [this.CircularData.ApplyDeclaration != null ? this.CircularData.ApplyDeclaration : '', Validators.required],

            ckData: [this.CircularData.AdmitCardInstructions != '' ? this.CircularData.AdmitCardInstructions : ''],
        });

        if (this.CircularData.AdmitCard)
        {
            this.configureDownloadsForm.get('admitCardDateCtrl').clearValidators();
            this.configureDownloadsForm.get('admitCardDateCtrl').disable();
            this.configureDownloadsForm.get('admitCardDateCtrl').updateValueAndValidity();
            this.changeDetector.markForCheck();
        }

        if (this.CircularData.SignaturePath != 'https://allpicture.blob.core.windows.net/vortibd')
        {
            this.signImageUrl = this.CircularData.SignaturePath;
        }

        // const requiredControls = Utils.findRequiredControls(this.configureDownloadsForm);
        // console.log(requiredControls, 'requiredControls');
        const form = this.configureDownloadsForm;
        Object.keys(form.controls).forEach(controlName => {
            const control = form.get(controlName);
          
            // Check if the control is invalid
            if (control.invalid) {
              // Perform actions for invalid controls
              console.log(`Control ${controlName} is invalid`);
            }
          });

    }

    ngOnInit(): void
    {
        this.configureDownloadsForm.get('signature').valueChanges.subscribe((value) =>
        {
            if (value)
            {
                this.configureDownloadsForm.get('signatureLabel').setValidators([Validators.required]);
            }
            else
            {
                this.configureDownloadsForm.get('signatureLabel').clearValidators();
                this.removeSignPhotoFile();
            }
            this.configureDownloadsForm.get('signatureLabel').updateValueAndValidity();
            this.changeDetector.markForCheck();
        });

        this.configureDownloadsForm.get('instantAdmitCardCtrl').valueChanges.subscribe((value) =>
        {
            if (value == false)
            {
                this.configureDownloadsForm.get('admitCardDateCtrl').setValidators([Validators.required]);
                this.configureDownloadsForm.get('admitCardDateCtrl').enable();
            }
            else
            {
                this.configureDownloadsForm.get('admitCardDateCtrl').clearValidators();
                this.configureDownloadsForm.get('admitCardDateCtrl').disable();
                this.configureDownloadsForm.patchValue({
                    admitCardDateCtrl: new Date(),
                })
            }
            this.configureDownloadsForm.get('admitCardDateCtrl').updateValueAndValidity();
            this.changeDetector.markForCheck();
        });
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

    saveConfigure()
    {
        if (this.configureDownloadsForm.invalid)
        {
            this.matSnackBar.open("Please Fill Up All Required Fields", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            this.schoolCircularNgForm.touched;
            return;
        }

        let ccc_form = this.configureDownloadsForm.getRawValue();

        if (ccc_form.instantAdmitCardCtrl == false && ccc_form.admitCardDateCtrl == '')
        {
            this.matSnackBar.open("Please Select Admit Card Available For Download", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            return;
        }

        if (ccc_form.signature && this.signImageUrl == null)
        {
            this.matSnackBar.open("Signature Photo Is Required", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            return;
        }

        let formattedDate = null;

        if (ccc_form.admitCardDateCtrl != "")
        {
            const date = new Date(ccc_form.admitCardDateCtrl.toString());
            const offsetMinutes = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() - offsetMinutes);
            formattedDate = date.toISOString();
        }
        else
        {
            const date = new Date();
            const offsetMinutes = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() - offsetMinutes);
            formattedDate = date.toISOString();
        }



        console.log(formattedDate);


        let body = {
            "id": this.CircularData.CircularId,
            "applyInstructions": this.CircularData.ApplyInstructions,
            "alertSMSAfterApply": ccc_form.smsCtrl != "" ? true : false,
            "smsTemplate": ccc_form.smsTemplateCtrl ? ccc_form.smsTemplateCtrl : "DEFAULT",
            "admitCard": ccc_form.instantAdmitCardCtrl != "" ? true : false,
            "admitCardTemplate": ccc_form.instantAdmitCardTemplateCtrl ? ccc_form.instantAdmitCardTemplateCtrl : "DEFAULT",
            "admitCardAvailableFrom": formattedDate,
            "admitCardExamSchedule": ccc_form.examScheduleCtrl != "" ? true : false,
            "admitCardInstructions": ccc_form.ckData ? ccc_form.ckData : "",
            "admissionForm": ccc_form.admissionFormCtrl != "" ? true : false,
            "admissionFormTemplate": ccc_form.admissionFormTemplateCtrl ? ccc_form.admissionFormTemplateCtrl : "DEFAULT",
            "idCard": ccc_form.idCardCtrl != "" ? true : false,
            "idCardTemplate": ccc_form.idCardTemplateCtrl ? ccc_form.idCardTemplateCtrl : "DEFAULT",
            "transportCard": ccc_form.transportCardCtrl != "" ? true : false,
            "transportCardTemplate": ccc_form.transportCardTemplateCtrl ? ccc_form.transportCardTemplateCtrl : "DEFAULT",
            "libraryCard": ccc_form.libraryCardCtrl != "" ? true : false,
            "libraryCardTemplate": ccc_form.libraryCardTemplateCtrl ? ccc_form.libraryCardTemplateCtrl : "DEFAULT",
            "signature": ccc_form.signature,
            "signaturePath": "",
            "signatureLabel": ccc_form.signatureLabel ? ccc_form.signatureLabel : "",
            "videoUrl": this.CircularData.VideoUrl,
            "applyDeclaration": ccc_form.applyDeclaration ? ccc_form.applyDeclaration : "",
            "admitSignName": this.signFilename != null ? this.signFilename : '',
            "admitSignBase64": this.signBase64File != null ? this.signBase64File : '',
        };
        console.log(body, 'body');

        this._superAdminService.UpdateCircularConfig(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("Circular Config Saved", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
                this._matDialog.close("call_InitialPage");
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

