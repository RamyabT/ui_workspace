import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { FxratesService } from '../fxrates-service/fxrates.service';
import { Fxrates } from '../fxrates-service/fxrates.model';
export class RetailFXRatesFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class RetailFXRatesFormHelper extends BaseFpxFormHelper<RetailFXRatesFormState>{

   constructor( private retailFXRatesFormService: FxratesService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailFXRatesFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILFXRATESFORM");
 }
   

  public override doPostInit(): void {
    this.removeShellBtn('BACK');

  }
  
 
  public override preSubmitInterceptor(payload: Fxrates):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Fxrates){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.fxrates.fromCurrency.toCurrency,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
