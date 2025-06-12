import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable()
export class DeleteDelegateValidator {
    constructor(
      private _httpProvider: HttpProviderService){
    }
    
         
        deleteDelegate():Observable<any> {
            //   let userName = this.selectedData.userName;
                     const httpRequest = new HttpRequest();
                        let payload:any={
                            // userName:userName,
                            operationMode:"A"
                        }
                        httpRequest.setContextPath('Common');
                        httpRequest.setResource('/delegateuser');
                  //  httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
                 httpRequest.setMethod('POST');
                  let bodyContent = {"delegateuser":payload};
                  httpRequest.setBody(bodyContent);
                  return this._httpProvider.invokeRestApi(httpRequest);
                  }  


}