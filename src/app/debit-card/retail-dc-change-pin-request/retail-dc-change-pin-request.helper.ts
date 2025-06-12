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
  FpxResetHandler,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DcpinrequestService } from "../dcpinrequest-service/dcpinrequest.service";
import { Dcpinrequest } from "../dcpinrequest-service/dcpinrequest.model";
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { formatDate } from "@angular/common";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { AppConfigService } from "@dep/services";
export class dcpinrequestState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  FieldId_3: any = {
    text: " Sample Text",
  };
  activePin = "";
  visiblityChange: boolean = false;
  autoComplete: boolean = false;
  cardData: Debitcard | undefined;
}

@Injectable()
export class dcpinrequestHelper extends BaseFpxFormHelper<dcpinrequestState> {
  constructor(
    private activateddc: ActivateDCValidationService,
    private dcpinrequestService: DcpinrequestService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new dcpinrequestState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILDCCHANGEPIN");
    this.state.cardData = this._appConfig.getData('debitCardData');
    this.setValue('cardReference', this.state.cardData?.cardRefNumber);
    this.addResetHandler("reset", this.resetForm.bind(this));
  }
  resetForm() {
    console.log(this.formGroup)
    this.reset('termsFlag', "");
    this.reset('remarks', "");
    this.reset('reenteredPin', "");
    this.reset('pin', "");
    this.reset('confirmPin', "");

  }
  public handleReEnterNewPinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if (value) {
      let newPin = this.getValue('pin');
      if (value != newPin) {
        this.setErrors('reenteredPin', 'reenteredPinerr')
      }
    }
  }
  public handlePinOn2valueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if (value) {
      this.reset('reenteredPin', "");
    }
  }
  public handlePinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('reenteredPin', "")
    if (value && status == 'VALID') {
      let confirmPin = this.getValue('confirmPin');
      if (value == confirmPin) {
        this.setErrors('pin', 'pinError')
      }
    }
  }

  public handleConfirmPinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.reset('pin', "");
      this.reset('reenteredPin', "");
      if (value && status == 'VALID') {
        let cardnumber = this.getValue('cardReference');
        let payload = {
          "dcPinVerify": {
            "pin": value
          }
        }

        this.activateddc.dcPinValidator(payload, cardnumber)?.subscribe((error) => {
          let errorMsg = error?.errorCode
          if (error) {
            this.setErrors('confirmPin', errorMsg);
          }

        });
      }
    }
  }


  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
     if(value == 'N'){
      this.setValue('termsFlag',null);
     }
    }
  }

  public override doPostInit(): void {
    if (this.state.cardData?.pinStatus == '1') {
      this.addValueChangeHandler("confirmPin", this.handleConfirmPinOnvalueChange);
      this.addValueChangeHandler("pin", this.handlePinOnvalueChange);

    }
    else {
      this.addValueChangeHandler("pin", this.handlePinOn2valueChange);
    }
    this.addValueChangeHandler("reenteredPin", this.handleReEnterNewPinOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);

    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    this.setValue('termsFlag',null);
    if (this.state.cardData?.pinStatus == '0') {
      this.setHidden('confirmPin', true);
      this.setHidden('infoNote', true);
      this.setHidden('line', true);
    }
  }
  public override preSubmitInterceptor(payload: Dcpinrequest): any {
    // WRITE CODE HERE TO HANDLE 
    if (this.state.cardData?.pinStatus == '1') {
    payload.confirmPin=String(payload.confirmPin);
    }
    payload.pin=String(payload.pin);
    payload.reenteredPin=String(payload.reenteredPin);

    return payload;
  }


  public override postDataFetchInterceptor(payload: Dcpinrequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.dcpinrequest;
      routingInfo.setQueryParams({
        response: res
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

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
}


