import { ChangeDetectorRef, Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { Router } from "@angular/router";
import { FpxModal, FpxModalAfterClosed, FpxToastService } from "@fpx/core";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { TranslateService } from "@ngx-translate/core";
import { EtransfersFavouritePaymentsValidator } from "src/app/etransfers/validators/etransfersFavouritePayments-validator.service";
import { FavpaymentsService } from "src/app/etransfers/favpayments-service/favpayments.service";
import { Favpayments } from "src/app/etransfers/favpayments-service/favpayments.model";
import { AppConfigService } from "@dep/services";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

declare let $: any;

@Component({
  selector: "app-retail-view-all-fav-etransfer-template",
  templateUrl: "./retail-view-all-fav-etransfer-template.component.html",
  styleUrls: ["./retail-view-all-fav-etransfer-template.component.scss"],
})
export class RetailViewAllFavETransferTemplateComponent
  extends DepPanningComponent
  implements OnInit {
  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _transferfavService: EtransfersFavouritePaymentsValidator,
    private _favpaymentsService: FavpaymentsService,
    protected _device: DeviceDetectorService,
    private _translateService: TranslateService,
    private _fpxToastService: FpxToastService,
    private _appConfig: AppConfigService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  override ngOnInit(): void {
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let paymentId = this.selectedData.paymentId;
    if (payload == 1) {
      this.showSpinner();
      this._transferfavService.unMarkFavouritePayments(paymentId)
        .subscribe({
          next: (res) => {
            this.hideSpinner();
            if (res?.error) {
              let modal = new FpxModal();
              modal.setComponent(DepConfirmationComponent);
              modal.setPanelClass('dep-alert-popup');
              modal.setBackDropClass(['dep-popup-back-drop','dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
              modal.setDisableClose(false);
              modal.setData({
                title: "Whoops…",
                message: "We're currently unable to access account details. Please try again later.",
                okBtnLbl: "Try again",
                cancelBtnLbl: "Cancel",
                confirmationIcon: 'cancel-e-transfer',
              });
              modal.setAfterClosed(this.contextmenuModelAfterClose1);
              this.openModal(modal);
            }
            else {
              let modal = new FpxModal();
              modal.setComponent(DepAlertComponent);
              modal.setPanelClass("dep-alert-popup");
              modal.setDisableClose(false);
              modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','frequent-transction-poppup']);
              modal.setData({
                alertIcon: "success",
                title: "Success!",
                message: "Your transcation marked as unfavourite",
                okBtnLbl: "Close"
              });
              modal.setAfterClosed(this.contextmenuModelAfterClose1);
              this.openModal(modal);
            }
          }
        })

    }
    this.doReverseAction();
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this._device.isMobile()) {
      this._angularRouter.navigate(['etransfers-space'], {
        queryParams: {
          refresh: "Y"
        }
      });
    } else {
      if (this._appConfig.hasData('etransfersUpdate$')) {
        this._appConfig.getData('etransfersUpdate$').subject.next({ event: 'fav-etransfer-change' });
      }
      this._angularRouter.navigate(['etransfers-space/etransfers/etransfers-home'], {
        queryParams: {
          refresh: "Y"
        }
      });
    }
    this._dialogRef.close();
  }

  viewRowData($event: any, selectedData: any) {
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
  deleteFavEtransaction($event: any, selectedData: Favpayments) {
    this.selectedData = selectedData;
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop','dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay','frequent-transction-poppup']);
    modal.setDisableClose(false);
    modal.setData({
      title: "Delete from frequent transactions?",
      okBtnLbl: "Yes, delete",
      cancelBtnLbl: "No",
      confirmationIcon: 'cancel-e-transfer'
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  repeatFavTransaction($event: any, selectedData: Favpayments) {
    let service = this._appConfig.getServiceDetails(selectedData.serviceCode);
    let servicePath = service.servicePath
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        paymentId: selectedData.paymentId,
        serviceCode: selectedData.serviceCode,
        mode: "R"
      }
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
