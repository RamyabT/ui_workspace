import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FpxModal, FpxModalAfterClosed, FpxToastService, HttpProviderService, HttpRequest } from "@fpx/core";
import { TransfersInfoFormComponent } from "src/app/transfers/transfers-info-form/transfers-info-form.component";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { DcTransactionInfoComponent } from "src/app/debit-card/dc-transaction-info/dc-transaction-info.component";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-profile-doc-template",
  templateUrl: "./retail-profile-doc-template.component.html",
  styleUrls: ["./retail-profile-doc-template.component.scss"],
})
export class RetailProfileDocTemplateComponent extends DepPanningComponent implements OnInit {

  constructor(
    private _httpProvider: HttpProviderService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  override ngOnInit(): void {
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(1);
  }

  updateDoc(event: any, selectedData: any) {
    let sertvice = this._appConfig.getServiceDetails('RETAILUPDATEDOC');
    this._router.navigate(sertvice.servicePath, {
      queryParams: {
        serviceCode: 'RETAILUPDATEDOC',
        mode:"M",
        id:selectedData?.id
      }
    });
  }
}
