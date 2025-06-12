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
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BilleraccountreqService } from '../billeraccountreq-service/billeraccountreq.service';
import { Billeraccountreq } from '../billeraccountreq-service/billeraccountreq.model';
import { DynamicFormModel } from "src/app/foundation/dynamic-form/dynamic-form.component";
import { BilleraccountService } from "../billeraccount-service/billeraccount.service";
import { TranslateService } from "@ngx-translate/core";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
export class RetailAddBillerFormState extends BaseFpxComponentState {
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  };

  billeraccount: any = {
    billerName: "",
    billerType: "",
    billerCreditAccount: "",

  }

  debitAccountDetails: any = {
    accountName: "",
    availableBalance: "",
    branchName: "",
    productName:'',
    availableCashLimit:""
  }
  
  dynamicFormData: any = [];
  nickvalues: any;
  operationMode: any;
  deleteModebillerParam:any
  onLoadNickName:any
  smartPayDisclimerText: any = '';
  billerBeneficiaryId: string | undefined;
  action: any;
  currentFormData: any;

  addMode: boolean = false;
  editMode: boolean = false;
  formHeader: string = "";
  enteredBillerAccountNumber : any;
  selectedBiller: any;
  reviewMode: boolean = false;
}


@Injectable()
export class RetailAddBillerFormHelper extends BaseFpxFormHelper<RetailAddBillerFormState>{
  accordionOpen: boolean = true;
  debitAccountAccordionOpen: boolean = true;

  public dynamicFormAction: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(public billeraccountreqService: BilleraccountreqService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _translateService: TranslateService,
    private _appconfig: AppConfigService,
    private _route: ActivatedRoute,
    public _device : DeviceDetectorService,
    private corpBilleraccountreqFormService: BilleraccountreqService, private _billeraccountService: BilleraccountService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailAddBillerFormState());

    this._route.queryParams.subscribe(params => {
      if (params['rid']) {
        this.handleFormOnLoad();
      }
    });
  }

  // Dynamic form change event
  dynamicFormChange(event: DynamicFormModel) {
    // let action = this.getRoutingParam("action");
    let operationMode = this.getRoutingParam("operationMode");


    if (operationMode != 'D' && event && this.formGroup.controls?.['billeraccountparamreq']) {
      let formControlConfig: any = this.state.dynamicFormData.find((x: any) => { return event.currentChangedControlName === x?.formControlName });
      if (formControlConfig !== null && formControlConfig?.method) {
        this.dynamicFormactionMethods[formControlConfig?.method](event);
      }
      let isInvaldAccountError = event?.formArray?.controls?.dynamicFormGroup?.controls?.[0]?.controls?.[this.state.billeraccount.billerCreditAccount]?.hasError('invaldAccountError')
      // only for entry mode to check duplication, If it primary key
      if (event.currentChangedControlName === this.state.billeraccount.billerCreditAccount) {
        if(this.state.currentFormData && this.state.currentFormData.billeraccountparamreq){
          let paramValue = this.state.currentFormData.billeraccountparamreq[0]?.paramValue;
          if(paramValue == event.formArrayValue?.[0]?.[event.currentChangedControlName as string]) {
            this.setValue('dynamicFormValid', '1');
            this.formGroup.controls['billeraccountparamreq'].setValue(event.formArrayValue, { emitEvent: true })
            this.formGroup?.controls['billeraccountparamreq'].setErrors(null);
            return;
          }
        }
        this.showSpinner();
        this.checkUniqueValidationForPrimaryKey(event).subscribe((item: any) => {
          if (item?.err === 'VALID' || isInvaldAccountError) {
            this.validatebiller(event);
            return
          } else if (item?.err !== 'invaldAccountError' && item?.err !== 'formGroupInvalidErr') {
            item?.subscribe((data: any) => {
              if (data?.err === 'VALID' || isInvaldAccountError) {
                this.validatebiller(event);
                return;
              } else {
                this.hideSpinner();
                this.setValue('dynamicFormValid', '0');
              }
            })
          } else {
            this.hideSpinner();
            this.setValue('dynamicFormValid', '0');
          }
        });
      } else {
        this.showSpinner();
        this.dynamicFormGroupValidation(event).subscribe(res => {
          if (res?.err === 'VALID' || isInvaldAccountError) {
            this.validatebiller(event);
          } else {
            this.hideSpinner();
          }
        });
      }
    }
  }

