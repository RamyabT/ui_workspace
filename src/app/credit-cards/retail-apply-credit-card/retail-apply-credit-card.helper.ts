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
import { ApplyCreditCardService } from '../applyCreditCard-service/applyCreditCard.service';
import { ApplyCreditCard } from '../applyCreditCard-service/applyCreditCard.model';
import { Ccaddonrequest } from "../ccaddonrequest-service/ccaddonrequest.model";
import { AppConfigService } from "@dep/services";
// import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';
export class RetailApplyCreditCardState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  creditCardLimit: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  income: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  monthlyLiabilityRepayment: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  charges: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
    email: "",
    mobile: ""
  }
  accountNumber: any;
}

@Injectable()
export class RetailApplyCreditCardHelper extends BaseFpxFormHelper<RetailApplyCreditCardState>{
  addressInfo! : FormGroup;

  constructor(private retailApplyCreditCardService: ApplyCreditCardService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService) {
    super(new RetailApplyCreditCardState());
  }

  override doPreInit(): void {
    this.setHidden('dlvryBranch', true);
 this.setServiceCode("RETAILAPPLYCREDITCARD");
 this.addResetHandler("reset",this.resetForm.bind(this));

 this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addControlEventHandler("accountNumberDataReceived", this.onDebitAccountDataReceived);
    this.addValueChangeHandler("deliveryOption", this.handleDlvryOptionOnvalueChange);
 this.addControlEventHandler('onCustomerDetailsDataReceived', this.handleCustomerDetailsDataReceived);
 }

  resetForm() {
    console.log(this.formGroup)
    this.reset('creditcardtype');
    this.reset('creditCardLimit', "");
    this.reset('supplementaryCard', "");
    this.reset('monthlyLiabilityRepayment', "");
    this.reset('income', "");
    this.reset('sourceOfIncome', "");
    this.reset('currency', "");
    this.reset('accountNumber', "");
    this.reset('termsFlag', "");
    this.reset('remarks', "");
    this.reset('charges', "");
    this.reset('deliveryOption', "");
    this.reset('lengthOfService', "");
    this.reset('reason', "");
    this.setValue('accountNumber', this.state.accountNumber);
    this.handleFormOnLoad();
  }

  public handleDlvryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      if (value == '2') {
        this.setHidden('branches', false);
        this.setHidden('addressInfo', true);
      }
      
      else {
      
        this.setHidden('branches', true);
        this.setHidden('addressInfo', false);
  
      }
    }
   
  }

  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

    if (payload) {
      if(payload.buildingId!=undefined && payload.buildingName!=undefined){
        this.state.addressInfo.buildingDetails = payload.buildingId + "," + payload.buildingName
      }
      if(payload.city!=undefined){
        this.state.addressInfo.cityDetails = payload.city
      }
      if(payload.countryName!=undefined){
       this.state.addressInfo.countryDetails = payload.countryName
      }
     if(payload.stateName!=undefined){
      this.state.addressInfo.stateDetails = payload.stateName
     }
     if(payload.pincode!=undefined){
      this.state.addressInfo.pinCode = payload.pincode
     }
      // this.state.addressInfo.mobile = payload.mobileNumber
      // this.state.addressInfo.emailId = payload.emailId
      
      this.setValue('addressInformation',this.state.addressInfo?.buildingDetails+","+this.state.addressInfo?.cityDetails+","+this.state.addressInfo?.stateDetails+","+this.state.addressInfo?.countryDetails+","+this.state.addressInfo?.pinCode);
    }
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('creditcardtype', '4');
    //this.setValue('reason', '4');
    this.setValue('supplementaryCard', '1');
    this.setValue('sourceOfIncome', '1');
    this.setValue('income', { currencyCode: this._appConfig.baseCurrency });
    this.setValue('creditCardLimit', { currencyCode: this._appConfig.baseCurrency });
    this.setValue('monthlyLiabilityRepayment', { currencyCode: this._appConfig.baseCurrency });
    this.setReadonly('charges', true);
    this.setValue('charges', { currencyCode: this._appConfig.baseCurrency });
    this.setValue('deliveryOption', '2');

  }
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.reset('terms', "");
    }
  }



  public override doPostInit(): void {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    this.addressInfo = this.formGroup.get("addressInfo") as FormGroup;
    if(this.formMode == 'ADD') {
      this.handleFormOnLoad();
    }
  }
  public onDebitAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (!this.state.accountNumber) {
      this.state.accountNumber = payload?.accountNumber;
    }

  }

 
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    this.state.charges.amount = 0;
    //  payload.charges = this.state.charges.amount;
    payload.charges = this.getValue('charges').amount;
    payload.currency = this.getValue('creditCardLimit').currencyCode;
    payload.creditCardLimit = this.getValue('creditCardLimit').amount;
    payload.income = this.getValue('income').amount;
    payload.monthlyLiabilityRepayment = this.getValue('monthlyLiabilityRepayment').amount;
  }
 
   public override preSubmitInterceptor(payload: ApplyCreditCard):any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    delete payload.inventoryNumber;
    if(payload.remarks==""){
      delete payload.remarks;
    }
   return payload;
 }
  
 public override postDataFetchInterceptor(payload: ApplyCreditCard){
   // WRITE CODE HERE TO HANDLE 
   payload.income={amount:payload.income,currencyCode:this._appConfig.baseCurrency};
   payload.monthlyLiabilityRepayment ={amount:payload.monthlyLiabilityRepayment,currencyCode:this._appConfig.baseCurrency};
   payload.charges={amount:payload.charges,currencyCode:this._appConfig.baseCurrency};
   payload.creditCardLimit ={amount:payload.creditCardLimit,currencyCode:this._appConfig.baseCurrency};
    return payload;
}




public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.applyCreditCard;
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
}
