import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { SuperAdminService } from '../../superAdmin.service';


@Component({
  selector: 'app-circular-modal-college-class-setup',
  templateUrl: './circular-modal-college-class-setup.component.html',
  styleUrls: ['./circular-modal-college-class-setup.component.scss']
})

export class CircularModalCollegeClassSetupComponent implements OnInit
{

  FormParam: any;
  DefaultControls: any;
  selectedGenderValue: any;

  @ViewChild("horizontalStepper") stepper: MatStepper;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredPrograms: any;//Observable<string[]>;
  filteredGroups: any;//Observable<string[]>;
  filteredShifts: any;//Observable<string[]>;
  filteredVersions: any;//Observable<string[]>;
  filteredCategories: any;//Observable<string[]>;
  filteredSessions: any;//Observable<string[]>;

  finalSelectedPrograms: any;
  finalSelectedGroups: any;
  finalSelectedShifts: any;
  finalSelectedVersions: any;
  finalSelectedCategories: any;
  finalSelectedSessions: any;

  programs: any[] = [];
  groups: any[] = [];
  shifts: any[] = [];
  versions: any[] = [];
  categories: any[] = [];
  sessions: any[] = [];
  genders: any[] = [];
  rollCategories: any[] = [];

  allPrograms: any = [];
  allGroups: any = [];
  allShifts: any = [];
  allVersions: any = [];
  allCategories: any = [];
  allSessions: any = [];

  errorMessage: string = null;

  @ViewChild('programInput') programInput: ElementRef<HTMLInputElement>;
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>;
  @ViewChild('shiftInput') shiftInput: ElementRef<HTMLInputElement>;
  @ViewChild('versionInput') versionInput: ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('sessionInput') sessionInput: ElementRef<HTMLInputElement>;

  IsMulti = true;
  IsReadOnly = false;
  data: any;
  fetchingData = true;
  foundError = false;
  addOnBlur = false;
  classSetup: UntypedFormGroup;

  ActionType = 'setup';
  CircularType = '';
  CircularText = '';
  previouslySelectedOptions: any = [];
  optionsBeingProcessed = new Set();



  selectedProgramOptions: any;
  selectedGroupOptions: any;
  selectedShiftOptions: any;
  selectedVersionOptions: any;
  selectedCategoryOptions: any;
  CircularData: any;
  hasYGroupEffect = false;
  programCircularDetailsArray: any;
  ExtractedData: any;

