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
  HttpProviderService
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FaceTecInfo, FaceTecInfoMaintanence } from './liveness-check.model';
@Injectable()
export class LivenessCheckServcie implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: FaceTecInfo): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/obapplicantliveness');
      let bodyContent = {"obapplicantliveness":payload};
      httpRequest.setBody(bodyContent);
      httpRequest.addHeaderParamter('serviceCode','RETAILLIVENESSCHECK');
      httpRequest.setContextPath('Customers');
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }
 
  findByKey(key: FaceTecInfo): FindByKeyFn<FaceTecInfo> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantliveness/{appRef}');
       httpRequest.addPathParameter('appRef', key.appRef);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.personalinfo ?? null));
        
    };
  }

  modify(payload: FaceTecInfo): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantliveness/{appRef}');
       httpRequest.addPathParameter('appRef', payload.appRef);
     httpRequest.setMethod('PUT');
      let bodyContent = {"obapplicantliveness":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }
  
  
 findAll(criteriaQuery: CriteriaQuery): FindAllFn<FaceTecInfo[]> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantliveness');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(
          map(
            (res: IHttpSuccessPayload<FaceTecInfoMaintanence>) =>
              res.body.obapplicantliveness
          )
        );
    };
  }
  
   
     lookup(key: any): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/obapplicantliveness');
      httpRequest.addQueryParameter('lookup', 1);
      const httpCriteria = new CriteriaQuery();
	  httpCriteria.setPaginationCriteria('1', 10);
	  httpCriteria.addFilterCritertia('text', 'String', 'startsWith', {
	  searchText: key.searchText ?? '',
	  });
	  httpRequest.setCriteriaQuery(httpCriteria);
 
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }
}
