import { ChangeDetectorRef, Component, OnInit, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { Beneficiaries } from "src/app/transfers/beneficiaries-service/beneficiaries.model";
import { Router } from "@angular/router";
import { Favpayments } from "src/app/transfers/favpayments-service/favpayments.model";
import { FpxModal, FpxModalAfterClosed, FpxToastService } from "@fpx/core";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { TranslateService } from "@ngx-translate/core";

declare let $: any;

@Component({
  selector: "app-retail-view-all-fav-transfer-template",
  templateUrl: "./retail-view-all-fav-transfer-template.component.html",
  styleUrls: ["./retail-view-all-fav-transfer-template.component.scss"],
})
export class RetailViewAllFaTransferTemplateComponent
  extends DepPanningComponent
  implements OnInit
{
  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _transferfavService: FavouritePaymentsValidator,
    private _favpaymentsService: FavpaymentsService,
    protected _device: DeviceDetectorService,
    private _translateService: TranslateService,
    private _fpxToastService: FpxToastService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  override ngOnInit(): void {
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(1);
  }

  onClickUnFavourite($event:any, selectedData: Favpayments) {
    $event.stopPropagation();

    this.selectedData = selectedData;
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.title",
      message: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.message",
      okBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.okBtnLbl",
      cancelBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.cancelBtnLbl"
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...",payload);
    let paymentId=this.selectedData.paymentId;
    if(payload == 1){
      this._transferfavService.unMarkFavouritePayments(paymentId)
      .subscribe((res) => {
        console.log("Response",res);
        this._favpaymentsService.refreshViewAllFavTransfer(this.selectedData);
        this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.unFavTransfer.title"), this._translateService.instant("TOASTMESSAGES.unFavTransfer.message"));
      });
    }
    this.doReverseAction();
  }

  viewRowData($event: any, selectedData: Beneficiaries) {
    $event.stopPropagation();

    let routePath;
    let queryParam: any = {
      inventoryNumber: selectedData["inventoryNumber"],
      serviceCode: selectedData["serviceCode"],
      mode: "V",
      action: "VIEW",
    };
    routePath = [
      "transfers-space",
      "display-shell",
      [...(routes as any)[selectedData["serviceCode"]]],
    ].flat();
    console.log(selectedData);
    this._router.navigate(routePath, {
      queryParams: {
        ...queryParam,
      },
    });
  }
  
}

const routes = {
  RETAILBENEDOMESTIC: ["transfers", "retail-bene-dom-req"],
  RETAILBENEINTERNAL: ["transfers", "retail-bene-internal-form"],
  RETAILBENECC: ["transfers", "retail-bene-cc-req-form"],
  RETAILBENEINTL: ["transfers", "retail-bene-International-req-form"],
  RETAILBENECBAED: ["transfers", "retail-beneaedreq-form"],
};
