import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FpxModal } from "@fpx/core";
import { TransfersInfoFormComponent } from "src/app/transfers/transfers-info-form/transfers-info-form.component";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { PcTransactionInfoComponent } from "src/app/prepaidcard/pc-transaction-info/pc-transaction-info.component";

declare let $: any;

@Component({
  selector: "app-retail-pc-transfer-history-template",
  templateUrl: "./retail-pc-transfer-history-template.component.html",
  styleUrls: ["./retail-pc-transfer-history-template.component.scss"],
})
export class RetailPcTransferHistoryTemplateComponent extends DepPanningComponent implements OnInit {

    constructor(
        private renderer2: Renderer2,
        private changeDetectorRef: ChangeDetectorRef,
        private panningService: PanningService,
        private _router: Router,
        protected _appConfig: AppConfigService,
        protected _device: DeviceDetectorService
      ) {
        super(renderer2, changeDetectorRef,panningService);
      }
  

  override ngOnInit(): void {
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(1);
    console.log(this._appConfig.getMerchant());
    console.log(this._appConfig.getMerchantById(this.selectedData.merchantId))
  }

  onClickRowData(data: any) {
    const fpxModal = new FpxModal();
    fpxModal.setComponent(PcTransactionInfoComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('info-popup');
    fpxModal.setBackDropClass(['casa-transaction-info-back-drop']);
    fpxModal.setData({
      title: 'Transaction Details',
      transactionData: data
    });
    this.openModal(fpxModal);
  }

  onClickFavourite() {    
    let modal = new FpxModal();
    modal.setComponent(DepAlertComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      title: "PreloginCheck.title"
    });
    // modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  editRowData(selectedData: TempScheduleRep) {
    console.log(selectedData);
    this._router.navigate(['transfers-space','entry-shell','transfers','retail-bene-internal-form'],{
      queryParams: {
        'serviceCode': selectedData.serviceCode
      }
    });
  }
  

  editRaiseDispute(selectedData: TempScheduleRep) {
    console.log(selectedData);
    this._appConfig.setData('pcTransferHistory',selectedData);
    this._router.navigate(['cards-space','entry-shell','prepaidcard','retail-pc-raise-dispute-form'],{
      queryParams: {
        'serviceCode': selectedData.serviceCode,
        'transactionReference':selectedData.transactionReference
      }
    });
  }
}
