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
import { UserrestrictionreqService } from '../userrestrictionreq-service/userrestrictionreq.service';
import { Userrestrictionreq } from '../userrestrictionreq-service/userrestrictionreq.model';
import { UserAuthService } from "@dep/services";
export class RetailUserrestrictionreqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class RetailUserrestrictionreqFormHelper extends BaseFpxFormHelper<RetailUserrestrictionreqFormState>{

   constructor( private retailUserrestrictionreqFormService: UserrestrictionreqService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
    public userAuth: UserAuthService
  ) 
    {
        super(new RetailUserrestrictionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILDELEGATEUSER");
 }

 public handleFormOnLoad() {

 
};

public handleFormOnPresubmit(payload: any) {
  let usId = this.userAuth.getAuthorizationAttr('UserId');
   payload.userId = usId;
}
   

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Userrestrictionreq):any {
     // WRITE CODE HERE TO HANDLE 
     this.handleFormOnPresubmit(payload);
     this.delegateUser;
     return payload;
  }
  
  delegateUser(payload:any) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("POST");
    httpRequest.setResource("/delegateusers");
    httpRequest.addHeaderParamter("ServiceCode", "RETAILDELEGATEUSER");
    let bodyContent = {"delegateusers":payload};
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest);
  }
  
  
 public override postDataFetchInterceptor(payload: Userrestrictionreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.userrestrictionreq.inventoryNumber,
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
      let res = response.success?.body?.userrestrictionreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    } 
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

