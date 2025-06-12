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
import { AppConfigService } from "@dep/services";
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { CasaAccountsEtransferListComponent } from "../casa-accounts-etransfer-list/casa-accounts-etransfer-list.component";
import { APPCONSTANTS } from "@dep/constants";
export class RetailEtransferDeclineFulfillRequestMoneyFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  accountBalanceVariable: any;
  eTransferUserData: any;
  securityAnswer: any;
  sourceAccount: any;
  reason: any;
  paymentId: any;
  status: any;
  nickname: any;
  casaAccounts: any;
  accType: any;
  Amount:Number=0;
  currency: string = APPCONSTANTS.baseCurrency;
  declineData:any;
}


@Injectable()
export class RetailEtransferDeclineFulfillRequestMoneyFormHelper extends BaseFpxFormHelper<RetailEtransferDeclineFulfillRequestMoneyFormState> {
  autoDepositFlag!: FormGroup;
  isDisabled: boolean = true;
  constructor(private retailEtransferDeclineFulfillRequestMoneyFormService: EtransferService,
    private _httpProvider: HttpProviderService,
    private _appConfig: AppConfigService,
    private momentService: MomentService,
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private casaAccountService: CasaaccountService,
    private _router: Router) {
    super(new RetailEtransferDeclineFulfillRequestMoneyFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("ETRFDCLFULFILLREQUESTMONEY");
    this.removeShellBtn('RESET');
    this.handleFormOnLoad();
  }


  public override doPostInit(): void {
  }

  public handleFormOnLoad() {
    this.state.declineData=this._appConfig.getData('formData');
    this._appConfig.setData('ReceiveMoneyformData', this.state.declineData);
  }

  public override preSubmitInterceptor(payload: Etransfer): any {
    // WRITE CODE HERE TO HANDLE 
    payload=this.state.declineData[0];
    delete payload.contactEmailId;
    delete payload.contactPhoneNumber;
    payload.remarks1=this.formGroup.controls['remarks1'].value;
    payload.remarks2=this.formGroup.controls['remarks2'].value;
    this._appConfig.setData('status', 'decline');
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfer
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode.value
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
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


