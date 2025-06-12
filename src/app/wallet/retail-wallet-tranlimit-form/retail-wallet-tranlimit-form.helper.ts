import { inject, Injectable } from "@angular/core";
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
import { WallettranlimitService } from '../wallettranlimit-service/wallettranlimit.service';
import { Wallettranlimit } from '../wallettranlimit-service/wallettranlimit.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class RetailWalletTransactionLimitFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
   accordionToggle:boolean = false;
   onlinePurchaseLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
   // currencyCode: this._appConfig.baseCurrency,
   currencyCode: 'USD',
  };
  scanPayLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
   // currencyCode: this._appConfig.baseCurrency,
   currencyCode: 'USD',
  };
  serviceFlag: any = {
    ckValues: { checked: "1", unchecked: "0" },
  };
}


@Injectable()
export class RetailWalletTransactionLimitFormHelper extends BaseFpxFormHelper<RetailWalletTransactionLimitFormState>{

   constructor( private retailWalletTransactionLimitFormService: WallettranlimitService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService
   ) 
    {
        super(new RetailWalletTransactionLimitFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILWALLETLIMIT");
 this.addValueChangeHandler("onlinePurchaseFlag", this.handleonlinePurchaseFlagOnvalueChange);
 this.addValueChangeHandler("scanPayFlag", this.handlescanPayFlagOnvalueChange);
 }

 public handleonlinePurchaseFlagOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if(value == '1') {
    this.setHidden('onlinePurchaseLimit', false);
  }
  else {
    this.setHidden('onlinePurchaseLimit', true);
  }
  this.formGroup.updateValueAndValidity();
};


public handlescanPayFlagOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if(value == '1') {
    this.setHidden('scanPayLimit', false);
  }
  else {
    this.setHidden('scanPayLimit', true);
  }
  this.formGroup.updateValueAndValidity();
};
 personalInfoToggleAccordion(){
  this.state.accordionToggle=!this.state.accordionToggle;
  this.setHidden('firstName', this.state.accordionToggle);
  this.setHidden('dob',this.state.accordionToggle);
  this.setHidden('lastName',this.state.accordionToggle);
  this.setHidden('email',this.state.accordionToggle);
  this.setHidden('mobileNumber',this.state.accordionToggle);
  this.setHidden('addressLine1', this.state.accordionToggle);
  this.setHidden('addressLine2',this.state.accordionToggle);
  this.setHidden('state',this.state.accordionToggle);
  this.setHidden('dob',this.state.accordionToggle);
  this.setHidden('city',this.state.accordionToggle);
  this.setHidden('zipcode',this.state.accordionToggle);
} 


public handleFormOnLoad(){

  let productCode=this.setValue('productCode','056');
  this.retailWalletTransactionLimitFormService
  .fetchWalletLimits(productCode)
  .subscribe((res) => {
    this.setValue('scanPayFlag', res.Product.scanpayFlag);
    this.setValue('scanPayLimit', res.Product.scanpayAmount);
    this.setValue('onlinePurchaseFlag', res.Product.onlPurFlag);
    this.setValue('onlinePurchaseLimit', res.Product.onlPurAmount);
    this.state.onlinePurchaseLimit.max= res.Product.onlPurMaxAmount;
    this.state.onlinePurchaseLimit.min= res.Product.onlPurMinAmount;
    this.state.scanPayLimit.max= res.Product.scanpayMaxAmount;
    this.state.scanPayLimit.min= res.Product.scanpayMinAmount;
})}


  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Wallettranlimit):any {
     // WRITE CODE HERE TO HANDLE 
     let walletPayload= this._appConfig.getData('RETAILWALLETLIMIT');
     payload={...walletPayload,
        ...payload
     }
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Wallettranlimit){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.wallettranlimit;
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
  //       transRef: response.success?.body?.wallettranlimit.tenantId.inventoryNumber,
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
 

