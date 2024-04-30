import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Institute_Pair } from 'app/modules/superAdmin/superAdmin.data';
import { SuperAdminService } from 'app/modules/superAdmin/superAdmin.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-roll-start-modal',
    templateUrl: './roll-start-modal.component.html',
    styleUrls: ["./roll-start-modal.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class RollStartModalComponent implements OnInit
{

    @ViewChild('rollNgForm') rollNgForm: NgForm;
    rollForm: UntypedFormGroup;

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
    CircularId: any;
    ProgramId: any;
    RangeFrom: any;

    constructor(
        private _superAdminService: SuperAdminService,
        private _matDialog: MatDialogRef<RollStartModalComponent>,
        private _formBuilder: UntypedFormBuilder,
        private matSnackBar: MatSnackBar,

        @Inject(MAT_DIALOG_DATA) public dialogdata: any
    )
    {
        // this.getCircularInstituteData();
        this.CircularId = this.dialogdata.CircularId;
        this.ProgramId = this.dialogdata.ProgramId;
        this.RangeFrom = this.dialogdata.RangeFrom;
    }

    ngOnInit(): void
    {
        this.rollForm = this._formBuilder.group({
            startCtrl: [this.RangeFrom != null ? this.RangeFrom : '', Validators.required],
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

    SaveRollStart()
    {
        let csc_form = this.rollForm.getRawValue();

        // let body = {
        //     "circularId": this.CircularId,
        //     "programId": this.ProgramId,
        //     "masterRangeFrom": csc_form.startCtrl,
        //     "masterRangeTo": 0,
        //     "isSplit": "N",
        //     "RollRangeSplitList": []
        // }

        let body = {
            "circularId": this.CircularId,
            "programId": this.ProgramId,
            "rangeFrom": csc_form.startCtrl,
        }
        console.log(body, 'body');

        this._superAdminService.SaveRoll(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("Roll Format Saved", 'Close', {
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
        this.rollNgForm.resetForm();
    }
}
