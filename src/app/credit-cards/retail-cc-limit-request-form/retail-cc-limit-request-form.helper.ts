import { ChangeDetectorRef, Injectable, inject } from "@angular/core";
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
  FpxModal,
  FpxResetHandler,
} from "@fpx/core";
import { Observable, map, of, pairwise, startWith } from "rxjs";
import { Router } from "@angular/router";
import { CclimitrequestService } from "../cclimitrequest-service/cclimitrequest.service";
import { Cclimitrequest } from "../cclimitrequest-service/cclimitrequest.model";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { AppConfigService } from "@dep/services";
import { CreditcardService } from "../creditcard-service/creditcard.service";
import { CommonService } from "src/app/foundation/validator-service/common-service";
export class RetailLimitRequestControlState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  atmLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  onlinePurchaseLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  contactlessPurchaseLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  posPayLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  intlAtmLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  intlOnlinePurchaseLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  intlContactlessPurchaseLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  intlPosPayLimit: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
  };
  cardData!: Creditcard;
  serviceFlag: any = {
    ckValues: { checked: "1", unchecked: "0" },
  };
  step = 0;
  limitCountries: any[] = [];
  limitCountriesObj: any = {};
  continent: string[] = [];
  isChecked: boolean = false;
  currentFormValue: any;
  initialLimitCountries: any;
  productLimits: any;
  InitialDate:any;
}

@Injectable()
export class RetailLimitRequestControlHelper extends BaseFpxFormHelper<RetailLimitRequestControlState> {
  activeTabIndex: number = 0;

  override tabDetails: any = [
    {
      name: "Domestic Limits",
    },
    {
      name: "International Limits",
    },
    {
      name: "Regional",
    },
  ];
  initialFormValue: any;
  dclimitcountries: any = [];

