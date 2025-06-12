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
import { TermspublishService } from "../termspublish-service/termspublish.service";
import { Termspublish } from "../termspublish-service/termspublish.model";
import moment from "moment";
export class RetailTermsAndConditionsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsAndConditions: any;
  contentHeight: any;
}

@Injectable()
export class RetailTermsAndConditionsFormHelper extends BaseFpxFormHelper<RetailTermsAndConditionsFormState> {
  constructor(
    private retailTermsAndConditionsFormService: TermspublishService,
    private _httpProvider: HttpProviderService,
    private _router: Router
  ) {
    super(new RetailTermsAndConditionsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILTERMSANDCONDITIONS");
     this.removeShellBtn('BACK');
    let todayDate = new Date();
    let effDate = moment(todayDate).format("YYYY-MM-DD");
    let key: any = {
      applCode: "DEPRETAIL",
      effDate: effDate,
      serviceCode:"RETAILTERMSANDCONDITIONS"
    };
    this.retailTermsAndConditionsFormService.findByKey(key)().subscribe({
      next:(res:any)=>{
        this.state.termsAndConditions=res.termsInventoryNumber.description;
      }
    });
  }

  scrollToBottom() {
    window.scroll({
      top: this.state.contentHeight,
      left: 0,
      behavior: "smooth",
    });
  }
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  public override doPostInit(): void {}

  public override preSubmitInterceptor(payload: Termspublish): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Termspublish) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.termspublish.applCode.effDate,
        status: "success",
      });
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