validatebiller(event:any){
  let primaryKey = this.state.billeraccount.billerCreditAccount;
  let primaryKeyValue = event.formArrayValue?.[0]?.[primaryKey];
  if( primaryKeyValue 
    && primaryKeyValue != ''){
  let payload = this.constructPayload(this.formGroup.value, event.formArrayValue);
  this._billeraccountService.validatebiller(payload)().subscribe((res: any) => {
    this.hideSpinner();
    
    this.formGroup.controls['billeraccountparamreq'].setValue(event.formArrayValue, { emitEvent: true })
    this.dynamicFormAction.next({ action: "CLEARERROR", controlName: this.state.billeraccount.billerCreditAccount, additionalData: { errorMessage: undefined } });
    this.formGroup?.controls['billeraccountparamreq'].setErrors(null)
    this.reset('nickName');
    this.setValue('dynamicFormValid', '1');
    this.setValue('formUpdated', '1');
  },err=>{
    this.hideSpinner();
    this.dynamicFormAction.next({ action: "SETERROR", controlName: this.state.billeraccount.billerCreditAccount, additionalData: { errorMessage: "invaldAccountError"} });
    this.formGroup?.controls['billeraccountparamreq'].setErrors({ err: true });
    this.setValue('dynamicFormValid', '0');
    this.setValue('formUpdated', '1');
  });
}else{
  this.hideSpinner();
}

}

  public checkUniqueValidationForPrimaryKey(event: DynamicFormModel): Observable<any> {
    if (event?.currentChangedControlName && !((event.formArray?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0] as FormGroup)?.controls?.[event.currentChangedControlName].invalid) {
      console.log(event)
      this.state.enteredBillerAccountNumber = event?.currentChangedControlValue;
      console.log("this.state.enteredBillerAccountNumber", this.state.enteredBillerAccountNumber);
      // Unique Validation
      return this._billeraccountService.validateUniqueCreditAccount({ billerCreditAccount: event?.currentChangedControlValue })().pipe(map(res => {
        if (res && (Number(res.result) > 0)) {
          return this.dynamicFormGroupValidation(event, true).pipe(map(x => {
            return x;
          }));
        } else {
          return this.dynamicFormGroupValidation(event).pipe(map(y => {
            return y;
          }));
        }
      }))
    } else {
      return this.dynamicFormGroupValidation(event).pipe(map(z => {
        return z;
      }));
    }
  }

dynamicFormGroupValidation(event: any,isUniqueAccount?:Boolean):Observable<any> {
  if (event?.formArray?.status === 'INVALID' || isUniqueAccount) {
    if(isUniqueAccount){
      this.dynamicFormAction.next({ action: "SETERROR", controlName: event.currentChangedControlName, additionalData: { errorMessage: "uniqueAccountError"} });
      return of({err:'uniqueAccountError'})
    }
    this.formGroup?.controls['billeraccountparamreq'].setErrors({ err: true })
    return of({err:'formGroupInvalidErr'})
  } else {
    return of({err:'VALID'})
  }
}

// getErrorMessage(currentChangedControlName: any) {
//   if (currentChangedControlName) {
//     let formControlConfig = this.state.dynamicFormData.find((x: any) => { return currentChangedControlName === x?.formControlName });
//     if (formControlConfig != null) {
//       return formControlConfig.errorMessage ? formControlConfig.errorMessage : undefined;
//     } else {
//       return undefined;
//     }
//   }
// }

