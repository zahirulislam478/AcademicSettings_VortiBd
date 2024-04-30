import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { JobPortalService } from 'app/modules/job-portal/job-portal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-circular-details-setup',
  templateUrl: './job-circular-details-setup.component.html',
  styleUrls: ['./job-circular-details-setup.component.scss'],
})
export class JobCircularDetailsSetupComponent implements OnInit {
  fetchingData = false;
  foundError = false;
  public Editor = ClassicEditor;
  classSetup: FormGroup;
  ActionType: string;
  circularDetails: any;
  errorMessage: string = null;
  MainDropdownData = null;
  circularIndividualId: number;

  versions = [
    { value: 1, viewValue: 'Bengali' },
    { value: 2, viewValue: 'English' },
    { value: 3, viewValue: 'English Medium' },
  ];

  genders = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' },
    { value: 'B', viewValue: 'Both Male &Female' },
  ];

  subjects = [
    { value: 1, viewValue: 'Math' },
    { value: 2, viewValue: 'Physics' },
    { value: 3, viewValue: 'Benglai' },
    { value: 4, viewValue: 'English' },
    { value: 5, viewValue: 'Biology' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _jobPortalService: JobPortalService,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<JobCircularDetailsSetupComponent>
  ) {
     this._jobPortalService
       .GetDefaultControls(this.data.ClientId)
       .subscribe((data) => {
         this.MainDropdownData = data.data;
         console.log(this.MainDropdownData);
         console.log(this.MainDropdownData.Districts);
       });
  }

  ngOnInit() {
    console.log('Received data: ', this.data);

    if (this.data.Id) {
      this.circularIndividualId = this.data.Id;
      this.GetCircularDetailsById(this.circularIndividualId);
    }

    this.classSetup = this._formBuilder.group({
      firstFormGroup: this._formBuilder.group({
        circularTitle: [ { value: this.data.CircularTitle, disabled: true }, Validators.required ],
        postTitle: ['', Validators.required],
        subject: ['', Validators.required],
        formAmount: ['', Validators.required],
        bankCharge: ['', Validators.required],
        vacancies: ['', Validators.required],
        version: ['', Validators.required],
        examDateTime: ['', Validators.required],
        vivaDateTime: ['', Validators.required],
      }),
      secondFormGroup: this._formBuilder.group({
        applicableforGender: [''],
        academicQualification: [''],
        skillRequirement: [''],
        ProfessionalTraining: [''],
        limitAge: [''],
        experienceRequirement: [''],
        languageEfficiency: [''],
        postStatus: [''],
        ckData: [''],
        minimumAgeMonth: [''],
        maximumAgeMonth: [''],
      }),
    });
  }

  handleAction() {
    if (this.data.action === 'create') {
      this.ClassSetup();
    } else if (this.data.action === 'duplicate') {
      this.DuplicateClassSetup();
    } else if (this.data.action === 'edit') {
      this.UpdateClassSetup();
    }
  }

  GetCircularDetailsById(Id: number): void {
    this._jobPortalService.GetCircularDetailsById(Id).subscribe(
      (data: any) => {
        console.log(data, 'GetCircularDetailsById');
        this.circularDetails = data.data;

        this.classSetup.patchValue({
          firstFormGroup: {
            circularTitle: this.data.CircularTitle,
            postTitle: this.circularDetails.PostTitle,
            subject: this.circularDetails.BaseCourseId,
            formAmount: this.circularDetails.FormAmount,
            bankCharge: this.circularDetails.BankCharge,
            vacancies: this.circularDetails.NoOfVacantPost,
            version: this.circularDetails.VersionId,
            examDateTime: this.circularDetails.ExamDate,
            vivaDateTime: this.circularDetails.VivaVoceDate,
          },
          secondFormGroup: {
            applicableforGender: this.circularDetails.GenderType,
            academicQualification: this.circularDetails.PreviousAcademicRecord,
            skillRequirement: this.circularDetails.SkillRecord,
            ProfessionalTraining: this.circularDetails.ProfessionalTraining,
            limitAge: this.circularDetails.IsAgeLimit == 'Y' ? true : false,
            experienceRequirement: this.circularDetails.PreviousExperience,
            languageEfficiency: this.circularDetails.LanguageEfficency,
            postStatus: this.circularDetails.ActiveStatus,
            minimumAge: this.circularDetails.MinimumAge,
            maximumAge: this.circularDetails.MaximumAge,
            ckData: this.circularDetails.PostInstrutions,
          },
        });
      },
      (error: any) => {
        console.log(error, 'error');
      }
    );
  }

  ClassSetup(): void {
    let body = {
      circularId: this.data.CircularId,
      versionId: Number(this.classSetup.get('firstFormGroup.version').value),
      baseCourseId: this.classSetup.get('firstFormGroup.subject').value,
      circularType: 'J',
      postPrefix: 'string',
      postTitle: this.classSetup.get('firstFormGroup.postTitle').value,
      noOfVacantPost: this.classSetup.get('firstFormGroup.vacancies').value,
      formAmount: this.classSetup.get('firstFormGroup.formAmount').value,
      bankCharge: this.classSetup.get('firstFormGroup.bankCharge').value,
      examDate: this.classSetup.get('firstFormGroup.examDateTime').value,
      examTime: '',
      vivaVoceDate: this.classSetup.get('firstFormGroup.vivaDateTime').value,
      vivaTime: '',
      genderType: this.classSetup.get('secondFormGroup.applicableforGender')
        .value,
      prevExamsVisible: '',
      prevExamsRequired: '',
      ageConditionDate: '',
      minimumAge: 0,
      maximumAge: 0,
      postInstrutions: this.classSetup.get('secondFormGroup.ckData').value,
      ageCalculationBaseDate: '2024-01-30T09:10:14.927Z',
      createUserID: 0,
      createTime: '2024-01-30T09:10:14.927Z',
      createUserIPAddress: '',
      updateUserID: 0,
      updateTime: '2024-01-30T09:10:14.927Z',
      updateUserIPAddress: '',
      previousAcademicRecord:
        this.classSetup.get('secondFormGroup.academicQualification').value ||
        false,
      skillRecord:
        this.classSetup.get('secondFormGroup.skillRequirement').value || false,
      professionalTraining:
        this.classSetup.get('secondFormGroup.ProfessionalTraining').value ||
        false,
      isAgeLimit: this.classSetup.get('secondFormGroup.limitAge').value
        ? 'Y'
        : 'N',
      previousExperience:
        this.classSetup.get('secondFormGroup.experienceRequirement').value ||
        false,
      languageEfficency:
        this.classSetup.get('secondFormGroup.languageEfficiency').value ||
        false,
      activeStatus:
        this.classSetup.get('secondFormGroup.postStatus').value || false,
    };
    console.log(body, 'body');

    this._jobPortalService.SaveCircularDetails(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Circular Created Successfully', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.dialogRef.close('call_InitialPage');
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

  UpdateClassSetup() {
    let body = {
      id: this.data.Id,
      circularId: this.data.CircularId,
      versionId: this.classSetup.get('firstFormGroup.version').value,
      baseCourseId: this.classSetup.get('firstFormGroup.subject').value,
      isAgeLimit:
        this.classSetup.get('secondFormGroup.limitAge').value || false,
      ageConditionDate: '',
      minimumAge: this.classSetup.get('secondFormGroup.minimumAge').value,
      maximumAge: this.classSetup.get('secondFormGroup.maximumAge').value,
      genderType: this.classSetup.get('secondFormGroup.applicableforGender')
        .value,
      examDate: this.classSetup.get('firstFormGroup.examDateTime').value,
      examTime: '',
      resultDate: '',
      resultTime: '',
      vivaVoceDate: this.classSetup.get('firstFormGroup.vivaDateTime').value,
      vivaTime: '',
      formAmount: this.classSetup.get('firstFormGroup.formAmount').value,
      bankCharge: this.classSetup.get('firstFormGroup.bankCharge').value,
      moneyReceipt: '',
      admissionForm: '',
      activeStatus:
        this.classSetup.get('secondFormGroup.postStatus').value || false,
      postPrefix: '',
      postTitle: this.data.CircularTitle,
      noOfVacantPost: this.classSetup.get('firstFormGroup.vacancies').value,
      previousAcademicRecord:
        this.classSetup.get('secondFormGroup.academicQualification').value ||
        false,
      prevExamsVisible: '',
      prevExamsRequired: '',
      previousExperience:
        this.classSetup.get('secondFormGroup.experienceRequirement').value ||
        false,
      skillRecord:
        this.classSetup.get('secondFormGroup.skillRequirement').value || false,
      languageEfficency:
        this.classSetup.get('secondFormGroup.languageEfficiency').value ||
        false,
      professionalTraining:
        this.classSetup.get('secondFormGroup.ProfessionalTraining').value ||
        false,
      postInstrutions: this.classSetup.get('secondFormGroup.ckData').value,
    };
    console.log(body, 'body');

    this._jobPortalService.UpdateCircularDetials(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Circular Created Successfully', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.dialogRef.close('call_InitialPage');
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

  DuplicateClassSetup() {
    let body = {
      id: this.data.Id,
      circularId: this.data.CircularId,
      versionId: this.classSetup.get('firstFormGroup.version').value,
      baseCourseId: this.classSetup.get('firstFormGroup.subject').value,
      isAgeLimit:
        this.classSetup.get('secondFormGroup.limitAge').value == true
          ? 'Y'
          : 'N',
      ageConditionDate: '',
      minimumAge: this.classSetup.get('secondFormGroup.minimumAge').value,
      maximumAge: this.classSetup.get('secondFormGroup.maximumAge').value,
      genderType: this.classSetup.get('secondFormGroup.applicableforGender')
        .value,
      examDate: this.classSetup.get('firstFormGroup.examDateTime').value,
      examTime: '',
      resultDate: '',
      resultTime: '',
      vivaVoceDate: this.classSetup.get('firstFormGroup.vivaDateTime').value,
      vivaTime: '',
      formAmount: this.classSetup.get('firstFormGroup.formAmount').value,
      bankCharge: this.classSetup.get('firstFormGroup.bankCharge').value,
      moneyReceipt: '',
      admissionForm: '',
      activeStatus: this.classSetup.get('secondFormGroup.postStatus').value,
      postPrefix: '',
      postTitle: this.data.CircularTitle,
      noOfVacantPost: this.classSetup.get('firstFormGroup.vacancies').value,
      previousAcademicRecord: this.classSetup.get(
        'secondFormGroup.academicQualification'
      ).value,
      prevExamsVisible: '',
      prevExamsRequired: '',
      previousExperience: this.classSetup.get(
        'secondFormGroup.experienceRequirement'
      ).value,
      skillRecord: this.classSetup.get('secondFormGroup.skillRequirement')
        .value,
      languageEfficency: this.classSetup.get(
        'secondFormGroup.languageEfficiency'
      ).value,
      professionalTraining: this.classSetup.get(
        'secondFormGroup.ProfessionalTraining'
      ).value,
      postInstrutions: this.classSetup.get('secondFormGroup.ckData').value,
    };
    console.log(body, 'body');

    this._jobPortalService.UpdateCircularDetials(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          if (data.data === 'Already Exist') {
            this.matSnackBar.open(
              'Duplicate Entry Found, Please Try Again',
              'Close',
              {
                verticalPosition: 'top',
                duration: 2000,
              }
            );
          } else {
            this.matSnackBar.open('Circular Created Successfully', 'Close', {
              verticalPosition: 'top',
              duration: 2000,
            });
            this.dialogRef.close('call_InitialPage');
          }
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
}
