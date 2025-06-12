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
import { CcrewardsService } from '../ccrewards-service/ccrewards.service';
import { Ccrewards } from '../ccrewards-service/ccrewards.model';
import { CcRewardBenefits } from '../ccRewardBenefits-service/ccRewardBenefits.model';
export class ccrewardsState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}


@Injectable()
export class ccrewardsHelper extends BaseFpxFormHelper<ccrewardsState> {
  ccRewardBenefits!: FormGroup;

  constructor(private ccrewardsService: CcrewardsService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new ccrewardsState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCCREWARDS");
  }


  public override doPostInit(): void {
    this.ccRewardBenefits = this.formGroup.get("ccRewardBenefits") as FormGroup;

  }


  public override preSubmitInterceptor(payload: Ccrewards): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Ccrewards) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.ccrewards,
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