  constructor(
    private _superAdminService: SuperAdminService,
    private _formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CircularModalCollegeClassSetupComponent>,

    @Inject(MAT_DIALOG_DATA) public dialogdata: any
  )
  {
    this.CircularData = this.dialogdata.CircularData;
    this.programCircularDetailsArray = this.dialogdata.programCircularDetailsArray;
    this.IsMulti = this.dialogdata.SelectType == 'multi' ? true : false;
    this.IsReadOnly = this.dialogdata.SelectType == 'single' ? true : false;
    this.ActionType = this.dialogdata.ActionType;
    this.CircularType = this.dialogdata.CircularType;
    if (this.CircularType == 'Collage' || this.CircularType == 'collage' || this.CircularType == 'College' || this.CircularType == 'college')
    {
      this.CircularText = 'College'
    }
    else
    {
      this.CircularText = 'School'
    }

    // debugger;
    console.log(this.programCircularDetailsArray, 'this.programCircularDetailsArray');

    if (this.programCircularDetailsArray.length > 0)
    {
      this.ExtractedData = this.ExtractFormData(this.programCircularDetailsArray);
    }
    else
    {
      this.ExtractedData = this.CircularData
    }

    if (this.ExtractedData.GroupId != null)
    {
      this.hasYGroupEffect = true
    }

    if (this.ExtractedData.ProgramId == null)
    {
      this.ExtractedData = null;
    }

    console.log(this.ExtractedData, 'this.ExtractedData');

    this.FormParam = JSON.parse(localStorage.getItem('CircularFormParam'));
    this.GetInitalData();


    this.classSetup = this._formBuilder.group({
      step1: this._formBuilder.group({
        programCtrl: [this.ExtractedData != null ? this.IsMulti ? this.ExtractedData.ProgramId : this.ExtractedData.ProgramId.toString() : '', Validators.required],
        groupCtrl: [this.ExtractedData != null ? this.IsMulti ? this.ExtractedData.GroupId : this.ExtractedData.GroupId.toString() : '',],
        shiftCtrl: [this.ExtractedData != null ? this.IsMulti ? this.ExtractedData.ShiftId : this.ExtractedData.ShiftId.toString() : '', Validators.required],
        versionCtrl: [this.ExtractedData != null ? this.IsMulti ? this.ExtractedData.VersionId : this.ExtractedData.VersionId.toString() : '', Validators.required],
        categoryCtrl: [this.ExtractedData != null ? this.IsMulti ? this.ExtractedData.StudentCatId : this.ExtractedData.StudentCatId.toString() : '', Validators.required],
        sessionCtrl: [this.ExtractedData != null ? this.ExtractedData.SessionId.toString() : '', Validators.required],
      }),
      // genderCtrl: ['', Validators.required],
      step2: this._formBuilder.group({
        rollType: [this.ExtractedData != null ? this.ExtractedData.RollCategory.toString() : '2', Validators.required],
        formAmount: [this.ExtractedData != null ? this.ExtractedData.FormAmount : '', Validators.required],
        bankCharge: [this.ExtractedData != null ? this.ExtractedData.BankCharge : '', Validators.required],
        applicableforGender: [this.ExtractedData != null ? this.ExtractedData.GenderType : '', Validators.required],
        limitAge: [this.ExtractedData != null ? this.ExtractedData.IsAgeLimit == "Y" ? true : false : ''],
        ageOn: [this.ExtractedData != null ? this.ExtractedData.AgeConditionDate != null ? this.ExtractedData.AgeConditionDate : '' : ''],
        minimumAgeMonth: [this.ExtractedData != null ? this.ExtractedData.MinimumAge : ''],
        maximumAgeMonth: [this.ExtractedData != null ? this.ExtractedData.MaximumAge : ''],
        lotteryDateTime: [this.ExtractedData != null ? this.ExtractedData.LotteryDate : '', ''],
        vivaDateTime: [this.ExtractedData != null ? this.ExtractedData.VivaVoceDate : '', ''],
        writtenExamDateTime: [this.ExtractedData != null ? this.ExtractedData.ExamDate : '', ''],
        resultExamDateTime: [this.ExtractedData != null ? this.ExtractedData.ResultDate : '', ''],
        active: [this.ExtractedData != null ? this.ExtractedData.ActiveStatus : '', Validators.required],
      }),
    });

    if (this.hasYGroupEffect)
    {
      this.classSetup.get('step1.groupCtrl').setValidators([Validators.required]);
    }
    else
    {
      this.classSetup.get('step1.groupCtrl').clearValidators();
      this.classSetup.get('step1.groupCtrl').patchValue('');
    }

    if (this.IsReadOnly)
    {
      this.classSetup.get('step1.programCtrl').disable();
      this.classSetup.get('step1.sessionCtrl').disable();
    }

    // if (this.ExtractedData != null && this.ExtractedData.TotalApplied > 0)
    // {

    // }

    // examDate
    // : 
    // "2023-10-15T12:16:41.000Z"
    // examTime
    // : 
    // "12:16"
    // this.classSetup.get('step2.rollType').patchValue('2');
    // this.classSetup.get('step1.programCtrl').patchValue(['68']);
    // this.classSetup.get('step1.groupCtrl').patchValue(['29']);
    // this.classSetup.get('step1.shiftCtrl').patchValue(['6']);
    // this.classSetup.get('step1.versionCtrl').patchValue(['8']);
    // this.classSetup.get('step1.categoryCtrl').patchValue(['1035']);
    // this.classSetup.get('step1.sessionCtrl').patchValue('44');


  }

  ngOnInit(): void
  {

  }

