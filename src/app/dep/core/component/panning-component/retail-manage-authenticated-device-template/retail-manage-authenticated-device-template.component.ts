import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FpxModal, FpxModalAfterClosed, FpxToastService, HttpProviderService, HttpRequest } from "@fpx/core";
import { TransfersInfoFormComponent } from "src/app/transfers/transfers-info-form/transfers-info-form.component";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { DcTransactionInfoComponent } from "src/app/debit-card/dc-transaction-info/dc-transaction-info.component";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { TranslateService } from "@ngx-translate/core";
import { NativeStorageManager } from "@dep/native";

declare let $: any;

@Component({
  selector: "app-retail-manage-authenticated-device-template",
  templateUrl: "./retail-manage-authenticated-device-template.component.html",
  styleUrls: ["./retail-manage-authenticated-device-template.component.scss"],
})
export class RetailManageAuthenticatedDeviceTemplateComponent extends DepPanningComponent implements OnInit {

  constructor(
    private _httpProvider: HttpProviderService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService,
    private _nativeStorageMgr: NativeStorageManager
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }


  override ngOnInit(): void {
    if (this._device.isDesktop()) {
      this.setLeftActionBtnCount(0);
      this.setRightActionBtnCount(1);
    } else {
      this.setLeftActionBtnCount(1);
      this.setRightActionBtnCount(0);
    }
  }

  deleteDevice(selectedData: any) {

    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      title: this._translateService.instant("MANAGEAUTHDEVICE.confirmation"),
      message: this._translateService.instant("MANAGEAUTHDEVICE.deleteStartMsg") + " " + selectedData.deviceName + " " + this._translateService.instant("MANAGEAUTHDEVICE.deleteEndMsg"),
    });
    modal.setAfterClosed(this.popupCloseEvent);
    this.openModal(modal);
  }

  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    if (payload == 1) {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userdevice');
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('IAM');
      payload = {
        "deviceId": this.selectedData?.deviceId,
        mode: 'D'
      }
      httpRequest.setBody(payload);
      this._httpProvider.invokeRestApi(httpRequest)?.subscribe({
        next: (res: any) => {
          this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.managemydevicedelete.title"), this._translateService.instant("TOASTMESSAGES.managemydevicedelete.message"), {duration: 1000});
          
          if (this._device.isHybrid()) {
            let deviceId = this._device.getDeviceInfo().deviceId;
            if (deviceId == this.selectedData.deviceId) {
              this._nativeStorageMgr.deleteData('deviceAuthEnabled').then((res: any) => { });
              this._nativeStorageMgr.deleteData('deviceAuthInfo').then((value: any) => {} );
            }
          }

          if (this._appConfig.hasData('settingsActionPublisher$')) {
            this._appConfig.getData('settingsActionPublisher$').subject.next({ action: 'MANAGEMYDEVICEREFRESHGRID' });
          }
        },
        error: (err: any) => {
          this._fpxToastService.showFailAlert(this._translateService.instant("TOASTMESSAGES.managemydevicedeletefail.title"), this._translateService.instant("TOASTMESSAGES.managemydevicedeletefail.message"), {duration: 1000});
        }
      });
    }
  }
}
