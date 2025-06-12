import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";

declare let $: any;

@Component({
  selector: 'app-retail-fbmember-schedule-template',
  templateUrl: './retail-fbmember-schedule-template.component.html',
  styleUrls: ['./retail-fbmember-schedule-template.component.scss']
})
export class RetailFbmemberScheduleTemplateComponent extends DepPanningComponent {
  currentSelectedData!: any;

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _transferunfavService: FavouritePaymentsValidator,
    protected _device: DeviceDetectorService,
    private momentService: MomentService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setRightActionBtnCount(1);
  }
  onClickRowData(selectedData: any) {
    let routePath;
    let queryParam: any = {
      paymentId: selectedData["paymentId"],
      serviceCode: selectedData["serviceCode"],
      mode: "V",
      action: "VIEW",
    };
    routePath = [
      "transfers-space",
      "display-shell",
      [...(routes as any)[selectedData["serviceCode"]]],
    ].flat();
     this._router.navigate(routePath, {
      queryParams: {
        ...queryParam,
        routeFrom: 'otherModule',
      },
    });
  }
  
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
     let paymentId = this.selectedData.paymentId;
    if (payload == 1) {
      this._transferunfavService.unMarkFavouritePayments(paymentId)
        .subscribe((res:any) => {
         });
    }
    if(this._device.isMobile()) this.doReverseAction();
  }

  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any) => {
    console.log("model closed...", payload);
    let selectedData = this.currentSelectedData
    let routePath;
    let queryParam: any = {
      "paymentId": selectedData["paymentId"],
      "serviceCode": selectedData["serviceCode"],
      "mode": 'D'
    }
    let date: any = this.momentService.getInstance();
    if (payload == 1) {
      routePath = ["transfers-space", "entry-shell", [...(routes as any)[selectedData["serviceCode"]]],].flat();
      console.log(selectedData);
      this._router.navigate(routePath, {
        queryParams: {
          ...queryParam,
          routeFrom: 'otherModule',
        }
      });
    }
    if(this._device.isMobile()) this.doReverseAction();
  }

  deleteAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(this._device.isMobile()) this.doReverseAction();
  }

  onClickFavourite(selectedData: TempScheduleRep) {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      title: "PreloginCheck.title"
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  editRowData(selectedData: TempScheduleRep) {
    let routePath;
    let queryParam: any = {
      "paymentId": selectedData["paymentId"],
      "serviceCode": selectedData["serviceCode"],
      "mode": 'M'
    }
    let date: any = this.momentService.getInstance();
    let currentDate: any = date.format("YYYY-MM-DD");
    routePath = ["fb-space","entry-shell",'fb', 'family-payment'].flat();

      
    console.log(selectedData);
    this._router.navigate(routePath,{
      queryParams: {
        ...queryParam,
        routeFrom: 'otherModule',
      }
    });
    // if(currentDate==selectedData["nextPaymentDate"]){
    //   //routePath = ["fb-space","entry-shell",[...(routes as any)[selectedData["serviceCode"]]],].flat();
    //   routePath = ["fb-space","entry-shell",'fb', 'family-payment'];

      
    //   console.log(selectedData);
    //   this._router.navigate(routePath,{
    //     queryParams: {
    //       ...queryParam,
    //       routeFrom: 'otherModule',
    //     }
    //   });}
    //   else{
    //     const fpxModal = new FpxModal();
    //     fpxModal.setComponent(DepAlertComponent);
    //     fpxModal.setDisableClose(false);
    //     fpxModal.setPanelClass('dep-alert-popup');
    //     fpxModal.setBackDropClass('dep-popup-back-drop');
    //     fpxModal.setData({
    //       title: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.confirm",
    //     message: "RetailSchedulePaymentTemplateComponent.message",
    //     okBtnLbl: "bene-advice-control.Y",
    //     cancelBtnLbl: "bene-advice-control.N",
    //     });
    //     fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    //   this.openModal(fpxModal);
    //   }
  }

  deleteRowData($event:any,selectedData: TempScheduleRep) {
    let routePath;
    this.currentSelectedData = selectedData;
    let queryParam: any = {
      "paymentId": selectedData["paymentId"],
      "serviceCode": selectedData["serviceCode"],
      "mode": 'D'
    }

    let date: any = this.momentService.getInstance();
    let currentDate: any = date.format("YYYY-MM-DD");
    if (selectedData.nextPaymentDate <= currentDate) {
      const fpxModal = new FpxModal();
      fpxModal.setComponent(DepAlertComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('dep-alert-popup');
      fpxModal.setBackDropClass('dep-popup-back-drop');
      fpxModal.setData({
        title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
        message: "RetailSchedulePaymentTemplateComponent.delAlertMsg"
      });
      
      fpxModal.setAfterClosed(this.deleteAfterClose);
      this.openModal(fpxModal);
    }
    else {
      $event.stopPropagation();
      this.selectedData = selectedData;
      const fpxModal = new FpxModal();
      fpxModal.setComponent(DepConfirmationComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass("dep-alert-popup");
      fpxModal.setBackDropClass("dep-popup-back-drop");
      fpxModal.setData({
        title: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.title",
        message: "RetailSchedulePaymentTemplateComponent.message",
        okBtnLbl: "bene-advice-control.Y",
        cancelBtnLbl: "bene-advice-control.N",
      });
      fpxModal.setAfterClosed(this.contextmenuModelAfterClose1);
      this.openModal(fpxModal);
     
    }
    
  }

}

const routes = {
  RETAILSCHFAMILYPAYMENTREQ: ['fb', 'family-payment']
}
