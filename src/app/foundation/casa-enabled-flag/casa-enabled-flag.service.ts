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
export class CasaEnabledFlagService  implements BaseFpxDataService<any> {
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
    Data.push({'id':'1','text':this.translateService.instant('casa-enabled-flag.1')});
	 Data.push({'id':'0','text':this.translateService.instant('casa-enabled-flag.0')});
	 
    const lookupInfo = {Data};
    const casaEnabledFlagList$ = new Observable(observer => {
      observer.next(lookupInfo.Data);
      observer.complete();
    });
    return casaEnabledFlagList$;
    };
  }
 
}
 