  constructor(
    private retailLimitRequestControlService: CclimitrequestService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    private _creditcardservice: CreditcardService,
    private _commonService: CommonService,
    private cd: ChangeDetectorRef,
    private _router: Router
  ) {
    super(new RetailLimitRequestControlState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCCLIMITS");
    if(this.getRoutingParam('fromServiceCode') !=null && this.getRoutingParam('fromServiceCode') !=''){
      this.activeTabIndex=3;
    }

    if (this.getRoutingParam("cardReference")) {
      this.setValue("cardRefNumber", this.getRoutingParam("cardReference"));
    }
    this.state.cardData = this._appConfig.getData("creditCardData");
    // this.setValue("cardRefNumber", this.state.cardData?.cardRefNumber);
    this.addResetHandler("reset", this._reset);
    
    this.addValueChangeHandler("atmFlag", this.handleAtmFlagOnvalueChange);
    this.addValueChangeHandler("atmLimit", this.handleAtmLimitOnvalueChange);
    this.addValueChangeHandler("onlinePurchaseFlag", this.handleOnlinePurchaseFlagOnvalueChange);
    this.addValueChangeHandler("onlinePurchaseLimit", this.handleOnlinePurchaseLimitOnvalueChange);
    this.addValueChangeHandler("contactlessPurchaseFlag", this.handleContactlessPurchaseFlagOnvalueChange);
    this.addValueChangeHandler("contactlessPurchaseLimit", this.handleContactlessPurchaseLimitOnvalueChange);
    this.addValueChangeHandler("posPayFlag", this.handlePosPayFlagOnvalueChange);
    this.addValueChangeHandler("posPayLimit", this.handlePosPayLimitOnvalueChange);

    this.addValueChangeHandler("intlAtmFlag", this.handleIntlAtmFlagOnvalueChange);
    this.addValueChangeHandler("intlAtmLimit", this.handleIntlAtmLimitOnvalueChange);
    this.addValueChangeHandler("intlOnlinePurchaseFlag", this.handleIntlOnlinePurchaseFlagOnvalueChange);
    this.addValueChangeHandler("intlAtmLimit", this.handleIntlAtmLimitOnvalueChange);
    this.addValueChangeHandler("intlContactlessPurchaseFlag", this.handleIntlContactlessPurchaseFlagOnvalueChange);
    this.addValueChangeHandler("intlContactlessPurchaseLimit", this.handleIntlContactlessPurchaseLimitOnvalueChange);
    this.addValueChangeHandler("intlPosPayFlag", this.handleIntlPosPayFlagOnvalueChange);
    this.addValueChangeHandler("intlPosPayLimit", this.handleIntlPosPayLimitOnvalueChange);
    this.addValueChangeHandler("terms", this.handleTermsFlagOnvalueChange);

  }
  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('terms',null)
    }
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.setInitialData();
    this.activeTabIndex = 0;
  };

  public override doPostInit(): void {
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.addValueChangeHandler("searchText", this.handleSearchOnvalueChange);

    this.formGroup.valueChanges
      .pipe(
        startWith(this.formGroup.value),
        pairwise(),
        map(([oldValues, newValues]) => {
          return Object.keys(newValues).find(
            (k) => newValues[k] != oldValues[k]
          );
        })
      )
      .subscribe((key) => {
        if(key && key != 'hiddenField') {
          this.state.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
          delete this.state.currentFormValue["remarks"];
          delete this.state.currentFormValue["terms"];
          delete this.state.currentFormValue["hiddenField"];
          this.reCheckForm();
        }
          console.log(this.formGroup.valid)
      });
    this.handleFormOnLoad();
  }
  reCheckForm() {
    if (this._commonService.isSameObject(this.state.currentFormValue,this.initialFormValue) && JSON.stringify(this.state.initialLimitCountries) == JSON.stringify(this.state.limitCountries)) {
        this.formGroup.get("hiddenField")?.enable();
        console.log("Not Changed")
    } 
    else {
      this.formGroup.get("hiddenField")?.disable();
      console.log("Changed");
    }
  }
  public handleFormOnLoad() {
    this.setHidden("remarks", true);
    if(this.formMode=='ADD'){
      this.setValue('terms',null)
     }
    this.state.cardData = this._appConfig.getData("creditCardData");
    this.setInitialData();
  }
  setInitialData() {
    this.setValue("cardRefNumber", this.state.cardData?.cardRefNumber);

    let productCode = this.state.cardData?.productCode;
    let cardRefNumber = this.state.cardData?.cardRefNumber;

    this._creditcardservice
      .fetchCreditCardLimits(productCode, cardRefNumber)
      .subscribe((res) => {
        let cardLimitCurrency = res.Product;
        let cardLimit = res.CreditCard.Limits;
        this.state.InitialDate=res.CreditCard.Limits;

        let product = res.Product.Limits;
        this.state.limitCountries = JSON.parse(JSON.stringify(res.CreditCard.LimitCountries));
        this.state.initialLimitCountries =  JSON.parse(JSON.stringify(res.CreditCard.LimitCountries));
        this.state.limitCountriesObj = {};
        this.state.limitCountries?.forEach((element) => {
          if (
            Object.keys(this.state.limitCountriesObj).includes(
              element.continentDescription
            )
          ) {
            this.state.limitCountriesObj[element.continentDescription].push(
              element
            );
          } else {
            this.state.limitCountriesObj[element.continentDescription] = [];
            this.state.limitCountriesObj[element.continentDescription].push(
              element
            );
          }
        });
        this.state.continent = Object.keys(this.state.limitCountriesObj);
        this.state.atmLimit.max = product.atmMaxLimit;
        this.setValue("atmMaxLimit", Number(product.atmMaxLimit));
        this.state.atmLimit.min = product.atmMinLimit;
        this.setValue("atmMinLimit", Number(product.atmMinLimit));
        this.state.atmLimit.currencyCode = cardLimitCurrency.limitCurrency;

        this.state.contactlessPurchaseLimit.max = product.contactMaxLimit;
        this.setValue("contactMaxLimit", Number(product.contactMaxLimit));
        this.state.contactlessPurchaseLimit.min = product.contactlessMinLimit;
        this.setValue(
          "contactlessMinLimit",
          Number(product.contactlessMinLimit)
        );
        this.state.contactlessPurchaseLimit.currencyCode =
        cardLimitCurrency.limitCurrency;

        this.state.intlAtmLimit.max = product.intlAtmMaxLimit;
        this.setValue("intlAtmMaxLimit", Number(product.intlAtmMaxLimit));
        this.state.intlAtmLimit.min = product.intlAtmMinLimit;
        this.setValue("intlAtmMinLimit", Number(product.intlAtmMinLimit));
        this.state.intlAtmLimit.currencyCode = cardLimitCurrency.limitCurrency;

        this.state.intlContactlessPurchaseLimit.max =
          product.intlConcatlessMaxLimit;
        this.setValue(
          "intlConcatlessMaxLimit",
          Number(product.intlConcatlessMaxLimit)
        );
        this.state.intlContactlessPurchaseLimit.min =
          product.intlContactlessMinLimit;
        this.setValue(
          "intlContactlessMinLimit",
          Number(product.intlContactlessMinLimit)
        );
        this.state.intlContactlessPurchaseLimit.currencyCode =
        cardLimitCurrency.limitCurrency;

        this.state.intlOnlinePurchaseLimit.max = product.intlOnlineMaxLimit;
        this.setValue("intlOnlineMaxLimit", Number(product.intlOnlineMaxLimit));
        this.state.intlOnlinePurchaseLimit.min = product.intlOnlineMinLimit;
        this.setValue("intlOnlineMinLimit", Number(product.intlOnlineMinLimit));
        this.state.intlOnlinePurchaseLimit.currencyCode =
        cardLimitCurrency.limitCurrency;

        this.state.intlPosPayLimit.max = product.intlPosMaxLimit;
        this.setValue("intlPosMaxLimit", Number(product.intlPosMaxLimit));
        this.state.intlPosPayLimit.min = product.intlPosMinLimit;
        this.setValue("intlPosMinLimit", Number(product.intlPosMinLimit));
        this.state.intlPosPayLimit.currencyCode = cardLimitCurrency.limitCurrency;

        this.state.onlinePurchaseLimit.max = product.onlineMaxLimit;
        this.setValue("onlineMaxLimit", Number(product.onlineMaxLimit));
        this.state.onlinePurchaseLimit.min = product.onlineMinLimit;
        this.setValue("onlineMinLimit", Number(product.onlineMinLimit));
        this.state.onlinePurchaseLimit.currencyCode = cardLimitCurrency.limitCurrency;

        this.state.posPayLimit.max = product.posMaxLimit;
        this.setValue("posMaxLimit", Number(product.posMaxLimit));
        this.state.posPayLimit.min = product.posMinLimit;
        this.setValue("posMinLimit", Number(product.posMinLimit));
        // this.state.posPayLimit.currencyCode = cardLimit.limitCurrency

        this.setValue("currency", cardLimitCurrency.limitCurrency);
        this.setValue("overallCardLimit", Number(res.Product.overallLimit));

        this.setValue(
          "intlContactlessPurchaseFlag",
          cardLimit.intlContactlessFlag
        );
        
        this.setValue("atmFlag", cardLimit.atmFlag);
        this.setValue("onlinePurchaseFlag", cardLimit.onlineFlag);
        this.setValue("contactlessPurchaseFlag", cardLimit.contactlessFlag);
        this.setValue("posPayFlag", cardLimit.posFlag);
        this.setValue("intlAtmFlag", cardLimit.intlAtmFlag);
        this.setValue("intlOnlinePurchaseFlag", cardLimit.intlOnlineFlag);
        this.setValue("intlContactlessPurchaseFlag",cardLimit.intlContactlessFlag);
        this.setValue("intlPosPayFlag", cardLimit.intlPosFlag);

        this.setValue("atmLimit", Number(cardLimit.atmLimit));
        this.setValue("onlinePurchaseLimit", Number(cardLimit.onlineLimit));
        this.setValue("contactlessPurchaseLimit",Number(cardLimit.contactlessLimit));
        this.setValue("posPayLimit", Number(cardLimit.posLimit));

        this.setValue("intlAtmLimit", Number(cardLimit.intlAtmLimit));
        this.setValue("intlOnlinePurchaseLimit", Number(cardLimit.intlOnlineLimit));
        this.setValue("intlContactlessPurchaseLimit",Number(cardLimit.intlContactlessLimit));
        this.setValue("intlPosPayLimit", Number(cardLimit.intlPosLimit));

        this.cd.detectChanges();

        Object.keys(this.formGroup.value).forEach((element) => {
          this.formGroup.get(element)?.updateValueAndValidity();
        });
        this.formGroup.updateValueAndValidity();
        this.initialFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
        this.state.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
        if(this.getRoutingParam('selecetedIndex')) this.activeTabIndex = this.getRoutingParam('selecetedIndex');
      });
  }


public handleAtmFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('atmLimit', false);
      if(!this.initialFormValue?.onlinePurchaseLimit){
        this.setValue('atmLimit',this.state.atmLimit.min);
      }
      else{
      this.formGroup.get('atmLimit')?.patchValue(this.initialFormValue?.atmLimit)
      }
    }
    else {
      this.setHidden('atmLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleAtmLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    
    if(Number(value) < Number(this.state.atmLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('atmLimit',this.state.atmLimit.min);
    }
    if(Number(value) > Number(this.state.atmLimit.max)){
       this.formGroup.get('atmLimit')?.patchValue(this.state.atmLimit.max);
    }
    setTimeout(() => {
      this.formGroup.get('atmLimit')?.updateValueAndValidity();
    });
  };

  public handleOnlinePurchaseFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('onlinePurchaseLimit', false);
      if(!this.initialFormValue?.onlinePurchaseLimit){
         this.setValue('onlinePurchaseLimit',this.state.onlinePurchaseLimit.min);
      }
      else{
        this.formGroup.get('onlinePurchaseLimit')?.patchValue(this.initialFormValue?.onlinePurchaseLimit)
      }
    }
    else {
      this.setHidden('onlinePurchaseLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleOnlinePurchaseLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if(Number(value) < Number(this.state.onlinePurchaseLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('onlinePurchaseLimit',this.state.onlinePurchaseLimit.min);
    }
    if(Number(value) > Number(this.state.onlinePurchaseLimit.max)){
       this.formGroup.get('onlinePurchaseLimit')?.patchValue(this.state.onlinePurchaseLimit.max);
    }

    if (value < this.state.onlinePurchaseLimit.min || value > this.state.onlinePurchaseLimit.max) {
      //this.formGroup.get('onlinePurchaseLimit')?.patchValue(this.initialFormValue?.onlinePurchaseLimit)
    }
    setTimeout(() => {
      this.formGroup.get('onlinePurchaseLimit')?.updateValueAndValidity();
    });
  };

  public handleContactlessPurchaseFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('contactlessPurchaseLimit', false);
      if(!this.initialFormValue?.contactlessPurchaseLimit){
        this.setValue('contactlessPurchaseLimit',this.state.contactlessPurchaseLimit.min);
      }
      else{
        this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.initialFormValue?.contactlessPurchaseLimit)
      }
    }
    else {
      this.setHidden('contactlessPurchaseLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleContactlessPurchaseLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(Number(value) < Number(this.state.contactlessPurchaseLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('contactlessPurchaseLimit',this.state.contactlessPurchaseLimit.min);
    }
    if(Number(value) > Number(this.state.contactlessPurchaseLimit.max)){
       this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.max);
    }
    if (value < this.state.contactlessPurchaseLimit.min || value > this.state.contactlessPurchaseLimit.max) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.initialFormValue?.contactlessPurchaseLimit)
    }
    setTimeout(() => {
      this.formGroup.get('contactlessPurchaseLimit')?.updateValueAndValidity();
    });
  };

  public handlePosPayFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('posPayLimit', false);
      if(!this.initialFormValue?.posPayLimit){
        this.setValue('posPayLimit',this.state.posPayLimit.min);
      }
      else{
        this.formGroup.get('posPayLimit')?.patchValue(this.initialFormValue?.posPayLimit)
      }
    }
    else {
      this.setHidden('posPayLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handlePosPayLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

        
    if(Number(value) < Number(this.state.posPayLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('posPayLimit',this.state.posPayLimit.min);
    }
    if(Number(value) > Number(this.state.posPayLimit.max)){
       this.formGroup.get('posPayLimit')?.patchValue(this.state.posPayLimit.max);
    }

    if (value < this.state.posPayLimit.min || value > this.state.posPayLimit.max) {
     // this.formGroup.get('posPayLimit')?.patchValue(this.initialFormValue?.posPayLimit)
    }
    setTimeout(() => {
      this.formGroup.get('posPayLimit')?.updateValueAndValidity();
    });
  };

  public handleIntlAtmFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('intlAtmLimit', false);
      if(!this.initialFormValue?.intlAtmLimit){
        this.setValue('intlAtmLimit',this.state.intlAtmLimit.min);
      }
      else{
        this.formGroup.get('intlAtmLimit')?.patchValue(this.initialFormValue?.intlAtmLimit)
      }
    }
    else {
      this.setHidden('intlAtmLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleIntlAtmLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

     if(Number(value) < Number(this.state.intlAtmLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlAtmLimit',this.state.intlAtmLimit.min);
    }
    if(Number(value) > Number(this.state.intlAtmLimit.max)){
       this.formGroup.get('intlAtmLimit')?.patchValue(this.state.intlAtmLimit.max);
    }

    if (value < this.state.intlAtmLimit.min || value > this.state.intlAtmLimit.max) {
      //this.formGroup.get('intlAtmLimit')?.patchValue(this.initialFormValue?.intlAtmLimit)
    }
    setTimeout(() => {
      this.formGroup.get('intlAtmLimit')?.updateValueAndValidity();
    });
  };

  public handleIntlOnlinePurchaseFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('intlOnlinePurchaseLimit', false);
      if(!this.initialFormValue?.intlOnlinePurchaseLimit){
        this.setValue('intlOnlinePurchaseLimit',this.state.intlOnlinePurchaseLimit.min);
      }
      else{
        this.formGroup.get('intlOnlinePurchaseLimit')?.patchValue(this.initialFormValue?.intlOnlinePurchaseLimit)
      }
    }
    else {
      this.setHidden('intlOnlinePurchaseLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleIntlOnlinePurchaseLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if(Number(value) < Number(this.state.intlOnlinePurchaseLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlOnlinePurchaseLimit',this.state.intlOnlinePurchaseLimit.min);
    }
    if(Number(value) > Number(this.state.intlOnlinePurchaseLimit.max)){
       this.formGroup.get('intlOnlinePurchaseLimit')?.patchValue(this.state.intlOnlinePurchaseLimit.max);
    }
    if (value < this.state.intlOnlinePurchaseLimit.min || value > this.state.intlOnlinePurchaseLimit.max) {
      //this.formGroup.get('intlOnlinePurchaseLimit')?.patchValue(this.initialFormValue?.intlOnlinePurchaseLimit)
    }
    setTimeout(() => {
      this.formGroup.get('intlOnlinePurchaseLimit')?.updateValueAndValidity();
    });
  };

  public handleIntlContactlessPurchaseFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('intlContactlessPurchaseLimit', false);
      if(!this.initialFormValue?.intlContactlessPurchaseLimit){
        this.setValue('intlContactlessPurchaseLimit',this.state.intlContactlessPurchaseLimit.min);
      }
      else{
        this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.initialFormValue?.intlContactlessPurchaseLimit)
      }
    }
    else {
      this.setHidden('intlContactlessPurchaseLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleIntlContactlessPurchaseLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if(Number(value) < Number(this.state.intlContactlessPurchaseLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlContactlessPurchaseLimit',this.state.intlContactlessPurchaseLimit.min);
    }
    if(Number(value) > Number(this.state.intlContactlessPurchaseLimit.max)){
       this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.state.intlContactlessPurchaseLimit.max);
    }

    if (value < this.state.intlContactlessPurchaseLimit.min || value > this.state.intlContactlessPurchaseLimit.max) {
      //this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.initialFormValue?.intlContactlessPurchaseLimit)
    }
    setTimeout(() => {
      this.formGroup.get('intlContactlessPurchaseLimit')?.updateValueAndValidity();
    });
  };

  public handleIntlPosPayFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('intlPosPayLimit', false);
      if(!this.initialFormValue?.intlPosPayLimit){
         this.setValue('intlPosPayLimit',this.state.intlPosPayLimit.min);
      }
      else{
        this.formGroup.get('intlPosPayLimit')?.patchValue(this.initialFormValue?.intlPosPayLimit)
      }
    }
    else {
      this.setHidden('intlPosPayLimit', true);
    }
    this.formGroup.updateValueAndValidity();
  };

  public handleIntlPosPayLimitOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if(Number(value) < Number(this.state.intlPosPayLimit.min)){
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlPosPayLimit',this.state.intlPosPayLimit.min);
    }
    if(Number(value) > Number(this.state.intlPosPayLimit.max)){
       this.formGroup.get('intlPosPayLimit')?.patchValue(this.state.intlPosPayLimit.max);
    }


    if (value < this.state.intlPosPayLimit.min || value > this.state.intlPosPayLimit.max) {
      //this.formGroup.get('intlPosPayLimit')?.patchValue(this.initialFormValue?.intlPosPayLimit)
    }
    setTimeout(() => {
      this.formGroup.get('intlPosPayLimit')?.updateValueAndValidity();
    });
  };

  onTabChanged(event: any) {
    if(event.index == 0) {
    }
  }
  public handleCvvOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    if (value) {
      console.log("Valid");
    }
  };
  public handleSearchOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let searchText = value.toLowerCase();
    for (let i = 0; i < this.state.continent.length; i++) {
      const countries = this.state.limitCountriesObj[this.state.continent[i]];
      for (let j = 0; j < countries.length; j++) {
        const limitCountry = countries[j];
        if (
          limitCountry.countryDescription
            .toLowerCase()
            ?.startsWith(searchText) ||
          limitCountry.continentDescription.toLowerCase()?.startsWith(value)
        ) {
          this.state.step = i;
          return;
        } else {
          this.state.step = i;
        }
      }
    }
  };

  tabDetailsOpen(index: number) {
    console.log(index);
  }

  onClickCountryCheckbox(country: any) {
    if (country) {
      let index: any = this.state.limitCountries?.findIndex(
        (x: any) => x.countryCode == country.countryCode
      );
      if (index != -1) {
        if (country.enabled == "0") {
          this.state.limitCountries[index].enabled = '1';
        } else {
          this.state.limitCountries[index].enabled = '0';
        }
      }
      this.reCheckForm();
    }
  }

  public override preSubmitInterceptor(payload: Cclimitrequest): any {
    // WRITE CODE HERE TO HANDLE
    this.handleFormOnPresubmit(payload);
    return payload;
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE

    payload.dclimitcountries = this.state.limitCountries;
    delete payload.searchText;
    // contactlessPurchaseFlag
  }

  public override postDataFetchInterceptor(payload: Cclimitrequest) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }
  tabGroupDetailsCollapse() {}

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.cclimitrequest;
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
