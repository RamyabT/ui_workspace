import { ChangeDetectorRef, Inject, Injectable } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { BaseFpxComponentState, BaseFpxFormHelper, RoutingInfo } from "@fpx/core"
import { VerifyTFAData } from "../verifytfa-service/verify-tfa.model";
import { Subject } from "rxjs";
import { VerifyTFAService } from "../verifytfa-service/verify-tfa.service";
import { SelfservicestfaService } from "src/app/prelogin/selfservicestfa-service/selfservicestfa.service";
import { PreloginverifytfaService } from "src/app/prelogin/preloginverifytfa-service/preloginverifytfa.service";
import { AppConfigService, UserAuthService } from "@dep/services";
import { ObVerifyTFAService } from "src/app/onboarding/verifytfa-service/verify-tfa.service";
import { Router } from "@angular/router";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { TranslateService } from "@ngx-translate/core";
import { TestLoginService } from "src/app/login/test-services/test-login.service";
import { ActivityMonitor } from "src/app/dep/services/activity-monitor/activity-monitor.manager";

export class VerifyOtpFormState extends BaseFpxComponentState {
    doStartTimer: Subject<void> = new Subject();
    deliveryDetails: {
        mobileNumber?: string,
        emailId?: string,
        whatsAppNumber?: string
    } = {};
    formErrorMessage: string = "";
    otpServiceRequired: any;
    disableResend: boolean = true;
    expiryInterval: number = -1;
    resendThreshold: number = -1;
    reqRef: string = '';
    inventoryNumber: string = '';
    reqServiceCode: string = '';
    maxTryResend: boolean = false;
}

@Injectable()
export class VerifyOtpFormHelper extends BaseFpxFormHelper<VerifyOtpFormState> {
    private _space: string = '';

