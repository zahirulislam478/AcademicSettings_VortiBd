import { Injectable } from "@angular/core";
import { Service } from "app/services/service";
import UrlConfig from "app/Urlconfig/urlConfig";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SuperAdminService {
  FormParam: string;

  constructor(private service: Service) {}

  GetCircularClients(): Observable<any> {
    return this.service.get(UrlConfig.CIRCULARCLIENT_DATA);
  }

  GetCircularOpenCirculars(id: any): Observable<any> {
    return this.service.get(UrlConfig.CIRCULAR_OPENCIRCULARS(id));
  }

  GetCircularSingleCircular(id: any): Observable<any> {
    return this.service.get(UrlConfig.CIRCULAR_SINGLECIRCULAR(id));
  }

  GetCircularDetails(id: any): Observable<any> {
    return this.service.get(UrlConfig.CIRCULAR_CIRCULARDETAILS(id));
  }

  SaveCircular(model: any): Observable<any> {
    return this.service.post(UrlConfig.SAVE_CIRCULAR, model);
  }

  UpdateCircular(model: any): Observable<any> {
    return this.service.post(UrlConfig.UPDATE_CIRCULAR, model);
  }

  UpdateCircularConfig(model: any): Observable<any> {
    return this.service.post(UrlConfig.UPDATE_CIRCULAR_CONFIGURATION, model);
  }

  SaveRoll(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_SETUP_SAVEROLL, model);
  }

  GetCircularDefaultControls(id: any, type: any): Observable<any> {
    return this.service.get(
      UrlConfig.CIRCULARDEFAULT_CONTROLS + `${id}/${type}`
    );
  }

  SaveCircularDetails(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_SAVE_CIRCULAR_DETAILS, model);
  }

  UpdateCircularDetails(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_UPDATE_CIRCULAR_DETAILS, model);
  }

  CopyCircularDetails(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_COPY_CIRCULAR, model);
  }

  deleteCircularDetails(model: any): Observable<any> {
    return this.service.get(UrlConfig.CIRCULAR_DELETE_CIRCULAR + `${model}`);
  }

  changeCircularStatus(circularDetailId: any, actionTag: any): Observable<any> {
    return this.service.get(
      UrlConfig.CIRCULAR_SETUP_INACTIVE_CIRCULAR +
        `${circularDetailId}/${actionTag}`
    );
  }

  GetAppliedCandidates(model: any): Observable<any> {
    return this.service.post(UrlConfig.PROFILE_APPLIED_CANDIDATES, model);
  }

  CheckAppiledPrograms(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_CHECKAPPLIED, model);
  }

  SaveRollRange(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_CHECKAPPLIED, model);
  }

  GetAppliedCandidatesUrl(): string {
    return UrlConfig.PROFILE_APPLIED_CANDIDATES;
  }

  GetDownloadAppliedCandidatesUrl(): string {
    return UrlConfig.PROFILE_DOWNLOAD_APPLIED_CANDIDATES;
  }

  GetLotteryToken(clientId: any, circularId: any): Observable<any> {
    return this.service.get(
      UrlConfig.PROFILE_LOTTERY_TOKEN + `${clientId}/${circularId}`
    );
  }

  GetSummaryReport(clientId: any, circularId: any): Observable<any> {
    return this.service.get(
      UrlConfig.PROFILE_SUMMARY_REPORT + `${clientId}/${circularId}`
    );
  }

  GetCircularDropdowns(clientId: any, circularId: any): Observable<any> {
    return this.service.get(
      UrlConfig.IMPORTCANDIDATE_DROPDOWNS + `${clientId}/${circularId}`
    );
  }

  GetCSaveCandidate(model: any): Observable<any> {
    return this.service.post(UrlConfig.IMPORTCANDIDATE_SAVE_CANDIDATE, model);
  }

  GetBulkImage(id: any): Observable<any> {
    return this.service.get(UrlConfig.PROFILE_DOWNLOAD_BULK_IMAGE + `${id}`);
  }

  GetExamCodes(id: any): Observable<any> {
    return this.service.get(UrlConfig.CIRCULAR_EXAM_CODES + `${id}`);
  }

  SaveExamCodes(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_SAVE_CIRCULAR_PREEDU, model);
  }

  //setup clients
  getClients(clientStatus: any): Observable<any> {
    return this.service.get(UrlConfig.SETUP_CLIENTS(clientStatus));
  }

  syncClients(): Observable<any> {
    return this.service.post(UrlConfig.SETUP_SYNC_CLIENTS, {});
  }

  getClientStatus(clientId: any): Observable<any> {
    return this.service.get(UrlConfig.SETUP_CLIENT_STATUS(clientId));
  }

  inactiveVortiBD(clientId: any, actionTag: any): Observable<any> {
    return this.service.post(
      UrlConfig.SETUP_VORTIBD_ACTIVE_INACTIVE(clientId, actionTag),
      null
    );
  }

  getClientGateway(clientId: any): Observable<any> {
    return this.service.get(UrlConfig.SETUP_CLIENT_GATEWAY(clientId));
  }

  updateClientGateway(model: any): Observable<any> {
    return this.service.post(UrlConfig.SETUP_UPDATE_GATEWAY, model);
  }

  getVortiBDClients(): Observable<any> {
    return this.service.get(UrlConfig.SETUP_VORTIBD_CLIENTS);
  }

  getTablesData(clientId: any, table: any): Observable<any> {
    return this.service.get(UrlConfig.SETUP_TABLES_DATA(clientId, table));
  }

  getExtraTablesData(clientId: any, table: any): Observable<any> {
    return this.service.get(UrlConfig.SETUP_EXTRA_TABLES_DATA(clientId, table));
  }

  syncTables(model: any): Observable<any> {
    return this.service.post(UrlConfig.SETUP_SYNC_TABLES, model);
  }
}
