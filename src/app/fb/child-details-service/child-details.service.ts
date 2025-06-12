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
  FpxIHttpOption,
  LoadForm
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
import { map, Observable, of,catchError } from 'rxjs';
 import {  Childreqdocdtl } from '../childreqdocdtl-service/childreqdocdtl.model';
import { ChildDetails, ChildDetailsMaintanence } from './child-details.model';
@Injectable()
export class ChildlogService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
    findByKey(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindByKeyFn<any> {
        throw new Error('Method not implemented.');
    }
    findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindAllFn<any> {
        throw new Error('Method not implemented.');
    }
    create(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): CreateFn<any> {
        throw new Error('Method not implemented.');
    }
    lookup(key: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>, criteriaQuery?: CriteriaQuery): LookUpFn<any> {
        throw new Error('Method not implemented.');
    }
    modify(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): ModifyFn<any> {
        throw new Error('Method not implemented.');
    }
    fetchStatistics?(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindAllFn<any> {
        throw new Error('Method not implemented.');
    }
    patch?(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): PatchFn<any> {
        throw new Error('Method not implemented.');
    }
    loadForm?(key: unknown): LoadForm<any> {
        throw new Error('Method not implemented.');
    }

}