public compareWithGIban = (event: DynamicFormModel) => {
  this.dynamicFormAction.next({ action: "RESET", controlName: 'TRN', additionalData: { resetValue: '' } });

  if (event.currentChangedControlName === 'GIBAN') {
    this.dynamicFormAction.next({ action: "RESET", controlName: 'ConfirmGIBAN', additionalData: { resetValue: '' } });
    return;
  }
  if ( event?.currentChangedControlValue && event?.formArrayValue?.[0]?.GIBAN && event?.currentChangedControlValue !== event?.formArrayValue?.[0]?.GIBAN) {
    this.dynamicFormAction.next({ action: "SETERROR", controlName: event.currentChangedControlName, additionalData: { errorMessage: 'gbanMisMatchErr' } });
  } else {
    let confirmGIBAN = ((event.formArray.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0] as FormGroup)?.controls?.['ConfirmGIBAN'];
    let giban = ((event.formArray.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0] as FormGroup)?.controls?.['GIBAN'];

    if (!((confirmGIBAN?.hasError('pattern') || confirmGIBAN?.hasError('required') || confirmGIBAN?.hasError('minLength'))) && !((giban?.hasError('pattern') || giban?.hasError('required') || giban?.hasError('minLength')))) {
      this.dynamicFormAction.next({ action: "CLEARERROR", controlName: event.currentChangedControlName, additionalData: { errorMessage: undefined } });
      if (event?.currentChangedControlValue && event?.formArrayValue?.[0]?.GIBAN && event?.currentChangedControlValue === event?.formArrayValue?.[0]?.GIBAN) {
        this.dynamicFormAction.next({ action: "SETVALUE", controlName: "TRN", additionalData: { value: Number(event?.currentChangedControlValue.substr(event?.currentChangedControlValue.length - 15)) } })
      }
    }
  }
}

  public dynamicFormactionMethods: any = {
    compareWithGIban: this.compareWithGIban,
  }

  backToManageBiller = (payload: any) => {
    this._router.navigate(['payments-space','entry-shell', 'payments', 'retail-saved-biller-list-ro-grid'],
    {
      queryParams: {
        serviceCode: 'RETAILSAVEDBILLER'
      },
    }
  );
  }

  override doPreInit(): void {
    this.addValueChangeHandler("smartPay", this.smartPayOnValueChange);
    this.addValueChangeHandler("debitAccount", this.debitAccountOnValueChange);
    this.addValueChangeHandler("creditCardAccounts", this.creditCardAccountsOnValueChange);
    this.addControlEventHandler("billerIdReceived", this.onBillerIdReceived);
    this.addValueChangeHandler("billerId", this.billerIdOnValueChange);
    this.addValueChangeHandler("accountType", this.onPaymentTypeOnValueChange);
    this.addControlEventHandler("debitAccountDataReceived", this.ondebitAccountDataReceived);
    this.addControlEventHandler("creditCradDebitAccountDataReceived", this.oncreditCradDebitDataReceived);

    this.handleFormOnLoad();
  }

  public onNickNameOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.setValue('formUpdated', '1');
  }
  
  public override doPostInit(): void {
    if (this._router.url.includes('retail-edit-add-biller-form')) {
      this.state.editMode = true;
      this.state.formHeader = "Manage payee";
      this.setFormMode('MODIFY');
    }

    if (this._router.url.includes('retail-add-biller-form')) {
      this.setFormMode('ADD');

      this.state.addMode = true;
      this.state.formHeader = "Add a payee";
      this.removeShellBtn('RESET');

      // this.addShellButton('continue', 'CONTINUE', 'btn-primary', 'ENTRY');
      // this.setShellBtnMethod('CONTINUE', this.onContinue);

      // this.setLabel('next', 'Continue');
      // this.setShellBtnMethod('next', this.onContinue);
    }
    // this.addValueChangeHandler("nickName", this.onNickNameOnValueChange);
  }

  onContinue() {
    console.log("onContinue");
  }

  public handleFormOnLoad() {

    this.state.operationMode = this.getRoutingParam('operationMode') || "A";
    this.setValue('operationMode', this.state.operationMode);

    if (this.state.operationMode === 'D') {
      this.setServiceCode("RETAILDELETEBILLER");
      this.removeShellBtn('RESET');
      this.addShellButton('Back', 'D', 'btn-secondary', 'ENTRY');
      this.setShellBtnMethod('D', this.backToManageBiller);

      this.loadExistingFormData();
    }
    else if (this.state.operationMode === 'M') {
      this.setValue('formUpdated', '0');
      this.setReadonly('billerId', true);
      this.setServiceCode("RETAILBILLERACCOUNT");
      this.removeShellBtn('RESET');
      // this.addShellButton('Back', 'D', 'btn-secondary', 'ENTRY');
      this.setShellBtnMethod('D', this.backToManageBiller);
      this.setFormTitle('PAYMENTSCONTAINER.editBillerBtn');
      this.removeShellBtn('RESET');

      this.setHidden('remarks', true);
      this.setHidden('nickName', true);
      this.setHidden('smartPay', true);
      this.setHidden('termsFlag', true);

      this.loadExistingFormData();
    }
    else{
      this.addValueChangeHandler("nickName", this.onNickNameOnValueChange);
      this.setValue('dynamicFormValid', '1');
      this.setServiceCode("RETAILBILLERACCOUNT");
      this.addResetHandler('reset', this._onReset);

      this.setReadonly('billerId', false);
      this.setHidden('accountDetailAccordion', true);
      this.setDisabled("inventoryNumber", false);
      this.setHidden("smartPayDisclaimer", true);
      this.setHidden("debitAccount", true);
      this.setValue("smartPay", '0');

      this.setHidden('remarks', true);
      this.setHidden('nickName', true);
      this.setHidden('smartPay', true);
      this.setHidden('termsFlag', true);

      this.setValue('billerId', this.getRoutingParam("billerId"));
    }
  }

  public override postDataFetchInterceptor(payload: Billeraccountreq) {
    // WRITE CODE HERE TO HANDLE 
    this.setValue('billerId', payload.billerId);
    if (payload.smartPay == "1") {
      this.setHidden('accountDetailAccordion', false);
      if (payload.accountType == "1") {
        this.setHidden('creditCardAccounts', true);
      } else {
        this.setHidden('debitAccount', true);
        payload.creditCardAccounts = payload.debitAccount;
      }
    } else {

      this.setHidden('accountDetailAccordion', true);
      this.setHidden('creditCardAccounts', true);
      this.setHidden('debitAccount', true);
      this.setHidden('accountType', true);

    }
    this.formGroup.patchValue(payload, { emitEvent: true });
    return payload;
  }

  private loadExistingFormData() {
    this.setValue('dynamicFormValid', '1');
    this.setValue('formUpdated', '0');
    let billerBeneficiaryId = this.getRoutingParam('billerBeneficiaryId')
    this.state.billerBeneficiaryId = billerBeneficiaryId;
    this._billeraccountService.findByKey({
      "billerBeneficiaryId": billerBeneficiaryId, billerId: undefined, entityCode: "", nickName: "", accountType: "", authOn: "", createdOn: "", billerCreditAccount: "", smartPay: "", authBy: "", modifiedOn: "", createdBy: "", billeraccountparam: undefined, modifiedBy: "", currencyCode: undefined, status: "",
      debitAccount: "",
      userId: "",
      remarks: ""
    })().subscribe((res: any) => {
      if (res) {
        console.log("res", res);

        this.state.selectedBiller = res;

            // this.formGroup.updateValueAndValidity();
            if (res.smartPay == "1") {
              if (res.accountType == "1") {
                this.setHidden('creditCardAccounts', true);
              } else {
                this.setHidden('debitAccount', true);
                res.creditCardAccounts = res.debitAccount;
              }
            } else {
              this.setHidden('creditCardAccounts', true);
              this.setHidden('debitAccount', true);
              this.setHidden('accountType', true);
        }
        this.setHidden('accountDetailAccordion', false);
        this.state.deleteModebillerParam = res.billeraccountparam
        this.state.onLoadNickName=res.nickName
        let formGroupData = { billerId: res.billerId.billerId, nickName: res.nickName, smartPay: res.smartPay, termsFlag: "Y", remarks: res.remarks, billeraccountparamreq: res.billeraccountparam, debitAccount: res.debitAccount }
        this.state.currentFormData = formGroupData;
        this.formGroup.patchValue(formGroupData);

        if (this.state.operationMode === "D") {
          this.formGroup.disable();
          this.setHidden('remarks', false);
          this.setHidden('termsFlag', false);
          this.setValue('termsFlag', 'N');
          this.formGroup.get('termsFlag')?.enable();
          this.formGroup.get('remarks')?.enable();
        } else {
          this.setHidden('termsFlag', true);
        }

        this.addValueChangeHandler("nickName", this.onNickNameOnValueChange);
      }
    })
  }

  override onReview(): void {
    this.state.reviewMode = true;
    console.log("onReview");
  }
  override backToEntryMode(): void {
    this.state.reviewMode = false;
  }

  public onBillerIdReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res) {
      this.state.billeraccount.billerName = res.billerId?.name;
      this.state.billeraccount.billerType = res.billerId?.category.description;
      this.state.billeraccount.currencyCode = res.billerId?.currency?.currencyCode;
      // let billerAccountNumber = this.formGroup.value.billeraccountparamreq[0].paramValue;
      // console.log("billerAccountNumber", billerAccountNumber);

      // let invoiceAndSmartpayStatus = this.invoiceAndSmartpaySettings(res.billerId);
      let action = this.getRoutingParam("action");
      if(!action && this.state.operationMode != 'D' && this.state.operationMode != 'M'){
        this.setValue('smartPay','0');
      }

      if(res?.billerId?.autoPayAllowed === '1'){
        // if(invoiceAndSmartpayStatus === 'REFRESHALLOWED'){
          if( (action === "DECISION" || this.state.operationMode === "M" || this.state.operationMode === "D")){
            this.setHidden('smartPay',false);
            this.setDisabled('smartPay',true);
          }else{
            this.setHidden('smartPay',false);
          }
        }else{
          this.setHidden('smartPay',true);
        }
      this.state.dynamicFormData = [];

      let isViewMode = (this.state.operationMode == "D")
      if (res?.billinquiryparamdetail?.length > 0) {
        res?.billinquiryparamdetail.forEach((item: any) => {
          let errorMessagesArray:any[] = [];
          if (item.isPrimary == '1') {
            this.state.billeraccount.billerCreditAccount = item?.paramName?.id
            errorMessagesArray.push({uniqueAccountError:"Unique error"})
          }
          let defaultValue = (this.state.operationMode == "D" || this.state.operationMode == "M")  ? this.getValue('billeraccountparamreq')?.find((x: any) => x.paramName == item?.paramName?.id) : null;
          //Temp
          if(item?.paramName?.id == 'ConfirmGIBAN' || item?.paramName?.id == 'GIBAN'){
            errorMessagesArray.push({gbanMisMatchErr:"GBAN does not match"})
          }
          this.state.dynamicFormData.push({
            defaultValue: (defaultValue?.paramValue || ''),
            orderSl: item?.orderSl,
            dispType: item?.dispType,
            formControlName: item?.paramName?.id,
            label: "Account Number",
            required: item.mandatory == "0" ? false : true,
            pattern: item?.paramPattern,
            lov: item?.dispType == "4" ? item?.billparamlov : '',
            maxLength: item?.paramMaxLength,
            minLength: item?.paramMinLength,
            isDisable: (isViewMode) ? true : false,
            errorMessagesArray: errorMessagesArray,
            method: this.getMethodName(item?.paramName?.id),
            isFocused: false
          })
        })
        this.state.dynamicFormData = this.state.dynamicFormData.sort((a: any, b: any) => a.orderSl - b.orderSl);
      }
    }
    this.setHidden('nickName', false);
  }

  getMethodName(controlName: string) {
    switch (controlName.toLocaleLowerCase()) {
      case 'confirmgiban':
        return "compareWithGIban";
      case 'giban':
        return "compareWithGIban";
      case 'giban':
        return "trn";
      default:
        return undefined;
    }
  }

  invoiceAndSmartpaySettings(payload:any):"NOEMALFLOW"|"REFRESHALLOWED"|"INVOICEALLOWED"|""{
    if (payload?.smartPayAllowed === '0' &&payload.invoiceAllowed === '0') {
      return "NOEMALFLOW"
    } else if ((payload.smartPayAllowed === '1' && payload.invoiceAllowed === '0')) {
      return "REFRESHALLOWED"
    }else if(payload.smartPayAllowed === '1' && payload.invoiceAllowed === '1'){
      return "INVOICEALLOWED";
    }
    return '';
  }

  public billerIdOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (!value) {
      this.state.dynamicFormData = [];
      this.setHidden('nickName', true);
    }
  }

  public debitAccountOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.enableDisclimer()
  }

  public ondebitAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if(payload){
      this.state.debitAccountDetails.accountName = payload.accountName;
      this.state.debitAccountDetails.availableBalance = payload.accountCurrency + " " + this._currencyFormatter.transform(payload.availableBalance,payload.accountCurrency);
      this.state.debitAccountDetails.branchName = payload.branchName;
      this.state.debitAccountDetails.productName = payload.productName;
      this.state.debitAccountDetails.availableCashLimit = undefined;

    }
  }

  public creditCardAccountsOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.enableDisclimer()
  }

  public oncreditCradDebitDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.state.debitAccountDetails.accountName = payload?.productDesc;
      this.state.debitAccountDetails.availableCashLimit = payload.currency + " " + this._currencyFormatter.transform(payload.availableCashLimit,payload.currency);
      this.state.debitAccountDetails.branchName = undefined
      this.state.debitAccountDetails.productName = undefined
      this.state.debitAccountDetails.availableBalance = undefined
    }
  }

  public smartPayOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == '1') {
        this.setHidden('debitAccount', false);
        this.setHidden('accountType', false);
        this.setValue('accountType', '1');
      } else {
        this.setHidden('debitAccount', true);
        this.setHidden('creditCardAccounts', true);
        this.reset('accountType', '2');
        this.reset('debitAccount', '');
        this.reset('creditCardAccounts', '');
        this.setHidden('accountType', true);
      }
    }
    this.enableDisclimer()

  }


  public onPaymentTypeOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == '2') {
        this.reset('debitAccount', true);
        this.setHidden('debitAccount', true);
        this.setHidden('creditCardAccounts', false);
      } else {
        this.setHidden('debitAccount', false);
        this.reset('creditCardAccounts', true);
        this.setHidden('creditCardAccounts', true);
      }
      this.enableDisclimer()
    }
  }

  enableDisclimer() {
    let debitAccount = this.getValue('debitAccount');
    let smartPay = this.getValue('smartPay');
    let creditCardAccounts = this.getValue('creditCardAccounts');
    let accountType = this.getValue('accountType');

    if (smartPay === '1' && ((accountType == '1' && debitAccount) || (accountType == '2' && creditCardAccounts))) {
      this.setHidden("smartPayDisclaimer", false);
      this.setHidden('accountDetailAccordion',false);
      this.state.smartPayDisclimerText = this._translateService.instant('RetailAddBillerForm.smartPayDisclimerTextStart') +" "+accountType === '1' ? debitAccount : creditCardAccounts+" "+this._translateService.instant('RetailAddBillerForm.smartPayDisclimerTextEnd') 
    } else {
      this.setHidden('accountDetailAccordion',true);
      this.setHidden("smartPayDisclaimer", true);
    }
  }

  public override preSubmitInterceptor(payload: Billeraccountreq): any {
    // WRITE CODE HERE TO HANDLE

    this._appconfig.setData('selectedBillerDataForAdd', payload);
    console.log(payload)
    return this.handleFormOnPresubmit(payload);
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    // payload.operationMode = this.state.operationMode;
    payload.billerBeneficiaryId = this.state.billerBeneficiaryId
    payload.currencyCode = this.state.billeraccount?.currencyCode;
    if (!payload?.inventoryNumber) {
      delete payload.inventoryNumber
    }
    if (!payload?.formUpdated || payload.formUpdated) {
      delete payload.formUpdated
    }
    if (!payload?.dynamicFormValid || payload?.dynamicFormValid) {
      delete payload.dynamicFormValid
    }
    // if (!payload?.nickName) {
    //   delete payload.nickName
    // }
    let billeraccountparamreq = this.getValue('billeraccountparamreq');
    payload = this.constructPayload(payload);
    return payload;

  }

  constructPayload(payload:any, dynamicFormGroupValue:any = undefined):any{
    dynamicFormGroupValue = dynamicFormGroupValue || payload.billeraccountparamreq;
    
    delete payload.inventoryNumber;

    // if (!payload?.nickName) delete payload.nickName;

    if (payload.smartPay === '1') {
      if (payload.accountType == "1") {
        payload.debitAccount = payload.debitAccount
        delete payload.creditCardAccounts;
      } else {
        payload.debitAccount = payload.creditCardAccounts
        delete payload.creditCardAccounts;
      }
    } else {
      payload.smartPay = '0'
      delete payload.accountType;
      delete payload.debitAccount;
      delete payload.creditCardAccounts;
    }
    let tempBilleraccountparamreq = [];
    if (payload?.billeraccountparamreq?.length > 0 || dynamicFormGroupValue) {
      let enqParam = dynamicFormGroupValue?.[0]?dynamicFormGroupValue?.[0]:payload?.billeraccountparamreq?.[0];
      // let keys: any = Object.keys(enqParam)
      if(enqParam.paramValue){
        enqParam.orderSl = Number(enqParam.orderSl);
        tempBilleraccountparamreq.push(enqParam);
      }else{
        for (var key in enqParam) {
          let paramValue = enqParam?.[key] ? enqParam?.[key]?.toString() : "";
          if (key === this.state.billeraccount.billerCreditAccount) {
            payload.billerCreditAccount = paramValue;
          }
          let dynamicFormInitData =  this.state.dynamicFormData?.find((x:any)=>x.formControlName == key)
  
          tempBilleraccountparamreq.push(
            {
              "paramName": key,
              "orderSl": Number(dynamicFormInitData?.orderSl),
              "paramValue": paramValue
            })
        }
      }
      
      if (this.state.operationMode == "D") {
        let tempbillerCreditAccount = this.state.deleteModebillerParam.find((x: any) => x.paramName === this.state.billeraccount.billerCreditAccount)
        payload.billerCreditAccount = tempbillerCreditAccount.paramValue;
        payload.billeraccountparamreq = this.state.deleteModebillerParam?.map((res: any) => { return { ...res, orderSl: Number(res.orderSl) } });      
      }else {
        payload.billeraccountparamreq = tempBilleraccountparamreq;
        // tempBilleraccountparamreq = []; 
      }
      payload.currencyCode = this.state.billeraccount?.currencyCode;
      payload.operationMode = this.state.operationMode;
     // payload.operationMode = this.state.operationMode == "D" ? "D" : "A";
      if (this.state.operationMode == "D") {
        payload.billerBeneficiaryId = this.state.billerBeneficiaryId || ""
      }
      if (this.state.operationMode == "M") {
        payload.billerBeneficiaryId = this.state.billerBeneficiaryId || "";
        return payload;
      }
    }
    return payload 
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.billeraccountreq;
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

  doDestory(): void {
    this.dynamicFormAction.unsubscribe();
  }

  private _onReset = () => {
    this.state.dynamicFormData = [];
    this.handleFormOnLoad();
    // this.reset('billerId');
    this.setValue('billerId', '');
    // if(this.state.operationMode === "D"){

    // }else{
    //   this.formGroup.reset();
    // }
  }
}