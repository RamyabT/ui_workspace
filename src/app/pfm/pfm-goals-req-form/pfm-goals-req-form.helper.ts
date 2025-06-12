import { inject, Injectable } from "@angular/core";
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
import { PfmgoalsreqService } from '../pfmgoalsreq-service/pfmgoalsreq.service';
import { Pfmgoalsreq } from '../pfmgoalsreq-service/pfmgoalsreq.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class PfmGoalsRequestFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  goalAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  advanceDebitAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  debitAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  accruedAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  startDate: any = {
    minDate: "",
    maxDate: "",
  }

  mode: string = "";
  inventoryNumber: string = "";

}


@Injectable()
export class PfmGoalsRequestFormHelper extends BaseFpxFormHelper<PfmGoalsRequestFormState> {

  constructor(private pfmGoalsRequestFormService: PfmgoalsreqService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new PfmGoalsRequestFormState());
  }

  override doPreInit(): void {
    this.addValueChangeHandler("goalDuration", this.handlegoalDurationOnvalueChange);
    this.addValueChangeHandler("advanceDebitAmount", this.handleadvanceDebitAmountOnvalueChange);
    this.addValueChangeHandler("goalAmount", this.handlegoalAmountOnvalueChange);
    this.setServiceCode("RETAILPFMGOALSREQ");
  }

  public handlegoalAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.calculateContributionAmount();
    }

  }


  public handleadvanceDebitAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.calculateContributionAmount();
    }

  }

  public handlegoalDurationOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.calculateContributionAmount();
    }

  }

  public handleFormOnLoad() {
    
    if(this.state.mode == "M"){
      this.state.inventoryNumber = this.getRoutingParam('inventoryNumber') || "";
      let key: any = {
        inventoryNumber: this.state.inventoryNumber
      }
  
      this.pfmGoalsRequestFormService.findByKey(key)().subscribe({
        next: (res: any) => {
          if (res) {
            this.setValue('goalName', res?.goalName);
            this.setValue('goalAmount', { amount: res?.goalAmount });
            this.setValue('debitAccount', res?.debitAccount);
            this.setValue('advanceDebitAmount', { amount: res?.advanceDebitAmount });
            this.setValue('goalDuration', res?.goalDuration);
            this.setValue('startDate', res?.startDate);
            this.setValue('frequency', res?.frequency);
            this.setValue('goalInventoryNumber', res?.inventoryNumber);
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  
      this.setReadonly('advanceDebitAmount', true);
      this.setReadonly('debitAmount', true);
      this.setReadonly('mode', true);
    }
  }

  public override doPostInit(): void {
    this.state.mode = this.getRoutingParam('mode') || "A";
    this.handleFormOnLoad();
  }

  calculateContributionAmount() {
    if (this.getValue('goalAmount') && this.getValue('advanceDebitAmount') && this.getValue('goalDuration')) {
      let goalAmount = this.getValue('goalAmount');
      let advanceDebitAmount = this.getValue('advanceDebitAmount');
      let goalDuration = this.getValue('goalDuration');
      let debitAmount = (goalAmount.amount - advanceDebitAmount.amount) / goalDuration;
      debitAmount = Math.floor(debitAmount);
      this.setValue('debitAmount', { amount: debitAmount, currency: goalAmount.currency });
    }
  }
  public override preSubmitInterceptor(payload: Pfmgoalsreq): any {
    // WRITE CODE HERE TO HANDLE 
    payload.debitAmount = this.getValue('debitAmount').amount;
    payload.advanceDebitAmount = this.getValue('advanceDebitAmount').amount;
    payload.goalAmount = this.getValue('goalAmount').amount;
    // payload.operationMode = this.state.mode;
    payload.mode = this.state.mode;

    if(this.state.inventoryNumber) payload.goalInventoryNumber = this.state.inventoryNumber;

    return payload;
  }


  public override postDataFetchInterceptor(payload: Pfmgoalsreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.pfmgoalsreq;
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


