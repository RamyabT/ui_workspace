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
import { AppConfigService } from '@dep/services';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import moment from 'moment';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';

declare let $: any;

@Component({
  selector: "retail-view-schedule-transfers-template",
  templateUrl: "./retail-view-schedule-transfers-template.component.html",
  styleUrls: ["./retail-view-schedule-transfers-template.component.scss"],
})
export class RetailScheduleTransfersTemplateComponent extends DepPanningComponent {
  editselectedData: any;

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService,
    protected _appConfig: AppConfigService,
    private casaAccountservice: CasaaccountService
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

  maskCreditAccountNumber(accountNumber:string):string{
    if(!accountNumber){
      return '';
    }
    else{
      return '********'+accountNumber.slice(-4);
    }

  }



  editBill($event: any, selectedData: any) {
    $event.stopPropagation();
    let isEditable = this._appConfig.canEditOrCancelTransfer(selectedData.paymentDate);
    console.log("isEditable", isEditable);
    this._appConfig.setData("isTransfersEditable", { isEditable: isEditable });
    this.navAction(selectedData, 'MODIFY', isEditable);
  }

  deleteBill($event: any, selectedData: any) {
    $event.stopPropagation();
    this._appConfig.setData('setScheduleTransferData', selectedData);
    var contactName=''
    if(selectedData?.serviceCode=='RETAILSCHOAT'){
      if(selectedData?.creditAccNickName){
        contactName=selectedData?.creditAccNickName;
      }
      else{
        contactName=selectedData?.creditAccProdDesc;
      }
    }
    else{
      contactName=selectedData?.beneficiaryName;
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

  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    // console.log(payload)
    if (payload == 0) {
    }
    else {
      if (this._appConfig.hasData('scheduledTransferDelete$')) {
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

  navAction(selectedData: any, formAction: string, editable: boolean = true) {

    // console.log(selectedData)
    // let key: any = {
    //   accountNumber: selectedData.creditAccountNumber
    // }

    // let serviceCode = '';

    // this.casaAccountservice.findByKey(key)().subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       serviceCode = 'RETAILSCHOAT';
    //       console.log(response)
    //       this.doNavigation(selectedData, formAction, editable, serviceCode)
    //     }
    //   },
    //   error: (error: any) => {
    //     serviceCode = 'RETAILSCHINTBT';
    //     this.doNavigation(selectedData, formAction, editable, serviceCode)
    //   }
    // });

    this.doNavigation(selectedData, formAction, editable, selectedData.serviceCode)
  }


  doNavigation(selectedData: any, formAction: string, editable: boolean = true, serviceCode: string) {
    let queryParams: any = {
      "paymentId": selectedData["paymentId"]
    }
    if (formAction === 'MODIFY') {
      queryParams.serviceCode = serviceCode
      queryParams.operationMode = 'M'
    }
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
        ...queryParams
      }
    })
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  getScheduleType(scheduleType: number): string {
    const scheduleMap: { [key: number]: string } = {
      1: 'Pay Now',
      2: 'Pay Later',
      3: 'Recurring',
    };
    return scheduleMap[scheduleType] || this.selectedData?.scheduleType;
  }

}

