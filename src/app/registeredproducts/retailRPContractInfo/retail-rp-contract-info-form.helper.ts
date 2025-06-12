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
  FpxSubmitHandler,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Rpcontractinfo } from '../rpcontractinfo-service/rpcontractinfo.model';
import { Rpaddressinfo } from '../rpaddressinfo-service/rpaddressinfo.model';
import { Rpcontractaccountinfo } from '../rpcontractaccountinfo-service/rpcontractaccountinfo.model';
import { Rpcontractsuccessorinfo } from '../rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.model';
import { RpcontractinfoService } from "../rpcontractinfo-service/rpcontractinfo.service";
import { AppConfigService } from "@dep/services";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import moment from "moment";
import { RetailProductSelectionFormComponent } from "../retail-product-selection-form/retail-product-selection-form.component";
export class RetailRPContractInfoState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dob: any = {
    minDate: "",
    maxDate: "",
  }
  sinUsageConsent: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  };
  trustAgreedFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  };
  activeTabIndex: number = 0
}


@Injectable({
  providedIn: 'root'
})
export class RetailRPContractInfoHelper extends BaseFpxFormHelper<RetailRPContractInfoState> {
  FieldId_9!: FormGroup;
  FieldId_11!: FormGroup;
  FieldId_12!: FormGroup;

  constructor(private retailRPContractInfoService: RpcontractinfoService,
    private userService: CustomerService,
    private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailRPContractInfoState());
  }

  override doPreInit(): void {
    
  }

  public handleFormOnLoad() {
    let modal = new FpxModal();
    modal.setComponent(RetailProductSelectionFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'rp-product-selection']);
    modal.setDisableClose(true);
    modal.setData({
      title: "RetailProductSelection.title",
    });
    modal.setAfterClosed(this.productSelectionPopupClose);
    this.openModal(modal);
  }

  private productSelectionPopupClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this.setServiceCode(payload.serviceCode);
    this._fpxHttpConfig.setCommonHeaderParams(this._fpxHttpConfig.serviceContextKey, payload.serviceCode);

    this.showSpinner();
    this.userService
      .fetchCustomer(sessionStorage.getItem('customerCode'))
      .subscribe({
        next: (res) => {
          this.hideSpinner();
          
          this.setValue('rpaccount.serviceCodeValue', this.serviceCode.value);
          this.setValue('rpaccount.productId', payload?.productId);
          this.setValue('rpaccount.segmentId', payload?.segmentId);

          if (res) {
            console.log(res);
            this.setValue('firstName', res?.firstName);
            this.setValue('lastName', res?.lastName);
            this.setValue('emailAddress', res?.emailId);
            this.setValue('mobileNumber', res?.mobileNumber);
            this.setValue('dob', res?.dob);

            let address = res?.addresses?.[0];
            this.setValue('rpaddress.rpaddressType', address?.addressType || "2");
            this.setValue('rpaddress.country', address?.country);
            this.setValue('rpaddress.province', address?.state);
            this.setValue('rpaddress.city', address?.city);
            this.setValue('rpaddress.street', address?.street);
            this.setValue('rpaddress.postalCode', address?.pincode);
          }
        },
        error: (err) => {
          this.hideSpinner();
        }
      });
  }

  public override doPostInit(): void {
    this.setDisabled('NEXT', true);
    this.handleFormOnLoad();
  }

  public override preSubmitInterceptor(payload: Rpcontractinfo): any {
    // WRITE CODE HERE TO HANDLE
    payload.currency = payload.rpaccount.depositAmount.currencyCode;
    payload.rpaccount.depositAmount = payload.rpaccount.depositAmount.amount;
    payload.dob = moment(payload.dob, 'DD-MM-YYYY').format('YYYY-MM-DD');
    return payload;
  }


  public override postDataFetchInterceptor(payload: Rpcontractinfo) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    let res = response.success?.body?.rpcontractinfo;
    if (response.success) {
      routingInfo.setQueryParams({
        response: res,
        transRef: response.success?.body?.rpcontractinfo.inventoryNumber,
        status: "success"
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ 
        errMsg: response.error?.error?.ErrorMessage, 
        status: "failed" 
      });
    }

    return response;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


