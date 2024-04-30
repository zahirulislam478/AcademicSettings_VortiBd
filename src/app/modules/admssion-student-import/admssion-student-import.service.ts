import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'app/services/service';
import UrlConfig from 'app/Urlconfig/urlConfig';
import ConstantNames from 'app/Urlconfig/constantNames';


@Injectable()
export class AdmssionStudentImportService
{
  constructor(private service: Service) { }

  UploadStudentsExcel(clientId: any, circularId: any, model: any): Observable<any>
  {
    return this.service.postFormData(UrlConfig.IMPORTCANDIDATE_SAVE_CANDIDATE_EXCEL + `${clientId}/${circularId}`, model);
  }
  
  GetAppliedProfile(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_GET_APPLIED_PROFILE + `${model}`);
  }

}






