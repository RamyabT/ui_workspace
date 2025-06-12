import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable()
export class FavouriteBeneficiariesValidator {
    constructor(
      private _httpProvider: HttpProviderService){
    }
    favouriteBeneficiaries():Observable<any> {
        const httpRequest = new HttpRequest();
  
         httpRequest.setResource("/favouritebeneficiaries");
         httpRequest.setMethod("GET");
         httpRequest.setContextPath('Payments');
         return this._httpProvider
         .invokeRestApi(httpRequest)
         .pipe(map((res: IHttpSuccessPayload<any>) => res.body.favouritebeneficiaries ?? null),catchError((err:any) => {
           return of(err ?? null)
         })
         );
        }
         
        
    unFavouriteBeneficiaries(inventoryNumber:any):Observable<any> {
         const httpRequest = new HttpRequest();
            let payload:any={
                inventoryNumber:inventoryNumber,
                isFavourite:0
            }
            httpRequest.setContextPath('Payments');
            httpRequest.setResource('/beneficiaries/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"beneficiaries":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest);
      }

      markAsfavouriteBeneficiaries(inventoryNumber:any):Observable<any> {
        const httpRequest = new HttpRequest();
           let payload:any={
               inventoryNumber:inventoryNumber,
               isFavourite:1
           }
           httpRequest.setResource('/beneficiaries/{inventoryNumber}');
           httpRequest.setContextPath('Payments');
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
    httpRequest.setMethod('PUT');
     let bodyContent = {"beneficiaries":payload};
     httpRequest.setBody(bodyContent);
     return this._httpProvider.invokeRestApi(httpRequest);
     }


}