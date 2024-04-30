import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { map, Observable, startWith } from 'rxjs';
import { FormParamSchoolCollegeClassSetup_Interface } from '../../superAdmin.data';
import { SuperAdminService } from '../../superAdmin.service';

@Component({
  selector: 'app-circular-modal-school-class-setup',
  templateUrl: './circular-modal-school-class-setup.component.html',
  styleUrls: ['./circular-modal-school-class-setup.component.scss']
})

export class CircularModalSchoolClassSetupComponent implements OnInit
{

  FormParam: any;
  DefaultControls: any;
  selectedGenderValue: any;
  selectedProgramName: any;
  selectedGroupName: any;
  selectedVersionName: any;
  selectedSessionName: any;
  selectedCategoryName: any;
  selectedGenderName: any;
  selectedShiftName: any;

  errorMessage: string = null;
  isDisabled: boolean = true;
  classSetup: UntypedFormGroup;

  finalSelectedPrograms: any;
  finalSelectedShifts: string = '';
  finalSelectedVersions: string = '';
  finalSelectedCategories: string = '';
  finalSelectedSessions: any;
  finalSelectedGroups: any;
  formattedSelectedPrograms: string = '';
  formattedSelectedGroups: string = '';
  formattedSelectedShifts: string = '';
  formattedSelectedVersions: string = '';
  formattedSelectedCategories: string = '';

  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredPrograms: Observable<string[]>;
  filteredGroups: Observable<string[]>;
  filteredShifts: Observable<string[]>;
  filteredVersions: Observable<string[]>;
  filteredCategories: Observable<string[]>;
  filteredSessions: Observable<string[]>;

  programs: any[] = [];
  groups: any[] = [];
  shifts: any[] = [];
  versions: any[] = [];
  categories: any[] = [];
  sessions: any[] = [];
  genders: any[] = [];

  allPrograms: any = [];
  allGroups: any = [];
  allShifts: any = [];
  allVersions: any = [];
  allCategories: any = [];
  allSessions: any = [];

