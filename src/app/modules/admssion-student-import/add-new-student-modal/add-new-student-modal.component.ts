import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperAdminService } from 'app/modules/superAdmin/superAdmin.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';


@Component({
    selector: 'app-add-new-student-modal',
    templateUrl: './add-new-student-modal.component.html',
    styleUrls: ["./add-new-student-modal.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class AddNewStudentModalComponent implements OnInit
{

    @ViewChild('addNewStudentNgForm') addNewStudentNgForm: NgForm;
    addNewStudentForm: UntypedFormGroup;

    Circular_InstituteData: any;


    fetchingData = true;
    foundError = false;



    CircularId: any;
    ClientId: any;
    Circular_Dropdowns: any;

    constructor(
        private _superAdminService: SuperAdminService,
        private _matDialog: MatDialogRef<AddNewStudentModalComponent>,
        private _formBuilder: UntypedFormBuilder,
        private matSnackBar: MatSnackBar,

        @Inject(MAT_DIALOG_DATA) public dialogdata: any
    )
    {
        // this.getCircularInstituteData();

        this.ClientId = this.dialogdata.ClientId;
        this.CircularId = this.dialogdata.CircularId;

        this.getCircularDropdowns();


    }

    ngOnInit(): void
    {

    }

    getCircularDropdowns(): void
    {
        this._superAdminService.GetCircularDropdowns(this.ClientId, this.CircularId).subscribe(
            (data: any) =>
            {
                console.log(data, 'getCircularDropdowns');
                this.Circular_Dropdowns = data.data;

                this.addNewStudentForm = this._formBuilder.group({
                    Program: ['', this.Circular_Dropdowns.Programs != null ? Validators.required : null],
                    Shift: ['', this.Circular_Dropdowns.OpenProgramShifts != null ? Validators.required : null],
                    Group: ['', this.Circular_Dropdowns.OpenProgramGroups.length != 0 ? Validators.required : null],
                    Version: ['', this.Circular_Dropdowns.OpenProgramVersions != null ? Validators.required : null],
                    Category: ['', this.Circular_Dropdowns.OpenProgramCategories != null ? Validators.required : null],
                    Session: ['', this.Circular_Dropdowns.OpenProgramSessions != null ? Validators.required : null],
                    StudentName: ['', Validators.required],
                    EmergencyContact: ['', Validators.required],
                    Board: ['', this.Circular_Dropdowns.OpenProgramBoards != null ? Validators.required : null],
                    PassingYear: ['', this.Circular_Dropdowns.SSCPassingYear != null ? Validators.required : null],
                    SSCRoll: ['', Validators.required],
                    Remarks: [''],
                });

                if (this.Circular_Dropdowns.OpenProgramGroups.length == 0)
                {
                    // this.groupControl.disable();
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

    SaveStudent(): void
    {
        let s_form = this.addNewStudentForm.getRawValue();
        let body = {
            "id": 0,
            "clientId": Number(this.ClientId),
            "circularId": Number(this.CircularId),
            "programID": Number(s_form.Program),
            "groupID": Number(s_form.Group),
            "shiftID": Number(s_form.Shift),
            "sessionID": Number(s_form.Session),
            "versionID": Number(s_form.Version),
            "studentCatID": Number(s_form.Category),
            "quotaType": 0,
            "boardVarsityId": Number(s_form.Board),
            "boardRoll": s_form.SSCRoll,
            "studentName": s_form.StudentName,
            "passingYear": s_form.PassingYear,
            "contactNo": s_form.EmergencyContact,
            "remarks": s_form.Remarks,
        }

        console.log(body, 'createSchoolCircular body');
        // debugger;

        this._superAdminService.GetCSaveCandidate(body).subscribe((data: any) =>
        {
            console.log(data, "data");
            if (data.isError == false)
            {
                this.matSnackBar.open("Information Saved", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
                this._matDialog.close()
            } else
            {
                this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
                    verticalPosition: 'top',
                    duration: 2000,
                });
            }
        }, (error: any) =>
        {
            this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
                verticalPosition: 'top',
                duration: 2000,
            });
            console.log(error, "error");
        });
    }

    clearForm(): void
    {
        this.addNewStudentNgForm.resetForm();
    }
}

