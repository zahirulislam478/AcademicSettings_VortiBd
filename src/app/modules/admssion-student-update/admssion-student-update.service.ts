import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'app/services/service';
import UrlConfig from 'app/Urlconfig/urlConfig';
import ConstantNames from 'app/Urlconfig/constantNames';


@Injectable()
export class AdmssionStudentUpdateService
{
  constructor(private service: Service) { }


 

  GetAppliedProfile(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_GET_APPLIED_PROFILE + `${model}`);
  }

}






