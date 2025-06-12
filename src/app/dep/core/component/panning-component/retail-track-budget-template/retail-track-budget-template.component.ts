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
import { PfmbudgetService } from "src/app/pfm/pfmbudget-service/pfmbudget.service";

declare let $: any;

@Component({
  selector: "app-retail-track-budget-template",
  templateUrl: "./retail-track-budget-template.component.html",
  styleUrls: ["./retail-track-budget-template.component.scss"],
})
export class RetailTrackBudgetTemplateComponent extends DepPanningComponent implements OnInit {
  budgetData!:any;
  constructor(
    private _httpProvider: HttpProviderService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    public _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager,
    private _pfmBudgetService:PfmbudgetService
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


  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    if (payload == 1) {

    }
  }
  editBudget(selectedData: any) {
    let service = this._appConfig.getServiceDetails('RETAILPFMBUDGETREQ');
    this._router.navigate(service.servicePath, {
      queryParams: {
        categoryCode: selectedData.categoryCode?.categoryCode,
        mode:"M"
      }
    });
  }
  deleteBudget(selectedData: any) {
    this.budgetData=selectedData;
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      message: "Delete budget",
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
            this._appConfig.getData('pfmActionPublisher$').subject.next(
              { action: 'DELETEBUDGET',
                budgetData:this.budgetData
              });
          }
    }
    this.budgetData=[];

  }

  getDaysDifference(selectedData: any){
    let startDate:any = moment(selectedData.startDate);
    let endDate:any = moment(selectedData.endDate);
    let daysDiff: any = endDate.diff(startDate,'days');
    return daysDiff
  }
}
