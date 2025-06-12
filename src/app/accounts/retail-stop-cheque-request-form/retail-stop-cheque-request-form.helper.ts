import { Inject, inject, Injectable } from "@angular/core";
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
  CriteriaQuery,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { StopchequerequestService } from '../stopchequerequest-service/stopchequerequest.service';
import { Stopchequerequest } from '../stopchequerequest-service/stopchequerequest.model';
import { AppConfigService } from "@dep/services";
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { APPCONSTANTS } from "@dep/constants";
import { CurrencyPipe } from "@angular/common";
import { StopchequeService } from "../stopcheque-service/stopcheque.service";
import { RetailSampleChequeComponent } from "../retail-sample-cheque/retail-sample-cheque.component";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { TranslateService } from "@ngx-translate/core";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { StopchequereasonService } from "src/app/foundation/stopchequereason-service/stopchequereason.service";
import { FpxLayoutService } from "@fpx/layout";
import { ConfirmationReceiptFormComponent } from "../confirmation-receipt-form/confirmation-receipt-form.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export class RetailStopChequeRequestFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;



  chequeAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
    amountInWords: false,
    initCurrency: APPCONSTANTS.baseCurrency,
    defaultFetch: true,
  }
  chargesAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
    amountInWords: false,
    initCurrency: APPCONSTANTS.baseCurrency,
    defaultFetch: true,
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "" }
  }
  accountCurrency: any;
  accountNumber: any;
  chargeCurrency: any
  charges: any;
  review: boolean = false;
  ischequeAmountEnabled: boolean = false;
  stopChequeType: any;
  accountName: any
  stopChequeReasons: any;
  showInsufficientBalanceError: boolean=false;
  ChequeDtlsResponse:any;
}


@Injectable()
export class RetailStopChequeRequestFormHelper extends BaseFpxFormHelper<RetailStopChequeRequestFormState> {
  isDisabled: boolean = true;
  otherReason: boolean = false;
 
  private _layoutService: FpxLayoutService = inject(FpxLayoutService);

  constructor(private retailStopChequeRequestFormService: StopchequerequestService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private accountsService: AccountsService,
    private _appConfig: AppConfigService,
    public _activeSpaceInfoService: ActiveSpaceInfoService,
    private _StopchequeService: StopchequeService,
    public currency: CurrencyPipe,
    public _device: DeviceDetectorService,
    private _translate: TranslateService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _StopchequereasonService: StopchequereasonService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
  ) {
    super(new RetailStopChequeRequestFormState());
  }

  override doPreInit(): void {
    if (this._device.isDesktop()) {
      if(this._appConfig.hasData('showStopChequeDetails$')){
      this._appConfig.getData('showStopChequeDetails$').subject.next({
        showStopChequeDetails: true
      });
    }
    }
    this.setServiceCode("RETAILSTOPCHEQUE")
    this.addValueChangeHandler("stopChequeType", this.handlestopChequeTypeOnvalueChange);
    // this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    this.addValueChangeHandler("reason", this.handlereasonOnvalueChange);
    this.addValueChangeHandler("chequeNumber", this.handleChequeNumberOnvalueChange);
    this.addValueChangeHandler("fromChequeNumber", this.handleFromChequeNumberOnvalueChange);
    this.addValueChangeHandler("toChequeNumber", this.handleToChequeNumberOnvalueChange);
    this.addValueChangeHandler("payee", this.handlepayeeOnvalueChange);
    this.addValueChangeHandler("otherReason", this.handleotherReasonOnvalueChange);
    // this.addResetHandler('reset', this.resetForm.bind(this));
    this.removeShellBtn('RESET');
  }

  public handleFormOnLoad() {
    this._layoutService.FORMTITLE = "RetailStopChequeRequestForm.title";
    // WRITE CODE HERE TO HANDLE
    this.setHidden('inventoryNumber', true);
    this.setValue('accountNumber', this._activeSpaceInfoService.getAccountNumber());
    this.state.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    this.setValue('chequeAmount', { currencyCode: APPCONSTANTS.baseCurrency });
    this.state.chargeCurrency = APPCONSTANTS.baseCurrency;
    this.state.charges = this.currency.transform(10, ' ', false);
    this.setValue('stopChequeType', '1');
    this.setValue('chargesAmount', { amount: 10, currencyCode: APPCONSTANTS.baseCurrency });
    this.setReadonly('chargesAmount', true);
    this.setHidden('otherReason', true);
    this.setReadonly('accountNumber', true);
    this.state.accountName = this.getAccountDetails().accountNickname || this.getAccountDetails().productDesc ;
    if(Number(this.getAccountDetails().availableBalance)<10){
      this.state.showInsufficientBalanceError=true;
      this.setHidden('hiddenField',false);
    }
    else{
      this.state.showInsufficientBalanceError=false;
      this.setHidden('hiddenField',true);
    }

    this.getChequeDetails$();

  }

