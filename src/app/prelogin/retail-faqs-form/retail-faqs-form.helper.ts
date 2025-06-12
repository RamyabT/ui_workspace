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
import { FaqpublishService } from "../faqpublish-service/faqpublish.service";
import { Faqpublish } from "../faqpublish-service/faqpublish.model";
import moment from "moment";
export class RetailFaqsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  faqs: any;
  isToggle: boolean = true;
}

@Injectable()
export class RetailFaqsFormHelper extends BaseFpxFormHelper<RetailFaqsFormState> {
  constructor(
    private retailFaqsFormService: FaqpublishService,
    private _httpProvider: HttpProviderService,
    private _router: Router
  ) {
    super(new RetailFaqsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILFAQPUBLISH");
    let todayDate = new Date();
    let effDate = moment(todayDate).format("YYYY-MM-DD");
    let key: any = {
      applnCode: "DEPRETAIL",
      effDate: effDate
    };
    this.retailFaqsFormService
      .findByKey(key)()
      .subscribe({
        next: (res: any) => {
          this.state.faqs = res.faqpublishdtls;
          this.state.faqs = this.state.faqs.map((item: any) => ({
            ...item,
            isToggle: this.state.isToggle,
          }));
        },
      });
  }
  toggle(index: number) {
    this.state.faqs[index].isToggle = !this.state.faqs?.[index]?.isToggle;
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

  public override preSubmitInterceptor(payload: Faqpublish): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Faqpublish) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.faqpublish.applnCode.effDate,
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
