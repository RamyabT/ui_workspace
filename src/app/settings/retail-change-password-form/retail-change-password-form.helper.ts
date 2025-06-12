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
import { ChangepasswordService } from '../changepassword-service/changepassword.service';
import { Changepassword } from '../changepassword-service/changepassword.model';
import { AppConfigService, UserAuthService } from "@dep/services";
export class RetailChangePasswordFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  //  currentPass:any={
  //   visibilityChange: boolean =false,
  // autoComplete: boolean=false;
  //  } 
  //  newPass:any={
  //   visibilityChange: boolean =false,
  // autoComplete: boolean=false;
  //  } 
  //  confirmPass:any={
  //   visibilityChange: boolean =false,
  // autoComplete: boolean=false;
  //  } 
  formErrorMessage: string = "";
  password: any;
  lengthValid: boolean = false;
  alphaNumaricValid: boolean = false;
  mustContainLetters: boolean = false;
  lowerCaseValid: boolean = false;
  specialCharValid: boolean = false;
  numaricValid: boolean = false;
  sequenceValid: boolean = false;
  spaceAllowed: boolean = false;
  space: boolean = false;
  alplhabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  numeric = "0123456789";
  UPPERCASE = /[A-Z]/;
  LOWERCASE = /[a-z]/;
  SPECIALCHARS = /[!@#$%^&*]+/;
  SPECIALCHARS1 =`/[()_+\-=\[\]{};':"\\|,.<>\/?]+/`;
  ONLY_NUMARIC = /[0-9]/;
  LETTER_RULE = /^[a-zA-Z0-9!@#$%^&*]+$/;
}


@Injectable()
export class RetailChangePasswordFormHelper extends BaseFpxFormHelper<RetailChangePasswordFormState> {
  password: any;

  constructor(
    private retailChangePasswordFormService: ChangepasswordService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _userAuth: UserAuthService) {
    super(new RetailChangePasswordFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSTNGCHANGEPASSWORD");
  }


  public override doPostInit(): void {
    this.addValueChangeHandler("currentPass", this.handlecurrentpassOnvalueChange);
    this.addValueChangeHandler("newPass", this.handlenewpasswordOnvalueChange);
    this.addValueChangeHandler("confirmPass", this.handleconfirmPassOnvalueChange);
  }
  private handlenewpasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    this.formGroup.get("confirmPass")?.reset();
    if (value) {
      if (value?.length >= 8 && value?.length <= 32) this.state.lengthValid = true;
      else this.state.lengthValid = false;
      this.state.mustContainLetters = value && this.state.UPPERCASE?.test(value) &&
        this.state.LOWERCASE.test(value) && this.state.ONLY_NUMARIC?.test(value)
        && this.state.LETTER_RULE.test(value)
        && this.state.SPECIALCHARS.test(value);
        const isSpecialCharsPresent = this.state.SPECIALCHARS1.split('').some((char:any) => 
          value.includes(char)) ;
          if(isSpecialCharsPresent){
            this.state.mustContainLetters = false
          }
      this.checkSeqenceAppears(value);
      if (value) this.state.space = !(/\s/.test(value));
      else this.state.space = false;
      if (!this.state.lengthValid || !this.state.mustContainLetters || !this.state.mustContainLetters || !this.state.space || !this.state.sequenceValid) {
        this.setErrors('newPass', "passwd");
      }
    }
    this.checkBankPolicy();
    this.checkCurrentPassword();


  };

  checkSeqenceAppears(value: any) {
    if (value.length > 0) this.state.sequenceValid = true;
    else this.state.sequenceValid = false;
    if (value.length < 4) return;
    let valueArray = value
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split("");
    for (let i = 0; i < valueArray.length; i++) {
      if (i + 4 > valueArray.length) return;
      let searchString = valueArray
        .slice(i, i + 4)
        .slice()
        .sort()
        .toString()
        .replaceAll(",", "");
      if (
        this.state.alplhabet.toLowerCase().includes(searchString) ||
        this.state.numeric.includes(searchString)
      ) {
        this.state.sequenceValid = false;
        return;
      }
    }
  };

  private handlecurrentpassOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    this.checkCurrentPassword();
  }
  private handleconfirmPassOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if (status === "VALID") {
      if (value !== this.getValue('newPass')) {
        this.setErrors('confirmPass', "passwordval")
      }
    }
  }


  checkCurrentPassword(){
    let newPasword = this.formGroup?.get('newPass')?.value
    let currentPass = this.formGroup?.get('currentPass')?.value
      if(newPasword && currentPass && newPasword === currentPass){
        if(!this.formGroup?.get('newPass')?.hasError('cannotCurrentPass')){
          this.setErrors('newPass','cannotCurrentPass')
        }
      }else if(currentPass && this.formGroup?.get('newPass')?.hasError('cannotCurrentPass')){
        this.formGroup?.get('newPass')?.setErrors(null);
      }
  }

  checkBankPolicy() {
    if (this.state.lengthValid
      && this.state.space
      && this.state.sequenceValid
      && this.state.mustContainLetters) {
      this.formGroup.get('isFormValid')?.setErrors(null)
    } else {
      this.formGroup.get('isFormValid')?.setErrors({ policyMismatched: true }, { emitEvent: true })
    }
  }
  public override preSubmitInterceptor(payload: Changepassword): any {
    // WRITE CODE HERE TO HANDLE 
    payload = {
      currentPass: this._userAuth.encryptPassword(payload.currentPass),
      newPass: this._userAuth.encryptPassword(payload.newPass)
    };
    return payload;
  }


  public override postDataFetchInterceptor(payload: Changepassword) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  resetForm() {
    this.formGroup.reset();
  }


  public override postSubmitInterceptor(response:any): RoutingInfo {
    console.log(response);
 
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
   }
 
   public handleFormOnPostsubmit(response: any, routingInfo: any) {
     // WRITE CODE HERE TO HANDLE
     if (response.success) {
       let res = response?.success?.body?.changepassword;
       routingInfo.setQueryParams({
         response: res
       });
     } else if (response.error) {
       let error = response.error.error;
       routingInfo.setQueryParams({
         response: error,
         serviceCode: this.serviceCode?.value
       });
     }
     return response;
   }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}