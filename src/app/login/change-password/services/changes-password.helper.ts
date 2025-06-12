import { Injectable } from "@angular/core";
import { FormControlStatus, FormGroup, ValidationErrors } from "@angular/forms";
import {
  SpinnerService,
  BaseFpxComponentState,
  BaseFpxFormHelper,
  LOWERCASE,
  ONLY_NUMARIC,
  SPECIALCHARS,
  UPPERCASE,
  ToastService,
  BaseFpxChangeHandler,
  RoutingInfo,
} from "@fpx/core";
import { UserDetailsService } from "src/app/layouts/services/user-details/user-details.service";
 import { LoginService } from "../../services/login.service";

export class ChangePasswordState extends BaseFpxComponentState {
  showError: string | null = "";
  bankPolicy: boolean = false;
  upperCaseValid: boolean = false;
  lowerCaseValid: boolean = false;
  specialCharValid: boolean = false;
  lengthValid: boolean = false;
  numaricValid: boolean = false;
  sequenceValid: boolean = false;
  spaceAllowed: boolean = false;
}

@Injectable()
export class ChangePasswordHelper extends BaseFpxFormHelper<ChangePasswordState> {
  minLength: number = 10;
  maxLength: number = 32;
  alplhabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  numeric = "0123456789";
  constructor( 
    private _loginService: LoginService,
    private _userDetails: UserDetailsService,
    private _spinnerService: SpinnerService,
    private _toastService: ToastService
  ) {
    super(new ChangePasswordState());
    this.setSpinnerService(_spinnerService);
    this.addChangeHandler("currentPass", this.doCurrentPasswordChange);
    this.addChangeHandler("newPass", this.doNewPasswordChange);
    this.addChangeHandler("confirmPass", this.matchPassword);
  }

  public doCurrentPasswordChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    formGroup.controls["confirmPass"].reset();
    formGroup.controls["newPass"].reset();
  };

  public doNewPasswordChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.state.upperCaseValid = value && UPPERCASE.test(value);
    this.state.lowerCaseValid = value && LOWERCASE.test(value);
    this.state.specialCharValid = value && SPECIALCHARS.test(value);
    // this.state.lengthValid =
    //   value && value.length >= this.minLength && value.length <= this.maxLength;

    if (value.length >= this.minLength && value.length <= this.maxLength)
      this.state.lengthValid = true;
    else this.state.lengthValid = false;

    this.state.numaricValid = value && ONLY_NUMARIC.test(value);
    this.checkSeqenceAppears(value);
    this.checkBankPolicy();

    console.log("All Sequence is: ", this.state.sequenceValid);

    formGroup.controls["confirmPass"].reset();

    // if (status === "VALID") {
    if (this.state.bankPolicy == true) {
      formGroup.get("newPass")?.setErrors(null, { emitEvent: false });
      if (
        formGroup.get("currentPass")?.value === formGroup.get("newPass")?.value
      ) {
        formGroup
          .get("newPass")
          ?.setErrors({ duplicatePassword: true }, { emitEvent: false });
      } else {
        formGroup.get("newPass")?.setErrors(null, { emitEvent: false });
      }
    } else if (this.state.bankPolicy == false) {
      formGroup
        .get("newPass")
        ?.setErrors({ incorrectBankPolicy: true }, { emitEvent: false });
    }
    // }
  };

  private matchPassword: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (status === "VALID") {
      if (
        formGroup.get("newPass")?.value == formGroup.get("confirmPass")?.value
      ) {
        formGroup.get("confirmPass")?.setErrors(null, { emitEvent: false });
      } else {
        formGroup
          .get("confirmPass")
          ?.setErrors({ passwordNotMatch: true }, { emitEvent: false });
      }
    }
  };

  checkSeqenceAppears(value: string) {
    let inValid = /\s/;

    var k = inValid.test(value);

    k == true
      ? (this.state.spaceAllowed = false)
      : (this.state.spaceAllowed = true);

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
        this.alplhabet.toLowerCase().includes(searchString) ||
        this.numeric.includes(searchString)
      ) {
        this.state.sequenceValid = false;
        return;
      }
    }
  }

  checkBankPolicy() {
    if (
      this.state.upperCaseValid &&
      this.state.lowerCaseValid &&
      this.state.specialCharValid &&
      this.state.lengthValid &&
      this.state.numaricValid &&
      this.state.sequenceValid
    )
      this.state.bankPolicy = true;
    else this.state.bankPolicy = false;
  }

  public override preSubmitInterceptor(payload: any) {
    const responsePayload = {
      changepassword: {
        currentPass: this._userDetails.encryptPassword(payload.currentPass),
        newPass: this._userDetails.encryptPassword(payload.newPass),
        confirmPass: this._userDetails.encryptPassword(payload.confirmPass),
      },
    };
    return responsePayload;
  }

  public override postSubmitInterceptor(response: {
    success: any;
    error: any;
  }): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success) {
      this._toastService.showFailure(
        "Success",
        "Password Changes Successfully"
      );
      routingInfo.setNavigationURL("display-shell/service-request-maintanence");
      return routingInfo;
    } else if (response.error) {
      let errorCode = response.error.error.errorCode;
      let errorMessage = response.error.errorMessage;
      let errors: ValidationErrors = {
        [errorCode]: true,
      };
      this.formGroup.get("confirmPass")?.setErrors(errors);
      this._toastService.showFailure("Failed", "Please Contact Adminstrator");
      return routingInfo;
    } else {
      return routingInfo;
    }
  }
}
