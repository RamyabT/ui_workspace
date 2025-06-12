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
import { ManagetransactionlimitsService } from '../managetransactionlimits-service/managetransactionlimits.service';
import { Managetransactionlimits } from '../managetransactionlimits-service/managetransactionlimits.model';
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { AppConfigService } from "@dep/services";
export class ManageServiceLimitsState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  instaPay: any = {
    min: 1,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  oatTransfer: any = {
    min: 1,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  withinBankTransfer: any = {
    min: 1,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  domesticTransfer: any = {
    min: 1,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  internationalTransfer: any = {
    min: 1,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
}


@Injectable()
export class ManageServiceLimitsHelper extends BaseFpxFormHelper<ManageServiceLimitsState>{

  constructor(private manageServiceLimitsService: ManagetransactionlimitsService, private _httpProvider: HttpProviderService, private _router: Router,
    private _accountsService:AccountsService) {
    super(new ManageServiceLimitsState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILMANAGELIMITS");
  }


  public override doPostInit(): void {
    this.handleFormOnLoad();
    

  }
  handleFormOnLoad(){
    this._accountsService
      .ManageTransactionLimits()
      .subscribe((res) => {
        console.log(res);
        this.state.withinBankTransfer.max=res?.serviceTransactionLimits?.limits?.withinBank?.maxDailyLimit ? res?.serviceTransactionLimits?.limits?.withinBank?.maxDailyLimit: this.state.withinBankTransfer.max;
        this.state.domesticTransfer.max=res?.serviceTransactionLimits?.limits?.domestic?.maxDailyLimit ? res?.serviceTransactionLimits?.limits?.domestic?.maxDailyLimit: this.state.domesticTransfer.max;
        this.state.oatTransfer.max=res?.serviceTransactionLimits?.limits?.oat?.maxDailyLimit ? res?.serviceTransactionLimits?.limits?.oat?.maxDailyLimit : this.state.oatTransfer.max;
        this.state.instaPay.max=res?.serviceTransactionLimits?.limits?.instaPay?.maxDailyLimitv? res?.serviceTransactionLimits?.limits?.instaPay?.maxDailyLimit : this.state.instaPay.max;
        this.state.internationalTransfer.max=res?.serviceTransactionLimits?.limits?.international?.maxDailyLimit ? res?.serviceTransactionLimits?.limits?.international?.maxDailyLimit : this.state.internationalTransfer.max;
        this.state.withinBankTransfer.currencyCode=res?.serviceTransactionLimits?.limits?.currency;
        this.state.domesticTransfer.currencyCode=res?.serviceTransactionLimits?.limits?.currency;
        this.state.oatTransfer.currencyCode=res?.serviceTransactionLimits?.limits?.currency;
        this.state.instaPay.currencyCode=res?.serviceTransactionLimits?.limits?.currency;
        this.state.internationalTransfer.currencyCode=res?.serviceTransactionLimits?.limits?.currency;
        this.setValue('currency',this.state.internationalTransfer.currencyCode);
        this.setValue('withinBankTransfer',res?.serviceTransactionLimits?.limits?.withinBank?.actualLimit?res?.serviceTransactionLimits?.limits?.withinBank?.actualLimit:'');
        this.setValue('domesticTransfer',res?.serviceTransactionLimits?.limits?.domestic?.actualLimit?res?.serviceTransactionLimits?.limits?.domestic?.actualLimit:'');
        this.setValue('oatTransfer',res?.serviceTransactionLimits?.limits?.oat?.actualLimit?res?.serviceTransactionLimits?.limits?.oat?.actualLimit:'');
        this.setValue('instaPay',res?.serviceTransactionLimits?.limits?.instaPay?.actualLimit?res?.serviceTransactionLimits?.limits?.instaPay?.actualLimit:'');
        this.setValue('internationalTransfer',res?.serviceTransactionLimits?.limits?.international?.actualLimit?res?.serviceTransactionLimits?.limits?.international?.actualLimit:'');
      });
  }


  public override preSubmitInterceptor(payload: Managetransactionlimits): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Managetransactionlimits) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.managetransactionlimits;
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
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


