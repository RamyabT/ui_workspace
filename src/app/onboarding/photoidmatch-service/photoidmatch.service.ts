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
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoIdMatch, PhotoIdMatchMaintanence } from './photoidmatch.model';
@Injectable()
export class PhotoIdMatchService implements BaseFpxDataService<any> {
    nfcCount:number = 2;
    resultDetails: any;
    status: any;
    dob: any;
    extractedData:any
  cardNo:any;
  name:any;
  dobEid:any;
  dateOfExpiration:any;
    constructor(private _httpProvider: HttpProviderService) { }
    create(payload: PhotoIdMatch): CreateFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setMethod('POST');
            httpRequest.setResource('/personalinfo');
            let bodyContent = { "personalinfo": payload };
            httpRequest.setBody(bodyContent);
            httpRequest.setContextPath('Customers');
            // return this._httpProvider.invokeRestApi(httpRequest);
            return of({});
        };
    }

    findByKey(key: PhotoIdMatch): FindByKeyFn<PhotoIdMatch> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setResource('/personalinfo/{appRef}');
            httpRequest.addPathParameter('appRef', key.appRef);
            httpRequest.setMethod('GET');
            return this._httpProvider
                .invokeRestApi(httpRequest)
                .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.personalinfo ?? null));

        };
    }

    modify(payload: PhotoIdMatch): ModifyFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setResource('/personalinfo/{appRef}');
            httpRequest.addPathParameter('appRef', payload.appRef);
            httpRequest.setMethod('PUT');
            let bodyContent = { "personalinfo": payload };
            httpRequest.setBody(bodyContent);
            return this._httpProvider.invokeRestApi(httpRequest);
        };
    }


    findAll(criteriaQuery: CriteriaQuery): FindAllFn<PhotoIdMatch[]> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setResource('/personalinfo');
            httpRequest.setMethod('GET');
            httpRequest.setCriteriaQuery(criteriaQuery);
            return this._httpProvider
                .invokeRestApi(httpRequest)
                .pipe(
                    map(
                        (res: IHttpSuccessPayload<PhotoIdMatchMaintanence>) =>
                            res.body.personalinfo
                    )
                );
        };
    }

    lookup(key: any): LookUpFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setMethod('GET');
            httpRequest.setResource('/personalinfo');
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
