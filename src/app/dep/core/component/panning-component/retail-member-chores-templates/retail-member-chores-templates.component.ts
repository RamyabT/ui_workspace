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
  selector: 'app-retail-member-chores-templates',
  templateUrl: './retail-member-chores-templates.component.html',
  styleUrls: ['./retail-member-chores-templates.component.scss']
})
export class RetailMemberChoresTemplatesComponent extends DepPanningComponent implements OnInit {
  choreData: any;

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
    let endDate: any = moment(selectedData.dueDate);
    let daysDiff: any = endDate.diff(startDate, 'days');
     return daysDiff+'D';
  }

  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    if (payload == 1) {

    }
  }
  deleteGoal(selectedData: any) {
    this.choreData = selectedData;
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      message: "Delete Chore",
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
          action: 'DELETECHORE',
          choreData: this.choreData
        });
      }
    }
    this.choreData = [];

  }

  editGoal(selectedData: any) {
    let service = this._appConfig.getServiceDetails('RETAILTASKINFO');
    this._router.navigate(service.servicePath, {
      queryParams: {
        inventoryNumber: selectedData.inventoryNumber,
        mode: "M"
      }
    });
  }

  approve(selectedData: any){
    console.log("selectedData",selectedData);
    let shell = "";
    let action = "DECISION";
    shell = "decision-shell";
    
    const route = [
      "fb-space",
      shell,
      "workflow",
      "fb",
      "retail-add-task-form",
    ].flat();    
      this._router.navigate(route, {
        queryParams: {
          action: action,
          inventoryNumber: selectedData.inventoryNumber,
          shellType: 'DECISION',
        },
      })
  }
  
}


