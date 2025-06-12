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
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root',
})
export class ExpiryMonthListControlService  implements BaseFpxDataService<any> {
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
	 Data.push({'id':'01','text':this.translateService.instant('expiry-month-list-control.01')});
	 Data.push({'id':'02','text':this.translateService.instant('expiry-month-list-control.02')});
	 Data.push({'id':'03','text':this.translateService.instant('expiry-month-list-control.03')});
	 Data.push({'id':'04','text':this.translateService.instant('expiry-month-list-control.04')});
	 Data.push({'id':'05','text':this.translateService.instant('expiry-month-list-control.05')});
	 Data.push({'id':'06','text':this.translateService.instant('expiry-month-list-control.06')});
	 Data.push({'id':'07','text':this.translateService.instant('expiry-month-list-control.07')});
	 Data.push({'id':'08','text':this.translateService.instant('expiry-month-list-control.08')});
	 Data.push({'id':'09','text':this.translateService.instant('expiry-month-list-control.09')});
	 Data.push({'id':'10','text':this.translateService.instant('expiry-month-list-control.10')});
   Data.push({'id':'11','text':this.translateService.instant('expiry-month-list-control.11')});
   Data.push({'id':'12','text':this.translateService.instant('expiry-month-list-control.12')});
    const lookupInfo = {Data};
    const expiryMonthListControlList$ = new Observable(observer => {
      observer.next(lookupInfo.Data);
      observer.complete();
    });
    return expiryMonthListControlList$;
    };
  }
 
}
 

