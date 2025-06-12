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
import { WalletregistrationService } from '../walletregistration-service/walletregistration.service';
import { Walletregistration } from '../walletregistration-service/walletregistration.model';
export class WalletRegFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class WalletRegFormHelper extends BaseFpxFormHelper<WalletRegFormState>{
  walletRegistration!: FormGroup;
  wallettranlimit!: FormGroup;

   constructor( private walletRegFormService: WalletregistrationService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new WalletRegFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILWALLETREG");
 }
   

  public override doPostInit(): void {
    this.walletRegistration = this.formGroup.get("walletregistration") as FormGroup;
    this.wallettranlimit = this.formGroup.get("wallettranlimit") as FormGroup;
  }
  
 
  public override preSubmitInterceptor(payload: Walletregistration):any {
     // WRITE CODE HERE TO HANDLE 
    //  let walletregistration = payload.wallettranlimit
    payload.walletregistration.wallettranlimit = payload.wallettranlimit
    payload = payload.walletregistration
    
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Walletregistration){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.walletregistration;
    routingInfo.setQueryParams({
      response: res
    });
  } else if (response.error) {
    let error = response.error.error;
    routingInfo.setQueryParams({
      response: error,
      serviceCode: this.serviceCode.value
    });
  }
  return response;
}
public override postSubmitInterceptor(response: any): RoutingInfo {
  console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response, routingInfo);
  return routingInfo;
}

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.walletregistration.tenantId.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

