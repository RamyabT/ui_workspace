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
import { ResetPasswordService } from "../resetpassword-service/ResetPassword.service";
import { ResetPassword } from "../resetpassword-service/ResetPassword.model";
import { AppConfigService, UserAuthService } from "@dep/services";
export class RetailResetPasswordFormState extends BaseFpxComponentState {
  formErrorMessage: string = "";
  //  newPassword:any={
  //   visibilityChange: boolean =false,
  // autoComplete: boolean=false;
  //  } 
  //  confirmPassword:any={
  //   visibilityChange: boolean =false,
  // autoComplete: boolean=false;
  //  } 
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
  ONLY_NUMARIC = /[0-9]/;
  LETTER_RULE = /^[a-zA-Z0-9!@#$%^&*]+$/;
  errorMessage: any;
}


@Injectable()
export class RetailResetPasswordFormHelper extends BaseFpxFormHelper<RetailResetPasswordFormState>{
  // checkSeqenceAppears(value: any) {
  //   throw new Error("Method not implemented.");
  // }
  password: any;
  constructor(
    private retailResetPasswordFormService: ResetPasswordService,
    private _appConfig: AppConfigService,
    private _userAuth: UserAuthService,
    private _httpProvider: HttpProviderService,
    private _router: Router
  ) {
    super(new RetailResetPasswordFormState());
  }

  gotoWelcome() {
    this._angularRouter.navigate(['welcome']);
  }
  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILRESETPASSWORD");
  }
  private handlenewpasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.password = value;
    formGroup.get("confirmPassword")?.reset();
    if (value.length >= 8 && value.length <= 32) this.state.lengthValid = true;
    else this.state.lengthValid = false;
    this.state.mustContainLetters =
      value &&
      this.state.UPPERCASE.test(value) &&
      this.state.LOWERCASE.test(value) &&
      this.state.ONLY_NUMARIC.test(value) &&
      this.state.SPECIALCHARS.test(value) &&
      this.state.LETTER_RULE.test(value);
    this.checkSeqenceAppears(value);
    if (value) this.state.space = !/\s/.test(value);
    else this.state.space = false;
    if (
      !this.state.lengthValid ||
      !this.state.mustContainLetters ||
      !this.state.mustContainLetters ||
      !this.state.space ||
      !this.state.sequenceValid
    ) {
      this.setErrors('newPassword', "passwd");
    }

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
  }
  private handleconfrimPasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (status === "VALID") {
      if (value != this.password) {
        this.setErrors('confirmPassword', "passwordval")
      }
    }
  };

  public override doPostInit(): void {
    this.addValueChangeHandler(
      "newPassword",
      this.handlenewpasswordOnvalueChange
    );

    this.addValueChangeHandler(
      "confirmPassword",
      this.handleconfrimPasswordOnvalueChange
    );
  }

  public override preSubmitInterceptor(payload: ResetPassword): any {
    // WRITE CODE HERE TO HANDLE 
    this.state.formErrorMessage = "";
    payload = {
      "reqRef": this._appConfig.getData('reqRef'),
      "newPassword": this._userAuth.encryptPassword(payload.newPassword),
      "confirmPassword": this._userAuth.encryptPassword(payload.confirmPassword)
    }
    return payload;
  }


  public override postDataFetchInterceptor(payload: ResetPassword) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: "RETAILRESETPASSWORD",
      });
    }
    // else if (response.error) {
    //   let error = response.error;
    //   routingInfo.setQueryParams({
    //     result: {
    //       statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
    //       message: error.errorMsg,
    //       description: error.errorDesc,
    //       serviceCode: 'RETAILRESETPASSWORD',
    //     }

    //   });
    // }
    // else if (response.error) {
    //   console.log("Error", response.error?.error);
    //   let errorCode = response.error.error.errorCode;
    //   this.state.errorMessage =
    //     errorCode + ": " + response.error.error.errorMsg;
    //   if (response.error?.error?.errorCode == "DEPIAM0016") {
    //     this.setErrors("newPassword", {
    //       currpassval: response.error?.error?.errorDesc,
    //     });
    //   } else if (response.error?.error?.errorCode == "DEPIAM0017") {
    //     this.setErrors("newPassword", {
    //       passreqval: response.error?.error?.errorDesc,
    //     });
    //   } else if (response.error?.error?.errorCode == "DEPIAM0028") {
    //     this.setErrors("newPassword", {
    //       passconval: response.error?.error?.errorDesc,
    //     });
    //   } else if (response.error?.error?.errorCode == "DEPIAM0019") {
    //     this.setErrors("newPassword", {passresval: response.error?.error?.errorDesc,
    //     });
    //   } else {
    //     let error = response?.error.error;
    //     this.state.formErrorMessage = error.errorCode + ": " + error.errorDesc;
    //     this.reset("otp");
    //   }
    //   return response;
    // }
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
    // let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    //   if (response.success) {
    //     routingInfo.setQueryParams({
    //       response: response.success?.body,
    //       transRef: response.success?.body?.processId,
    //       status: "success",
    //     });
    //   } else if (response.error) {
    //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    //   }
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


