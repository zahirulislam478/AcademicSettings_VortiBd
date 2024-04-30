import { Injectable } from '@angular/core';
import UrlConfig from 'app/Urlconfig/urlConfig';
import { Service } from 'app/services/service';
import { Observable } from 'rxjs';

@Injectable()
export class JobPortalUiConfigService {
  constructor(private service: Service) {}

  SearchUiConfig(model: any): Observable<any> {
    return this.service.post(UrlConfig.JOBPORTALCLIENT_UI_CONFIG, model);
  }

  SaveSingleUiConfig(model: any): Observable<any> {
    return this.service.post(UrlConfig.JOBPORTALCLIENT_UI_CONFIGS, model);
  }

  ResetSingleUiConfig(model: any): Observable<any> {
    return this.service.post(
      UrlConfig.JOBPORTALCLIENTS_RESET_UI_CONFIGS,
      model
    );
  }

  GetCircularClients(): Observable<any> {
    return this.service.get(UrlConfig.JOBPORTALCLIENT_DATA);
  }
}

let body = {
  id: 1720,
  clientId: 206, // from grid
  cloneClientId: 206, // from dropdown
  programType: 'C',
  keyName: 'studentFullName',
  labelName: 'Full Name',
  visible: true,
  required: true,
  message: 'The Field is Required!',
  formName: 'Student Information',
};

let gg = [
  {
    Id: 150,
    ClientId: 0,
    ProgramType: 'C',
    KeyName: 'studentFullName',
    LabelName: "Student's Full Name",
    KeyValue: null,
    Visible: true,
    Required: true,
    Message: 'The Field is Required!',
    FormName: 'Student Information',
    ActiveStatus: true,
    EIMSField: null,
    DBField: null,
  },
  {
    Id: 151,
    ClientId: 0,
    ProgramType: 'C',
    KeyName: 'studentFullNameEng',
    LabelName: "Student's Full Name (English)",
    KeyValue: null,
    Visible: false,
    Required: false,
    Message: 'The Field is Required!',
    FormName: 'Student Information',
    ActiveStatus: true,
    EIMSField: null,
    DBField: null,
  },
  {
    Id: 152,
    ClientId: 0,
    ProgramType: 'C',
    KeyName: 'studentFullNameBng',
    LabelName: "Student's Full Name (Bangla)",
    KeyValue: null,
    Visible: true,
    Required: false,
    Message: '',
    FormName: 'Student Information',
    ActiveStatus: true,
    EIMSField: null,
    DBField: null,
  },
];
