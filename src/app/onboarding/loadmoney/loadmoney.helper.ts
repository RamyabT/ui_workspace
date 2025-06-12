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
import { LoadmoneyService } from '../loadmoney-service/loadmoney.service';
import { Loadmoney } from '../loadmoney-service/loadmoney.model';
export class loadmoneyState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

  charges: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: 'INR', text: 'INR' }],
    amountInWords: false,
    initCurrency: 'CAD',
    defaultFetch: false,
  }
}


@Injectable()
export class loadmoneyHelper extends BaseFpxFormHelper<loadmoneyState> {

  constructor(private loadmoneyService: LoadmoneyService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new loadmoneyState());
  }

  override doPreInit(): void {
    this.setServiceCode("COBLOADMONEY");
    this.addValueChangeHandler("loadMoneyType", this.handleLoadMoneyTypeOnvalueChange);
    this.addValueChangeHandler("loadMoneyMethod", this.handleLoadMoneyMethodOnvalueChange);
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.formGroup.get('loadMoneyType')?.patchValue("1");
    this.formGroup.updateValueAndValidity();

    // this.setValue('iSOCodeList','+91');
    // this.formGroup.get('iSOCodeList')?.patchValue('+91');
  }
  public handleLoadMoneyTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == "1") {
      this.setHidden('nameOnCard', false);
      this.setHidden('cardNumber', false);
      this.setHidden('cvv', false);
      this.setHidden('cardexpirymonth', false);
      this.setHidden('cardexpiryyear', false);

      this.setHidden('loadMoneyMethod', true);
      this.setHidden('loadMoneyMethod', true);
      this.setHidden('virtualPaymentAddress', true);
      this.setHidden('iSOCodeList', true);
      this.setHidden('mobileNumber', true);
      this.setHidden('mobileNumberGroup', true);

      this.setMandatory('nameOnCard', true);
      this.setMandatory('cardNumber', true);
      this.setMandatory('cvv', true);
      this.setMandatory('cardexpirymonth', true);
      this.setMandatory('cardexpiryyear', true);

    } else if (value == "0") {
      this.setHidden('nameOnCard', true);
      this.setHidden('cardNumber', true);
      this.setHidden('cvv', true);
      this.setHidden('cardexpirymonth', true);
      this.setHidden('cardexpiryyear', true);

      this.setHidden('loadMoneyMethod', false);
      this.setMandatory('loadMoneyMethod', true);

      this.setHidden('iSOCodeList', true);
      this.setHidden('mobileNumber', true);
      this.setHidden('mobileNumberGroup', true);

      this.setHidden('virtualPaymentAddress', false);

      this.setMandatory('virtualPaymentAddress', true);

      this.setValue('loadMoneyMethod', "0");
      this.formGroup.get('loadMoneyMethod')?.patchValue("0");
      this.formGroup.updateValueAndValidity();
    }
  }
  public handleLoadMoneyMethodOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == "1") {
      this.setHidden('virtualPaymentAddress', true);

      this.setHidden('iSOCodeList', false);
      this.setHidden('mobileNumber', false);
      this.setHidden('mobileNumberGroup', false);


      this.setMandatory('iSOCodeList', true);
      this.setMandatory('mobileNumber', true);


    } else if (value == "0") {

      this.setHidden('iSOCodeList', true);
      this.setHidden('mobileNumber', true);
      this.setHidden('mobileNumberGroup', true);

      this.setHidden('virtualPaymentAddress', false);

      this.setMandatory('virtualPaymentAddress', true);
    }
  }

  public override doPostInit(): void {

    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Loadmoney): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Loadmoney) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.loadmoney,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        response: response.error.error,
        status: "failed"
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