   override ngOnDestroy(): void {
    if (this._device.isDesktop()) {
      if (this._appConfig.hasData('showStopChequeDetails$')) {
        this._appConfig.getData('showStopChequeDetails$').subject.next({
          showStopChequeDetails: false
        });
      }
    }
  }

  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
      this.reset('fromChequeNumber', '');
      this.reset('toChequeNumber', '');
      this.reset('chequeNumber', '');
      this.reset('reason', '');
      this.reset('payee', '');
      this.reset('chequeAmount', '');
      this.reset('termsFlag', '');
      if (!this.state.accountNumber) {
        this.state.accountNumber = payload?.accountNumber;
      }
      if (!this.state.accountCurrency) {
        this.state.accountCurrency = payload?.accountCurrency;
      }
      this.setValue('chequeAmount', { currencyCode: payload.accountCurrency });
    }
  }
  resetForm() {
    this.reset('fromChequeNumber', '');
    this.reset('toChequeNumber', '');
    this.reset('chequeNumber', '');
    this.reset('reason', '');
    this.reset('otherReason');
    this.reset('payee', '');
    this.reset('chequeAmount', '');
    this.setValue('chequeAmount', { currencyCode: this.state.accountCurrency });
    this.reset('termsFlag', '');
    this.handleFormOnLoad();
  }

  public override doPostInit(): void {

    this.handleFormOnLoad();
    if (this._device.isMobile()) {
      this._appConfig.setData('navBack', ['accounts-space']);
    }
    else {
      this._appConfig.setData('navBack', ['accounts-space', 'accounts']);
    }
  }
  public handleFromChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if(Number(value)){
        this.reset('toChequeNumber', '');
        let res=this.state?.ChequeDtlsResponse;
        setTimeout(() => {
        if (res && res.data && res.data.length != 0) {
            let i = res.data.findIndex((x:any) => x.chequeNumber == value);
            if (i >= 0) {
              this.setErrors('fromChequeNumber', 'CBSERR003');
            }
          }
        },50);
      // let criteriaQuery = new CriteriaQuery();
      // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      //   searchText: this._activeSpaceInfoService.getAccountNumber()
      // });
      // criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'equals', {
      //   searchText: value
      // });
      // this._StopchequeService.findAll(criteriaQuery)().subscribe({
      //   next: (res) => {
      //     if (res && res.data && res.data.length != 0) {
      //       let i = res.data.findIndex(x => x.chequeNumber == value);
      //       if (i >= 0) this.setErrors('fromChequeNumber', 'CBSERR003');
      //     }
      //   },
      //   error: (error) => {

      //   }
      // })
      }
      else{
        this.setErrors('fromChequeNumber', "pattern");
      }
      
    }
  }
  public handleToChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if (!(this.getValue('fromChequeNumber'))) {
        this.setErrors('toChequeNumber', "toCheque_Err");
      }
      else if (Number(value) > Number(this.formGroup.controls['fromChequeNumber'].getRawValue())) {
        // let criteriaQuery = new CriteriaQuery();
        // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
        //   searchText: this._activeSpaceInfoService.getAccountNumber()
        // });
        // criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'inRange', {
        //   fromValue: this.getValue('fromChequeNumber'),
        //   toValue: value
        // });
        // this.showSpinner();
        // this._StopchequeService.findAll(criteriaQuery)().subscribe({
        //   next: (res) => {
        //     this.hideSpinner();
        //     if (res && res.data && res.data.length != 0) {
        //       let i = res.data.findIndex(x => x.chequeNumber == value);
        //       if (i >= 0) {
        //         this.setErrors('toChequeNumber', 'CBSERR008');
        //       }
        //       else {
        //         res.data.forEach((ele: any) => {
        //           for (let i = this.getValue('fromChequeNumber'); i < value; i++) {
        //             if (i == ele.chequeNumber) {
        //               this.setErrors('toChequeNumber', 'CBSERR008');
        //               break;
        //             }
        //           }
        //         })
        //       }
        //     }
        //   },
        //   error: (error) => {

        //   }
        // })
         let res = this.state?.ChequeDtlsResponse;
         setTimeout(() => {
        if (res && res.data && res.data.length != 0) {
              let i = res.data.findIndex((x:any) => x.chequeNumber == value);
              if (i >= 0) {
                this.setErrors('toChequeNumber', 'CBSERR008');
              }
              else {
                res.data.forEach((ele: any) => {
                  for (let i = Number(this.getValue('fromChequeNumber')); i < Number(value); i++) {
                    if (i == ele.chequeNumber) {
                      this.setErrors('toChequeNumber', 'CBSERR008');
                      break;
                    }
                  }
                })
              }
            }
          },50);
      }
      else {
        setTimeout(() => {
          if (Number(value)) {
            this.setErrors('toChequeNumber', "Cheque_Error");
          }
          else {
            this.setErrors('toChequeNumber', "pattern");
          }
        }, 50);

      }
      this.setValue('chargesAmount', { amount: ((Number(value) - Number(this.getValue('fromChequeNumber'))) * 10) + 10, currencyCode: APPCONSTANTS.baseCurrency });
      if(Number(this.getValue('chargesAmount').amount)>Number(this.getAccountDetails().availableBalance)){
        this.state.showInsufficientBalanceError=true;
        this.setHidden('hiddenField',false);
      }
      else{
        this.state.showInsufficientBalanceError=false;
        this.setHidden('hiddenField',true);
      }
    }
  }
  public handleChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if (Number(value)) {
      //   let criteriaQuery = new CriteriaQuery();
      // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      //   searchText: this._activeSpaceInfoService.getAccountNumber()
      // });
      // criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'equals', {
      //   searchText: value
      // });
      // this._appConfig.getData('ChequeListAPI$').observable.subscribe(
      //   (res1: any) => {
      //     })
            let res = this.state?.ChequeDtlsResponse;
             setTimeout(() => {
            if (res && res.data && res.data.length != 0) {
              let i = res.data.findIndex((x:any) => x.chequeNumber == value);
              if (i >= 0) {
                this.setErrors('chequeNumber', 'CBSERR003');

              }
            }
          },50);
      }
      else{
        this.setErrors('chequeNumber', "pattern");
      }
    }
  }
  public handlepayeeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.includes('')) {
      this.setValue('payee', value.trim());
    }
  }
  public handleotherReasonOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.includes('')) {
      this.setValue('otherReason', value.trim());
    }
  }

  public handlereasonOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if (value == '6') {
        this.reset('otherReason');
        this.setHidden('otherReason', false);
      }
      else {
        this.reset('otherReason');
        this.setHidden('otherReason', true);
      }
    }
  }
  public handlestopChequeTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.state.stopChequeType = value;
      if (value == '1') {
        this.reset('toChequeNumber', '');
        this.reset('fromChequeNumber', '');
        this.reset('reason', '');
        this.reset('otherReason');
        this.reset('termsFlag');
        this.setHidden('otherReason', true);
        this.setHidden('toChequeNumber', true);
        this.setHidden('fromChequeNumber', true);
        this.setHidden('chequeNumber', false);
        this.setHidden('payee', false);
        this.setHidden('chequeAmount', false);
        this.setValue('chargesAmount', { amount: 10, currencyCode: APPCONSTANTS.baseCurrency });
        if(Number(this.getValue('chargesAmount').amount)>Number(this.getAccountDetails().availableBalance)){
          this.state.showInsufficientBalanceError=true;
          this.setHidden('hiddenField',false);
        }
        else{
          this.state.showInsufficientBalanceError=false;
          this.setHidden('hiddenField',true);
        }
      }
      else {
        this.reset('chequeNumber', '');
        this.reset('payee', '');
        this.reset('chequeAmount', '');
        this.reset('reason', '');
        this.reset('otherReason');
        this.reset('termsFlag');
        this.setHidden('otherReason', true);
        this.setValue('chequeAmount', { currencyCode: this.state.accountCurrency });
        this.setHidden('toChequeNumber', false);
        this.setHidden('fromChequeNumber', false);
        this.setHidden('chequeNumber', true);
        this.setHidden('payee', true);
        this.setHidden('chequeAmount', true);
      }
    }

  }


  chequeExample() {
    let modal = new FpxModal();
    modal.setComponent(RetailSampleChequeComponent);
    if (this._device.isMobile()) {
      modal.setPanelClass('context-menu-popup');
    } 
    else {
      modal.setPanelClass('dep-alert-popup');
    }
    modal.setBackDropClass(['casa-summary-filter-backdrop', 'stop-cheque-backdrop']);
    modal.setDisableClose(true);
    modal.setData({
      title: "retailcasatrandtlsfilterform.title",
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {

  }
  pendingCheques() {
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stopcheque-display-grid']);
  }
  chequeNumberValidation(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length >= 7) {
      value = value.slice(0, 7);
    }
    input.value = value;
    this.formGroup.get('chequeNumber')?.setValue(value, { emitEvent: false });
  }
  toChequeNumberValidation(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length >= 7) {
      value = value.slice(0, 7);
    }
    input.value = value;
    this.formGroup.get('toChequeNumber')?.setValue(value, { emitEvent: false });
  }
  fromChequeNumberValidation(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length >= 7) {
      value = value.slice(0, 7);
    }
    input.value = value;
    this.formGroup.get('fromChequeNumber')?.setValue(value, { emitEvent: false });
  }
  chequeNumberTooltip() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailStopChequeRequestForm.chequeNumber.label",
        message: "RetailStopChequeRequestForm.chequeNumberTooltip.message",

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailStopChequeRequestForm.chequeNumber.label",
        message: "RetailStopChequeRequestForm.chequeNumberTooltip.message",
        okBtnLbl: "Close"
      });
      this.openModal(modal);
    }
  }
  chargesAmountTooltip() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      let link = this._translate.instant('RetailStopChequeRequestForm.chargesAmountTooltip.link');
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailStopChequeRequestForm.chargesAmount.label",
        message: "RetailStopChequeRequestForm.chargesAmountTooltip.message",
        serviceCode: "RETAILSTOPCHEQUE",
        link: link

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      let link = this._translate.instant('RetailStopChequeRequestForm.chargesAmountTooltip.link');
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailStopChequeRequestForm.chargesAmount.label",
        message: "RetailStopChequeRequestForm.chargesAmountTooltip.message",
        okBtnLbl: "Close",
        serviceCode: "RETAILSTOPCHEQUE",
        link: link
      });
      this.openModal(modal);
    }
  }

  getAccountDetails() {
    let casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    let selectedAccount = casaAccounts.filter((item: any) => item.accountNumber === accountNumber);
    return selectedAccount?.[0];
  }

  getChequeDetails$(){
    let criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: this._activeSpaceInfoService.getAccountNumber()
    });
    this._StopchequeService.findAll(criteriaQuery)().subscribe({
      next: (res) => {
        this.state.ChequeDtlsResponse=res;
      },
      error:(err)  =>{

      }
    })
  }

  override onReview(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.isDisabled = false;
    this.state.review = true;
    this.setHidden('chequeAmount', true);

    if (this.getValue('payee')) {
      this.setHidden('payee', false);
    }
    else {
      this.setHidden('payee', true);
    }
    if (this.getValue('chequeAmount').amount > 0) {
      this.state.ischequeAmountEnabled = true;
    }
    else {
      this.state.ischequeAmountEnabled = false;
    }
    this.state.stopChequeReasons = this._StopchequereasonService.stopChequeReasons[this.getValue('reason') - 1].text;
    if (this.getValue('reason') == '6') {
      this.otherReason = true;
      this.state.stopChequeReasons = this.state.stopChequeReasons + ": " + this.getValue('otherReason');
    }
    else {
      this.otherReason = false;
    }

  }

  override backToEntryMode(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.isDisabled = true;
    this.state.review = false;
    if (this.getValue('stopChequeType') == '1') {
      this.setHidden('chequeAmount', false);
      this.setHidden('payee', false);
    }
    this.state.ischequeAmountEnabled = true;
  }


  public override preSubmitInterceptor(payload: Stopchequerequest): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (!payload.payee) {
      delete payload.payee;
    }
    if (!this.getValue('chequeAmount')?.amount) {
      delete payload.chequeAmount;
      delete payload.currency;
    }
    else {
      payload.chequeAmount = this.getValue('chequeAmount')?.amount;
    }
    payload.chargesAmount = Number(this.getValue('chargesAmount')?.amount);
    // payload.currency = this.getValue('chequeAmount')?.currencyCode;
    payload.currency = this.getValue('chargesAmount')?.currencyCode;
    payload.accountNumber = this._activeSpaceInfoService.getAccountNumber();
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close();
  }


  public override postDataFetchInterceptor(payload: Stopchequerequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.stopchequerequest;
      routingInfo.setQueryParams({
        response: res,
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      // routingInfo.setQueryParams({
      //   response: error,
      //   serviceCode: this.serviceCode.value
      // });
      let modal = new FpxModal();
      modal.setComponent(ConfirmationReceiptFormComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setDisableClose(true);
      if(this._device.isMobile()){
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','accounts-confirmation-backdrop']);
      }
      else{
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfers-contacts-backdrop']);
      }
      modal.setAfterClosed(this.contextmenuModelAfterClose1);
      modal.setData({
        statusCode: 'failure',
        serviceCode: 'RETAILSTOPCHEQUE'
      });
      this.openModal(modal);
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


