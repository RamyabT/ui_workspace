import { Inject, Injectable } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LanguageService } from "@dep/services";
import { BaseFpxComponentState, BaseFpxFormHelper, FpxSubmitHandler, FpxToastService, RoutingInfo } from "@fpx/core";
import { EnableBiometricService } from "../enablebiometric-service/enable-biometric.service";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx";
import { DeviceDetectorService } from "@dep/core";
import { NativeStorageManager } from "@dep/native";
import { OktaAuthService } from "src/app/okta-integration/okta/okta-auth.service";

export class EnableBiometricFormState extends BaseFpxComponentState {
  errorMessage: string = '';
  reqRef: string = '';
  enabledBiometric: boolean = false;
  isPopup: boolean = false;
  available: 'finger' | 'face' | 'biometric' = 'face';
}

@Injectable()
export class EnableBiometricFormHelper extends BaseFpxFormHelper<EnableBiometricFormState> {
  private availableOption: any;
  constructor(
    private _fpxTostService:FpxToastService,
    private _router: Router,
    // private _userAuth: UserAuthService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _enableBiometricService: EnableBiometricService,
    private _fp: FingerprintAIO,
    private _device: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager,
    private _langService: LanguageService,
    private _oktaAuthService: OktaAuthService
  ) {
    super(new EnableBiometricFormState());
  }

  override doPreInit() {
    this.setServiceCode("ENABLEBIOMETRIC");
    this.hideShellActions();
    if (this._dialogData?.reqRef) {
      this._dialogData.title = "RetailEnableBiometricForm.title";
      this.state.isPopup = true;
      this.state.reqRef = this._dialogData.reqRef;
    }

    if (this._device.isHybrid()) {
      this._fp.isAvailable()
        .then((result: any) => { //'finger' | 'face' | 'biometric'
          this.availableOption=result;
          if(result == 'finger') result = 'touch';
          else if (result == 'biometric') result = 'face';
          this.state.available = result;
          this.enableBiometric();
          this.enableBiometricSubmit({});
        }).catch((err) => {
          console.log({ err });
          this.cancelEvent();
          // let ttl = this._langService.getLabel('RetailEnableBiometricForm.successTitle');
          // let msg = this._langService.getLabel('RetailEnableBiometricForm.noSupport');
          // this._fpxTostService.showSuccessAlert(ttl, msg, {duration: 500});
          this.enableBiometricSubmit({});
        });
    };
  }

  override doPostInit() {
    // this.addSubmitHandler('submit', this.enableBiometricSubmit);
    // this.addSubmitHandler('reset', this.enableBiometricSubmit)
    // this.addSubmitHandler('cancel', this.enableBiometricSubmit)
  }

  cancelEvent() {
    this.state.enabledBiometric = false;
  }

  enableBiometric() {
    this.state.enabledBiometric = true;
  }

  enableBiometricSubmit: FpxSubmitHandler = (payload: any) => {
    if(this.state.enabledBiometric){
      let title='',description='';
      if(this.availableOption=='face'){
          title='Do you want to allow "Vancity" to use Face ID?'
          description="Enabling Face ID allows you to quickly and securely access your account."
      }
      else if(this.availableOption=='biometric'){
        title='Do you want to allow "Vancity" to use biometric?'
        description="Enabling biometric allows you to quickly and securely access your account."
      }
      else{
        title='Do you want to allow "Vancity" to use Touch ID?'
        description="Enabling Touch ID allows you to quickly and securely access your account."
      }
      this._fp.show({title:title,description: description, disableBackup: true, confirmationRequired: false})
      .then((value: any) => {
        // Fingerprint/Face was successfully verified
        this.state.enabledBiometric = value;
        this.submitForm(payload);
      }).catch((error: any) => {
        this.state.enabledBiometric = false;
        this.submitForm(payload);
        console.error("Fingerprint/Face was not successfully verified: ", error.message);
      });
    } else {
      this.state.enabledBiometric = false;
      this.submitForm(payload);
    }

    return {
      success: (response: any) => {
        console.log('submit handler success');
      },
      error: (error: any) => {
        console.log("error");
      }
    }
  }

  submitForm(payload:any){
    if(this.state.enabledBiometric){
      this._nativeStorageMgr.storeData('deviceAuthEnabled', "1");
      let ttl = this._langService.getLabel('RetailEnableBiometricForm.successTitle');
      let msg = this._langService.getLabel('RetailEnableBiometricForm.successMessage');
      this._fpxTostService.showSuccessAlert(ttl, msg, {duration: 500});
      // this._oktaAuthService.biometricRegistered$.next(true);
      this._oktaAuthService.storeMemberProfile();
      this._oktaAuthService.goto();
    } else {
      this._nativeStorageMgr.storeData('deviceAuthEnabled', "0");
      this._oktaAuthService.storeMemberProfile();
      this._oktaAuthService.goto();
      // this._oktaAuthService.biometricRegistered$.next(false);
    }
    
    // this.showSpinner();
    // this._enableBiometricService.registerBiometric(this.preSubmitInterceptor(payload))().subscribe({
    //   next: (response:any) => {
    //     this.hideSpinner();
    //     this.postSubmitInterceptor(response);
    //   },
    //   error: (error:any) =>{
    //     this.hideSpinner();
    //     console.error(error);
    //   }
    // });
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    return {
      // reqRef: this.state.reqRef,
      // username: this._userAuth.username,
      // enabledBiometric: this.state.enabledBiometric
    };
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    let res = response?.body;
    
    // if(this.state.enabledBiometric){
    //   this._nativeStorageMgr.storeData('deviceAuthEnabled', "1");
    //   let ttl = this._langService.getLabel('RetailEnableBiometricForm.successTitle');
    //   let msg = this._langService.getLabel('RetailEnableBiometricForm.successMessage');
    //   this._fpxTostService.showSuccessAlert(ttl, msg, {duration: 500});
    // }

    if (this.state.isPopup) {
      this._dialogRef.close({
        processId: res?.processId
      });
    } else {
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    }

    return routingInfo;
  }

}
