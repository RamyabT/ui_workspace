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
import { CcCancelService } from '../ccCancel-service/ccCancel.service';
import { CcCancel } from '../ccCancel-service/ccCancel.model';
export class retailccCancelformState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	terms:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	FieldId_5:any={
	 text:" Sample Text"
	}
}


@Injectable()
export class retailccCancelformHelper extends BaseFpxFormHelper<retailccCancelformState>{

   constructor( private retailccCancelformService: CcCancelService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new retailccCancelformState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCCCANCEL");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: CcCancel):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: CcCancel){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.ccCancel.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.ccCancel;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    } else if (response.error) {
      let error = response.error.error;
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
 
 
