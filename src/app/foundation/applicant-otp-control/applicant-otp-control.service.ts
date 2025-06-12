import { Injectable, EventEmitter } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  BaseFpxDataService,
  CreateFn,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  CriteriaQuery,
  HttpProviderService,
  ILookUpData
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
//import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root',
})
export class ApplicantOtpControlService  implements BaseFpxDataService<any> {
constructor(private _httpProvider: HttpProviderService,private translateService:TranslateService) {}
  findByKey(key: ILookUpData): FindByKeyFn<any> {
    throw new Error('Method not implemented.');
  }
  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

   lookup(key: any): LookUpFn<any> {
    return () => {
    let Data=[];
	 Data.push({'id':'1','text':this.translateService.instant('applicant-otp-control.1')});
	 Data.push({'id':'2','text':this.translateService.instant('applicant-otp-control.2')});
	 Data.push({'id':'3','text':this.translateService.instant('applicant-otp-control.3')});
    const lookupInfo = {Data};
    const applicantOtpControlList$ = new Observable(observer => {
      observer.next(lookupInfo.Data);
      observer.complete();
    });
    return applicantOtpControlList$;
    };
  }
 
}
 

