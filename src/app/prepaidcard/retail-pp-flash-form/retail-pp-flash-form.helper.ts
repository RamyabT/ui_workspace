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
import { FlashprepaidcardrequestService } from '../flashprepaidcardrequest-service/flashprepaidcardrequest.service';
import { Flashprepaidcardrequest } from '../flashprepaidcardrequest-service/flashprepaidcardrequest.model';
export class RetailFlashPrepaidCardRequestFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	   cvv:any={
	    visibilityChange:  false,
 		autoComplete: false,
	   } 
	validThru:any={
	   minDate:"",
       maxDate:"",
     }
}


@Injectable()
export class RetailFlashPrepaidCardRequestFormHelper extends BaseFpxFormHelper<RetailFlashPrepaidCardRequestFormState>{

   constructor( private retailFlashPrepaidCardRequestFormService: FlashprepaidcardrequestService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailFlashPrepaidCardRequestFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILPPFLASHFORM");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Flashprepaidcardrequest):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Flashprepaidcardrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.flashprepaidcardrequest.inventoryNumber,
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
 
 
