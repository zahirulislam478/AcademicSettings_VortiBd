import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'app/services/service';
import UrlConfig from 'app/Urlconfig/urlConfig';


@Injectable()
export class AdminSharedService
{
  constructor(private service: Service) { }


  GetUiConfigs(model: any): Observable<any>
  {    
    return this.service.get(UrlConfig.UI_CONFIGS + model);
  }

}

