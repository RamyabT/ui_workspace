import { Injectable, inject } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, Validators } from "@angular/forms";
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
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CclimitchangeService } from '../cclimitchange-service/cclimitchange.service';
import { Cclimitchange } from '../cclimitchange-service/cclimitchange.model';
import { AppConfigService } from "@dep/services";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { CreditcardService } from "../creditcard-service/creditcard.service";


export class RetailCcLimitChangeFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  baseCurrency: string = this._appConfig.baseCurrency;
  limitChange: any = {
    min: 5000,
    max: 200000,
    step: 1000,
    currencyCode: this.baseCurrency
  }
  serviceFlag: any = {
    ckValues: { checked: "1", unchecked: "0" },
  };
  tcFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  maxLimit: any = {
    min: 100,
    max: 10000,
    step: 1000,
    currencyCode: this.baseCurrency
  }
  minLimit: any = {
    min: 100,
    max: 10000,
    step: 1000

  }
  cardReference:any;
  FieldId_2: any = {
    text: " <span style='color: rgb(58, 58, 60); font-family: &quot;Helvetica Neue&quot;; font-size: 14px; letter-spacing: 0.28px; background-color: rgb(255, 255, 255);'>Disclaimer: Lorem Ipsum content needs to be shared by the team</span>"
  }
  cardData!: Creditcard;
  action: any;

  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
}


@Injectable()
export class RetailCcLimitChangeFormHelper extends BaseFpxFormHelper<RetailCcLimitChangeFormState> {

  constructor(private retailCcLimitChangeFormService: CclimitchangeService,
    private retailCreditcardDetailsFormService: CreditcardService,
    private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailCcLimitChangeFormState());
  }

  override doPreInit(): void {
    if(this.formMode =='ADD'){
    if (this.getRoutingParam('cardReference')) {
      this.setValue('cardRefNumber', this.getRoutingParam('cardReference'));
    }
    
    this.state.cardData = this._appConfig.getData('creditCardData');
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber);
    this.setValue('limitChange', this.state.cardData?.creditLimit);
    this.setValue('cardLimit', this.state.cardData?.creditLimit);
    }

    this.setServiceCode("RETAILCCLIMITCHANGE");
    this.addResetHandler("reset", this._reset);
    this.state.action = this.getRoutingParam('action');


    this.addValueChangeHandler("limitChange", this.handleCreditCardlimitChange);
    this.addValueChangeHandler("tcFlag", this.handleTCFlags);


    this.setHidden('cardHolderName', true);
    this.setHidden('cardType', true);
    this.setHidden('creditCardNumber', true);
    this.setHidden('inventoryNumber', true);
    if(this.formMode != 'VIEW'){
    this.setHidden('maxLimit', true);
    this.setHidden('minLimit', true);
    }
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber);
    this.setValue('limitChange', this.state.cardData?.creditLimit);
    this.handleFormOnLoad();
  };
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    if(this.formMode =='ADD'){
    this.setValue('tcFlag', null);
    }
    
      this.setValue("chargesAmount",{
        amount:100,
        currencyCode:"CAD"
      });
      this.setReadonly('chargesAmount',true);
    
      let key: any = {
        cardRefNumber: this.state.cardData?.cardRefNumber,
      };
    
    this.retailCreditcardDetailsFormService
      .findByKey(key)()
      .subscribe((res) => {
        console.log("creditcard service", res);
        this.state.limitChange.min = res?.minLimit;
        this.state.limitChange.max = res?.maxLimit;
        if (res!.creditLimit) {
          if (this.formMode != "VIEW") {
            this.state.cardData.creditLimit = res!.creditLimit;
            this.setValue('limitChange', res?.creditLimit);
          }
          this.setValue('cardLimit', res?.creditLimit);
        }
        this.formGroup.get('limitChange')?.addValidators([Validators.min(this.state.limitChange.min), Validators.max(this.state.limitChange.max)])
      })
    
    
  }

  public override doPostInit(): void {
    // this.addControlEventHandler("cardRefNumberDataReceived", this.handleCreditCardDataReceived);
    // if (this.formMode == 'ADD') {
      this.handleFormOnLoad();
    // }


  }

  public override preSubmitInterceptor(payload: Cclimitchange): any {
    // WRITE CODE HERE TO HANDLE 

    payload.cardLimit = this.state.cardData?.creditLimit;
    payload.minLimit = Number(this.state.limitChange.min) ;
    payload.maxLimit = Number(this.state.limitChange.max) ;
    return payload;
  }
  public handleCreditCardlimitChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value % 1000 !== 0) {
        value -= value % 1000;
        this.formGroup.get('limitChange')?.patchValue(value);
      }
      const x = this.state.cardData?.creditLimit;
      console.log(value)
      if (value > x) {
        const upperLimit = value - x;
        this.setValue('increasedLimit', upperLimit);
        this.setValue('decreasedLimit', 0);
        this.setHidden('hiddenField', true);
        this.formGroup.get("hiddenField")?.disable();
      }
      else if (value < x) {
        const lowerLimit = x - value;
        this.setValue('decreasedLimit', lowerLimit);
        this.setValue('increasedLimit', 0);
        this.setHidden('hiddenField', true);
        this.formGroup.get("hiddenField")?.disable();
      }
      else {
        this.setValue('decreasedLimit', 0);
        this.setValue('increasedLimit', 0);
        this.setHidden('hiddenField', false);
        this.formGroup.get("hiddenField")?.enable();
      }
      if (Number(value) > Number(this.state.limitChange.max)) {
        // this.formGroup.get('limitChange')?.patchValue(this.state.limitChange.max);
      }
      if (Number(value) < Number(this.state.limitChange.min)) {
        // this.formGroup.get('limitChange')?.patchValue(this.state.limitChange.min);
      }
      setTimeout(() => {
        this.formGroup.get('limitChange')?.updateValueAndValidity();
      });
    }



  }

  public handleTCFlags: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == "N") {
        this.setValue('tcFlag', null);
      }
    }
  }


  public override postDataFetchInterceptor(payload: Creditcard) {
    // WRITE CODE HERE TO HANDLE 
    // this.state.limitChange.max = payload.maxLimit;
    // this.state.limitChange.min = payload.minLimit;
    this.state.cardData = payload;
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.cclimitchange;
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


