import { Inject, Injectable } from '@angular/core';
import { AppConfigService, CustomCurrAmountService, UserAuthService } from '@dep/services';

import {
    BaseFpxChangeHandler,
    BaseFpxComponentState,
    BaseFpxFormHelper,
    FpxSubmitHandler,
    FpxToastService,
} from '@fpx/core';
import { BaseFpxPostSubmitInterceptor, SpinnerService, RoutingInfo } from '@fpx/core';
import { Router } from '@angular/router';
import { NativeStorageManager } from '@dep/native';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { ActiveSpaceInfoService } from '@dep/core';

export class ManageBiometricFormState extends BaseFpxComponentState {
    errorMessage: string = '';
    deviceAuthEnabled: boolean = false;
}

@Injectable()
export class ManageBiometricFormHelper extends BaseFpxFormHelper<ManageBiometricFormState> {
    constructor(
        private _userAuth: UserAuthService,
        private _router: Router,
        private _nativeStorageMgr: NativeStorageManager,
        private _fp: FingerprintAIO,
        private _activeSpaceInfo: ActiveSpaceInfoService,
        private _fpxTostService: FpxToastService,
        private _appConfig: AppConfigService
    ) {
        super(new ManageBiometricFormState());
    }

    override doPreInit() {
        this.setServiceCode("MANAGEBIOMETRIC");
        this.hideShellActions();
        this.showSpinner();
        this._nativeStorageMgr.loadData('deviceAuthEnabled').then(
            (value: any) => {
                if (value == "1") {
                    this.state.deviceAuthEnabled = true;
                }
            })
            .finally(() => {
                this.hideSpinner();
            });
    }

    override doPostInit() {
        // this.addSubmitHandler('submit', this.enableBiometric);
    }

    cancelEvent() {
        this._angularRouter.navigate([this._activeSpaceInfo.getActiveSpace()]);
    }

    enableBiometric: FpxSubmitHandler = (payload: any) => {
        if (this.state.deviceAuthEnabled) {
            this._nativeStorageMgr.deleteData('deviceAuthEnabled');
            this.state.deviceAuthEnabled = false;
            this._fpxTostService.showSuccessAlert('RetailManageBiometricForm.disabledBiometricSuccess.title', 'RetailManageBiometricForm.disabledBiometricSuccess.message');
            this._angularRouter.navigate([this._activeSpaceInfo.getActiveSpace()]);
        } else {
            this._fp.show({ description: "Authenticate" })
                .then((value: any) => {
                    // Fingerprint/Face was successfully verified
                    console.log(value);
                    if (value) {
                        this._nativeStorageMgr.storeData('deviceAuthEnabled', "1");
                        this.state.deviceAuthEnabled = true;
                        this._fpxTostService.showSuccessAlert('RetailManageBiometricForm.enabledBiometricSuccess.title', 'RetailManageBiometricForm.enabledBiometricSuccess.message');
                        this._angularRouter.navigate([this._activeSpaceInfo.getActiveSpace()]);
                    }
                }).catch((error: any) => {
                    // Fingerprint/Face was not successfully verified
                    console.log(error.message);
                    this._angularRouter.navigate([this._activeSpaceInfo.getActiveSpace()]);
                });
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

    public override preSubmitInterceptor(payload: any): any {
        // WRITE CODE HERE TO HANDLE 
        if (this.state.deviceAuthEnabled) {
            payload.enabledBiometric = "0";
        } else {
            payload.enabledBiometric = "1";
        }
        return payload;
    }

    public override postSubmitInterceptor(response: any): RoutingInfo {
        console.log(response);
        let routingInfo: RoutingInfo = new RoutingInfo();
        if (response.success) {
            let enabledBiometric:boolean = false;
            if (this.state.deviceAuthEnabled) {
                enabledBiometric = false;
            } else {
                enabledBiometric = true;
            }
            this._appConfig.setData('enableBiometric', enabledBiometric);

            let res: any = response.success?.body?.enablebiometric;
            routingInfo.setQueryParams({
                response: res,
            });
        }
        else if (response.error) {
            let error: any = response.error.error;
            routingInfo.setQueryParams({
                response: error
            });
        }

        return routingInfo;
    }

}
