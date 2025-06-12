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
import { ResumesuccessService } from '../resumesuccess-service/resumesuccess.service';
import { Resumesuccess } from '../resumesuccess-service/resumesuccess.model';
import { AppConfigService } from "@dep/services";
export class COBStagingFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  requestResponse: any;
}


@Injectable()
export class COBStagingFormHelper extends BaseFpxFormHelper<COBStagingFormState> {

  constructor(private cOBStagingFormService: ResumesuccessService, private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new COBStagingFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("COBSTAGING");
    this.state.requestResponse = this._appConfig.getData('processResponse');
  }


  public override doPostInit(): void {
    this.triggerSubmit();
  }


  public override preSubmitInterceptor(payload: Resumesuccess): any {
    // WRITE CODE HERE TO HANDLE 
    payload.processId = this.state.requestResponse?.requestPayload?.requestReference;
    return payload;
  }


  public override postDataFetchInterceptor(payload: Resumesuccess) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    
    let res: any = response.success?.body?.resumesuccess;
    if (response.success) {
      routingInfo.setQueryParams({
        response: res,
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


