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
import { FaceTecInfo, FaceTecInfoMaintanence } from './facetecinfo.model';
import { ActiveSpaceInfoService } from '@dep/core';
@Injectable()
export class FacetechReqServcie implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService,  public _activeSpaceInfoService: ActiveSpaceInfoService,) { }
  create(payload: FaceTecInfo): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      if(payload.isSkipped){
        httpRequest.setResource('/obskipdocument');
      } else{
        httpRequest.setResource('/obapplicantdocuments');
      }
      let bodyContent = {[payload.isSkipped ? 'obskipdocument' : 'obapplicantdocuments']:payload};
      httpRequest.addHeaderParamter("serviceCode", this._activeSpaceInfoService.serviceCode);
      httpRequest.setBody(bodyContent);
      httpRequest.setContextPath('Customers');
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }
 
  findByKey(key: FaceTecInfo): FindByKeyFn<FaceTecInfo> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/facetechreq/{appRef}');
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
      httpRequest.setResource('/facetechreq/{appRef}');
       httpRequest.addPathParameter('appRef', payload.appRef);
     httpRequest.setMethod('PUT');
      let bodyContent = {"facetechreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }
  
  
 findAll(criteriaQuery: CriteriaQuery): FindAllFn<FaceTecInfo[]> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/facetechreq');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(
          map(
            (res: IHttpSuccessPayload<FaceTecInfoMaintanence>) =>
              res.body.facetechreq
          )
        );
    };
  }
  
   
     lookup(key: any): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/facetechreq');
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

  fetchFacetecConfig():Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/facetecconfig');
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Customers');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res:any)=>
      res.body.facetecconfig
      )
    );
  }
}
