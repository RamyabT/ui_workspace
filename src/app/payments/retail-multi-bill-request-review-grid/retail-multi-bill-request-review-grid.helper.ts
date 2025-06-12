import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus } from "@angular/forms";
import { APPCONSTANTS } from "@dep/constants";
import { AppConfigService } from "@dep/services";
import { BaseFpxGridComponentState, BaseFpxGridHelper } from "@fpx/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  BaseFpxGridChangeHandler,
  SpinnerService,
} from "@fpx/core";
export class RetailMultiBillRequestReviewGridState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;
	paymentDate:any={
	   minDate:"",
       maxDate:"",
     }
     totalBillAmount: any = {
      isCurrEditable: false,
      CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
      amountInWords: false,
      initCurrency: APPCONSTANTS.baseCurrency,
      defaultFetch: false,
    }
    paymentEndDate: any = {
      minDate: "",
      maxDate: "",
    }
   }

@Injectable()
export class RetailMultiBillRequestReviewGridHelper extends BaseFpxGridHelper<RetailMultiBillRequestReviewGridState> {
  multiBillPaymentRequest: any;
  constructor(private _appConfig: AppConfigService) {
    super(new RetailMultiBillRequestReviewGridState());
  }
  
  public getGridWidth(): number {
    return 100;
  }
  		    	 
  		  	 
  public getGridColumnWidth(): number[] {
    return  [15,40,40,15];
  }
  override doPreInit(): void {
  }
  
  override doPostInit(): void {
  }  
  
  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
  
}

 
 
