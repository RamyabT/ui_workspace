import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, LookUpFn, ModifyFn } from '@fpx/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyUserIdService implements BaseFpxDataService<any> {

  constructor() { }
  findByKey(payload: any): FindByKeyFn<any> {
    throw new Error('Method not implemented.');
  }
  findAll(criteriaQuery: CriteriaQuery): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  lookup(key: unknown): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
}
