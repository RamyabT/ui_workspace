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
import { UserdeprestrictionreqService } from '../userdeprestrictionreq-service/userdeprestrictionreq.service';
import { Userdeprestrictionreq } from '../userdeprestrictionreq-service/userdeprestrictionreq.model';
import { UserAuthService } from "@dep/services";
export class RetailUserdeprestrictionreqFormState extends BaseFpxComponentState {
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
export class RetailUserdeprestrictionreqFormHelper extends BaseFpxFormHelper<RetailUserdeprestrictionreqFormState>{

   constructor( private retailUserdeprestrictionreqFormService: UserdeprestrictionreqService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
  public userAuth: UserAuthService) 
    {
        super(new RetailUserdeprestrictionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILDEPDELEGATE");
 }
   
 public handleFormOnLoad() {
 
  let customerCode = this.userAuth.getAuthorizationAttr('CustomerCode');
  this.depositRestriction(customerCode);
 };

 depositRestriction(customerCode: string) {
  const httpRequest = new HttpRequest();
  httpRequest.setMethod("GET");
  httpRequest.setResource("/deposits");
  httpRequest.addHeaderParamter("ServiceCode", "RETAILDEPOSITSUMMARY");
  httpRequest.addQueryParameter("customerCode", customerCode?.toString());
  this._httpProvider.invokeRestApi(httpRequest).subscribe(
    (depRes) => {
      console.log(customerCode);
      if (depRes) {
        for (let i = 0; i < depRes.body?.deposits?.termDeposits?.product.length; i++) {
          this.formGroup.get("userdeprestriction")?.setValue(depRes.body?.deposits?.termDeposits?.product[i]?.accountDetails);

          return;
        }
      }
    });
}


  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Userdeprestrictionreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Userdeprestrictionreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userdeprestrictionreq.tenantId.inventoryNumber.userId.customerCode.accountNumber,
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
 

