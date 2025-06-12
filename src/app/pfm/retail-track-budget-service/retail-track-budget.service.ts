import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from '@fpx/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class retailTrackBudgetService implements BaseFpxDataService<any> {
  public pfmSpendsSub$: BehaviorSubject<any> = new BehaviorSubject(null);

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
