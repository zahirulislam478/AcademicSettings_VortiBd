import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subject, forkJoin, map, takeUntil } from "rxjs";
import { AdmssionStudentUpdateService } from "./admssion-student-update.service";
import { MatStepper, MatStepperIntl, StepperOrientation } from "@angular/material/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { FuseConfigService } from "@fuse/services/config";
import { BaseControl } from "app/models/dynamic-form";
import { DashboardService } from "../admin/dashboard/dashboard.service";
import Utils from "app/Utility/utils";
import * as moment from 'moment';

@Component({
  selector: "app-admssion-student-update",
  templateUrl: "./admssion-student-update.component.html",
  styleUrls: ["./admssion-student-update.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AdmssionStudentUpdateComponent
{

  StudentControl = new FormControl('');

  @Input() controls1: BaseControl<string>[] = [];
  @Input() controls2: BaseControl<string>[] = [];
  @Input() QuotaInvalid: boolean;
  @Input() GenderInvalid: boolean;

  @Output() closeStepper = new EventEmitter<{ close: boolean }>();

  @ViewChild("horizontalStepper") stepper: MatStepper;

  stepperOrientation: Observable<StepperOrientation>;

  form1: FormGroup;
  form2: FormGroup;

  errorMessage: string = null;
  studentSaveData = null;
  guardianSaveData = null;
  addressSaveData = null;
  prevAcademicForSchoolSaveData = null;
  prevAcademicForCollegeSaveData = null;
  courseCurriculumSaveData = null;

  studentForm_s = null;


  addressInfo = null;
  guardianInfo = null;
  courseCurriculumForCollege = null;
  previousAcademicInfoCollege = null;
  PSC_previousAcademicInfoCollege = null;
  JSC_JDC_previousAcademicInfoCollege = null;
  SSC_Dakhil_previousAcademicInfoCollege = null;
  HSC_Alim_previousAcademicInfoCollege = null;
  Hons_Fazil_previousAcademicInfoCollege = null;
  Masters_Kamil_previousAcademicInfoCollege = null;
  BBA_previousAcademicInfoCollege = null;
  MBA_previousAcademicInfoCollege = null;
  previousAcademicInfoforSchool = null;
  studentFormInfo = null;
  MainDropdownData: any; //= mdcccc;
  MainAppliedData = null;
  CurriculumSubjectsList = null;
  gotInterestedClubs = null;
  studentInfoShow = true;
  guardianInfoShow = true;
  addressInfoShow = true;
  defenceInfoShow = true;
  academicInfoforCollegeShow = true;
  academicInfoforSchoolShow = true;
  courseCurriculumCollegeShow = true;
  fetchingData = true;
  submitted = false;
  foundError = false;
  banner = false;



  PSC_previousAcademicInfoCollegeGroup = null;
  PSC_previousAcademicInfoCollegeRollNo = null;
  PSC_previousAcademicInfoCollegeBoard = null;
  PSC_previousAcademicInfoCollegeRegNo = null;
  PSC_previousAcademicInfoCollegePassingYear = null;
  PSC_previousAcademicInfoCollegeInstitute = null;
  PSC_previousAcademicInfoCollegeExamHeldIn = null;
  PSC_previousAcademicInfoCollegeGPA = null;
  PSC_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  PSC_previousAcademicInfoCollegeExamination = null;
  PSC_previousAcademicInfoCollegeSubject = null;
  PSC_previousAcademicInfoCollegeDistrict = null;
  PSC_previousAcademicInfoCollegeFromSession = null;
  PSC_previousAcademicInfoCollegeToSession = null;
  PSC_previousAcademicInfoCollegeCourseDuration = null;
  PSC_previousAcademicInfoCollegeTotalCredit = null;
  PSC_previousAcademicInfoCollegeCentreCode = null;
  PSC_previousAcademicInfoCollegeObtainedOutofno = null;
  PSC_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  PSC_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  PSC_previousAcademicInfoCollegeObtainedResult = null;

  PSC_previousAcademicInfoCollegeGroup_req = null;
  PSC_previousAcademicInfoCollegeRollNo_req = null;
  PSC_previousAcademicInfoCollegeBoard_req = null;
  PSC_previousAcademicInfoCollegeRegNo_req = null;
  PSC_previousAcademicInfoCollegePassingYear_req = null;
  PSC_previousAcademicInfoCollegeInstitute_req = null;
  PSC_previousAcademicInfoCollegeExamHeldIn_req = null;
  PSC_previousAcademicInfoCollegeGPA_req = null;
  PSC_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  PSC_previousAcademicInfoCollegeExamination_req = null;
  PSC_previousAcademicInfoCollegeSubject_req = null;
  PSC_previousAcademicInfoCollegeDistrict_req = null;
  PSC_previousAcademicInfoCollegeFromSession_req = null;
  PSC_previousAcademicInfoCollegeToSession_req = null;
  PSC_previousAcademicInfoCollegeCourseDuration_req = null;
  PSC_previousAcademicInfoCollegeTotalCredit_req = null;
  PSC_previousAcademicInfoCollegeCentreCode_req = null;
  PSC_previousAcademicInfoCollegeObtainedOutofno_req = null;
  PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  PSC_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  PSC_previousAcademicInfoCollegeObtainedResult_req = null;

  PSC_previousAcademicInfoCollegeGroup_vis = null;
  PSC_previousAcademicInfoCollegeRollNo_vis = null;
  PSC_previousAcademicInfoCollegeBoard_vis = null;
  PSC_previousAcademicInfoCollegeRegNo_vis = null;
  PSC_previousAcademicInfoCollegePassingYear_vis = null;
  PSC_previousAcademicInfoCollegeInstitute_vis = null;
  PSC_previousAcademicInfoCollegeExamHeldIn_vis = null;
  PSC_previousAcademicInfoCollegeGPA_vis = null;
  PSC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  PSC_previousAcademicInfoCollegeExamination_vis = null;
  PSC_previousAcademicInfoCollegeSubject_vis = null;
  PSC_previousAcademicInfoCollegeDistrict_vis = null;
  PSC_previousAcademicInfoCollegeFromSession_vis = null;
  PSC_previousAcademicInfoCollegeToSession_vis = null;
  PSC_previousAcademicInfoCollegeCourseDuration_vis = null;
  PSC_previousAcademicInfoCollegeTotalCredit_vis = null;
  PSC_previousAcademicInfoCollegeCentreCode_vis = null;
  PSC_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  PSC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  PSC_previousAcademicInfoCollegeObtainedResult_vis = null;

  JSC_JDC_previousAcademicInfoCollegeGroup = null;
  JSC_JDC_previousAcademicInfoCollegeRollNo = null;
  JSC_JDC_previousAcademicInfoCollegeBoard = null;
  JSC_JDC_previousAcademicInfoCollegeRegNo = null;
  JSC_JDC_previousAcademicInfoCollegePassingYear = null;
  JSC_JDC_previousAcademicInfoCollegeInstitute = null;
  JSC_JDC_previousAcademicInfoCollegeExamHeldIn = null;
  JSC_JDC_previousAcademicInfoCollegeGPA = null;
  JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  JSC_JDC_previousAcademicInfoCollegeExamination = null;
  JSC_JDC_previousAcademicInfoCollegeSubject = null;
  JSC_JDC_previousAcademicInfoCollegeDistrict = null;
  JSC_JDC_previousAcademicInfoCollegeFromSession = null;
  JSC_JDC_previousAcademicInfoCollegeToSession = null;
  JSC_JDC_previousAcademicInfoCollegeCourseDuration = null;
  JSC_JDC_previousAcademicInfoCollegeTotalCredit = null;
  JSC_JDC_previousAcademicInfoCollegeCentreCode = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedOutofno = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedResult = null;

  JSC_JDC_previousAcademicInfoCollegeGroup_req = null;
  JSC_JDC_previousAcademicInfoCollegeRollNo_req = null;
  JSC_JDC_previousAcademicInfoCollegeBoard_req = null;
  JSC_JDC_previousAcademicInfoCollegeRegNo_req = null;
  JSC_JDC_previousAcademicInfoCollegePassingYear_req = null;
  JSC_JDC_previousAcademicInfoCollegeInstitute_req = null;
  JSC_JDC_previousAcademicInfoCollegeExamHeldIn_req = null;
  JSC_JDC_previousAcademicInfoCollegeGPA_req = null;
  JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  JSC_JDC_previousAcademicInfoCollegeExamination_req = null;
  JSC_JDC_previousAcademicInfoCollegeSubject_req = null;
  JSC_JDC_previousAcademicInfoCollegeDistrict_req = null;
  JSC_JDC_previousAcademicInfoCollegeFromSession_req = null;
  JSC_JDC_previousAcademicInfoCollegeToSession_req = null;
  JSC_JDC_previousAcademicInfoCollegeCourseDuration_req = null;
  JSC_JDC_previousAcademicInfoCollegeTotalCredit_req = null;
  JSC_JDC_previousAcademicInfoCollegeCentreCode_req = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_req = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedResult_req = null;

  JSC_JDC_previousAcademicInfoCollegeGroup_vis = null;
  JSC_JDC_previousAcademicInfoCollegeRollNo_vis = null;
  JSC_JDC_previousAcademicInfoCollegeBoard_vis = null;
  JSC_JDC_previousAcademicInfoCollegeRegNo_vis = null;
  JSC_JDC_previousAcademicInfoCollegePassingYear_vis = null;
  JSC_JDC_previousAcademicInfoCollegeInstitute_vis = null;
  JSC_JDC_previousAcademicInfoCollegeExamHeldIn_vis = null;
  JSC_JDC_previousAcademicInfoCollegeGPA_vis = null;
  JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  JSC_JDC_previousAcademicInfoCollegeExamination_vis = null;
  JSC_JDC_previousAcademicInfoCollegeSubject_vis = null;
  JSC_JDC_previousAcademicInfoCollegeDistrict_vis = null;
  JSC_JDC_previousAcademicInfoCollegeFromSession_vis = null;
  JSC_JDC_previousAcademicInfoCollegeToSession_vis = null;
  JSC_JDC_previousAcademicInfoCollegeCourseDuration_vis = null;
  JSC_JDC_previousAcademicInfoCollegeTotalCredit_vis = null;
  JSC_JDC_previousAcademicInfoCollegeCentreCode_vis = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  JSC_JDC_previousAcademicInfoCollegeObtainedResult_vis = null;

  SSC_Dakhil_previousAcademicInfoCollegeGroup = null;
  SSC_Dakhil_previousAcademicInfoCollegeRollNo = null;
  SSC_Dakhil_previousAcademicInfoCollegeBoard = null;
  SSC_Dakhil_previousAcademicInfoCollegeRegNo = null;
  SSC_Dakhil_previousAcademicInfoCollegePassingYear = null;
  SSC_Dakhil_previousAcademicInfoCollegeInstitute = null;
  SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn = null;
  SSC_Dakhil_previousAcademicInfoCollegeGPA = null;
  SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  SSC_Dakhil_previousAcademicInfoCollegeExamination = null;
  SSC_Dakhil_previousAcademicInfoCollegeSubject = null;
  SSC_Dakhil_previousAcademicInfoCollegeDistrict = null;
  SSC_Dakhil_previousAcademicInfoCollegeFromSession = null;
  SSC_Dakhil_previousAcademicInfoCollegeToSession = null;
  SSC_Dakhil_previousAcademicInfoCollegeCourseDuration = null;
  SSC_Dakhil_previousAcademicInfoCollegeTotalCredit = null;
  SSC_Dakhil_previousAcademicInfoCollegeCentreCode = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedResult = null;

  SSC_Dakhil_previousAcademicInfoCollegeGroup_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeRollNo_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeBoard_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeRegNo_req = null;
  SSC_Dakhil_previousAcademicInfoCollegePassingYear_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeInstitute_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeGPA_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeExamination_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeSubject_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeDistrict_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeFromSession_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeToSession_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeCentreCode_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_req = null;

  SSC_Dakhil_previousAcademicInfoCollegeGroup_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeRollNo_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeBoard_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeRegNo_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegePassingYear_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeInstitute_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeGPA_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeExamination_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeSubject_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeDistrict_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeFromSession_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeToSession_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeCentreCode_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_vis = null;

  HSC_Alim_previousAcademicInfoCollegeGroup = null;
  HSC_Alim_previousAcademicInfoCollegeRollNo = null;
  HSC_Alim_previousAcademicInfoCollegeBoard = null;
  HSC_Alim_previousAcademicInfoCollegeRegNo = null;
  HSC_Alim_previousAcademicInfoCollegePassingYear = null;
  HSC_Alim_previousAcademicInfoCollegeInstitute = null;
  HSC_Alim_previousAcademicInfoCollegeExamHeldIn = null;
  HSC_Alim_previousAcademicInfoCollegeGPA = null;
  HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  HSC_Alim_previousAcademicInfoCollegeExamination = null;
  HSC_Alim_previousAcademicInfoCollegeSubject = null;
  HSC_Alim_previousAcademicInfoCollegeDistrict = null;
  HSC_Alim_previousAcademicInfoCollegeFromSession = null;
  HSC_Alim_previousAcademicInfoCollegeToSession = null;
  HSC_Alim_previousAcademicInfoCollegeCourseDuration = null;
  HSC_Alim_previousAcademicInfoCollegeTotalCredit = null;
  HSC_Alim_previousAcademicInfoCollegeCentreCode = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedOutofno = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedResult = null;

  HSC_Alim_previousAcademicInfoCollegeGroup_req = null;
  HSC_Alim_previousAcademicInfoCollegeRollNo_req = null;
  HSC_Alim_previousAcademicInfoCollegeBoard_req = null;
  HSC_Alim_previousAcademicInfoCollegeRegNo_req = null;
  HSC_Alim_previousAcademicInfoCollegePassingYear_req = null;
  HSC_Alim_previousAcademicInfoCollegeInstitute_req = null;
  HSC_Alim_previousAcademicInfoCollegeExamHeldIn_req = null;
  HSC_Alim_previousAcademicInfoCollegeGPA_req = null;
  HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  HSC_Alim_previousAcademicInfoCollegeExamination_req = null;
  HSC_Alim_previousAcademicInfoCollegeSubject_req = null;
  HSC_Alim_previousAcademicInfoCollegeDistrict_req = null;
  HSC_Alim_previousAcademicInfoCollegeFromSession_req = null;
  HSC_Alim_previousAcademicInfoCollegeToSession_req = null;
  HSC_Alim_previousAcademicInfoCollegeCourseDuration_req = null;
  HSC_Alim_previousAcademicInfoCollegeTotalCredit_req = null;
  HSC_Alim_previousAcademicInfoCollegeCentreCode_req = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_req = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedResult_req = null;

  HSC_Alim_previousAcademicInfoCollegeGroup_vis = null;
  HSC_Alim_previousAcademicInfoCollegeRollNo_vis = null;
  HSC_Alim_previousAcademicInfoCollegeBoard_vis = null;
  HSC_Alim_previousAcademicInfoCollegeRegNo_vis = null;
  HSC_Alim_previousAcademicInfoCollegePassingYear_vis = null;
  HSC_Alim_previousAcademicInfoCollegeInstitute_vis = null;
  HSC_Alim_previousAcademicInfoCollegeExamHeldIn_vis = null;
  HSC_Alim_previousAcademicInfoCollegeGPA_vis = null;
  HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  HSC_Alim_previousAcademicInfoCollegeExamination_vis = null;
  HSC_Alim_previousAcademicInfoCollegeSubject_vis = null;
  HSC_Alim_previousAcademicInfoCollegeDistrict_vis = null;
  HSC_Alim_previousAcademicInfoCollegeFromSession_vis = null;
  HSC_Alim_previousAcademicInfoCollegeToSession_vis = null;
  HSC_Alim_previousAcademicInfoCollegeCourseDuration_vis = null;
  HSC_Alim_previousAcademicInfoCollegeTotalCredit_vis = null;
  HSC_Alim_previousAcademicInfoCollegeCentreCode_vis = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  HSC_Alim_previousAcademicInfoCollegeObtainedResult_vis = null;

  Hons_Fazil_previousAcademicInfoCollegeGroup = null;
  Hons_Fazil_previousAcademicInfoCollegeRollNo = null;
  Hons_Fazil_previousAcademicInfoCollegeBoard = null;
  Hons_Fazil_previousAcademicInfoCollegeRegNo = null;
  Hons_Fazil_previousAcademicInfoCollegePassingYear = null;
  Hons_Fazil_previousAcademicInfoCollegeInstitute = null;
  Hons_Fazil_previousAcademicInfoCollegeExamHeldIn = null;
  Hons_Fazil_previousAcademicInfoCollegeGPA = null;
  Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  Hons_Fazil_previousAcademicInfoCollegeExamination = null;
  Hons_Fazil_previousAcademicInfoCollegeSubject = null;
  Hons_Fazil_previousAcademicInfoCollegeDistrict = null;
  Hons_Fazil_previousAcademicInfoCollegeFromSession = null;
  Hons_Fazil_previousAcademicInfoCollegeToSession = null;
  Hons_Fazil_previousAcademicInfoCollegeCourseDuration = null;
  Hons_Fazil_previousAcademicInfoCollegeTotalCredit = null;
  Hons_Fazil_previousAcademicInfoCollegeCentreCode = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedResult = null;

  Hons_Fazil_previousAcademicInfoCollegeGroup_req = null;
  Hons_Fazil_previousAcademicInfoCollegeRollNo_req = null;
  Hons_Fazil_previousAcademicInfoCollegeBoard_req = null;
  Hons_Fazil_previousAcademicInfoCollegeRegNo_req = null;
  Hons_Fazil_previousAcademicInfoCollegePassingYear_req = null;
  Hons_Fazil_previousAcademicInfoCollegeInstitute_req = null;
  Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_req = null;
  Hons_Fazil_previousAcademicInfoCollegeGPA_req = null;
  Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  Hons_Fazil_previousAcademicInfoCollegeExamination_req = null;
  Hons_Fazil_previousAcademicInfoCollegeSubject_req = null;
  Hons_Fazil_previousAcademicInfoCollegeDistrict_req = null;
  Hons_Fazil_previousAcademicInfoCollegeFromSession_req = null;
  Hons_Fazil_previousAcademicInfoCollegeToSession_req = null;
  Hons_Fazil_previousAcademicInfoCollegeCourseDuration_req = null;
  Hons_Fazil_previousAcademicInfoCollegeTotalCredit_req = null;
  Hons_Fazil_previousAcademicInfoCollegeCentreCode_req = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_req = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedResult_req = null;

  Hons_Fazil_previousAcademicInfoCollegeGroup_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeRollNo_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeBoard_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeRegNo_vis = null;
  Hons_Fazil_previousAcademicInfoCollegePassingYear_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeInstitute_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeGPA_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeExamination_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeSubject_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeDistrict_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeFromSession_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeToSession_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeCourseDuration_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeTotalCredit_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeCentreCode_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  Hons_Fazil_previousAcademicInfoCollegeObtainedResult_vis = null;

  Masters_Kamil_previousAcademicInfoCollegeGroup = null;
  Masters_Kamil_previousAcademicInfoCollegeRollNo = null;
  Masters_Kamil_previousAcademicInfoCollegeBoard = null;
  Masters_Kamil_previousAcademicInfoCollegeRegNo = null;
  Masters_Kamil_previousAcademicInfoCollegePassingYear = null;
  Masters_Kamil_previousAcademicInfoCollegeInstitute = null;
  Masters_Kamil_previousAcademicInfoCollegeExamHeldIn = null;
  Masters_Kamil_previousAcademicInfoCollegeGPA = null;
  Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  Masters_Kamil_previousAcademicInfoCollegeExamination = null;
  Masters_Kamil_previousAcademicInfoCollegeSubject = null;
  Masters_Kamil_previousAcademicInfoCollegeDistrict = null;
  Masters_Kamil_previousAcademicInfoCollegeFromSession = null;
  Masters_Kamil_previousAcademicInfoCollegeToSession = null;
  Masters_Kamil_previousAcademicInfoCollegeCourseDuration = null;
  Masters_Kamil_previousAcademicInfoCollegeTotalCredit = null;
  Masters_Kamil_previousAcademicInfoCollegeCentreCode = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedResult = null;

  Masters_Kamil_previousAcademicInfoCollegeGroup_req = null;
  Masters_Kamil_previousAcademicInfoCollegeRollNo_req = null;
  Masters_Kamil_previousAcademicInfoCollegeBoard_req = null;
  Masters_Kamil_previousAcademicInfoCollegeRegNo_req = null;
  Masters_Kamil_previousAcademicInfoCollegePassingYear_req = null;
  Masters_Kamil_previousAcademicInfoCollegeInstitute_req = null;
  Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_req = null;
  Masters_Kamil_previousAcademicInfoCollegeGPA_req = null;
  Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  Masters_Kamil_previousAcademicInfoCollegeExamination_req = null;
  Masters_Kamil_previousAcademicInfoCollegeSubject_req = null;
  Masters_Kamil_previousAcademicInfoCollegeDistrict_req = null;
  Masters_Kamil_previousAcademicInfoCollegeFromSession_req = null;
  Masters_Kamil_previousAcademicInfoCollegeToSession_req = null;
  Masters_Kamil_previousAcademicInfoCollegeCourseDuration_req = null;
  Masters_Kamil_previousAcademicInfoCollegeTotalCredit_req = null;
  Masters_Kamil_previousAcademicInfoCollegeCentreCode_req = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_req = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedResult_req = null;

  Masters_Kamil_previousAcademicInfoCollegeGroup_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeRollNo_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeBoard_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeRegNo_vis = null;
  Masters_Kamil_previousAcademicInfoCollegePassingYear_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeInstitute_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeGPA_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeExamination_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeSubject_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeDistrict_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeFromSession_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeToSession_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeCourseDuration_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeTotalCredit_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeCentreCode_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  Masters_Kamil_previousAcademicInfoCollegeObtainedResult_vis = null;

  BBA_previousAcademicInfoCollegeGroup = null;
  BBA_previousAcademicInfoCollegeRollNo = null;
  BBA_previousAcademicInfoCollegeBoard = null;
  BBA_previousAcademicInfoCollegeRegNo = null;
  BBA_previousAcademicInfoCollegePassingYear = null;
  BBA_previousAcademicInfoCollegeInstitute = null;
  BBA_previousAcademicInfoCollegeExamHeldIn = null;
  BBA_previousAcademicInfoCollegeGPA = null;
  BBA_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  BBA_previousAcademicInfoCollegeExamination = null;
  BBA_previousAcademicInfoCollegeSubject = null;
  BBA_previousAcademicInfoCollegeDistrict = null;
  BBA_previousAcademicInfoCollegeFromSession = null;
  BBA_previousAcademicInfoCollegeToSession = null;
  BBA_previousAcademicInfoCollegeCourseDuration = null;
  BBA_previousAcademicInfoCollegeTotalCredit = null;
  BBA_previousAcademicInfoCollegeCentreCode = null;
  BBA_previousAcademicInfoCollegeObtainedOutofno = null;
  BBA_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  BBA_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  BBA_previousAcademicInfoCollegeObtainedResult = null;

  BBA_previousAcademicInfoCollegeGroup_req = null;
  BBA_previousAcademicInfoCollegeRollNo_req = null;
  BBA_previousAcademicInfoCollegeBoard_req = null;
  BBA_previousAcademicInfoCollegeRegNo_req = null;
  BBA_previousAcademicInfoCollegePassingYear_req = null;
  BBA_previousAcademicInfoCollegeInstitute_req = null;
  BBA_previousAcademicInfoCollegeExamHeldIn_req = null;
  BBA_previousAcademicInfoCollegeGPA_req = null;
  BBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  BBA_previousAcademicInfoCollegeExamination_req = null;
  BBA_previousAcademicInfoCollegeSubject_req = null;
  BBA_previousAcademicInfoCollegeDistrict_req = null;
  BBA_previousAcademicInfoCollegeFromSession_req = null;
  BBA_previousAcademicInfoCollegeToSession_req = null;
  BBA_previousAcademicInfoCollegeCourseDuration_req = null;
  BBA_previousAcademicInfoCollegeTotalCredit_req = null;
  BBA_previousAcademicInfoCollegeCentreCode_req = null;
  BBA_previousAcademicInfoCollegeObtainedOutofno_req = null;
  BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  BBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  BBA_previousAcademicInfoCollegeObtainedResult_req = null;

  BBA_previousAcademicInfoCollegeGroup_vis = null;
  BBA_previousAcademicInfoCollegeRollNo_vis = null;
  BBA_previousAcademicInfoCollegeBoard_vis = null;
  BBA_previousAcademicInfoCollegeRegNo_vis = null;
  BBA_previousAcademicInfoCollegePassingYear_vis = null;
  BBA_previousAcademicInfoCollegeInstitute_vis = null;
  BBA_previousAcademicInfoCollegeExamHeldIn_vis = null;
  BBA_previousAcademicInfoCollegeGPA_vis = null;
  BBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  BBA_previousAcademicInfoCollegeExamination_vis = null;
  BBA_previousAcademicInfoCollegeSubject_vis = null;
  BBA_previousAcademicInfoCollegeDistrict_vis = null;
  BBA_previousAcademicInfoCollegeFromSession_vis = null;
  BBA_previousAcademicInfoCollegeToSession_vis = null;
  BBA_previousAcademicInfoCollegeCourseDuration_vis = null;
  BBA_previousAcademicInfoCollegeTotalCredit_vis = null;
  BBA_previousAcademicInfoCollegeCentreCode_vis = null;
  BBA_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  BBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  BBA_previousAcademicInfoCollegeObtainedResult_vis = null;

  MBA_previousAcademicInfoCollegeGroup = null;
  MBA_previousAcademicInfoCollegeRollNo = null;
  MBA_previousAcademicInfoCollegeBoard = null;
  MBA_previousAcademicInfoCollegeRegNo = null;
  MBA_previousAcademicInfoCollegePassingYear = null;
  MBA_previousAcademicInfoCollegeInstitute = null;
  MBA_previousAcademicInfoCollegeExamHeldIn = null;
  MBA_previousAcademicInfoCollegeGPA = null;
  MBA_previousAcademicInfoCollegeGPAwithout4thsubject = null;
  MBA_previousAcademicInfoCollegeExamination = null;
  MBA_previousAcademicInfoCollegeSubject = null;
  MBA_previousAcademicInfoCollegeDistrict = null;
  MBA_previousAcademicInfoCollegeFromSession = null;
  MBA_previousAcademicInfoCollegeToSession = null;
  MBA_previousAcademicInfoCollegeCourseDuration = null;
  MBA_previousAcademicInfoCollegeTotalCredit = null;
  MBA_previousAcademicInfoCollegeCentreCode = null;
  MBA_previousAcademicInfoCollegeObtainedOutofno = null;
  MBA_previousAcademicInfoCollegeObtainedWithout4thsubject = null;
  MBA_previousAcademicInfoCollegeObtainedWith4thsubject = null;
  MBA_previousAcademicInfoCollegeObtainedResult = null;

  MBA_previousAcademicInfoCollegeGroup_req = null;
  MBA_previousAcademicInfoCollegeRollNo_req = null;
  MBA_previousAcademicInfoCollegeBoard_req = null;
  MBA_previousAcademicInfoCollegeRegNo_req = null;
  MBA_previousAcademicInfoCollegePassingYear_req = null;
  MBA_previousAcademicInfoCollegeInstitute_req = null;
  MBA_previousAcademicInfoCollegeExamHeldIn_req = null;
  MBA_previousAcademicInfoCollegeGPA_req = null;
  MBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = null;
  MBA_previousAcademicInfoCollegeExamination_req = null;
  MBA_previousAcademicInfoCollegeSubject_req = null;
  MBA_previousAcademicInfoCollegeDistrict_req = null;
  MBA_previousAcademicInfoCollegeFromSession_req = null;
  MBA_previousAcademicInfoCollegeToSession_req = null;
  MBA_previousAcademicInfoCollegeCourseDuration_req = null;
  MBA_previousAcademicInfoCollegeTotalCredit_req = null;
  MBA_previousAcademicInfoCollegeCentreCode_req = null;
  MBA_previousAcademicInfoCollegeObtainedOutofno_req = null;
  MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = null;
  MBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = null;
  MBA_previousAcademicInfoCollegeObtainedResult_req = null;

  MBA_previousAcademicInfoCollegeGroup_vis = null;
  MBA_previousAcademicInfoCollegeRollNo_vis = null;
  MBA_previousAcademicInfoCollegeBoard_vis = null;
  MBA_previousAcademicInfoCollegeRegNo_vis = null;
  MBA_previousAcademicInfoCollegePassingYear_vis = null;
  MBA_previousAcademicInfoCollegeInstitute_vis = null;
  MBA_previousAcademicInfoCollegeExamHeldIn_vis = null;
  MBA_previousAcademicInfoCollegeGPA_vis = null;
  MBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = null;
  MBA_previousAcademicInfoCollegeExamination_vis = null;
  MBA_previousAcademicInfoCollegeSubject_vis = null;
  MBA_previousAcademicInfoCollegeDistrict_vis = null;
  MBA_previousAcademicInfoCollegeFromSession_vis = null;
  MBA_previousAcademicInfoCollegeToSession_vis = null;
  MBA_previousAcademicInfoCollegeCourseDuration_vis = null;
  MBA_previousAcademicInfoCollegeTotalCredit_vis = null;
  MBA_previousAcademicInfoCollegeCentreCode_vis = null;
  MBA_previousAcademicInfoCollegeObtainedOutofno_vis = null;
  MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = null;
  MBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = null;
  MBA_previousAcademicInfoCollegeObtainedResult_vis = null;


  clubDropdownData = club_data;

  maxDate = new Date();

  candidateImage = [];

  selectedStudent: any;
  schoolStudents: any;
  // FormParam: any;
  FormParam = { "SelectedCategoryType": "Y" };
  studentImage: any;
  StudentProfileImage: any;
  FatherProfileImage: any;
  MotherProfileImage: any;
  LocalGuardianProfileImage: any;
  DefenceProfileImage: any;

  imageUrl: any;
  imageFUrl: any;
  imageMUrl: any;
  imageGUrl: any;
  dummySting = "none";

  selectedIC_MainIds = [];
  selectedICs = [];

  horizontalStepperForm: UntypedFormGroup;

  dummyB64: any;
  dummyName: any;
  clientData = null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  mainData: any; // = mdffff;
  PermissionData: any;

  PoliceStations_present = [];
  PoliceStations_permanent = [];
  PoliceStations_local = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _matStepperIntl: MatStepperIntl,
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    private matSnackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private _fuseConfigService: FuseConfigService,
    private _admssionStudentUpdateService: AdmssionStudentUpdateService,
    private _dashboardService: DashboardService,

  )
  {
    // this.FormParam = { "SelectedCategoryType": "Y" };
    this.stepperOrientation = _breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));

    this._matStepperIntl.optionalLabel = "";




  }



  getAppliedProfileData(): void
  {
    this.fetchingData = true;
    let _apiRequests = [
      this._admssionStudentUpdateService.GetAppliedProfile(this.StudentControl.value),
      this._dashboardService.DlPermissionApplicantID(this.StudentControl.value)
    ];

    // this._admssionStudentUpdateService.GetAppliedProfile(this.StudentControl.value).
    forkJoin(_apiRequests).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (data: any) =>
      {
        console.log(data, 'getAppliedProfileData');

        this.mainData = data[0].data;

        this.PermissionData = data[1].data;

        if (this.mainData.ProgramType == "S")
        {
          this.academicInfoforCollegeShow = false;
          this.courseCurriculumCollegeShow = false;
          // this.academicInfoforSchoolShow = true;
        } else
        {
          this.academicInfoforCollegeShow = true;
          this.courseCurriculumCollegeShow = true;
          // this.academicInfoforSchoolShow = false;
        }

        if (this.mainData.ClientId != null)
        {
          this.getDropDownData();
        }

      },
      (error: any) =>
      {

        console.log(error, "error");
      }
    );
  }

  getDropDownData(): void
  {

    let _apiRequests = [
      this._dashboardService.GetDropdownCotrols(this.mainData.ClientId),
    ];

    if (this.mainData.ProgramType == "C")
    {
      let csbody = `${this.mainData.ClientId}/${this.mainData.GroupId}/${this.mainData.VersionId}`;
      _apiRequests.push(this._dashboardService.GetProfileSubjects(csbody));
    }

    forkJoin(_apiRequests).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (data: any) =>
      {
        console.log(data, "getPageData");


        this.MainDropdownData = data[0].data;
        this.banner = true;

        if (data.length == 2)
        {
          this.CurriculumSubjectsList = data[1].data;
        }

        let Student_Information = this.mainData.UIConfigResponseViewModels
          .find((x) => x.FormGroupId === "Student_Information");
        this.studentFormInfo = Student_Information.UIConfigItems.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

        // console.log(this.studentFormInfo, 'this.studentFormInfo');
        // const extractedInfo = extractKeyValues(this.studentFormInfo);
        // console.log(extractedInfo, 'extractedInfo');

        let Guardian_Information = this.mainData.UIConfigResponseViewModels
          .find((x) => x.FormGroupId === "Guardian_Information");
        this.guardianInfo = Guardian_Information.UIConfigItems.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

        let Address_Information = this.mainData.UIConfigResponseViewModels
          .find((x) => x.FormGroupId === "Address_Information");
        this.addressInfo = Address_Information.UIConfigItems.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

        let Previous_Academic_Information_Collage = this.mainData.UIConfigResponseViewModels
          .find((x) => x.FormGroupId === "Previous_Academic_Information_Collage");

        if (Previous_Academic_Information_Collage.UIConfigItems != null)
        {
          this.previousAcademicInfoCollege = Previous_Academic_Information_Collage.UIConfigItems.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});
        }
        // debugger;



        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('1'))
        {
          let UIConfigItemsForPreEdu = null;
          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '1')?.UIConfigItems || [];
            this.PSC_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});


            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "1");

            this.PSC_previousAcademicInfoCollegeGroup = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.PSC_previousAcademicInfoCollegeRollNo = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.PSC_previousAcademicInfoCollegeBoard = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.PSC_previousAcademicInfoCollegeRegNo = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.PSC_previousAcademicInfoCollegePassingYear = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.PSC_previousAcademicInfoCollegeInstitute = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.PSC_previousAcademicInfoCollegeExamHeldIn = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.PSC_previousAcademicInfoCollegeGPA = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.PSC_previousAcademicInfoCollegeExamination = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;
            this.PSC_previousAcademicInfoCollegeSubject = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.PSC_previousAcademicInfoCollegeDistrict = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.PSC_previousAcademicInfoCollegeFromSession = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.PSC_previousAcademicInfoCollegeToSession = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.PSC_previousAcademicInfoCollegeCourseDuration = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.PSC_previousAcademicInfoCollegeTotalCredit = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.PSC_previousAcademicInfoCollegeCentreCode = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.PSC_previousAcademicInfoCollegeObtainedOutofno = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.PSC_previousAcademicInfoCollegeObtainedResult = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.PSC_previousAcademicInfoCollegeGroup_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.PSC_previousAcademicInfoCollegeRollNo_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.PSC_previousAcademicInfoCollegeBoard_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.PSC_previousAcademicInfoCollegeRegNo_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.PSC_previousAcademicInfoCollegePassingYear_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.PSC_previousAcademicInfoCollegeInstitute_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.PSC_previousAcademicInfoCollegeExamHeldIn_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.PSC_previousAcademicInfoCollegeGPA_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.PSC_previousAcademicInfoCollegeExamination_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.PSC_previousAcademicInfoCollegeSubject_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.PSC_previousAcademicInfoCollegeDistrict_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.PSC_previousAcademicInfoCollegeFromSession_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.PSC_previousAcademicInfoCollegeToSession_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.PSC_previousAcademicInfoCollegeCourseDuration_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.PSC_previousAcademicInfoCollegeTotalCredit_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.PSC_previousAcademicInfoCollegeCentreCode_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.PSC_previousAcademicInfoCollegeObtainedOutofno_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.PSC_previousAcademicInfoCollegeObtainedResult_req = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.PSC_previousAcademicInfoCollegeGroup_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.PSC_previousAcademicInfoCollegeRollNo_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.PSC_previousAcademicInfoCollegeBoard_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.PSC_previousAcademicInfoCollegeRegNo_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.PSC_previousAcademicInfoCollegePassingYear_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.PSC_previousAcademicInfoCollegeInstitute_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.PSC_previousAcademicInfoCollegeExamHeldIn_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.PSC_previousAcademicInfoCollegeGPA_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.PSC_previousAcademicInfoCollegeExamination_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.PSC_previousAcademicInfoCollegeSubject_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.PSC_previousAcademicInfoCollegeDistrict_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.PSC_previousAcademicInfoCollegeFromSession_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.PSC_previousAcademicInfoCollegeToSession_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.PSC_previousAcademicInfoCollegeCourseDuration_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.PSC_previousAcademicInfoCollegeTotalCredit_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.PSC_previousAcademicInfoCollegeCentreCode_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.PSC_previousAcademicInfoCollegeObtainedOutofno_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.PSC_previousAcademicInfoCollegeObtainedResult_vis = this.PSC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;

          }
          else
          {
            this.set_PSC();
          }
        }
        else
        {
          this.set_PSC_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('2'))
        {
          let UIConfigItemsForPreEdu = null;

          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '2')?.UIConfigItems || [];
            this.JSC_JDC_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "2");

            this.JSC_JDC_previousAcademicInfoCollegeGroup = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeRollNo = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeBoard = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeRegNo = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegePassingYear = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeInstitute = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeGPA = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeExamination =
              this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

            this.JSC_JDC_previousAcademicInfoCollegeSubject = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeDistrict = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeFromSession = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeToSession = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeCourseDuration = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeTotalCredit = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeCentreCode = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedResult = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.JSC_JDC_previousAcademicInfoCollegeGroup_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.JSC_JDC_previousAcademicInfoCollegeRollNo_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.JSC_JDC_previousAcademicInfoCollegeBoard_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.JSC_JDC_previousAcademicInfoCollegeRegNo_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.JSC_JDC_previousAcademicInfoCollegePassingYear_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.JSC_JDC_previousAcademicInfoCollegeInstitute_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.JSC_JDC_previousAcademicInfoCollegeGPA_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.JSC_JDC_previousAcademicInfoCollegeExamination_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.JSC_JDC_previousAcademicInfoCollegeSubject_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.JSC_JDC_previousAcademicInfoCollegeDistrict_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.JSC_JDC_previousAcademicInfoCollegeFromSession_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.JSC_JDC_previousAcademicInfoCollegeToSession_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.JSC_JDC_previousAcademicInfoCollegeCentreCode_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_req = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.JSC_JDC_previousAcademicInfoCollegeGroup_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeRollNo_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeBoard_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeRegNo_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.JSC_JDC_previousAcademicInfoCollegePassingYear_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeInstitute_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeGPA_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeExamination_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeSubject_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeDistrict_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeFromSession_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeToSession_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeCentreCode_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_vis = this.JSC_JDC_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;

          } else
          {
            this.set_JSC_JDC();
          }

        }
        else
        {
          this.set_JSC_JDC_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('3'))
        {
          let UIConfigItemsForPreEdu = null;

          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {

            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '3')?.UIConfigItems || [];
            this.SSC_Dakhil_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "3");

            this.SSC_Dakhil_previousAcademicInfoCollegeGroup = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeRollNo = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeBoard = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeRegNo = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegePassingYear = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeInstitute = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeGPA = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeExamination =
              this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeSubject = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeDistrict = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeFromSession = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeToSession = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.SSC_Dakhil_previousAcademicInfoCollegeGroup_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeBoard_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeGPA_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeExamination_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeSubject_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeToSession_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_req = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.SSC_Dakhil_previousAcademicInfoCollegeGroup_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeBoard_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeGPA_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeExamination_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeSubject_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeToSession_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_vis = this.SSC_Dakhil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;

          } else
          {
            this.set_SSC_Dakhil();
          }
        }
        else
        {
          this.set_SSC_Dakhil_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('4'))
        {
          let UIConfigItemsForPreEdu = null;
          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '4')?.UIConfigItems || [];
            this.HSC_Alim_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "4");

            this.HSC_Alim_previousAcademicInfoCollegeGroup = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeRollNo = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeBoard = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeRegNo = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegePassingYear = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeInstitute = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeGPA = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeExamination =
              this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

            this.HSC_Alim_previousAcademicInfoCollegeSubject = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeDistrict = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeFromSession = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeToSession = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeCourseDuration = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeTotalCredit = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeCentreCode = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedResult = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.HSC_Alim_previousAcademicInfoCollegeGroup_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.HSC_Alim_previousAcademicInfoCollegeRollNo_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.HSC_Alim_previousAcademicInfoCollegeBoard_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.HSC_Alim_previousAcademicInfoCollegeRegNo_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.HSC_Alim_previousAcademicInfoCollegePassingYear_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.HSC_Alim_previousAcademicInfoCollegeInstitute_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.HSC_Alim_previousAcademicInfoCollegeGPA_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.HSC_Alim_previousAcademicInfoCollegeExamination_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.HSC_Alim_previousAcademicInfoCollegeSubject_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.HSC_Alim_previousAcademicInfoCollegeDistrict_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.HSC_Alim_previousAcademicInfoCollegeFromSession_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.HSC_Alim_previousAcademicInfoCollegeToSession_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.HSC_Alim_previousAcademicInfoCollegeCentreCode_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_req = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.HSC_Alim_previousAcademicInfoCollegeGroup_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeRollNo_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeBoard_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeRegNo_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.HSC_Alim_previousAcademicInfoCollegePassingYear_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeInstitute_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeGPA_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeExamination_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeSubject_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeDistrict_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeFromSession_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeToSession_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeCentreCode_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_vis = this.HSC_Alim_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;
          }
          else
          {
            this.set_HSC_Alim();
          }
        }
        else
        {
          this.set_HSC_Alim_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('5'))
        {
          let UIConfigItemsForPreEdu = null;
          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '5')?.UIConfigItems || [];
            this.Hons_Fazil_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "5");

            this.Hons_Fazil_previousAcademicInfoCollegeGroup = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeRollNo = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeBoard = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeRegNo = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegePassingYear = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeInstitute = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeGPA = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeExamination =
              this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

            this.Hons_Fazil_previousAcademicInfoCollegeSubject = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeDistrict = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeFromSession = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeToSession = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeCentreCode = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.Hons_Fazil_previousAcademicInfoCollegeGroup_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeRollNo_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeBoard_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeRegNo_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.Hons_Fazil_previousAcademicInfoCollegePassingYear_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeInstitute_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeGPA_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeExamination_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeSubject_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeDistrict_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeFromSession_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeToSession_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_req = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.Hons_Fazil_previousAcademicInfoCollegeGroup_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeRollNo_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeBoard_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeRegNo_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegePassingYear_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeInstitute_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeGPA_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeExamination_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeSubject_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeDistrict_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeFromSession_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeToSession_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_vis = this.Hons_Fazil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;
          }
          else
          {
            this.set_Hons_Fazil();
          }
        }
        else
        {
          this.set_Hons_Fazil_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('6'))
        {
          let UIConfigItemsForPreEdu = null;
          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '6')?.UIConfigItems || [];
            this.Masters_Kamil_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "6");

            this.Masters_Kamil_previousAcademicInfoCollegeGroup = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeRollNo = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeBoard = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeRegNo = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegePassingYear = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeInstitute = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeGPA = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeExamination = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

            this.Masters_Kamil_previousAcademicInfoCollegeSubject = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeDistrict = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeFromSession = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeToSession = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeCentreCode = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.Masters_Kamil_previousAcademicInfoCollegeGroup_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeRollNo_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeBoard_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeRegNo_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.Masters_Kamil_previousAcademicInfoCollegePassingYear_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeInstitute_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeGPA_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeExamination_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeSubject_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeDistrict_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeFromSession_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeToSession_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_req = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.Masters_Kamil_previousAcademicInfoCollegeGroup_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeRollNo_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeBoard_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeRegNo_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegePassingYear_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeInstitute_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeGPA_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeExamination_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeSubject_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeDistrict_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeFromSession_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeToSession_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_vis = this.Masters_Kamil_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;
          }
          else
          {
            this.set_Masters_Kamil();
          }
        }
        else
        {
          this.set_Masters_Kamil_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('7'))
        {
          let UIConfigItemsForPreEdu = null;
          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '7')?.UIConfigItems || [];
            this.BBA_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "7");

            this.BBA_previousAcademicInfoCollegeGroup = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.BBA_previousAcademicInfoCollegeRollNo = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.BBA_previousAcademicInfoCollegeBoard = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.BBA_previousAcademicInfoCollegeRegNo = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.BBA_previousAcademicInfoCollegePassingYear = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.BBA_previousAcademicInfoCollegeInstitute = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.BBA_previousAcademicInfoCollegeExamHeldIn = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.BBA_previousAcademicInfoCollegeGPA = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.BBA_previousAcademicInfoCollegeExamination = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

            this.BBA_previousAcademicInfoCollegeSubject = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.BBA_previousAcademicInfoCollegeDistrict = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.BBA_previousAcademicInfoCollegeFromSession = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.BBA_previousAcademicInfoCollegeToSession = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.BBA_previousAcademicInfoCollegeCourseDuration = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.BBA_previousAcademicInfoCollegeTotalCredit = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.BBA_previousAcademicInfoCollegeCentreCode = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.BBA_previousAcademicInfoCollegeObtainedOutofno = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.BBA_previousAcademicInfoCollegeObtainedResult = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.BBA_previousAcademicInfoCollegeGroup_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.BBA_previousAcademicInfoCollegeRollNo_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.BBA_previousAcademicInfoCollegeBoard_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.BBA_previousAcademicInfoCollegeRegNo_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.BBA_previousAcademicInfoCollegePassingYear_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.BBA_previousAcademicInfoCollegeInstitute_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.BBA_previousAcademicInfoCollegeExamHeldIn_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.BBA_previousAcademicInfoCollegeGPA_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.BBA_previousAcademicInfoCollegeExamination_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.BBA_previousAcademicInfoCollegeSubject_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.BBA_previousAcademicInfoCollegeDistrict_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.BBA_previousAcademicInfoCollegeFromSession_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.BBA_previousAcademicInfoCollegeToSession_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.BBA_previousAcademicInfoCollegeCourseDuration_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.BBA_previousAcademicInfoCollegeTotalCredit_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.BBA_previousAcademicInfoCollegeCentreCode_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.BBA_previousAcademicInfoCollegeObtainedOutofno_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.BBA_previousAcademicInfoCollegeObtainedResult_req = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.BBA_previousAcademicInfoCollegeGroup_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.BBA_previousAcademicInfoCollegeRollNo_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.BBA_previousAcademicInfoCollegeBoard_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.BBA_previousAcademicInfoCollegeRegNo_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.BBA_previousAcademicInfoCollegePassingYear_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.BBA_previousAcademicInfoCollegeInstitute_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.BBA_previousAcademicInfoCollegeExamHeldIn_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.BBA_previousAcademicInfoCollegeGPA_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.BBA_previousAcademicInfoCollegeExamination_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.BBA_previousAcademicInfoCollegeSubject_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.BBA_previousAcademicInfoCollegeDistrict_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.BBA_previousAcademicInfoCollegeFromSession_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.BBA_previousAcademicInfoCollegeToSession_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.BBA_previousAcademicInfoCollegeCourseDuration_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.BBA_previousAcademicInfoCollegeTotalCredit_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.BBA_previousAcademicInfoCollegeCentreCode_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.BBA_previousAcademicInfoCollegeObtainedOutofno_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.BBA_previousAcademicInfoCollegeObtainedResult_vis = this.BBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;

          }
          else
          {
            this.set_BBA();
          }

        }
        else
        {
          this.set_BBA_blank();
        }

        if (this.mainData.ExamCodes != null && this.mainData.ExamCodes.includes('8'))
        {
          let UIConfigItemsForPreEdu = null;
          if (Previous_Academic_Information_Collage.UIConfigItemsForPreEdu != null)
          {
            UIConfigItemsForPreEdu = Previous_Academic_Information_Collage.UIConfigItemsForPreEdu.find(item => item.ExamCode === '8')?.UIConfigItems || [];
            this.MBA_previousAcademicInfoCollege = UIConfigItemsForPreEdu.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

            let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "8");

            this.MBA_previousAcademicInfoCollegeGroup = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue;
            this.MBA_previousAcademicInfoCollegeRollNo = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue;
            this.MBA_previousAcademicInfoCollegeBoard = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue;
            this.MBA_previousAcademicInfoCollegeRegNo = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue;
            this.MBA_previousAcademicInfoCollegePassingYear = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue;
            this.MBA_previousAcademicInfoCollegeInstitute = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue;
            this.MBA_previousAcademicInfoCollegeExamHeldIn = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue;
            this.MBA_previousAcademicInfoCollegeGPA = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue;
            this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue;
            this.MBA_previousAcademicInfoCollegeExamination = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue == "" ? filteredItem.length != 0 ? filteredItem[0].Value : this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

            this.MBA_previousAcademicInfoCollegeSubject = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue;
            this.MBA_previousAcademicInfoCollegeDistrict = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue;
            this.MBA_previousAcademicInfoCollegeFromSession = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue;
            this.MBA_previousAcademicInfoCollegeToSession = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue;
            this.MBA_previousAcademicInfoCollegeCourseDuration = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue;
            this.MBA_previousAcademicInfoCollegeTotalCredit = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue;
            this.MBA_previousAcademicInfoCollegeCentreCode = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue;
            this.MBA_previousAcademicInfoCollegeObtainedOutofno = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue;
            this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue;
            this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue;
            this.MBA_previousAcademicInfoCollegeObtainedResult = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue;

            this.MBA_previousAcademicInfoCollegeGroup_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required;
            this.MBA_previousAcademicInfoCollegeRollNo_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required;
            this.MBA_previousAcademicInfoCollegeBoard_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required;
            this.MBA_previousAcademicInfoCollegeRegNo_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required;
            this.MBA_previousAcademicInfoCollegePassingYear_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required;
            this.MBA_previousAcademicInfoCollegeInstitute_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required;
            this.MBA_previousAcademicInfoCollegeExamHeldIn_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required;
            this.MBA_previousAcademicInfoCollegeGPA_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required;
            this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required;
            this.MBA_previousAcademicInfoCollegeExamination_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required;
            this.MBA_previousAcademicInfoCollegeSubject_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required;
            this.MBA_previousAcademicInfoCollegeDistrict_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required;
            this.MBA_previousAcademicInfoCollegeFromSession_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required;
            this.MBA_previousAcademicInfoCollegeToSession_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required;
            this.MBA_previousAcademicInfoCollegeCourseDuration_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required;
            this.MBA_previousAcademicInfoCollegeTotalCredit_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required;
            this.MBA_previousAcademicInfoCollegeCentreCode_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required;
            this.MBA_previousAcademicInfoCollegeObtainedOutofno_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required;
            this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required;
            this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required;
            this.MBA_previousAcademicInfoCollegeObtainedResult_req = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required;


            this.MBA_previousAcademicInfoCollegeGroup_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible;
            this.MBA_previousAcademicInfoCollegeRollNo_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible;
            this.MBA_previousAcademicInfoCollegeBoard_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible;
            this.MBA_previousAcademicInfoCollegeRegNo_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible;
            this.MBA_previousAcademicInfoCollegePassingYear_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible;
            this.MBA_previousAcademicInfoCollegeInstitute_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible;
            this.MBA_previousAcademicInfoCollegeExamHeldIn_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible;
            this.MBA_previousAcademicInfoCollegeGPA_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible;
            this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible;
            this.MBA_previousAcademicInfoCollegeExamination_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible;
            this.MBA_previousAcademicInfoCollegeSubject_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible;
            this.MBA_previousAcademicInfoCollegeDistrict_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible;
            this.MBA_previousAcademicInfoCollegeFromSession_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible;
            this.MBA_previousAcademicInfoCollegeToSession_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible;
            this.MBA_previousAcademicInfoCollegeCourseDuration_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible;
            this.MBA_previousAcademicInfoCollegeTotalCredit_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible;
            this.MBA_previousAcademicInfoCollegeCentreCode_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible;
            this.MBA_previousAcademicInfoCollegeObtainedOutofno_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible;
            this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible;
            this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible;
            this.MBA_previousAcademicInfoCollegeObtainedResult_vis = this.MBA_previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible;

          }
          else
          {
            this.set_MBA();
          }
        }
        else
        {
          this.set_MBA_blank();
        }

        let Previous_Academic_Information_School = this.mainData.UIConfigResponseViewModels
          .find((x) => x.FormGroupId === "Previous_Academic_Information_School");
        this.previousAcademicInfoforSchool = Previous_Academic_Information_School.UIConfigItems.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

        let Course_Curriculum_College = this.mainData.UIConfigResponseViewModels
          .find((x) => x.FormGroupId === "Course_Curriculum_College");
        this.courseCurriculumForCollege = Course_Curriculum_College.UIConfigItems.reduce((o, key) => ({ ...o, [key.KeyName]: key }), {});

        // console.log(this.studentFormInfo, 'this.studentFormInfo');

        let guardianType = '';

        if (this.guardianInfo.studentLocalGuardiansRelation != null)
        {
          if (this.guardianInfo.studentLocalGuardiansRelation.KeyValue == 'Father' || this.guardianInfo.studentLocalGuardiansRelation.KeyValue == 'father')
          {
            guardianType = 'Father';
          }
          else if (this.guardianInfo.studentLocalGuardiansRelation.KeyValue == 'Mother' || this.guardianInfo.studentLocalGuardiansRelation.KeyValue == 'mother')
          {
            guardianType = 'Mother';
          }
          else if ((this.guardianInfo.studentLocalGuardiansRelation.KeyValue != 'Mother' || this.guardianInfo.studentLocalGuardiansRelation.KeyValue != 'mother') && (this.guardianInfo.studentLocalGuardiansRelation.KeyValue != 'Father' || this.guardianInfo.studentLocalGuardiansRelation.KeyValue != 'father'))
          {
            guardianType = 'Other';
          }
          else if (this.guardianInfo.studentLocalGuardiansRelation.KeyValue == '')
          {
            guardianType = "";
          }
          else if (this.guardianInfo.studentLocalGuardiansRelation.KeyValue == null)
          {
            guardianType = "";
          }
          else
          {
            guardianType = "";
          }
        }

        this.horizontalStepperForm = this._formBuilder.group({
          studentInformation: this._formBuilder.group({

            studentFullNameEng: [this.studentFormInfo.studentFullNameEng.KeyValue ? this.studentFormInfo.studentFullNameEng.KeyValue : "", this.studentFormInfo.studentFullNameEng.Required ? Validators.required : null,],

            studentFullName: [this.studentFormInfo.studentFullName.KeyValue ? this.studentFormInfo.studentFullName.KeyValue : "", this.studentFormInfo.studentFullName.Required ? Validators.required : null,],

            studentFullNameBng: [this.studentFormInfo.studentFullNameBng.KeyValue ? this.studentFormInfo.studentFullNameBng.KeyValue : "", this.studentFormInfo.studentFullNameBng.Required ? Validators.required : null,],

            studentFirstName: [this.studentFormInfo.studentFirstName.KeyValue ? this.studentFormInfo.studentFirstName.KeyValue : "", this.studentFormInfo.studentFirstName.Required ? Validators.required : null,],

            studentMiddleName: [this.studentFormInfo.studentMiddleName.KeyValue ? this.studentFormInfo.studentMiddleName.KeyValue : "", this.studentFormInfo.studentMiddleName.Required ? Validators.required : null,],

            studentLastName: [this.studentFormInfo.studentLastName.KeyValue ? this.studentFormInfo.studentLastName.KeyValue : "", this.studentFormInfo.studentLastName.Required ? Validators.required : null,],

            studentNickName: [this.studentFormInfo.studentNickName.KeyValue ? this.studentFormInfo.studentNickName.KeyValue : "", this.studentFormInfo.studentNickName.Required ? Validators.required : null,],

            studentHobby: [this.studentFormInfo.studentHobby.KeyValue ? this.studentFormInfo.studentHobby.KeyValue : "", this.studentFormInfo.studentHobby.Required ? Validators.required : null,],

            // studentInterestedClub: [this.studentFormInfo.studentInterestedClub.KeyValue ? this.studentFormInfo.studentInterestedClub.KeyValue : "", this.studentFormInfo.studentInterestedClub.Required ? Validators.required : null,],

            studentInterestedClub: [""],
            CulturalClubAchievement: [""],
            BengaliDebateClubAchievement: [""],
            EnglishDebateClubAchievement: [""],
            SportsClubAchievement: [""],
            ScienceClubAchievement: [""],
            BNCCClubAchievement: [""],
            MusicClubAchievement: [""],
            DanceClubAchievement: [""],
            LanguageClubAchievement: [""],
            SwimmingClubAchievement: [""],
            BusinessAndCareerClubAchievement: [""],
            MediaClubAchievement: [""],
            RedCrescentAchievement: [""],
            GirlsGuideAchievement: [""],
            ScoutAchievement: [""],

            studentBloodGroup: [this.studentFormInfo.studentBloodGroup.KeyValue ? this.studentFormInfo.studentBloodGroup.KeyValue : "", this.studentFormInfo.studentBloodGroup.Required ? Validators.required : null,],

            // studentContactNo: ["", this.studentFormInfo.studentContactNo.Required ? [Validators.required, Validators.pattern(/^\0?1[3456789][0-9]{8}$/)] : null,],

            studentContactNo: [this.studentFormInfo.studentContactNo.KeyValue ? this.studentFormInfo.studentContactNo.KeyValue : "", this.studentFormInfo.studentContactNo.Required ? Validators.required : null,],

            studentNationality: [this.studentFormInfo.studentNationality.KeyValue ? this.studentFormInfo.studentNationality.KeyValue : "", this.studentFormInfo.studentNationality.Required ? Validators.required : null,],

            studentHomeDistrict: [this.studentFormInfo.studentHomeDistrict.KeyValue ? this.studentFormInfo.studentHomeDistrict.KeyValue : "", this.studentFormInfo.studentHomeDistrict.Required ? Validators.required : null,],

            studentDateOfbirth: [this.studentFormInfo.studentDateOfbirth.KeyValue ? new Date(this.studentFormInfo.studentDateOfbirth.KeyValue) : "", this.studentFormInfo.studentDateOfbirth.Required ? Validators.required : null,],

            studentBirthRegistrationNo: [this.studentFormInfo.studentBirthRegistrationNo.KeyValue ? this.studentFormInfo.studentBirthRegistrationNo.KeyValue : "", this.studentFormInfo.studentBirthRegistrationNo.Required ? Validators.required : null],

            studentReligion: [this.studentFormInfo.studentReligion.KeyValue ? this.studentFormInfo.studentReligion.KeyValue : "", this.studentFormInfo.studentReligion.Required ? Validators.required : null,],

            studentEmargencyContactNo: [this.studentFormInfo.studentEmargencyContactNo.KeyValue ? this.studentFormInfo.studentEmargencyContactNo.KeyValue : "", this.studentFormInfo.studentEmargencyContactNo.Required ? [Validators.required, Validators.max(99999999999)] : null,],

            studentGender: [this.studentFormInfo.studentGender.KeyValue ? this.studentFormInfo.studentGender.KeyValue : "", this.studentFormInfo.studentGender.Required ? Validators.required : null,],

            studentEmail: [this.studentFormInfo.studentEmail.KeyValue ? this.studentFormInfo.studentEmail.KeyValue : "", this.studentFormInfo.studentEmail.Required ? [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)] : null,],

            studentHeight: [this.studentFormInfo.studentHeight.KeyValue ? this.studentFormInfo.studentHeight.KeyValue : "", this.studentFormInfo.studentHeight.Required ? Validators.required : null,],

            studentWeight: [this.studentFormInfo.studentWeight.KeyValue ? this.studentFormInfo.studentWeight.KeyValue : "", this.studentFormInfo.studentWeight.Required ? Validators.required : null,],

            studentFreedomFighterQuota: [this.studentFormInfo.studentFreedomFighterQuota.KeyValue ? this.studentFormInfo.studentFreedomFighterQuota.KeyValue : "", this.studentFormInfo.studentFreedomFighterQuota.Required ? Validators.required : null,],

            studentIsAutism: [this.studentFormInfo.studentIsAutism.KeyValue ? this.studentFormInfo.studentIsAutism.KeyValue : "", this.studentFormInfo.studentIsAutism.Required ? Validators.required : null,],

            studentOwnHouse: [this.studentFormInfo.studentOwnHouse.KeyValue ? this.studentFormInfo.studentOwnHouse.KeyValue : "", this.studentFormInfo.studentOwnHouse.Required ? Validators.required : null,],

            studentHouseIncome: [this.studentFormInfo.studentHouseIncome.KeyValue ? this.studentFormInfo.studentHouseIncome.KeyValue : "", this.studentFormInfo.studentHouseIncome.Required ? Validators.required : null,],

            studentHouseExpense: [this.studentFormInfo.studentHouseExpense.KeyValue ? this.studentFormInfo.studentHouseExpense.KeyValue : "", this.studentFormInfo.studentHouseExpense.Required ? Validators.required : null,],

            studentCatID: [this.mainData.StudentCatID ? this.mainData.StudentCatID.toString() : "", []],
          }),

          guardianInformation: this._formBuilder.group({
            studentFathersNameEng: [this.guardianInfo.studentFathersNameEng.KeyValue ? this.guardianInfo.studentFathersNameEng.KeyValue : "", this.guardianInfo.studentFathersNameEng.Required ? Validators.required : null,],

            studentFathersName: [this.guardianInfo.studentFathersName.KeyValue ? this.guardianInfo.studentFathersName.KeyValue : "", this.guardianInfo.studentFathersName.Required ? Validators.required : null,],

            studentFathersNameBng: [this.guardianInfo.studentFathersNameBng.KeyValue ? this.guardianInfo.studentFathersNameBng.KeyValue : "", this.guardianInfo.studentFathersNameBng.Required ? Validators.required : null,],

            studentFathersTIN: [this.guardianInfo.studentFathersTIN.KeyValue ? this.guardianInfo.studentFathersTIN.KeyValue : "", this.guardianInfo.studentFathersTIN.Required ? Validators.required : null,],

            studentFathersContactNumber: [this.guardianInfo.studentFathersContactNumber.KeyValue ? this.guardianInfo.studentFathersContactNumber.KeyValue : "", this.guardianInfo.studentFathersContactNumber.Required ? Validators.required : null,],

            studentFathersEducation: [this.guardianInfo.studentFathersEducation.KeyValue ? this.guardianInfo.studentFathersEducation.KeyValue : "", this.guardianInfo.studentFathersEducation.Required ? Validators.required : null,],

            studentFathersNationalID: [this.guardianInfo.studentFathersNationalID.KeyValue ? this.guardianInfo.studentFathersNationalID.KeyValue : "", this.guardianInfo.studentFathersNationalID.Required ? Validators.required
              : null,],

            studentFathersOccupation: [this.guardianInfo.studentFathersOccupation.KeyValue ? this.guardianInfo.studentFathersOccupation.KeyValue : "", this.guardianInfo.studentFathersOccupation.Required ? Validators.required : null,],

            studentFathersOfficeName: [this.guardianInfo.studentFathersOfficeName.KeyValue ? this.guardianInfo.studentFathersOfficeName.KeyValue : "", this.guardianInfo.studentFathersOfficeName.Required ? Validators.required : null,],

            studentFathersDesignation: [this.guardianInfo.studentFathersDesignation.KeyValue ? this.guardianInfo.studentFathersDesignation.KeyValue : "", this.guardianInfo.studentFathersDesignation.Required ? Validators.required : null,],

            studentFathersOfficeAddress: [this.guardianInfo.studentFathersOfficeAddress.KeyValue ? this.guardianInfo.studentFathersOfficeAddress.KeyValue : "", this.guardianInfo.studentFathersOfficeAddress.Required ? Validators.required : null,],

            studentFathersOfficePhoneNo: [this.guardianInfo.studentFathersOfficePhoneNo.KeyValue ? this.guardianInfo.studentFathersOfficePhoneNo.KeyValue : "", this.guardianInfo.studentFathersOfficePhoneNo.Required ? Validators.required : null,],

            studentFathersAnnualIncome: [this.guardianInfo.studentFathersAnnualIncome.KeyValue ? this.guardianInfo.studentFathersAnnualIncome.KeyValue : "", this.guardianInfo.studentFathersAnnualIncome.Required ? Validators.required : null,],

            studentFathersEmail: [this.guardianInfo.studentFathersEmail.KeyValue ? this.guardianInfo.studentFathersEmail.KeyValue : "", this.guardianInfo.studentFathersEmail.Required ? [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)] : null,],

            studentMothersNameEng: [this.guardianInfo.studentMothersNameEng.KeyValue ? this.guardianInfo.studentMothersNameEng.KeyValue : "", this.guardianInfo.studentMothersNameEng.Required ? Validators.required : null,],

            studentMothersName: [this.guardianInfo.studentMothersName.KeyValue ? this.guardianInfo.studentMothersName.KeyValue : "", this.guardianInfo.studentMothersName.Required ? Validators.required : null,],

            studentMothersNameBng: [this.guardianInfo.studentMothersNameBng.KeyValue ? this.guardianInfo.studentMothersNameBng.KeyValue : "", this.guardianInfo.studentMothersNameBng.Required ? Validators.required : null,],

            studentMothersTIN: [this.guardianInfo.studentMothersTIN.KeyValue ? this.guardianInfo.studentMothersTIN.KeyValue : "", this.guardianInfo.studentMothersTIN.Required ? Validators.required : null,],

            studentMothersContactNumber: [this.guardianInfo.studentMothersContactNumber.KeyValue ? this.guardianInfo.studentMothersContactNumber.KeyValue : "", this.guardianInfo.studentMothersContactNumber.Required ? Validators.required : null,],

            studentMothersEducation: [this.guardianInfo.studentMothersEducation.KeyValue ? this.guardianInfo.studentMothersEducation.KeyValue : "", this.guardianInfo.studentMothersEducation.Required ? Validators.required : null,],

            studentMothersNationalID: [this.guardianInfo.studentMothersNationalID.KeyValue ? this.guardianInfo.studentMothersNationalID.KeyValue : "", this.guardianInfo.studentMothersNationalID.Required ? Validators.required : null,],

            studentMothersOccupation: [this.guardianInfo.studentMothersOccupation.KeyValue ? this.guardianInfo.studentMothersOccupation.KeyValue : "", this.guardianInfo.studentMothersOccupation.Required ? Validators.required : null,],

            studentMothersOfficeName: [this.guardianInfo.studentMothersOfficeName.KeyValue ? this.guardianInfo.studentMothersOfficeName.KeyValue : "", this.guardianInfo.studentMothersOfficeName.Required ? Validators.required : null,],

            studentMothersDesignation: [this.guardianInfo.studentMothersDesignation.KeyValue ? this.guardianInfo.studentMothersDesignation.KeyValue : "", this.guardianInfo.studentMothersDesignation.Required ? Validators.required : null,],

            studentMothersOfficeAddress: [this.guardianInfo.studentMothersOfficeAddress.KeyValue ? this.guardianInfo.studentMothersOfficeAddress.KeyValue : "", this.guardianInfo.studentMothersOfficeAddress.Required ? Validators.required : null,],

            studentMothersOfficePhoneNo: [this.guardianInfo.studentMothersOfficePhoneNo.KeyValue ? this.guardianInfo.studentMothersOfficePhoneNo.KeyValue : "", this.guardianInfo.studentMothersOfficePhoneNo.Required ? Validators.required : null,],

            studentMothersAnnualIncome: [this.guardianInfo.studentMothersAnnualIncome.KeyValue ? this.guardianInfo.studentMothersAnnualIncome.KeyValue : "", this.guardianInfo.studentMothersAnnualIncome.Required ? Validators.required : null,],

            studentMothersEmail: [this.guardianInfo.studentMothersEmail.KeyValue ? this.guardianInfo.studentMothersEmail.KeyValue : "", this.guardianInfo.studentMothersEmail.Required ? [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)] : null,],

            studentLocalGuardiansType: [guardianType, this.guardianInfo.studentLocalGuardiansType.Required ? Validators.required : null,],

            studentLocalGuardiansRelation: [this.guardianInfo.studentLocalGuardiansRelation.KeyValue ? this.guardianInfo.studentLocalGuardiansRelation.KeyValue : "", this.guardianInfo.studentLocalGuardiansRelation.Required ? Validators.required : null,],

            studentLocalGuardiansNameEng: [this.guardianInfo.studentLocalGuardiansNameEng.KeyValue ? this.guardianInfo.studentLocalGuardiansNameEng.KeyValue : "", this.guardianInfo.studentLocalGuardiansNameEng.Required ? Validators.required : null,],

            studentLocalGuardiansName: [this.guardianInfo.studentLocalGuardiansName.KeyValue ? this.guardianInfo.studentLocalGuardiansName.KeyValue : "", this.guardianInfo.studentLocalGuardiansName.Required ? Validators.required : null,],

            studentLocalGuardiansNameBng: [this.guardianInfo.studentLocalGuardiansNameBng.KeyValue ? this.guardianInfo.studentLocalGuardiansNameBng.KeyValue : "", this.guardianInfo.studentLocalGuardiansNameBng.Required ? Validators.required : null,],

            studentLocalGuardiansTIN: [this.guardianInfo.studentLocalGuardiansTIN.KeyValue ? this.guardianInfo.studentLocalGuardiansTIN.KeyValue : "", this.guardianInfo.studentLocalGuardiansTIN.Required ? Validators.required : null,],

            studentLocalGuardiansContactNo: [this.guardianInfo.studentLocalGuardiansContactNo.KeyValue ? this.guardianInfo.studentLocalGuardiansContactNo.KeyValue : "", this.guardianInfo.studentLocalGuardiansContactNo.Required ? Validators.required : null,],

            studentLocalGuardiansEducation: [this.guardianInfo.studentLocalGuardiansEducation.KeyValue ? this.guardianInfo.studentLocalGuardiansEducation.KeyValue : "", this.guardianInfo.studentLocalGuardiansEducation.Required ? Validators.required : null,],

            studentLocalGuardiansNationalID: [this.guardianInfo.studentLocalGuardiansNationalID.KeyValue ? this.guardianInfo.studentLocalGuardiansNationalID.KeyValue : "", this.guardianInfo.studentLocalGuardiansNationalID.Required ? Validators.required : null,],

            studentLocalGuardiansOccupation: [this.guardianInfo.studentLocalGuardiansOccupation.KeyValue ? this.guardianInfo.studentLocalGuardiansOccupation.KeyValue : "", this.guardianInfo.studentLocalGuardiansOccupation.Required ? Validators.required : null,],

            studentLocalGuardiansOfficeName: [this.guardianInfo.studentLocalGuardiansOfficeName.KeyValue ? this.guardianInfo.studentLocalGuardiansOfficeName.KeyValue : "", this.guardianInfo.studentLocalGuardiansOfficeName.Required ? Validators.required : null,],

            studentLocalGuardiansDesignation: [this.guardianInfo.studentLocalGuardiansDesignation.KeyValue ? this.guardianInfo.studentLocalGuardiansDesignation.KeyValue : "", this.guardianInfo.studentLocalGuardiansDesignation.Required ? Validators.required : null,],

            studentLocalGuardiansOfficeAddress: [this.guardianInfo.studentLocalGuardiansOfficeAddress.KeyValue ? this.guardianInfo.studentLocalGuardiansOfficeAddress.KeyValue : "", this.guardianInfo.studentLocalGuardiansOfficeAddress.Required ? Validators.required : null,],

            studentLocalGuardiansOfficePhoneNo: [this.guardianInfo.studentLocalGuardiansOfficePhoneNo.KeyValue ? this.guardianInfo.studentLocalGuardiansOfficePhoneNo.KeyValue : "", this.guardianInfo.studentLocalGuardiansOfficePhoneNo.Required ? Validators.required : null,],

            studentLocalGuardiansAnnualIncome: [this.guardianInfo.studentLocalGuardiansAnnualIncome.KeyValue ? this.guardianInfo.studentLocalGuardiansAnnualIncome.KeyValue : "", this.guardianInfo.studentLocalGuardiansAnnualIncome.Required ? Validators.required : null,],

            studentLocalGuardiansEmail: [this.guardianInfo.studentLocalGuardiansEmail.KeyValue ? this.guardianInfo.studentLocalGuardiansEmail.KeyValue : "", this.guardianInfo.studentLocalGuardiansEmail.Required ? [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)] : null,],

            studentDefencePerson: [this.guardianInfo.studentDefencePerson.KeyValue ? this.guardianInfo.studentDefencePerson.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefencePerson.Required ? Validators.required : null,],

            // studentDefenceJobLocationOrCantonmentName: [this.guardianInfo.studentDefenceJobLocationOrCantonmentName.KeyValue ? this.guardianInfo.studentDefenceJobLocationOrCantonmentName.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceJobLocationOrCantonmentName.Required ? Validators.required : null,],

            studentDefenceRegimentNo: [this.guardianInfo.studentDefenceRegimentNo.KeyValue ? this.guardianInfo.studentDefenceRegimentNo.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceRegimentNo.Required ? Validators.required : null,],

            studentDefenceRank: [this.guardianInfo.studentDefenceRank.KeyValue ? this.guardianInfo.studentDefenceRank.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceRank.Required ? Validators.required : null,],

            studentDefenceStationNameOrBattalion: [this.guardianInfo.studentDefenceStationNameOrBattalion.KeyValue ? this.guardianInfo.studentDefenceStationNameOrBattalion.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceStationNameOrBattalion.Required ? Validators.required : null,],

            studentDefenceServiceStatus: [this.guardianInfo.studentDefenceServiceStatus.KeyValue ? this.guardianInfo.studentDefenceServiceStatus.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceServiceStatus.Required ? Validators.required : null,],

            // studentDefenceService: [this.guardianInfo.studentDefenceService.KeyValue ? this.guardianInfo.studentDefenceService.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceService.Required ? Validators.required : null,],

            studentDefenceRetirement: [this.guardianInfo.studentDefenceRetirement.KeyValue ? this.guardianInfo.studentDefenceRetirement.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceRetirement.Required ? Validators.required : null,],

            studentDefenceNoofChild: [this.guardianInfo.studentDefenceNoofChild.KeyValue ? this.guardianInfo.studentDefenceNoofChild.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceNoofChild.Required ? Validators.required : null,],

            studentDefenceMissionStart: [this.guardianInfo.studentDefenceMissionStart.KeyValue ? this.guardianInfo.studentDefenceMissionStart.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceMissionStart.Required ? Validators.required : null,],

            studentDefenceMissionEnd: [this.guardianInfo.studentDefenceMissionEnd.KeyValue ? this.guardianInfo.studentDefenceMissionEnd.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceMissionEnd.Required ? Validators.required : null,],

            studentDefenceMissionPlace: [this.guardianInfo.studentDefenceMissionPlace.KeyValue ? this.guardianInfo.studentDefenceMissionPlace.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceMissionPlace.Required ? Validators.required : null,],

            studentDefenceUnitName: [this.guardianInfo.studentDefenceUnitName.KeyValue ? this.guardianInfo.studentDefenceUnitName.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceUnitName.Required ? Validators.required : null,],

            studentDefenceBANumber: [this.guardianInfo.studentDefenceBANumber.KeyValue ? this.guardianInfo.studentDefenceBANumber.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceBANumber.Required ? Validators.required : null,],

            // studentDefenceCourse: [this.guardianInfo.studentDefenceCourse.KeyValue ? this.guardianInfo.studentDefenceCourse.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceCourse.Required ? Validators.required : null,],

            // studentDefenceCrops: [this.guardianInfo.studentDefenceCrops.KeyValue ? this.guardianInfo.studentDefenceCrops.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceCrops.Required ? Validators.required : null,],

            // studentDefenceCOorOCsName: [this.guardianInfo.studentDefenceCOorOCsName.KeyValue ? this.guardianInfo.studentDefenceCOorOCsName.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceCOorOCsName.Required ? Validators.required : null,],

            // studentDefenceCOorOCsContact: [this.guardianInfo.studentDefenceCOorOCsContact.KeyValue ? this.guardianInfo.studentDefenceCOorOCsContact.KeyValue : "", this.FormParam.SelectedCategoryType != "N" && this.guardianInfo.studentDefenceCOorOCsContact.Required ? [Validators.required,] : null,],
          }),

          addressInformation: this._formBuilder.group({
            presentAreaAddress: [this.addressInfo.presentAreaAddress.KeyValue ? this.addressInfo.presentAreaAddress.KeyValue : "", this.addressInfo.presentAreaAddress.Required ? Validators.required : null,],

            presentPostCode: [this.addressInfo.presentPostCode.KeyValue ? this.addressInfo.presentPostCode.KeyValue : "", this.addressInfo.presentPostCode.Required ? Validators.required : null,],

            presentDistrict: [this.addressInfo.presentDistrict.KeyValue ? this.addressInfo.presentDistrict.KeyValue : "", this.addressInfo.presentDistrict.Required ? Validators.required : null,],

            presentDivision: [this.addressInfo.presentDivision.KeyValue ? this.addressInfo.presentDivision.KeyValue : "", this.addressInfo.presentDivision.Required ? Validators.required : null,],

            presentPostOffice: [this.addressInfo.presentPostOffice.KeyValue ? this.addressInfo.presentPostOffice.KeyValue : "", this.addressInfo.presentPostOffice.Required ? Validators.required : null,],

            presentVillage: [this.addressInfo.presentVillage.KeyValue ? this.addressInfo.presentVillage.KeyValue : "", this.addressInfo.presentVillage.Required ? Validators.required : null,],

            presentPoliceStation: [this.addressInfo.presentPoliceStation.KeyValue ? this.addressInfo.presentPoliceStation.KeyValue : "", this.addressInfo.presentPoliceStation.Required ? Validators.required : null,],

            presentAddressEng: [this.addressInfo.presentAddressEng.KeyValue ? this.addressInfo.presentAddressEng.KeyValue : "", this.addressInfo.presentAddressEng.Required ? Validators.required : null,],

            presentAddressBng: [this.addressInfo.presentAddressBng.KeyValue ? this.addressInfo.presentAddressBng.KeyValue : "", this.addressInfo.presentAddressBng.Required ? Validators.required : null,],

            presentHouse: [this.addressInfo.presentHouse.KeyValue ? this.addressInfo.presentHouse.KeyValue : "", this.addressInfo.presentHouse.Required ? Validators.required : null,],

            presentSection: [this.addressInfo.presentSection.KeyValue ? this.addressInfo.presentSection.KeyValue : "", this.addressInfo.presentSection.Required ? Validators.required : null,],

            presentPlot: [this.addressInfo.presentPlot.KeyValue ? this.addressInfo.presentPlot.KeyValue : "", this.addressInfo.presentPlot.Required ? Validators.required : null,],

            presentSector: [this.addressInfo.presentSector.KeyValue ? this.addressInfo.presentSector.KeyValue : "", this.addressInfo.presentSector.Required ? Validators.required : null,],

            presentUpazila: [this.addressInfo.presentUpazila.KeyValue ? this.addressInfo.presentUpazila.KeyValue : "", this.addressInfo.presentUpazila.Required ? Validators.required : null,],

            presentRoad: [this.addressInfo.presentRoad.KeyValue ? this.addressInfo.presentRoad.KeyValue : "", this.addressInfo.presentRoad.Required ? Validators.required : null,],

            presentUnion: [this.addressInfo.presentUnion.KeyValue ? this.addressInfo.presentUnion.KeyValue : "", this.addressInfo.presentUnion.Required ? Validators.required : null,],

            presentBlock: [this.addressInfo.presentBlock.KeyValue ? this.addressInfo.presentBlock.KeyValue : "", this.addressInfo.presentBlock.Required ? Validators.required : null,],

            presentWardNo: [this.addressInfo.presentWardNo.KeyValue ? this.addressInfo.presentWardNo.KeyValue : "", this.addressInfo.presentWardNo.Required ? Validators.required : null,],

            presentPaurashava: [this.addressInfo.presentPaurashava.KeyValue ? this.addressInfo.presentPaurashava.KeyValue : "", this.addressInfo.presentPaurashava.Required ? Validators.required : null,],


            permanentSameAs: [this.addressInfo.permanentSameAs.KeyValue ? this.addressInfo.permanentSameAs.KeyValue : "", this.addressInfo.permanentSameAs.Required ? Validators.required : null,],

            permanentAreaAddress: [this.addressInfo.permanentAreaAddress.KeyValue ? this.addressInfo.permanentAreaAddress.KeyValue : "", this.addressInfo.permanentAreaAddress.Required ? Validators.required : null,],

            permanentPostCode: [this.addressInfo.permanentPostCode.KeyValue ? this.addressInfo.permanentPostCode.KeyValue : "", this.addressInfo.permanentPostCode.Required ? Validators.required : null,],

            permanentDistrict: [this.addressInfo.permanentDistrict.KeyValue ? this.addressInfo.permanentDistrict.KeyValue : "", this.addressInfo.permanentDistrict.Required ? Validators.required : null,],

            permanentDivision: [this.addressInfo.permanentDivision.KeyValue ? this.addressInfo.permanentDivision.KeyValue : "", this.addressInfo.permanentDivision.Required ? Validators.required : null,],

            permanentPostOffice: [this.addressInfo.permanentPostOffice.KeyValue ? this.addressInfo.permanentPostOffice.KeyValue : "", this.addressInfo.permanentPostOffice.Required ? Validators.required : null,],

            permanentVillage: [this.addressInfo.permanentVillage.KeyValue ? this.addressInfo.permanentVillage.KeyValue : "", this.addressInfo.permanentVillage.Required ? Validators.required : null,],

            permanentPoliceStation: [this.addressInfo.permanentPoliceStation.KeyValue ? this.addressInfo.permanentPoliceStation.KeyValue : "", this.addressInfo.permanentPoliceStation.Required ? Validators.required : null,],

            permanentAddressEng: [this.addressInfo.permanentAddressEng.KeyValue ? this.addressInfo.permanentAddressEng.KeyValue : "", this.addressInfo.permanentAddressEng.Required ? Validators.required : null,],

            permanentAddressBng: [this.addressInfo.permanentAddressBng.KeyValue ? this.addressInfo.permanentAddressBng.KeyValue : "", this.addressInfo.permanentAddressBng.Required ? Validators.required : null,],

            permanentHouse: [this.addressInfo.permanentHouse.KeyValue ? this.addressInfo.permanentHouse.KeyValue : "", this.addressInfo.permanentHouse.Required ? Validators.required : null,],

            permanentSection: [this.addressInfo.permanentSection.KeyValue ? this.addressInfo.permanentSection.KeyValue : "", this.addressInfo.permanentSection.Required ? Validators.required : null,],

            permanentPlot: [this.addressInfo.permanentPlot.KeyValue ? this.addressInfo.permanentPlot.KeyValue : "", this.addressInfo.permanentPlot.Required ? Validators.required : null,],

            permanentSector: [this.addressInfo.permanentSector.KeyValue ? this.addressInfo.permanentSector.KeyValue : "", this.addressInfo.permanentSector.Required ? Validators.required : null,],

            permanentUpazila: [this.addressInfo.permanentUpazila.KeyValue ? this.addressInfo.permanentUpazila.KeyValue : "", this.addressInfo.permanentUpazila.Required ? Validators.required : null,],

            permanentRoad: [this.addressInfo.permanentRoad.KeyValue ? this.addressInfo.permanentRoad.KeyValue : "", this.addressInfo.permanentRoad.Required ? Validators.required : null,],

            permanentUnion: [this.addressInfo.permanentUnion.KeyValue ? this.addressInfo.permanentUnion.KeyValue : "", this.addressInfo.permanentUnion.Required ? Validators.required : null,],

            permanentBlock: [this.addressInfo.permanentBlock.KeyValue ? this.addressInfo.permanentBlock.KeyValue : "", this.addressInfo.permanentBlock.Required ? Validators.required : null,],

            permanentWardNo: [this.addressInfo.permanentWardNo.KeyValue ? this.addressInfo.permanentWardNo.KeyValue : "", this.addressInfo.permanentWardNo.Required ? Validators.required : null,],

            permanentPaurashava: [this.addressInfo.permanentPaurashava.KeyValue ? this.addressInfo.permanentPaurashava.KeyValue : "", this.addressInfo.permanentPaurashava.Required ? Validators.required : null,],


            localGuardianSameAs: [this.addressInfo.localGuardianSameAs.KeyValue ? this.addressInfo.localGuardianSameAs.KeyValue : "", this.addressInfo.localGuardianSameAs.Required ? Validators.required : null,],

            localGuardianAreaAddress: [this.addressInfo.localGuardianAreaAddress.KeyValue ? this.addressInfo.localGuardianAreaAddress.KeyValue : "", this.addressInfo.localGuardianAreaAddress.Required ? Validators.required : null,],

            localGuardianPostCode: [this.addressInfo.localGuardianPostCode.KeyValue ? this.addressInfo.localGuardianPostCode.KeyValue : "", this.addressInfo.localGuardianPostCode.Required ? Validators.required : null,],

            localGuardianDistrict: [this.addressInfo.localGuardianDistrict.KeyValue ? this.addressInfo.localGuardianDistrict.KeyValue : "", this.addressInfo.localGuardianDistrict.Required ? Validators.required : null,],

            localGuardianDivision: [this.addressInfo.localGuardianDivision.KeyValue ? this.addressInfo.localGuardianDivision.KeyValue : "", this.addressInfo.localGuardianDivision.Required ? Validators.required : null,],

            localGuardianPostOffice: [this.addressInfo.localGuardianPostOffice.KeyValue ? this.addressInfo.localGuardianPostOffice.KeyValue : "", this.addressInfo.localGuardianPostOffice.Required ? Validators.required : null,],

            localGuardianVillage: [this.addressInfo.localGuardianVillage.KeyValue ? this.addressInfo.localGuardianVillage.KeyValue : "", this.addressInfo.localGuardianVillage.Required ? Validators.required : null,],

            localGuardianPoliceStation: [this.addressInfo.localGuardianPoliceStation.KeyValue ? this.addressInfo.localGuardianPoliceStation.KeyValue : "", this.addressInfo.localGuardianPoliceStation.Required ? Validators.required : null,],

            localGuardianAddressEng: [this.addressInfo.localGuardianAddressEng.KeyValue ? this.addressInfo.localGuardianAddressEng.KeyValue : "", this.addressInfo.localGuardianAddressEng.Required ? Validators.required : null,],

            localGuardianAddressBng: [this.addressInfo.localGuardianAddressBng.KeyValue ? this.addressInfo.localGuardianAddressBng.KeyValue : "", this.addressInfo.localGuardianAddressBng.Required ? Validators.required : null,],

            localGuardianHouse: [this.addressInfo.localGuardianHouse.KeyValue ? this.addressInfo.localGuardianHouse.KeyValue : "", this.addressInfo.localGuardianHouse.Required ? Validators.required : null,],

            localGuardianSection: [this.addressInfo.localGuardianSection.KeyValue ? this.addressInfo.localGuardianSection.KeyValue : "", this.addressInfo.localGuardianSection.Required ? Validators.required : null,],

            localGuardianPlot: [this.addressInfo.localGuardianPlot.KeyValue ? this.addressInfo.localGuardianPlot.KeyValue : "", this.addressInfo.localGuardianPlot.Required ? Validators.required : null,],

            localGuardianSector: [this.addressInfo.localGuardianSector.KeyValue ? this.addressInfo.localGuardianSector.KeyValue : "", this.addressInfo.localGuardianSector.Required ? Validators.required : null,],

            localGuardianUpazila: [this.addressInfo.localGuardianUpazila.KeyValue ? this.addressInfo.localGuardianUpazila.KeyValue : "", this.addressInfo.localGuardianUpazila.Required ? Validators.required : null,],

            localGuardianRoad: [this.addressInfo.localGuardianRoad.KeyValue ? this.addressInfo.localGuardianRoad.KeyValue : "", this.addressInfo.localGuardianRoad.Required ? Validators.required : null,],

            localGuardianUnion: [this.addressInfo.localGuardianUnion.KeyValue ? this.addressInfo.localGuardianUnion.KeyValue : "", this.addressInfo.localGuardianUnion.Required ? Validators.required : null,],

            localGuardianBlock: [this.addressInfo.localGuardianBlock.KeyValue ? this.addressInfo.localGuardianBlock.KeyValue : "", this.addressInfo.localGuardianBlock.Required ? Validators.required : null,],

            localGuardianWardNo: [this.addressInfo.localGuardianWardNo.KeyValue ? this.addressInfo.localGuardianWardNo.KeyValue : "", this.addressInfo.localGuardianWardNo.Required ? Validators.required : null,],

            localGuardianPaurashava: [this.addressInfo.localGuardianPaurashava.KeyValue ? this.addressInfo.localGuardianPaurashava.KeyValue : "", this.addressInfo.localGuardianPaurashava.Required ? Validators.required : null,],
          }),

          // previousAcademicInformationforCollege: this._formBuilder.group({
          //   previousAcademicInfoCollegeGroup: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeRollNo: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeBoard: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeRegNo: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeExamination: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeSubject: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeDistrict: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeFromSession: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeToSession: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeCourseDuration: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeTotalCredit: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeCentreCode: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeObtainedOutofno: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeObtainedWithout4thsubject: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeObtainedWith4thsubject: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeObtainedResult: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegePassingYear: [this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeInstitute: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeExamHeldIn: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeGPA: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required ? Validators.required : null,],

          //   previousAcademicInfoCollegeGPAwithout4thsubject: [this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "", this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required ? Validators.required : null,],

          //   // Bangla1SubjectGpa: [""],
          //   // Bangla2SubjectGpa: [""],
          //   // English1SubjectGpa: [""],
          //   // English2SubjectGpa: [""],
          //   // ICTSubjectGpa: [""],
          //   // ScienceSubjectGpa: [""],
          //   // MathSubjectGpa: [""],
          //   // ReligionSubjectGpa: [""],

          // }),

          previousAcademicInformationforSchool: this._formBuilder.group({
            previousAcademicInfoSchoolLastSchoolName: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastSchoolName.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastSchoolName.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastSchoolName.Required ? Validators.required : null,],

            previousAcademicInfoSchoolLastExamName: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastExamName.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastExamName.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastExamName.Required ? Validators.required : null,],

            previousAcademicInfoSchoolLastResult: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastResult.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastResult.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolLastResult.Required ? Validators.required : null,],

            previousAcademicInfoSchoolSection: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolSection.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolSection.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolSection.Required ? Validators.required : null,],

            previousAcademicInfoSchoolRoll: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolRoll.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolRoll.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolRoll.Required ? Validators.required : null,],

            previousAcademicInfoSchoolInstituteAddress: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolInstituteAddress.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolInstituteAddress.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolInstituteAddress.Required ? Validators.required : null,],

            previousAcademicInfoSchoolTCInfo: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCInfo.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCInfo.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCInfo.Required ? Validators.required : null,],

            previousAcademicInfoSchoolTCNo: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCNo.KeyValue ? this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCNo.KeyValue : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCNo.Required ? Validators.required : null,],

            previousAcademicInfoSchoolTCDate: [this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCDate.KeyValue ? new Date(this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCDate.KeyValue) : "", this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCDate.Required ? Validators.required : null,],

            PSC_previousAcademicInfoCollegeGroup: [this.PSC_previousAcademicInfoCollegeGroup, this.PSC_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeRollNo: [this.PSC_previousAcademicInfoCollegeRollNo, this.PSC_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeBoard: [this.PSC_previousAcademicInfoCollegeBoard, this.PSC_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeRegNo: [this.PSC_previousAcademicInfoCollegeRegNo, this.PSC_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegePassingYear: [this.PSC_previousAcademicInfoCollegePassingYear, this.PSC_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeInstitute: [this.PSC_previousAcademicInfoCollegeInstitute, this.PSC_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeExamHeldIn: [this.PSC_previousAcademicInfoCollegeExamHeldIn, this.PSC_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeGPA: [this.PSC_previousAcademicInfoCollegeGPA, this.PSC_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeGPAwithout4thsubject: [this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject, this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeExamination: [this.PSC_previousAcademicInfoCollegeExamination, this.PSC_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeSubject: [this.PSC_previousAcademicInfoCollegeSubject, this.PSC_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeDistrict: [this.PSC_previousAcademicInfoCollegeDistrict, this.PSC_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeFromSession: [this.PSC_previousAcademicInfoCollegeFromSession, this.PSC_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeToSession: [this.PSC_previousAcademicInfoCollegeToSession, this.PSC_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeCourseDuration: [this.PSC_previousAcademicInfoCollegeCourseDuration, this.PSC_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeTotalCredit: [this.PSC_previousAcademicInfoCollegeTotalCredit, this.PSC_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeCentreCode: [this.PSC_previousAcademicInfoCollegeCentreCode, this.PSC_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeObtainedOutofno: [this.PSC_previousAcademicInfoCollegeObtainedOutofno, this.PSC_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject, this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeObtainedWith4thsubject: [this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject, this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            PSC_previousAcademicInfoCollegeObtainedResult: [this.PSC_previousAcademicInfoCollegeObtainedResult, this.PSC_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],


            JSC_JDC_previousAcademicInfoCollegeGroup: [this.JSC_JDC_previousAcademicInfoCollegeGroup, this.JSC_JDC_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeRollNo: [this.JSC_JDC_previousAcademicInfoCollegeRollNo, this.JSC_JDC_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeBoard: [this.JSC_JDC_previousAcademicInfoCollegeBoard, this.JSC_JDC_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeRegNo: [this.JSC_JDC_previousAcademicInfoCollegeRegNo, this.JSC_JDC_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegePassingYear: [this.JSC_JDC_previousAcademicInfoCollegePassingYear, this.JSC_JDC_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeInstitute: [this.JSC_JDC_previousAcademicInfoCollegeInstitute, this.JSC_JDC_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeExamHeldIn: [this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn, this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeGPA: [this.JSC_JDC_previousAcademicInfoCollegeGPA, this.JSC_JDC_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject: [this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject, this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeExamination: [this.JSC_JDC_previousAcademicInfoCollegeExamination, this.JSC_JDC_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeSubject: [this.JSC_JDC_previousAcademicInfoCollegeSubject, this.JSC_JDC_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeDistrict: [this.JSC_JDC_previousAcademicInfoCollegeDistrict, this.JSC_JDC_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeFromSession: [this.JSC_JDC_previousAcademicInfoCollegeFromSession, this.JSC_JDC_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeToSession: [this.JSC_JDC_previousAcademicInfoCollegeToSession, this.JSC_JDC_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeCourseDuration: [this.JSC_JDC_previousAcademicInfoCollegeCourseDuration, this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeTotalCredit: [this.JSC_JDC_previousAcademicInfoCollegeTotalCredit, this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeCentreCode: [this.JSC_JDC_previousAcademicInfoCollegeCentreCode, this.JSC_JDC_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeObtainedOutofno: [this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno, this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject, this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject: [this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject, this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            JSC_JDC_previousAcademicInfoCollegeObtainedResult: [this.JSC_JDC_previousAcademicInfoCollegeObtainedResult, this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],



            SSC_Dakhil_previousAcademicInfoCollegeGroup: [this.SSC_Dakhil_previousAcademicInfoCollegeGroup, this.SSC_Dakhil_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeRollNo: [this.SSC_Dakhil_previousAcademicInfoCollegeRollNo, this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeBoard: [this.SSC_Dakhil_previousAcademicInfoCollegeBoard, this.SSC_Dakhil_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeRegNo: [this.SSC_Dakhil_previousAcademicInfoCollegeRegNo, this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegePassingYear: [this.SSC_Dakhil_previousAcademicInfoCollegePassingYear, this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeInstitute: [this.SSC_Dakhil_previousAcademicInfoCollegeInstitute, this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn: [this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn, this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeGPA: [this.SSC_Dakhil_previousAcademicInfoCollegeGPA, this.SSC_Dakhil_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject: [this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject, this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeExamination: [this.SSC_Dakhil_previousAcademicInfoCollegeExamination, this.SSC_Dakhil_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeSubject: [this.SSC_Dakhil_previousAcademicInfoCollegeSubject, this.SSC_Dakhil_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeDistrict: [this.SSC_Dakhil_previousAcademicInfoCollegeDistrict, this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeFromSession: [this.SSC_Dakhil_previousAcademicInfoCollegeFromSession, this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeToSession: [this.SSC_Dakhil_previousAcademicInfoCollegeToSession, this.SSC_Dakhil_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeCourseDuration: [this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration, this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeTotalCredit: [this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit, this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeCentreCode: [this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode, this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno: [this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno, this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject, this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject: [this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject, this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            SSC_Dakhil_previousAcademicInfoCollegeObtainedResult: [this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult, this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],





            HSC_Alim_previousAcademicInfoCollegeGroup: [this.HSC_Alim_previousAcademicInfoCollegeGroup, this.HSC_Alim_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeRollNo: [this.HSC_Alim_previousAcademicInfoCollegeRollNo, this.HSC_Alim_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeBoard: [this.HSC_Alim_previousAcademicInfoCollegeBoard, this.HSC_Alim_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeRegNo: [this.HSC_Alim_previousAcademicInfoCollegeRegNo, this.HSC_Alim_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegePassingYear: [this.HSC_Alim_previousAcademicInfoCollegePassingYear, this.HSC_Alim_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeInstitute: [this.HSC_Alim_previousAcademicInfoCollegeInstitute, this.HSC_Alim_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeExamHeldIn: [this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn, this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeGPA: [this.HSC_Alim_previousAcademicInfoCollegeGPA, this.HSC_Alim_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject: [this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject, this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeExamination: [this.HSC_Alim_previousAcademicInfoCollegeExamination, this.HSC_Alim_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeSubject: [this.HSC_Alim_previousAcademicInfoCollegeSubject, this.HSC_Alim_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeDistrict: [this.HSC_Alim_previousAcademicInfoCollegeDistrict, this.HSC_Alim_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeFromSession: [this.HSC_Alim_previousAcademicInfoCollegeFromSession, this.HSC_Alim_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeToSession: [this.HSC_Alim_previousAcademicInfoCollegeToSession, this.HSC_Alim_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeCourseDuration: [this.HSC_Alim_previousAcademicInfoCollegeCourseDuration, this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeTotalCredit: [this.HSC_Alim_previousAcademicInfoCollegeTotalCredit, this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeCentreCode: [this.HSC_Alim_previousAcademicInfoCollegeCentreCode, this.HSC_Alim_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeObtainedOutofno: [this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno, this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject, this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject: [this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject, this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            HSC_Alim_previousAcademicInfoCollegeObtainedResult: [this.HSC_Alim_previousAcademicInfoCollegeObtainedResult, this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],




            Hons_Fazil_previousAcademicInfoCollegeGroup: [this.Hons_Fazil_previousAcademicInfoCollegeGroup, this.Hons_Fazil_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeRollNo: [this.Hons_Fazil_previousAcademicInfoCollegeRollNo, this.Hons_Fazil_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeBoard: [this.Hons_Fazil_previousAcademicInfoCollegeBoard, this.Hons_Fazil_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeRegNo: [this.Hons_Fazil_previousAcademicInfoCollegeRegNo, this.Hons_Fazil_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegePassingYear: [this.Hons_Fazil_previousAcademicInfoCollegePassingYear, this.Hons_Fazil_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeInstitute: [this.Hons_Fazil_previousAcademicInfoCollegeInstitute, this.Hons_Fazil_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeExamHeldIn: [this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn, this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeGPA: [this.Hons_Fazil_previousAcademicInfoCollegeGPA, this.Hons_Fazil_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject: [this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject, this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeExamination: [this.Hons_Fazil_previousAcademicInfoCollegeExamination, this.Hons_Fazil_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeSubject: [this.Hons_Fazil_previousAcademicInfoCollegeSubject, this.Hons_Fazil_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeDistrict: [this.Hons_Fazil_previousAcademicInfoCollegeDistrict, this.Hons_Fazil_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeFromSession: [this.Hons_Fazil_previousAcademicInfoCollegeFromSession, this.Hons_Fazil_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeToSession: [this.Hons_Fazil_previousAcademicInfoCollegeToSession, this.Hons_Fazil_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeCourseDuration: [this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration, this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeTotalCredit: [this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit, this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeCentreCode: [this.Hons_Fazil_previousAcademicInfoCollegeCentreCode, this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno: [this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno, this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject, this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject: [this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject, this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            Hons_Fazil_previousAcademicInfoCollegeObtainedResult: [this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult, this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],



            Masters_Kamil_previousAcademicInfoCollegeGroup: [this.Masters_Kamil_previousAcademicInfoCollegeGroup, this.Masters_Kamil_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeRollNo: [this.Masters_Kamil_previousAcademicInfoCollegeRollNo, this.Masters_Kamil_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeBoard: [this.Masters_Kamil_previousAcademicInfoCollegeBoard, this.Masters_Kamil_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeRegNo: [this.Masters_Kamil_previousAcademicInfoCollegeRegNo, this.Masters_Kamil_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegePassingYear: [this.Masters_Kamil_previousAcademicInfoCollegePassingYear, this.Masters_Kamil_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeInstitute: [this.Masters_Kamil_previousAcademicInfoCollegeInstitute, this.Masters_Kamil_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeExamHeldIn: [this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn, this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeGPA: [this.Masters_Kamil_previousAcademicInfoCollegeGPA, this.Masters_Kamil_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject: [this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject, this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeExamination: [this.Masters_Kamil_previousAcademicInfoCollegeExamination, this.Masters_Kamil_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeSubject: [this.Masters_Kamil_previousAcademicInfoCollegeSubject, this.Masters_Kamil_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeDistrict: [this.Masters_Kamil_previousAcademicInfoCollegeDistrict, this.Masters_Kamil_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeFromSession: [this.Masters_Kamil_previousAcademicInfoCollegeFromSession, this.Masters_Kamil_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeToSession: [this.Masters_Kamil_previousAcademicInfoCollegeToSession, this.Masters_Kamil_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeCourseDuration: [this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration, this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeTotalCredit: [this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit, this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeCentreCode: [this.Masters_Kamil_previousAcademicInfoCollegeCentreCode, this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno: [this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno, this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject, this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject: [this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject, this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            Masters_Kamil_previousAcademicInfoCollegeObtainedResult: [this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult, this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],




            BBA_previousAcademicInfoCollegeGroup: [this.BBA_previousAcademicInfoCollegeGroup, this.BBA_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeRollNo: [this.BBA_previousAcademicInfoCollegeRollNo, this.BBA_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeBoard: [this.BBA_previousAcademicInfoCollegeBoard, this.BBA_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeRegNo: [this.BBA_previousAcademicInfoCollegeRegNo, this.BBA_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegePassingYear: [this.BBA_previousAcademicInfoCollegePassingYear, this.BBA_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeInstitute: [this.BBA_previousAcademicInfoCollegeInstitute, this.BBA_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeExamHeldIn: [this.BBA_previousAcademicInfoCollegeExamHeldIn, this.BBA_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeGPA: [this.BBA_previousAcademicInfoCollegeGPA, this.BBA_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeGPAwithout4thsubject: [this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject, this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeExamination: [this.BBA_previousAcademicInfoCollegeExamination, this.BBA_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeSubject: [this.BBA_previousAcademicInfoCollegeSubject, this.BBA_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeDistrict: [this.BBA_previousAcademicInfoCollegeDistrict, this.BBA_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeFromSession: [this.BBA_previousAcademicInfoCollegeFromSession, this.BBA_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeToSession: [this.BBA_previousAcademicInfoCollegeToSession, this.BBA_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeCourseDuration: [this.BBA_previousAcademicInfoCollegeCourseDuration, this.BBA_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeTotalCredit: [this.BBA_previousAcademicInfoCollegeTotalCredit, this.BBA_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeCentreCode: [this.BBA_previousAcademicInfoCollegeCentreCode, this.BBA_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeObtainedOutofno: [this.BBA_previousAcademicInfoCollegeObtainedOutofno, this.BBA_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject, this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeObtainedWith4thsubject: [this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject, this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            BBA_previousAcademicInfoCollegeObtainedResult: [this.BBA_previousAcademicInfoCollegeObtainedResult, this.BBA_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],



            MBA_previousAcademicInfoCollegeGroup: [this.MBA_previousAcademicInfoCollegeGroup, this.MBA_previousAcademicInfoCollegeGroup_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeRollNo: [this.MBA_previousAcademicInfoCollegeRollNo, this.MBA_previousAcademicInfoCollegeRollNo_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeBoard: [this.MBA_previousAcademicInfoCollegeBoard, this.MBA_previousAcademicInfoCollegeBoard_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeRegNo: [this.MBA_previousAcademicInfoCollegeRegNo, this.MBA_previousAcademicInfoCollegeRegNo_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegePassingYear: [this.MBA_previousAcademicInfoCollegePassingYear, this.MBA_previousAcademicInfoCollegePassingYear_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeInstitute: [this.MBA_previousAcademicInfoCollegeInstitute, this.MBA_previousAcademicInfoCollegeInstitute_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeExamHeldIn: [this.MBA_previousAcademicInfoCollegeExamHeldIn, this.MBA_previousAcademicInfoCollegeExamHeldIn_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeGPA: [this.MBA_previousAcademicInfoCollegeGPA, this.MBA_previousAcademicInfoCollegeGPA_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeGPAwithout4thsubject: [this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject, this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeExamination: [this.MBA_previousAcademicInfoCollegeExamination, this.MBA_previousAcademicInfoCollegeExamination_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeSubject: [this.MBA_previousAcademicInfoCollegeSubject, this.MBA_previousAcademicInfoCollegeSubject_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeDistrict: [this.MBA_previousAcademicInfoCollegeDistrict, this.MBA_previousAcademicInfoCollegeDistrict_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeFromSession: [this.MBA_previousAcademicInfoCollegeFromSession, this.MBA_previousAcademicInfoCollegeFromSession_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeToSession: [this.MBA_previousAcademicInfoCollegeToSession, this.MBA_previousAcademicInfoCollegeToSession_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeCourseDuration: [this.MBA_previousAcademicInfoCollegeCourseDuration, this.MBA_previousAcademicInfoCollegeCourseDuration_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeTotalCredit: [this.MBA_previousAcademicInfoCollegeTotalCredit, this.MBA_previousAcademicInfoCollegeTotalCredit_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeCentreCode: [this.MBA_previousAcademicInfoCollegeCentreCode, this.MBA_previousAcademicInfoCollegeCentreCode_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeObtainedOutofno: [this.MBA_previousAcademicInfoCollegeObtainedOutofno, this.MBA_previousAcademicInfoCollegeObtainedOutofno_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeObtainedWithout4thsubject: [this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject, this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeObtainedWith4thsubject: [this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject, this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_req ? Validators.required : null,],
            MBA_previousAcademicInfoCollegeObtainedResult: [this.MBA_previousAcademicInfoCollegeObtainedResult, this.MBA_previousAcademicInfoCollegeObtainedResult_req ? Validators.required : null,],

          }),

          courseCurriculumCollege: this._formBuilder.group({
            courseCurriculumCollege3rdSubjectForHSC: [this.courseCurriculumForCollege.courseCurriculumCollege3rdSubjectForHSC.KeyValue ? this.courseCurriculumForCollege.courseCurriculumCollege3rdSubjectForHSC.KeyValue : "", this.courseCurriculumForCollege.courseCurriculumCollege3rdSubjectForHSC.Required ? Validators.required : null,],

            compulsorySubject1: [""],
            compulsorySubject2: [""],

            courseCurriculumCollege4thSubjectForHSC: [this.courseCurriculumForCollege.courseCurriculumCollege4thSubjectForHSC.KeyValue ? this.courseCurriculumForCollege.courseCurriculumCollege4thSubjectForHSC.KeyValue : "", this.courseCurriculumForCollege.courseCurriculumCollege4thSubjectForHSC.Required ? Validators.required : null,],

          }),
        });
        // debugger;
        // if (this.previousAcademicInfoforSchool.previousAcademicInfoSchoolTCDate.Required)
        // {

        //   let abstractControl = this.horizontalStepperForm.controls.previousAcademicInformationforSchool.get('previousAcademicInfoSchoolTCDate');
        //   const isRequired = abstractControl.hasValidator(Validators.required);
        //   console.log(isRequired, 'isRequired');

        //   this.horizontalStepperForm.controls.previousAcademicInformationforSchool.get('previousAcademicInfoSchoolTCDate').setValidators(Validators.required);
        //   this.horizontalStepperForm.controls.previousAcademicInformationforSchool.get('previousAcademicInfoSchoolTCDate').updateValueAndValidity();
        //   console.log(isRequired, 'isRequired');
        // }

        if (this.mainData.GroupId == 31)
        {
          this.horizontalStepperForm.controls.courseCurriculumCollege.get('courseCurriculumCollege3rdSubjectForHSC').setValue('21');
          this.horizontalStepperForm.controls.courseCurriculumCollege.get('courseCurriculumCollege3rdSubjectForHSC').disable();
        }

        // if (this.mainData.ProgramType == "C")
        // {
        //   this.horizontalStepperForm.controls.previousAcademicInformationforCollege.get('previousAcademicInfoCollegeExamination').setValue('18');
        //   this.horizontalStepperForm.controls.previousAcademicInformationforCollege.get('previousAcademicInfoCollegeExamination').disable();
        // }

        if (this.studentFormInfo.FlagStudentInfoSaved.KeyValue == '1')
        {
          this.imageUrl = this.studentFormInfo.studentPhoto.KeyValue;
        }
        else
        {
          this.imageUrl = "none"
        }

        if (this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == '1')
        {
          this.imageFUrl = this.guardianInfo.studentFathersPhoto.KeyValue;
          this.imageMUrl = this.guardianInfo.studentMothersPhoto.KeyValue;
          this.imageGUrl = this.guardianInfo.studentLocalGuardiansPhoto.KeyValue;
        }
        else
        {
          this.imageFUrl = "none";
          this.imageMUrl = "none"
          this.imageGUrl = "none"
        }

        this.gotInterestedClubs = this.mainData.InterestedClubs;
        if (this.gotInterestedClubs != null)
        {
          let selectedClubs = this.gotInterestedClubs.map(object => object.Id.toString());
          this.horizontalStepperForm.controls.studentInformation.get('studentInterestedClub').setValue(selectedClubs);

          let mainValues = this.gotInterestedClubs.map((item) =>
          {
            return item.DataId.toString();
          });

          // console.log(mainValues, 'mainValues');

          this.selectedIC_MainIds = mainValues;

          this.selectedICs = this.gotInterestedClubs.map(object =>
          {
            let obj: any = {};
            obj.Value = object.Id;
            obj.ThirdValue = object.DataId;
            obj.Text = object.ClubName;

            return obj;
          });;
          // debugger;;
          // console.log(this.selectedICs, 'this.selectedICs');

          let CulturalClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "33");
          if (CulturalClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('CulturalClubAchievement').setValue(CulturalClubAchievement[0].Remarks);
          }

          let BengaliDebateClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "34");
          if (BengaliDebateClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('BengaliDebateClubAchievement').setValue(BengaliDebateClubAchievement[0].Remarks);
          }

          let EnglishDebateClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "35");
          if (EnglishDebateClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('EnglishDebateClubAchievement').setValue(EnglishDebateClubAchievement[0].Remarks);
          }

          let SportsClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "37");
          if (SportsClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('SportsClubAchievement').setValue(SportsClubAchievement[0].Remarks);
          }

          let ScienceClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "38");
          if (ScienceClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('ScienceClubAchievement').setValue(ScienceClubAchievement[0].Remarks);
          }

          let BNCCClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "47");
          if (BNCCClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('BNCCClubAchievement').setValue(BNCCClubAchievement[0].Remarks);
          }

          let MusicClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "57");
          if (MusicClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('MusicClubAchievement').setValue(MusicClubAchievement[0].Remarks);
          }

          let DanceClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "58");
          if (DanceClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('DanceClubAchievement').setValue(DanceClubAchievement[0].Remarks);
          }

          let LanguageClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "59");
          if (LanguageClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('LanguageClubAchievement').setValue(LanguageClubAchievement[0].Remarks);
          }

          let SwimmingClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "60");
          if (SwimmingClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('SwimmingClubAchievement').setValue(SwimmingClubAchievement[0].Remarks);
          }

          let BusinessAndCareerClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "61");
          if (BusinessAndCareerClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('BusinessAndCareerClubAchievement').setValue(BusinessAndCareerClubAchievement[0].Remarks);
          }

          let MediaClubAchievement = this.gotInterestedClubs.filter(item => item.DataId == "62");
          if (MediaClubAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('MediaClubAchievement').setValue(MediaClubAchievement[0].Remarks);
          }

          let RedCrescentAchievement = this.gotInterestedClubs.filter(item => item.DataId == "63");
          if (RedCrescentAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('RedCrescentAchievement').setValue(RedCrescentAchievement[0].Remarks);
          }

          let GirlsGuideAchievement = this.gotInterestedClubs.filter(item => item.DataId == "64");
          if (GirlsGuideAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('GirlsGuideAchievement').setValue(GirlsGuideAchievement[0].Remarks);
          }

          let ScoutAchievement = this.gotInterestedClubs.filter(item => item.DataId == "65");
          if (ScoutAchievement.length != 0)
          {
            this.horizontalStepperForm.controls.studentInformation.get('ScoutAchievement').setValue(ScoutAchievement[0].Remarks);
          }
        }

        const studentInformationFormGroup = this.horizontalStepperForm.get('studentInformation') as FormGroup;

        const guardianInformationFormGroup = this.horizontalStepperForm.get('guardianInformation') as FormGroup;

        const addressInformationFormGroup = this.horizontalStepperForm.get('addressInformation') as FormGroup;

        const previousAcademicInformationforCollegeFormGroup = this.horizontalStepperForm.get('previousAcademicInformationforCollege') as FormGroup;

        const previousAcademicInformationforSchoolFormGroup = this.horizontalStepperForm.get('previousAcademicInformationforSchool') as FormGroup;

        const requiredControls_studentInformationFormGroup = Utils.findRequiredControls(studentInformationFormGroup);
        const requiredControls_guardianInformationFormGroup = Utils.findRequiredControls(guardianInformationFormGroup);
        const requiredControls_addressInformationFormGroup = Utils.findRequiredControls(addressInformationFormGroup);
        const requiredControls_previousAcademicInformationforSchoolFormGroup = Utils.findRequiredControls(previousAcademicInformationforSchoolFormGroup);
        console.log('Required form controls:', requiredControls_studentInformationFormGroup);
        console.log('Required form controls:', requiredControls_guardianInformationFormGroup);
        console.log('Required form controls:', requiredControls_addressInformationFormGroup);
        console.log('Required form controls:', requiredControls_previousAcademicInformationforSchoolFormGroup);

        // if (this.studentFormInfo.FlagStudentInfoSaved.KeyValue == '1')
        // {
        //   // this.imageUrl = this.FormParam.AutoCompleteImage;
        //   this.imageUrl = this.studentFormInfo.studentPhoto.KeyValue;
        //   this.toDataURL(this.sanitizer.bypassSecurityTrustUrl(this.studentFormInfo.studentPhoto.KeyValue), (base64image) =>
        //   {

        //     let fdf = this.studentFormInfo.studentPhoto.KeyValue.replace('\\', '').replace('\\', '').replace('\\', '');
        //     let dd = {
        //       'userBase64File': (<string>base64image).split(',')[1],
        //       'userFilename': fdf.split("/")[this.studentFormInfo.studentPhoto.KeyValue.split("/").length - 1]
        //     }
        //     this.StudentProfileImage = dd;

        //   });
        // }
        // else
        // {
        //   this.imageUrl = "none"
        // }

        // if (this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == '1')
        // {
        //   this.imageFUrl = this.guardianInfo.studentFathersPhoto.KeyValue;
        //   this.toDataURL(this.sanitizer.bypassSecurityTrustUrl(this.guardianInfo.studentFathersPhoto.KeyValue), (base64image) =>
        //   {

        //     let fdf = this.guardianInfo.studentFathersPhoto.KeyValue.replace('\\', '').replace('\\', '').replace('\\', '');
        //     let dd = {
        //       'userBase64File': (<string>base64image).split(',')[1],
        //       'userFilename': fdf.split("/")[this.guardianInfo.studentFathersPhoto.KeyValue.split("/").length - 1]
        //     }
        //     this.FatherProfileImage = dd;
        //   });

        //   this.imageMUrl = this.guardianInfo.studentMothersPhoto.KeyValue;
        //   this.toDataURL(this.sanitizer.bypassSecurityTrustUrl(this.guardianInfo.studentMothersPhoto.KeyValue), (base64image) =>
        //   {
        //     let fdf = this.guardianInfo.studentMothersPhoto.KeyValue.replace('\\', '').replace('\\', '').replace('\\', '');
        //     let dd = {
        //       'userBase64File': (<string>base64image).split(',')[1],
        //       'userFilename': fdf.split("/")[this.guardianInfo.studentMothersPhoto.KeyValue.split("/").length - 1]
        //     }
        //     this.MotherProfileImage = dd;
        //   });

        //   this.imageGUrl = this.guardianInfo.studentLocalGuardiansPhoto.KeyValue;
        //   this.toDataURL(this.sanitizer.bypassSecurityTrustUrl(this.guardianInfo.studentLocalGuardiansPhoto.KeyValue), (base64image) =>
        //   {

        //     let fdf = this.guardianInfo.studentLocalGuardiansPhoto.KeyValue.replace('\\', '').replace('\\', '').replace('\\', '');
        //     let dd = {
        //       'userBase64File': (<string>base64image).split(',')[1],
        //       'userFilename': fdf.split("/")[this.guardianInfo.studentLocalGuardiansPhoto.KeyValue.split("/").length - 1]
        //     }
        //     this.LocalGuardianProfileImage = dd;
        //   });

        // }
        // else
        // {
        //   this.imageFUrl = "none";
        //   this.imageMUrl = "none"
        //   this.imageGUrl = "none"
        // }

        this.fetchingData = false;
        this.foundError = false;

        // if (this.FormParam.AutoCompleteName)
        // {
        //   this.horizontalStepperForm.controls.studentInformation.patchValue({
        //     studentFullNameEng: this.FormParam.AutoCompleteName,
        //     studentFullName: this.FormParam.AutoCompleteName,
        //   });
        //   this.submitted = true;
        // }
      },
      (error: any) =>
      {
        this.foundError = true;
        this.fetchingData = false;
        console.log(error, "error");
      }
    );
  }



  ngOnDestroy(): void
  {


    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }



  goToNextStep(): void
  {
    this.stepper.next();
  }


  onStudentProfileImageAdded(eventData: any)
  {
    // console.log(eventData, "onStudentProfileImageAdded");
    // console.log([null, undefined].includes(eventData.userImage));
    this.StudentProfileImage = eventData.userImage;
    // this.StudentProfileImage = eventData.userImage || this.FormParam.AutocompleteImage;
    // console.log(this.StudentProfileImage, "  this.StudentProfileImage ");

  }

  onStudentSignImageAdded(eventData: any)
  {
    // console.log(eventData, "onStudentSignImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onFathersInformationImageAdded(eventData: any)
  {
    this.FatherProfileImage = eventData.userImage;
    // console.log(eventData, "onFathersInformationImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onFathersSignImageAdded(eventData: any)
  {
    // console.log(eventData, "onFathersSignImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onMothersInformationImageAdded(eventData: any)
  {
    this.MotherProfileImage = eventData.userImage;
    // console.log(eventData, "onMothersInformationImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onMothersSignImageAdded(eventData: any)
  {
    // console.log(eventData, "onMothersSignImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onLocalGuardiansInformationImageAdded(eventData: any)
  {
    this.LocalGuardianProfileImage = eventData.userImage;
    // console.log(eventData, "onLocalGuardiansInformationImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onLocalGuardiansInformationSignImageAdded(eventData: any)
  {
    // console.log(eventData, "onMothersSignImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  onDefencesInformationImageAdded(eventData: any)
  {
    // console.log(eventData, "onDefencesInformationImageAdded");
    // console.log([null, undefined].includes(eventData.image));
  }

  SetICS()
  {
    let ics = this.selectedICs.map((item) =>
    {
      let ic = {
        "clubId": item.Value,
        "clientId": this.mainData.ClientId ? Number(this.mainData.ClientId) : 0,
        "remarks": this.SwitchIcRemarks(item.ThirdValue.toString())
      };
      return ic;
    });
    console.log(ics, 'ics');
    return ics;
  }

  SwitchIcRemarks(item)
  {
    let headName = "";
    switch (item)
    {
      case "33":
        headName = this.horizontalStepperForm.controls.studentInformation.get('CulturalClubAchievement').value;
        break;

      case "34":
        headName = this.horizontalStepperForm.controls.studentInformation.get('BengaliDebateClubAchievement').value;
        break;

      case "35":
        headName = this.horizontalStepperForm.controls.studentInformation.get('EnglishDebateClubAchievement').value;
        break;

      case "37":
        headName = this.horizontalStepperForm.controls.studentInformation.get('SportsClubAchievement').value;
        break;

      case "38":
        headName = this.horizontalStepperForm.controls.studentInformation.get('ScienceClubAchievement').value;
        break;

      case "47":
        headName = this.horizontalStepperForm.controls.studentInformation.get('BNCCClubAchievement').value;
        break;

      case "57":
        headName = this.horizontalStepperForm.controls.studentInformation.get('MusicClubAchievement').value;
        break;

      case "58":
        headName = this.horizontalStepperForm.controls.studentInformation.get('DanceClubAchievement').value;
        break;

      case "59":
        headName = this.horizontalStepperForm.controls.studentInformation.get('LanguageClubAchievement').value;
        break;

      case "60":
        headName = this.horizontalStepperForm.controls.studentInformation.get('SwimmingClubAchievement').value;
        break;

      case "61":
        headName = this.horizontalStepperForm.controls.studentInformation.get('BusinessAndCareerClubAchievement').value;
        break;

      case "62":
        headName = this.horizontalStepperForm.controls.studentInformation.get('MediaClubAchievement').value;
        break;

      case "63":
        headName = this.horizontalStepperForm.controls.studentInformation.get('RedCrescentAchievement').value;
        break;

      case "64":
        headName = this.horizontalStepperForm.controls.studentInformation.get('GirlsGuideAchievement').value;
        break;

      case "65":
        headName = this.horizontalStepperForm.controls.studentInformation.get('ScoutAchievement').value;
        break;
    }
    return headName;
  }

  public onStepChange(event: any): void
  {
    console.log(event);
    console.log(event.selectedStep.label);

    if (event.selectedStep.label == 'Review' || event.selectedStep.label == 'Course Curriculum')
    {
      let ddbody = `${this.mainData.StudentMasterId}/${this.mainData.ClientId}`;

      this._dashboardService.GetCurrentProfile(ddbody).subscribe((data: any) =>
      {
        console.log(data, "data");

        this.MainAppliedData = data.data;

        if (this.mainData.GroupName == 'Humanities' && this.MainAppliedData != null)
        {
          this.horizontalStepperForm.controls.courseCurriculumCollege.get('compulsorySubject1').setValue(this.MainAppliedData.CompSubject1CourseId
            .toString());
          this.horizontalStepperForm.controls.courseCurriculumCollege.get('compulsorySubject2').setValue(this.MainAppliedData.CompSubject2CourseId
            .toString());
        }

      }, (error: any) =>
      {
        this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        console.log(error, "error");
      });
    }
  }

  permanentAddRadioButton(): void
  {
    let info = this.horizontalStepperForm.controls.addressInformation.getRawValue();
    // console.log(info.presentAreaAddress, "presentAreaAddress");
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentAreaAddress: info.presentAreaAddress, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentPostCode: info.presentPostCode, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentDistrict: info.presentDistrict, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentDivision: info.presentDivision, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentPostOffice: info.presentPostOffice, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentVillage: info.presentVillage, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentPoliceStation: info.presentPoliceStation, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentAddressEng: info.presentAddressEng, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentAddressBng: info.presentAddressBng, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentHouse: info.presentHouse, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentSection: info.presentSection, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentPlot: info.presentPlot, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentSector: info.presentSector, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentUpazila: info.presentUpazila, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentRoad: info.presentRoad, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentUnion: info.presentUnion, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentBlock: info.presentBlock, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentWardNo: info.presentWardNo, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ permanentPaurashava: info.presentPaurashava, });

    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAreaAddress.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPostCode.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentDistrict.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentDivision.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPostOffice.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentVillage.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPoliceStation.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAddressEng.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAddressBng.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentHouse.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentSection.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPlot.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentSector.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentUpazila.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentRoad.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentUnion.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentBlock.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentWardNo.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPaurashava.disable();

    this.PoliceStations_permanent = this.PoliceStations_present;
  }

  resetPermanentAddRadioButton(): void
  {
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAreaAddress.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPostCode.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentDistrict.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentDivision.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPostOffice.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentVillage.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPoliceStation.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAddressEng.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAddressBng.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentHouse.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentSection.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPlot.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentSector.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentUpazila.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentRoad.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentUnion.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentBlock.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentWardNo.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPaurashava.setValue("");

    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAreaAddress.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPostCode.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentDistrict.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentDivision.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPostOffice.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentVillage.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPoliceStation.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAddressEng.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentAddressBng.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentHouse.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentSection.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPlot.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentSector.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentUpazila.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentRoad.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentUnion.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentBlock.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentWardNo.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].permanentPaurashava.enable();

    this.PoliceStations_permanent = [];
  }

  localAddRadioButton(): void
  {
    let info = this.horizontalStepperForm.controls.addressInformation.getRawValue();
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianAreaAddress: info.presentAreaAddress, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPostCode: info.presentPostCode, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianDistrict: info.presentDistrict, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianDivision: info.presentDivision, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPostOffice: info.presentPostOffice, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianVillage: info.presentVillage, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPoliceStation: info.presentPoliceStation, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianAddressEng: info.presentAddressEng, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianAddressBng: info.presentAddressBng, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianHouse: info.presentHouse, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianSection: info.presentSection, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPlot: info.presentPlot, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianSector: info.presentSector, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianUpazila: info.presentUpazila, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianRoad: info.presentRoad, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianUnion: info.presentUnion, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianBlock: info.presentBlock, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianWardNo: info.presentWardNo, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPaurashava: info.presentPaurashava, });

    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAreaAddress.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostCode.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDistrict.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDivision.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostOffice.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianVillage.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPoliceStation.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressEng.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressBng.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianHouse.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSection.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPlot.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSector.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUpazila.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianRoad.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUnion.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianBlock.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianWardNo.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPaurashava.disable();

    this.PoliceStations_local = this.PoliceStations_present;
  }

  localAddPermanentRadioButton(): void
  {
    let info = this.horizontalStepperForm.controls.addressInformation.getRawValue();
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianAreaAddress: info.permanentAreaAddress, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPostCode: info.permanentPostCode, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianDistrict: info.permanentDistrict, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianDivision: info.permanentDivision, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPostOffice: info.permanentPostOffice, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianVillage: info.permanentVillage, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPoliceStation: info.permanentPoliceStation, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianAddressEng: info.permanentAddressEng, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianAddressBng: info.permanentAddressBng, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianHouse: info.permanentHouse, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianSection: info.permanentSection, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPlot: info.permanentPlot, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianSector: info.permanentSector, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianUpazila: info.permanentUpazila, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianRoad: info.permanentRoad, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianUnion: info.permanentUnion, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianBlock: info.permanentBlock, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianWardNo: info.permanentWardNo, });
    this.horizontalStepperForm.controls.addressInformation.patchValue({ localGuardianPaurashava: info.permanentPaurashava, });

    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAreaAddress.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostCode.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDistrict.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDivision.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostOffice.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianVillage.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPoliceStation.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressEng.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressBng.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianHouse.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSection.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPlot.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSector.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUpazila.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianRoad.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUnion.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianBlock.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianWardNo.disable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPaurashava.disable();

    this.PoliceStations_local = this.PoliceStations_permanent;
  }

  resetLocalAddRadioButton(): void
  {
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAreaAddress.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostCode.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDistrict.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDivision.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostOffice.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianVillage.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPoliceStation.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressEng.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressBng.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianHouse.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSection.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPlot.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSector.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUpazila.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianRoad.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUnion.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianBlock.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianWardNo.setValue("");
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPaurashava.setValue("");

    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAreaAddress.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostCode.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDistrict.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianDivision.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPostOffice.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianVillage.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPoliceStation.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressEng.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianAddressBng.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianHouse.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSection.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPlot.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianSector.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUpazila.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianRoad.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianUnion.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianBlock.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianWardNo.enable();
    this.horizontalStepperForm.controls.addressInformation["controls"].localGuardianPaurashava.enable();

    this.PoliceStations_local = [];
  }

  Save_studentInformation()
  {

    if (this.studentFormInfo.studentPhoto.Required && (this.StudentProfileImage == null || this.StudentProfileImage == undefined) && (this.studentFormInfo.FlagStudentInfoSaved.KeyValue == '0' || this.studentFormInfo.FlagStudentInfoSaved.KeyValue == null))
    {
      this.matSnackBar.open("Profile photo is required", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }

    let si_form = this.horizontalStepperForm.controls.studentInformation.getRawValue();
    console.log(si_form, "si_form");

    let tI_obj = Utils.altObj(si_form);

    this.studentForm_s = tI_obj;

    console.log(this.studentForm_s, "studentForm_s");
    console.log(tI_obj, "tI_obj");

    let body = {
      "id": this.mainData.StudentMasterId,
      "clientId": this.mainData.ClientId ? Number(this.mainData.ClientId) : "",

      "programID": this.mainData.ProgramId ? this.mainData.ProgramId : 0,
      "versionID": this.mainData.VersionId ? this.mainData.VersionId : 0,
      "shiftID": this.mainData.ShiftId ? this.mainData.ShiftId : 0,
      "studentCatID": tI_obj.studentCatID != '' ? tI_obj.studentCatID : 0,
      "sessionID": this.mainData.SessionId ? this.mainData.SessionId : 0,
      "groupID": this.mainData.GroupId != "" ? Number(this.mainData.GroupId) : 0,

      "studentRoll": 0,
      "studentName": tI_obj.studentName ? tI_obj.studentName : "",
      "fatherName": tI_obj.fatherName ? tI_obj.fatherName : "",
      "motherName": tI_obj.motherName ? tI_obj.motherName : "",
      "presentAddr": "",
      "contactNo": tI_obj.contactNo ? tI_obj.contactNo.toString() : "",
      "contactNoS": tI_obj.contactNoS ? tI_obj.contactNoS.toString() : "",
      "isRegular": "",
      "isActive": "",
      "isPromotion": "",
      "adminType": "N",//eft
      // "brdVrstyID": this.FormParam.SelectedBoard ? this.FormParam.SelectedBoard : "1",//eft
      "admissionStatus": "",
      "studentIDType": "",
      "isArchive": "",
      "idCardNoS": "",
      "houseID": 0,// eft
      "idCardNoG": tI_obj.nationalIDG ? tI_obj.nationalIDG : "",
      "idCardNoF": tI_obj.nationalIDF ? tI_obj.nationalIDF : "",
      "idCardNoM": tI_obj.nationalIDM ? tI_obj.nationalIDM : "",
      "studentNameBangla": tI_obj.studentNameBangla ? tI_obj.studentNameBangla : "",
      "fatherNameBangla": tI_obj.fatherNameBangla ? tI_obj.fatherNameBangla : "",
      "motherNameBangla": tI_obj.motherNameBangla ? tI_obj.motherNameBangla : "",
      "trackingID": "",
      "isSendSMS": "",
      "updateUserID": 0,
      "updateTime": new Date(),
      "updateUserIPAddress": "--",
      "bloodGroup": tI_obj.bloodGroup ? tI_obj.bloodGroup : "",
      "nationalID": tI_obj.nationalID ? tI_obj.nationalID : 0,
      "homeDisID": tI_obj.homeDisID ? tI_obj.homeDisID : 0,
      "birthDate": tI_obj.birthDate ? moment(tI_obj.birthDate).format() : "",
      "birthID": tI_obj.birthID ? tI_obj.birthID : "",
      "religionID": tI_obj.religionID ? tI_obj.religionID : 0,
      // "emargencyContactNo": tI_obj.contactNo ? tI_obj.contactNo.toString() : "",
      "studentSex": tI_obj.studentSex ? tI_obj.studentSex : "",
      "emailAddress": tI_obj.emailAddress ? tI_obj.emailAddress : "",
      "studentHeight": tI_obj.studentHeight ? tI_obj.studentHeight : "",
      "studentWeight": tI_obj.studentWeight ? tI_obj.studentWeight : "",
      "ownHouse": tI_obj.ownHouse ? tI_obj.ownHouse : "",
      "houseIncome": tI_obj.houseIncome ? tI_obj.houseIncome : 0,
      "houseExpense": tI_obj.houseExpense ? tI_obj.houseExpense : 0,
      "freedomFighter": tI_obj.freedomFighter ? tI_obj.freedomFighter : "",
      "isAutism": tI_obj.isAutism ? tI_obj.isAutism : "",
      "firstName": tI_obj.firstName ? tI_obj.firstName : "",
      "middleName": tI_obj.middleName ? tI_obj.middleName : "",
      "lastName": tI_obj.lastName ? tI_obj.lastName : "",
      "nickName": tI_obj.nickName ? tI_obj.nickName : "",
      "photoPathS": "",
      "studentSign": "",
      "photoSBase64": this.StudentProfileImage != null ? this.StudentProfileImage.userBase64File : "",
      "signSBase64": "",
      "photoSName": this.StudentProfileImage != null ? this.StudentProfileImage.userFilename : "",
      "signSName": "",
      "hobby": tI_obj.hobby ? tI_obj.hobby : "",
      "circularDetailId": this.mainData.CircularDetailId,
      "interestedClub": "",
      "interestedClubs": this.SetICS(),
    }

    console.log(body, 'SaveStudentForm body');
    // debugger;
    this._dashboardService.SaveStudentFormIncomplete(body).subscribe((data: any) =>
    {
      console.log(data, "data");
      if (data.isError == false)
      {
        if (data.data == "BirthIDExist")
        {
          this.matSnackBar.open("Student With Same Birth Reg. Already Exists", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          return;
        }
        else if (data.data == "AgeNotMatched")
        {
          this.matSnackBar.open("Student Age Is Not Within The Set Limit", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          return;
        }
        else if (data.data == "GenderNotMatched")
        {
          this.matSnackBar.open("Student Gender Does Not Match Circular Requirements", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          return;
        }
        else if (data.data == "Expired")
        {
          this.matSnackBar.open("Circular Has Expired, Application Wont Be accepted", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          return;
        }
        else
        {
          this.matSnackBar.open("Student Information Updated", 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.stepper.next();
        }
      }
      else
      {
        this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
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


  Save_guardianInformation()
  {
    if (this.guardianInfo.studentFathersPhoto.Required
      && (this.FatherProfileImage == null ||
        this.FatherProfileImage == undefined) &&
      (this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == '0' ||
        this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == null))
    {
      this.matSnackBar.open("Father Profile photo is required", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }

    if (this.guardianInfo.studentMothersPhoto.Required
      && (this.MotherProfileImage == null
        || this.MotherProfileImage == undefined) &&
      (this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == '0' ||
        this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == null))
    {
      this.matSnackBar.open("Mother Profile photo is required", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }

    if (this.guardianInfo.studentLocalGuardiansPhoto.Required
      && (this.LocalGuardianProfileImage == null ||
        this.LocalGuardianProfileImage == undefined) &&
      (this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == '0' ||
        this.studentFormInfo.FlagGuardianInfoSaved.KeyValue == null))
    {
      this.matSnackBar.open("Local Guardian Profile photo is required", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }



    let si_form = this.horizontalStepperForm.controls.guardianInformation.getRawValue();
    // console.log(si_form, "si_form");

    let tI_obj = Utils.altObj(si_form);

    console.log(tI_obj, "tI_obj");

    let body = {
      "studentMasterId": this.studentSaveData != null ? this.studentSaveData.Id : this.mainData.StudentMasterId,
      "studentID": '',
      "fatherName": tI_obj.fatherName ? tI_obj.fatherName : "",
      "fatherNameBangla": tI_obj.fatherNameBangla ? tI_obj.fatherNameBangla : "",
      "contactNoF": tI_obj.contactNoF ? tI_obj.contactNoF : "",
      "emailF": tI_obj.emailF ? tI_obj.emailF : "",
      "fatherOfficeName": tI_obj.fatherOfficeName ? tI_obj.fatherOfficeName : "",
      "fatherOfficeAddr": tI_obj.fatherOfficeAddr ? tI_obj.fatherOfficeAddr : "",
      "fatherOcpID": tI_obj.fatherOcpID ? tI_obj.fatherOcpID : "",
      "fatherOfficeDesig": tI_obj.fatherOfficeDesig ? tI_obj.fatherOfficeDesig : "",
      "fatherOfficePhone": tI_obj.fatherOfficePhone ? tI_obj.fatherOfficePhone : "",
      "fatherTIN": tI_obj.fatherTIN ? tI_obj.fatherTIN : "",
      "nationalIDF": tI_obj.nationalIDF ? tI_obj.nationalIDF : "",
      "annualIncomeF": tI_obj.annualIncomeF ? tI_obj.annualIncomeF : "",
      "photoPathF": "",
      "photoUrlF": "",
      "fatherEducation": tI_obj.fatherEducation ? tI_obj.fatherEducation : "",
      "fatherSign": "",
      "employeeNoF": "",
      "departmentF": "",
      "motherName": tI_obj.motherName ? tI_obj.motherName : "",
      "motherNameBangla": tI_obj.motherNameBangla ? tI_obj.motherNameBangla : "",
      "emailAddress": tI_obj.emailAddress ? tI_obj.emailAddress : "",
      "contactNoM": tI_obj.contactNoM ? tI_obj.contactNoM : "",
      "emailM": tI_obj.emailM ? tI_obj.emailM : "",
      "motherOfficeName": tI_obj.motherOfficeName ? tI_obj.motherOfficeName : "",
      "motherOfficeAddr": tI_obj.motherOfficeAddr ? tI_obj.motherOfficeAddr : "",
      "motherOcpID": tI_obj.motherOcpID ? tI_obj.motherOcpID : "",
      "motherOfficeDesig": tI_obj.motherOfficeDesig ? tI_obj.motherOfficeDesig : "",
      "motherOfficePhone": tI_obj.motherOfficePhone ? tI_obj.motherOfficePhone : "",
      "motherTIN": tI_obj.motherTIN ? tI_obj.motherTIN : "",
      "nationalIDM": tI_obj.nationalIDM ? tI_obj.nationalIDM : "",
      "annualIncomeM": tI_obj.annualIncomeF ? tI_obj.annualIncomeF : "",
      "photoPathM": "",
      "photoUrlM": "",
      "motherSign": "",
      "motherEducation": tI_obj.motherEducation ? tI_obj.motherEducation : "",
      "employeeNoM": "",
      "departmentM": "",
      "guardianName": tI_obj.guardianName ? tI_obj.guardianName : "",
      "guardianR": tI_obj.guardianR ? tI_obj.guardianR : "",
      "contactNoG": tI_obj.contactNoG ? tI_obj.contactNoG : "",
      "emailG": tI_obj.emailG ? tI_obj.emailG : "",
      "guardOfficeName": tI_obj.guardOfficeName ? tI_obj.guardOfficeName : "",
      "guardOfficeAddr": tI_obj.guardOfficeAddr ? tI_obj.guardOfficeAddr : "",
      "guardianOcpID": tI_obj.guardianOcpID ? tI_obj.guardianOcpID : "",
      "guardOfficeDesig": tI_obj.guardOfficeDesig ? tI_obj.guardOfficeDesig : "",
      "guardOfficePhone": tI_obj.guardOfficePhone ? tI_obj.guardOfficePhone : "",
      "guardTIN": tI_obj.guardTIN ? tI_obj.guardTIN : "",
      "nationalIDG": tI_obj.nationalIDG ? tI_obj.nationalIDG : "",
      "annualIncomeG": tI_obj.annualIncomeG ? tI_obj.annualIncomeG : "",
      "photoPathG": "",
      "armyNo": "",
      "regimentNo": "",
      "defencePerson": "",
      "fatherRankID": null,
      "unitID": null,
      "childNo": tI_obj.childNo ? tI_obj.childNo : "",
      "stationName": tI_obj.stationName ? tI_obj.stationName : "",
      "isRetired": tI_obj.isRetired ? tI_obj.isRetired : "",
      "retireDate": tI_obj.retireDate ? tI_obj.retireDate : "",
      "districtID": null,
      "missionStartDate": tI_obj.missionStartDate ? tI_obj.missionStartDate : "",
      "missionEndDate": tI_obj.missionEndDate ? tI_obj.missionEndDate : "",
      "unitName": tI_obj.unitName ? tI_obj.unitName : "",
      "placeOfMission": tI_obj.placeOfMission ? tI_obj.placeOfMission : "",
      "photoUrlG": "",
      "guardinSign": "",
      "guardianEducation": tI_obj.guardianEducation ? tI_obj.guardianEducation : "",
      "baBssSnkIdNo": tI_obj.baBssSnkIdNo ? tI_obj.baBssSnkIdNo : "",
      "gurdianNameBangla": tI_obj.gurdianNameBangla ? tI_obj.gurdianNameBangla : "",
      "employeeNoG": "",
      "departmentG": "",
      "ambitionID": "",
      "activeStatus": true,
      "createUserIPAddress": "",
      "updateUserIPAddress": "",
      "createUserID": 0,
      "createTime": new Date().toISOString(),
      "updateTime": "2022-12-21T12:02:18.557Z",
      "updateUserID": 0,
      "SignFBase64": "",
      "SignFName": "",
      "SignMBase64": "",
      "SignMName": "",
      "SignGBase64": "",
      "SignGName": "",
      "PhotoFName": this.FatherProfileImage != null ? this.FatherProfileImage.userFilename : "",
      "PhotoFBase64": this.FatherProfileImage != null ? this.FatherProfileImage.userBase64File : "",
      "PhotoMName": this.MotherProfileImage != null ? this.MotherProfileImage.userFilename : "",
      "PhotoMBase64": this.MotherProfileImage != null ? this.MotherProfileImage.userBase64File : "",
      "PhotoGName": this.LocalGuardianProfileImage != null ? this.LocalGuardianProfileImage.userFilename : "",
      "PhotoGBase64": this.LocalGuardianProfileImage != null ? this.LocalGuardianProfileImage.userBase64File : "",
    }
    console.log(body, "guardionbody");
    // console.log(body.createTime, "gbodytime");


    this._dashboardService.SaveGuardianForm(body).subscribe((data: any) =>
    {
      // console.log(data, "data");

      this.guardianSaveData = data.data;
      // localStorage.setItem('guardianSaveData', JSON.stringify(this.guardianSaveData));

      if (data.isError == false)
      {
        this.matSnackBar.open("Guardian Information Saved", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.stepper.next();
      } else
      {
        this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
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

  Save_addressInformation()
  {
    let si_form = this.horizontalStepperForm.controls.addressInformation.getRawValue();
    // console.log(si_form, "si_form");

    let tI_obj = Utils.altObj(si_form);

    // console.log(tI_obj, "tI_obj");

    let body = {
      "studentMasterId": this.studentSaveData != null ? this.studentSaveData.Id : this.mainData.StudentMasterId,
      "studentID": '',
      "houseSRA": tI_obj.houseSRA ? tI_obj.houseSRA : "",
      "plotSRA": tI_obj.plotSRA ? tI_obj.plotSRA : "",
      "roadSRA": tI_obj.roadSRA ? tI_obj.roadSRA : "",
      "blockSRA": tI_obj.blockSRA ? tI_obj.blockSRA : "",
      "sectionSRA": tI_obj.sectionSRA ? tI_obj.sectionSRA : "",
      "sectorSRA": tI_obj.sectorSRA ? tI_obj.sectorSRA : "",
      "areaSRA": tI_obj.areaSRA ? tI_obj.areaSRA : "",
      "wardSRA": "",
      "wardNoSRA": tI_obj.wardNoSRA ? tI_obj.wardNoSRA : "",
      "districtIDSRA": tI_obj.districtIDSRA ? Number(tI_obj.districtIDSRA) : 0,
      "divisionIDSRA": tI_obj.divisionIDSRA ? Number(tI_obj.divisionIDSRA) : 0,
      "upazilaIDSRA": tI_obj.upazilaIDSRA ? Number(tI_obj.upazilaIDSRA) : 0,
      "unionIDSRA": tI_obj.unionIDSRA ? Number(tI_obj.unionIDSRA) : 0,
      "paurashavaIDSRA": tI_obj.paurashavaIDSRA ? Number(tI_obj.paurashavaIDSRA) : 0,
      "postOfficeIDSRA": tI_obj.postOfficeIDSRA ? Number(tI_obj.postOfficeIDSRA) : 0,
      "postCodeSRA": tI_obj.postCodeSRA ? tI_obj.postCodeSRA : "",
      "policeStationIDSRA": tI_obj.policeStationIDSRA ? Number(tI_obj.policeStationIDSRA) : 0,
      "villageSRA": tI_obj.villageSRA ? tI_obj.villageSRA : "",
      "addressSRA": tI_obj.addressSRA ? tI_obj.addressSRA : "",
      "houseLGA": tI_obj.houseLGA ? tI_obj.houseLGA : "",
      "plotLGA": tI_obj.plotLGA ? tI_obj.plotLGA : "",
      "roadLGA": tI_obj.roadLGA ? tI_obj.roadLGA : "",
      "blockLGA": tI_obj.blockLGA ? tI_obj.blockLGA : "",
      "sectionLGA": tI_obj.sectionLGA ? tI_obj.sectionLGA : "",
      "sectorLGA": tI_obj.sectorLGA ? tI_obj.sectorLGA : "",
      "areaLGA": tI_obj.areaLGA ? tI_obj.areaLGA : "",
      "wardLGA": "",
      "wardNoLGA": tI_obj.wardNoLGA ? tI_obj.wardNoLGA : "",
      "districtIDLGA": tI_obj.districtIDLGA ? Number(tI_obj.districtIDLGA) : 0,
      "divisionIDLGA": tI_obj.divisionIDLGA ? Number(tI_obj.divisionIDLGA) : 0,
      "upazilaIDLGA": tI_obj.upazilaIDLGA ? Number(tI_obj.upazilaIDLGA) : 0,
      "unionIDLGA": tI_obj.unionIDLGA ? Number(tI_obj.unionIDLGA) : 0,
      "paurashavaIDLGA": tI_obj.paurashavaIDLGA ? Number(tI_obj.paurashavaIDLGA) : 0,
      "postOfficeIDLGA": tI_obj.postOfficeIDLGA ? Number(tI_obj.postOfficeIDLGA) : 0,
      "postCodeLGA": tI_obj.postCodeLGA ? tI_obj.postCodeLGA : "",
      "policeStationIDLGA": tI_obj.policeStationIDLGA ? Number(tI_obj.policeStationIDLGA) : 0,
      "villageLGA": tI_obj.villageLGA ? tI_obj.villageLGA : "",
      "addressLGA": tI_obj.addressLGA ? tI_obj.addressLGA : "",
      "housePA": tI_obj.housePA ? tI_obj.housePA : "",
      "plotPA": tI_obj.plotPA ? tI_obj.plotPA : "",
      "roadPA": tI_obj.roadPA ? tI_obj.roadPA : "",
      "blockPA": tI_obj.blockPA ? tI_obj.blockPA : "",
      "sectionPA": tI_obj.sectionPA ? tI_obj.sectionPA : "",
      "sectorPA": tI_obj.sectorPA ? tI_obj.sectorPA : "",
      "areaPA": tI_obj.areaPA ? tI_obj.areaPA : "",
      "wardPA": "",
      "wardNoPA": tI_obj.wardNoPA ? tI_obj.wardNoPA : "",
      "districtIDPA": tI_obj.districtIDPA ? Number(tI_obj.districtIDPA) : 0,
      "divisionIDPA": tI_obj.divisionIDPA ? Number(tI_obj.divisionIDPA) : 0,
      "upazilaIDPA": tI_obj.upazilaIDPA ? Number(tI_obj.upazilaIDPA) : 0,
      "unionIDPA": tI_obj.unionIDPA ? Number(tI_obj.unionIDPA) : 0,
      "paurashavaIDPA": tI_obj.paurashavaIDPA ? Number(tI_obj.paurashavaIDPA) : 0,
      "postOfficeIDPA": tI_obj.postOfficeIDPA ? Number(tI_obj.postOfficeIDPA) : 0,
      "postCodePA": tI_obj.postCodePA ? tI_obj.postCodePA : "",
      "policeStationIDPA": tI_obj.policeStationIDPA ? Number(tI_obj.policeStationIDPA) : 0,
      "villagePA": tI_obj.villagePA ? tI_obj.villagePA : "",
      "addressPA": tI_obj.addressPA ? tI_obj.addressPA : "",
      "activeStatus": true,
      "createUserID": 0,
      "createTime": new Date().toISOString(),
      "createUserIPAddress": "",
      "updateUserID": 0,
      "updateTime": "2022-12-21T12:03:28.127Z",
      "updateUserIPAddress": "",
      "addressSRABangla": "",
      "addressPABangla": ""
    }

    console.log(body, "adressbody");

    this._dashboardService.SaveAddressForm(body).subscribe((data: any) =>
    {
      // console.log(data, "data");
      this.addressSaveData = data.data;
      // localStorage.setItem('addressSaveData', JSON.stringify(this.addressSaveData));

      if (data.isError == false)
      {
        this.matSnackBar.open("Address Information Saved", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.stepper.next();
      } else
      {
        this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
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

  Save_previousAcademicInformationforCollege()
  {

    let si_form = this.horizontalStepperForm.controls.previousAcademicInformationforCollege.getRawValue();
    // console.log(si_form, "si_form");

    let tI_obj = Utils.altObj(si_form);

    console.log(tI_obj, "tI_obj");

    let body = {
      "id": 0,
      "studentMasterId": this.studentSaveData != null ? this.studentSaveData.Id : this.mainData.StudentMasterId,
      // "studentID": this.studentSaveData != null ? this.studentSaveData.StudentID : this.FormParam.SelectedStudentId,
      "srlNo": 0,
      "examID": tI_obj.examID ? Number(tI_obj.examID) : 0,
      "subjectID": 0,
      "groupID": tI_obj.preEduGroupID ? Number(tI_obj.preEduGroupID) : 0,
      "boardID": tI_obj.boardID ? Number(tI_obj.boardID) : 0,
      "areaID": tI_obj.areaID ? tI_obj.areaID : 0,
      "centreCode": tI_obj.centreCode ? tI_obj.centreCode : "",
      "educationIns": tI_obj.educationIns ? tI_obj.educationIns : "",
      "totalMarks": "",
      "without4th": tI_obj.without4th ? tI_obj.without4th : "",
      "with4th": tI_obj.with4th ? tI_obj.with4th : "",
      "result": tI_obj.result ? tI_obj.result : "",
      "resultOn": "G",
      "passYear": tI_obj.passYear ? tI_obj.passYear : "",
      "session1": tI_obj.session1 ? tI_obj.session1 : "",
      "session2": tI_obj.session2 ? tI_obj.session2 : "",
      "rgdNo": tI_obj.rgdNo ? tI_obj.rgdNo : "",
      "rollNo": tI_obj.rollNo ? tI_obj.rollNo : "",
      "duration": tI_obj.duration ? tI_obj.duration : "",
      "totalCredit": tI_obj.totalCredit ? tI_obj.totalCredit : "",
      "examHeld": tI_obj.examHeld ? tI_obj.examHeld : "",
      "casualRoll": "",
      "issueNo": "",
      "isRegular": "Y",
      "issueDate": "2022-12-21T12:05:22.119Z",
      "issueType": "N",
      "sourceID": 1,
      "totalMarksWithTenSub": 0,
      "totalMarksWithoutSub": 0,
      "activeStatus": true,
      "createUserID": 0,
      "createTime": new Date().toISOString(),
      "createUserIPAddress": "",
      "updateUserID": 0,
      "updateTime": "2022-12-21T12:05:22.119Z",
      "updateUserIPAddress": ""
    }
    console.log(body, "PreviousAcademicInfobody");
    this._dashboardService.SavePreviousAcademicInfoCollegeForm(body).subscribe((data: any) =>
    {
      // console.log(data, "data");
      this.prevAcademicForCollegeSaveData = data.data;
      // localStorage.setItem('prevAcademicForCollegeSaveData', JSON.stringify(this.prevAcademicForCollegeSaveData));
      if (data.isError == false)
      {
        this.matSnackBar.open("Previous Academic Information Saved", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.stepper.next();
      } else
      {
        this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
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

  Save_previousAcademicInformationforSchool()
  {
    let si_form = this.horizontalStepperForm.controls.previousAcademicInformationforSchool.getRawValue();
    // console.log(si_form, "si_form");

    let tI_obj = Utils.altObj(si_form);

    // console.log(tI_obj, "tI_obj");

    let body = {
      "studentMasterId": this.studentSaveData != null ? this.studentSaveData.Id : this.mainData.StudentMasterId,
      "studentID": '',
      "lastInstitute": tI_obj.lastInstitute ? tI_obj.lastInstitute : "",
      "tcInfo": tI_obj.tcInfo ? tI_obj.tcInfo : "",
      "lastExam": tI_obj.lastExam ? tI_obj.lastExam : "",
      "lastExamResult": tI_obj.lastExamResult ? tI_obj.lastExamResult : "",
      "lastSchoolAdd": tI_obj.lastSchoolAdd ? tI_obj.lastSchoolAdd : "",
      "lastProgram": "",
      "lastSection": tI_obj.lastSection ? tI_obj.lastSection : "",
      "lastRoll": tI_obj.lastRoll ? tI_obj.lastRoll : "",
      "lastTcNo": tI_obj.lastTcNo ? tI_obj.lastTcNo : "",
      "lastTcDate": tI_obj.lastTcDate ? tI_obj.lastTcDate : "",
    }
    console.log(body, "PreviousAcademicInfobody");

    let _apiRequests = [
      this._dashboardService.SavePreviousAcademicInfoSchoolForm(body),

    ];

    let preEduBody = null;
    if (this.mainData.ExamCodes != null)
    {
      preEduBody = Utils.PreEduBuild(si_form, this.mainData.ExamCodes, this.studentSaveData, this.mainData);
      _apiRequests.push(this._dashboardService.SavePreviousAcademicInfoCollegeForm(preEduBody))
    }

    console.log(preEduBody, "PreviousAcademicInfobody");

    // this._dashboardService.SavePreviousAcademicInfoSchoolForm(body)
    forkJoin(_apiRequests).pipe(takeUntil(this._unsubscribeAll)).subscribe((data: any) =>
    {
      // console.log(data, "data");
      this.prevAcademicForSchoolSaveData = data[0].data;
      // localStorage.setItem('prevAcademicForSchoolSaveData', JSON.stringify(this.prevAcademicForSchoolSaveData));
      if (data[0].isError == false)
      {
        this.matSnackBar.open("Previous Academic Information Saved", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.stepper.next();
      } else
      {
        this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
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

  Save_courseCurriculumCollege()
  {
    let si_form = this.horizontalStepperForm.controls.courseCurriculumCollege.getRawValue();
    // console.log(si_form, "si_form");

    let tI_obj = Utils.altObj(si_form);

    console.log(tI_obj, "tI_obj");

    let compulsorySubjectList = Utils.TransfromCompulsorySubjectList(this.CurriculumSubjectsList.CompulsorySubjectList);

    console.log(compulsorySubjectList, "compulsorySubjectList");


    // debugger;;
    let body = {
      "clientId": this.mainData.ClientId ? Number(this.mainData.ClientId) : "",
      "studentId": this.mainData.StudentMasterId,
      "thirdSubject": tI_obj.courseCurriculumCollege3rdSubjectForHSC ? tI_obj.courseCurriculumCollege3rdSubjectForHSC : '',
      "fourthSubject": tI_obj.courseCurriculumCollege4thSubjectForHSC ? tI_obj.courseCurriculumCollege4thSubjectForHSC : '',
      "compulsorySubject": "",
      "compulsorySubject1": tI_obj.compulsorySubject1 ? tI_obj.compulsorySubject1 : '',
      "compulsorySubject2": tI_obj.compulsorySubject2 ? tI_obj.compulsorySubject2 : '',
      "compulsorySubject3": "",
      "compulsorySubjectList": compulsorySubjectList,
    }
    console.log(body, "CourseCurriculumbody");

    this._dashboardService.SaveCourseCurriculumCollegeForm(body, this.mainData.ClientId, this.mainData.GroupId).subscribe((data: any) =>
    {
      // console.log(data, "data");

      this.courseCurriculumSaveData = data.data;
      // localStorage.setItem('courseCurriculumSaveData', JSON.stringify(this.courseCurriculumSaveData));
      if (data.isError == false)
      {
        this.matSnackBar.open("Course Curriculum Saved", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this.stepper.next();
      } else
      {
        this.matSnackBar.open("Couldn't Save Information, Please Try Again", 'Close', {
          verticalPosition: 'top',
          duration: 2000,
        });
      };
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

  Download_admitCard(): void
  {
    this._dashboardService.DlAdminCard(this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Admit Card')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_applicationForm(): void
  {
    this._dashboardService.DlApplicationForm(this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Application Form')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_idCard(): void
  {
    this._dashboardService.DlIdCard(this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'ID Card')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_libraryCard(): void
  {
    this._dashboardService.DlLibraryCard(this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Library Card')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  Download_transportApplyForm(): void
  {
    this._dashboardService.DlTransportApplyForm(this.PermissionData.ApplicantId).subscribe((data: any) =>
    {
      console.log(data, "data");
      // debugger;

      Utils.getImage_m(data.data, 'Transport Apply Form')
      this._changeDetectorRef.markForCheck();

    }, (error: any) =>
    {
      this.matSnackBar.open("Something went wrong, Please Try Again", 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      console.log(error, "error");
    });
  }

  GetPoliceStationByDistrictId_present(event: any): void
  {
    this._dashboardService.GetProfilePoliceStation(event.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (data: any) =>
      {
        console.log(data, "getPageData");

        this.PoliceStations_present = data.data;

        this._changeDetectorRef.markForCheck();

      },
      (error: any) =>
      {

        console.log(error, "error");
      }
    )
  }

  GetPoliceStationByDistrictId_permanent(event: any): void
  {
    this._dashboardService.GetProfilePoliceStation(event.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (data: any) =>
      {
        console.log(data, "getPageData");

        this.PoliceStations_permanent = data.data;

        this._changeDetectorRef.markForCheck();

      },
      (error: any) =>
      {

        console.log(error, "error");
      }
    )
  }

  GetPoliceStationByDistrictId_local(event: any): void
  {
    this._dashboardService.GetProfilePoliceStation(event.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (data: any) =>
      {
        console.log(data, "getPageData");

        this.PoliceStations_local = data.data;

        this._changeDetectorRef.markForCheck();

      },
      (error: any) =>
      {

        console.log(error, "error");
      }
    )
  }

  set_PSC()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "1");

    // debugger;

    this.PSC_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.PSC_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.PSC_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.PSC_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.PSC_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.PSC_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.PSC_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.PSC_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.PSC_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.PSC_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.PSC_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.PSC_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.PSC_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.PSC_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.PSC_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.PSC_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.PSC_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.PSC_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.PSC_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.PSC_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.PSC_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.PSC_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.PSC_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.PSC_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.PSC_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.PSC_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.PSC_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.PSC_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.PSC_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.PSC_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.PSC_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.PSC_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.PSC_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.PSC_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.PSC_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.PSC_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.PSC_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.PSC_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.PSC_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.PSC_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;
  }

  set_PSC_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "1");

    // debugger;

    this.PSC_previousAcademicInfoCollegeGroup = "";
    this.PSC_previousAcademicInfoCollegeRollNo = "";
    this.PSC_previousAcademicInfoCollegeBoard = "";
    this.PSC_previousAcademicInfoCollegeRegNo = "";
    this.PSC_previousAcademicInfoCollegePassingYear = "";
    this.PSC_previousAcademicInfoCollegeInstitute = "";
    this.PSC_previousAcademicInfoCollegeExamHeldIn = "";
    this.PSC_previousAcademicInfoCollegeGPA = "";
    this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.PSC_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.PSC_previousAcademicInfoCollegeSubject = "";
    this.PSC_previousAcademicInfoCollegeDistrict = "";
    this.PSC_previousAcademicInfoCollegeFromSession = "";
    this.PSC_previousAcademicInfoCollegeToSession = "";
    this.PSC_previousAcademicInfoCollegeCourseDuration = "";
    this.PSC_previousAcademicInfoCollegeTotalCredit = "";
    this.PSC_previousAcademicInfoCollegeCentreCode = "";
    this.PSC_previousAcademicInfoCollegeObtainedOutofno = "";
    this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.PSC_previousAcademicInfoCollegeObtainedResult = "";

    this.PSC_previousAcademicInfoCollegeGroup_req = false;
    this.PSC_previousAcademicInfoCollegeRollNo_req = false;
    this.PSC_previousAcademicInfoCollegeBoard_req = false;
    this.PSC_previousAcademicInfoCollegeRegNo_req = false;
    this.PSC_previousAcademicInfoCollegePassingYear_req = false;
    this.PSC_previousAcademicInfoCollegeInstitute_req = false;
    this.PSC_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.PSC_previousAcademicInfoCollegeGPA_req = false;
    this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.PSC_previousAcademicInfoCollegeExamination_req = false;
    this.PSC_previousAcademicInfoCollegeSubject_req = false;
    this.PSC_previousAcademicInfoCollegeDistrict_req = false;
    this.PSC_previousAcademicInfoCollegeFromSession_req = false;
    this.PSC_previousAcademicInfoCollegeToSession_req = false;
    this.PSC_previousAcademicInfoCollegeCourseDuration_req = false;
    this.PSC_previousAcademicInfoCollegeTotalCredit_req = false;
    this.PSC_previousAcademicInfoCollegeCentreCode_req = false;
    this.PSC_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.PSC_previousAcademicInfoCollegeObtainedResult_req = false;


    this.PSC_previousAcademicInfoCollegeGroup_vis = false;
    this.PSC_previousAcademicInfoCollegeBoard_vis = false;
    this.PSC_previousAcademicInfoCollegeRollNo_vis = false;
    this.PSC_previousAcademicInfoCollegeRegNo_vis = false;
    this.PSC_previousAcademicInfoCollegePassingYear_vis = false;
    this.PSC_previousAcademicInfoCollegeInstitute_vis = false;
    this.PSC_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.PSC_previousAcademicInfoCollegeGPA_vis = false;
    this.PSC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.PSC_previousAcademicInfoCollegeExamination_vis = false;
    this.PSC_previousAcademicInfoCollegeSubject_vis = false;
    this.PSC_previousAcademicInfoCollegeDistrict_vis = false;
    this.PSC_previousAcademicInfoCollegeFromSession_vis = false;
    this.PSC_previousAcademicInfoCollegeToSession_vis = false;
    this.PSC_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.PSC_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.PSC_previousAcademicInfoCollegeCentreCode_vis = false;
    this.PSC_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.PSC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.PSC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.PSC_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_JSC_JDC()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "2");

    this.JSC_JDC_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.JSC_JDC_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.JSC_JDC_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.JSC_JDC_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;
  }

  set_JSC_JDC_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "2");

    this.JSC_JDC_previousAcademicInfoCollegeGroup = "";
    this.JSC_JDC_previousAcademicInfoCollegeRollNo = "";
    this.JSC_JDC_previousAcademicInfoCollegeBoard = "";
    this.JSC_JDC_previousAcademicInfoCollegeRegNo = "";
    this.JSC_JDC_previousAcademicInfoCollegePassingYear = "";
    this.JSC_JDC_previousAcademicInfoCollegeInstitute = "";
    this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn = "";
    this.JSC_JDC_previousAcademicInfoCollegeGPA = "";
    this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.JSC_JDC_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.JSC_JDC_previousAcademicInfoCollegeSubject = "";
    this.JSC_JDC_previousAcademicInfoCollegeDistrict = "";
    this.JSC_JDC_previousAcademicInfoCollegeFromSession = "";
    this.JSC_JDC_previousAcademicInfoCollegeToSession = "";
    this.JSC_JDC_previousAcademicInfoCollegeCourseDuration = "";
    this.JSC_JDC_previousAcademicInfoCollegeTotalCredit = "";
    this.JSC_JDC_previousAcademicInfoCollegeCentreCode = "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno = "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.JSC_JDC_previousAcademicInfoCollegeObtainedResult = "";

    this.JSC_JDC_previousAcademicInfoCollegeGroup_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeRollNo_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeBoard_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeRegNo_req = false;
    this.JSC_JDC_previousAcademicInfoCollegePassingYear_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeInstitute_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeGPA_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeExamination_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeSubject_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeDistrict_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeFromSession_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeToSession_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeCentreCode_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_req = false;


    this.JSC_JDC_previousAcademicInfoCollegeGroup_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeBoard_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeRollNo_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeRegNo_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegePassingYear_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeInstitute_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeGPA_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeExamination_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeSubject_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeDistrict_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeFromSession_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeToSession_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeCentreCode_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.JSC_JDC_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_SSC_Dakhil()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "3");

    this.SSC_Dakhil_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.SSC_Dakhil_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.SSC_Dakhil_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.SSC_Dakhil_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;
  }

  set_SSC_Dakhil_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "3");

    this.SSC_Dakhil_previousAcademicInfoCollegeGroup = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeRollNo = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeBoard = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeRegNo = "";
    this.SSC_Dakhil_previousAcademicInfoCollegePassingYear = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeInstitute = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeGPA = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.SSC_Dakhil_previousAcademicInfoCollegeSubject = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeDistrict = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeFromSession = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeToSession = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult = "";

    this.SSC_Dakhil_previousAcademicInfoCollegeGroup_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeBoard_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPA_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamination_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeSubject_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeToSession_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_req = false;


    this.SSC_Dakhil_previousAcademicInfoCollegeGroup_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeBoard_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRollNo_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeRegNo_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegePassingYear_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeInstitute_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPA_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeExamination_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeSubject_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeDistrict_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeFromSession_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeToSession_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeCentreCode_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_HSC_Alim()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "4");

    this.HSC_Alim_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.HSC_Alim_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.HSC_Alim_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.HSC_Alim_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;

  }

  set_HSC_Alim_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "4");

    this.HSC_Alim_previousAcademicInfoCollegeGroup = "";
    this.HSC_Alim_previousAcademicInfoCollegeRollNo = "";
    this.HSC_Alim_previousAcademicInfoCollegeBoard = "";
    this.HSC_Alim_previousAcademicInfoCollegeRegNo = "";
    this.HSC_Alim_previousAcademicInfoCollegePassingYear = "";
    this.HSC_Alim_previousAcademicInfoCollegeInstitute = "";
    this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn = "";
    this.HSC_Alim_previousAcademicInfoCollegeGPA = "";
    this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.HSC_Alim_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.HSC_Alim_previousAcademicInfoCollegeSubject = "";
    this.HSC_Alim_previousAcademicInfoCollegeDistrict = "";
    this.HSC_Alim_previousAcademicInfoCollegeFromSession = "";
    this.HSC_Alim_previousAcademicInfoCollegeToSession = "";
    this.HSC_Alim_previousAcademicInfoCollegeCourseDuration = "";
    this.HSC_Alim_previousAcademicInfoCollegeTotalCredit = "";
    this.HSC_Alim_previousAcademicInfoCollegeCentreCode = "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno = "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.HSC_Alim_previousAcademicInfoCollegeObtainedResult = "";

    this.HSC_Alim_previousAcademicInfoCollegeGroup_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeRollNo_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeBoard_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeRegNo_req = false;
    this.HSC_Alim_previousAcademicInfoCollegePassingYear_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeInstitute_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeGPA_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeExamination_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeSubject_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeDistrict_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeFromSession_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeToSession_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeCentreCode_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_req = false;


    this.HSC_Alim_previousAcademicInfoCollegeGroup_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeBoard_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeRollNo_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeRegNo_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegePassingYear_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeInstitute_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeGPA_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeExamination_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeSubject_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeDistrict_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeFromSession_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeToSession_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeCentreCode_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.HSC_Alim_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_Hons_Fazil()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "5");

    this.Hons_Fazil_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.Hons_Fazil_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.Hons_Fazil_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.Hons_Fazil_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;


  }

  set_Hons_Fazil_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "5");

    this.Hons_Fazil_previousAcademicInfoCollegeGroup = "";
    this.Hons_Fazil_previousAcademicInfoCollegeRollNo = "";
    this.Hons_Fazil_previousAcademicInfoCollegeBoard = "";
    this.Hons_Fazil_previousAcademicInfoCollegeRegNo = "";
    this.Hons_Fazil_previousAcademicInfoCollegePassingYear = "";
    this.Hons_Fazil_previousAcademicInfoCollegeInstitute = "";
    this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn = "";
    this.Hons_Fazil_previousAcademicInfoCollegeGPA = "";
    this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.Hons_Fazil_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.Hons_Fazil_previousAcademicInfoCollegeSubject = "";
    this.Hons_Fazil_previousAcademicInfoCollegeDistrict = "";
    this.Hons_Fazil_previousAcademicInfoCollegeFromSession = "";
    this.Hons_Fazil_previousAcademicInfoCollegeToSession = "";
    this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration = "";
    this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit = "";
    this.Hons_Fazil_previousAcademicInfoCollegeCentreCode = "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno = "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult = "";

    this.Hons_Fazil_previousAcademicInfoCollegeGroup_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeRollNo_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeBoard_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeRegNo_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegePassingYear_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeInstitute_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPA_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamination_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeSubject_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeDistrict_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeFromSession_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeToSession_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_req = false;


    this.Hons_Fazil_previousAcademicInfoCollegeGroup_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeBoard_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeRollNo_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeRegNo_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegePassingYear_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeInstitute_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPA_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeExamination_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeSubject_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeDistrict_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeFromSession_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeToSession_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeCentreCode_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.Hons_Fazil_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_Masters_Kamil()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "6");

    this.Masters_Kamil_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.Masters_Kamil_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.Masters_Kamil_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.Masters_Kamil_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;
  }

  set_Masters_Kamil_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "6");

    this.Masters_Kamil_previousAcademicInfoCollegeGroup = "";
    this.Masters_Kamil_previousAcademicInfoCollegeRollNo = "";
    this.Masters_Kamil_previousAcademicInfoCollegeBoard = "";
    this.Masters_Kamil_previousAcademicInfoCollegeRegNo = "";
    this.Masters_Kamil_previousAcademicInfoCollegePassingYear = "";
    this.Masters_Kamil_previousAcademicInfoCollegeInstitute = "";
    this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn = "";
    this.Masters_Kamil_previousAcademicInfoCollegeGPA = "";
    this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.Masters_Kamil_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.Masters_Kamil_previousAcademicInfoCollegeSubject = "";
    this.Masters_Kamil_previousAcademicInfoCollegeDistrict = "";
    this.Masters_Kamil_previousAcademicInfoCollegeFromSession = "";
    this.Masters_Kamil_previousAcademicInfoCollegeToSession = "";
    this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration = "";
    this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit = "";
    this.Masters_Kamil_previousAcademicInfoCollegeCentreCode = "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno = "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult = "";

    this.Masters_Kamil_previousAcademicInfoCollegeGroup_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeRollNo_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeBoard_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeRegNo_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegePassingYear_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeInstitute_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPA_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamination_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeSubject_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeDistrict_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeFromSession_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeToSession_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_req = false;


    this.Masters_Kamil_previousAcademicInfoCollegeGroup_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeBoard_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeRollNo_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeRegNo_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegePassingYear_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeInstitute_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPA_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeExamination_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeSubject_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeDistrict_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeFromSession_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeToSession_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeCentreCode_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.Masters_Kamil_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_BBA()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "7");

    this.BBA_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.BBA_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.BBA_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.BBA_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.BBA_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.BBA_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.BBA_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.BBA_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.BBA_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.BBA_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.BBA_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.BBA_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.BBA_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.BBA_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.BBA_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.BBA_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.BBA_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.BBA_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.BBA_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.BBA_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.BBA_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.BBA_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.BBA_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.BBA_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.BBA_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.BBA_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.BBA_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.BBA_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.BBA_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.BBA_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.BBA_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.BBA_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.BBA_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.BBA_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.BBA_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.BBA_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.BBA_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.BBA_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.BBA_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.BBA_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;
  }

  set_BBA_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "7");

    this.BBA_previousAcademicInfoCollegeGroup = "";
    this.BBA_previousAcademicInfoCollegeRollNo = "";
    this.BBA_previousAcademicInfoCollegeBoard = "";
    this.BBA_previousAcademicInfoCollegeRegNo = "";
    this.BBA_previousAcademicInfoCollegePassingYear = "";
    this.BBA_previousAcademicInfoCollegeInstitute = "";
    this.BBA_previousAcademicInfoCollegeExamHeldIn = "";
    this.BBA_previousAcademicInfoCollegeGPA = "";
    this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.BBA_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.BBA_previousAcademicInfoCollegeSubject = "";
    this.BBA_previousAcademicInfoCollegeDistrict = "";
    this.BBA_previousAcademicInfoCollegeFromSession = "";
    this.BBA_previousAcademicInfoCollegeToSession = "";
    this.BBA_previousAcademicInfoCollegeCourseDuration = "";
    this.BBA_previousAcademicInfoCollegeTotalCredit = "";
    this.BBA_previousAcademicInfoCollegeCentreCode = "";
    this.BBA_previousAcademicInfoCollegeObtainedOutofno = "";
    this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.BBA_previousAcademicInfoCollegeObtainedResult = "";

    this.BBA_previousAcademicInfoCollegeGroup_req = false;
    this.BBA_previousAcademicInfoCollegeRollNo_req = false;
    this.BBA_previousAcademicInfoCollegeBoard_req = false;
    this.BBA_previousAcademicInfoCollegeRegNo_req = false;
    this.BBA_previousAcademicInfoCollegePassingYear_req = false;
    this.BBA_previousAcademicInfoCollegeInstitute_req = false;
    this.BBA_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.BBA_previousAcademicInfoCollegeGPA_req = false;
    this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.BBA_previousAcademicInfoCollegeExamination_req = false;
    this.BBA_previousAcademicInfoCollegeSubject_req = false;
    this.BBA_previousAcademicInfoCollegeDistrict_req = false;
    this.BBA_previousAcademicInfoCollegeFromSession_req = false;
    this.BBA_previousAcademicInfoCollegeToSession_req = false;
    this.BBA_previousAcademicInfoCollegeCourseDuration_req = false;
    this.BBA_previousAcademicInfoCollegeTotalCredit_req = false;
    this.BBA_previousAcademicInfoCollegeCentreCode_req = false;
    this.BBA_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.BBA_previousAcademicInfoCollegeObtainedResult_req = false;


    this.BBA_previousAcademicInfoCollegeGroup_vis = false;
    this.BBA_previousAcademicInfoCollegeBoard_vis = false;
    this.BBA_previousAcademicInfoCollegeRollNo_vis = false;
    this.BBA_previousAcademicInfoCollegeRegNo_vis = false;
    this.BBA_previousAcademicInfoCollegePassingYear_vis = false;
    this.BBA_previousAcademicInfoCollegeInstitute_vis = false;
    this.BBA_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.BBA_previousAcademicInfoCollegeGPA_vis = false;
    this.BBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.BBA_previousAcademicInfoCollegeExamination_vis = false;
    this.BBA_previousAcademicInfoCollegeSubject_vis = false;
    this.BBA_previousAcademicInfoCollegeDistrict_vis = false;
    this.BBA_previousAcademicInfoCollegeFromSession_vis = false;
    this.BBA_previousAcademicInfoCollegeToSession_vis = false;
    this.BBA_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.BBA_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.BBA_previousAcademicInfoCollegeCentreCode_vis = false;
    this.BBA_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.BBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.BBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.BBA_previousAcademicInfoCollegeObtainedResult_vis = false;
  }

  set_MBA()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "8");

    this.MBA_previousAcademicInfoCollegeGroup = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeRollNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeBoard = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeRegNo = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.KeyValue : "";
    this.MBA_previousAcademicInfoCollegePassingYear = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeInstitute = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeExamHeldIn = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeGPA = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeExamination = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue != null ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue : filteredItem.length != 0 ? filteredItem[0].Value : this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.KeyValue;

    this.MBA_previousAcademicInfoCollegeSubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeDistrict = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeFromSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeToSession = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeCourseDuration = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeTotalCredit = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeCentreCode = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeObtainedOutofno = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.KeyValue : "";
    this.MBA_previousAcademicInfoCollegeObtainedResult = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.KeyValue : "";

    this.MBA_previousAcademicInfoCollegeGroup_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Required : false;
    this.MBA_previousAcademicInfoCollegeRollNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Required : false;
    this.MBA_previousAcademicInfoCollegeBoard_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Required : false;
    this.MBA_previousAcademicInfoCollegeRegNo_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Required : false;
    this.MBA_previousAcademicInfoCollegePassingYear_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Required : false;
    this.MBA_previousAcademicInfoCollegeInstitute_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Required : false;
    this.MBA_previousAcademicInfoCollegeExamHeldIn_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Required : false;
    this.MBA_previousAcademicInfoCollegeGPA_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Required : false;
    this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Required : false;
    this.MBA_previousAcademicInfoCollegeExamination_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Required : false;
    this.MBA_previousAcademicInfoCollegeSubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Required : false;
    this.MBA_previousAcademicInfoCollegeDistrict_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Required : false;
    this.MBA_previousAcademicInfoCollegeFromSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Required : false;
    this.MBA_previousAcademicInfoCollegeToSession_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Required : false;
    this.MBA_previousAcademicInfoCollegeCourseDuration_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Required : false;
    this.MBA_previousAcademicInfoCollegeTotalCredit_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Required : false;
    this.MBA_previousAcademicInfoCollegeCentreCode_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Required : false;
    this.MBA_previousAcademicInfoCollegeObtainedOutofno_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Required : false;
    this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Required : false;
    this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Required : false;
    this.MBA_previousAcademicInfoCollegeObtainedResult_req = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Required : false;


    this.MBA_previousAcademicInfoCollegeGroup_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGroup.Visible : false;
    this.MBA_previousAcademicInfoCollegeRollNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRollNo.Visible : false;
    this.MBA_previousAcademicInfoCollegeBoard_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeBoard.Visible : false;
    this.MBA_previousAcademicInfoCollegeRegNo_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeRegNo.Visible : false;
    this.MBA_previousAcademicInfoCollegePassingYear_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegePassingYear.Visible : false;
    this.MBA_previousAcademicInfoCollegeInstitute_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeInstitute.Visible : false;
    this.MBA_previousAcademicInfoCollegeExamHeldIn_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamHeldIn.Visible : false;
    this.MBA_previousAcademicInfoCollegeGPA_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPA.Visible : false;
    this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeGPAwithout4thsubject.Visible : false;
    this.MBA_previousAcademicInfoCollegeExamination_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeExamination.Visible : false;
    this.MBA_previousAcademicInfoCollegeSubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeSubject.Visible : false;
    this.MBA_previousAcademicInfoCollegeDistrict_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeDistrict.Visible : false;
    this.MBA_previousAcademicInfoCollegeFromSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeFromSession.Visible : false;
    this.MBA_previousAcademicInfoCollegeToSession_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeToSession.Visible : false;
    this.MBA_previousAcademicInfoCollegeCourseDuration_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCourseDuration.Visible : false;
    this.MBA_previousAcademicInfoCollegeTotalCredit_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeTotalCredit.Visible : false;
    this.MBA_previousAcademicInfoCollegeCentreCode_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeCentreCode.Visible : false;
    this.MBA_previousAcademicInfoCollegeObtainedOutofno_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedOutofno.Visible : false;
    this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWithout4thsubject.Visible : false;
    this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedWith4thsubject.Visible : false;
    this.MBA_previousAcademicInfoCollegeObtainedResult_vis = this.previousAcademicInfoCollege ? this.previousAcademicInfoCollege.previousAcademicInfoCollegeObtainedResult.Visible : false;
  }

  set_MBA_blank()
  {
    let filteredItem = this.MainDropdownData.Exams.filter(item => item.ThirdValue === "8");

    this.MBA_previousAcademicInfoCollegeGroup = "";
    this.MBA_previousAcademicInfoCollegeRollNo = "";
    this.MBA_previousAcademicInfoCollegeBoard = "";
    this.MBA_previousAcademicInfoCollegeRegNo = "";
    this.MBA_previousAcademicInfoCollegePassingYear = "";
    this.MBA_previousAcademicInfoCollegeInstitute = "";
    this.MBA_previousAcademicInfoCollegeExamHeldIn = "";
    this.MBA_previousAcademicInfoCollegeGPA = "";
    this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject = "";
    this.MBA_previousAcademicInfoCollegeExamination = filteredItem.length != 0 ? filteredItem[0].Value : "";
    this.MBA_previousAcademicInfoCollegeSubject = "";
    this.MBA_previousAcademicInfoCollegeDistrict = "";
    this.MBA_previousAcademicInfoCollegeFromSession = "";
    this.MBA_previousAcademicInfoCollegeToSession = "";
    this.MBA_previousAcademicInfoCollegeCourseDuration = "";
    this.MBA_previousAcademicInfoCollegeTotalCredit = "";
    this.MBA_previousAcademicInfoCollegeCentreCode = "";
    this.MBA_previousAcademicInfoCollegeObtainedOutofno = "";
    this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject = "";
    this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject = "";
    this.MBA_previousAcademicInfoCollegeObtainedResult = "";

    this.MBA_previousAcademicInfoCollegeGroup_req = false;
    this.MBA_previousAcademicInfoCollegeRollNo_req = false;
    this.MBA_previousAcademicInfoCollegeBoard_req = false;
    this.MBA_previousAcademicInfoCollegeRegNo_req = false;
    this.MBA_previousAcademicInfoCollegePassingYear_req = false;
    this.MBA_previousAcademicInfoCollegeInstitute_req = false;
    this.MBA_previousAcademicInfoCollegeExamHeldIn_req = false;
    this.MBA_previousAcademicInfoCollegeGPA_req = false;
    this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_req = false;
    this.MBA_previousAcademicInfoCollegeExamination_req = false;
    this.MBA_previousAcademicInfoCollegeSubject_req = false;
    this.MBA_previousAcademicInfoCollegeDistrict_req = false;
    this.MBA_previousAcademicInfoCollegeFromSession_req = false;
    this.MBA_previousAcademicInfoCollegeToSession_req = false;
    this.MBA_previousAcademicInfoCollegeCourseDuration_req = false;
    this.MBA_previousAcademicInfoCollegeTotalCredit_req = false;
    this.MBA_previousAcademicInfoCollegeCentreCode_req = false;
    this.MBA_previousAcademicInfoCollegeObtainedOutofno_req = false;
    this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_req = false;
    this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_req = false;
    this.MBA_previousAcademicInfoCollegeObtainedResult_req = false;


    this.MBA_previousAcademicInfoCollegeGroup_vis = false;
    this.MBA_previousAcademicInfoCollegeBoard_vis = false;
    this.MBA_previousAcademicInfoCollegeRollNo_vis = false;
    this.MBA_previousAcademicInfoCollegeRegNo_vis = false;
    this.MBA_previousAcademicInfoCollegePassingYear_vis = false;
    this.MBA_previousAcademicInfoCollegeInstitute_vis = false;
    this.MBA_previousAcademicInfoCollegeExamHeldIn_vis = false;
    this.MBA_previousAcademicInfoCollegeGPA_vis = false;
    this.MBA_previousAcademicInfoCollegeGPAwithout4thsubject_vis = false;
    this.MBA_previousAcademicInfoCollegeExamination_vis = false;
    this.MBA_previousAcademicInfoCollegeSubject_vis = false;
    this.MBA_previousAcademicInfoCollegeDistrict_vis = false;
    this.MBA_previousAcademicInfoCollegeFromSession_vis = false;
    this.MBA_previousAcademicInfoCollegeToSession_vis = false;
    this.MBA_previousAcademicInfoCollegeCourseDuration_vis = false;
    this.MBA_previousAcademicInfoCollegeTotalCredit_vis = false;
    this.MBA_previousAcademicInfoCollegeCentreCode_vis = false;
    this.MBA_previousAcademicInfoCollegeObtainedOutofno_vis = false;
    this.MBA_previousAcademicInfoCollegeObtainedWithout4thsubject_vis = false;
    this.MBA_previousAcademicInfoCollegeObtainedWith4thsubject_vis = false;
    this.MBA_previousAcademicInfoCollegeObtainedResult_vis = false;
  }


  transtatusRender(value)
  {
    let result = '';
    switch (value)
    {
      case 0:
        result = 'Processing';
        break;

      case 1:
        result = 'Pending';
        break;

      case 2:
        result = 'Success';
        break;

      case 3:
        result = 'Cancelled';
        break;

      case 4:
        result = 'Failed';
        break;

      case 5:
        result = 'Error';
        break;

      case 6:
        result = 'System Cancelled';
        break;

      case 7:
        result = 'Operator Cancelled';
        break;

      case 8:
        result = 'Cancelled By Customer Request';
        break;

      default:
        result = 'Could not be found';
        break;
    }
    return result;
  }

  formatDate(dateString: string | undefined): string | undefined
  {
    if (dateString)
    {
      const date = new Date(dateString);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return undefined;
  }

}


let club_data = [
  {
    "value": "Music",
    "name": "Music",
    "selected": false
  },
  {
    "value": "Dance",
    "name": "Dance",
    "selected": false
  },
  {
    "value": "BNCC",
    "name": "BNCC",
    "selected": false
  },
  {
    "value": "Scout",
    "name": "Scout",
    "selected": false
  },
  {
    "value": "RedCrescent",
    "name": "Red Crescent",
    "selected": false
  },
  {
    "value": "RedCrescent2",
    "name": "Red Crescent2",
    "selected": false
  },
  {
    "value": "RedCrescent3",
    "name": "Red Crescent3",
    "selected": false
  },
  {
    "value": "RedCrescent4",
    "name": "Red Crescent4",
    "selected": false
  },
  {
    "value": "RedCrescent4",
    "name": "Red Crescent4",
    "selected": false
  },
  {
    "value": "RedCrescent4",
    "name": "Red Crescent4",
    "selected": false
  },
  {
    "value": "RedCrescent4",
    "name": "Red Crescent4",
    "selected": false
  },
  {
    "value": "RedCrescent4",
    "name": "Red Crescent4",
    "selected": false
  },
  {
    "value": "RedCrescent4",
    "name": "Red Crescent4",
    "selected": false
  },
]



