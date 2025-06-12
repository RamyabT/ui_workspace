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
//import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
//import { PcPinRequestSer } from '../pcPinRequest-service/pcPinRequest.service';
import { PcPinRequest } from '../pcPinRequest-service/pcPinRequest.model';
import { PcPinRequestService } from "../pcPinRequest-service/pcPinRequest.service";
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
export class RetailPrepaidChanfePinState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  confirmPin: any = {
    //   visibilityChangean=false;
  }
  pin: any = {
    visibilityChange: false,
    autoComplete: false
  }

  reenteredPin: any = {
    visibilityChange: false,
    autoComplete: false
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  cardData!: Prepaidcard;
}


@Injectable()
export class RetailPrepaidChanfePinHelper extends BaseFpxFormHelper<RetailPrepaidChanfePinState>{

  constructor(private retailPrepaidChanfePinService: PcPinRequestService, private _httpProvider: HttpProviderService, private _router: Router,
    private activateddc: ActivateDCValidationService, private _appConfig: AppConfigService) {
    super(new RetailPrepaidChanfePinState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILPREPAIDCHANGEPIN");
    this.addResetHandler("reset", this.resetForm.bind(this));
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad()
  }
 public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,

    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value =="N"){
      this.setValue('termsFlag',null);
    }
  }

  resetForm() {
    console.log(this.formGroup)
    this.reset('termsFlag', "");
    this.reset('remarks', "");
    this.reset('reenteredPin', "");
    this.reset('pin', "");
    this.reset('confirmPin', "");

  }
  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
      if (payload.currentActivePin == "1") {
        this.setHidden('confirmPin', false)
      }
      else {
        this.setHidden('confirmPin', true);
      }
    }
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
    this.reset('reEnterNewPin', "")
    if (value && status == 'VALID') {
      let confirmPin = this.getValue('confirmPin');
      if (value == confirmPin) {
        this.setErrors('pin', 'pinError')
      }
    }

    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
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
          "pcPinVerify": {
            "pin": value
          }
        }

        this.activateddc.pcPinValidator(payload, cardnumber)?.subscribe((error) => {
          //console.log("Error is:", error);
          let errorMsg = error?.errorCode
          if (error) {
            this.setErrors('confirmPin', errorMsg);
          }

        });
      }
    }
  }


  public handleFormOnLoad() {
    this.setValue('termsFlag',null);
    this.state.cardData = this._appConfig.getData('prepaidCardData');
    this.setValue('cardReference', this.state.cardData?.cardRefNumber)
    if (this.state.cardData?.pinStatus == '0') {
      this.setHidden('confirmPin', true)
    }
    
    if (this.state.cardData?.pinStatus == '0') {
      this.setHidden('confirmPin', true);
      this.setHidden('infoNote', true);
      this.setHidden('line', true);
    }
  }
  public override doPostInit(): void {
    // this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
    // this.addValueChangeHandler("confirmPin", this.handleConfirmPinOnvalueChange);
    // this.addValueChangeHandler("reenteredPin", this.handleReEnterNewPinOnvalueChange);
    // this.addValueChangeHandler("pin", this.handlePinOnvalueChange);
    if (this.state.cardData?.pinStatus == '1') {
      this.addValueChangeHandler("confirmPin", this.handleConfirmPinOnvalueChange);
      this.addValueChangeHandler("pin", this.handlePinOnvalueChange);

    }
    else {
      this.addValueChangeHandler("pin", this.handlePinOn2valueChange);
    }
    this.addValueChangeHandler("reenteredPin", this.handleReEnterNewPinOnvalueChange);

  }


  public override preSubmitInterceptor(payload: PcPinRequest): any {
    if(payload.confirmPin){
      payload.confirmPin=Number(payload.confirmPin);
    }
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: PcPinRequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }



  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.pcPinRequest;
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
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


