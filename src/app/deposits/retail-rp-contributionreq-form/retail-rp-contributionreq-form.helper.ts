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
import { RpcontributionreqService } from '../rpcontributionreq-service/rpcontributionreq.service';
import { Rpcontributionreq } from '../rpcontributionreq-service/rpcontributionreq.model';
import { AppConfigService } from "@dep/services";
export class RetailRpContributionreqFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	// debitAmount:any={
	//   isCurrEditable: false,
	//   CurrencyList: [],
	//    amountInWords : false,
	//    initCurrency : '',
	//    defaultFetch : false,
	// }
  debitAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
	creditAmount:any={
	  isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
	}
  amount:any={
	  isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
	}
	charges:any={
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
	}
}


@Injectable()
export class RetailRpContributionreqFormHelper extends BaseFpxFormHelper<RetailRpContributionreqFormState>{

   constructor( private retailRpContributionreqFormService: RpcontributionreqService, 
    private _httpProvider : HttpProviderService,private _router: Router,
      private _appConfig: AppConfigService
   ) 
    {
        super(new RetailRpContributionreqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILRPCONTRIBUTION");
 }
   

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Rpcontributionreq):any {
     // WRITE CODE HERE TO HANDLE 
     payload.charges=this.getValue('charges').amount;
     payload.amount=this.getValue('amount').amount;
     payload.debitAmount=this.getValue('amount').amount;
     payload.creditAmount=this.getValue('amount').amount;
    return payload;
  }
  
  public handleFormOnLoad() {
   // this.setHidden('infoNote', false);
    this.setValue('charges', {
      amount: 0,
      currencyCode: this._appConfig.baseCurrency
    });
    this.setReadonly('charges', true);
  }

 public override postDataFetchInterceptor(payload: Rpcontributionreq){
   // WRITE CODE HERE TO HANDLE 
   
  return payload;
}

public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.rpcontributionreq;
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
  //       transRef: response.success?.body?.rpcontributionreq.tenantId.inventoryNumber,
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
 