  checkUnfilledRequiredFields()
  {
    const unfilledRequiredFields = this.getUnfilledRequiredControls(this.classSetup);

    if (unfilledRequiredFields.length > 0)
    {
      console.log('Unfilled required fields: ', unfilledRequiredFields);
      // You can also display the unfilled fields in your template, for example, in a div or a toast message.
    } else
    {
      console.log('All required fields are filled.');
    }
  }

  getUnfilledRequiredControls(group: FormGroup): string[]
  {
    const unfilledRequiredControls: string[] = [];

    Object.keys(group.controls).forEach((key) =>
    {
      const control = group.get(key);

      if (control && control.hasValidator(Validators.required) && control.invalid)
      {
        unfilledRequiredControls.push(key);
      }

      if (control instanceof FormGroup)
      {
        const nestedUnfilledRequiredControls = this.getUnfilledRequiredControls(control);
        unfilledRequiredControls.push(...nestedUnfilledRequiredControls.map((name) => `${key}.${name}`));
      }
    });

    return unfilledRequiredControls;
  }


  GetInitalData(): void
  {
    let type = this.CircularText == 'College' ? 'c' : 's';
    this._superAdminService.GetCircularDefaultControls(this.FormParam.SelectedClientId, type).subscribe(
      (data: any) =>
      {
        console.log(data, 'GetInitalData');

        this.DefaultControls = data.data;

        this.programs = this.DefaultControls.Programs;
        this.groups = this.DefaultControls.Groups;
        this.shifts = this.DefaultControls.Shifts;
        this.versions = this.DefaultControls.Versions;
        this.categories = this.DefaultControls.Categories;
        this.sessions = this.DefaultControls.Sessions;
        this.genders = this.DefaultControls.Genders;
        this.rollCategories = this.DefaultControls.RoleCategory;

        if (this.ExtractedData != null)
        {
          this.onProgramSelectionChange_2(this.IsMulti ? this.ExtractedData.ProgramId : this.ExtractedData.ProgramId.toString());
          this.onGroupsSelectionChange(this.IsMulti ? this.ExtractedData.GroupId : this.ExtractedData.GroupId.toString());
          this.onShiftsSelectionChange(this.IsMulti ? this.ExtractedData.ShiftId : this.ExtractedData.ShiftId.toString());
          this.onVersionSelectionChange(this.IsMulti ? this.ExtractedData.VersionId : this.ExtractedData.VersionId.toString());
          this.onCategorySelectionChange(this.IsMulti ? this.ExtractedData.StudentCatId : this.ExtractedData.StudentCatId.toString());
        }

        this.fetchingData = false;
        this.foundError = false;

      },
      (error: any) =>
      {
        // this.errorMessage = error.message;
        this.fetchingData = false;
        this.foundError = true;
        this.matSnackBar.open("Something Went Wrong, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        console.log(error, "error");
      });
  }

  clearForm(): void
  {
    // this.matSnackBar.open("Selected Programs Dont Share Group", 'Close', {
    //   verticalPosition: 'top',
    //   duration: 200000000,
    //   // panelClass: "success-dialog"
    // });
    this.classSetup.reset();
    this.programs = [];
    this.groups = [];
    this.shifts = [];
    this.versions = [];
    this.categories = [];
    this.sessions = [];
  }

  goToNextStep()
  {
    this.stepper.next();
  }



  onProgramSelectionChange(event: any)
  {
    let value = null;

    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }

    const selectedOptions = this.programs.filter((option) => value.includes(option.value));

    if (this.ExtractedData != null)
    {
      this.previouslySelectedOptions = this.ExtractedData.ProgramId
    }
    else
    {
      this.previouslySelectedOptions = [];
    }

    const uniqueGroupEffects = Array.from(new Set(selectedOptions.map((option) => option.isGroupEffect)));

    if (uniqueGroupEffects.length > 1)
    {
      this.classSetup.get('step1.programCtrl').patchValue('');
      this.selectedProgramOptions = '';
      this.matSnackBar.open("Selected Programs Dont Share Group", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }
    this.hasYGroupEffect = uniqueGroupEffects.includes('Y');

    if (this.hasYGroupEffect)
    {
      this.classSetup.get('step1.groupCtrl').setValidators([Validators.required]);
    }
    else
    {
      this.classSetup.get('step1.groupCtrl').clearValidators();
      this.classSetup.get('step1.groupCtrl').patchValue('');
    }

    this.classSetup.get('step1.groupCtrl').updateValueAndValidity();

    this.selectedProgramOptions = selectedOptions
      .map((option) => `{${option.value},${option.name}}`)
      .join(',');

    console.log(this.selectedProgramOptions, 'selectedProgramOptions');
    console.log('Is "isGroupEffect": "Y" found:', this.hasYGroupEffect);

    if (this.previouslySelectedOptions.length > 0)
    {
      const deselectedOptions = this.previouslySelectedOptions.filter(
        (option) => !value.includes(option)
      );

      console.log('Deselected options:', deselectedOptions);

      // debugger;
      deselectedOptions.forEach((deselectedOption) =>
      {
        // Check if the option is not currently being processed to prevent recursion.
        if (!this.optionsBeingProcessed.has(deselectedOption))
        {
          this.optionsBeingProcessed.add(deselectedOption);

          // Call the synchronous function directly.
          this.checkDeselectionPermission(deselectedOption);

          // Remove the option from the processing set after the check is complete.
          this.optionsBeingProcessed.delete(deselectedOption);
        }
      });

    }
  }

  onProgramSelectionChange_2(event: any)
  {
    let value = null;

    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }
    
    this.selectedProgramOptions = this.programs
      .filter(option => value.includes(option.value))
      .map(option => `{${option.value},${option.name}}`)
      .join(',');
    console.log(this.selectedProgramOptions, 'selectedProgramOptions');
  }

