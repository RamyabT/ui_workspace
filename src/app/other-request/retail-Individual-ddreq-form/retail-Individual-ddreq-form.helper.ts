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
import { formatDate } from "@angular/common";
export class RetailIndIndividualsDDReqFormState extends BaseFpxComponentState {
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
	terms:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class RetailIndIndividualsDDReqFormHelper extends BaseFpxFormHelper<RetailIndIndividualsDDReqFormState>{

   constructor( private retailIndIndividualsDDReqFormService: BusinessddreqService, private _httpProvider : HttpProviderService,private _router: Router,
    private userService:CustomerService,
   ) 
    {
        super(new RetailIndIndividualsDDReqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILINDIVIDUALDDREQ");
 }
   
 public handleFormOnLoad(){
  this.userService
  .fetchCustomer(sessionStorage.getItem('customerCode'))
  .subscribe((res) => {
        if (res) {
          this.setValue('lastName', res.lastName);
          this.setValue('dob', res.dob);
          this.setValue('dob', formatDate(res.dob, 'yyyy-MM-dd', 'en-US'));
          this.setValue('firstName', res.firstName);

        }})

  this.setReadonly('lastName',true);
  this.setReadonly('firstName',true);
  this.setReadonly('dob',true);
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
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

