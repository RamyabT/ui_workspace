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
import { BusinessddreqService } from '../businessddreq-service/businessddreq.service';
import { Businessddreq } from '../businessddreq-service/businessddreq.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
export class RetailBusinessDDReqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	dob:any={
	   minDate:"",
       maxDate:"",
     }
	amount:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class RetailBusinessDDReqFormHelper extends BaseFpxFormHelper<RetailBusinessDDReqFormState>{

   constructor( private retailBusinessDDReqFormService: BusinessddreqService, private _httpProvider : HttpProviderService,private _router: Router,
    private userService:CustomerService,
   ) 
    {
        super(new RetailBusinessDDReqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILBUSINESSDDREQ");
 }
   
 public handleFormOnLoad(){
  this.userService
  .fetchCustomer(sessionStorage.getItem('customerCode'))
  .subscribe((res) => {
        if (res) {
          this.setValue('companyName', res.organizationName);
         

        }})

  this.setReadonly('companyName',true);
 
 }
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Businessddreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Businessddreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.businessddreq;
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
  //       transRef: response.success?.body?.businessddreq,
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
 

