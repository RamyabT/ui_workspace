import { Inject, Injectable } from "@angular/core";
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
  FpxModal,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, CustomProcessService } from "@dep/services";
import { Resumeback } from "src/app/onboarding/resumeback-service/resumeback.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PreloginCheckComponent } from "./prelogin-check.component";
export class PreloginCheckState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  header: any = {
    text: " Sample Text",
  };
}

@Injectable()
export class PreloginCheckHelper extends BaseFpxFormHelper<PreloginCheckState> {
  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    public _appConfig: AppConfigService,
    private _customProcessService: CustomProcessService,
  ) {
    super(new PreloginCheckState());
  }

  override doPreInit(): void {
    this.setServiceCode("CobResumebackForm");
    this.formGroup
      .get("onboardingRef")
      ?.patchValue(this._appConfig.getData("processId"));
  }

  public override doPostInit(): void {}

  public override preSubmitInterceptor(payload: Resumeback): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Resumeback) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.resumeback,
        transRef: response.success?.body?.resumeback.inventoryNumber,
        status: "success",
      });
      this._appConfig.setData('processId',response.success?.body?.resumeback.processId)
      this._customProcessService.fetchProcess(response.success?.body?.resumeback).subscribe({
        next: (res)=> {
          this._router.navigate(this._appConfig.getProcess(res?.body?.taskName,"CobResumebackForm")?.path,{
            queryParams: {
              "serviceCode": "RESUMEBACK",
              "reqRef": this._appConfig.getData('processId')
            }
          });
        }
      })
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
