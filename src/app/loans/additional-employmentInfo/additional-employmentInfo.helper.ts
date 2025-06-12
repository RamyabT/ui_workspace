import { inject, Injectable } from "@angular/core";
import { FormArray, FormControlStatus } from "@angular/forms";
import { BaseFpxGridComponentState, BaseFpxGridHelper } from "@fpx/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  BaseFpxGridChangeHandler,
  HttpRequest,
  SpinnerService,
} from "@fpx/core";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class additionalEmploymentInfoState extends BaseFpxGridComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  monthlyIncome: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
  }
}

@Injectable()
export class additionalEmploymentInfoHelper extends BaseFpxGridHelper<additionalEmploymentInfoState> {
  constructor() {
    super(new additionalEmploymentInfoState());
  }

  public getGridWidth(): number {
    return 100;
  }







  public getGridColumnWidth(): number[] {
    return [15, 40, 40, 40, 15];
  }
  override doPreInit(): void {
  }

  override doPostInit(): void {

  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

}



