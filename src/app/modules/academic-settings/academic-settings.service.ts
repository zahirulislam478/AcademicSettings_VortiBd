import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Service } from "app/services/service";
import UrlConfig from "app/Urlconfig/urlConfig";

@Injectable()
export class AcademicSettingsService {
  constructor(private service: Service) {}

  // getClients(clientStatus: string): Observable<any> {
  //   return this.service.get(UrlConfig.SETUP_CLIENTS(clientStatus));
  // }
  
  // syncClients(): Observable<any> {
  //   return this.service.post(UrlConfig.SETUP_SYNC_CLIENTS, {});
  // }

  // getClientStatus(clientId: number): Observable<any> {
  //   return this.service.get(UrlConfig.SETUP_CLIENT_STATUS(clientId));
  // }

  // inactiveVortiBD(clientId: number, actionTag: string): Observable<any> {
  //   return this.service.post(
  //     UrlConfig.SETUP_VORTIBD_ACTIVE_INACTIVE(clientId, actionTag),
  //     null
  //   );
  // }

  // getClientGateway(clientId: number): Observable<any> {
  //   return this.service.get(UrlConfig.SETUP_CLIENT_GATEWAY(clientId));
  // }

  // updateClientGateway(model: any): Observable<any> {
  //   return this.service.post(UrlConfig.SETUP_UPDATE_GATEWAY, model);
  // }

  // getVortiBDClients(): Observable<any> {
  //   return this.service.get(UrlConfig.SETUP_VORTIBD_CLIENTS);
  // }

  // getTablesData(clientId: any, table: any): Observable<any> {
  //   return this.service.get(UrlConfig.SETUP_TABLES_DATA(clientId, table));
  // }

  // getExtraTablesData(clientId: number, table: string): Observable<any> {
  //   return this.service.get(UrlConfig.SETUP_EXTRA_TABLES_DATA(clientId, table));
  // }

  // syncTables(model: any): Observable<any> {
  //   return this.service.post(UrlConfig.SETUP_SYNC_TABLES, model);
  // }

  GetCircularClients(): Observable<any> {
    return this.service.get(UrlConfig.CIRCULARCLIENT_DATA);
  }
}

// let body={
//   "id": 1720,
//   "clientId": 206, // from grid
//   "cloneClientId":206, // from dropdown
//   "programType": "C",
//   "keyName": "studentFullName",
//   "labelName": "Full Name",
//   "visible": true,
//   "required": true,
//   "message": "The Field is Required!",
//   "formName": "Student Information"
// }

// let gg=[
//   {
//       "Id": 150,
//       "ClientId": 0,
//       "ProgramType": "C",
//       "KeyName": "studentFullName",
//       "LabelName": "Student's Full Name",
//       "KeyValue": null,
//       "Visible": true,
//       "Required": true,
//       "Message": "The Field is Required!",
//       "FormName": "Student Information",
//       "ActiveStatus": true,
//       "EIMSField": null,
//       "DBField": null
//   },
//   {
//       "Id": 151,
//       "ClientId": 0,
//       "ProgramType": "C",
//       "KeyName": "studentFullNameEng",
//       "LabelName": "Student's Full Name (English)",
//       "KeyValue": null,
//       "Visible": false,
//       "Required": false,
//       "Message": "The Field is Required!",
//       "FormName": "Student Information",
//       "ActiveStatus": true,
//       "EIMSField": null,
//       "DBField": null
//   },
//   {
//       "Id": 152,
//       "ClientId": 0,
//       "ProgramType": "C",
//       "KeyName": "studentFullNameBng",
//       "LabelName": "Student's Full Name (Bangla)",
//       "KeyValue": null,
//       "Visible": true,
//       "Required": false,
//       "Message": "",
//       "FormName": "Student Information",
//       "ActiveStatus": true,
//       "EIMSField": null,
//       "DBField": null
//   }
// ]
