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
import { UserdcrestrictionreqService } from '../userdcrestrictionreq-service/userdcrestrictionreq.service';
import { Userdcrestrictionreq } from '../userdcrestrictionreq-service/userdcrestrictionreq.model';
import { UserAuthService } from "@dep/services";
export class RetailUserdcrestrictionreqFormState extends BaseFpxComponentState {
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
export class RetailUserdcrestrictionreqFormHelper extends BaseFpxFormHelper<RetailUserdcrestrictionreqFormState>{

   constructor( private retailUserdcrestrictionreqFormService: UserdcrestrictionreqService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
    public userAuth: UserAuthService) 
    {
        super(new RetailUserdcrestrictionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILDCDELEGATE");
 }
   
 public handleFormOnLoad() {
 
  let customerCode = this.userAuth.getAuthorizationAttr('CustomerCode');
  this.debitCardRestriction(customerCode);
 };

 debitCardRestriction(customerCode: string) {
  const httpRequest = new HttpRequest();
  httpRequest.setMethod("GET");
  httpRequest.setResource("/debitcard");
  httpRequest.addHeaderParamter("ServiceCode", "RETAILDCSUMMARY");
  httpRequest.addQueryParameter("customerCode", customerCode?.toString());
  this._httpProvider.invokeRestApi(httpRequest).subscribe(
    (dcRes) => {
      console.log(customerCode);
      if (dcRes) {

        this.formGroup.get("userdcrestriction")?.setValue(dcRes.body.debitcard);

        return;
      }
    });
}

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Userdcrestrictionreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Userdcrestrictionreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userdcrestrictionreq.tenantId.inventoryNumber.userId.customerCode.cardRef,
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
 

