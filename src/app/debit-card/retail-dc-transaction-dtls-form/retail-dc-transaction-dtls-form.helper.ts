import { Injectable, inject } from "@angular/core";
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
import { DctransactiondtlsService } from '../dctransactiondtls-service/dctransactiondtls.service';
import { Dctransactiondtls } from '../dctransactiondtls-service/dctransactiondtls.model';
import { AppConfigService } from "@dep/services";
export class RetailDcTransactionDtlsFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	valueDate:any={
	   minDate:"",
       maxDate:"",
     }
	transactionDate:any={
	   minDate:"",
       maxDate:"",
     }
	transactionAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	balance:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
}


@Injectable()
export class RetailDcTransactionDtlsFormHelper extends BaseFpxFormHelper<RetailDcTransactionDtlsFormState>{

   constructor( private retailDcTransactionDtlsFormService: DctransactiondtlsService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailDcTransactionDtlsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILDCTRANSACTIONDTLS");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Dctransactiondtls):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Dctransactiondtls){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.dctransactiondtls.transactionReference,
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
 
 
