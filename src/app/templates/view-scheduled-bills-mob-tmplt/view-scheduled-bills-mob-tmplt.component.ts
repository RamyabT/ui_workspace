import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { ActionsPanelComponent } from 'src/app/foundation/actions-panel/actions-panel.component';
import { AppConfigService } from '@dep/services';
import { Viewscheduledbills } from 'src/app/payments/viewscheduledbills-service/viewscheduledbills.model';
import moment from 'moment';
import { ScheduledBillDetailsComponent } from '../scheduled-bill-details/scheduled-bills-details.component';

declare let $: any;

@Component({
  selector: "app-view-scheduled-bills-mob-tmplt",
  templateUrl: "./view-scheduled-bills-mob-tmplt.component.html",
  styleUrls: ["./view-scheduled-bills-mob-tmplt.component.scss"],
})
export class ViewScheduledBillsMobTmpltComponent extends DepPanningComponent {
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
    private appConfig: AppConfigService,
    private momentService: MomentService,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
  }

  decodeScheduleType(scheduleType: number): string {
    const scheduleMap : {[key:number]:string} = {
      1: 'Pay Now',
      2: 'Pay Later',
      3: 'Reccurring',
    };
    return scheduleMap[scheduleType] || this.selectedData?.scheduleType;
  }

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
        menuCode: "SCHEDULEDBILLPAYMENTS",
        fromPayeeScreen: true
      });
      modal.setAfterClosed(this.actionsModalAfterClosed);
      this.openModal(modal);
    }
    this.isDisplayContextMenu = false;
    // $event.preventDefault();
    // $event.stopPropagation()
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
    this.contextMenuPositionX = this.contextMenuPositionX - 11;
    this.isDisplayContextMenu = true;
  }
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
  deleteBill($event:any, selectedData: any) {
    // $event.stopPropagation();
    this.appConfig.setData('setScheduleData', selectedData)
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Are you sure you want to Delete Scheduled Bill" + " " + selectedData?.beneficiaryName + " " + "?",
      // message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any) => {

  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
    let paymentId = this.selectedData.paymentId;
    if (payload == 1) {
      this._transferunfavService.unMarkFavouritePayments(paymentId)
        .subscribe((res: any) => {
          console.log("Response", res);
        });
    }
    if (this._device.isMobile()) this.doReverseAction();
  }
  navAction(selectedData: any, formAction: string) {

    let serviceCode = "RETAILSCHBILLPAYMENTS";
    let queryParams: any = {
      "paymentId": selectedData["paymentId"]
    }
    if (formAction === 'MODIFY') {
      queryParams.serviceCode = serviceCode
      queryParams.operationMode = 'M'
    }
    let service = this.appConfig.getServiceDetails(serviceCode);
    this.appConfig.setData('setScheduleData', selectedData)
    this._router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
        ...queryParams
      }
    })
  }
  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    console.log(payload)
    if (payload == 0) {
    }
    else {
      if(this.appConfig.hasData('scheduledBillRefresh$')) {
        this.appConfig.getData('scheduledBillRefresh$').subject.next({ payload: this.selectedData, deleteRequest: 1 });
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


  showDetails() {
    const fpxModal = new FpxModal();
    fpxModal.setComponent(ScheduledBillDetailsComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass('full-view-popup');
    fpxModal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'scheduled-bill-details-popup-back-drop']);
    fpxModal.setData({
      data: this.selectedData
    });
    fpxModal.setAfterClosed(this.editPopupModelAfterClose);
    this.openModal(fpxModal);
    console.log(this.selectedData)
  }

}

