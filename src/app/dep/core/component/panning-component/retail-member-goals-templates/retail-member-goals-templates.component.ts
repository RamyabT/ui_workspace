
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
import { MemberGoalViewDetailsComponent } from "src/app/fb/member-goal-view-details/member-goal-view-details.component";

declare let $: any;

@Component({
  selector: 'app-retail-member-goals-templates',
  templateUrl: './retail-member-goals-templates.component.html',
  styleUrls: ['./retail-member-goals-templates.component.scss']
})
export class RetailMemberGoalsTemplatesComponent extends DepPanningComponent implements OnInit {
  goalData: any;
  percentage: any;

  constructor(
    private _httpProvider: HttpProviderService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    public _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _pfmGoalsReqService: PfmgoalsreqService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }


  override ngOnInit(): void {
    console.log("selectedDatagoal",this.selectedData);
   this.percentage =  (this.selectedData.targetAmt / this.selectedData.contributionAmount) * 100
    if (this._device.isDesktop()) {
      this.setLeftActionBtnCount(0);
      this.setRightActionBtnCount(1);
    } else {
      this.setLeftActionBtnCount(1);
      this.setRightActionBtnCount(1);
    }
  }
 

    getDaysDifference(selectedData: any) {
      let startDate: any = moment(selectedData.auditDetails.createdOn );
      let endDate: any = moment(selectedData.dueDt);
      let daysDiff: any = endDate.diff(startDate, 'days');
       return daysDiff+'D';
    }

  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    let data : any = []
    this._appConfig.setData('goalsViewDataata' ,data);
    if (payload == 1) {

    }
  }
 

    onClickRowData(data: any) {
      const fpxModal = new FpxModal();
      fpxModal.setComponent(MemberGoalViewDetailsComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('info-popup');
      fpxModal.setBackDropClass(['casa-transaction-info-back-drop']);
      fpxModal.setData({
        title: 'Transaction Details',
        transactionData: data
      });
      this.openModal(fpxModal);
      this._appConfig.setData('goalsViewDataata' ,data);
 
    }
  deleteGoal(selectedData: any) {
    this.goalData = selectedData;
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
    console.log("model closed...", payload);
    if (payload == 1) {
      if (this._appConfig.hasData('fbActionPublisher$')) {
        this._appConfig.getData('fbActionPublisher$').subject.next({
          action: 'DELETEGOAL',
          goalData: this.goalData
        });
      }
    }
    this.goalData = [];

  }

  editGoal(selectedData: any) {
    let service = this._appConfig.getServiceDetails('RETAILGOALINFO');
    this._router.navigate(service.servicePath, {
      queryParams: {
        inventoryNumber: selectedData.inventoryNumber,
        mode: "M"
      }
    });
  }
}

