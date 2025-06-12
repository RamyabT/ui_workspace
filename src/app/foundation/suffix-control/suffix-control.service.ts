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
export class SuffixControlService  implements BaseFpxDataService<any> {
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
    	 Data.push({'id':'SUFFIX1','text':this.translateService.instant('suffix-control.SUFFIX1')});
    	 Data.push({'id':'SUFFIX2','text':this.translateService.instant('suffix-control.SUFFIX2')});
    	 Data.push({'id':'SUFFIX3','text':this.translateService.instant('suffix-control.SUFFIX3')});
    	 Data.push({'id':'SUFFIX4','text':this.translateService.instant('suffix-control.SUFFIX4')});
	 Data.push({'id':'SUFFIX5','text':this.translateService.instant('suffix-control.SUFFIX5')});
	 Data.push({'id':'SUFFIX6','text':this.translateService.instant('suffix-control.SUFFIX6')});
    const lookupInfo = {Data};
    const suffixControlList$ = new Observable(observer => {
      observer.next(lookupInfo.Data);
      observer.complete();
    });
    return suffixControlList$;
    };
  }
 
}
 

