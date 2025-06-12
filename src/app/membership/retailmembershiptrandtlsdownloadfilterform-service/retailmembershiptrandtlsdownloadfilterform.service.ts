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
  PatchFn,
  CriteriaQuery,
  HttpProviderService,
  ILookUpData,
  FpxIHttpOption
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
import { map, Observable, of,catchError } from 'rxjs';
 import { Retailmembershiptrandtlsdownloadfilterform, RetailmembershiptrandtlsdownloadfilterformMaintanence } from './retailmembershiptrandtlsdownloadfilterform.model';
@Injectable()
export class RetailmembershiptrandtlsdownloadfilterformService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
    findByKey(key: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<any|null> {
    throw new Error('Method not implemented.');
  }
 findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<any> {
 throw new Error('Method not implemented.');
 }
   create(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
 modify(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

 patch(payload: Retailmembershiptrandtlsdownloadfilterform,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    throw new Error('Method not implemented.');
  }
  
 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }
 
}
