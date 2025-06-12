import { Inject, Injectable } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppConfigService, LanguageService, UserAuthService } from "@dep/services";
import { BaseFpxComponentState, BaseFpxFormHelper, FpxSubmitHandler, FpxToastService, RoutingInfo } from "@fpx/core";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { NativeStorageManager } from "@dep/native";
import { EnableBiometricService } from "src/app/foundation/enablebiometric-service/enable-biometric.service";

export class EnableBiometricFormState extends BaseFpxComponentState {
    errorMessage: string = '';
    reqRef: string = '';
    enabledBiometric: boolean = false;
    isPopup: boolean = false;
    available: 'finger' | 'face' | 'biometric' = 'face';
    biometricResultMsg: string = '';
}

@Injectable()
export class EnableBiometricFormHelper extends BaseFpxFormHelper<EnableBiometricFormState> {
    constructor(
        private _fpxTostService: FpxToastService,
        private _userAuth: UserAuthService,
        private _enableBiometricService: EnableBiometricService,
        private _fp: FingerprintAIO,
        private _device: DeviceDetectorService,
        private _nativeStorageMgr: NativeStorageManager,
        private _langService: LanguageService,
        private _appConfig: AppConfigService,
        private _activeSpaceInfo: ActiveSpaceInfoService
    ) {
        super(new EnableBiometricFormState());
    }

    override doPreInit() {
        this.setServiceCode("ENABLEBIOMETRIC");
        this.hideShellActions();

        this.state.reqRef = this.getRoutingParam("reqRef");
        this.state.enabledBiometric = this._appConfig.getData('enableBiometric');

        if (this._device.isHybrid()) {
            setTimeout(() => {
                this.enableBiometricSubmit({});
            }, 1000);

            this._fp.isAvailable().then((result: any) => { //'finger' | 'face' | 'biometric'
                if (result == 'biometric' || result == 'finger') result = 'touch';
                this.state.available = result;
            }).catch((err) => {
                console.log({ err });
            });
        };
    }

    enableBiometricSubmit(payload: any) {
        this._fp.show({ description: "Biometric Authentication" }).then((value: any) => {
            // Fingerprint/Face was successfully verified
            this.submitForm(payload);
        }).catch((error: any) => {
            console.error("Fingerprint/Face was not successfully verified: ", error.message);
        });
    }

    submitForm(payload: any) {
        this.showSpinner();
        this._enableBiometricService.registerBiometric(this.preSubmitInterceptor(payload))().subscribe({
            next: (response: any) => {
                this.hideSpinner();
                this.postSubmitInterceptor(response);
            },
            error: (error: any) => {
                this.hideSpinner();
                console.error(error);
            }
        });
    }

    public override preSubmitInterceptor(payload: any): any {
        // WRITE CODE HERE TO HANDLE 
        payload = {
            reqRef: this.state.reqRef,
            username: this._userAuth.username,
            //userId added for workaround as demo env fix
            userId: this._userAuth.userId,
            enabledBiometric: this.state.enabledBiometric,
            manageBiometric: "1"
        }
        return payload;
    }

    public override postSubmitInterceptor(response: any): RoutingInfo {
        console.log(response);
        let routingInfo: RoutingInfo = new RoutingInfo();
        let res = response?.body;

        if (this.state.enabledBiometric) {
            this._nativeStorageMgr.storeData('deviceAuthEnabled', "1");
            this.state.biometricResultMsg = 'SettingsEnableBiometricForm.enabledMessage';
        } else {
            this._nativeStorageMgr.deleteData('deviceAuthEnabled');
            this.state.biometricResultMsg = 'SettingsEnableBiometricForm.disabledMessage';
        }

        routingInfo.setQueryParams({
            response: res,
            serviceCode: this.serviceCode
        });

        return routingInfo;
    }

    doDestory() {
        this._appConfig.removeData('enableBiometric');
    }

    gotoSettings() {
        this._angularRouter.navigate([this._activeSpaceInfo.getActiveSpace()]);
    }

}
