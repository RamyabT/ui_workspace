import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FpxModal, FpxModalAfterClosed, FpxToastService } from "@fpx/core";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AppConfigService } from "@dep/services";
import { FulfillRequestApprovalComponent } from 'src/app/wallet/fulfill-request-approval-form/fulfill-request-approval-form.component';

declare let $: any;

@Component({
  selector: 'app-retail-wallet-received-history',
  templateUrl: './retail-wallet-received-history.component.html',
  styleUrls: ['./retail-wallet-received-history.component.scss'],
})
export class RetailWalletReceivedHistoryComponent extends DepPanningComponent {
  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService,
    private _translateService: TranslateService,
    public _appConfig: AppConfigService,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setRightActionBtnCount(2);
  }

  onDecline($event: any, selectedData: any) {
    $event.stopPropagation();
    let fulfillRequestDetails:any={
      sourceWalletAccount: selectedData.fromWallet,
      // creditWalletAccount:selectedData.toWalletAccount,
      paymentAmount: Number(selectedData.amount),
      contactPhoneNumber: selectedData.mobileNumber,
    }
    this._appConfig.setData('DECLINEWALLETREQUEST',fulfillRequestDetails);
    this.selectedData = selectedData;
    let doDeclineText = "Are you sure to decline this request?";
    const fpxModal = new FpxModal();
    fpxModal.setComponent(FulfillRequestApprovalComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "Confirm",
      message: doDeclineText
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }

 

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let service = this._appConfig.getServiceDetails('RETAILWALLETTRANSFER');
    this._router.navigate(service.servicePath,{
      queryParams: {
      serviceCode:'DECLINEWALLETREQUEST'}
    });
    this.doReverseAction();
  }

  doAccept($event: any, rowData: any) {
    let fulfillRequestDetails:any={
      sourceWalletAccount: rowData.fromWallet,
      paymentAmount: rowData.amount,
      contactPhoneNumber: rowData.mobileNumber,
    }
    this._appConfig.setData('RETAILWALLETREQUESTMONEY',fulfillRequestDetails);
    let service = this._appConfig.getServiceDetails('RETAILWALLETTRANSFER');
    this._router.navigate(service.servicePath,{
      queryParams: {
      serviceCode:'RETAILWALLETREQUESTMONEY'}
    });    
  }
}
