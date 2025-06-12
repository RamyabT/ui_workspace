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
import { UserloanrestrictionreqService } from '../userloanrestrictionreq-service/userloanrestrictionreq.service';
import { Userloanrestrictionreq } from '../userloanrestrictionreq-service/userloanrestrictionreq.model';
import { UserAuthService } from "@dep/services";
export class RetailUserloanrestrictionreqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
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
export class RetailUserloanrestrictionreqFormHelper extends BaseFpxFormHelper<RetailUserloanrestrictionreqFormState>{

   constructor( private retailUserloanrestrictionreqFormService: UserloanrestrictionreqService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
    public userAuth: UserAuthService) 
    {
        super(new RetailUserloanrestrictionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANDELEGATE");
 }

 public handleFormOnLoad() {
 
  let customerCode = this.userAuth.getAuthorizationAttr('CustomerCode');
  this.loanRestriction(customerCode);
 };

 loanRestriction(customerCode: string) {
  const httpRequest = new HttpRequest();
  httpRequest.setMethod("GET");
  httpRequest.setResource("/loans");
  httpRequest.addHeaderParamter("ServiceCode", "RETAILLOANSUMMARY");
  httpRequest.addQueryParameter("customerCode", customerCode?.toString());
  this._httpProvider.invokeRestApi(httpRequest).subscribe(
    (loanRes) => {
      console.log(customerCode);
      if (loanRes) {

        this.formGroup.get("userloanrestriction")?.setValue(loanRes.body.loans);

        return;
      }
    });
}
   

  public override doPostInit(): void {
    this.handleFormOnLoad();

  }
  
 
  public override preSubmitInterceptor(payload: Userloanrestrictionreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Userloanrestrictionreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userloanrestrictionreq.tenantId.inventoryNumber.userId.customerCode.accountNumber,
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
 

