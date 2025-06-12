import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { ActionsPanelComponent } from 'src/app/foundation/actions-panel/actions-panel.component';
import { AppConfigService } from '@dep/services';
import moment from 'moment';

declare let $: any;

@Component({
  selector: "app-retail-schedule-bills-template",
  templateUrl: "./retail-schedule-bills-template.component.html",
  styleUrls: ["./retail-schedule-bills-template.component.scss"],
})
export class RetailScheduleBillsTemplateComponent extends DepPanningComponent {
  currentSelectedData!: any;

  contextMenuItems = [];
  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;
  shouldDisableEdit: boolean = false;
  actions: any;
  menuOptionBoundingRect: any;
  editselectedData: any


  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _transferunfavService: FavouritePaymentsValidator,
    protected _device: DeviceDetectorService,
    private momentService: MomentService,
    private appConfig: AppConfigService,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.shouldDisableEdit = this.appConfig.checkForPSTAboveNinePM(new Date());
    console.log(this.shouldDisableEdit)
    this.setRightActionBtnCount(1);
  }
  

  // contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
  //   console.log("model closed...", payload);
  //   let paymentId = this.selectedData.paymentId;
  //   if (payload == 1) {
  //     this._transferunfavService.unMarkFavouritePayments(paymentId)
  //       .subscribe((res: any) => {
  //         console.log("Response", res);
  //       });
  //   }
  //   if (this._device.isMobile()) this.doReverseAction();
  // }

  deleteAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this._device.isMobile()) this.doReverseAction();
  }

  // onClickFavourite(selectedData: TempScheduleRep) {
  //   let modal = new FpxModal();
  //   modal.setComponent(DepConfirmationComponent);
  //   modal.setPanelClass('dep-alert-popup');
  //   modal.setBackDropClass('dep-popup-back-drop');
  //   modal.setDisableClose(false);
  //   modal.setData({
  //     title: "PreloginCheck.title"
  //   });
  //   modal.setAfterClosed(this.contextmenuModelAfterClose);
  //   this.openModal(modal);
  // }

  editBill($event: any, selectedData: any) {
    // $event.stopPropagation();
    let currentDate = moment(new Date()).format('YYYY-MM-DD');
    if (selectedData.paymentDate == currentDate) {
      this.editselectedData = selectedData;
      this.editPopup(selectedData)
    }
    else {
      this.navAction(selectedData, 'MODIFY');
    }
  }
  action(item: any, index:number, selectedData: any) {
    this.isDisplayContextMenu = false;
    if (item.id == 'edit') {
      let currentDate = moment(new Date()).format('YYYY-MM-DD');
      if (selectedData.paymentDate == currentDate) {
        this.editselectedData = selectedData;
        this.editPopup(selectedData)
      }
      else {
        this.navAction(selectedData, 'MODIFY');
      }
    }
    else{
      this.deleteBill(index, selectedData);
    }
  }

  deleteBill($event:any, selectedData: any) {
    // $event.stopPropagation();
    this.appConfig.setData('setScheduleData', selectedData)
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    // modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    // modal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'bottom-transparent-overlay']);
    modal.setBackDropClass(['dep-popup-back-drop', 'delete-bill-backdrop', 'bottom-transparent-overlay', 'delete-scheduled-bill-backdrop']);

    modal.setDisableClose(true);
    modal.setData({
      title: "Delete your scheduled bill to" + " " + selectedData.beneficiaryName + "?",
      // message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }

  /** Display context menu */
  displayContextMenu($event: any,selectedData:any): void {
    console.log($event)
    console.log(this.selectedData)
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(ActionsPanelComponent);
      modal.setPanelClass('context-menu-popup');
      modal.setDisableClose(true);
      modal.setData({
        data: this.selectedData,
        menuCode: "SCHEDULEDBILLPAYMENTS"
      });
      modal.setAfterClosed(this.actionsModalAfterClosed);
      this.openModal(modal);
    }
    this.isDisplayContextMenu = false;
    $event.preventDefault();
    $event.stopPropagation()
    this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
    this.getContextMenu();
  }

  actionsModalAfterClosed: FpxModalAfterClosed = (payload: any) => {
    console.log(payload)
    if (payload == 'delete') {
      this.deleteBill(payload,this.selectedData)
    }
    else if(payload == 'edit') {
      this.editBill(payload,this.selectedData)
    }
  }

  closeContext() {
    this.isDisplayContextMenu = !this.isDisplayContextMenu;
  }

  getContextMenu() {
    this.hideSpinner();
    this.actions = this.appConfig.getContextMenu('SCHEDULEDBILLPAYMENTS');
    this.setMenuPosition();
  }

  setMenuPosition() {
    let currentTarget = this.menuOptionBoundingRect;
    let menuDefaultHeight = 46;
    let quickMenuHeight = ((this.actions.length * (menuDefaultHeight)) + 16);
    let footerHeight = 0;
    let menuTopFromCurrentTarget = this._device.isMobile()? 38: 58;
    let menuLeftToCurrentTarget = this._device.isMobile()? 32: 45;
    let menuSpaceTopY = menuTopFromCurrentTarget + quickMenuHeight;
    let endBottomY = currentTarget.top + menuTopFromCurrentTarget + quickMenuHeight + footerHeight;
    let quickMenuWidth = 133;

    this.contextMenuPositionX = currentTarget.left + menuLeftToCurrentTarget - quickMenuWidth;
    if(endBottomY < window.innerHeight) {
      this.contextMenuPositionY = currentTarget.top + menuTopFromCurrentTarget;
    }
    else if(currentTarget.top > menuSpaceTopY) {
      let finalY = currentTarget.top - 5 - quickMenuHeight;
      this.contextMenuPositionY = finalY;
    }
    else {
      this.contextMenuPositionY = currentTarget.top + 25 - (quickMenuHeight/2);
    }
    this.contextMenuPositionY = this.contextMenuPositionY;
    this.contextMenuPositionX = this.contextMenuPositionX - 28;
    this.isDisplayContextMenu = true;
  }
  

  /** context-menu */
  getContextMenuStyle() {
    return {
      'position': 'absolute',
      'right': '8px',
      'top': '58px'
    };
  }
  navAction(selectedData: any, formAction: string) {

    let serviceCode = "RETAILSCHBILLPAYMENTS";
    let queryParams: any = {
      "paymentId": selectedData["paymentId"]
    }
    if (formAction === 'MODIFY') {
      queryParams.serviceCode = serviceCode
      queryParams.operationMode = 'M',
      queryParams.routeFrom= 'otherModule'
    }
    let service = this.appConfig.getServiceDetails(serviceCode);
    this.appConfig.setData('setScheduleData', selectedData)
    this._router.navigate(service.servicePath, {
      queryParams: {
        paymentId: queryParams.paymentId,
        serviceCode: queryParams.serviceCode,
        routeFrom: queryParams.routeFrom,
      }
    });
  }

  getInitial() {
    let billerInitial = this.selectedData.beneficiaryName?.split(' ')?.[0]?.charAt(0)?.toUpperCase();
    return billerInitial
  }

  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    if (payload == 1) {
      if (this.appConfig.hasData('scheduledBillAction$')) {
        this.appConfig.getData('scheduledBillAction$').subject.next({ payload: this.selectedData, deleteRequest: 1, action: 'DELETE' });
      }
    }
  }
  editPopup(selectedData: any) {
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepAlertComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    fpxModal.setData({
      title: "Scheduled Bill cannot be edited on the payment date",
      confirmationIcon: "warning"
    });
    fpxModal.setAfterClosed(this.editPopupModelAfterClose);
    this.openModal(fpxModal);
  }

  editPopupModelAfterClose: FpxModalAfterClosed = (payload) => {
  }
}

