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
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
 import { Obapplicantsignature, ObapplicantsignatureMaintanence } from './obapplicantsignature.model';
@Injectable()
export class ObapplicantsignatureService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Obapplicantsignature,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/obapplicantsignature');
      let bodyContent = {"obapplicantsignature":payload};
      httpRequest.setBody(bodyContent);
      httpRequest.setContextPath('Customers');
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Obapplicantsignature,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Obapplicantsignature|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantsignature/{applicantId}');
       httpRequest.addPathParameter('applicantId', key.applicantId);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Customers');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.obapplicantsignature ?? null),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }

  modify(payload: Obapplicantsignature,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantsignature/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Customers');
      let bodyContent = {"obapplicantsignature":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   delete(payload: Obapplicantsignature,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantsignature/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('DELETE');
     httpRequest.setContextPath('Customers');
      let bodyContent = {"obapplicantsignature":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   patch(payload: Obapplicantsignature,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantsignature/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Customers');
      let bodyContent = {"obapplicantsignature":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ObapplicantsignatureMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantsignature');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Customers');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ObapplicantsignatureMaintanence>) =>{
             return{
              data:res.body?.obapplicantsignature || [],
              totalRowCount: res.body?.totalRowCount
              }
            }
          )
        );
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/obapplicantsignature');
    httpRequest.setContextPath('Customers');
    httpRequest.addQueryParameter('lookup', 1);
    if(criteriaQuery){
        criteriaQuery?.addFilterCritertia('text','String','contains',{
          searchText : key.searchText
        })
        httpRequest.setCriteriaQuery(criteriaQuery)
     }
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/obapplicantsignature/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Customers');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
  fileToBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  base64ToBlob(base64: string) {
    let sliceSize: number = 1024;
    let base64Data: any = base64.split(",");
    let b64Data = base64Data[1];
    let contentType = base64Data[0].match(/:(.*?);/)[1];
    const byteCharacters = atob(b64Data);

    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  scaleDownImage(base64: any, width: number = 768): Promise<any> {
    let mime = base64.split(",")[0].match(/:(.*?);/)[1];
    let height;

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        let canvas = document.createElement("canvas");
        let ratio = image.width / image.height;
        canvas.width = width;
        height = width / ratio;
        canvas.height = height;
        let context: any = canvas.getContext("2d");
        context.scale(width / image.width, height / image.height);
        context.drawImage(image, 0, 0);
        const newBase64Image = canvas.toDataURL(mime);

        resolve(newBase64Image);
      };
      image.onerror = (el, err) => {
        reject(err);
      };

      image.src = base64;
    });
  }
}
