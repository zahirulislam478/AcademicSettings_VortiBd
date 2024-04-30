import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'app/services/service';
import UrlConfig from 'app/Urlconfig/urlConfig';
import ConstantNames from 'app/Urlconfig/constantNames';


@Injectable()
export class AdmssionStudentInfoService
{
  constructor(private service: Service) { }


 

  GetAppliedProfile(model: any): Observable<any>
  {
    return this.service.get(UrlConfig.PROFILE_GET_APPLIED_PROFILE + `${model}`);
  }

}







// Sl.	App.ID	Roll Prefix	Roll No	Index No	Name	Father's Name	Mother's Name	Date of Birth	Religion	Mobile	App. Date	Tran ID	Status	Program	Group	Version	Shift	Category	Session	Form Price	Bank Charge	Active
