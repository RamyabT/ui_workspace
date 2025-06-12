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
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of, catchError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root',
})
export class NotificationPreferenceService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService, private translateService: TranslateService) { }
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
      let Data = [];
      if(!(key.serviceCode)){
        Data.push({ 'id': 'E', 'text': this.translateService.instant('notification-preference.E') });
        Data.push({ 'id': 'P', 'text': this.translateService.instant('notification-preference.P') });
        Data.push({ 'id': 'B', 'text': this.translateService.instant('notification-preference.B') });
      }
      else if(key.serviceCode == 'RETAILETRANSFERREGISTRATION'){
        Data.push({ 'id': 'E', 'text': this.translateService.instant('notification-preference.E') });
        Data.push({ 'id': 'B', 'text': this.translateService.instant('notification-preference.EP') });
      }
      else{
        Data.push({ 'id': 'E', 'text': this.translateService.instant('notification-preference.E') });
        Data.push({ 'id': 'P', 'text': this.translateService.instant('notification-preference.P') });
      }
      const lookupInfo = { Data };
      const notificationPreferenceList$ = new Observable(observer => {
        observer.next(lookupInfo.Data);
        observer.complete();
      });
      return notificationPreferenceList$;
    };
  }

}


