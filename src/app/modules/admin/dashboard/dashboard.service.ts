import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'app/services/service';
import UrlConfig from 'app/Urlconfig/urlConfig';
import ConstantNames from 'app/Urlconfig/constantNames';


@Injectable()
export class DashboardService
{
  constructor(private service: Service) { }


  GetUiConfigs(model: any): Observable<any>
  {
    // return this.service.get(UrlConfig.UI_CONFIGS + model);
    return this.service.post(UrlConfig.UI_CONFIGS, model);
  }

  GetDropdownCotrols(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.DROPDOWN_CONTROLS + model);
  }

  GetInstituteData(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.INSTITUTE_DATA + model);
  }

  GetOpenProgramsData(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.OPEN_PROGRAM_DATA + model);
  }

  GetOpenProgramsDetails(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.OPEN_PROGRAM_DETAILS + model);
    // return this.service.get(UrlConfig.OPEN_PROGRAM_DETAILS + model.ins + '/' + model.class);
  }

  GetProfileSubjects(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_SUBJECTS + model);
  }

  GetOpenCirculars(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.OPEN_CIRCULARS + model);
  }

  SaveStudentForm(model: any, id: any): Observable<any>
  {
    return this.service.post(UrlConfig.STUDENT_SAVE_NEW(id), model);
  }

  SaveStudentFormIncomplete(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.STUDENT_SAVE_INCOMPLETE, model);
  }

  SaveGuardianForm(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.GUARDIAN_SAVE, model);
  }

  SaveAddressForm(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.ADDRESS_SAVE, model);
  }

  SavePreviousAcademicInfoCollegeForm(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.PREVIOUSCOLLEGE_SAVE, model);
  }

  SavePreviousAcademicInfoSchoolForm(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.PREVIOUSSCHOOL_SAVE, model);
  }

  AutoCompleteStudent(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.AUTOCOMPLETE, model);
  }

  SaveCourseCurriculumCollegeForm(model: any, id: any, groupID: any): Observable<any>
  {
    return this.service.post(UrlConfig.COURSECURRICULUM_COLLEGE(id, groupID), model);
  }

  GetDashboardProfiles(): Observable<any>
  {
    return this.service.get(UrlConfig.DASHBOARD_PROFILES);
  }

  ProfileApply(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.PROFILE_APPLY, model);
  }

  DlAdminCard(model: any): Observable<any>
  {
    // return this.service.post(UrlConfig.PROFILE_ADMIT_CARD, model);
    return this.service.get(UrlConfig.PROFILE_ADMIT_CARD + model);
  }

  DlPermission(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PAYMENTSSL_DOWNLOAD_PERMISSION + model);
  }

  DlPermissionApplicantID(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PAYMENTSSL_DOWNLOAD_PERMISSION_APPLICANTID + model);
  }

  DlApplicationForm(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_ADMISSION_FORM + model);
  }

  DlIdCard(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_ID_CARD + model);
  }

  DlLibraryCard(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_LIBRARY_CARD + model);
  }

  DlTransportApplyForm(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_TRANSPORT_APPLY_FORM + model);
  }

  GetCurrentProfile(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_GET_CURRENT_PROFILE + model);
  }

  GetOpenCircularsByGroupCat(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.OPEN_CIRCULARS_BY_GROUP_CAT, model);
  }

  GetInitiatePayment(model: any): Observable<any>
  {
    return this.service.post(UrlConfig.PAYMENTSSL_INITIATE_PAYMENT, model);
  }

  GetProfilePoliceStation(districtId: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_POLICE_STATION + `${districtId}`);
  }

  set FormParam(data: any)
  {
    localStorage.setItem(ConstantNames.FormParam, data);
  }

  get FormParam(): any
  {
    return localStorage.getItem(ConstantNames.FormParam) ?? null
  }



}




let gg = {
  "status": "SUCCESS",
  "failedreason": "",
  "GatewayPageURL": "https://sandbox.sslcommerz.com/EasyCheckOut/testcdea644929fbdfc4437491ec36d6343caf4"
}


