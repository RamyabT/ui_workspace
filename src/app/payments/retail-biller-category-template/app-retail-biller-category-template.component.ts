import { ChangeDetectorRef, Component, Renderer2, inject } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FpxAppConfig, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { Router } from "@angular/router";
import { DepPanningComponent, DeviceDetectorService } from "@dep/core";
import { PaymentsService } from "../payments.service";
import { AppConfigService } from "@dep/services";

declare let $: any;

@Component({
  selector: "app-retail-biller-category-template",
  templateUrl: "./retail-biller-category-template.component.html",
  styleUrls: ["./retail-biller-category-template.component.scss"],
})
export class RetailBillerCategoryTemplateComponent extends DepPanningComponent {

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
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(0);
  }

  navToBiller(event:any,item:any){
    event.stopPropagation();

    let sertvice = this._appConfig.getServiceDetails('RETAILBILLERLISTGOGRID');
    this._angularRouter.navigate(sertvice.servicePath, {
      queryParams: {
        categoryCode: item.categoryCode,
        serviceCode: 'RETAILBILLERLISTGOGRID' 
      }
    });
  }

}