  onGroupsSelectionChange(event: any)
  {
    let value = null;

    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }

    this.selectedGroupOptions = this.groups
      .filter(option => value.includes(option.value))
      .map(option => `{${option.value},${option.name}}`)
      .join(',');
    console.log(this.selectedGroupOptions, 'selectedGroupOptions');
  }

  onShiftsSelectionChange(event: any)
  {
    let value = null;

    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }

    this.selectedShiftOptions = this.shifts
      .filter(option => value.includes(option.value))
      .map(option => `{${option.value},${option.name}}`)
      .join(',');
    console.log(this.selectedShiftOptions, 'selectedShiftOptions');
  }

  onVersionSelectionChange(event: any)
  {
    let value = null;

    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }

    this.selectedVersionOptions = this.versions
      .filter(option => value.includes(option.value))
      .map(option => `{${option.value},${option.name}}`)
      .join(',');
    console.log(this.selectedVersionOptions, 'selectedVersionOptions');
  }

  onCategorySelectionChange(event: any)
  {
    let value = null;

    if (event.value != null)
    {
      value = event.value;
    }
    else
    {
      value = event;
    }

    this.selectedCategoryOptions = this.categories
      .filter(option => value.includes(option.value))
      .map(option => `{${option.value},${option.name}}`)
      .join(',');
    console.log(this.selectedCategoryOptions, 'selectedCategoryOptions');
  }

  checkDeselectionPermission(option)
  {
    console.log(option, 'checkDeselectionPermission');

    let body = {
      "id": 0,
      "circularId": this.CircularData.CircularId,
      "programId": option,
    }

    this._superAdminService.CheckAppiledPrograms(body).subscribe((data: any) =>
    {
      console.log(data, "CheckAppiledPrograms");
      if (data.isError == false && data.data === "Applied")
      {
        this.classSetup.get('step1.programCtrl').setValue(this.previouslySelectedOptions);

        this.matSnackBar.open("Students Have Already Applied For This Program", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    }, (error: any) =>
    {
      this.errorMessage = error.message;
      this.matSnackBar.open("Couldn't Find Information, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  ClassSetup(): void
  {
    let ccc_form = this.classSetup.getRawValue();

    if (ccc_form.step2.ageOn == null)
    {
      ccc_form.step2.ageOn = '';
    }

    if (ccc_form.step2.lotteryDateTime == null)
    {
      ccc_form.step2.lotteryDateTime = '';
    }

    if (ccc_form.step2.writtenExamDateTime == null)
    {
      ccc_form.step2.writtenExamDateTime = '';
    }

    if (ccc_form.step2.resultExamDateTime == null)
    {
      ccc_form.step2.resultExamDateTime = '';
    }

    if (ccc_form.step2.vivaDateTime == null)
    {
      ccc_form.step2.vivaDateTime = '';
    }

    let body = {
      "circularId": this.CircularData.CircularId,
      "circularType": this.CircularType,
      "programs": this.selectedProgramOptions,
      "groups": this.selectedGroupOptions != null ? this.selectedGroupOptions : "0",
      "shifts": this.selectedShiftOptions,
      "versions": this.selectedVersionOptions,
      "studentCategories": this.selectedCategoryOptions,
      "sessionId": Number(ccc_form.step1.sessionCtrl),
      "rollCategory": Number(ccc_form.step2.rollType),
      "rollSuffix": "",
      "rangeFrom": 0,
      "rangeTo": 0,
      "isInstantAdmit": "",
      "admitDownloadDate": null,
      "isAgeLimit": ccc_form.step2.limitAge == true ? "Y" : "N",
      "ageConditionDate": ccc_form.step2.ageOn != "" ? this.myFormatDatetime(ccc_form.step2.ageOn.toString()) : '',
      "minimumAge": ccc_form.step2.minimumAgeMonth != "" ? Number(ccc_form.step2.minimumAgeMonth) : 0,
      "maximumAge": ccc_form.step2.maximumAgeMonth != "" ? Number(ccc_form.step2.maximumAgeMonth) : 0,
      "genderType": ccc_form.step2.applicableforGender != "" ? ccc_form.step2.applicableforGender : "",
      "lotteryDate": ccc_form.step2.lotteryDateTime != '' ? this.myFormatDatetime(ccc_form.step2.lotteryDateTime.toString()) : '',
      "lotteryTime": ccc_form.step2.lotteryDateTime != '' ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.lotteryDateTime.toString()), 'time') : '',
      "examDate": ccc_form.step2.writtenExamDateTime != '' ? this.myFormatDatetime(ccc_form.step2.writtenExamDateTime.toString()) : '',
      "examTime": ccc_form.step2.writtenExamDateTime != '' ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.writtenExamDateTime.toString()), 'time') : '',
      "resultDate": ccc_form.step2.resultExamDateTime != '' ? this.myFormatDatetime(ccc_form.step2.resultExamDateTime.toString()) : '',
      "resultTime": ccc_form.step2.resultExamDateTime != '' ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.resultExamDateTime.toString()), 'time') : '',
      "vivaVoceDate": ccc_form.step2.vivaDateTime != '' ? this.myFormatDatetime(ccc_form.step2.vivaDateTime.toString()) : '',
      "vivaTime": ccc_form.step2.vivaDateTime != '' ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.vivaDateTime.toString()), 'time') : '',

      "formAmount": ccc_form.step2.formAmount != "" ? Number(ccc_form.step2.formAmount) : 0,
      "bankCharge": ccc_form.step2.bankCharge != "" ? Number(ccc_form.step2.bankCharge) : 0,
      "moneyReceipt": "",
      "admissionForm": "",
      "admitCondition": "",
      "activeStatus": ccc_form.step2.active != "" ? ccc_form.step2.active : false,
    }

    console.log(body, 'body');

    // debugger;


    this._superAdminService.SaveCircularDetails(body).subscribe((data: any) =>
    {
      console.log(data, "data");
      if (data.isError == false)
      {
        this.matSnackBar.open("Circular Created Successfully", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.dialogRef.close("call_InitialPage");
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


    // console.log(cmccs_form, "FormParamSchoolClassSetup");
  }

  UpdateClassSetup(): void
  {
    let ccc_form = this.classSetup.getRawValue();

    if (ccc_form.step2.ageOn == null)
    {
      ccc_form.step2.ageOn = '';
    }

    if (ccc_form.step2.lotteryDateTime == null)
    {
      ccc_form.step2.lotteryDateTime = '';
    }

    if (ccc_form.step2.writtenExamDateTime == null)
    {
      ccc_form.step2.writtenExamDateTime = '';
    }

    if (ccc_form.step2.resultExamDateTime == null)
    {
      ccc_form.step2.resultExamDateTime = '';
    }

    if (ccc_form.step2.vivaDateTime == null)
    {
      ccc_form.step2.vivaDateTime = '';
    }

    let body = {
      "id": this.ActionType == 'update' ? this.CircularData.Id : 0,
      "circularId": this.CircularData.CircularId,
      "programId": Number(ccc_form.step1.programCtrl),
      "groupId": ccc_form.step1.groupCtrl != "" ? Number(ccc_form.step1.groupCtrl) : 0,
      "shiftId": Number(ccc_form.step1.shiftCtrl),
      "versionId": Number(ccc_form.step1.versionCtrl),
      "studentCatId": Number(ccc_form.step1.categoryCtrl),
      "sessionId": Number(ccc_form.step1.sessionCtrl),
      "rollCategory": Number(ccc_form.step2.rollType),
      "rollSuffix": "",
      "rangeFrom": 0,
      "rangeTo": 0,
      "isInstantAdmit": "",
      "admitDownloadDate": null,
      "isAgeLimit": ccc_form.step2.limitAge == true ? "Y" : "N",
      "ageConditionDate": ccc_form.step2.ageOn != "" ? this.myFormatDatetime(ccc_form.step2.ageOn.toString()) : '',
      "minimumAge": ccc_form.step2.minimumAgeMonth != "" ? Number(ccc_form.step2.minimumAgeMonth) : 0,
      "maximumAge": ccc_form.step2.maximumAgeMonth != "" ? Number(ccc_form.step2.maximumAgeMonth) : 0,
      "genderType": ccc_form.step2.applicableforGender != "" ? ccc_form.step2.applicableforGender : "",
      "lotteryDate": ccc_form.step2.lotteryDateTime != "" ? this.myFormatDatetime(ccc_form.step2.lotteryDateTime.toString()) : '',
      "lotteryTime": ccc_form.step2.lotteryDateTime != "" ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.lotteryDateTime.toString()), 'time') : '',
      "examDate": ccc_form.step2.writtenExamDateTime != "" ? this.myFormatDatetime(ccc_form.step2.writtenExamDateTime.toString()) : '',
      "examTime": ccc_form.step2.writtenExamDateTime != "" ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.writtenExamDateTime.toString()), 'time') : '',
      "resultDate": ccc_form.step2.resultExamDateTime != "" ? this.myFormatDatetime(ccc_form.step2.resultExamDateTime.toString()) : '',
      "resultTime": ccc_form.step2.resultExamDateTime != "" ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.resultExamDateTime.toString()), 'time') : '',
      "vivaVoceDate": ccc_form.step2.vivaDateTime != "" ? this.myFormatDatetime(ccc_form.step2.vivaDateTime.toString()) : '',
      "vivaTime": ccc_form.step2.vivaDateTime != "" ? this.extractDateTime(this.myFormatDatetime(ccc_form.step2.vivaDateTime.toString()), 'time') : '',

      "formAmount": ccc_form.step2.formAmount != "" ? Number(ccc_form.step2.formAmount) : 0,
      "bankCharge": ccc_form.step2.bankCharge != "" ? Number(ccc_form.step2.bankCharge) : 0,
      "moneyReceipt": "",
      "admissionForm": "",
      "admitCondition": "",
      "activeStatus": ccc_form.step2.active != "" ? ccc_form.step2.active : false,
    }

    // debugger;
    console.log(body, 'body');

    if (this.ActionType == 'update')
    {
      this._superAdminService.UpdateCircularDetails(body).subscribe((data: any) =>
      {
        console.log(data, "data");
        if (data.isError == false)
        {
          this.matSnackBar.open("Circular Updated Successfully", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.dialogRef.close("call_InitialPage");
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
    else
    {
      this._superAdminService.CopyCircularDetails(body).subscribe((data: any) =>
      {
        console.log(data, "data");
        if (data.isError == false)
        {
          this.matSnackBar.open("Circular Duplicated Successfully", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.dialogRef.close("call_InitialPage");
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
    // console.log(cmccs_form, "FormParamSchoolClassSetup");
  }



  extractDateTime(inputStr: string, returnType: 'date' | 'time'): string
  {
    if (returnType === 'date')
    {
      // Extract and format the date in 'dd-mm-yyyy' format
      const [year, month, day] = inputStr.slice(0, 10).split('-');
      return `${day}-${month}-${year}`;
    } else if (returnType === 'time')
    {
      // Extract and format the time in 'HH:MM' format
      const [hours, minutes] = inputStr.slice(11, 16).split(':');
      return `${hours}:${minutes}`;
    } else
    {
      return '';
    }
  }

  // ExtractFormData(data)
  // {
  //   let result = {
  //     "ProgramId": [],
  //     "GroupId": [],
  //     "ShiftId": [],
  //     "VersionId": [],
  //     "StudentCatId": []
  //   };

  //   data.forEach(item =>
  //   {
  //     result["ProgramId"].push(item.ProgramId.toString());
  //     result["GroupId"].push(item.GroupId.toString());
  //     result["ShiftId"].push(item.ShiftId.toString());
  //     result["VersionId"].push(item.VersionId.toString());
  //     result["StudentCatId"].push(item.StudentCatId.toString());
  //   });


  //   result["SessionId"] = data[0].SessionId;
  //   result["RollCategory"] = data[0].RollCategory;
  //   result["FormAmount"] = data[0].FormAmount;
  //   result["AdmitDownloadDate"] = data[0].AdmitDownloadDate;
  //   result["IsAgeLimit"] = data[0].IsAgeLimit;
  //   result["AgeConditionDate"] = data[0].AgeConditionDate;
  //   result["MinimumAge"] = data[0].MinimumAge;
  //   result["MaximumAge"] = data[0].MaximumAge;
  //   result["GenderType"] = data[0].GenderType;
  //   result["LotteryDate"] = data[0].LotteryDate;
  //   result["LotteryTime"] = data[0].LotteryTime;
  //   result["ExamDate"] = data[0].ExamDate;
  //   result["ExamTime"] = data[0].ExamTime;
  //   result["ResultDate"] = data[0].ResultDate;
  //   result["ResultTime"] = data[0].ResultTime;
  //   result["VivaVoceDate"] = data[0].VivaVoceDate;
  //   result["VivaTime"] = data[0].VivaTime;
  //   result["BankCharge"] = data[0].BankCharge;
  //   result["ActiveStatus"] = data[0].ActiveStatus;

  //   return result;
  // }
  ExtractFormData(data)
  {
    let result: any = {
      ProgramId: [...new Set(data.map(item => item.ProgramId.toString()))],
      GroupId: [...new Set(data.map(item => item.GroupId.toString()))],
      ShiftId: [...new Set(data.map(item => item.ShiftId.toString()))],
      VersionId: [...new Set(data.map(item => item.VersionId.toString()))],
      StudentCatId: [...new Set(data.map(item => item.StudentCatId.toString()))],
    };

    result.SessionId = data[0].SessionId;
    result.RollCategory = data[0].RollCategory;
    result.FormAmount = data[0].FormAmount;
    result.AdmitDownloadDate = data[0].AdmitDownloadDate;
    result.IsAgeLimit = data[0].IsAgeLimit;
    result.AgeConditionDate = data[0].AgeConditionDate;
    result.MinimumAge = data[0].MinimumAge;
    result.MaximumAge = data[0].MaximumAge;
    result.GenderType = data[0].GenderType;
    result.LotteryDate = data[0].LotteryDate;
    result.LotteryTime = data[0].LotteryTime;
    result.ExamDate = data[0].ExamDate;
    result.ExamTime = data[0].ExamTime;
    result.ResultDate = data[0].ResultDate;
    result.ResultTime = data[0].ResultTime;
    result.VivaVoceDate = data[0].VivaVoceDate;
    result.VivaTime = data[0].VivaTime;
    result.BankCharge = data[0].BankCharge;
    result.ActiveStatus = data[0].ActiveStatus;

    return result;
  }




  public myFormatDatetime(data)
  {
    const date = new Date(data.toString());
    const offsetMinutes = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offsetMinutes);
    return date.toISOString();
  }


}


