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
import { UserccrestrictionreqService } from '../userccrestrictionreq-service/userccrestrictionreq.service';
import { Userccrestrictionreq } from '../userccrestrictionreq-service/userccrestrictionreq.model';
import { UserAuthService } from "@dep/services";
export class RetailUserccrestrictionreqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	cardRef:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	inquiryAllowed:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	requestAllowed:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	transactionAllowed:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	approvalRequired:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class RetailUserccrestrictionreqFormHelper extends BaseFpxFormHelper<RetailUserccrestrictionreqFormState>{

   constructor( private retailUserccrestrictionreqFormService: UserccrestrictionreqService,
     private _httpProvider : HttpProviderService,
     private _router: Router,
     public userAuth: UserAuthService) 
    {
        super(new RetailUserccrestrictionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCCDELEGATE");
 }

 public handleFormOnLoad() {
  
  let customerCode = this.userAuth.getAuthorizationAttr('CustomerCode');
  this.creditCardRestriction(customerCode);
 };

 creditCardRestriction(customerCode: string) {
  const httpRequest = new HttpRequest();
  httpRequest.setMethod("GET");
  httpRequest.setResource("/creditcard");
  httpRequest.addHeaderParamter("ServiceCode", "RETAILCCSUMMARY");
  httpRequest.addQueryParameter("customerCode", customerCode?.toString());
  this._httpProvider.invokeRestApi(httpRequest).subscribe(
    (ccRes) => {
      console.log(customerCode);
      if (ccRes) {

        this.formGroup.get("userccrestriction")?.setValue(ccRes.body.creditcard);

        return;
      }
    });
}
   

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Userccrestrictionreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Userccrestrictionreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userccrestrictionreq.tenantId.inventoryNumber.userId.customerCode.cardRef,
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
 

