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
  FpxModal,
  FpxModalAfterClosed
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EtransfercustomerlogService } from '../etransfercustomerlog-service/etransfercustomerlog.service';
import { Etransfercustomerlog } from '../etransfercustomerlog-service/etransfercustomerlog.model';
import { EtransferService } from "../etransfer-service/etransfer.service";
import { AppConfigService } from "@dep/services";
import { Etransferautodepositlog } from "../etransferautodepositlog-service/etransferautodepositlog.model";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { DeviceDetectorService } from "@dep/core";
export class RetailEtransferAutodepositViewState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isDataReceived: boolean = false;
  gridData: any;
  interacAutoDepositDelete: any;
}


@Injectable()
export class RetailEtransferAutodepositViewHelper extends BaseFpxFormHelper<RetailEtransferAutodepositViewState> {
  showRegisterAutoDeposit: boolean = false;
  constructor(private etransfercustomerService: EtransfercustomerService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    public _device: DeviceDetectorService
  ) {
    super(new RetailEtransferAutodepositViewState());
  }

  override doPreInit(): void {
    this.hideShellActions();
  }
  public override doPostInit(): void {
    let interacAutoDepositDelete$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('interacAutoDepositDelete$', {
      "observable": interacAutoDepositDelete$.asObservable(),
      "subject": interacAutoDepositDelete$
    });

    this._appConfig.getData('interacAutoDepositDelete$').observable.subscribe(
      (res: any) => {
        if(res.action=='DELETE'){
          this.state.interacAutoDepositDelete=res.payload;
          this.setServiceCode('RETAILETRANSFERAUTODEPOSIT');
          this.triggerSubmit();
        }
      }
    );

  }
  addAutoDeposit() {
    this._appConfig.removeData('eTransferAutoDepositQueryParam');
    this._router.navigate(
      ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransferautodepositlog-form'], {
    });
  }
  handleETransfersAutoDepositGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    }
    if(this.state.gridData>=5){
      this.showRegisterAutoDeposit=false;
    }
    else{
      this.showRegisterAutoDeposit=true;
    }

  }

  backToeTransfers(){
    this._router.navigate(['etransfers-space', 'etransfers', 'etransfers-home']);
  }
  public override preSubmitInterceptor(payload: Etransferautodepositlog) {
    // WRITE CODE HERE TO HANDLE 
    let data: any = {
      "depositAccount": this.state.interacAutoDepositDelete.depositAccount,
      "emailID": this.state.interacAutoDepositDelete.emailID,
      "operationMode": "D",
      "termsFlag": "Y"

    }
    payload=data;
    return payload;
  }
  public override postDataFetchInterceptor(payload: Etransferautodepositlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.etransferautodepositlog;
      routingInfo.setQueryParams({
        response: res
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
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
}


