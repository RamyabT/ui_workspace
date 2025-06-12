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
import { NfcService } from '../nfc-service/nfc.service';
import { Nfc } from '../nfc-service/nfc.model';
export class CobNfcFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}


@Injectable()
export class CobNfcFormHelper extends BaseFpxFormHelper<CobNfcFormState>{

  constructor(private cobNfcFormService: NfcService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new CobNfcFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("NFC");
    this.hideShellActions();
  }


  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload: Nfc): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Nfc) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.nfc,
        transRef: response.success?.body?.nfc.applicantId,
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


