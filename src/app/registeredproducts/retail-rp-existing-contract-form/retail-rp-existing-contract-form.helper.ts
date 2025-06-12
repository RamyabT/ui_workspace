import { inject, Injectable } from "@angular/core";
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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { RpcontractinfoService } from '../rpcontractinfo-service/rpcontractinfo.service';
import { Rpcontractinfo } from '../rpcontractinfo-service/rpcontractinfo.model';
import { AppConfigService } from "@dep/services";
import { RetailProductSelectionFormComponent } from "../retail-product-selection-form/retail-product-selection-form.component";

export class RetailRpExistingContractFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  usResident: any = {
    ckValues: { checked: "Y", unchecked: "N" }
  };
  depositAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  productId: any;
  selectedProduct: any;
  renderProductInfo: boolean = true;
  selectedProductIdDisplay: any = {
    text: "Your selected product is ${selectedProductId}"
  }

  rpcontractinfo:any;
}


@Injectable()
export class RetailRpExistingContractFormHelper extends BaseFpxFormHelper<RetailRpExistingContractFormState> {
  
  constructor(private retailRpExistingContractFormService: RpcontractinfoService,
    private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new RetailRpExistingContractFormState());
  }

  override doPreInit(): void {
    
  }

  public handleFormOnLoad() {
    this.setHidden('contractDetailsGroup', true);
    this.setHidden('addCountryOfTax', true);
    
    this.addControlEventHandler("planContractDataReceived", this.onPlanContractDataReceived);
    this.addValueChangeHandler("fromAccount", this.handleFromAccountOnvalueChange);
    this.addValueChangeHandler("usResident", this.handleUsResidentOnvalueChange);
    
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
    this._fpxHttpConfig.setCommonHeaderParams(this._fpxHttpConfig.serviceContextKey, payload.serviceCode);
    this.setServiceCode(payload.serviceCode);
    this.setValue('serviceCodeValue', this.serviceCode.value);
    this.setValue('segmentId', payload.segmentId);
    this.state.productId = payload?.productId;
    this.triggerControlInput('selectedProductId', payload.productDescription);
  }

  public handleFromAccountOnvalueChange:  BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('depositAmount');
  }

  public handleUsResidentOnvalueChange:  BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == '0'){
      this.setHidden('addCountryOfTax', false);
    } else {
      this.setHidden('addCountryOfTax', true);
    }
  }

  public override doPostInit(): void {
    // this.setValue('serviceCodeValue', this.serviceCode.value);
    this.handleFormOnLoad();
  }

  public onPlanContractDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if(payload){
      this.state.rpcontractinfo = payload;

      delete this.state.rpcontractinfo.rpContractStatus;
      delete this.state.rpcontractinfo.rpContractAckReference;
      delete this.state.rpcontractinfo.inventoryNumber;

      if(this._appConfig.getData('contractType') == 'deposit'){
        this.setHidden('contractDetailsGroup', false);
        // this.triggerControlInput('tenure',);
        // this.triggerControlInput('interestRate',);
      } else {
  
      }
    }
  }


  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    
    payload = {
      ...this.state.rpcontractinfo,
      "rpcontractinfo": payload?.planContract,
      rpaccount: {
        "intendedUse": payload?.intendedUse,
        "currency": payload.depositAmount.currencyCode,
        "depositAmount": payload.depositAmount.amount,
        "fromAccount": payload?.fromAccount,
        "accountUsedBy": payload?.accountUsedBy,
        "usResident": payload?.usResident,
        "segmentId": payload?.segmentId,
        "productId": this.state.productId,
        "baseRate": "1",
        "exchangeRate": "1",
      }
    }
    
    return payload;
  }

  public override postDataFetchInterceptor(payload: Rpcontractinfo) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.rpcontractinfo;
      routingInfo.setQueryParams({
        response: res,
        result: {
          serviceCode: this.serviceCode,
        }
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


