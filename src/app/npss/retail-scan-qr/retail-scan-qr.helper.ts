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
  FpxModal,
  FpxSubmitHandler,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { NpsssendmoneyService } from "../npsssendmoney-service/npsssendmoney.service";
import { Npsssendmoney } from "../npsssendmoney-service/npsssendmoney.model";
import { AppConfigService } from "@dep/services";
import { NpssMainService } from "../npss-service/npss-main.service";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
export class RetailScanQrState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  customerDetails: any = {

  }

  debitAccountDetails: any = {

  }
  accountBalance: any;
  qrCodeData: string = '';
  currency:any;
  expireTime:any;
  doStartTimer: Subject<void> = new Subject();



}


@Injectable()
export class RetailScanQrHelper extends BaseFpxFormHelper<RetailScanQrState>{

  constructor(private nPSSSendMoneyService: NpsssendmoneyService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private appConfigService: AppConfigService,
    private _npssMainService:NpssMainService) {
    super(new RetailScanQrState
      ());
  }

  override doPreInit(): void {
    this.state.expireTime = this.appConfigService.getData('expireTime')*60; 
}
onTimeout(){
  let modal = new FpxModal();
  modal.setComponent(DepAlertComponent);
  modal.setPanelClass('dep-alert-popup');
  modal.setBackDropClass('dep-popup-back-drop');
  modal.setDisableClose(false);
  modal.setData({
    message: "Your QR Code has expired. Generate new code ",
  });
  modal.setAfterClosed(this.flashCardModelAfterClose);
  this.openModal(modal);
}
flashCardModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._router.navigate(['npss-space'])
}

  handleFormOnLoad() {
   
    this.state.transactionAmount = this.appConfigService.getData('splitAmount');
    this.state.currency = this.appConfigService.getData('currency');
    let transactionAmount=this.state.transactionAmount;
    let currency = this.state.currency;
    this.setValue('transactionAmount',{amount:transactionAmount,currencyCode:currency});
    this.state.doStartTimer.next();
    
  }

  public handleTransactionAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  }


  public override doPostInit(): void {
    this.addValueChangeHandler('transactionAmount', this.handleTransactionAmountOnvalueChange);
    this.handleFormOnLoad();



  }

  handleFormOnPresubmit(payload: any) {

  }


  public override preSubmitInterceptor(payload: Npsssendmoney): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Npsssendmoney) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.npsssendmoney
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        }
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


