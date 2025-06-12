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
import {  AppConfigService } from '@dep/services';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { ActionsPanelComponent } from 'src/app/foundation/actions-panel/actions-panel.component';
import moment from 'moment';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';

declare let $: any;

@Component({
  selector: "retail-view-schedule-transfers-mob-template",
  templateUrl: "./retail-view-schedule-transfers-mob-template.component.html",
  styleUrls: ["./retail-view-schedule-transfers-mob-template.component.scss"],
})
export class RetailScheduleTransfersMobTemplateComponent extends DepPanningComponent {
  currentSelectedData!: any;
  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;
  menuOptionBoundingRect: any;
  actions: any;
  editselectedData: any;

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService,
    private _appConfig: AppConfigService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setRightActionBtnCount(1);
  }
  decodeScheduleType(scheduleType: number): string {
    const scheduleMap: { [key: number]: string } = {
      1: 'Pay Now',
      2: 'Pay Later',
      3: 'Recurring',
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
        menuCode: "SCHEDULEDTRANSFERS"
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
  getContextMenu() {
    this.hideSpinner();
    this.actions = this._appConfig.getContextMenu('SCHEDULEDTRANSFERS');
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
    this._appConfig.setData('setScheduleData', selectedData);
    var contactName=''
    if(selectedData?.creditAccNickName){
      contactName=selectedData?.creditAccNickName
    }
    else{
      contactName=selectedData?.creditAccProdDesc
    }
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Are you sure you want to Delete Scheduled Transfers" +" "+contactName+ " "+selectedData?.creditAccountNumber,
      // message: selectedData?.beneficiaryName+ " "+selectedData?.creditAccountNumber,
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any) => {

  }
  navAction(selectedData: any, formAction: string) {

    let serviceCode = selectedData.serviceCode;
    let queryParams: any = {
      "paymentId": selectedData["paymentId"]
    }
    if (formAction === 'MODIFY') {
      queryParams.serviceCode = serviceCode
      queryParams.operationMode = 'M'
    }
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._appConfig.setData('setScheduleTransferData', selectedData)
    this._router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
        ...queryParams
      }
    })
  }
  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload == 0) {
    }
    else {
      if(this._appConfig.hasData('scheduledTransferDelete$')) {
        this._appConfig.getData('scheduledTransferDelete$').subject.next({ payload: this.selectedData, action: 'DELETE' });
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
      title: "Scheduled Transcation cannot be edited on the payment date",
      confirmationIcon: "warning"
    });
    fpxModal.setAfterClosed(this.editPopupModelAfterClose);
    this.openModal(fpxModal);
  }

  editPopupModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload == 0) {
    }
    else {
      // this.navAction(this.editselectedData, 'MODIFY');
    }
  }

}