    constructor(
        private _dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) private _dialogData: any,
        private _selfservicestfaService: SelfservicestfaService,
        private _appConfig: AppConfigService,
        private _preloginverifytfaService: PreloginverifytfaService,
        private _obVerifyTFAService: ObVerifyTFAService,
        private _verifyTfaService: VerifyTFAService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userAuthService: UserAuthService,
        private _activeSpaceInfoService: ActiveSpaceInfoService,
        private _translateService: TranslateService,
        private _testLoginService: TestLoginService,
        private _activityMonitor: ActivityMonitor,
        private _device: DeviceDetectorService,

    ) {
        super(new VerifyOtpFormState());
    }

    cancelOTP() {
        this._space = this._space == 'staging' ? "prelogin-space" : this._space;
        this._verifyTfaService.cancelOtp({
            "reqRef": this.state.reqRef
        }).subscribe({
            next: (res: any) => {
                let serviceDetails = this._appConfig.getServiceDetails(this._space);
                if (serviceDetails == null || serviceDetails == undefined) {
                    this._angularRouter.navigate([this._space, 'entry-shell', 'foundation', 'otp-cancel-form'], {
                        queryParams: {
                            errorCode: "DEPOTPERROR003",
                            serviceCode: this.state.otpServiceRequired
                        }
                    });
                }
                else {
                    this._angularRouter.navigate([serviceDetails?.servicePath[0], 'entry-shell', 'foundation', 'otp-cancel-form'], {
                        queryParams: {
                            errorCode: "DEPOTPERROR003",
                            serviceCode: this.state.otpServiceRequired
                        }
                    });
                }
            }
        });
    }

    override doPreInit() {
        this.hideShellActions();

        this._space = this._activeSpaceInfoService.getActiveSpace();

        this.state.otpServiceRequired = this._appConfig.getData('otpService');
        if (this.state.otpServiceRequired == 'PRELOGIN') {
            this.setDataService(this._preloginverifytfaService);
            this.setServiceCode("PRELOGINTFA");
        } else if (this.state.otpServiceRequired == 'FORGOTPASSWORD') {
            this.setDataService(this._selfservicestfaService);
            this.setServiceCode("RETAILFORGOTPASSWORD");
        } else if (this.state.otpServiceRequired == 'FORGOTUSERNAME') {
            this.setServiceCode("RETAILFORGOTUSERNAME");
            this.setDataService(this._selfservicestfaService);
        } else if (this.state.otpServiceRequired == 'UNLOCKUSER') {
            this.setServiceCode("RETAILUNLOCKUSER");
            this.setDataService(this._selfservicestfaService);
        } else if (this.state.otpServiceRequired == 'SELFREG' && this.getRoutingParam('serviceCode') == 'RETAILMIGRATEDUSER') {
            this.setServiceCode("RETAILMIGRATEDUSER");
            this.setDataService(this._obVerifyTFAService);
        } else if (this.state.otpServiceRequired == 'SELFREG') {
            this.setServiceCode("RETAILSELFREG");
            this.setDataService(this._obVerifyTFAService);
        } else if (this.state.otpServiceRequired == 'RETAILNPSSLOGIN') {
            this.setServiceCode("RETAILNPSSLOGIN");
            this.setDataService(this._preloginverifytfaService);
        } else {
            this.setServiceCode("VERIFYTFA");
        }

        if (this._dialogData?.reqRef) {
            this._dialogData.title = "OTP Verification";
            this.state.reqRef = this._dialogData.reqRef;
            this.state.inventoryNumber = this._dialogData.inventoryNumber;
            this.state.reqServiceCode = this._dialogData.serviceCode;
        } else {
            this.state.reqRef = this.getRoutingParam('reqRef');
            this.state.inventoryNumber = this.getRoutingParam('inventoryNumber');
            this.state.reqServiceCode = this.getRoutingParam('serviceCode');
        }

        this._verifyTfaService.fetchDeliveryDetails({
            reqRef: this.state.reqRef,
            serviceCode: this.state.reqServiceCode,
            applicantId: this._appConfig.getData('applicantId')
        }).subscribe({
            next: (response) => {
                if (response?.body) {
                    this.state.deliveryDetails = response.body;
                    this.state.expiryInterval = Number(response.body.expiryInterval);
                    this.state.resendThreshold = ((this.state.expiryInterval)) * 1000;
                    this._changeDetectorRef.detectChanges();
                    this.state.doStartTimer.next();
                    setTimeout(() => {
                        this.state.disableResend = false;
                    }, this.state.resendThreshold);
                }
            },
            error: (reason) => {
                console.error("Fetch delivery details error!", reason);
            }
        });
    }

    override doPostInit() {
        this.setFocus('otp');
    }

    override doDestroy() {
        this._appConfig.removeData('otpService');
        if (this._dialogData) this._dialogData = undefined;
    }

    onTimeout() {
        if (this.state.maxTryResend == true) {
            this._angularRouter.navigate([this._space, 'entry-shell', 'foundation', 'otp-cancel-form'], {
                queryParams: {
                    errorCode: "DEPOTPERROR005"
                }
            });
        }
        else {
            this.state.disableResend = false;
            this.formGroup.get("otp")?.reset();
            this.state.formErrorMessage = 'verifyTfa.otpExpired';
        }
    }

    resendOTP() {
        this.state.formErrorMessage = '';
        let reqRefData = this.state.reqRef;
        if (this.state.reqServiceCode == "RETAILSELFREG" || this.state.reqServiceCode == "RETAILMIGRATEDUSER") {
            reqRefData = reqRefData + "-" + this.state.reqRef;
        }
        else {
            reqRefData = this.state.reqRef;
        }
        let payload: any = {
            reqRef: reqRefData,
            serviceCode: this.state.reqServiceCode,
            // applicantId: this._appConfig.getData('applicantId')
        };
        this._verifyTfaService.resendTfa(payload).subscribe({
            next: (res) => {
                console.log(res);
                if (res.body?.maxResendCount == res.body.resendCount) {
                    this.state.maxTryResend = true;
                }
                if (res.body.status == '1') {
                    this.state.doStartTimer.next();
                    setTimeout(() => {
                        this.state.disableResend = false;
                    }, this.state.resendThreshold);
                }
                if (!this._device.isMobile()) {
                    if (res.body.resendCount == '1') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError1')
                    }
                    else if (res.body.resendCount == '2') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError2')
                    }
                }
                else {
                    if (res.body.resendCount == '1') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError11')
                    }
                    else if (res.body.resendCount == '2') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError12')
                    }
                }
                this.state.disableResend = true;
                this.setDisabled('otp', false);
            },
            error: (reason: any) => {
                console.log("error");
                if (reason?.error?.errorCode == "DEPOTPERROR005") {
                    let serviceDetails = this._appConfig.getServiceDetails(this._space);
                    if (serviceDetails == null || serviceDetails == undefined) {
                        this._angularRouter.navigate([this._space, 'entry-shell', 'foundation', 'otp-cancel-form'], {
                            queryParams: {
                                errorCode: "DEPOTPERROR005"
                            }
                        });
                    }
                    else {
                        this._angularRouter.navigate([serviceDetails.servicePath[0], 'entry-shell', 'foundation', 'otp-cancel-form'], {
                            queryParams: {
                                errorCode: "DEPOTPERROR005"
                            }
                        });
                    }
                } else {
                    this.state.formErrorMessage = reason?.error?.errorDescription;
                }
            }
        });
    }
    public override preSubmitInterceptor(payload: VerifyTFAData): any {
        // WRITE CODE HERE TO HANDLE 
        this.state.formErrorMessage = "";
        payload.reqRef = this.state.reqRef;
        payload.inventoryNumber = this.state.inventoryNumber;
        payload.serviceCode = this.state.reqServiceCode;
        return payload;
    }

    public override postSubmitInterceptor(response: any): RoutingInfo {
        let routingInfo: RoutingInfo = new RoutingInfo();
        if (response.success) {
            let res: any;

            if (this.state.otpServiceRequired == 'PRELOGIN') {
                res = response.success?.body?.preloginverifytfa;
            } else if (this.state.otpServiceRequired == 'FORGOTPASSWORD') {
                res = response.success?.body?.selfservicestfa;
            } else if (this.state.otpServiceRequired == 'FORGOTUSERNAME') {
                res = response.success?.body?.selfservicestfa;
            } else if (this.state.otpServiceRequired == 'UNLOCKUSER') {
                res = response.success?.body?.selfservicestfa;
            } else if (this.state.otpServiceRequired == 'SELFREG') {
                res = response.success?.body?.obverifytfa;
            }
            else if (this.state.otpServiceRequired == 'RETAILNPSSLOGIN') {
                res = response.success?.body?.preloginverifytfa;
            } else {
                res = response.success?.body?.verifytfa;
            }

            if(res?.reqRef == this.state.reqRef){
                if (res?.authToken) {
                    this._testLoginService.onAuthTokenReceived(res);
                }
    
                if (res?.ticket) this._appConfig.setData('ticket', res?.ticket);
                if (res?.reqRef) this._appConfig.setData('reqRef', res?.reqRef);
    
                routingInfo.setQueryParams({
                    response: res,
                    transRef: res?.processId,
                    status: "success",
                });
    
                if (this._dialogData?.reqRef) {
                    this._dialogRef.close({
                        processId: res?.processId
                    });
                }
            } else {
                this._angularRouter.navigate(['prelogin-space','display-shell','http-status','unauthorized']);
            }

        }
        else if (response?.error?.error?.ErrorCode == "DEPOTPERROR002") {
            let serviceDetails = this._appConfig.getServiceDetails(this._space);
            if (serviceDetails == null || serviceDetails == undefined) {
                setTimeout(() => {
                    this._angularRouter.navigate([this._space, 'entry-shell', 'foundation', 'otp-cancel-form'], {
                        queryParams: {
                            errorCode: response?.error?.error?.ErrorCode,
                        }
                    });
                }, 500);
            }
            else {
                setTimeout(() => {
                    this._angularRouter.navigate([serviceDetails?.servicePath[0], 'entry-shell', 'foundation', 'otp-cancel-form'], {
                        queryParams: {
                            errorCode: response?.error?.error?.ErrorCode,
                        }
                    });
                }, 500);
            }
        }
        else {
            if (this.state.otpServiceRequired == 'RETAILNPSSLOGIN') {
                routingInfo.setNavigationURL('prelogin-space/entry-shell/login/npss-failure-form')
                let navigationUrl = this._appConfig.getData('NPSSLoginRequest');
                routingInfo.setQueryParams({
                    navigationUrl: navigationUrl
                });
                return routingInfo;
            }
            else {
                let error = response?.error.error;
                if (!this._device.isMobile()) {
                    if (response.error.error.retryCount == '1') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError1')
                    }
                    else if (response.error.error.retryCount == '2') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError2')
                    }
                    // else{
                    //     this.state.formErrorMessage = 'verifyTfa.' + error.ErrorCode;
                    // }
                }
                else {
                    if (response.error.error.retryCount == '1') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError11')
                    }
                    else if (response.error.error.retryCount == '2') {
                        this.state.formErrorMessage = this._translateService.instant('verifyTfa.otpError12')
                    }
                    // else{
                    //     this.state.formErrorMessage = 'verifyTfa.' + error.ErrorCode;
                    // }
                }
                // this.state.formErrorMessage = 'verifyTfa.' + error.ErrorCode;
                this.reset('otp', "");
            }
        }

        return routingInfo;
    }
}
