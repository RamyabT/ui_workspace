import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PfmtransactionService } from '../pfmtransaction-service/pfmtransaction.service';
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';
import { AppConfigService } from "@dep/services";
export class PfmTransactionHistoryFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  activeTabIndex: number = 1;
  spendsData: any;
}


@Injectable()
export class PfmTransactionHistoryFormHelper extends BaseFpxFormHelper<PfmTransactionHistoryFormState> {

  constructor(private pfmTransactionHistoryFormService: PfmtransactionService, private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new PfmTransactionHistoryFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILPFMTRANHISTORY");
    this.state.spendsData = this._appConfig.getData('donutArcSpendsData');
  }
  onTabChanged(event: any) {
  }


  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload: Pfmtransaction): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Pfmtransaction) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.pfmtransaction.tenantId.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


