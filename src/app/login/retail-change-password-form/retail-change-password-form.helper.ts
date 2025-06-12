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
import { ChangepassService } from "../changepass-service/changepass.service";
import { Changepass } from "../changepass-service/changepass.model";
export class RetailChangePasswordFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
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
  LETTER_RULE = /^[a-zA-Z0-9!@#$%^&*]+$/;
  ONLY_NUMARIC = /[0-9]/;
}


@Injectable()
export class RetailChangePasswordFormHelper extends BaseFpxFormHelper<RetailChangePasswordFormState> {
  password: any;

  constructor(
    private retailChangePasswordFormService: ChangepassService,
    private _appConfig: AppConfigService,
    private _userAuth: UserAuthService,
    private _httpProvider: HttpProviderService
  ) {
    super(new RetailChangePasswordFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCHANGEPASSWORD");
    this.hideShellActions();
  }
  gotoWelcome() {
    this._angularRouter.navigate(['welcome']);
  }

  private handlenewpasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    this.password = value;
    formGroup.get("confirmPassword")?.reset();
    if (value.length >= 8 && value.length <= 32) this.state.lengthValid = true;
    else this.state.lengthValid = false;
    this.state.mustContainLetters = value && this.state.UPPERCASE.test(value) &&
      this.state.LOWERCASE.test(value) && this.state.ONLY_NUMARIC.test(value)
      && this.state.LETTER_RULE.test(value)
      && this.state.SPECIALCHARS.test(value);
    this.checkSeqenceAppears(value);
    if (value) this.state.space = !(/\s/.test(value));
    else this.state.space = false;
    if (!this.state.lengthValid || !this.state.mustContainLetters || !this.state.mustContainLetters || !this.state.space || !this.state.sequenceValid) {
      this.setErrors('newPassword', "passwd");
    }
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
  private handleconfrimPasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if (status === "VALID") {
      if (value != this.password) {
        this.setErrors('confirmPassword', "passwordval")
      }
    }
  };
  private handleoldpasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    this.checkCurrentPassword();
  }

  checkCurrentPassword(){
    let newPasword = this.formGroup?.get('newPassword')?.value
    let currentPass = this.formGroup?.get('oldPassword')?.value
      if(newPasword && currentPass && newPasword === currentPass){
        if(!this.formGroup?.get('newPassword')?.hasError('cannotCurrentPass')){
          this.setErrors('newPassword','cannotCurrentPass')
        }
      }else if(currentPass && this.formGroup?.get('newPassword')?.hasError('cannotCurrentPass')){
        this.formGroup?.get('newPassword')?.setErrors(null);
      }
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("oldPassword", this.handleoldpasswordOnvalueChange);
    this.addValueChangeHandler("newPassword", this.handlenewpasswordOnvalueChange);
    this.addValueChangeHandler("confirmPassword", this.handleconfrimPasswordOnvalueChange);
  }

  public override preSubmitInterceptor(payload: Changepass): any {
    // WRITE CODE HERE TO HANDLE 
    payload = {
      reqRef: this._appConfig.getData('reqRef'),
      ticket: this._appConfig.getData('ticket'),
      oldPassword: this._userAuth.encryptPassword(payload.oldPassword),
      newPassword: this._userAuth.encryptPassword(payload.newPassword)
    };
    return payload;
  }


  public override postDataFetchInterceptor(payload: Changepass) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
     
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body,
        transRef: response.success?.body?.processId,
        status: "success",
      });
    } 
    else if (response?.error) {
      let error = response?.error?.error;
          routingInfo.setQueryParams({
            errMsg: response.error?.error?.errorMsg,
            status: "failed",
            response: {
              statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
              message: error?.errorMsg,
              description: error?.errorDesc,
              serviceCode: this.serviceCode,
            }
          });
          routingInfo.navigationURL = [
          "prelogin-space",
          "entry-shell",
          "login",
          "confirmation-receipt"]
     }
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


