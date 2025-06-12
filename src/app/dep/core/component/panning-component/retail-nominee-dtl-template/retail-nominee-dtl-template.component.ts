import { ChangeDetectorRef, Component, Renderer2, inject } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FpxAppConfig, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { Router } from "@angular/router";
import { DepPanningComponent, DeviceDetectorService } from "@dep/core";
import { PaymentsService } from "../../../../../payments/payments.service";
import { AppConfigService } from "@dep/services";

declare let $: any;

@Component({
  selector: "app-retail-nominee-dtl-template",
  templateUrl: "./retail-nominee-dtl-template.component.html",
  styleUrls: ["./retail-nominee-dtl-template.component.scss"],
})
export class RetailNomineeDtlTemplateComponent extends DepPanningComponent {

  constructor(
    private paymentsServices:PaymentsService,
    private renderer2: Renderer2,
    public fpxappConfig:FpxAppConfig,
    private _appConfig:AppConfigService,

    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
      this.setRightActionBtnCount(1);
  }


  deleteNominee($event:any, selectedData: any) {
    $event.stopPropagation();
    if(this._appConfig.hasData('contributionActionPublisher$')) {
      this._appConfig.getData('contributionActionPublisher$').subject.next({action: 'DELETENOMINEECONTRIBUTIONREQ',data:selectedData});
    }
  }




}