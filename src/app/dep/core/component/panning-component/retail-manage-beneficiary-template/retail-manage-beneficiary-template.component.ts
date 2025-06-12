import { ChangeDetectorRef, Component, OnInit, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { Beneficiaries } from "src/app/transfers/beneficiaries-service/beneficiaries.model";
import { Router } from "@angular/router";
import { FavouriteBeneficiariesValidator } from "src/app/transfers/favouriteBeneficiaries-validator.service";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { CriteriaQuery, FpxModal, FpxModalAfterClosed, HttpProviderService, HttpRequest, IHttpSuccessPayload } from "@fpx/core";
import { BeneficiariesService } from "src/app/transfers/beneficiaries-service/beneficiaries.service";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { AppConfigService } from "@dep/services";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { map } from "rxjs";
import { ActionsPanelComponent } from "src/app/foundation/actions-panel/actions-panel.component";

declare let $: any;

@Component({
  selector: "app-retail-manage-beneficiary-template",
  templateUrl: "./retail-manage-beneficiary-template.component.html",
  styleUrls: ["./retail-manage-beneficiary-template.component.scss"],
})
export class RetailManageBeneficiaryTemplateComponent
  extends DepPanningComponent
  implements OnInit {
  actions: any;

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
  }

      /** Display context menu */
      displayContextMenu($event: any): void {
        console.log($event)
        console.log(this.selectedData)
        if (this._device.isMobile()) {
          let modal = new FpxModal();
          modal.setComponent(ActionsPanelComponent);
          modal.setPanelClass('context-menu-popup');
          modal.setDisableClose(true);
          modal.setData({
            data: this.selectedData,
            menuCode: "RETAILMANAGEBENE"
          });
          modal.setAfterClosed(this.actionsModalAfterClosed);
          this.openModal(modal);
        }
        // this.isDisplayContextMenu = false;
        $event.preventDefault();
        $event.stopPropagation()
        // this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
        this.getContextMenu();
      }

      getContextMenu() {
        this.hideSpinner();
        this.actions = 'RETAILMANAGEBENE';
        // this.setMenuPosition();
      }

      actionsModalAfterClosed: FpxModalAfterClosed = (payload: any) => {
        console.log(payload)
        if (payload == 'delete') {
          this.deletePopUp(this.selectedData)
        }
        else if(payload == 'edit') {
          // this.editMobBiller(this.selectedData)
        }
      }

      // editMobBiller( selectedData: any) {
      //   // $event.stopPropagation();
      //   this.navAction(selectedData,'MODIFY')
      // }
  
  
      deletePopUp(selectedData: any) {
          // $event.stopPropagation();
          // this.navAction(selectedData,'DELETE')
          let modal = new FpxModal();
          modal.setComponent(DepConfirmationComponent);
          modal.setPanelClass('dep-alert-popup');
          modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
          modal.setDisableClose(true);
          modal.setData({
            title: "Are you sure you want to Delete the " + " " + selectedData?.beneNickName + " " + "Contact",
            // message: "DeleteBillerPopup.message",
            okBtnLbl: "DeleteBillerPopup.okBtnLbl",
            cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
            confirmationIcon: "delete"
          });
          modal.setAfterClosed(this.DelBillModelAfterClose);
          this.openModal(modal);
      }


  editRowData($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    this._router.navigate(
      [
        "transfers-space",
        "entry-shell",
        "transfers",
        "retail-bene-internal-form",
      ],
      {
        queryParams: {
          serviceCode: selectedData.serviceCode,
        },
      }
    );
  }

  deleteRowData($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    let routePath;
    let queryParam: any = {
      inventoryNumber: selectedData["inventoryNumber"],
      serviceCode: selectedData["serviceCode"],
      mode: "D",
      action: "ADD",
    };
    // let beneId = this.getRoutingParam('inventoryNumber');
    let beneId = selectedData.inventoryNumber;
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/tempScheduleRep');
    httpRequest.setContextPath('Payments');
    const httpCriteria = new CriteriaQuery();
    httpCriteria.addFilterCritertia('beneId', 'String', 'equals', {
      searchText: beneId  
    });
    httpCriteria.addFilterCritertia('paymentStatus', 'String', 'equals', {
      searchText: 'A'
    });
    httpRequest.setCriteriaQuery(httpCriteria);
    this._httpProvider
      .invokeRestApi(httpRequest).subscribe({
          next:(res:any)=>{
            console.log(res);
            if (res?.body?.tempScheduleRep) {
              const fpxModal = new FpxModal();
              fpxModal.setComponent(DepAlertComponent);
              fpxModal.setDisableClose(false);
              fpxModal.setPanelClass('dep-alert-popup');
              fpxModal.setBackDropClass('dep-popup-back-drop');
              fpxModal.setData({
                title: "RetailManageBeneficiaryTemplateComponent.delAlertTtl",
                message: "RetailManageBeneficiaryTemplateComponent.delAlertMsg"
              });
              fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
              this.openModal(fpxModal);
            }
            else {
              routePath = [
                "transfers-space",
                "entry-shell",
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
        });

      }
  initTransferRowData($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    let serviceCode = "";

    switch (selectedData.serviceCode) {
      case 'RETAILBENEINTERNAL':
        serviceCode = 'RETAILTRANINTBT'; break;
      case 'RETAILBENEDOMESTIC':
        serviceCode = 'RETAILTRANDOMESTIC'; break;
      case 'RETAILBENECC':
        serviceCode = 'RETAILTRANCC'; break;
      case 'RETAILBENEINTL':
        serviceCode = 'RETAILTRANSWIFT'; break;
    }
    
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.servicePath, {
    queryParams: {
        inventoryNumber:selectedData.inventoryNumber
      }
    });
  }

  onClickRowData($event:any, selectedData: Beneficiaries) {
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

  unFavouriteRowData($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    let inventoryNumber = this.selectedData.inventoryNumber;
    this.FavouriteBeneficiariesValidator
      .unFavouriteBeneficiaries(inventoryNumber)
      .subscribe((res) => {
        console.log("Response", res)
      });
  }

  onClickFavourite($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    this.selectedData = selectedData;
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass("dep-alert-popup");
    fpxModal.setBackDropClass("dep-popup-back-drop");
    fpxModal.setData({
      title: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.confirm",
      message:(this.selectedData.isFavourite == "1" ? "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.unFavmessage" : "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.favmessage"),
      okBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.okBtnLbl",
      cancelBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.cancelBtnLbl",
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (
    payload: any,
    addtionalData: any
  ) => {
    console.log("model closed...", payload);
    let paymentId = this.selectedData.paymentId;
    if (payload == 1 && this.selectedData.isFavourite == "1") {
      let inventoryNumber = this.selectedData.inventoryNumber;
      this.FavouriteBeneficiariesValidator.unFavouriteBeneficiaries(
        inventoryNumber
      ).subscribe((res) => {
        this._beneficiariesService.refreshManageBeneficiary(this.selectedData);
      });
    } else if (payload == 1 && this.selectedData.isFavourite == "0") {
      let inventoryNumber = this.selectedData.inventoryNumber;
      this.FavouriteBeneficiariesValidator.markAsfavouriteBeneficiaries(
        inventoryNumber
      ).subscribe((res) => {
        this._beneficiariesService.refreshManageBeneficiary(this.selectedData);
      });
    } else {
      this.doReverseAction();
    }
  };

  editBill($event: any, selectedData: any) {
    $event.stopPropagation();
    this.navAction(selectedData, 'MODIFY');
  }

  navAction(selectedData: any, formAction: string) {

    let serviceCode = "RETAILBENEINTERNAL";
    let queryParams: any = {
      "inventoryNumber": selectedData["inventoryNumber"]
    }
    if (formAction === 'MODIFY') {
      queryParams.serviceCode = serviceCode
      queryParams.operationMode = 'M'
    }
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._appConfig.setData('setManageBeneData', selectedData)
    this._router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
        ...queryParams
      }
    })
  }

  deleteBill($event:any, selectedData: any) {
    $event.stopPropagation();
    // this._appConfig.setData('setScheduleData', selectedData)
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Are you sure you want to Delete the " + " " + selectedData?.beneNickName + " " + "Contact",
      // message: selectedData?.beneficiaryName +"?",
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }

  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    if (payload == 0) {
    }
    else{
      if (this._appConfig.hasData('manageBeneRefresh$')) {
        this._appConfig.getData('manageBeneRefresh$').subject.next({ payload: this.selectedData, deleteRequest: 1});
      }
    }
  }

  // payBill($event:any, selectedData: any) {
  //   $event.stopPropagation();
  //   // this.navAction(selectedData,'DELETE')
  //   let modal = new FpxModal();
  //   modal.setComponent(DepConfirmationComponent);
  //   modal.setPanelClass('dep-alert-popup');
  //   modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
  //   modal.setDisableClose(true);
  //   modal.setData({
  //     title:"Are you sure you want to Delete the Payee"+" "+ selectedData?.billerId?.name+" "+"?",
  //     message: "DeleteBillerPopup.message",
  //     okBtnLbl: "DeleteBillerPopup.okBtnLbl",
  //     cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
  //     confirmationIcon: "delete"
  //   });
  //   modal.setAfterClosed(this.DelBillerReqModelAfterClose);
  //   this.openModal(modal);
  // }

  // DelBillerReqModelAfterClose: FpxModalAfterClosed = (payload) => {
  //   console.log(payload)
  //   if (payload == 0) {

  //   }
  //   else {
  //     if (this._appConfig.hasData('billerRefresh$')) {
  //         this._appConfig.getData('billerRefresh$').subject.next({ payload: this.selectedData, deleteRequest: 1});
  //     }
  //   }

  // }
}

const routes = {
  RETAILBENEDOMESTIC: ["transfers", "retail-bene-dom-req"],
  RETAILBENEINTERNAL: ["transfers", "retail-bene-internal-form"],
  RETAILBENECC: ["transfers", "retail-bene-cc-req-form"],
  RETAILBENEINTL: ["transfers", "retail-bene-International-req-form"],
  RETAILBENECBAED: ["transfers", "retail-beneaedreq-form"],
};
