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
  FpxModal,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ResumebackService } from "../resumeback-service/resumeback.service";
import { Resumeback } from "../resumeback-service/resumeback.model";
import { AppConfigService } from "@dep/services";
export class CobResumebackFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  header: any = {
    text: " Sample Text",
  };
  formErrorMessage: string = "";
}

@Injectable()
export class CobResumebackFormHelper extends BaseFpxFormHelper<CobResumebackFormState> {
  constructor(
    private cobResumebackFormService: ResumebackService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new CobResumebackFormState());
    this.addValueChangeHandler(
      "resumeOption",
      this.handleResumeOptionOnvalueChange
    );
  }

  override doPreInit(): void {
    this.setServiceCode("OBRESUMEAPP");
    this.removeShellBtn("RESET");
    this.addShellButton('Back', 'BACK', 'btn-tertiary', 'ENTRY', 'button');
      this.setShellBtnMethod('DOWNLOAD', this.gotoWelcome.bind(this));

    // this.formGroup
    //   .get("onboardingRef")
    //   ?.patchValue(this._appConfig.getData("processId"));
  }

  gotoWelcome(payload: any) {
    this._angularRouter.navigate(['welcome']);
  }
  
  public handleResumeOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (value == 1) {
      this.setHidden("onboardingRef", true);
      this.setHidden("mobileNumber", false);
      this.setHidden("emailAddress", true);
    } else if (value == 2) {
      this.setHidden("mobileNumber", true);
      this.setHidden("onboardingRef", true);
      this.setHidden("emailAddress", false);
    } else if (value == 3) {
      this.setHidden("emailAddress", true);
      this.setHidden("onboardingRef", false);
      this.setHidden("mobileNumber", true);
    } else {
      this.setHidden("onboardingRef", true);
      this.setHidden("mobileNumber", true);
      this.setHidden("emailAddress", true);
    }
    this.state.formErrorMessage = "";
  };

  public override doPostInit(): void {
    this.state.formErrorMessage = "";
  }

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
    let res:any = response.success?.body?.resumeback;    
    if (response.success) {
      routingInfo.setQueryParams({
        response: res,
      });
    } else if (response.error) {
      this.state.formErrorMessage = response.error?.error?.ErrorDescription;
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
