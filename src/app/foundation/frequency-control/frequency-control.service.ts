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
import { map, Observable, of,catchError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root',
})
export class FrequencyControlService implements BaseFpxDataService<any> {

  modifyFrequencyControlList: boolean = false;

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
      console.log(key,"key")
      let Data = [];
      {
        
        Data.push({ 'id': '1', 'text': this.translateService.instant('frequency-control.ETRANSFERSENDMONEY.1') });
        Data.push({ 'id': '2', 'text': this.translateService.instant('frequency-control.ETRANSFERSENDMONEY.2') });
        Data.push({ 'id': '3', 'text': this.translateService.instant('frequency-control.ETRANSFERSENDMONEY.3') });
        Data.push({ 'id': '4', 'text': this.translateService.instant('frequency-control.ETRANSFERSENDMONEY.4') });
        Data.push({ 'id': '5', 'text': this.translateService.instant('frequency-control.ETRANSFERSENDMONEY.5') });
        Data.push({ 'id': '6', 'text': this.translateService.instant('frequency-control.ETRANSFERSENDMONEY.6') });
      }
      // else {
      //   console.log(key.serviceCode,"service code")
      //   Data.push({ 'id': '1', 'text': this.translateService.instant('frequency-control.1') });
      //   Data.push({ 'id': '2', 'text': this.translateService.instant('frequency-control.2') });
      //   Data.push({ 'id': '3', 'text': this.translateService.instant('frequency-control.3') });
      //   Data.push({ 'id': '4', 'text': this.translateService.instant('frequency-control.4') });
      //   Data.push({ 'id': '5', 'text': this.translateService.instant('frequency-control.5') });
      // }


      if (this.modifyFrequencyControlList) {
        Data = Data.filter(item => item.id != '1');
      }

      console.log(Data, "Data")

      const lookupInfo = { Data };
      const frequencyControlList$ = new Observable(observer => {
        observer.next(lookupInfo.Data);
        observer.complete();
      });
      return frequencyControlList$;
    };
  }

}
 

