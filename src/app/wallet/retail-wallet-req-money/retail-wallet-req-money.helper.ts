import { Injectable, inject } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import { DatePipe, formatDate } from '@angular/common';
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
  FpxModal,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { WalletrequestmoneyService } from '../walletrequestmoney-service/walletrequestmoney.service';
import { Walletrequestmoney } from '../walletrequestmoney-service/walletrequestmoney.model';
import { MobileNumberSearchFormComponent } from "../mobile-number-search-form/mobile-number-search-form.component";
import { DeviceDetectorService } from "@dep/core";
export class RetailWalletReqMoneyFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
 chargesAmount: any = {
  isCurrEditable: false,
  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
  amountInWords: false,
  initCurrency: this._appConfig.baseCurrency,
  defaultFetch: true,
}
amount: any = {
  isCurrEditable: false,
  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
  amountInWords: false,
  initCurrency: this._appConfig.baseCurrency,
  defaultFetch: true,
}
senderName: string = '';
  senderInitial: string = '';
  charges:any;
  receivername: any;
  routeService: string='';
  requestDetails:any
}

@Injectable()
export class RetailWalletReqMoneyFormHelper extends BaseFpxFormHelper<RetailWalletReqMoneyFormState>{
  
  

   constructor( private retailWalletReqMoneyFormService: WalletrequestmoneyService, 
    
     private _appConfig: AppConfigService,
     private appConfigService: AppConfigService,
    private _httpProvider : HttpProviderService,private _router: Router,
  private _deviceDetectorService: DeviceDetectorService) 
    {
        super(new RetailWalletReqMoneyFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILWALLETREQMONEY");
 }
   

  public override doPostInit(): void {
    this.addValueChangeHandler("mobileNumber", this.handleMobileNumberOnValueChange);
    this.addControlEventHandler("toAccountDataReceived", this.ontoAccountDataReceived);
    this.addControlEventHandler("fromAccountDataReceived", this.onfromAccountDataReceived);
    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.handleFormOnLoad();
  }
  public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if(payload.totalChargeAmnBaseCurr){
    this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
    }
    else{
    this.setValue('chargesAmount', { amount: 5, currencyCode: this._appConfig.baseCurrency });
    this.state.charges = { amount: 5, currencyCode: this._appConfig.baseCurrency };
    }
}


 

  public ontoAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.senderName = payload.walletName;
      this.state.senderInitial = payload.walletName?.charAt(0);
    }
  }
  public onfromAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.receivername = payload.walletName;
    }
  }
  
searchMobileNumber() {
    let modal = new FpxModal();
    modal.setComponent(MobileNumberSearchFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "Search mobile number",
    });
    modal.setAfterClosed(this.onSelectMobileNumber);
    this.openModal(modal);
  }
  onSelectMobileNumber: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload) {
      this.setValue('mobileNumber', payload);
    }
  }

  public handleMobileNumberOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value && status == 'VALID') {
        let mobilenumber = {
          "walletAccInfo": {
            "mobileNumber": this.getValue('mobileNumber')
                  }
        };
        this.retailWalletReqMoneyFormService.mobileNumberValidator(mobilenumber).subscribe({
          next: (res : any) =>{ 
            console.log("res is:", res);
            this.setValue("toAccount",res.body.walletAccDetails.walletAccNum);
            this.setReadonly("toAccount",true)
          }})
         

       }

      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
    }
  }

  public override preSubmitInterceptor(payload: Walletrequestmoney):any {
     // WRITE CODE HERE TO HANDLE 
     payload.amount=this.getValue('amount').amount;
    payload.charges=this.getValue('chargesAmount').amount;
     payload.status="P";
    payload.requestDate= formatDate(this._appConfig.getCBD(), 'dd-MM-yy', 'en-US');
    payload.fromAccName =this.state.senderName;
    payload.toAccName = this.state.receivername;
     delete payload.chargesCur;
    return payload;
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE

  }
  public handleFormOnLoad() {
    this.setValue('walletCurr','CAD');
    this.setReadonly('walletCurr', true);
    this.setValue('chargesBorneBy','1');
    this.setHidden('chargesBorneBy',true);
    this.setHidden('chargesAmount',true);
    if (!this._deviceDetectorService.isMobile()) {
      this.setHidden('selectContact',true);
    }

    this.state.routeService = this.getRoutingParam('serviceCode');
  if(this._appConfig.hasData('RETAILWALLETREQUEST') && this.state.routeService == 'RETAILWALLETREQMONEY'){
    this.state.requestDetails=this._appConfig.getData('RETAILWALLETREQUEST');
    //this.state.requestDetails.paymentAmount={amount:this.state.requestDetails.paymentAmount,currencyCode:this.state.fromCurrencyVariable};
 
    this.formGroup.patchValue(this.state.requestDetails);
 
  }
  }
  override onReview(): void {
    this.setHidden('selectContact',true);
  }
  override backToEntryMode(): void {
    this.setHidden('selectContact',false);
  }

  
 public override postDataFetchInterceptor(payload: Walletrequestmoney){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.walletrequestmoney;
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
 

