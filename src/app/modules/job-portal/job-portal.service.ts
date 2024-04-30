import { Injectable } from '@angular/core';
import { Service } from 'app/services/service';
import UrlConfig from 'app/Urlconfig/urlConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobPortalService {
  FormParam: string;

  constructor(private service: Service) {}

  GetCircularClients(): Observable<any> {
    return this.service.get(UrlConfig.JOBPORTALCLIENT_DATA);
  }

  GetCircularOpenCirculars(id: any): Observable<any> {
    return this.service.get(UrlConfig.JOBPORTALCIRCULAR_OPENCIRCULARS(id));
  }

  GetCircularSingleCircular(id: any): Observable<any> {
    return this.service.get(UrlConfig.JOBPORTALCIRCULAR_SINGLECIRCULAR(id));
  }
  //
  GetCircularDetails(id: any): Observable<any> {
    return this.service.get(UrlConfig.JOBPORTALCIRCULAR_CIRCULARDETAILS(id));
  }

  GetCircularDetailsById(id: any): Observable<any> {
    return this.service.get(
      UrlConfig.JOBPORTALCIRCULAR_CIRCULARDETAILSBYID(id)
    );
  }

  SaveCircular(model: any): Observable<any> {
    return this.service.post(UrlConfig.JOBPORTALSAVE_CIRCULAR, model);
  }

  UpdateCircular(model: any): Observable<any> {
    return this.service.post(UrlConfig.JOBPORTALUPDATE_CIRCULAR, model);
  }

  UpdateCircularDetials(model: any): Observable<any> {
    return this.service.post(
      UrlConfig.JOBPORTALCIRCULAR_UPDATE_CIRCULAR_DETAILS,
      model
    );
  }

  UpdateCircularConfig(model: any): Observable<any> {
    return this.service.post(
      UrlConfig.JOBPORTAL_UPDATE_CIRCULAR_CONFIGURATION,
      model
    );
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
    return this.service.post(
      UrlConfig.JOBPORTALCIRCULAR_SAVE_CIRCULARDETAILS,
      model
    );
  }

  UpdateCircularDetails(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_UPDATE_CIRCULAR_DETAILS, model);
  }

  CopyCircularDetails(model: any): Observable<any> {
    return this.service.post(UrlConfig.CIRCULAR_COPY_CIRCULAR, model);
  }

  deleteCircularDetails(model: any): Observable<any> {
    return this.service.get(
      UrlConfig.JOBPORTALCIRCULAR_DELETE_CIRCULAR + `${model}`
    );
  }

  changeCircularStatus(circularDetailId: any, actionTag: any): Observable<any> {
    return this.service.get(
      UrlConfig.JOBPORTALCIRCULAR_SETUP_INACTIVE_CIRCULAR +
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
  GetQulificationSetup(id: any): Observable<any> {
    return this.service.get(UrlConfig.JOBPORTAL_EXAM_SKILL_CONFIGS + `${id}`);
  }

  SaveQulificationSetup(model: any): Observable<any> {
    return this.service.post(
      UrlConfig.JOBPORTAL_SAVE_EXAM_SKILL_CONFIGS,
      model
    );
  }

  GetDefaultControls(id: any): Observable<any> {
    return this.service.get(UrlConfig.DEFAULT_CONTROLS(id));
  }
}
