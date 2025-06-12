import { Inject, Injectable, inject } from "@angular/core";
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
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import moment from "moment";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { formatDate } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { WallethistroyService } from "src/app/wallet/trans-history-service/wallethistroy.service";

export class EditLoanInfoFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  propCost: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
    min: 10,
    max: 10000
  }
  vehicleCost: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
    min: 10,
    max: 10000
  }
  downPayment: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
    min: 10,
    max: 10000
  }
  loanAmount: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency,
    min: 10,
    max: 10000
  }
  tenor: any = {
    step: 1,
    currencyCode: this._appConfig.baseCurrency,
    min: 1,
    max: 48
  }
  fromDate: any = {
    minDate: "",
    maxDate: "",
  }
  toDate: any = {
    minDate: "",
    maxDate: "",
  }
  formValues: any;
  LogDate = new Date()
  startDate: any
  startDate1: any
  endDate: any
  transType: any
  // transType: any

  transactionAmount: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
}


@Injectable()
export class EditLoanInfoFormHelper extends BaseFpxFormHelper<EditLoanInfoFormState> {
  private _appConfig: AppConfigService = inject(AppConfigService);
  constructor(private retailFilterTransactionService: WallethistroyService, private _httpProvider: HttpProviderService, private _router: Router,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,) {
    super(new EditLoanInfoFormState());
  }

  override doPreInit(): void {
    
  }

  public handleFormOnLoad() {
    this.setHidden('fromDate', true);
    this.setHidden('toDate', true);
  }


  public override doPostInit(): void {
  let loanSegments = this._appConfig.getData("loanSegments");
  if(loanSegments == "P"){
    this.setHidden("propCost",true);
    this.setHidden("downPayment",true);
    this.setHidden("vehicleCost",true);
  }
  else if(loanSegments == "V"){
    this.setHidden("propCost",true);
    this.setHidden("loanAmount",true);
  }
  else{
    this.setHidden("loanAmount",true);
    this.setHidden("vehicleCost",true);
  }

  }


  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('transactionReference');
    this.reset('beneficiaryName');
    this.reset('transactionPeriod');
    this.reset('transactionAmount');
    this.reset('purpose');
    this.reset('transferType');
  }

  public onViewClick: BaseFpxControlEventHandler = (payload: any) => {
    console.log('Clicked');

    this.state.formValues = {
      ...this.formGroup.value
    }

    this._dialogRef.close(this.state.formValues);


  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.completedpymnts.flowInstanceId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
}