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
import { DclimitrequestService } from "../dclimitrequest-service/dclimitrequest.service";
import { Dclimitrequest } from "../dclimitrequest-service/dclimitrequest.model";
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { DebitcardService } from "../debitcard-service/debitcard.service";
import { CommonService } from "src/app/foundation/validator-service/common-service";
export class RetailDebitCardLimitRequestState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
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
  cardData: Debitcard | undefined;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
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
  InitalLimit: any;
}

@Injectable()
export class RetailDebitCardLimitRequestHelper extends BaseFpxFormHelper<RetailDebitCardLimitRequestState> {
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
    private retailDebitCardLimitRequestService: DclimitrequestService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _commonService: CommonService,
    private _debitcardservice: DebitcardService,
    private cd: ChangeDetectorRef
  ) {
    super(new RetailDebitCardLimitRequestState());
  }

  override doPreInit(): void {


    if (this.getRoutingParam('fromServiceCode') != null && this.getRoutingParam('fromServiceCode') != '') {
      this.activeTabIndex = 3;
    }
    this.setServiceCode("RETAILDCLIMITS");
    this.state.cardData = this._appConfig.getData("debitCardData");
    // this.setValue("cardReference", this.state.cardData?.cardRefNumber);
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
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);

  }
  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "N") {
      this.setValue('termsFlag', null)
    }
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.setInitialData();
    this.activeTabIndex = 0;
  };

  public override doPostInit(): void {
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
        if (key && key != 'hiddenField') {
          this.state.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
          delete this.state.currentFormValue["remarks"];
          delete this.state.currentFormValue["termsFlag"];
          delete this.state.currentFormValue["hiddenField"];
          this.reCheckForm();
        }
        console.log(this.formGroup.valid)
      });
    this.handleFormOnLoad();
  }
  reCheckForm() {
    if (this._commonService.isSameObject(this.state.currentFormValue, this.initialFormValue) && JSON.stringify(this.state.initialLimitCountries) == JSON.stringify(this.state.limitCountries)) {
      this.formGroup.get("hiddenField")?.enable();
      console.log("Not Changed")
    }
    else {
      this.formGroup.get("hiddenField")?.disable();
      console.log("Changed");
    }
  }
  public handleFormOnLoad() {
    this.setHidden('remarks', true);
    if (this.formMode == 'ADD') {
      this.setValue('termsFlag', null)
    }
    this.state.cardData = this._appConfig.getData("debitCardData");
    this.setInitialData();
  }

  setInitialData() {
    this.setValue("cardReference", this.state.cardData?.cardRefNumber);

    let productCode = this.state.cardData?.productCode;
    let cardRefNumber = this.state.cardData?.cardRefNumber;

    this._debitcardservice
      .fetchDebitCardLimits(productCode, cardRefNumber)
      .subscribe((res) => {
        let cardLimit = res.DebitCard.Limits;
        this.state.InitalLimit = res.DebitCard.Limits;
        this.state.productLimits = res.Product.Limits;
        this.state.limitCountries = JSON.parse(JSON.stringify(res.DebitCard.LimitCountries));
        this.state.initialLimitCountries = JSON.parse(JSON.stringify(res.DebitCard.LimitCountries));
        this.state.limitCountriesObj = {};
        this.state.limitCountries?.forEach(element => {
          if (Object.keys(this.state.limitCountriesObj).includes(element.continentDescription)) {
            this.state.limitCountriesObj[element.continentDescription].push(element);
          }
          else {
            this.state.limitCountriesObj[element.continentDescription] = [];
            this.state.limitCountriesObj[element.continentDescription].push(element);
          }
        });
        this.state.continent = Object.keys(this.state.limitCountriesObj);
        this.state.atmLimit.max = this.state.productLimits.atmMaxLimit;
        this.setValue("atmMaxLimit", Number(this.state.productLimits.atmMaxLimit));
        this.state.atmLimit.min = this.state.productLimits.atmMinLimit;
        this.setValue("atmMinLimit", Number(this.state.productLimits.atmMinLimit));
        this.state.atmLimit.currencyCode = cardLimit.limitCurrency;

        this.state.contactlessPurchaseLimit.max = this.state.productLimits.contactMaxLimit;
        this.setValue("contactMaxLimit", Number(this.state.productLimits.contactMaxLimit));
        this.state.contactlessPurchaseLimit.min = this.state.productLimits.contactlessMinLimit;
        this.setValue(
          "contactlessMinLimit",
          Number(this.state.productLimits.contactlessMinLimit)
        );
        this.state.contactlessPurchaseLimit.currencyCode =
          cardLimit.limitCurrency;

        this.state.intlAtmLimit.max = this.state.productLimits.intlAtmMaxLimit;
        this.setValue("intlAtmMaxLimit", Number(this.state.productLimits.intlAtmMaxLimit));
        this.state.intlAtmLimit.min = this.state.productLimits.intlAtmMinLimit;
        this.setValue("intlAtmMinLimit", Number(this.state.productLimits.intlAtmMinLimit));
        this.state.intlAtmLimit.currencyCode = cardLimit.limitCurrency;

        this.state.intlContactlessPurchaseLimit.max =
          this.state.productLimits.intlConcatlessMaxLimit;
        this.setValue(
          "intlConcatlessMaxLimit",
          Number(this.state.productLimits.intlConcatlessMaxLimit)
        );
        this.state.intlContactlessPurchaseLimit.min =
          this.state.productLimits.intlContactlessMinLimit;
        this.setValue(
          "intlContactlessMinLimit",
          Number(this.state.productLimits.intlContactlessMinLimit)
        );
        this.state.intlContactlessPurchaseLimit.currencyCode =
          cardLimit.limitCurrency;

        this.state.intlOnlinePurchaseLimit.max = this.state.productLimits.intlOnlineMaxLimit;
        this.setValue("intlOnlineMaxLimit", Number(this.state.productLimits.intlOnlineMaxLimit));
        this.state.intlOnlinePurchaseLimit.min = this.state.productLimits.intlOnlineMinLimit;
        this.setValue("intlOnlineMinLimit", Number(this.state.productLimits.intlOnlineMinLimit));
        this.state.intlOnlinePurchaseLimit.currencyCode =
          cardLimit.limitCurrency;

        this.state.intlPosPayLimit.max = this.state.productLimits.intlPosMaxLimit;
        this.setValue("intlPosMaxLimit", Number(this.state.productLimits.intlPosMaxLimit));
        this.state.intlPosPayLimit.min = this.state.productLimits.intlPosMinLimit;
        this.setValue("intlPosMinLimit", Number(this.state.productLimits.intlPosMinLimit));
        this.state.intlPosPayLimit.currencyCode = cardLimit.limitCurrency;

        this.state.onlinePurchaseLimit.max = this.state.productLimits.onlineMaxLimit;
        this.setValue("onlineMaxLimit", Number(this.state.productLimits.onlineMaxLimit));
        this.state.onlinePurchaseLimit.min = this.state.productLimits.onlineMinLimit;
        this.setValue("onlineMinLimit", Number(this.state.productLimits.onlineMinLimit));
        this.state.onlinePurchaseLimit.currencyCode = cardLimit.limitCurrency;

        this.state.posPayLimit.max = this.state.productLimits.posMaxLimit;
        this.setValue("posMaxLimit", Number(this.state.productLimits.posMaxLimit));
        this.state.posPayLimit.min = this.state.productLimits.posMinLimit;
        this.setValue("posMinLimit", Number(this.state.productLimits.posMinLimit));
        // this.state.posPayLimit.currencyCode = cardLimit.limitCurrency

        this.setValue("currency", cardLimit.limitCurrency);
        this.setValue("overallCardLimit", Number(res.Product.overallLimit));

        this.setValue("intlContactlessPurchaseFlag", cardLimit.intlContactlessFlag);
        this.setValue("intlAtmFlag", cardLimit.intlAtmFlag);
        this.setValue("intlPosPayFlag", cardLimit.intlPosFlag);
        this.setValue("contactlessPurchaseFlag", cardLimit.contactlessFlag);
        this.setValue("onlinePurchaseFlag", cardLimit.onlineFlag);
        this.setValue("atmFlag", cardLimit.atmFlag);
        this.setValue("intlOnlinePurchaseFlag", cardLimit.intlOnlineFlag);
        this.setValue("posPayFlag", cardLimit.posFlag);


        this.setValue("atmLimit", Number(cardLimit.atmLimit));
        this.setValue("onlinePurchaseLimit", Number(cardLimit.onlineLimit));
        this.setValue("contactlessPurchaseLimit", Number(cardLimit.contactlessLimit));
        this.setValue("posPayLimit", Number(cardLimit.posLimit));

        this.setValue("intlAtmLimit", Number(cardLimit.intlAtmLimit));
        this.setValue("intlOnlinePurchaseLimit", Number(cardLimit.intlOnlineLimit));
        this.setValue("intlContactlessPurchaseLimit", Number(cardLimit.intlContactlessLimit));
        this.setValue("intlPosPayLimit", Number(cardLimit.intlPosLimit));

        this.cd.detectChanges();

        Object.keys(this.formGroup.value).forEach(element => {
          this.formGroup.get(element)?.updateValueAndValidity();
        });
        this.formGroup.updateValueAndValidity();
        this.initialFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
        this.state.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
        if (this.getRoutingParam('selecetedIndex')) this.activeTabIndex = this.getRoutingParam('selecetedIndex');
      });
  }

  public handleAtmFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == '1') {
      this.setHidden('atmLimit', false);
      if (!this.state.InitalLimit.atmLimit) {
        this.setValue('atmLimit', this.state.atmLimit.min);
      }
      else {
        this.formGroup.get('atmLimit')?.patchValue(this.initialFormValue?.atmLimit);
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

    if (Number(value) < Number(this.state.atmLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('atmLimit', this.state.atmLimit.min);
    }
    else if (Number(value) > Number(this.state.atmLimit.max)) {
      this.formGroup.get('atmLimit')?.patchValue(this.state.atmLimit.max);
    }
    else {
      //this.formGroup.get('atmLimit')?.patchValue(this.initialFormValue?.atmLimit)
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
    if (value == '1') {
      this.setHidden('onlinePurchaseLimit', false);
      if (!this.state.InitalLimit?.onlineLimit) {
        this.setValue('onlinePurchaseLimit', this.state.onlinePurchaseLimit.min);
      }
      else {
        this.formGroup.get('onlinePurchaseLimit')?.patchValue(this.state.InitalLimit?.onlineLimit);
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

    if (Number(value) < Number(this.state.onlinePurchaseLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('onlinePurchaseLimit', this.state.onlinePurchaseLimit.min);
    }
    else if (Number(value) > Number(this.state.onlinePurchaseLimit.max)) {
      this.formGroup.get('onlinePurchaseLimit')?.patchValue(this.state.onlinePurchaseLimit.max);
    }
    else {
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
    if (value == '1') {
      this.setHidden('contactlessPurchaseLimit', false);
      if (!this.state.InitalLimit?.contactlessLimit) {
        this.setValue('contactlessPurchaseLimit', this.state.contactlessPurchaseLimit.min);
      }
      else {
        this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.InitalLimit?.contactlessLimit);
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

    if (Number(value) < Number(this.state.contactlessPurchaseLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('contactlessPurchaseLimit', this.state.contactlessPurchaseLimit.min);
    }
    else if (Number(value) > Number(this.state.contactlessPurchaseLimit.max)) {
      this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.max);
    }
    else {

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
    if (value == '1') {
      this.setHidden('posPayLimit', false);
      if (!this.state.InitalLimit.posLimit) {
        this.setValue('posPayLimit', this.state.posPayLimit.min);
      }
      else {
        this.formGroup.get('posPayLimit')?.patchValue(this.state.InitalLimit?.posLimit);
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
    if (Number(value) < Number(this.state.posPayLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('posPayLimit', this.state.posPayLimit.min);
    }
    else if (Number(value) > Number(this.state.posPayLimit.max)) {
      this.formGroup.get('posPayLimit')?.patchValue(this.state.posPayLimit.max);
    }

    else {

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
    if (value == '1') {
      this.setHidden('intlAtmLimit', false);
      if (!this.initialFormValue?.intlAtmLimit) {
        this.setValue('intlAtmLimit', this.state.intlAtmLimit.min);
      }
      else {
        this.formGroup.get('intlAtmLimit')?.patchValue(this.state.InitalLimit?.intlAtmLimit);
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

    if (Number(value) < Number(this.state.intlAtmLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlAtmLimit', this.state.intlAtmLimit.min);
    }
    else if (Number(value) > Number(this.state.intlAtmLimit.max)) {
      this.formGroup.get('intlAtmLimit')?.patchValue(this.state.intlAtmLimit.max);
    }
    else (value < this.state.intlAtmLimit.min || value > this.state.intlAtmLimit.max)
    {

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
    if (value == '1') {
      this.setHidden('intlOnlinePurchaseLimit', false);
      if (!this.state.InitalLimit?.intlOnlineLimit) {
        this.setValue('intlOnlinePurchaseLimit', this.state.intlOnlinePurchaseLimit.min);
      }
      else {
        this.formGroup.get('intlOnlinePurchaseLimit')?.patchValue(this.state.InitalLimit?.intlOnlineLimit)
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

    if (Number(value) < Number(this.state.intlOnlinePurchaseLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlOnlinePurchaseLimit', this.state.intlOnlinePurchaseLimit.min);
    }
    else if (Number(value) > Number(this.state.intlOnlinePurchaseLimit.max)) {
      this.formGroup.get('intlOnlinePurchaseLimit')?.patchValue(this.state.intlOnlinePurchaseLimit.max);
    }
    else {
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
    if (value == '1') {
      this.setHidden('intlContactlessPurchaseLimit', false);
      if (!this.state.InitalLimit?.intlContactlessLimit) {
        this.setValue('intlContactlessPurchaseLimit', this.state.intlContactlessPurchaseLimit.min);
      }
      else {
        this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.state.InitalLimit?.intlContactlessLimit);
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

    if (Number(value) < Number(this.state.intlContactlessPurchaseLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlContactlessPurchaseLimit', this.state.intlContactlessPurchaseLimit.min);
    }
    else if (Number(value) > Number(this.state.intlContactlessPurchaseLimit.max)) {
      this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.state.intlContactlessPurchaseLimit.max);
    }

    else {
      // this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.initialFormValue?.intlContactlessPurchaseLimit)
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
    if (value == '1') {
      this.setHidden('intlPosPayLimit', false);
      if (!this.state.InitalLimit?.intlPosLimit) {
        //this.setValue('intlPosPayLimit', this.state.intlPosPayLimit.min);
        this.formGroup.get('intlPosPayLimit')?.patchValue(this.state.intlPosPayLimit.min);
      }
      else {
        this.formGroup.get('intlPosPayLimit')?.patchValue(this.state.InitalLimit?.intlPosLimit)
      }
      setTimeout(() => {
        this.formGroup.get('intlPosPayLimit')?.updateValueAndValidity();
      });
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

    if (Number(value) < Number(this.state.intlPosPayLimit.min)) {
      //this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.state.contactlessPurchaseLimit.min);
      this.setValue('intlPosPayLimit', this.state.intlPosPayLimit.min);
    }
    else if (Number(value) > Number(this.state.intlPosPayLimit.max)) {
      this.formGroup.get('intlPosPayLimit')?.patchValue(this.state.intlPosPayLimit.max);
    }

    else {
      //this.formGroup.get('intlPosPayLimit')?.patchValue(this.initialFormValue?.intlPosPayLimit)
    }
    setTimeout(() => {
      this.formGroup.get('intlPosPayLimit')?.updateValueAndValidity();
    });
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
        if ((limitCountry.countryDescription.toLowerCase()?.startsWith(searchText)) || (limitCountry.continentDescription.toLowerCase()?.startsWith(value))) {
          this.state.step = i;
          return;
        } else {
          this.state.step = i;
        }
      };

    }
  }

  onTabChanged(event: any) {
    if (event.index == 0) {
    }
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

  tabGroupDetailsCollapse() { }

  tabDetailsOpen(index: number) {
    console.log(index);
  }
  public handleFormOnPresubmit(payload: any) {
    payload.dclimitcountries = this.state.limitCountries;
    payload.currency = this._appConfig.baseCurrency;
    delete payload.searchText;
  }
  public override preSubmitInterceptor(payload: Dclimitrequest): any {
    // WRITE CODE HERE TO HANDLE
    this.handleFormOnPresubmit(payload);
    return payload;
  }

  public override postDataFetchInterceptor(payload: Dclimitrequest) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.dclimitrequest;
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
