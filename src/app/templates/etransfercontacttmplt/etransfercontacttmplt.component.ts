import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { TNavigation, SpinnerService, FpxHttpConfig, FpxModal, HttpProviderService, CriteriaQuery, HttpRequest, FpxModalAfterClosed } from '@fpx/core';
import { Subscription, Subject } from 'rxjs';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { PanningService } from 'src/app/dep/services/panning.service';
import { Etransfercontactlog } from 'src/app/etransfers/etransfercontactlog-service/etransfercontactlog.model';
import { BeneficiariesService } from 'src/app/transfers/beneficiaries-service/beneficiaries.service';
import { FavouriteBeneficiariesValidator } from 'src/app/transfers/favouriteBeneficiaries-validator.service';

@Component({
  selector: 'app-etransfercontacttmplt',
  templateUrl: './etransfercontacttmplt.component.html',
  styleUrls: ['./etransfercontacttmplt.component.scss']
})
export class EtransfercontacttmpltComponent extends DepPanningComponent
  implements OnInit {
  // @Input("index") index:number = 0;
  // @Input("selectedData") selectedData:any = {};
  serviceCode: any;

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private FavouriteBeneficiariesValidator: FavouriteBeneficiariesValidator,
    private _beneficiariesService: BeneficiariesService,
    protected _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setLeftActionBtnCount(1);
    this.setRightActionBtnCount(2);
    this.serviceCode = this.getRoutingParam('serviceCode');
  }

  editRowData($event: any, selectedData: Etransfercontactlog) {
    $event.stopPropagation();
    this._router.navigate(
      [
        "etransfers-space",
        "entry-shell",
        "etransfers",
        "retail-etransfercontactlog-form-grid"
      ],
      {
        queryParams: {
          serviceCode: selectedData.serviceCode,
          beneId: selectedData.beneId,
          mode: 'M',
        },
      }
    );
  }

  deleteRowData($event: any, selectedData: Etransfercontactlog) {
    $event.stopPropagation();
    this._router.navigate(
      [
        "etransfers-space",
        "entry-shell",
        "etransfers",
        "retail-etransfercontactlog-form-grid"
      ],
      {
        queryParams: {
          serviceCode: selectedData.serviceCode,
          beneId: selectedData.beneId,
          mode: 'D',
          action: 'ADD'
        },
      }
    );
  }

  onClickRowData($event: any, selectedData: Etransfercontactlog) {
    $event.stopPropagation();
    let routePath;
    let queryParam: any = {
      inventoryNumber: selectedData["inventoryNumber"],
      serviceCode: selectedData["serviceCode"],
      mode: "V",
      action: "VIEW",
    };
    routePath = [
      "etransfers-space",
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
  unFavouriteRowData($event: any, selectedData: Etransfercontactlog) {
    $event.stopPropagation();
    let inventoryNumber = this.selectedData.inventoryNumber;
    this.FavouriteBeneficiariesValidator
      .unFavouriteBeneficiaries(inventoryNumber)
      .subscribe((res) => {
        console.log("Response", res)
      });
  }

  updateContact(selectedData: any) {
  if(!this._device.isMobile()){
    return;
  }
  if(this.serviceCode=='RETAILMANAGEETRANSFERCONTACT'){
    let service = this._appConfig.getServiceDetails(selectedData.serviceCode);

    let servicePath = service.servicePath;
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        beneId: selectedData.beneId,
        serviceCode: selectedData.serviceCode,
        mode: 'M'
      }
    });
  }
  }

  onClickContact($event: any) {
    // if(!this._device.isMobile()){
    //   $event.stopPropagation();
    //   $event.preventDefault();
    // }
  }

  // onClickFavourite($event: any, selectedData: Etransfercontactlog) {
  //   $event.stopPropagation();
  //   this.selectedData = selectedData;
  //   const fpxModal = new FpxModal();
  //   fpxModal.setComponent(DepConfirmationComponent);
  //   fpxModal.setDisableClose(false);
  //   fpxModal.setPanelClass("dep-alert-popup");
  //   fpxModal.setBackDropClass("dep-popup-back-drop");
  //   fpxModal.setData({
  //     title: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.confirm",
  //     message: (this.selectedData.isFavourite == "1" ? "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.unFavmessage" : "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.favmessage"),
  //     okBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.okBtnLbl",
  //     cancelBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.cancelBtnLbl",
  //   });
  //   fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
  //   this.openModal(fpxModal);
  // }

  // contextmenuModelAfterClose: FpxModalAfterClosed = (
  //   payload: any,
  //   addtionalData: any
  // ) => {
  //   console.log("model closed...", payload);
  //   let paymentId = this.selectedData.paymentId;
  //   if (payload == 1 && this.selectedData.isFavourite == "1") {
  //     let inventoryNumber = this.selectedData.inventoryNumber;
  //     this.FavouriteBeneficiariesValidator.unFavouriteBeneficiaries(
  //       inventoryNumber
  //     ).subscribe((res) => {
  //       this._beneficiariesService.refreshManageBeneficiary(this.selectedData);
  //     });
  //   } else if (payload == 1 && this.selectedData.isFavourite == "0") {
  //     let inventoryNumber = this.selectedData.inventoryNumber;
  //     this.FavouriteBeneficiariesValidator.markAsfavouriteBeneficiaries(
  //       inventoryNumber
  //     ).subscribe((res) => {
  //       this._beneficiariesService.refreshManageBeneficiary(this.selectedData);
  //     });
  //   } else {
  //     this.doReverseAction();
  //   }
  // };
}
const routes = {
  RETAILETRANSFERMANAGECONTACT: ["etransfers", "retail-etransfercontactlog-form"]
};
