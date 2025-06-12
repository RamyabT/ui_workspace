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
import { LiabilityLetterService } from '../liabilityLetter-service/liabilityLetter.service';
import { LiabilityLetter } from '../liabilityLetter-service/liabilityLetter.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import moment from "moment";
export class RetailLiabilityLetterFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  asonDate: any = {
    minDate: "",
    maxDate: "",
  }
  acknowledgement: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }

  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: ""
  }
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  customerEmail: string ="";
}


@Injectable()
export class RetailLiabilityLetterFormHelper extends BaseFpxFormHelper<RetailLiabilityLetterFormState>{
  addressInfo!: FormGroup;

  constructor(private retailLiabilityLetterFormService: LiabilityLetterService,
    private appConfigService: AppConfigService,

    private userService: CustomerService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailLiabilityLetterFormState());
  }

  public handleFormOnLoad() {
    this.reset('acknowledgement');
    if(this.formMode =='VIEW'){
      if(this.formGroup.controls['Reason'].value == '11'){
        this.setHidden('otherReason',false);
        this.setDisabled('otherReason',true);
    }
    else{
      this.setHidden('otherReason',true);
    }
    if(this.getValue('serviceReqDeliveryOption')=='1'){
    this.setValue('serviceReqDeliveryOption','1');
    this.setHidden('addressInfo',true);
    this.setHidden('deliveryBranch',false);
    this.setDisabled('deliveryBranch',true);
    }
    else{
    this.setValue('serviceReqDeliveryOption','2');
    this.setHidden('addressInfo',false);
    this.setHidden('deliveryBranch',true);
    this.setHidden('chargesAmount',true);
    }
  }
  else{
    this.setValue('serviceReqDeliveryOption','2');
    this.setHidden('addressInfo',false);
    this.setHidden('otherReason', true);
    this.setHidden('deliveryBranch', true);
    this.setHidden('chargesAmount', true);
    this.setReadonly('chargesAmount', true);
    this.setReadonly('email', true);

    this.setAmountCurrencyList('chargesAmount', [{
      id: this.appConfigService.baseCurrency, text: this.appConfigService.baseCurrency
    }]);
    let currentDate = moment().format("YYYY-MM-DD");
    this.state.asonDate.minDate = currentDate

    let futureDate = moment().add(10, 'days');
    this.state.asonDate.maxDate = futureDate
    this.setValue('asonDate', currentDate);
    }

  }

  public handleServiceReqDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if (value == '1') {
      this.setHidden('addressInfo', true);
      this.setHidden('email', true);
      this.setHidden('deliveryBranch', false);
      this.setHidden('chargesAmount', false);

    }
    if (value == '2') {
      this.setHidden('addressInfo', false);
      // this.setDisabled('addressInfo', true);
      this.setHidden('email', true);
      this.setHidden('deliveryBranch', true);
      this.setHidden('chargesAmount', true);
      if(!this.state.addressInfo || (this.state.addressInfo.buildingDetails && this.state.addressInfo.cityDetails && this.state.addressInfo.pinCode && this.state.addressInfo.stateDetails) ==""){
        //this.setErrors('serviceReqDeliveryOption', "Email_Error");
        this.formGroup.get('serviceReqDeliveryOption')?.markAsTouched()
        this.reset('deliveryBranch')
      }

    }
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == '3') {
      this.setHidden('addressInfo', true);
      this.setHidden('email', false);
      this.setHidden('deliveryBranch', true);
      this.setHidden('chargesAmount', true);
    }
  }

  public handleReasonOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.formGroup.controls['Reason'].value == '11') {
      this.setHidden('otherReason', false);
    }
    else {
      this.setHidden('otherReason', true);
    }
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }
  public handleAcknowledgementFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('acknowledgement',null)
    }
  }
  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

    if (payload) {
      this.state.addressInfo.buildingDetails = payload.buildingName;
      this.state.addressInfo.cityDetails = payload.city;
      this.state.addressInfo.stateDetails = payload.stateName;
      this.state.addressInfo.countryDetails = payload.countryName;
      this.state.addressInfo.pinCode = payload.pincode;
      this.setValue('email', payload.emailId);
  

    }

  }

  override doPreInit(): void {
    this.setServiceCode("RETAILLIABILITY");
  }


  public override doPostInit(): void {
    this.addressInfo = this.formGroup.get("addressInfo") as FormGroup;
    this.addValueChangeHandler("serviceReqDeliveryOption", this.handleServiceReqDeliveryOptionOnvalueChange);
    this.addValueChangeHandler("acknowledgement", this.handleAcknowledgementFlagOnvalueChange);
    this.addControlEventHandler("onCustomerDetailsDataReceived", this.handleCustomerDetailsDataReceived);
    this.addValueChangeHandler("Reason", this.handleReasonOnvalueChange);
    this.handleFormOnLoad();
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
      payload.chargesAmount = 0.00;
  }

  public override preSubmitInterceptor(payload: LiabilityLetter): any {
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: LiabilityLetter) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.liabilityLetter;
      routingInfo.setQueryParams({
        response: res
      });
    }  else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


