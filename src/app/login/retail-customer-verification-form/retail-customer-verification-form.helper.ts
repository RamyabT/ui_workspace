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
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, UserAuthService } from "@dep/services";
import { RetailunlockuserService } from "../retailunlockuser-service/retailunlockuser.service";
import { RetailselfregisterService } from "../retailselfregister-service/retailselfregister.service";
import { RetailforgotusernameService } from "../retailforgotusername-service/retailforgotusername.service";
import { Retailselfregister } from "../retailselfregister-service/retailselfregister.model";
import { PrepaidcardService } from "src/app/prepaidcard/prepaidcard-service/prepaidcard.service";
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { CreditcardService } from "src/app/credit-cards/creditcard-service/creditcard.service";
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { EncryptionService } from "src/app/foundation/validator-service/encryption-services";
import { TranslateService } from "@ngx-translate/core";
export class RetailCustomerVerificationFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dob: any = {
    minDate: "",
    maxDate: "",
  }
  serviceCode: any;
  headerTitle: string = '';
  FieldId_4:any={
    text:"Expiry Year"
   }
   expiryYearLabel:any;
}


@Injectable()
export class RetailCustomerVerificationFormHelper extends BaseFpxFormHelper<RetailCustomerVerificationFormState>{
  identifyMode: any;
  constructor(private retailselfregisterService: RetailselfregisterService,
    private activateddc: ActivateDCValidationService,
    private activatedcc: CreditcardService,
    private _translateService: TranslateService,
    private accountpicservice: AccountsService,
    private retailforgotusernameService: RetailforgotusernameService,
    private retailunlockuserService: RetailunlockuserService,
    private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router,
    private _encryptionService: EncryptionService,) {
    super(new RetailCustomerVerificationFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.state.serviceCode = this.getRoutingParam('serviceCode');
    if (this.state.serviceCode == 'RETAILSELFREG') {
      this.setDataService(this.retailselfregisterService);
      this.setServiceCode("RETAILSELFREG");
      this.state.headerTitle = 'RetailCustomerVerificationForm.title';
    }else if (this.state.serviceCode == 'RETAILMIGRATEDUSER') {
      this.setDataService(this.retailselfregisterService);
      this.setServiceCode("RETAILMIGRATEDUSER");
      this.state.headerTitle = 'RetailCustomerVerificationForm.title';
    }  
    else if (this.state.serviceCode == 'RETAILFORGOTUSERNAME') {
      this.setDataService(this.retailforgotusernameService);
      this.setServiceCode("RETAILFORGOTUSERNAME");
      this.state.headerTitle = 'RetailCustomerVerificationForm.userNameTitle';
    } else if (this.state.serviceCode == 'RETAILUNLOCKUSER') {
      this.setDataService(this.retailunlockuserService);
      this.setServiceCode("RETAILUNLOCKUSER");
      this.state.headerTitle = 'RetailCustomerVerificationForm.unlockUserTitle';
    }
    // this.state.dob.minDate = new Date(new Date().setMonth(new Date().getMonth()-6));
    // this.state.dob.maxDate =new Date();
    // this.setValue('dob', this.state.dob.minDate);
  }
  gotoWelcome() {
    this._angularRouter.navigate(['welcome']);
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
   this.state.expiryYearLabel =  this._translateService.instant('RetailCustomerVerificationForm.expiryYearLabel.label')+"<span class='indicator'> *</span>"
    this.removeShellBtn('RESET');
    this.addShellButton("RetailForgotPasswordForm.backBtnLbl", "BACK", "secondary", "DISPLAY", "button");
    this.setValue('accountNumber', '');
    this.setValue('pin', '');
    this.setValue('identificationMode', '2');
    this.setHidden('debitcardNumber', false);
    this.setHidden('accountNumber', true);
    this.setHidden('customerCif', true);
    this.setHidden('pin', false);
    this.setHidden('dob', true);
    this.state.dob.maxDate = this._appConfig.getCBD();
  }

  public handleIdentificationModeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
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
      this.setHidden('dob', true);
      this.reset('accountNumber', true);
      this.setLabel('accountNumber', 'RetailCustomerVerificationForm.accountNumber.label');
      this.reset('pin', '');
      // this.reset('customerId',true);
      // this.reset('dob',true)
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
      this.setHidden('dob', true);
      this.setLabel('debitcardNumber', 'RetailCustomerVerificationForm.debitcardNumber.label');
      this.reset('debitcardNumber', true);
      this.reset('pin', '');
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
      this.setLabel('debitcardNumber', 'RetailCustomerVerificationForm.creditcardNumber.label');
      this.reset('debitcardNumber', true);
      this.reset('pin', '');
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
      this.setHidden('dob', true);
      this.setLabel('debitcardNumber', 'RetailCustomerVerificationForm.prepaidcardNumber.label');
      this.reset('debitcardNumber', true);
      this.reset('pin', '');
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
      this.setHidden('dob', true);
      this.setLabel('customerCif', 'RetailCustomerVerificationForm.customerNumber.label');
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
      this.reset('dob',true);
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
      this.reset('dob','');
    }
  }
  public handlePinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // if (value) {
    //   if (this.identifyMode == 1) {
    //     //account Number
    //     if (value && status == 'VALID') {
    //       let accountNumber = this.getValue('accountNumber');
    //       let payload = {
    //         "pin": value
    //       }

    //       this.accountpicservice.AccountPinValidator(payload, accountNumber)?.subscribe((error) => {
    //         let errorMsg = error?.errorCode
    //         if (error) {
    //           this.setErrors('confirmPin', errorMsg);
    //         }

    //       });
    //     }
    //   }
    //   else if (this.identifyMode == 2) {
    //     //debitcard
    //     if (value) {
    //       if (value && status == 'VALID') {
    //         let cardnumber = this.getValue('cardReference');
    //         let payload = {
    //           "dcPinVerify": {
    //             "pin": value
    //           }
    //         }

    //         this.activateddc.dcPinValidator(payload, cardnumber)?.subscribe((error) => {
    //           let errorMsg = error?.errorCode
    //           if (error) {
    //             this.setErrors('confirmPin', errorMsg);
    //           }

    //         });
    //       }
    //     }
    //   }
    //   else if (this.identifyMode == 3) {
    //     //creditcard
    //     if (value) {
    //       let cardnumber = this.getValue('cardRefNumber');
    //       let payload = {
    //         "ccPinVerify": {
    //           "pin": value
    //         }
    //       }

    //       this.activatedcc.CreditCardPinValidator(payload, cardnumber)?.subscribe((error) => {
    //         console.log("Error is:", error);
    //         let errorMsg = error?.errorCode
    //         if (error) {
    //           this.setErrors('confirmPin', errorMsg);
    //         }
    //       });
    //     }
    //   }
    //   else if (this.identifyMode == 4) {
    //     //prepaidcard
    //     //  let pin=this.formGroup.controls['pin'];
    //     let cardnumber = this.getValue('cardReference');
    //     let payload = {
    //       "pcPinVerify": {
    //         "pin": value
    //       }
    //     }

    //     this.activateddc.pcPinValidator(payload, cardnumber)?.subscribe((error) => {
    //       console.log("Error is:", error);
    //       let errorMsg = error?.errorCode
    //       if (error) {
    //         this.setErrors('confirmPin', errorMsg);
    //       }

    //     });
    //     this.setValue('confirmPin', Number(value));
    //   }

    // }
  }


  public handleCustomerCifOnvalueChange: BaseFpxChangeHandler = (
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
    //  payload={
    //   identificationMode: this.formGroup.controls['identificationMode'].value == '1' ? 'C' : 'A',
    //   identificationNumber:this.formGroup.controls['identificationMode'].value == '1' ? this.formGroup.controls['customerId'].value : this.formGroup.controls['accountNumber'].value,
    //   dob:payload.dob
    //  }
    var payloadData: any = {
      "identificationMode": payload.identificationMode,
      "identificationNumber": payload.accountNumber,
      // "pin":this._encryptionService.encrypt(payload.pin),
      "pin":payload.pin,
      "identificationDate":payload.dob,
      "username":this._appConfig.getData('username')
          
    }
    if (payloadData.identificationMode == "1"||payloadData.identificationMode == "6") {
      payloadData = { ...payloadData, "identificationNumber": payload.accountNumber }
    } else if (payloadData.identificationMode == "2") {
      
      payloadData = { ...payloadData, "identificationNumber": payload.debitcardNumber,"identificationDate":payload.expiryMonth + "/" + payload.expiryYear }
      
    } else if (payloadData.identificationMode == "3") {
      payloadData = { ...payloadData, "identificationNumber": payload.debitcardNumber,"identificationDate":payload.expiryMonth + "/" + payload.expiryYear }
    } else if (payloadData.identificationMode == "4") {
      payloadData = { ...payloadData, "identificationNumber": payload.debitcardNumber ,"identificationDate":payload.expiryMonth + "/" + payload.expiryYear}
    }
    else if (payloadData.identificationMode == "5"||payloadData.identificationMode == "7") {
      payloadData = { ...payloadData, "identificationNumber": payload.customerCif}
    }
    return payloadData;

  }


  public override postDataFetchInterceptor(payload: Retailselfregister) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      if (this.state.serviceCode == 'RETAILFORGOTUSERNAME') {
        this._appConfig.setData('otpService', "FORGOTUSERNAME");
      } else if (this.state.serviceCode == 'RETAILSELFREG') {
        this._appConfig.setData('otpService', "SELFREG");
      } else if (this.state.serviceCode == 'RETAILMIGRATEDUSER') {
        this._appConfig.setData('otpService', "SELFREG");
        this.setValue('username',this._appConfig.getData('username'));
      } 
      else if (this.state.serviceCode == 'RETAILUNLOCKUSER') {
        this._appConfig.setData('otpService', "UNLOCKUSER");
      }
      routingInfo.setQueryParams({
        response: response.success?.body,
        transRef: response.success?.body?.processId,
        status: "success"
      });
    }  else if (response.error) {
      if(response.error?.error?.errorCode=='DEPIAM0030'){
        this.setErrors('pin','invalid_data',{ 'invalid_data' : response.error?.error?.errorDesc}); 
        this.setErrors('dob','invalid_data',{ 'invalid_data' : response.error?.error?.errorDesc}); 
  }
  else if(response.error?.error?.errorCode=='DEPIAM0032'){
    this.setErrors('pin','user_exists',{ 'user_exists' : response.error?.error?.errorDesc}); 
    this.setErrors('dob','user_exists',{ 'user_exists' : response.error?.error?.errorDesc}); 
}
else if(response.error?.error?.errorCode=='HTTP-500'){
    this.setErrors('pin','invalid_cus_data',{ 'invalid_cus_data' : response.error?.error?.errorDesc}); 
    this.setErrors('dob','invalid_cus_data',{ 'invalid_cus_data' : response.error?.error?.errorDesc}); 
}
else if(response.error?.error?.errorCode=='DEPERR10001'||'DEPERR10002'||'DEPERR10003'||'DEPERR10004'){
  this.setErrors('pin','invalid_user_data',{ 'invalid_user_data' : response.error?.error?.errorDesc}); 
  this.setErrors('dob','invalid_user_data',{ 'invalid_user_data' : response.error?.error?.errorDesc}); 
}
else if (response.error?.error?.errorCode == 'DEPERR11006') {
  this.setErrors('pin', 'usermap_invalid', { 'usermap_invalid': response.error?.error?.errorDesc });
  this.setErrors('dob','usermap_invalid',{ 'usermap_invalid' : response.error?.error?.errorDesc}); 
} else if (response.error?.error?.errorCode == 'DEPERR11007') {
  this.setErrors('pin', 'userblock', { 'userblock': response.error?.error?.errorDesc });
  this.setErrors('dob','userblock',{ 'userblock' : response.error?.error?.errorDesc}); 
}
else{
  this.setErrors('pin','invalid_cus_data',{ 'invalid_cus_data' : response.error?.error?.errorDesc}); 
  this.setErrors('dob','invalid_cus_data',{ 'invalid_cus_data' : response.error?.error?.errorDesc}); 
}
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


