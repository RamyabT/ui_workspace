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
import { RpcontractbeneficiaryinfoService } from '../rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.service';
import { Rpcontractbeneficiaryinfo } from '../rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.model';
import { AppConfigService } from "@dep/services";
export class RetailRPBeneficiaryInfoState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

}


@Injectable()
export class RetailRPBeneficiaryInfoHelper extends BaseFpxFormHelper<RetailRPBeneficiaryInfoState> {

  constructor(private retailRPBeneficiaryInfoService: RpcontractbeneficiaryinfoService,
    private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new RetailRPBeneficiaryInfoState());
  }

  override doPreInit(): void {
    //  this.setServiceCode("RETAILRPBENEFICIARYINFO");
    this.setServiceCode(this._appConfig.getData('serviceCode'));
    this.setDisabled('addAnotherBeneficiary', true);
  }


  public override doPostInit(): void {
    // this.addValueChangeHandler("proportion", this.handleProportionChange);

  }


  public override preSubmitInterceptor(payload: Rpcontractbeneficiaryinfo): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Rpcontractbeneficiaryinfo) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.rpcontractbeneficiaryinfo.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

  public handleProportionChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == 100) {
      this.setDisabled('actions_column', true);  
      this.setDisabled('addAnotherBeneficiary', true);
    }
    else {
      this._appConfig.setData('addAnotherBeneficiaryProportion', value);
      this.setDisabled('actions_column', false);
      this.setDisabled('addAnotherBeneficiary', false);
    }
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


