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
export class titledropdowncontrolService  implements BaseFpxDataService<any> {
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
	 Data.push({'id':'mr','text':this.translateService.instant('titledropdowncontrol.mr')});
	 Data.push({'id':'ms','text':this.translateService.instant('titledropdowncontrol.ms')});
	 Data.push({'id':'mrs','text':this.translateService.instant('titledropdowncontrol.mrs')});
	 Data.push({'id':'miss','text':this.translateService.instant('titledropdowncontrol.miss')});
    const lookupInfo = {Data};
    const titledropdowncontrolList$ = new Observable(observer => {
      observer.next(lookupInfo.Data);
      observer.complete();
    });
    return titledropdowncontrolList$;
    };
  }
 
}
 

