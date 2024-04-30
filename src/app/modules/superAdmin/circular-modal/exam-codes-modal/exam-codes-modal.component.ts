import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Institute_Pair } from 'app/modules/superAdmin/superAdmin.data';
import { SuperAdminService } from 'app/modules/superAdmin/superAdmin.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';


@Component({
    selector: 'app-exam-codes-modal',
    templateUrl: './exam-codes-modal.component.html',
    styleUrls: ["./exam-codes-modal.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ConfigureExamCodesModalComponent implements OnInit
{

    @ViewChild('schoolCircularNgForm') schoolCircularNgForm: NgForm;


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

    BMI_MainForm: FormGroup;
    BatchListData: any = [];

    constructor(
        private _superAdminService: SuperAdminService,
        private _matDialog: MatDialogRef<ConfigureExamCodesModalComponent>,
        private _formBuilder: FormBuilder,
        private matSnackBar: MatSnackBar,

        @Inject(MAT_DIALOG_DATA) public dialogdata: any
    )
    {
        // debugger;
        this.CircularData = this.dialogdata.CircularData;
        if (this.CircularData != null)
        {
            this.getCircularInstituteData(this.CircularData.CircularId);
        }




    }

    ngOnInit(): void
    {

    }

    getCircularInstituteData(CircularId): void
    {
        this._superAdminService.GetExamCodes(CircularId).subscribe(
            (data: any) =>
            {
                if (data.isError == false)
                {
                    this.BatchListData = data.data;

                    if (this.BatchListData.length > 0)
                    {
                        let tempData = [];
                        this.BatchListData.forEach((item, index) =>
                        {
                            tempData.push(this.gotItem(item));
                        });
                        this.BMI_MainForm = this._formBuilder.group({
                            items: this._formBuilder.array(tempData),
                        });

                        this.matSnackBar.open("Data Found", 'Close', {
                            verticalPosition: 'top',
                            duration: 2000,
                        });
                    }
                    else
                    {
                        this.matSnackBar.open("No Data Found", 'Close', {
                            verticalPosition: 'top',
                            duration: 2000,
                        });
                    }
                }
                else
                {
                    this.matSnackBar.open("Couldn't Find Information, Please Try Again", 'Close', {
                        verticalPosition: 'top',
                        duration: 2000,
                    });
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

    gotItem(item): FormGroup
    {
        return this._formBuilder.group({
            CircularId: item.CircularId,
            ProgramId: item.ProgramId,
            ProgramName: item.ProgramName,
            CircularPreEduId: item.CircularPreEduId,
            NA: item.ExamCodes == null ? true : false,
            PSC: item.ExamCodes != null && item.ExamCodes.includes('1') ? true : false,
            JSC_JDC: item.ExamCodes != null && item.ExamCodes.includes('2') ? true : false,
            SSC_Dakhil: item.ExamCodes != null && item.ExamCodes.includes('3') ? true : false,
            HSC_Alim: item.ExamCodes != null && item.ExamCodes.includes('4') ? true : false,
            Hons_Fazil: item.ExamCodes != null && item.ExamCodes.includes('5') ? true : false,
            Masters_Kamil: item.ExamCodes != null && item.ExamCodes.includes('6') ? true : false,
            BBA: item.ExamCodes != null && item.ExamCodes.includes('7') ? true : false,
            MBA: item.ExamCodes != null && item.ExamCodes.includes('8') ? true : false,
        })
    }

    BMI_MainForm_Items(): FormArray
    {
        return this.BMI_MainForm.get("items") as FormArray
    }

    circularInstituteChange(event): void
    {
        const result = this.school.filter((ins) => ins.value == event.source.value);
    }

    saveConfigure()
    {
        let my_form = this.BMI_MainForm.getRawValue().items;

        console.log(my_form, 'my_form');


        let body = my_form.map((item) =>
        {
            const examCodes = Object.keys(item)
                .filter((key) => key !== 'NA' && item[key] === true)
                .map((key) => examCodesEnum[key])
                .join(',');

            return {
                id: item.CircularPreEduId,
                circularId: item.CircularId,
                programId: item.ProgramId,
                activeStatus: true,
                examCodes: examCodes || null,
            };
        });

        console.log(body, 'body');


        this._superAdminService.SaveExamCodes(body).subscribe((data: any) =>
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
}

const examCodesEnum = {
    PSC: 1,
    JSC_JDC: 2,
    SSC_Dakhil: 3,
    HSC_Alim: 4,
    Hons_Fazil: 5,
    Masters_Kamil: 6,
    BBA: 7,
    MBA: 8,
};
