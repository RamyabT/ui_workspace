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
import { UseralertcfgService } from '../useralertcfg-service/useralertcfg.service';
import { Useralertcfg } from '../useralertcfg-service/useralertcfg.model';
import { AppConfigService } from "@dep/services";
export class RetailManageAlertsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}


@Injectable()
export class RetailManageAlertsFormHelper extends BaseFpxFormHelper<RetailManageAlertsFormState> {

  constructor(
    private retailManageAlertsFormService: UseralertcfgService, 
    private _httpProvider: HttpProviderService, 
    private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new RetailManageAlertsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILMANAGEALERTS");
  }


  public override doPostInit(): void {
    // this.hideShellActions();
    this.removeShellBtn('BACK');
    let categoryCode = this.getRoutingParam('categoryCode');
    if(categoryCode){
      let userAlertData = this._appConfig.getData('useralertservicesData');
      console.log("userAlertData: ", userAlertData);
      if(userAlertData?.alertCategory?.title){
        this.setFormTitle(userAlertData.alertCategory.title);
      }
    }
  }


  public override preSubmitInterceptor(payload: Useralertcfg): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Useralertcfg) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.useralertcfg.userId.alertCategory,
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