  @ViewChild('programInput') programInput: ElementRef<HTMLInputElement>;
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>;
  @ViewChild('shiftInput') shiftInput: ElementRef<HTMLInputElement>;
  @ViewChild('versionInput') versionInput: ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('sessionInput') sessionInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatStepper) stepper: MatStepper;

  data: any;
  fetchingData = true;
  foundError = false;
  addOnBlur = false;

  // searchControl = new FormControl('');
  // programControl = new FormControl('');
  newProgram: string;

  constructor(
    private _superAdminService: SuperAdminService,
    private _formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CircularModalSchoolClassSetupComponent>
  )
  {
    if (this._superAdminService.FormParam)
    {
      this.FormParam = JSON.parse(this._superAdminService.FormParam);
    }
  }

  ngOnInit(): void
  {
    this._superAdminService.GetCircularDefaultControls(this.FormParam.SelectedClientId, 's').subscribe(
      (data: any) =>
      {
        this.DefaultControls = data?.data;

        this.programs = this.DefaultControls.Programs;
        this.groups = this.DefaultControls.Groups;
        this.shifts = this.DefaultControls.Shifts;
        this.versions = this.DefaultControls.Versions;
        this.categories = this.DefaultControls.Categories;
        this.sessions = this.DefaultControls.Sessions;
        this.genders = this.DefaultControls.Genders;

        this.allPrograms = this.programs;
        this.allGroups = this.groups;
        this.allShifts = this.shifts;
        this.allVersions = this.versions;
        this.allCategories = this.categories;
        this.allSessions = this.sessions;

        this.programs = [];
        this.groups = [];
        this.shifts = [];
        this.versions = [];
        this.categories = [];
        this.sessions = [];

        this.filteredPrograms = this.classSetup.get('programCtrl').valueChanges.pipe(
          startWith(''),
          map((program: string | null) => (program ? this._filterProgram(program) : this.allPrograms.slice())),
        );

        this.filteredGroups = this.classSetup.get('groupCtrl').valueChanges.pipe(
          startWith(''),
          map((group: string | null) => (group ? this._filterGroup(group) : this.allGroups.slice())),
        );

        this.filteredShifts = this.classSetup.get('shiftCtrl').valueChanges.pipe(
          startWith(''),
          map((shift: string | null) => (shift ? this._filterShift(shift) : this.allShifts.slice())),
        );

        this.filteredVersions = this.classSetup.get('versionCtrl').valueChanges.pipe(
          startWith(''),
          map((version: string | null) => (version ? this._filterVersion(version) : this.allVersions.slice())),
        );

        this.filteredCategories = this.classSetup.get('categoryCtrl').valueChanges.pipe(
          startWith(''),
          map((category: string | null) => (category ? this._filterCategory(category) : this.allCategories.slice())),
        );

        this.filteredSessions = this.classSetup.get('sessionCtrl').valueChanges.pipe(
          startWith(''),
          map((session: string | null) => (session ? this._filterSession(session) : this.allSessions.slice())),
        );

        this.selectedGender();
      });

    this.classSetup = this._formBuilder.group({
      programCtrl: ["", Validators.required],
      groupCtrl: [{ value: '', disabled: true }, Validators.required],
      shiftCtrl: ['', Validators.required],
      versionCtrl: ['', Validators.required],
      categoryCtrl: ['', Validators.required],
      sessionCtrl: ['', Validators.required],
      rollType: [{ value: '', disabled: true }],
      instantAdmitCard: [{ value: '', disabled: true }, Validators.required],
      admitCardDownloadDate: [{ value: '', disabled: true }, Validators.required],
      ageLimit: [{ value: '', disabled: true }, Validators.required],
      ageConditionalDate: [{ value: '', disabled: true }, Validators.required],
      minimumAge: [{ value: '', disabled: true }, Validators.required],
      maximumAge: [{ value: '', disabled: true }, Validators.required],
      genderCtrl: ['', Validators.required],
      lotteryDate: [{ value: '', disabled: true }, Validators.required],
      writtenExamdate: [{ value: '', disabled: true }, Validators.required],
      resultDate: [{ value: '', disabled: true }, Validators.required],
      vivaDate: [{ value: '', disabled: true }, Validators.required],
      formAmount: [{ value: '', disabled: true }, Validators.required],
      bankCharge: [{ value: '', disabled: true }, Validators.required],
      status: [{ value: '', disabled: true }, Validators.required],
    });
  }

  addProgram(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    if (value)
    {
      this.programs.push(value);
    }
    event.chipInput!.clear();
    this.classSetup.get('programCtrl').setValue(null);
  }

  addGroup(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    if (value)
    {
      this.groups.push(value);
    }
    event.chipInput!.clear();
    this.classSetup.get('groupCtrl').setValue(null);
  }

  addShift(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    if (value)
    {
      this.shifts.push(value);
    }
    event.chipInput!.clear();
    this.classSetup.get('shiftCtrl').setValue(null);
  }

  addVersion(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    if (value)
    {
      this.versions.push(value);
    }
    event.chipInput!.clear();
    this.classSetup.get('versionCtrl').setValue(null);
  }

  addCategory(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    if (value)
    {
      this.categories.push(value);
    }
    event.chipInput!.clear();
    this.classSetup.get('categoryCtrl').setValue(null);
  }

  addSession(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    if (value)
    {
      this.sessions.push(value);
    }
    event.chipInput!.clear();
    this.classSetup.get('sessionCtrl').setValue(null);
  }

  removeProgram(program: string): void
  {
    const index = this.programs.indexOf(program);

    if (index >= 0)
    {
      this.programs.splice(index, 1);
    }
  }

  removeGroup(group: string): void
  {
    const index = this.groups.indexOf(group);

    if (index >= 0)
    {
      this.groups.splice(index, 1);
    }
  }

  removeShift(shift: string): void
  {
    const index = this.shifts.indexOf(shift);

    if (index >= 0)
    {
      this.shifts.splice(index, 1);
    }
  }

  removeVersion(version: string): void
  {
    const index = this.versions.indexOf(version);

    if (index >= 0)
    {
      this.versions.splice(index, 1);
    }
  }

  removeCategory(category: string): void
  {
    const index = this.categories.indexOf(category);

    if (index >= 0)
    {
      this.categories.splice(index, 1);
    }
  }

  removeSession(session: string): void
  {
    const index = this.sessions.indexOf(session);

    if (index >= 0)
    {
      this.sessions.splice(index, 1);
    }
  }

  selectedPrograms(event: MatAutocompleteSelectedEvent): void
  {
    const selectedProgram = this.allPrograms.find(program => program.name === event.option.viewValue);
    if (selectedProgram)
    {
      this.programs.push(selectedProgram);
    }
    this.programInput.nativeElement.value = '';
    this.classSetup.get('programCtrl').setValue(null);

    const selectedPrograms = this.programs.map(program => ({ value: program.value, name: program.name }));

    const formattedSelectedPrograms = selectedPrograms.map(program => `{${program.value},${program.name}}`).join(',');

    this.finalSelectedPrograms = formattedSelectedPrograms;

    this.selectedProgramName = selectedProgram.name;
  }


  selectedGroups(event: MatAutocompleteSelectedEvent): void
  {
    const selectedGroup = this.allGroups.find(group => group.name === event.option.viewValue);
    if (selectedGroup)
    {
      this.groups.push(selectedGroup);
    }
    this.groupInput.nativeElement.value = '';
    this.classSetup.get('groupCtrl').setValue(null);

    const selectedGroups = this.groups.map(group => ({ value: group.value, name: group.name }));

    const formattedSelectedGroups = selectedGroups.map(group => `${group.value}`).join(',');


    this.finalSelectedGroups = formattedSelectedGroups;

    this.selectedGroupName = selectedGroup.name;
  }

  selectedShifts(event: MatAutocompleteSelectedEvent): void
  {
    const selectedShift = this.allShifts.find(shift => shift.name === event.option.viewValue);
    if (selectedShift)
    {
      this.shifts.push(selectedShift);
    }
    this.shiftInput.nativeElement.value = '';
    this.classSetup.get('shiftCtrl').setValue(null);

    const selectedShifts = this.shifts.map(shift => ({ value: shift.value, name: shift.name }));

    const formattedSelectedShifts = selectedShifts.map(shift => `{${shift.value},${shift.name}}`).join(',');

    this.finalSelectedShifts = formattedSelectedShifts;

    this.selectedShiftName = selectedShift.name;
  }

  selectedVersions(event: MatAutocompleteSelectedEvent): void
  {
    const selectedVersion = this.allVersions.find(version => version.name === event.option.viewValue);
    if (selectedVersion)
    {
      this.versions.push(selectedVersion);
    }
    this.shiftInput.nativeElement.value = '';
    this.classSetup.get('shiftCtrl').setValue(null);

    const selectedVersions = this.versions.map(version => ({ value: version.value, name: version.name }));

    const formattedSelectedVersions = selectedVersions.map(version => `{${version.value},${version.name}}`).join(',');

    this.finalSelectedVersions = formattedSelectedVersions;

    this.selectedVersionName = selectedVersion.name;
  }

  selectedCategories(event: MatAutocompleteSelectedEvent): void
  {
    const selectedCategory = this.allCategories.find(category => category.name === event.option.viewValue);
    if (selectedCategory)
    {
      this.categories.push(selectedCategory);
    }
    this.categoryInput.nativeElement.value = '';
    this.classSetup.get('categoryCtrl').setValue(null);

    const selectedCategories = this.categories.map(category => ({ value: category.value, name: category.name }));

    const formattedSelectedCategories = selectedCategories.map(category => `{${category.value},${category.name}}`).join(',');

    this.finalSelectedCategories = formattedSelectedCategories;

    this.selectedCategoryName = selectedCategory.name;
  }

  selectedSessions(event: MatAutocompleteSelectedEvent): void
  {
    const selectedSession = this.allSessions.find(session => session.name === event.option.viewValue);
    if (selectedSession)
    {
      this.sessions.push(selectedSession);
    }
    this.sessionInput.nativeElement.value = '';
    this.classSetup.get('sessionCtrl').setValue(null);

    const selectedSessions = this.sessions.map(session => ({ value: session.value, name: session.name }));

    // const formattedSelectedSessions = selectedSessions.map(session => `{${session.value},${session.name}}`).join(',');
    const formattedSelectedSessions = selectedSessions.map(session => `${session.value}`).join(',');

    this.finalSelectedSessions = formattedSelectedSessions;

    this.selectedSessionName = selectedSession.name;
  }

  selectedGender()
  {
    const genderCtrl = this.classSetup.get('genderCtrl');
    if (genderCtrl.value)
    {
      const selectedGenderName = genderCtrl.value;
      this.selectedGenderValue = this.genders.find(gender => gender.name === selectedGenderName)?.value;
      console.log(this.selectedGenderValue);
    }
  }

  private _filterProgram(value: string): string[]
  {
    const filterValue = value;
    return this.allPrograms.filter(program => program.name.toLowerCase().includes(filterValue)).map(program => program.name);
  }

  private _filterGroup(value: string): string[]
  {
    const filterValue = value;
    return this.allGroups.filter(group => group.name.toLowerCase().includes(filterValue)).map(group => group.name);
  }

  private _filterShift(value: string): string[]
  {
    const filterValue = value;
    return this.allShifts.filter(shift => shift.name.toLowerCase().includes(filterValue)).map(shift => shift.name);
  }

  private _filterVersion(value: string): string[]
  {
    const filterValue = value;
    return this.allVersions.filter(version => version.name.toLowerCase().includes(filterValue)).map(version => version.name);
  }

  private _filterCategory(value: string): string[]
  {
    const filterValue = value;
    return this.allCategories.filter(category => category.name.toLowerCase().includes(filterValue)).map(category => category.name);
  }

  private _filterSession(value: string): string[]
  {
    const filterValue = value;
    return this.allSessions.filter(session => session.name.toLowerCase().includes(filterValue)).map(session => session.name);
  }

  clearForm(): void
  {
    this.classSetup.reset();
    this.programs = [];
    this.shifts = [];
    this.versions = [];
    this.categories = [];
    this.sessions = [];
  }

  goToNextStep()
  {
    this.stepper.next();
  }

  schoolClassSetup(): void
  {

    let cmscs_form: FormParamSchoolCollegeClassSetup_Interface = {};

    cmscs_form = {
      "circularId": this.FormParam.SelectedCircularId ? this.FormParam.SelectedCircularId : "",
      "circularType": "School",
      "programs": this.finalSelectedPrograms ? this.finalSelectedPrograms : "",
      "groups": "0",
      "shifts": this.finalSelectedShifts ? this.finalSelectedShifts : "",
      "versions": this.finalSelectedVersions ? this.finalSelectedVersions : "",
      "studentCategories": this.finalSelectedCategories ? this.finalSelectedCategories : "",
      "sessionId": parseInt(this.finalSelectedSessions) ? parseInt(this.finalSelectedSessions) : 0,
      "rollCategory": 1,
      "rollSuffix": "xyz",
      "isInstantAdmit": "N",
      "admitDownloadDate": "2023-02-06T05:47:36.484Z",
      "isAgeLimit": "N",
      "minimumAge": 0,
      "maximumAge": 0,
      "genderType": this.selectedGenderValue,
      "lotteryDate": "2023-01-28T05:47:36.484Z",
      "lotteryTime": "02:30",
      "examDate": "2023-01-29T05:47:36.484Z",
      "examTime": "09:00",
      "resultDate": "2023-02-05T05:47:36.484Z",
      "resultTime": "01:00",
      "vivaVoceDate": "2023-02-02T05:47:36.484Z",
      "vivaTime": "09:00",
      "formAmount": 500,
      "bankCharge": 30,
      "admitCondition": "N/A",
      "activeStatus": true
    };

    this._superAdminService.SaveCircularDetails(cmscs_form).subscribe((data: any) =>
    {
      console.log(data, "data");
      if (data.isError == false)
      {
        this.matSnackBar.open("School Circular Created", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.dialogRef.close(cmscs_form);
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

    // FormParamSchoolClassSetupName = {
    //   programs: this.selectedProgramName,
    //   groups: this.selectedGroupName,
    //   shifts: this.selectedShiftName,
    //   versions: this.selectedVersionName,
    //   studentCategories: this.selectedCategoryName,
    //   sessionId: this.selectedSessionName,
    //   rollCategory: 2,
    //   formAmount: 500,
    //   activeStatus: true
    // };

    this.dialogRef.close(cmscs_form);

    console.log(cmscs_form, "FormParamSchoolClassSetup");

    console.log(cmscs_form.programs, "SelectedCircularId");
  }

  cancel()
  {
    this.dialogRef.close();
  }
}
