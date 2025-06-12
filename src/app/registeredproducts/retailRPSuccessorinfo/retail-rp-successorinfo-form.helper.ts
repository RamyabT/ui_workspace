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
import { RpcontractsuccessorinfoService } from '../rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.service';
import { Rpcontractsuccessorinfo } from '../rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.model';
// import {  Rpcontractbeneficiaryinfo } from '../rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.model';
import { AppConfigService } from "@dep/services";
export class RetailRPSuccessorinfoState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  successorElectConsent: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  beneElectConsent: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class RetailRPSuccessorinfoHelper extends BaseFpxFormHelper<RetailRPSuccessorinfoState> {
  FieldId_1!: FormGroup;

  constructor(private retailRPSuccessorinfoService: RpcontractsuccessorinfoService,
    private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new RetailRPSuccessorinfoState());
  }

  override doPreInit(): void {
    //  this.setServiceCode("RETAILRPSUCCESSORINFO");
    this.setServiceCode(this._appConfig.getData('serviceCode'));
  }


  public override doPostInit(): void {}

  public override preSubmitInterceptor(payload: Rpcontractsuccessorinfo): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postDataFetchInterceptor(payload: Rpcontractsuccessorinfo) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.rpcontractsuccessorinfo.tenantId.inventoryNumber,
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


