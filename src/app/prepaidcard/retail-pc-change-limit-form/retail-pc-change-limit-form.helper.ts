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
import { PcChangeLimitService } from '../pcChangeLimit-service/pcChangeLimit.service';
import { PcChangeLimit } from '../pcChangeLimit-service/pcChangeLimit.model';
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { AppConfigService } from "@dep/services";
import { PrepaidcardService } from "../prepaidcard-service/prepaidcard.service";
import { CommonService } from "src/app/foundation/validator-service/common-service";
export class RetailPCChangeLimitFormState extends BaseFpxComponentState {
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
  cardData: Prepaidcard | undefined;

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
  isChecked:boolean = false;
  currentFormValue: any;
  initialLimitCountries: any;
  productLimits: any;
}


@Injectable()
export class RetailPCChangeLimitFormHelper extends BaseFpxFormHelper<RetailPCChangeLimitFormState>{
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
  previousFormValue: any;
  pplimitcountries: any = [];
  constructor(private retailPCChangeLimitFormService: PcChangeLimitService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    private _commonService: CommonService,
    private _prepaidcardservice: PrepaidcardService,
    private cd: ChangeDetectorRef) {
    super(new RetailPCChangeLimitFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILPCLIMITS");
    this.addResetHandler("reset", this._reset);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
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
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.setInitialData();
    this.activeTabIndex = 0;
  };
  public handleFormOnLoad() {
    this.setValue('termsFlag',null);
    this.setHidden("remarks",true);
    this.state.cardData = this._appConfig.getData("prepaidCardData");
    this.setInitialData();
  }
 public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,

    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value =="N"){
      this.setValue('termsFlag',null);
    }
  }
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
        if(key && key != 'hiddenField') {
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
    if (this.state.currentFormValue && this.initialFormValue && this._commonService.isSameObject(this.state.currentFormValue,this.initialFormValue) && JSON.stringify(this.state.initialLimitCountries) == JSON.stringify(this.state.limitCountries)) {
        this.formGroup.get("hiddenField")?.enable();
        console.log("Not Changed")
    } 
    else {
      this.formGroup.get("hiddenField")?.disable();
      console.log("Changed");
    }
  }
 public handleAtmFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '1') {
      this.setHidden('atmLimit', false);
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
    if (value < this.state.atmLimit.min || value > this.state.atmLimit.max) {
      this.formGroup.get('atmLimit')?.patchValue(this.initialFormValue?.atmLimit)
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
    if (value < this.state.onlinePurchaseLimit.min || value > this.state.onlinePurchaseLimit.max) {
      this.formGroup.get('onlinePurchaseLimit')?.patchValue(this.initialFormValue?.onlinePurchaseLimit)
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
    if (value < this.state.contactlessPurchaseLimit.min || value > this.state.contactlessPurchaseLimit.max) {
      this.formGroup.get('contactlessPurchaseLimit')?.patchValue(this.initialFormValue?.contactlessPurchaseLimit)
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
    if (value < this.state.posPayLimit.min || value > this.state.posPayLimit.max) {
      this.formGroup.get('posPayLimit')?.patchValue(this.initialFormValue?.posPayLimit)
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
    if (value < this.state.intlAtmLimit.min || value > this.state.intlAtmLimit.max) {
      this.formGroup.get('intlAtmLimit')?.patchValue(this.initialFormValue?.intlAtmLimit)
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
    if (value < this.state.intlOnlinePurchaseLimit.min || value > this.state.intlOnlinePurchaseLimit.max) {
      this.formGroup.get('intlOnlinePurchaseLimit')?.patchValue(this.initialFormValue?.intlOnlinePurchaseLimit)
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
    if (value < this.state.intlContactlessPurchaseLimit.min || value > this.state.intlContactlessPurchaseLimit.max) {
      this.formGroup.get('intlContactlessPurchaseLimit')?.patchValue(this.initialFormValue?.intlContactlessPurchaseLimit)
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
    if (value < this.state.intlPosPayLimit.min || value > this.state.intlPosPayLimit.max) {
      this.formGroup.get('intlPosPayLimit')?.patchValue(this.initialFormValue?.intlPosPayLimit)
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
      const countries = this.state.limitCountriesObj[ this.state.continent[i]];
      for (let j = 0; j < countries.length; j++) {
            const limitCountry = countries[j];
            if ((limitCountry.countryDescription.toLowerCase()?.startsWith(searchText)) || (limitCountry.continentDescription.toLowerCase()?.startsWith( value) )) {
              this.state.step = i;
              return;
            } else {
              this.state.step = i;
            }
        };
          
    }
   }

 setInitialData() {
    this.setValue("cardRefNumber", this.state.cardData?.cardRefNumber);

    let productCode = this.state.cardData?.productCode;
    let cardRefNumber = this.state.cardData?.cardRefNumber;

    this._prepaidcardservice
      .fetchPrepaidCardLimits(productCode, cardRefNumber)
      .subscribe((res) => {
        let cardLimit = res.prepaid.Limits;
        this.state.productLimits = res.Product.Limits;
        this.state.limitCountries =  JSON.parse(JSON.stringify(res.prepaid.LimitCountries));
        this.state.initialLimitCountries =  JSON.parse(JSON.stringify(res.prepaid.LimitCountries));
        this.state.limitCountriesObj = {};
        this.state.limitCountries?.forEach(element => {
          if(Object.keys(this.state.limitCountriesObj).includes(element.continentDescription)) {
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

        this.state.contactlessPurchaseLimit.max = this.state.productLimits.contactlessMaxLimit;
        this.setValue("contactlessMaxLimit", Number(this.state.productLimits.contactlessMaxLimit));
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
          this.state.productLimits.intlContactMaxLimit;
        this.setValue(
          "intlConcatlessMaxLimit",
          Number(this.state.productLimits.intlContactMaxLimit)
        );
        this.state.intlContactlessPurchaseLimit.min =
          this.state.productLimits.intlContactMinLimit;
        this.setValue(
          "intlContactlessMinLimit",
          Number(this.state.productLimits.intlContactMinLimit)
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
        this.setValue("overallCardLimit", Number(res.Product.overAllLimit));

        this.setValue("intlContactlessPurchaseFlag",cardLimit.intlContactlessFlag);
        this.setValue("intlAtmFlag", cardLimit.intlAtmFlag);
        this.setValue("intlPosPayFlag", cardLimit.intlPosFlag);
        this.setValue("contactlessPurchaseFlag", cardLimit.contactlessFlag);
        this.setValue("onlinePurchaseFlag", cardLimit.onlineFlag);
        this.setValue("atmFlag", cardLimit.atmFlag);
        this.setValue("intlOnlinePurchaseFlag", cardLimit.intlOnlineFlag);
        this.setValue("posPayFlag", cardLimit.posFlag);
        

        this.setValue("atmLimit", Number(cardLimit.atmLimit));
        this.setValue("onlinePurchaseLimit", Number(cardLimit.onlineLimit));
        this.setValue("contactlessPurchaseLimit",Number(cardLimit.contactlessLimit));
        this.setValue("posPayLimit", Number(cardLimit.posLimit));

        this.setValue("intlAtmLimit", Number(cardLimit.intlAtmLimit));
        this.setValue("intlOnlinePurchaseLimit", Number(cardLimit.intlOnlineLimit));
        this.setValue("intlContactlessPurchaseLimit",Number(cardLimit.intlContactlessLimit));
        this.setValue("intlPosPayLimit", Number(cardLimit.intlPosLimit));

        this.cd.detectChanges();

        Object.keys(this.formGroup.value).forEach(element => {
          this.formGroup.get(element)?.updateValueAndValidity();
        });
        this.formGroup.updateValueAndValidity();
        this.initialFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
        this.state.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
        if(this.getRoutingParam('selecetedIndex')) this.activeTabIndex = this.getRoutingParam('selecetedIndex');
      });
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

  tabGroupDetailsCollapse() {}

  tabDetailsOpen(index: number) {
    console.log(index);
  }

  public handleFormOnPresubmit(payload: any) {
    payload.pplimitcountries = this.state.limitCountries;
    delete payload.searchText;
  }

  public override preSubmitInterceptor(payload: PcChangeLimit): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: PcChangeLimit) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.pcChangeLimit;
      routingInfo.setQueryParams({
        response: res,
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
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  onTabChanged(event: any) {
    if(event.index == 0) {
    }
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


