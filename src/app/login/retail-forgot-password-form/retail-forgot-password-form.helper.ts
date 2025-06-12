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
import { RetailForgotpasswordService } from "../retailforgotpassword-service/forgotpassword.service";
import { AppConfigService, UserAuthService } from "@dep/services";
import { ForgotpasswordService } from "../login-validator-services/forgot-password-validator.service";
import { CreditcardService } from "src/app/credit-cards/creditcard-service/creditcard.service";
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { PrepaidcardService } from "src/app/prepaidcard/prepaidcard-service/prepaidcard.service";
import { RetailMigratedUserComponent } from "src/app/prelogin/retail-migrated-user/retail-migrated-user.component";
import { EncryptionService } from "src/app/foundation/validator-service/encryption-services";
import { TranslateService } from "@ngx-translate/core";

export class RetailForgotPasswordFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dob: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  expiryYearLabel:any
}

@Injectable()
export class RetailForgotPasswordFormHelper extends BaseFpxFormHelper<RetailForgotPasswordFormState> {
  contextmenuModelAfterClose(contextmenuModelAfterClose: any) {
    throw new Error("Method not implemented.");
  }
  identifyMode: any;
  userdata: any;
  constructor(
    private _httpProvider: HttpProviderService,
    private activateddc: ActivateDCValidationService,
    private activatedcc: CreditcardService,
    private accountpicservice: AccountsService,
    private _translateService: TranslateService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _ForgotpasswordService: ForgotpasswordService,
    private _encryptionService: EncryptionService

  ) {
    super(new RetailForgotPasswordFormState());
  }
  gotoWelcome() {
    this._angularRouter.navigate(['welcome']);
  }
  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILFORGOTPASSWORD");

  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.state.expiryYearLabel =  this._translateService.instant('RetailCustomerVerificationForm.expiryYearLabel.label')+"<span class='indicator'> *</span>"
    this.removeShellBtn('RESET');
    this.addShellButton("RetailForgotPasswordForm.backBtnLbl", "BACK", "secondary", "DISPLAY", "button");
    this.setValue('username', '');
    this.setValue('pin', '');
    this.setValue('identificationMode', '7');
    this.setHidden('debitcardNumber', true);
    this.setHidden('accountNumber', true);
    this.setHidden('customerCif', false);
    this.setHidden('termsFlag',true);
     this.setHidden('dob', false);
    this.state.dob.maxDate = this._appConfig.getCBD();
  }
  public navToForgotUsername() {
    this._router.navigate(["prelogin-space", "entry-shell", "login", "retail-customer-verification-form"],
      {
        queryParams: {
          serviceCode: "RETAILFORGOTUSERNAME"
        }
      })
  }
  public handlePinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // if (value && status == 'VALID') {
    //   if (this.identifyMode == 1) {
    //     //account Number
    //     let accountNumber = this.getValue('accountNumber');
    //     let payload = {
    //       "pin": value
    //     }

    //     this.accountpicservice.AccountPinValidator(payload, accountNumber)?.subscribe((error) => {
    //       let errorMsg = error?.errorCode
    //       if (error) {
    //         this.setErrors('confirmPin', errorMsg);
    //       }

    //     });
    //   }
    //   else if (this.identifyMode == 2) {
    //     //debitcard
    //     let cardnumber = this.getValue('cardReference');
    //     let payload = {
    //       "dcPinVerify": {
    //         "pin": value
    //       }
    //     }

    //     this.activateddc.dcPinValidator(payload, cardnumber)?.subscribe((error) => {
    //       let errorMsg = error?.errorCode
    //       if (error) {
    //         this.setErrors('confirmPin', errorMsg);
    //       }

    //     });
    //   }
    //   else if (this.identifyMode == 3) {
    //     //creditcard
    //     let cardnumber = this.getValue('cardRefNumber');
    //     let payload = {
    //       "ccPinVerify": {
    //         "pin": value
    //       }
    //     }

    //     this.activatedcc.CreditCardPinValidator(payload, cardnumber)?.subscribe((error) => {
    //       console.log("Error is:", error);
    //       let errorMsg = error?.errorCode
    //       if (error) {
    //         this.setErrors('confirmPin', errorMsg);
    //       }
    //     });
    //   }
    //   else if (this.identifyMode == 4) {
    //     //prepaidcard

    //     let cardnumber = this.getValue('cardReference');
    //     let payload = {
    //       "pcPinVerify": {
    //         "pin": value
    //       }
    //     }

    //     this.activateddc.pcPinValidator(payload, cardnumber)?.subscribe((error) => {
    //       console.log("Error is:", error);
    //       let errorMsg=error?.errorCode
    //       if (error) {
    //         this.setErrors('confirmPin',errorMsg);
    //       }

    //     });
    //     this.setValue('confirmPin', Number(value));
    //   }

    // }
  }

  public handleIdentificationModeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.identifyMode = value;
    if (value == '1') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', false);
      this.setHidden('customerCif', true);
      this.setHidden('debitcardNumber', true);
      this.setHidden('expiryMonth',true);
      this.setHidden('expiryYear',true);
      this.setHidden('expiryDate',true);
      this.setHidden('pin', false);
      this.reset('accountNumber', true);
      this.setLabel('accountNumber', 'RetailForgotPasswordForm.accountNumber.label');
       this.reset('pin', '');
      // this.reset('customerId',true);
      // this.reset('dob',true);
      this.setHidden('dob', false);
    }
    else if (value == '2') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', true);
      this.setHidden('customerCif', true);
      this.setHidden('debitcardNumber', false);
      this.setHidden('expiryMonth',false);
      this.setHidden('expiryYear',false);
      this.setHidden('expiryDate',false);
      this.setHidden('pin', false);
      this.setLabel('debitcardNumber', 'RetailForgotPasswordForm.debitcardNumber.label');
      this.reset('debitcardNumber', true);
       this.reset('pin', '');
      this.setHidden('dob', true);
      // this.reset('dob',true)
    }
    else if (value == '3') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', true);
      this.setHidden('customerCif', true);
      this.setHidden('debitcardNumber', false);
      this.setHidden('expiryMonth',false);
      this.setHidden('expiryYear',false);
      this.setHidden('expiryDate',false);
      this.setHidden('pin', false);
      this.setLabel('debitcardNumber', 'RetailForgotPasswordForm.creditcardNumber.label');
      this.reset('debitcardNumber', true);
      this.reset('pin', '');
      this.setHidden('dob', true);
      // this.reset('dob',true);
    }
    else if (value == '4') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', true);
      this.setHidden('customerCif', true);
      this.setHidden('debitcardNumber', false);
      this.setHidden('expiryMonth',false);
      this.setHidden('expiryYear',false);
      this.setHidden('expiryDate',false);
      this.setHidden('pin', false);
      this.setLabel('debitcardNumber', 'RetailForgotPasswordForm.prepaidcardNumber.label');
      this.reset('debitcardNumber', true);
       this.reset('pin', '');
      this.setHidden('dob', true);
      // this.reset('dob',true)
    }
    else if (value == '5') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', true);
      this.setHidden('customerCif', false);
      this.setHidden('debitcardNumber', true);
      this.setHidden('expiryMonth',true);
      this.setHidden('expiryYear',true);
      this.setHidden('expiryDate',true);
      this.setHidden('pin',false);
      this.setHidden('dob', false);
      this.setLabel('customerCif', 'RetailForgotPasswordForm.customerNumber.label');
      this.reset('customerCif', true);
      // this.reset('dob',true)
    }
    
    else if (value == '6') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', false);
      this.setHidden('customerCif', true);
      this.setHidden('debitcardNumber', true);
      this.setHidden('expiryMonth',true);
      this.setHidden('expiryYear',true);
      this.setHidden('expiryDate',true);
      this.setHidden('pin',true);
      this.setHidden('dob', false);
      this.setLabel('accountNumber', 'RetailCustomerVerificationForm.accountNumber.label');
      this.reset('customerCif', true);
      this.reset('dob','')
    }
    else if (value == '7') {
      // this.setHidden('customerId',true);
      this.setHidden('accountNumber', true);
      this.setHidden('customerCif', false);
      this.setHidden('debitcardNumber', true);
      this.setHidden('expiryMonth',true);
      this.setHidden('expiryYear',true);
      this.setHidden('expiryDate',true);
      this.setHidden('pin',true);
      this.setHidden('dob', false);
      this.setLabel('customerCif', 'RetailCustomerVerificationForm.customerNumber.label');
      this.reset('customerCif', true);
      this.reset('dob','')
    }
  }
  public handleUserNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    // if(value){
      this.userdata=value.toUpperCase();
      let pinValue = this.formGroup.get('pin')?.value
      if(pinValue){
      this.formGroup.get('pin')?.setErrors(null,{emitEvent:true})
      }
    //   this._ForgotpasswordService
    //     .validateuser({
    //       "username": this.userdata
    //     })() 
    //     .subscribe({
    //       next: (res) => {
          //   if(res.body.status==9){
  
          //     let modal = new FpxModal();
          //     modal.setComponent(RetailMigratedUserComponent);
          //     modal.setPanelClass('dep-alert-popup');
          //     modal.setBackDropClass('dep-popup-back-drop');
          //     modal.setDisableClose(false);
          //     modal.setData({
          //       title: "PreloginCheck.title"
          //     });
          //     modal.setAfterClosed(this.contextmenuModelAfterClose);
          //     this.openModal(modal);
            
          // }
    //       },
    //       error: (err: any) => {
    //         console.log(err);
           
    //         if(err.error?.ErrorCode == 'DEPIAM0002'){
    //           this.setErrors('username','username_locked',{ 'username_locked' : err.error?.ErrorDesc});
    //         }else{
    //           this.setErrors('username', 'username_invalid')
    //         }
    //       },
    //       complete: () => {

    //       }
    //     });
    // }

  }; public handleCustomerCifOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let pinValue = this.formGroup.get('pin')?.value
    let dobValue = this.formGroup.get('dob')?.value
    if(pinValue || dobValue){
    this.formGroup.get('pin')?.setErrors(null,{emitEvent:true});
    this.formGroup.get('dob')?.setErrors(null,{emitEvent:true});
    }
  }
  public handleDebitcardNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let pinValue = this.formGroup.get('pin')?.value
    if(pinValue){
    this.formGroup.get('pin')?.setErrors(null,{emitEvent:true})
    }
  }
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let pinValue = this.formGroup.get('pin')?.value
    let dobValue = this.formGroup.get('dob')?.value
    if(pinValue || dobValue){
    this.formGroup.get('pin')?.setErrors(null,{emitEvent:true});
    this.formGroup.get('dob')?.setErrors(null,{emitEvent:true});
    }
  }
  public handleExpiryYearOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let pinValue = this.formGroup.get('pin')?.value
    if(pinValue){
    this.formGroup.get('pin')?.setErrors(null,{emitEvent:true})
    }
  }
  public handleExpiryMonthOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let pinValue = this.formGroup.get('pin')?.value
    if(pinValue){
    this.formGroup.get('pin')?.setErrors(null,{emitEvent:true})
    }
  }
  public handleDobOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
   if(value){
    // this.state.dob.maxDate = this._appConfig.getCBD();
   }
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("username", this.handleUserNameOnvalueChange);
    this.addValueChangeHandler("identificationMode", this.handleIdentificationModeOnvalueChange);
    this.addValueChangeHandler("expiryMonth", this.handleExpiryMonthOnvalueChange);
    this.addValueChangeHandler("expiryYear", this.handleExpiryYearOnvalueChange);
    this.addValueChangeHandler("customerCif", this.handleCustomerCifOnvalueChange);
    this.addValueChangeHandler("debitcardNumber", this.handleDebitcardNumberOnvalueChange);
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("pin", this.handlePinOnvalueChange);
    this.addValueChangeHandler("dob", this.handleDobOnvalueChange);
    this.handleFormOnLoad();
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    this._appConfig.setData('otpService', 'FORGOTPASSWORD');
    // payload={
    //   // username: this.formGroup.controls['username'].value == '1' ? 'C' : 'A',
    //   // identificationMode: this.formGroup.controls['identificationMode'].value == '1' ? 'C' : 'A',
    //   // identificationNumber:this.formGroup.controls['identificationMode'].value == '1' ? this.formGroup.controls['customerId'].value : this.formGroup.controls['accountNumber'].value,
    // }

    var payloadData: any = {
      "username": this.userdata,
      "identificationMode": payload.identificationMode,
      "identificationNumber": payload.accountNumber,
      // "pin":this._encryptionService.encrypt(payload.pin),
      "identificationDate":payload.dob,
      "pin":payload.pin
          
    }
    if (payloadData.identificationMode == "1" || payloadData.identificationMode == "6"){
      payloadData = { ...payloadData, "identificationNumber": payload.accountNumber }
    } else if (payloadData.identificationMode == "2") {
      
      payloadData = { ...payloadData, "identificationNumber": payload.debitcardNumber,"identificationDate":payload.expiryMonth + "/" + payload.expiryYear }
      
    } else if (payloadData.identificationMode == "3") {
      payloadData = { ...payloadData, "identificationNumber": payload.debitcardNumber,"identificationDate":payload.expiryMonth + "/" + payload.expiryYear }
    } else if (payloadData.identificationMode == "4") {
      payloadData = { ...payloadData, "identificationNumber": payload.debitcardNumber ,"identificationDate":payload.expiryMonth + "/" + payload.expiryYear}
    }
    else if (payloadData.identificationMode == "5"||payloadData.identificationMode == "7") { 
      payloadData = { ...payloadData, "identificationNumber": payload.customerCif }
  }
  return payloadData;
  }
  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      this._appConfig.setData('otpService', 'FORGOTPASSWORD')
      routingInfo.setQueryParams({
        response: response.success?.body,
        transRef: response.success?.body?.processId,
        status: "success"
      });
    }
    else if (response.error) {
      if (response.error?.error?.errorCode == 'DEPIAM0030') {
        this.setErrors('pin', 'invalid_cus_data', { 'invalid_cus_data': response.error?.error?.errorDesc });
        this.setErrors('dob', 'invalid_cus_data', { 'invalid_cus_data': response.error?.error?.errorDesc });
        
      }
      else if (response.error?.error?.errorCode == 'DEPIAM0032') {
        this.setErrors('pin', 'user_exists', { 'user_exists': response.error?.error?.errorDesc });
        this.setErrors('dob', 'user_exists', { 'user_exists': response.error?.error?.errorDesc });
      }
      else if (response.error?.error?.errorCode == 'HTTP-500'|| 'DEPERR11004') {
        this.setErrors('pin', 'invalid_cus_data', { 'invalid_cus_data': response.error?.error?.errorDesc });
        this.setErrors('dob', 'invalid_cus_data', { 'invalid_cus_data': response.error?.error?.errorDesc });
      }
      else if(response.error?.error?.errorCode=='DEPERR10001'||'DEPERR10002'||'DEPERR10003'||'DEPERR10004'){
        this.setErrors('pin','invalid_user_data',{ 'invalid_user_data' : response.error?.error?.errorDesc}); 
        this.setErrors('dob','invalid_user_data',{ 'invalid_user_data' : response.error?.error?.errorDesc}); 
      }
      else if (response.error?.error?.errorCode == 'DEPERR11006') {
        this.setErrors('pin', 'usermap_invalid', { 'usermap_invalid': response.error?.error?.errorDesc });
        this.setErrors('dob', 'usermap_invalid', { 'usermap_invalid': response.error?.error?.errorDesc });
      } else if (response.error?.error?.errorCode == 'DEPERR11007' || 'IAM000001') {
        this.setErrors('pin', 'userblock', { 'userblock': response.error?.error?.errorDesc });
        this.setErrors('dob', 'userblock', { 'userblock': response.error?.error?.errorDesc });
      }
      else{
        this.setErrors('pin','invalid_cus_data',{ 'invalid_cus_data' : response.error?.error?.errorDesc}); 
        this.setErrors('dob','invalid_cus_data',{ 'invalid_cus_data' : response.error?.error?.errorDesc}); 
      }
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
