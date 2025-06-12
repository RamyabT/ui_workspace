import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, LoadForm, LookUpFn, ModifyFn, PatchFn } from '@fpx/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PfmMonthsService implements BaseFpxDataService<any> {

  constructor() { }
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
    return () => {
      let monthNames:string[]=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      let currentDate = new Date();
      let monthsResponse:any[]=[];
      for(let i=3;i>0;i--){
        let date = new Date(currentDate.getFullYear(),currentDate.getMonth()-i,1);
        monthsResponse.push(
          {
            id:date.getMonth()+2,
            text:monthNames[date.getMonth()+1]
          });
      };
      return of(monthsResponse);
    }
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
