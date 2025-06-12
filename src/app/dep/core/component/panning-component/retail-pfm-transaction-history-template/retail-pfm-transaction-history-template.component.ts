import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FpxModal, FpxModalAfterClosed, FpxToastService, HttpProviderService, HttpRequest } from "@fpx/core";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { TranslateService } from "@ngx-translate/core";
import { NativeStorageManager } from "@dep/native";
import moment from "moment";
import { PfmgoalsreqService } from "src/app/pfm/pfmgoalsreq-service/pfmgoalsreq.service";

declare let $: any;

@Component({
  selector: "app-retail-pfm-transaction-history-template",
  templateUrl: "./retail-pfm-transaction-history-template.component.html",
  styleUrls: ["./retail-pfm-transaction-history-template.component.scss"],
})
export class RetailPfmTransactionTemplateComponent extends DepPanningComponent implements OnInit {
  goalData:any;
  
  constructor(
    private _httpProvider: HttpProviderService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    public _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _pfmGoalsReqService:PfmgoalsreqService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }


  override ngOnInit(): void {
    if (this._device.isDesktop()) {
      this.setLeftActionBtnCount(0);
      this.setRightActionBtnCount(0);
    } else {
      this.setLeftActionBtnCount(0);
      this.setRightActionBtnCount(0);
    }
  }

  getDaysDifference(selectedData: any){
      let startDate:any = moment(selectedData.startDate);
      let endDate:any = moment(selectedData.endDate);
      let daysDiff: any = endDate.diff(startDate,'days');
      return daysDiff
    }

  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    if (payload == 1) {
     
    }
  }
  deleteGoal(selectedData: any) {
    this.goalData=selectedData;
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      message: "Delete Goal",
      okBtnLbl: "Yes",
      cancelBtnLbl: "No"
    });
    modal.setAfterClosed(this.flashCardModelAfterClose);
    this.openModal(modal);

  }

  flashCardModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...",payload);
    if(payload==1){
      if (this._appConfig.hasData('pfmActionPublisher$')) {
        this._appConfig.getData('pfmActionPublisher$').subject.next({
           action: 'DELETEGOAL' ,
           goalData:this.goalData
          });
      }
    }
    this.goalData=[];

  }

  editGoal(selectedData: any) {
    let service = this._appConfig.getServiceDetails('RETAILMODIFYPFMGOALSREQ');
    this._router.navigate(service.servicePath, {
      queryParams: {
        inventoryNumber: selectedData.inventoryNumber,
      }
    });
  }
}
