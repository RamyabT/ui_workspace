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
  FpxModal,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { LoansService } from "../loans-service/loans.service";
import { ApplyloanService } from "../applyloan-service/applyloan.service";
export class ExistingLoanDetailsState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  sameBankOutstandingLoanAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: false
  }
  sameBankLoanAccountNumber: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: false
  }
  differentBankOutstandingLoanAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: false
  }
  differentBankLoanAccountNumber: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: false
  }
}


@Injectable()
export class ExistingLoanDetailsHelper extends BaseFpxFormHelper<ExistingLoanDetailsState> {

  constructor(private applyloanService:ApplyloanService, private _httpProvider: HttpProviderService,private _appConfig: AppConfigService, private _router: Router, private loansService: LoansService) {
    super(new ExistingLoanDetailsState());
  }

  override doPreInit(): void {

  }

  public override doPostInit(): void {
    this.setReadonly("sameBankOutstandingLoanAmount",true);
    this.addValueChangeHandler("sameBankLoanAccountNumber", this.handlesameBankLoanAccountNumberOnvalueChange);
  }

  public handlesameBankLoanAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let key: any = {
      loanAccountNumber: value
    }
    this.loansService.findByKey(key)().subscribe({
      next: (res: any) => {
        this.applyloanService.existingLoanDetails.next(res);
        this.setValue("sameBankOutstandingLoanAmount", {amount:res.loanAmount});
      }
    })
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.expensesDetails.tenantId.applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
}


