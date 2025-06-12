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
  SpinnerService,
  ILookupResponse,
  FpxModal,
  CriteriaQuery,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BilleraccountService } from "../billeraccount-service/billeraccount.service";
import { AppConfigService } from "@dep/services";
import { MultibillrequestService } from "../multibillrequest-service/multibillrequest.service";
import { Multibillrequest } from "../multibillrequest-service/multibillrequest.model";
import moment from "moment";
import { DeviceDetectorService } from "@dep/core";
export class RetailMultiBillReviewFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}

@Injectable()
export class RetailMultiBillReviewFormHelper extends BaseFpxFormHelper<RetailMultiBillReviewFormState> {
  multibillrequestdetail!: FormArray;
  multiBillDtls: any;
  multiBillPaymentRequest: any = [];
  multibillrequest: any
  payFrom?: string;
  totalAmount: any;
  multiBillPaymentCount: number = 0;
  constructor(
    private retailMultiBillReviewFormService: MultibillrequestService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _billeraccountService: BilleraccountService,
    private _appConfig: AppConfigService,
    private _device: DeviceDetectorService
  ) {
    super(new RetailMultiBillReviewFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILMULTIBILLPAYMENT");
    this.removeShellBtn('RESET');
    this.addShellButton('Back', 'BACK', 'secondary', 'ENTRY', 'button');
    this.setShellBtnMethod('BACK', this.onBackClick.bind(this));
  }
  onBackClick() {
    let rid: number = Math.floor(Math.random() * 99999999);
    this._appConfig.setData('operationMode', 'M');
    let nav = this._device.isMobile()?['payments-space']:['payments-space', 'payments'];
      this._angularRouter.navigate(nav,
        {
          queryParams: {
            rid: rid,
          }
        }
      );
  }

  public override doPostInit(): void {
    this.multibillrequestdetail = this.formGroup.get("multibillrequestdetail") as FormArray;
    this.multibillrequest = JSON.parse(JSON.stringify(this._appConfig.getData('multibillrequest')));
    this.multibillrequestdetail = this.multibillrequest?.multibillrequestdetail.filter((item: any) => item.totalBillAmount.amount != 0);
    this.multibillrequest.multibillrequestdetail = this.multibillrequestdetail;
    if(this.multibillrequest?.multibillrequestdetail?.length > 1) {
      this.multiBillPaymentCount = this.multibillrequest?.multibillrequestdetail?.length;
    }

    // this.setValue('multibillrequestdetail',this.multiBillPaymentRequest);
    this.formGroup.setValue(this.multibillrequest)
    this.formGroup.updateValueAndValidity();
    this.payFrom = this.getValue('accountNickname')+'<span class="seperator">|</span>'+this.getValue('debitAccount');
    this.totalAmount = this.getValue('totalBillAmount');
  }


  public override preSubmitInterceptor(payload: any): any {
    delete payload.accountNickname;
    delete payload.accountType;
    payload.multibillrequestdetail.forEach((element: any) => {
      delete element.totalBillAmount;
      if(element.scheduleType) {
        element.scheduleType = "3";
      }
      else {
        element.scheduleType = moment().isSame(element.paymentDate, 'day')?"1":"2";
        delete element.paymentFrequency
        delete element.numberOfPayments
        delete element.paymentEndDate
      }
      
      element['beneficiaryName'] = element.nickName;
      delete element.nickName
      delete element.billReference
    });
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Multibillrequest) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.multibillrequest,
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
