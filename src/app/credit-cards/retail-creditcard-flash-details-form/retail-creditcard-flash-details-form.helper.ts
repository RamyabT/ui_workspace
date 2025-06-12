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
import { AppConfigService } from "@dep/services";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { CreditcardService } from "../creditcard-service/creditcard.service";
import { CreditcardDetailsService } from "../creditcard-details-service/creditcard-details.service";
import moment from "moment";
import { CurrencyPipe } from "@angular/common";
export class retaildebitcardformState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
   creditLimit:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	validThru:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
    validFrom:any={
    minDate: new Date("01-07-2023"),
      maxDate: new Date("31-07-2023"),
    }
	issueDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
	overDueAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	outstandingAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	lastPaymentReceived:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	FieldId_1:any={
	 text:" Sample text"
	}
	FieldId_3:any={
	 text:" Sample text"
	}
  cardData: Creditcard | undefined;
}


@Injectable()
export class RetailCreditcardFlashDetailsFormHelper extends BaseFpxFormHelper<retaildebitcardformState>{
  creditcardDetails: any;
  result: any;
   constructor( private retailcreditcardformService: CreditcardService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService,
    private _creditcardDetailsService: CreditcardDetailsService,
    public currency: CurrencyPipe
    
   ) 
    {
        super(new retaildebitcardformState());
    }
   
  override doPreInit(): void {
//  this.setServiceCode("RETAILDCSUMMARY");
this.removeShellBtn("BACK");
 this.state.cardData = this._appConfig.getData('creditCardData');
 this.setValue('cardRefNumber',this.state.cardData?.cardRefNumber)

 let key: any ={
  inventoryNumber: this.getRoutingParam("inventoryNumber")
}
 this._creditcardDetailsService.getFlashCardDetails(key).subscribe({
  next:(value)=> {
    console.log(value);
    this.state.cardData = {
      ...this.state?.cardData,
      ...value
    };
  },
  error:(value)=> {
    
  },
 })
 this.setValue('cardRefNumber',this.state.cardData?.cardRefNumber)

 }
   

  public override doPostInit(): void {
    let key: any ={
      cardRefNumber: this.state.cardData?.cardRefNumber
    }
    this.retailcreditcardformService.findByKey(key)().subscribe(res =>{
      console.log("Debitcard service", res)
          this.creditcardDetails = res;
          this.setValue('cardCategory',this.creditcardDetails.cardCategory);
        // this.setValue('cardType',this.creditcardDetails.cardType);
        this.setValue('validFrom',this.creditcardDetails.validFrom);
        // this.setValue("validThru", this.creditcardDetails.validThru);
        this.setValue('currency',this.creditcardDetails.accountCurrency);

      // this.setValue("cardRefNumber", this.creditcardDetails.cardRefNumber);
      if (this.creditcardDetails.issueDate) {
        let issueDate: any = moment(this.creditcardDetails.issueDate).format('YYYY-MM-DD');
        this.setValue('issueDate', issueDate);
      }
      //this.setValue("issueDate", this.creditcardDetails.issueDate);
      this.setValue("branchDesc", this.creditcardDetails.branchDesc);
      // this.setValue("accountNumber", this.creditcardDetails.linkedBankAccount);
      // this.setValue("cardHolderName", this.creditcardDetails.cardHolderName);
      // this.setValue('accountType',this.creditcardDetails.accountTypeDesc);
      let overDueAmount = this.currency.transform(this.creditcardDetails.totalDueAmount, this.creditcardDetails.accountCurrency + ' ');
      this.setValue('totalDueAmount', overDueAmount);

      let outstandingAmount = this.currency.transform(this.creditcardDetails?.outstandingAmount, this.creditcardDetails.accountCurrency + ' ');
      this.setValue('outstandingAmount', outstandingAmount);
      if (this.creditcardDetails.dueDate) {
        let dueDate: any = moment(this.creditcardDetails.dueDate).format('YYYY-MM-DD');
        this.setValue('dueDate', dueDate);
      }

      let lastPaymentReceived = this.currency.transform(this.creditcardDetails.lastPaymentReceived, this.creditcardDetails.accountCurrency + ' ');
      this.setValue('lastPaymentReceived', lastPaymentReceived);
      if (this.creditcardDetails.lastPaymentDate) {
        let lastPaymentDate: any = moment(this.creditcardDetails.lastPaymentDate).format('YYYY-MM-DD');
        this.setValue('lastPaymentDate', lastPaymentDate);
      }
      this.formGroup.updateValueAndValidity();
    })
  }
  
 
  public override preSubmitInterceptor(payload: any):any {
     // WRITE CODE HERE TO HANDLE 
    payload = {
      cardReference: payload.cardRefNumber
    }
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Creditcard){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.flashdebitcardrequest;
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
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response,routingInfo);
      return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
