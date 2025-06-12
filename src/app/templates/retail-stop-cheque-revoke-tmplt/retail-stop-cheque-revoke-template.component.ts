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
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { AppConfigService } from '@dep/services';

declare let $: any;

@Component({
  selector: "app-retail-stop-cheque-revoke-template",
  templateUrl: "./retail-stop-cheque-revoke-template.component.html",
  styleUrls: ["./retail-stop-cheque-revoke-template.component.scss"],
})
export class RetailStopChequeRevokeTemplateComponent extends DepPanningComponent {
  currentSelectedData!: any;

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _transferunfavService: FavouritePaymentsValidator,
    protected _device: DeviceDetectorService,
    private momentService: MomentService,
    private _appconfig:AppConfigService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
  }


  getReason(reason: any) {
    let reasonText;
    switch (reason) {
      case '1': reasonText = 'Lost/Stolen'; break;
      case '2': reasonText = 'Mailed to incorrect address'; break;
      case '3': reasonText = 'Alternate payment arrangements made'; break;
      case '4': reasonText = 'Cheque contains incorrect information'; break;
      case '5': reasonText = 'Do not want to pay'; break;
      case '6': reasonText = 'Other'; break;
    }
    return reasonText;
  }
  revoke(selectedData: any){
    this._appconfig.setData('setStopChequeData', selectedData);
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-revoke-stop-cheque'], {
      queryParams: {
        relatedReference: selectedData.relatedReference
      }
    });
  }

}

