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
import { DepositCalculatorService } from '../depositCalculator-service/depositCalculator.service';
import { DepositCalculator } from '../depositCalculator-service/depositCalculator.model';
import { AppConfigService } from "@dep/services";
export class RetailDepositCalculatorFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	amount:any;
  depositProductData:any;
}


@Injectable()
export class RetailDepositCalculatorFormHelper extends BaseFpxFormHelper<RetailDepositCalculatorFormState>{

   constructor( 
    private retailDepositCalculatorFormService: DepositCalculatorService,
     private _httpProvider : HttpProviderService,
     private _router: Router,
     private _appConfig: AppConfigService
   ) 
    {
        super(new RetailDepositCalculatorFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILDEPOSITCALCULATOR");
    this.setDropdownInitialData('depositProducts');
 let currencyCode = 

 this.state.amount={
  isCurrEditable: false,
  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
   amountInWords : false,
   initCurrency : this._appConfig.baseCurrency,
   defaultFetch : false,
};
 }
   

  public override doPostInit(): void {
    this.addControlEventHandler('depositProductsDataReceived', this.ondepositProductsDataRecieved);
  
  }
  public ondepositProductsDataRecieved: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    // WRITE CODE HERE TO HANDLE
    if (payload) {
      this.state.depositProductData=payload;
      this.state.depositProductData.minimumUnits = payload.depositparameters.minimumUnits;
      let i = this.state.depositProductData.minimumUnits;
      this.reset('tenure', true);
      let data = []
      if (this.state.depositProductData.tenorUnit == "M") {

        for (i; i <= payload.depositparameters.maximumUnits; i++) {
          if (i == 1) {
            data.push({ id: String(i), text: i + ' Month' })
          }
          else {
            data.push({ id: String(i), text: i + ' Months' })
          }
        }
      }
      else {
        for (i; i <= payload.depositparameters.maximumUnits; i++) {

          if (i == 1) {
            data.push({ id: String(i), text: i + ' Year' })
          }
          else {
            data.push({ id: String(i), text: i + ' Years' })
          }

        }
      }
      this.setStaticDropdown('tenure', data)
    }
  }
  
 
  public override preSubmitInterceptor(payload: DepositCalculator):any {
     // WRITE CODE HERE TO HANDLE 
    this._appConfig.setData('depositCalculatorData',payload);
    let amount=payload.amount.amount;
    payload.amount=amount;
    payload.depositdate=this._appConfig.getCBD();
    // payload.tenure=this._appConfig.getCBD();
    if(this.state.depositProductData.depositparameters.tenorUnit='M'){
      payload.tenure=payload.tenure;
    }
    else if(this.state.depositProductData.depositparameters.tenorUnit='D'){
      payload.tenorInDays=payload.tenure;
    }
    else if(this.state.depositProductData.depositparameters.tenorUnit='Y'){
      payload.tenorInYears=payload.tenure;
    }
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: DepositCalculator){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      this._appConfig.setData('depositBreakUpData',response.success.body);
      setTimeout(() => {
        this._router.navigate(['tools-space','display-shell','tools-calculator','retail-deposit-breakup']);
        }, 500);
      routingInfo.setQueryParams({
        transRef: response.success?.body?.depositCalculator.depositProducts,
        status: "success",
      });
    } else if (response.error) {

      let error = response?.error?.error;
      this._appConfig.setData('depositcalculatorError',response.error);
      routingInfo.setQueryParams({
        requestPayload: error,
        serviceCode: this.serviceCode?.value
      });
      // routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

