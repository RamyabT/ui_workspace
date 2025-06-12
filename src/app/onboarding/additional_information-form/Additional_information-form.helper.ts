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
import { AdditionalInformationService } from '../additionalInformation-service/additionalInformation.service';
import { AdditionalInformation } from '../additionalInformation-service/additionalInformation.model';
export class AdditionalInformationState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}


@Injectable()
export class AdditionalInformationHelper extends BaseFpxFormHelper<AdditionalInformationState> {

  constructor(private additionalInformationService: AdditionalInformationService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new AdditionalInformationState());
    this.addValueChangeHandler(
      "country",
      this.handlecountryOnvalueChange
    );
    this.addValueChangeHandler(
      "yearResidence",
      this.handleyearResidenceOnvalueChange
    );
  }

  override doPreInit(): void {
    this.setServiceCode("ADDITIONALINFORMATION");
    this.setHidden("bankName", true);
    this.setHidden("accountNumber", true);
  }


  public override doPostInit(): void {

  }
  public handleyearResidenceOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    let year=((new Date()).getFullYear());
    if (year <= value) {
      this.setErrors('yearResidence', 'checkyear')

    }
   

  };
  public handlecountryOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "" || value == null) {
      this.setHidden("bankName", true);
      this.setHidden("accountNumber", true);

    }
    else if (value != null) {
      this.setHidden("bankName", false);
      this.setHidden("accountNumber", false);
    }

  };


  public override preSubmitInterceptor(payload: AdditionalInformation): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: AdditionalInformation) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.additionalInformation,
        transRef: response.success?.body?.additionalInformation.applicantId,
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


