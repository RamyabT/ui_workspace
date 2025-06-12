import { Injectable } from "@angular/core";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { NativeStorageManager } from "@dep/native";
import { AppConfigService, UserAuthService } from "@dep/services";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed, FpxSubmitHandler, RoutingInfo } from "@fpx/core";
import { RegisterDeviceService } from "../registerdevice-service/register-device.service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { TestLoginService } from "src/app/login/test-services/test-login.service";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { OktaAuthService } from "src/app/okta-integration/okta/okta-auth.service";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx";

export class RegisterDeviceFormState extends BaseFpxComponentState {
  errorMessage: string = '';
  reqRef: string = '';
  reqServiceCode: string = '';
  pinSize: number = 4;
  deviceAuthInfo: any;
}

@Injectable()
export class RegisterDeviceFormHelper extends BaseFpxFormHelper<RegisterDeviceFormState> {
  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private _activeSpace: ActiveSpaceInfoService,
    private _userAuth: UserAuthService,
    private _nativeStorageMgr: NativeStorageManager,
    private _registerdevice:RegisterDeviceService,
    private _loginService:TestLoginService,
    private _oktaAuthService: OktaAuthService,
    private _fp: FingerprintAIO,
    private _deviceDetector: DeviceDetectorService
  ) {
    super(new RegisterDeviceFormState());
  }

  override doPreInit() {
    this.setServiceCode("REGISTERDEVICE");
    this.hideShellActions();
    this._activeSpace.setOrginSpace('welcome');
    this.state.reqRef = this.getRoutingParam('reqRef');

    if(this._appConfig.hasData('isForgotMpin')){
      this._nativeStorageMgr.loadData('deviceAuthInfo').then(
        (res:any) => {
          this.state.deviceAuthInfo = JSON.parse(atob(res));
        }
      );
    }
  }
  public handleFormOnLoad() {
    this._fp.isAvailable()
      .then((result: any) => { //'finger' | 'face' | 'biometric'
        let titleKey = '';
        if (result == 'finger') {
          titleKey = 'registerDeviceForm.enableFaceId.titleTouch';
          result = 'touch';
        }
        else if (result == 'face') {
          titleKey = 'registerDeviceForm.enableFaceId.titleFace';
          result = 'face';
        } else if(this._deviceDetector.os?.toLowerCase() == 'android') {
          titleKey = 'registerDeviceForm.enableFaceId.titleBiometric';
          result = 'face';
        } else {
          titleKey = 'registerDeviceForm.enableFaceId.titleBiometric';
          result = 'face';
        }
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
        modal.setDisableClose(true);
        modal.setData({
          title: titleKey,
          message: 'registerDeviceForm.enableFaceId.message',
          confirmationIcon: result + '-id',
          okBtnLbl: 'registerDeviceForm.enableFaceId.okBtnLbl',
          cancelBtnLbl: 'registerDeviceForm.enableFaceId.cancelBtnLbl'
        });
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        this.openModal(modal);
      }).catch((err) => {
        this._nativeStorageMgr.storeData('deviceAuthEnabled', "0");
        this._oktaAuthService.biometricRegistered$.next(false);
      });
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
      this.confirmEnableBiometric();
    } else {
      this._nativeStorageMgr.storeData('deviceAuthEnabled', "0");
      this._oktaAuthService.biometricRegistered$.next(false);
    }
  }
  

  override doPostInit() {
    this. handleFormOnLoad()
    // this.confirmEnableBiometric();
    // this.addValueChangeHandler('mpin', this.handleMpinOnvalueChange);
    // this.addValueChangeHandler('confirmMpin', this.handleConfirmMpinOnvalueChange);
  }

  public handleMpinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('confirmMpin');
    if(this.state.deviceAuthInfo && this._appConfig.hasData('isForgotMpin') && value.length == 4){
      if(value == this.state.deviceAuthInfo.mpin){
        this.setErrors('mpin', 'currentMpinMatch');
      }
    }
  }

  public handleConfirmMpinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.getValue('mpin') != value && value.length == this.state.pinSize) {
      this.setErrors('confirmMpin', 'not_match');
    }
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    this.state.errorMessage = "";
    return {
      reqRef: this.state.reqRef,
      mpin: this._userAuth.encryptPassword(payload.mpin),
      username: this._userAuth.username,
      isForgotMpin:this._appConfig.getData('isForgotMpin') || false
    };
  }

  handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if(response.success){
      let res = response.success?.body;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
  
      let deviceAuthInfo: any = {
        "mpin": this.getValue('mpin'),
        "username": this._userAuth.username,
        "userId": this._userAuth.userId,
        "firstName": this._userAuth.getFirstName()
      };
      deviceAuthInfo = btoa(JSON.stringify(deviceAuthInfo));
      this._nativeStorageMgr.storeData('deviceAuthInfo', deviceAuthInfo);
    }
    else if (response?.error) {
      if (response?.error?.error?.errorCode == "DEPIAM0010") {
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('dep-popup-back-drop');

        fpxModal.setData({
          message: response.error?.error.errorMsg || response.error?.error.errorMessage
        });
        
        fpxModal.setAfterClosed(this._onCloseAlert.bind(this));
        this.openModal(fpxModal);
      }
      else {
        let errorMessage = response.error?.error.errorMsg || response.error?.error.errorMessage || response.error?.error?.ErrorDescription || "";
        this.state.errorMessage = errorMessage;
      }
      return null;
    } else {
      return null;
    }
    return routingInfo;
  }
  _onCloseAlert(action:any){
    this._loginService.logout();
  }
  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  private confirmEnableBiometric() {
    this.hideSpinner();
    this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
    // const fpxModal = new FpxModal();
    //     fpxModal.setComponent(DepConfirmationComponent);
    //     fpxModal.setDisableClose(false);
    //     fpxModal.setPanelClass("dep-alert-popup");
    //     fpxModal.setBackDropClass(["dep-popup-back-drop", "delete-backdrop"]);
    //     fpxModal.setData({
    //       message: "RetailEnableBiometricForm.title",
    //       okBtnLbl: "RetailEnableBiometricForm.submitBtnLbl",
    //       cancelBtnLbl: "RetailEnableBiometricForm.cancelBtnLbl",
    //       confirmationIcon: "delete"
    //     });
    //     fpxModal.setAfterClosed(this.enableBiometricPopupClose.bind(this));
    //     this.openModal(fpxModal);
  }
  // private enableBiometricPopupClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
  //   console.log("enableBiometricPopupClose: " + JSON.stringify(payload));
  //   if(payload){
  //     this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
  //   } else {
  //     this._oktaAuthService.biometricRegistered$.next(false);
  //   }
  // }
  doDestory() {
    this._appConfig.removeData('isForgotMpin');
  }
}
