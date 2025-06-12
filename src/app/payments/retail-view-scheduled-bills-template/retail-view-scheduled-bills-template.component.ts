import { ChangeDetectorRef, Component, Renderer2, inject } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FpxAppConfig, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { Router } from "@angular/router";
import { DepPanningComponent, DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { SchedulebillpaymentslogService } from "../schedulebillpaymentslog-service/schedulebillpaymentslog.service";
import moment from "moment";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { ScheduledBillDetailsComponent } from "src/app/templates/scheduled-bill-details/scheduled-bills-details.component";

declare let $: any;

@Component({
  selector: "app-retail-view-scheduled-bills-template",
  templateUrl: "./retail-view-scheduled-bills-template.component.html",
  styleUrls: ["./retail-view-scheduled-bills-template.component.scss"],
  providers: [SchedulebillpaymentslogService]
})
export class RetailViewScheduledBillsTemplateComponent extends DepPanningComponent {

  editselectedData: any

  constructor(
    private renderer2: Renderer2,
    public fpxappConfig: FpxAppConfig,
    private _appConfig: AppConfigService,
    public _scheduledbillpaymentslog: SchedulebillpaymentslogService,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setLeftActionBtnCount(1);
    
  }

  public doPostInit(): void {
    console.log(this.index)
    if (this.index === 0) {
      this.selectedData.active = true;
      console.log(this.selectedData)
    }
  }

  decodeScheduleType(scheduleType: number): string {
    const scheduleMap: { [key: number]: string } = {
      1: 'Pay Now',
      2: 'Pay Later',
      3: 'Recurring',
    };
    return scheduleMap[scheduleType] || this.selectedData?.scheduleType;
  }



  editBill($event: any, selectedData: any) {
    $event.stopPropagation();
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
    $event.stopPropagation();
    this._appConfig.setData('setScheduleData', selectedData)
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Are you sure you want to Delete Scheduled Bill" + " " + selectedData?.beneficiaryName + " " + "?",
      // message: selectedData?.beneficiaryName +"?",
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }

  deleteScheduledBill(){
    
  }

  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    if (payload == 0) {
    }
    else{
      if (this._appConfig.hasData('scheduledBillRefresh$')) {
        this._appConfig.getData('scheduledBillRefresh$').subject.next({ payload: this.selectedData, deleteRequest: 1});
      }
    }
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
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._appConfig.setData('setScheduleData', selectedData)
    this._router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
        ...queryParams
      }
    })
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

  onDateClick($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
  }

}