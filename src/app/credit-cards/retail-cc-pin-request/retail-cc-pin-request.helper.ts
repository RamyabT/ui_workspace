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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CcpinrequestService } from '../ccpinrequest-service/ccpinrequest.service';
import { Ccpinrequest } from '../ccpinrequest-service/ccpinrequest.model';
import { CreditcardService } from "../creditcard-service/creditcard.service";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FpxLayoutService } from "@fpx/layout";
import { FpxTranslatePipe } from '@fpx/core';
import {DepUiAlertRichtextContentComponent, DepUiAlertRichtextContentData} from 'src/app/dep/core/component/dep-ui-alert-richtext-content/dep-ui-alert-richtext-content.component';
import { CreditcardSharedBusinessLogic } from '../creditcard-shared-business-logic/creditcard-shared-business-logic';
export class RetailCCPinrequestFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  activePin = "";
  visiblityChange: boolean = false;
  autoComplete: boolean = false;
  cardData!: Creditcard;
  isCardPendingActivation!: boolean;
}


@Injectable()
export class RetailCCPinrequestFormHelper extends BaseFpxFormHelper<RetailCCPinrequestFormState>{

  constructor(
    private retailCCPinrequestFormService: CcpinrequestService,
    private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router,
    private creditcard: CreditcardService,
    private _layoutService: FpxLayoutService,
    private translatePipe: FpxTranslatePipe,
    private _creditCardSharedBusinessLogic: CreditcardSharedBusinessLogic,
    public device:DeviceDetectorService,
  ) {
    super(new RetailCCPinrequestFormState());
  }

  override doPreInit(): void {
    if (this.getRoutingParam('cardReference')) {
      this.setValue('cardRefNumber', this.getRoutingParam('cardReference'));
    }
    this.state.cardData = this._appConfig.getData('creditCardData');
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber);
    this.setServiceCode("RETAILCCPINREQ");
    this.removeShellBtn('RESET');

    this.state.isCardPendingActivation = this._creditCardSharedBusinessLogic.cardNeedsToBeActivated(this.state.cardData);
  }

  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      if (payload.currentActivePin == "1") {
        this.setHidden('confirmPin', false)
      }
      else {
        this.setHidden('confirmPin', true);
      }
    }
  }

  public handlePinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    const validThru = this.state.cardData.validThru.replace('/', '');
    const lastCCDigits = this.state.cardData.creditCardNumber.slice(-4);
    
    // temporary, check if there is an enpoint we can call for backend validation
    const invalidPins = [
      '0000', '0100', '0123', '1000', '1111', '1233', '1234','1800',
      '1999', '2000', '2001', '2222', '3000', '3333', '4000', '4444',
      '5000', '5555', '6000', '6666', '7000', '7777', '8000', '8888', 
      '9000', '9999'
    ];

    this.reset('reEnterNewPin', "");

    if (value === validThru || value === lastCCDigits || invalidPins.includes(value)) {
      this.setErrors('pin', 'pinSecurityError')
    }
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }
  public handleReEnterNewPinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      let newPin = this.getValue('pin');
      if (value != newPin) {
        this.setErrors('reEnterNewPin', 'reenteredPinerr')
      }
    }
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public override doPostInit(): void {
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
    // this.addValueChangeHandler("confirmPin", this.handleConfirmPinOnvalueChange);
    this.addValueChangeHandler("pin", this.handlePinOnvalueChange);
    this.addValueChangeHandler("reEnterNewPin", this.handleReEnterNewPinOnvalueChange);
    this.handleFormOnLoad();

    let navBack = this.device.isMobile() ? ['cards-space'] : ['cards-space','credit-card','creditcard-home'];
    this._appConfig.setData('navBack', navBack);
  }

  public handleFormOnLoad() {
    this._layoutService.FORMTITLE = "RetailCCPinrequestForm.title";
  }


  public override preSubmitInterceptor(payload: Ccpinrequest): any {
    // WRITE CODE HERE TO HANDLE 
    payload.pin=String(payload.pin);
    payload.reEnterNewPin=String(payload.reEnterNewPin);
    if(payload.confirmPin){
      payload.confirmPin=String(payload.confirmPin);
    }
    return payload;
  }


  public override postDataFetchInterceptor(payload: Ccpinrequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.ccpinrequest;
      routingInfo.setQueryParams({
        response: res
      });

      const textKeySuccess1 = this.translatePipe.transform('RetailCCPinrequestForm.successModal.subtitle1', '');
      const textKeySuccess2 = this.translatePipe.transform('RetailCCPinrequestForm.successModal.subtitle2', '');
      const subtitleSuccess = `${textKeySuccess1} ${this.state.cardData.creditCardNumber.slice(-4)} ${textKeySuccess2}`;

      const modal = new FpxModal();
      modal.setComponent(DepUiAlertRichtextContentComponent);
      modal.setDisableClose(false);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass('etransfer-send-limits');
      modal.setData({
        title: 'RetailCCPinrequestForm.successModal.title',
        showResolvedSubtitle: true,
        resolvedSubtitle: subtitleSuccess,
        messageHtml: 'RetailCCPinrequestForm.successModal.messageHtml',
        primaryButtonLabel: 'RetailCCPinrequestForm.successModal.primaryButtonLabel',
        iconClass: 'icon-success',
      } as DepUiAlertRichtextContentData);
  
      this.openModal(modal);

    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });

      const textKeyError1 = this.translatePipe.transform('RetailCCPinrequestForm.errorModal.subtitle1', '');
      const textKeyError2 = this.translatePipe.transform('RetailCCPinrequestForm.errorModal.subtitle2', '');
      const subtitleError = `${textKeyError1} ${this.state.cardData.creditCardNumber.slice(-4)} ${textKeyError2}`;

      const modal = new FpxModal();
      modal.setComponent(DepUiAlertRichtextContentComponent);
      modal.setDisableClose(false);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass('etransfer-send-limits');
      modal.setData({
        title: 'RetailCCPinrequestForm.errorModal.title',
        resolvedSubtitle: subtitleError,
        showResolvedSubtitle: true,
        primaryButtonLabel: 'RetailCCPinrequestForm.errorModal.primaryButtonLabel',
        secondaryButtonLabel: 'RetailCCPinrequestForm.errorModal.secondaryButtonLabel',
        enableSecondaryButton: true,
        iconClass: 'icon-alert-hexagon',
      } as DepUiAlertRichtextContentData);
      modal.setAfterClosed(this.handleErrorModalOnClose)
  
      this.openModal(modal);
    }
    return response;
  }

  handleErrorModalOnClose: FpxModalAfterClosed = (payload: any) => {
    if (payload === 'primary') {
      window.open('https://vancity.com/contact-us/', 'blank');
    }
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public redirectToCardActivation() {
    const ccActivationServiceCode = this._appConfig.getServiceDetails('RETAILCCACTIVATION');
    
    this._router.navigate(ccActivationServiceCode.servicePath, {
      queryParams: {
        cardRefNumber: this.state.cardData?.cardRefNumber
      }
    });
  }
}
