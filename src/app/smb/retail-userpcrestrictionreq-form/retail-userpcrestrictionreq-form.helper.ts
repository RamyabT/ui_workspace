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
import { UserpcrestrictionreqService } from '../userpcrestrictionreq-service/userpcrestrictionreq.service';
import { Userpcrestrictionreq } from '../userpcrestrictionreq-service/userpcrestrictionreq.model';
import { UserAuthService } from "@dep/services";
export class RetailUserpcrestrictionreqFormState extends BaseFpxComponentState {
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
export class RetailUserpcrestrictionreqFormHelper extends BaseFpxFormHelper<RetailUserpcrestrictionreqFormState>{

   constructor( private retailUserpcrestrictionreqFormService: UserpcrestrictionreqService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
    public userAuth: UserAuthService) 
    {
        super(new RetailUserpcrestrictionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILPCDELEGATE");
 }
   
 public handleFormOnLoad() {
  
  let customerCode = this.userAuth.getAuthorizationAttr('CustomerCode');
  this.prepaidCardRestriction(customerCode);
 };

 prepaidCardRestriction(customerCode: string) {
  const httpRequest = new HttpRequest();
  httpRequest.setMethod("GET");
  httpRequest.setResource("/ppCard");
  httpRequest.addHeaderParamter("ServiceCode", "RETAILPCSUMMARY");
  httpRequest.addQueryParameter("customerCode", customerCode?.toString());
  this._httpProvider.invokeRestApi(httpRequest).subscribe(
    (pcRes) => {
      console.log(customerCode);
      if (pcRes) {

        this.formGroup.get("userpcrestriction")?.setValue(pcRes.body.prepaidcard);
        return;
      }
    });
}

  public override doPostInit(): void {
    this.handleFormOnLoad();

  }
  
 
  public override preSubmitInterceptor(payload: Userpcrestrictionreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Userpcrestrictionreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userpcrestrictionreq.tenantId.inventoryNumber.userId.customerCode.cardRef,
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
 