let fgf=[
  {
      "Id": 82,
      "ClientId": 0,
      "KeyName": "presentAreaAddress",
      "LabelName": "Area/Address",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 85,
      "ClientId": 0,
      "KeyName": "presentDivision",
      "LabelName": "Division",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 86,
      "ClientId": 0,
      "KeyName": "presentPostOffice",
      "LabelName": "Post Office",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 89,
      "ClientId": 0,
      "KeyName": "presentHouse",
      "LabelName": "House",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 90,
      "ClientId": 0,
      "KeyName": "presentSection",
      "LabelName": "Section",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 91,
      "ClientId": 0,
      "KeyName": "presentPlot",
      "LabelName": "Plot",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 92,
      "ClientId": 0,
      "KeyName": "presentSector",
      "LabelName": "Sector",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 93,
      "ClientId": 0,
      "KeyName": "presentUpazila",
      "LabelName": "Upazila",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 94,
      "ClientId": 0,
      "KeyName": "presentRoad",
      "LabelName": "Road",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 95,
      "ClientId": 0,
      "KeyName": "presentUnion",
      "LabelName": "Union",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 96,
      "ClientId": 0,
      "KeyName": "presentBlock",
      "LabelName": "Block",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 97,
      "ClientId": 0,
      "KeyName": "presentWardNo",
      "LabelName": "Ward No",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 98,
      "ClientId": 0,
      "KeyName": "presentPaurashava",
      "LabelName": "Paurashava",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 99,
      "ClientId": 0,
      "KeyName": "presentAddressEng",
      "LabelName": "Address (English)",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 100,
      "ClientId": 0,
      "KeyName": "presentAddressBng",
      "LabelName": "Address (Bangla)",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 101,
      "ClientId": 0,
      "KeyName": "permanentSameAs",
      "LabelName": "Same as Present Address",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 102,
      "ClientId": 0,
      "KeyName": "permanentAreaAddress",
      "LabelName": "Area/Address",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 105,
      "ClientId": 0,
      "KeyName": "permanentDivision",
      "LabelName": "Division",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 106,
      "ClientId": 0,
      "KeyName": "permanentPostOffice",
      "LabelName": "Post Office",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 109,
      "ClientId": 0,
      "KeyName": "permanentHouse",
      "LabelName": "House",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 110,
      "ClientId": 0,
      "KeyName": "permanentSection",
      "LabelName": "Section",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 111,
      "ClientId": 0,
      "KeyName": "permanentPlot",
      "LabelName": "Plot",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 112,
      "ClientId": 0,
      "KeyName": "permanentSector",
      "LabelName": "Sector",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 113,
      "ClientId": 0,
      "KeyName": "permanentUpazila",
      "LabelName": "Upazila",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 114,
      "ClientId": 0,
      "KeyName": "permanentRoad",
      "LabelName": "Road",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 115,
      "ClientId": 0,
      "KeyName": "permanentUnion",
      "LabelName": "Union",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 116,
      "ClientId": 0,
      "KeyName": "permanentBlock",
      "LabelName": "Block",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 117,
      "ClientId": 0,
      "KeyName": "permanentWardNo",
      "LabelName": "Ward No",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 118,
      "ClientId": 0,
      "KeyName": "permanentPaurashava",
      "LabelName": "Paurashava",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 119,
      "ClientId": 0,
      "KeyName": "permanentAddressEng",
      "LabelName": "Address (English)",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 120,
      "ClientId": 0,
      "KeyName": "permanentAddressBng",
      "LabelName": "Address (Bangla)",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 121,
      "ClientId": 0,
      "KeyName": "localGuardianSameAs",
      "LabelName": "Same as Permanent Address",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 122,
      "ClientId": 0,
      "KeyName": "localGuardianAreaAddress",
      "LabelName": "Area/Address",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 125,
      "ClientId": 0,
      "KeyName": "localGuardianDivision",
      "LabelName": "Division",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 126,
      "ClientId": 0,
      "KeyName": "localGuardianPostOffice",
      "LabelName": "Post Office",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 129,
      "ClientId": 0,
      "KeyName": "localGuardianHouse",
      "LabelName": "House",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 130,
      "ClientId": 0,
      "KeyName": "localGuardianSection",
      "LabelName": "Section",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 131,
      "ClientId": 0,
      "KeyName": "localGuardianPlot",
      "LabelName": "Plot",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 132,
      "ClientId": 0,
      "KeyName": "localGuardianSector",
      "LabelName": "Sector",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 133,
      "ClientId": 0,
      "KeyName": "localGuardianUpazila",
      "LabelName": "Upazila",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 134,
      "ClientId": 0,
      "KeyName": "localGuardianRoad",
      "LabelName": "Road",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 135,
      "ClientId": 0,
      "KeyName": "localGuardianUnion",
      "LabelName": "Union",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 136,
      "ClientId": 0,
      "KeyName": "localGuardianBlock",
      "LabelName": "Block",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 137,
      "ClientId": 0,
      "KeyName": "localGuardianWardNo",
      "LabelName": "Ward No",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 138,
      "ClientId": 0,
      "KeyName": "localGuardianPaurashava",
      "LabelName": "Paurashava",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 140,
      "ClientId": 0,
      "KeyName": "localGuardianAddressBng",
      "LabelName": "Address (Bangla)",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1906,
      "ClientId": 1234,
      "KeyName": "presentDistrict",
      "LabelName": "District",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1907,
      "ClientId": 1234,
      "KeyName": "permanentDistrict",
      "LabelName": "District",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1908,
      "ClientId": 1234,
      "KeyName": "localGuardianDistrict",
      "LabelName": "District",
      "KeyValue": null,
      "Visible": true,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1909,
      "ClientId": 1234,
      "KeyName": "presentPostCode",
      "LabelName": "Post Code",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1910,
      "ClientId": 1234,
      "KeyName": "permanentPostCode",
      "LabelName": "Post Code",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1911,
      "ClientId": 1234,
      "KeyName": "localGuardianPostCode",
      "LabelName": "Post Code",
      "KeyValue": null,
      "Visible": true,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1912,
      "ClientId": 1234,
      "KeyName": "presentPoliceStation",
      "LabelName": "PoliceStation",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1913,
      "ClientId": 1234,
      "KeyName": "presentPoliceStation",
      "LabelName": "PoliceStation",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1914,
      "ClientId": 1234,
      "KeyName": "permanentPoliceStation",
      "LabelName": "PoliceStation",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1915,
      "ClientId": 1234,
      "KeyName": "permanentPoliceStation",
      "LabelName": "Thana",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1916,
      "ClientId": 1234,
      "KeyName": "localGuardianPoliceStation",
      "LabelName": "Thana",
      "KeyValue": null,
      "Visible": true,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1917,
      "ClientId": 1234,
      "KeyName": "localGuardianPoliceStation",
      "LabelName": "Police Station",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1918,
      "ClientId": 1234,
      "KeyName": "permanentPoliceStation",
      "LabelName": "Police Station",
      "KeyValue": null,
      "Visible": false,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1919,
      "ClientId": 1234,
      "KeyName": "presentPoliceStation",
      "LabelName": "Police Station",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "!",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1920,
      "ClientId": 1234,
      "KeyName": "presentVillage",
      "LabelName": "Thana",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1921,
      "ClientId": 1234,
      "KeyName": "localGuardianVillage",
      "LabelName": "Thana",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1922,
      "ClientId": 1234,
      "KeyName": "permanentVillage",
      "LabelName": "Thana",
      "KeyValue": null,
      "Visible": true,
      "Required": true,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1923,
      "ClientId": 1234,
      "KeyName": "localGuardianVillage",
      "LabelName": "Thana",
      "KeyValue": null,
      "Visible": true,
      "Required": false,
      "Message": "",
      "FormName": "Address Information",
      "ActiveStatus": true
  },
  {
      "Id": 1924,
      "ClientId": 1234,
      "KeyName": "localGuardianAddressEng",
      "LabelName": "Address (English)",
      "KeyValue": null,
      "Visible": true,
      "Required": false,
      "Message": "The Field is Required!",
      "FormName": "Address Information",
      "ActiveStatus": true
  }
]
