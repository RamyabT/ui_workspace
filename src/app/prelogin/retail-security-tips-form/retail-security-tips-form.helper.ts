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
import { SecuritypublishService } from "../securitypublish-service/securitypublish.service";
import { Securitypublish } from "../securitypublish-service/securitypublish.model";
import moment from "moment";
export class RetailSecurityTipsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  securityTips:any;
  isToggle:boolean=true;
}

@Injectable()
export class RetailSecurityTipsFormHelper extends BaseFpxFormHelper<RetailSecurityTipsFormState> {
  constructor(
    private retailSecurityTipsFormService: SecuritypublishService,
    private _httpProvider: HttpProviderService,
    private _router: Router
  ) {
    super(new RetailSecurityTipsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSECURITYPUBLISH");
    let todayDate = new Date();
    let effDate = moment(todayDate).format("YYYY-MM-DD");
    let key:any={
      applCode:'DEPRETAIL',
      effDate: effDate
    }
    this.retailSecurityTipsFormService
      .findByKey(key)()
      .subscribe({
        next: (res: any) => {
          this.state.securityTips=res.securitypublishdtls;
          this.state.securityTips=this.state.securityTips.map((item:any) => ({
            ...item,
            isToggle:this.state.isToggle
          }));
        },
      });
  }
  toggle(index: number) {
    this.state.securityTips[index].isToggle = !this.state.securityTips?.[index]?.isToggle;
  }
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  public override doPostInit(): void {
    this.removeShellBtn('BACK');
  }

  public override preSubmitInterceptor(payload: Securitypublish): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Securitypublish) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.securitypublish.applCode.effDate,
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
