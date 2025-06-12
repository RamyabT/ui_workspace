import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, HttpRequest, LookUpFn, ModifyFn,HttpProviderService } from '@fpx/core';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService implements BaseFpxDataService<any>{

  constructor(private _httpProvider : HttpProviderService) { }
  findByKey(payload: any): FindByKeyFn<any> {
    throw new Error('Method not implemented.');
  }
  findAll(criteriaQuery: CriteriaQuery): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
   return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/changepassword');
    httpRequest.setBody(payload);
    httpRequest.addHeaderParamter('serviceName','CHANGEPASSWORDBO')
    httpRequest.setMethod('POST');
    return this._httpProvider.invokeRestApi(httpRequest);
   }
  }
  lookup(key: unknown): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
}
