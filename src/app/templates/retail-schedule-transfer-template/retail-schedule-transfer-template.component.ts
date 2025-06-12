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
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { ActionsPanelComponent } from 'src/app/foundation/actions-panel/actions-panel.component';
import { AppConfigService } from '@dep/services';
import moment from 'moment';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { CUUtilityManager } from '@app/utility';

declare let $: any;

@Component({
  selector: "app-retail-schedule-transfer-template",
  templateUrl: "./retail-schedule-transfer-template.component.html",
  styleUrls: ["./retail-schedule-transfer-template.component.scss"],
})
export class RetailScheduleTransferTemplateComponent extends DepPanningComponent {
  currentSelectedData!: any;
  editselectedData: any;

  contextMenuItems = [];
  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;
  shouldAllowEdit: boolean = false;
  actions: any;
  menuOptionBoundingRect: any;

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _transferunfavService: FavouritePaymentsValidator,
    protected _device: DeviceDetectorService,
    private momentService: MomentService,
    public appConfig: AppConfigService,
    public commonService: CommonService,
    public cuUtilityManagerService : CUUtilityManager 
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    console.log(this.selectedData)
    this.setRightActionBtnCount(1);
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
  action(item: any, index: number, selectedData: any) {
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
    else {
      this.deleteBill(index, selectedData);
    }
  }
  deleteBill($event: any, selectedData: any) {
    // $event.stopPropagation();
    this.appConfig.setData('setScheduleTransferData', selectedData);
    var contactName = ''
    if(selectedData?.serviceCode=='RETAILSCHOAT'){
      if(selectedData?.creditAccNickName){
        contactName=selectedData?.creditAccNickName;
      }
      else{
        contactName=selectedData?.creditAccProdDesc;
      }
    }
    else {
      contactName = this.maskCreditAccountNumber(selectedData?.creditAccountNumber);
    }

    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass("dep-alert-popup");
    fpxModal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'bottom-transparent-overlay', 'dep-cancel']);
    fpxModal.setData({
      // title: "RETAILSCHOAT.cancelMessage1",
      message: "RETAILSCHOAT.cancelMessage1",
      // description: "RETAILSCHOAT.cancelMessage2",
      okBtnLbl: "RETAILSCHOAT.okBtnLbl",
      cancelBtnLbl: "RETAILSCHOAT.cancelBtnLbl",
      confirmationIcon: "cancel-e-transfer"
    });

    fpxModal.setAfterClosed(this.cancelScheduledTransferAfterClose);
    this.openModal(fpxModal);
  }



  /** Display context menu */
  displayContextMenu($event: any, selectedData: any): void {
    console.log(selectedData)
    console.log(this.selectedData)
    this.shouldAllowEdit = this.cuUtilityManagerService.isAllowSIEdit(moment(this.selectedData.nextPaymentDate))
    console.log(this.shouldAllowEdit)
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

  maskCreditAccountNumber(accountNumber: string): string {
    if (!accountNumber) {
      return '';
    }
    else {
      return '********' + accountNumber.slice(-4);
    }

  }

  actionsModalAfterClosed: FpxModalAfterClosed = (payload: any) => {
    if (payload == 'delete') {
      this.deleteBill(payload, this.selectedData)
    }
    else if (payload == 'edit') {
      this.editBill(payload, this.selectedData)
    }
  }

  closeContext() {
    this.isDisplayContextMenu = !this.isDisplayContextMenu;
  }

  getContextMenu() {
    this.hideSpinner();
    this.actions = this.appConfig.getContextMenu('SCHEDULEDTRANSFERS');

    this.setMenuPosition();
  }

  setMenuPosition() {
    let currentTarget = this.menuOptionBoundingRect;
    let menuDefaultHeight = 46;
    let quickMenuHeight = ((this.actions.length * (menuDefaultHeight)) + 16);
    let footerHeight = 0;
    let menuTopFromCurrentTarget = this._device.isMobile() ? 38 : 58;
    let menuLeftToCurrentTarget = this._device.isMobile() ? 32 : 45;
    let menuSpaceTopY = menuTopFromCurrentTarget + quickMenuHeight;
    let endBottomY = currentTarget.top + menuTopFromCurrentTarget + quickMenuHeight + footerHeight;
    let quickMenuWidth = 133;

    this.contextMenuPositionX = currentTarget.left + menuLeftToCurrentTarget - quickMenuWidth;
    if (endBottomY < window.innerHeight) {
      this.contextMenuPositionY = currentTarget.top + menuTopFromCurrentTarget;
    }
    else if (currentTarget.top > menuSpaceTopY) {
      let finalY = currentTarget.top - 5 - quickMenuHeight;
      this.contextMenuPositionY = finalY;
    }
    else {
      this.contextMenuPositionY = currentTarget.top + 25 - (quickMenuHeight / 2);
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
  }
  navAction(selectedData: any, formAction: string) {

    let serviceCode = selectedData.serviceCode;
    let queryParams: any = {
      "paymentId": selectedData["paymentId"]
    }
    if (formAction === 'MODIFY') {
      queryParams.serviceCode = serviceCode
      queryParams.operationMode = 'M',
        queryParams.routeFrom = 'otherModule'
    }
    let service = this.appConfig.getServiceDetails(serviceCode);
    this.appConfig.setData('setScheduleData', selectedData)
    this._router.navigate(service.servicePath, {
      queryParams: {
        paymentId: queryParams.paymentId,
        serviceCode: queryParams.serviceCode,
        operationMode: queryParams.operationMode,
        routeFrom: queryParams.routeFrom,
      }
    });
    if (this.appConfig.hasData('moduleRefresh$')) {
      this.appConfig.getData('moduleRefresh$').subject.next({ action: 'TRANSFERSQUICKACTION', data: { serviceCode: serviceCode } });
    }
  }


  cancelScheduledTransferAfterClose: FpxModalAfterClosed = (payload: any) => {
    console.log(payload)
    if (payload == 1) {
      let deletePayload = {
        serviceCode: this.selectedData.serviceCode,
        scheduleId: this.selectedData.scheduleId,
        operationMode: "D",
        sourceAccount: this.selectedData.sourceAccount,
        creditAccountNumber: this.selectedData.creditAccountNumber,
        scheduleType: this.selectedData.scheduleType,
        paymentAmount: this.selectedData.paymentAmount,
        paymentCurrency: this.selectedData.paymentCurrency,
        paymentDate: this.selectedData.paymentDate,
        numberOfPayments: this.selectedData.numberOfPayments,
        endDate: this.selectedData.paymentEndDate,
        paymentFrequency: this.selectedData.paymentFrequency
      }
      console.log(deletePayload)
      this.commonService.deleteFromAside(deletePayload).subscribe((res: any) => {
        console.log("121212", res)
      })
    }
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
}

const routes = {
  RETAILSCHDOM: ['transfers', 'retail-domestic-transfer'],
  RETAILSCHOAT: ['transfers', 'retail-own-account-transfer-form'],
  RETAILSCHCC: ['transfers', 'retail-cc-transfer-form'],
  RETAILSCHINTBT: ['transfers', 'retail-within-bank-transfer-form'],
  RETAILSCHSWIFT: ['transfers', 'retail-international-transfer-form'],
  RETAILSCHFTS: ['transfers', 'retail-domestic-transfer'],
  RETAILTRANFTS: ['transfers', 'retail-domestic-transfer']
}
