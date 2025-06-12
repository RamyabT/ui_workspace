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
import { InvalidatenpssService } from '../invalidatenpss-service/invalidatenpss.service';
import { Invalidatenpss } from '../invalidatenpss-service/invalidatenpss.model';
export class RetailInvalidNpssState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	FieldId_1:any={
	 text:" Sample Text"
	}
}


@Injectable()
export class RetailInvalidNpssHelper extends BaseFpxFormHelper<RetailInvalidNpssState>{

   constructor( private retailInvalidNpssService: InvalidatenpssService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailInvalidNpssState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILINVALIDATENPSS");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Invalidatenpss):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Invalidatenpss){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
    console.log(response)
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.invalidatenpss
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        }
      });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
