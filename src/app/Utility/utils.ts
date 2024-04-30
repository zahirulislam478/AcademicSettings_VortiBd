/** @format */

import { Observable, of } from "rxjs";
import
{
  BaseControl,
  LabelControl,
  TextboxControl,
  ButtonGroupControl,
  SlideToggleControl,
  DropdownControl,
  DateSelectorControl,
  LabelGroupControl,
  TextAreaControl,
  TextboxGroupControl,
  ButtonControl,
  CheckboxControl,
  RadioGroupControl,
  CheckboxGroupControl,
} from "app/models/dynamic-form";
import { RadioButtonControl } from "app/models/dynamic-form/radioButton-control";
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export default class Utils
{
  static getControls(json: any): Observable<BaseControl<string>[]>
  {
    const items: BaseControl<string>[] = Utils.toControls(json);
    return of(items.sort((a, b) => a.order - b.order));
  }

  static getUserId()
  {
    let userid = "";
    if (localStorage.getItem("TokenInfo") != null)
    {
      userid = localStorage.getItem("TokenInfo");
    }
    return userid;
  }

  // static getUserInfo(): AppUser
  // {
  //     let storage = JSON.parse(localStorage.getItem('userInfo'));
  //     let user = Object.assign(new AppUser(), storage);
  //     return user;
  // }

  static getArchiveStatus()
  {
    let archiveStat = JSON.parse(localStorage.getItem("archiveReadiness"));
    return archiveStat;
  }

  // static getAssesseeId(): Assessee
  // {
  //     let storage = JSON.parse(localStorage.getItem('AssesseeId'));
  //     let assessee = Object.assign(new Assessee(), storage);
  //     return assessee;
  // }

  static validateEmail(email: any)
  {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  static isEmptyObject(obj: {})
  {
    return obj && Object.keys(obj).length === 0;
  }

  static getInstituteName(value: string): any
  {
    return value.split("~")[1];
  }

  static getCircularInstituteData(value: string): any
  {
    return value.split("~")[1];
  }

  static removeShortName(value: string): any
  {
    return value.replace(/\~.*/, "");
  }

  static toControls(json: any): BaseControl<string>[]
  {
    const items: BaseControl<string>[] = [];
    for (const key in json)
    {
      if (json.hasOwnProperty(key))
      {
        items.push(Utils.toControl(json[key]));
      }
    }
    // json.forEach(element =>
    // {
    //     for (const key in element)
    //     {
    //         if (element.hasOwnProperty(key))
    //         {
    //             items.push(Utils.toControl(element[key]));
    //         }
    //     }
    // });
    return items.sort((a, b) => a.order - b.order);
  }

  static toControl(obj: any): BaseControl<string>
  {
    let item: BaseControl<string> = new BaseControl();

    if (obj.control === "LabelControl")
    {
      item = LabelControl.getFromJsonObj(obj);
    }
    if (obj.control === "ButtonControl")
    {
      item = ButtonControl.getFromJsonObj(obj);
    }
    if (obj.control === "LabelGroupControl")
    {
      item = LabelGroupControl.getFromJsonObj(obj);
    }
    if (obj.control === "TextboxControl")
    {
      item = TextboxControl.getFromJsonObj(obj);
    }
    if (obj.control === "CheckboxControl")
    {
      item = CheckboxControl.getFromJsonObj(obj);
    }
    if (obj.control === "TextboxGroupControl")
    {
      item = TextboxGroupControl.getFromJsonObj(obj);
    }
    if (obj.control === "CheckboxGroupControl")
    {
      item = CheckboxGroupControl.getFromJsonObj(obj);
    }
    if (obj.control === "ButtonGroupControl")
    {
      item = ButtonGroupControl.getFromJsonObj(obj);
    }
    if (obj.control === "TextAreaControl")
    {
      item = TextAreaControl.getFromJsonObj(obj);
    }
    if (obj.control === "DateSelectorControl")
    {
      item = DateSelectorControl.getFromJsonObj(obj);
    }
    if (obj.control === "SlideToggleControl")
    {
      item = SlideToggleControl.getFromJsonObj(obj);
    }
    if (obj.control === "RadioGroupControl")
    {
      item = RadioGroupControl.getFromJsonObj(obj);
    }
    if (obj.control === "DropdownControl")
    {
      item = DropdownControl.getFromJsonObj(obj);
    }
    if (obj.control === "RadioButtonControl")
    {
      item = RadioButtonControl.getFromJsonObj(obj);
    }
    return item;
  }

  static emailPatternValidator(): ValidatorFn
  {
    return (control: AbstractControl): { [key: string]: any } =>
    {
      if (!control.value)
      {
        return null;
      }
      const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  static passwordPatternValidator(): ValidatorFn
  {
    return (control: AbstractControl): { [key: string]: any } =>
    {
      if (!control.value)
      {
        return null;
      }
      const regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  static MatchPassword(password: string, passwordConfirm: string)
  {
    return (formGroup: FormGroup) =>
    {
      const passwordControl = formGroup.controls[password];
      const passwordConfirmControl = formGroup.controls[passwordConfirm];

      if (!passwordControl || !passwordConfirmControl)
      {
        return null;
      }

      if (
        passwordConfirmControl.errors &&
        !passwordConfirmControl.errors.passwordMismatch
      )
      {
        return null;
      }

      if (passwordControl.value !== passwordConfirmControl.value)
      {
        passwordConfirmControl.setErrors({ passwordMismatch: true });
      } else
      {
        passwordConfirmControl.setErrors(null);
      }
    };
  }

  static altObj(obj): bodyInterface
  {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) =>
        // Modify key here
        [this.transformObjKey(key), value]
      )
    );
  }

  static transformObjKey(objKey: string)
  {
    let headName = "";
    switch (objKey)
    {
      case "studentFullName":
        headName = "studentName";
        break;
      case "studentFullNameEng":
        headName = "studentName";
        break;
      case "studentFullNameBng":
        headName = "studentNameBangla";
        break;
      case "studentContactNo":
        headName = "contactNoS";
        break;
      case "studentBloodGroup":
        headName = "bloodGroup";
        break;
      case "studentFirstName":
        headName = "firstName";
        break;
      case "studentMiddleName":
        headName = "middleName";
        break;
      case "studentLastName":
        headName = "lastName";
        break;
      case "studentNickName":
        headName = "nickName";
        break;
      case "studentHobby":
        headName = "hobby";
        break;
      case "studentInterestedClub":
        headName = "interestedClub";
        break;

      case "studentNationality":
        headName = "nationalID";
        break;
      case "studentHomeDistrict":
        headName = "homeDisID";
        break;
      case "studentDateOfbirth":
        headName = "birthDate";
        break;
      case "studentBirthRegistrationNo":
        headName = "birthID";
        break;
      case "studentReligion":
        headName = "religionID"
        break;
      case "studentEmargencyContactNo":
        headName = "contactNo";
        break;
      case "studentGender":
        headName = "studentSex";
        break;
      case "studentEmail":
        headName = "emailAddress";
        break;
      case "studentHeight":
        headName = "studentHeight";
        break;
      case "studentWeight":
        headName = "studentWeight";
        break;
      case "studentOwnHouse":
        headName = "ownHouse";
        break;
      case "studentHouseIncome":
        headName = "houseIncome";
        break;
      case "studentHouseExpense":
        headName = "houseExpense";
        break;
      case "studentFreedomFighterQuota":
        headName = "freedomFighter";
        break;
      case "studentIsAutism":
        headName = "isAutism";
        break;
      case "studentPhoto":
        headName = "PhotoPathS";
        break;

      // case "studentPhoto":
      //   headName = "PhotoSName";
      //   break;
      // case "studentBase64File":
      //   headName = "PhotoSBase64";
      //   break;

      case "studentSignature":
        headName = "StudentSign";
        break;
      case "studentFathersName":
        headName = "fatherName";
        break;
      case "studentFathersNameEng":
        headName = "fatherName";
        break;
      case "studentFathersNameBng":
        headName = "fatherNameBangla";
        break;
      case "studentFathersContactNumber":
        headName = "contactNoF";
        break;
      case "studentFathersEmail":
        headName = "emailF";
        break;
      case "studentFathersEducation":
        headName = "fatherEducation";
        break;
      case "studentFathersTIN":
        headName = "fatherTIN";
        break;
      case "studentFathersNationalID":
        headName = "nationalIDF";
        break;
      case "studentFathersOccupation":
        headName = "fatherOcpID";
        break;
      case "studentFathersOfficeName":
        headName = "fatherOfficeName";
        break;
      case "studentFathersDesignation":
        headName = "fatherOfficeDesig";
        break;
      case "studentFathersOfficeAddress":
        headName = "fatherOfficeAddr";
        break;
      case "studentFathersOfficePhoneNo":
        headName = "fatherOfficePhone";
        break;
      case "studentFathersAnnualIncome":
        headName = "annualIncomeF";
        break;
      case "studentFathersPhoto":
        headName = "PhotoPathF";
        break;
      case "studentFathersSignature":
        headName = "FatherSign";
        break;
      case "studentMothersName":
        headName = "motherName";
        break;
      case "studentMothersNameEng":
        headName = "motherName";
        break;
      case "studentMothersNameBng":
        headName = "motherNameBangla";
        break;
      case "studentMothersContactNumber":
        headName = "contactNoM";
        break;
      case "studentMothersEmail":
        headName = "emailM";
        break;
      case "studentMothersEducation":
        headName = "motherEducation";
        break;
      case "studentMothersTIN":
        headName = "motherTIN";
        break;
      case "studentMothersNationalID":
        headName = "nationalIDM";
        break;
      case "studentMothersOccupation":
        headName = "motherOcpID";
        break;
      case "studentMothersOfficeName":
        headName = "motherOfficeName";
        break;
      case "studentMothersDesignation":
        headName = "motherOfficeDesig";
        break;
      case "studentMothersOfficeAddress":
        headName = "motherOfficeAddr";
        break;
      case "studentMothersOfficePhoneNo":
        headName = "motherOfficePhone";
        break;
      case "studentMothersAnnualIncome":
        headName = "annualIncomeF"; //same as father
        break;
      case "studentMothersPhoto":
        headName = "PhotoPathM";
        break;
      case "studentMothersSignature":
        headName = "MotherSign";
        break;
      case "studentLocalGuardiansRelation":
        headName = "guardianR";
        break;
      case "studentLocalGuardiansName":
        headName = "guardianName";
        break;
      case "studentLocalGuardiansNameEng":
        headName = "guardianName";
        break;
      case "studentLocalGuardiansNameBng":
        headName = "gurdianNameBangla";
        break;
      case "studentLocalGuardiansContactNumber":
        headName = "contactNoG";
        break;
      case "studentLocalGuardiansContactNo":
        headName = "contactNoG";
        break;
      case "studentLocalGuardiansEmail":
        headName = "emailG";
        break;
      case "studentLocalGuardiansEducation":
        headName = "guardianEducation";
        break;
      case "studentLocalGuardiansTIN":
        headName = "guardTIN";
        break;
      case "studentLocalGuardiansNationalID":
        headName = "nationalIDG";
        break;
      case "studentLocalGuardiansOccupation":
        headName = "guardianOcpID"
        break;
      case "studentLocalGuardiansOfficeName":
        headName = "guardOfficeName";
        break;
      case "studentLocalGuardiansDesignation":
        headName = "guardOfficeDesig";
        break;
      case "studentLocalGuardiansOfficeAddress":
        headName = "guardOfficeAddr";
        break;
      case "studentLocalGuardiansOfficePhoneNo":
        headName = "guardOfficePhone";
        break;
      case "studentLocalGuardiansAnnualIncome":
        headName = "annualIncomeG";
        break;
      case "studentLocalGuardiansPhoto":
        headName = "PhotoPathG";
        break;
      case "studentLocalGuardiansSignature":
        headName = "GuardinSign";
        break;
      case "studentDefencePerson":
        headName = "DefencePerson";
        break;
      //case "studentDefenceJobLocationOrCantonmentName":
      // headName = "FatherName";
      // break;
      //case studentDefenceRegimentNo":
      // headName = "FatherName";
      // break;
      case "studentDefenceRank":
        headName = "FatherRankID";
        break;
      case "studentDefenceStationNameOrBattalion":
        headName = "stationName";
        break;
      case "studentDefenceServiceStatus":
        headName = "isRetired";
        break;
      case "studentDefenceRetirement":
        headName = "retireDate";
        break;
      case "studentDefenceNoofChild":
        headName = "childNo";
        break;
      case "studentDefenceMissionStart":
        headName = "missionStartDate";
        break;
      case "studentDefenceMissionEnd":
        headName = "missionEndDate";
        break;
      case "studentDefenceMissionPlace":
        headName = "placeOfMission";
        break;
      case "studentDefenceUnitName":
        headName = "unitName";
        break;
      case "studentDefenceBANumber":
        headName = "baBssSnkIdNo";
        break;
      //case "studentDefenceCourse":
      // headName = "FatherName";
      // break;
      //case "studentDefenceCOorOCsName":
      // headName = "FatherName";
      // break;
      //case "studentDefenceCOorOCsContact":
      // headName = "FatherName";
      // break;
      //case "studentDefenceService":
      // headName =  "FatherName";
      // break;
      case "presentAreaAddress":
        headName = "areaSRA";
        break;
      case "presentPostCode":
        headName = "postCodeSRA";
        break;
      case "presentDistrict":
        headName = "districtIDSRA";
        break;
      case "presentDivision":
        headName = "divisionIDSRA";
        break;
      case "presentPostOffice":
        headName = "postOfficeIDSRA";
        break;
      case "presentVillage":
        headName = "villageSRA";
        break;
      case "presentPoliceStation":
        headName = "policeStationIDSRA";
      case "presentHouse":
        headName = "houseSRA";
        break;
      case "presentSection":
        headName = "sectionSRA";
        break;
      case "presentPlot":
        headName = "plotSRA";
      case "presentSector":
        headName = "sectorSRA";
        break;
      case "presentUpazila":
        headName = "upazilaIDSRA";
        break;
      case "presentRoad":
        headName = "roadSRA";
        break;
      case "presentUnion":
        headName = "unionIDSRA";
        break;
      case "presentBlock":
        headName = "blockSRA";
        break;
      case "presentWardNo":
        headName = "wardNoSRA";
        break;
      case "presentPaurashava":
        headName = "paurashavaIDSRA";
        break;
      case "presentAddressEng":
        headName = "addressSRA";
        break;
      case "presentAddressBng":
        headName = "AddressSRABangla";
        break;
      // case "localGuardianSameAs": 
      // headName = "areaLGA";
      // break;   
      case "localGuardianAreaAddress":
        headName = "areaLGA";
        break;
      case "localGuardianPostCode":
        headName = "postCodeLGA";
        break;
      case "localGuardianDistrict":
        headName = "districtIDLGA";
        break;
      case "localGuardianDivision":
        headName = "divisionIDLGA";
        break;
      case "localGuardianPostOffice":
        headName = "postOfficeIDLGA";
        break;
      case "localGuardianVillage":
        headName = "villageLGA";
        break;
      case "localGuardianPoliceStation":
        headName = "policeStationIDLGA";
        break;
      case "localGuardianHouse":
        headName = "houseLGA";
        break;
      case "localGuardianSection":
        headName = "sectionLGA";
        break;
      case "localGuardianPlot":
        headName = "plotLGA";
        break;
      case "localGuardianSector":
        headName = "sectorLGA";
        break;
      case "localGuardianUpazila":
        headName = "upazilaIDLGA";
        break;
      case "localGuardianRoad":
        headName = "roadLGA";
        break;
      case "localGuardianUnion":
        headName = "unionIDLGA";
        break;
      case "localGuardianBlock":
        headName = "blockLGA";
        break;
      case "localGuardianWardNo":
        headName = "wardNoLGA";
        break;
      case "localGuardianPaurashava":
        headName = "paurashavaIDLGA";
        break;
      case "localGuardianAddressEng":
        headName = "addressLGA";
        break;
      //case "localGuardianAddressBng":
      // headName = "AddressLGABangla";
      // break;
      //case "permanentSameAs":
      // headName = "areaLGA";
      // break;
      case "permanentAreaAddress":
        headName = "areaPA";
        break;
      case "permanentPostCode":
        headName = "postCodePA";
        break;
      case "permanentDistrict":
        headName = "districtIDPA";
        break;
      case "permanentDivision":
        headName = "divisionIDPA";
        break;
      case "permanentPostOffice":
        headName = "postOfficeIDPA";
        break;
      case "permanentVillage":
        headName = "villagePA";
        break;
      case "permanentPoliceStation":
        headName = "policeStationIDPA";
        break;
      case "permanentHouse":
        headName = "housePA";
        break;
      case "permanentSection":
        headName = "sectionPA";
        break;
      case "permanentPlot":
        headName = "plotPA";
        break;
      case "permanentSector":
        headName = "sectorPA";
        break;
      case "permanentUpazila":
        headName = "upazilaIDPA";
        break;
      case "permanentRoad":
        headName = "roadPA";
        break;
      case "permanentUnion":
        headName = "unionIDPA";
        break;
      case "permanentBlock":
        headName = "blockPA";
        break;
      case "permanentWardNo":
        headName = "wardNoPA";
        break;
      case "permanentPaurashava":
        headName = "paurashavaIDPA";
        break;
      case "permanentAddressEng":
        headName = "addressPA";
        break;
      case "permanentAddressBng":
        headName = "AddressPABangla";
        break;
      case "previousAcademicInfoSchoolLastSchoolName":
        headName = "lastInstitute";
        break;
      case "previousAcademicInfoSchoolLastExamName":
        headName = "lastExam";
        break;
      case "previousAcademicInfoSchoolLastResult":
        headName = "lastExamResult";
        break;
      case "previousAcademicInfoSchoolSection":
        headName = "lastSection";
        break;
      case "previousAcademicInfoSchoolRoll":
        headName = "lastRoll";
        break;
      case "previousAcademicInfoSchoolInstituteAddress":
        headName = "lastSchoolAdd";
        break;
      case "previousAcademicInfoSchoolTCInfo":
        headName = "tcInfo";
        break;
      case "previousAcademicInfoSchoolTCNo":
        headName = "lastTcNo";
        break;
      case "previousAcademicInfoSchoolTCDate":
        headName = "lastTcDate";
        break;






      case "previousAcademicInfoCollegeBoard":
        headName = "boardID";
        break;
      case "previousAcademicInfoCollegeCentreCode":
        headName = "centreCode";
        break;
      case "previousAcademicInfoCollegeCourseDuration":
        headName = "duration";
        break;
      case "previousAcademicInfoCollegeDistrict":
        headName = "areaID";
        break;
      case "previousAcademicInfoCollegeExamHeldIn":
        headName = "examHeld";
        break;
      case "previousAcademicInfoCollegeExamination":
        headName = "examID";
        break;
      case "previousAcademicInfoCollegeFromSession":
        headName = "session1";
        break;
      case "previousAcademicInfoCollegeGPA":
        headName = "with4th";
        break;
      case "previousAcademicInfoCollegeGPAwithout4thsubject":
        headName = "without4th";
        break;
      case "previousAcademicInfoCollegeGroup":
        headName = "preEduGroupID";
        break;
      case "previousAcademicInfoCollegeInstitute":
        headName = "educationIns";
        break;
      //case "previousAcademicInfoCollegeObtainedOutofno":
      // headName = "CentreCode";
      // break;
      case "previousAcademicInfoCollegeObtainedResult":
        headName = "result";
        break;
      //case "previousAcademicInfoCollegeObtainedWith4thsubject":
      // headName = "CentreCode";
      // break;
      //case "previousAcademicInfoCollegeObtainedWithout4thsubject":
      // headName = "CentreCode";
      // break;
      case "previousAcademicInfoCollegePassingYear":
        headName = "passYear";
        break;
      case "previousAcademicInfoCollegeRegNo":
        headName = "rgdNo";
        break;
      case "previousAcademicInfoCollegeRollNo":
        headName = "rollNo";
        break;
      case "previousAcademicInfoCollegeSubject":
        headName = "PreEduSubjectID";
        break;
      case "previousAcademicInfoCollegeToSession":
        headName = "session2";
        break;
      case "previousAcademicInfoCollegeTotalCredit":
        headName = "totalCredit";
        break;


      default:
        headName = objKey;
        break;
    }
    return headName;
  }

  static toDataURL(url, callback)
  {
    var xhr = new XMLHttpRequest();
    xhr.onload = function ()
    {
      var reader = new FileReader();
      reader.onloadend = function ()
      {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url, true)
    xhr.responseType = "blob";
    xhr.send();
  }

  static TransfromCompulsorySubjectList(data)
  {
    let options = data.map(option =>
    ({
      "baseCourseID": option.BaseCourseID,
      "baseCourseName": option.BaseCourseName,
      "coursTypeID": option.CoursTypeID,
    }));
    return options;
  }


  static getImage_m(data, name)
  {
    var blob = this.b64toBlob(data, "application/pdf");
    let a = document.createElement("a");
    document.body.appendChild(a);
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = String(`${name}.pdf`);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  static b64toBlob(b64Data, contentType)
  {
    contentType = contentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize)
    {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++)
      {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static findRequiredControls(formGroup: FormGroup): string[]
  {
    const requiredControls: string[] = [];

    for (const controlName in formGroup.controls)
    {
      if (formGroup.controls.hasOwnProperty(controlName))
      {
        const control = formGroup.get(controlName) as FormControl;
        if (control.validator === Validators.required || (Array.isArray(control.validator) && control.validator.includes(Validators.required)))
        {
          requiredControls.push(controlName);
        }
      }
    }

    return requiredControls;
  }

  static PreEduBuild(form: any, codes: any, studentSaveData: any, FormParam: any)
  {
    let finalArray = [];
    debugger;
    let body_PSC = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.PSC_previousAcademicInfoCollegeExamination ? Number(form.PSC_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.PSC_previousAcademicInfoCollegeGroup ? Number(form.PSC_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.PSC_previousAcademicInfoCollegeBoard ? Number(form.PSC_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.PSC_previousAcademicInfoCollegeDistrict ? form.PSC_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.PSC_previousAcademicInfoCollegeCentreCode ? form.PSC_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.PSC_previousAcademicInfoCollegeInstitute ? form.PSC_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.PSC_previousAcademicInfoCollegeGPAwithout4thsubject ? form.PSC_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.PSC_previousAcademicInfoCollegeGPA ? form.PSC_previousAcademicInfoCollegeGPA : "",
      "result": form.PSC_previousAcademicInfoCollegeObtainedResult ? form.PSC_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.PSC_previousAcademicInfoCollegePassingYear ? form.PSC_previousAcademicInfoCollegePassingYear : "",
      "session1": form.PSC_previousAcademicInfoCollegeFromSession ? form.PSC_previousAcademicInfoCollegeFromSession : "",
      "session2": form.PSC_previousAcademicInfoCollegeToSession ? form.PSC_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.PSC_previousAcademicInfoCollegeRegNo ? form.PSC_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.PSC_previousAcademicInfoCollegeRollNo ? form.PSC_previousAcademicInfoCollegeRollNo : "",
      "duration": form.PSC_previousAcademicInfoCollegeCourseDuration ? form.PSC_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.PSC_previousAcademicInfoCollegeTotalCredit ? form.PSC_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.PSC_previousAcademicInfoCollegeExamHeldIn ? form.PSC_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('1'))
    {
      finalArray.push(body_PSC)
    }

    let body_JSC_JDC = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.JSC_JDC_previousAcademicInfoCollegeExamination ? Number(form.JSC_JDC_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.JSC_JDC_previousAcademicInfoCollegeGroup ? Number(form.JSC_JDC_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.JSC_JDC_previousAcademicInfoCollegeBoard ? Number(form.JSC_JDC_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.JSC_JDC_previousAcademicInfoCollegeDistrict ? form.JSC_JDC_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.JSC_JDC_previousAcademicInfoCollegeCentreCode ? form.JSC_JDC_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.JSC_JDC_previousAcademicInfoCollegeInstitute ? form.JSC_JDC_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject ? form.JSC_JDC_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.JSC_JDC_previousAcademicInfoCollegeGPA ? form.JSC_JDC_previousAcademicInfoCollegeGPA : "",
      "result": form.JSC_JDC_previousAcademicInfoCollegeObtainedResult ? form.JSC_JDC_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.JSC_JDC_previousAcademicInfoCollegePassingYear ? form.JSC_JDC_previousAcademicInfoCollegePassingYear : "",
      "session1": form.JSC_JDC_previousAcademicInfoCollegeFromSession ? form.JSC_JDC_previousAcademicInfoCollegeFromSession : "",
      "session2": form.JSC_JDC_previousAcademicInfoCollegeToSession ? form.JSC_JDC_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.JSC_JDC_previousAcademicInfoCollegeRegNo ? form.JSC_JDC_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.JSC_JDC_previousAcademicInfoCollegeRollNo ? form.JSC_JDC_previousAcademicInfoCollegeRollNo : "",
      "duration": form.JSC_JDC_previousAcademicInfoCollegeCourseDuration ? form.JSC_JDC_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.JSC_JDC_previousAcademicInfoCollegeTotalCredit ? form.JSC_JDC_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.JSC_JDC_previousAcademicInfoCollegeExamHeldIn ? form.JSC_JDC_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('2'))
    {
      finalArray.push(body_JSC_JDC)
    }

    let body_SSC_Dakhil = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.SSC_Dakhil_previousAcademicInfoCollegeExamination ? Number(form.SSC_Dakhil_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.SSC_Dakhil_previousAcademicInfoCollegeGroup ? Number(form.SSC_Dakhil_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.SSC_Dakhil_previousAcademicInfoCollegeBoard ? Number(form.SSC_Dakhil_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.SSC_Dakhil_previousAcademicInfoCollegeDistrict ? form.SSC_Dakhil_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.SSC_Dakhil_previousAcademicInfoCollegeCentreCode ? form.SSC_Dakhil_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.SSC_Dakhil_previousAcademicInfoCollegeInstitute ? form.SSC_Dakhil_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject ? form.SSC_Dakhil_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.SSC_Dakhil_previousAcademicInfoCollegeGPA ? form.SSC_Dakhil_previousAcademicInfoCollegeGPA : "",
      "result": form.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult ? form.SSC_Dakhil_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.SSC_Dakhil_previousAcademicInfoCollegePassingYear ? form.SSC_Dakhil_previousAcademicInfoCollegePassingYear : "",
      "session1": form.SSC_Dakhil_previousAcademicInfoCollegeFromSession ? form.SSC_Dakhil_previousAcademicInfoCollegeFromSession : "",
      "session2": form.SSC_Dakhil_previousAcademicInfoCollegeToSession ? form.SSC_Dakhil_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.SSC_Dakhil_previousAcademicInfoCollegeRegNo ? form.SSC_Dakhil_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.SSC_Dakhil_previousAcademicInfoCollegeRollNo ? form.SSC_Dakhil_previousAcademicInfoCollegeRollNo : "",
      "duration": form.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration ? form.SSC_Dakhil_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit ? form.SSC_Dakhil_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn ? form.SSC_Dakhil_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('3'))
    {
      finalArray.push(body_SSC_Dakhil)
    }

    let body_HSC_Alim = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.HSC_Alim_previousAcademicInfoCollegeExamination ? Number(form.HSC_Alim_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.HSC_Alim_previousAcademicInfoCollegeGroup ? Number(form.HSC_Alim_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.HSC_Alim_previousAcademicInfoCollegeBoard ? Number(form.HSC_Alim_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.HSC_Alim_previousAcademicInfoCollegeDistrict ? form.HSC_Alim_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.HSC_Alim_previousAcademicInfoCollegeCentreCode ? form.HSC_Alim_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.HSC_Alim_previousAcademicInfoCollegeInstitute ? form.HSC_Alim_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject ? form.HSC_Alim_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.HSC_Alim_previousAcademicInfoCollegeGPA ? form.HSC_Alim_previousAcademicInfoCollegeGPA : "",
      "result": form.HSC_Alim_previousAcademicInfoCollegeObtainedResult ? form.HSC_Alim_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.HSC_Alim_previousAcademicInfoCollegePassingYear ? form.HSC_Alim_previousAcademicInfoCollegePassingYear : "",
      "session1": form.HSC_Alim_previousAcademicInfoCollegeFromSession ? form.HSC_Alim_previousAcademicInfoCollegeFromSession : "",
      "session2": form.HSC_Alim_previousAcademicInfoCollegeToSession ? form.HSC_Alim_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.HSC_Alim_previousAcademicInfoCollegeRegNo ? form.HSC_Alim_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.HSC_Alim_previousAcademicInfoCollegeRollNo ? form.HSC_Alim_previousAcademicInfoCollegeRollNo : "",
      "duration": form.HSC_Alim_previousAcademicInfoCollegeCourseDuration ? form.HSC_Alim_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.HSC_Alim_previousAcademicInfoCollegeTotalCredit ? form.HSC_Alim_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.HSC_Alim_previousAcademicInfoCollegeExamHeldIn ? form.HSC_Alim_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('4'))
    {
      finalArray.push(body_HSC_Alim)
    }

    let body_Hons_Fazil = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.Hons_Fazil_previousAcademicInfoCollegeExamination ? Number(form.Hons_Fazil_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.Hons_Fazil_previousAcademicInfoCollegeGroup ? Number(form.Hons_Fazil_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.Hons_Fazil_previousAcademicInfoCollegeBoard ? Number(form.Hons_Fazil_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.Hons_Fazil_previousAcademicInfoCollegeDistrict ? form.Hons_Fazil_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.Hons_Fazil_previousAcademicInfoCollegeCentreCode ? form.Hons_Fazil_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.Hons_Fazil_previousAcademicInfoCollegeInstitute ? form.Hons_Fazil_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject ? form.Hons_Fazil_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.Hons_Fazil_previousAcademicInfoCollegeGPA ? form.Hons_Fazil_previousAcademicInfoCollegeGPA : "",
      "result": form.Hons_Fazil_previousAcademicInfoCollegeObtainedResult ? form.Hons_Fazil_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.Hons_Fazil_previousAcademicInfoCollegePassingYear ? form.Hons_Fazil_previousAcademicInfoCollegePassingYear : "",
      "session1": form.Hons_Fazil_previousAcademicInfoCollegeFromSession ? form.Hons_Fazil_previousAcademicInfoCollegeFromSession : "",
      "session2": form.Hons_Fazil_previousAcademicInfoCollegeToSession ? form.Hons_Fazil_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.Hons_Fazil_previousAcademicInfoCollegeRegNo ? form.Hons_Fazil_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.Hons_Fazil_previousAcademicInfoCollegeRollNo ? form.Hons_Fazil_previousAcademicInfoCollegeRollNo : "",
      "duration": form.Hons_Fazil_previousAcademicInfoCollegeCourseDuration ? form.Hons_Fazil_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.Hons_Fazil_previousAcademicInfoCollegeTotalCredit ? form.Hons_Fazil_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn ? form.Hons_Fazil_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('5'))
    {
      finalArray.push(body_Hons_Fazil)
    }

    let body_Masters_Kamil = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.Masters_Kamil_previousAcademicInfoCollegeExamination ? Number(form.Masters_Kamil_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.Masters_Kamil_previousAcademicInfoCollegeGroup ? Number(form.Masters_Kamil_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.Masters_Kamil_previousAcademicInfoCollegeBoard ? Number(form.Masters_Kamil_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.Masters_Kamil_previousAcademicInfoCollegeDistrict ? form.Masters_Kamil_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.Masters_Kamil_previousAcademicInfoCollegeCentreCode ? form.Masters_Kamil_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.Masters_Kamil_previousAcademicInfoCollegeInstitute ? form.Masters_Kamil_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject ? form.Masters_Kamil_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.Masters_Kamil_previousAcademicInfoCollegeGPA ? form.Masters_Kamil_previousAcademicInfoCollegeGPA : "",
      "result": form.Masters_Kamil_previousAcademicInfoCollegeObtainedResult ? form.Masters_Kamil_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.Masters_Kamil_previousAcademicInfoCollegePassingYear ? form.Masters_Kamil_previousAcademicInfoCollegePassingYear : "",
      "session1": form.Masters_Kamil_previousAcademicInfoCollegeFromSession ? form.Masters_Kamil_previousAcademicInfoCollegeFromSession : "",
      "session2": form.Masters_Kamil_previousAcademicInfoCollegeToSession ? form.Masters_Kamil_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.Masters_Kamil_previousAcademicInfoCollegeRegNo ? form.Masters_Kamil_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.Masters_Kamil_previousAcademicInfoCollegeRollNo ? form.Masters_Kamil_previousAcademicInfoCollegeRollNo : "",
      "duration": form.Masters_Kamil_previousAcademicInfoCollegeCourseDuration ? form.Masters_Kamil_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.Masters_Kamil_previousAcademicInfoCollegeTotalCredit ? form.Masters_Kamil_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn ? form.Masters_Kamil_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('6'))
    {
      finalArray.push(body_Masters_Kamil)
    }

    let body_BBA = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.BBA_previousAcademicInfoCollegeExamination ? Number(form.BBA_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.BBA_previousAcademicInfoCollegeGroup ? Number(form.BBA_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.BBA_previousAcademicInfoCollegeBoard ? Number(form.BBA_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.BBA_previousAcademicInfoCollegeDistrict ? form.BBA_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.BBA_previousAcademicInfoCollegeCentreCode ? form.BBA_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.BBA_previousAcademicInfoCollegeInstitute ? form.BBA_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.BBA_previousAcademicInfoCollegeGPAwithout4thsubject ? form.BBA_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.BBA_previousAcademicInfoCollegeGPA ? form.BBA_previousAcademicInfoCollegeGPA : "",
      "result": form.BBA_previousAcademicInfoCollegeObtainedResult ? form.BBA_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.BBA_previousAcademicInfoCollegePassingYear ? form.BBA_previousAcademicInfoCollegePassingYear : "",
      "session1": form.BBA_previousAcademicInfoCollegeFromSession ? form.BBA_previousAcademicInfoCollegeFromSession : "",
      "session2": form.BBA_previousAcademicInfoCollegeToSession ? form.BBA_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.BBA_previousAcademicInfoCollegeRegNo ? form.BBA_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.BBA_previousAcademicInfoCollegeRollNo ? form.BBA_previousAcademicInfoCollegeRollNo : "",
      "duration": form.BBA_previousAcademicInfoCollegeCourseDuration ? form.BBA_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.BBA_previousAcademicInfoCollegeTotalCredit ? form.BBA_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.BBA_previousAcademicInfoCollegeExamHeldIn ? form.BBA_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('7'))
    {
      finalArray.push(body_BBA)
    }

    let body_MBA = {
      "id": 0,
      "studentMasterId": studentSaveData != null ? studentSaveData.Id : FormParam.SelectedStudentMasterId != null ? FormParam.SelectedStudentMasterId : FormParam.StudentMasterId,
      "studentID": studentSaveData != null ? studentSaveData.StudentID != null ? studentSaveData.StudentID : "" : FormParam.SelectedStudentId != null ? FormParam.SelectedStudentId : "",
      "srlNo": 0,
      "examID": form.MBA_previousAcademicInfoCollegeExamination ? Number(form.MBA_previousAcademicInfoCollegeExamination) : 0,
      "subjectID": 0,
      "groupID": form.MBA_previousAcademicInfoCollegeGroup ? Number(form.MBA_previousAcademicInfoCollegeGroup) : 0,
      "boardID": form.MBA_previousAcademicInfoCollegeBoard ? Number(form.MBA_previousAcademicInfoCollegeBoard) : 0,
      "areaID": form.MBA_previousAcademicInfoCollegeDistrict ? form.MBA_previousAcademicInfoCollegeDistrict : 0,
      "centreCode": form.MBA_previousAcademicInfoCollegeCentreCode ? form.MBA_previousAcademicInfoCollegeCentreCode : "",
      "educationIns": form.MBA_previousAcademicInfoCollegeInstitute ? form.MBA_previousAcademicInfoCollegeInstitute : "",
      "totalMarks": "",
      "without4th": form.MBA_previousAcademicInfoCollegeGPAwithout4thsubject ? form.MBA_previousAcademicInfoCollegeGPAwithout4thsubject : "",
      "with4th": form.MBA_previousAcademicInfoCollegeGPA ? form.MBA_previousAcademicInfoCollegeGPA : "",
      "result": form.MBA_previousAcademicInfoCollegeObtainedResult ? form.MBA_previousAcademicInfoCollegeObtainedResult : "",
      "resultOn": "G",
      "passYear": form.MBA_previousAcademicInfoCollegePassingYear ? form.MBA_previousAcademicInfoCollegePassingYear : "",
      "session1": form.MBA_previousAcademicInfoCollegeFromSession ? form.MBA_previousAcademicInfoCollegeFromSession : "",
      "session2": form.MBA_previousAcademicInfoCollegeToSession ? form.MBA_previousAcademicInfoCollegeToSession : "",
      "rgdNo": form.MBA_previousAcademicInfoCollegeRegNo ? form.MBA_previousAcademicInfoCollegeRegNo : "",
      "rollNo": form.MBA_previousAcademicInfoCollegeRollNo ? form.MBA_previousAcademicInfoCollegeRollNo : "",
      "duration": form.MBA_previousAcademicInfoCollegeCourseDuration ? form.MBA_previousAcademicInfoCollegeCourseDuration : "",
      "totalCredit": form.MBA_previousAcademicInfoCollegeTotalCredit ? form.MBA_previousAcademicInfoCollegeTotalCredit : "",
      "examHeld": form.MBA_previousAcademicInfoCollegeExamHeldIn ? form.MBA_previousAcademicInfoCollegeExamHeldIn : "",
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
      "updateTime": new Date().toISOString(),
      "updateUserIPAddress": ""
    }

    if (codes.includes('8'))
    {
      finalArray.push(body_MBA)
    }

    return finalArray;
  }

}

interface bodyInterface
{
  studentName?: string;
  studentNameBangla?: string;
  contactNo?: string;
  contactNoS?: string;
  bloodGroup?: string;
  Nationality?: string;
  homeDisID?: string;
  birthDate?: string;
  birthID?: string;
  religionID?: string;
  studentEmargencyContactNo?: string;
  studentSex?: string;
  emailAddress?: string;
  studentHeight?: string;
  studentWeight?: string;
  ownHouse?: string;
  houseIncome?: string;
  houseExpense?: string;
  freedomFighter?: string;
  isAutism?: string;
  PhotoPathS?: string;
  StudentSign?: string;
  fatherName?: string;
  fatherNameBangla?: string;
  contactNoF?: string;
  fatherEducation?: string;
  fatherTIN?: string;
  nationalIDF?: string;
  fatherOcpID?: string;
  fatherOfficeName?: string;
  fatherOfficeDesig?: string;
  fatherOfficeAddr?: string;
  fatherOfficePhone?: string;
  annualIncomeF?: string;
  PhotoPathF?: string;
  FatherSign?: string;
  motherName?: string;
  motherNameBangla?: string;
  contactNoM?: string;
  motherEducation?: string;
  motherTIN?: string;
  nationalIDM?: string;
  motherOcpID?: string;
  motherOfficeName?: string;
  motherOfficeDesig?: string;
  motherOfficeAddr?: string;
  motherOfficePhone?: string;
  PhotoPathM?: string;
  MotherSign?: string;
  guardianName?: string;
  gurdianNameBangla?: string;
  contactNoG?: string;
  guardianEducation?: string;
  guardTIN?: string;
  nationalIDG?: string;
  guardianOcpID?: string;
  guardOfficeName?: string;
  guardOfficeDesig?: string;
  guardOfficeAddr?: string;
  guardOfficePhone?: string;
  annualIncomeG?: string;
  PhotoPathG?: string;
  GuardinSign?: string;
  DefencePerson?: string;
  FatherRankID?: string;
  stationName?: string;
  isRetired?: string;
  retireDate?: string;
  childNo?: string;
  missionStartDate?: string;
  missionEndDate?: string;
  placeOfMission?: string;
  unitName?: string;
  baBssSnkIdNo?: string;
  areaSRA?: string;
  postCodeSRA?: string;
  districtIDSRA?: string;
  divisionIDSRA?: string;
  postOfficeIDSRA?: string;
  villageSRA?: string;
  policeStationIDSRA?: string;
  houseSRA?: string;
  sectionSRA?: string;
  plotSRA?: string;
  sectorSRA?: string;
  upazilaIDSRA?: string;
  roadSRA?: string;
  unionIDSRA?: string;
  blockSRA?: string;
  wardNoSRA?: string;
  paurashavaIDSRA?: string;
  addressSRA?: string;
  AddressSRABangla?: string;
  areaLGA?: string;
  postCodeLGA?: string;
  districtIDLGA?: string;
  divisionIDLGA?: string;
  postOfficeIDLGA?: string;
  villageLGA?: string;
  policeStationIDLGA?: string;
  houseLGA?: string;
  sectionLGA?: string;
  plotLGA?: string;
  sectorLGA?: string;
  upazilaIDLGA?: string;
  roadLGA?: string;
  unionIDLGA?: string;
  blockLGA?: string;
  wardNoLGA?: string;
  paurashavaIDLGA?: string;
  addressLGA?: string;
  AddressLGABangla?: string;
  areaPA?: string;
  postCodePA?: string;
  districtIDPA?: string;
  divisionIDPA?: string;
  postOfficeIDPA?: string;
  villagePA?: string;
  policeStationIDPA?: string;
  housePA?: string;
  sectionPA?: string;
  plotPA?: string;
  sectorPA?: string;
  upazilaIDPA?: string;
  roadPA?: string;
  unionIDPA?: string;
  blockPA?: string;
  wardNoPA?: string;
  paurashavaIDPA?: string;
  addressPA?: string;
  AddressPABangla?: string;
  lastInstitute?: string;
  lastExam?: string;
  lastExamResult?: string;
  lastSection?: string;
  lastRoll?: string;
  lastSchoolAdd?: string;
  tcInfo?: string;
  lastTcNo?: string;
  lastTcDate?: string;
  boardID?: string;
  centreCode?: string;
  duration?: string;
  areaID?: string;
  examHeld?: string;
  examID?: string;
  session1?: string;
  with4th?: string;
  without4th?: string;
  preEduGroupID?: string;
  educationIns?: string;
  result?: string;
  passYear?: string;
  rgdNo?: string;
  rollNo?: string;
  PreEduSubjectID?: string;
  session2?: string;
  totalCredit?: string;
  PhotoSName?: string;
  PhotoSBase64?: string;
  courseCurriculumCollege3rdSubjectForHSC?: string;
  courseCurriculumCollege4thSubjectForHSC?: string;
  compulsorySubject1?: string;
  compulsorySubject2?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
  hobby?: string;
  interestedClub?: string;
  nationalID?: string;
  emailF?: string;
  emailM?: string;
  emailG?: string;
  guardianR?: string;
  PreEduBoardID?: string;
  studentCatID?: string;
}




