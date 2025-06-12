import { ChangeDetectorRef, Inject, Injectable } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { BaseFpxComponentState, BaseFpxFormHelper, RoutingInfo } from "@fpx/core"
import { VerifyTFAData } from "../verifytfa-service/verify-tfa.model";
import { Subject } from "rxjs";
import { ObVerifyTFAService } from "../verifytfa-service/verify-tfa.service";
import { AppConfigService, CustomCurrAmountService, UserAuthService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { ActivatedRoute } from "@angular/router";

export class VerifyOtpFormState extends BaseFpxComponentState {
    doStartTimer: Subject<void> = new Subject();
    deliveryDetails: {
        mobileNumber?: string,
        emailId?: string,
        whatsAppNumber?: string
    } = {};
    formErrorMessage: string = "";
    disableResend: boolean = true;
    expiryInterval: number = -1;
    resendThreshold: number = -1;
    reqRef: string = '';
    applicantId: string='';
    reqServiceCode: string = '';
}

@Injectable()
export class VerifyOtpFormHelper extends BaseFpxFormHelper<VerifyOtpFormState>{
    constructor(
        private _dialogRef: MatDialogRef<any>, 
        @Inject(MAT_DIALOG_DATA) private _dialogData : any,
        private _verifyTfaService: ObVerifyTFAService,
        private _userAuthService: UserAuthService,
        public _deviceDetectorService: DeviceDetectorService,
        private _appConfig: AppConfigService,
        private _changeDetectorRef:ChangeDetectorRef,
        private route: ActivatedRoute) {
        super(new VerifyOtpFormState());
        // route.queryParams.subscribe((params: any) => {
        //     if(this.getRoutingParam('reqRef')){
        //         this.handleFormOnLoad();
        //     }
        // });
    }
    handleFormOnLoad() {
        this.formGroup?.reset();
        let _serviceCode:string = this.getRoutingParam('serviceCode') || "CASAONBOARDING";

        if (this._dialogData?.reqRef) {
            this.setValue('reqRef', this._dialogData.reqRef);
            this.setValue('serviceCode', this._dialogData.serviceCode);
        } else {
            this.setValue('reqRef', this.getRoutingParam('reqRef'));
            this.setValue('serviceCode', _serviceCode);
        }

        this.state.reqServiceCode = _serviceCode;

        let _processResponse = this._appConfig.getData('processResponse');
        let applicantId = this._appConfig.getData('applicantId') || _processResponse?.requestPayload?.applicantId;
        console.log("_processResponse::::", _processResponse);

        this._verifyTfaService.fetchDeliveryDetails({
            processId: this.getValue('reqRef'),
            applicantId: applicantId
        }).subscribe({
            next: (response) => {
                console.log("Fetch delivery details: ", response);
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

    override doPreInit() {
        this.setServiceCode("OBVERIFYTFA");
        this.state.reqRef = this.getRoutingParam('reqRef');
    }

    override doPostInit() {
        this.handleFormOnLoad();
    }
 
    onTimeout() {
        this.state.disableResend = false;
        this.formGroup.get("otp")?.reset();
        this.state.formErrorMessage = 'OTP expired. Kindly click on the '+'Resend code'+ 'to generate a new OTP';
        this.setDisabled('otp', true);
    }

    resendOTP() {
        this.state.formErrorMessage = '';
        let reqRef =this.state.reqRef;
        reqRef = reqRef + "-" + this._appConfig.getData('applicantId');
        let payload: any = {
            reqRef: reqRef,
            serviceCode:this.state.reqServiceCode,
            applicantId: this._appConfig.getData('applicantId')
        };
        this._verifyTfaService.resendTfa(payload).subscribe({
            next:(res)=>{
                console.log(res);
                if(res.body.status == '1'){
                    this.state.doStartTimer.next();
                    setTimeout(() => {
                        this.state.disableResend = false;
                    }, this.state.resendThreshold);
                    
                }
                this.state.disableResend = true;
                this.setDisabled('otp', false);
            },
            error: (error:any) => {
                console.log("error");
                this.state.formErrorMessage = error.error.errorDescription;
            }
        })
    }

    cancelOTP(){
        this._verifyTfaService.cancelOtp({
            "reqRef": this.state.reqRef
        }).subscribe({
            next: (res:any) => {
                this._angularRouter.navigate(['welcome', 'entry-shell', 'foundation', 'otp-cancel-form'], {
                    queryParams: {
                        errorCode: "DEPOTPERROR003"
                    }
                });
            }
        });
    }

    public override preSubmitInterceptor(payload: VerifyTFAData): any {
        // WRITE CODE HERE TO HANDLE 
        this.state.formErrorMessage = "";
        payload.reqRef = this.state.reqRef;
        payload.serviceCode = this.state.reqServiceCode;
        return payload;
    }

    public override postSubmitInterceptor(response: any): RoutingInfo {
        let routingInfo: RoutingInfo = new RoutingInfo();
        if (response.success) {
            // this._customCurrAmountService.fetchCurrency();
            let res = response.success?.body?.obverifytfa;

            routingInfo.setQueryParams({
                response: res,
                transRef: res?.processId,
                status: "success",
            });

            // if (res?.auth) this._userAuthService.setUserDetails(res.auth);
            if (res?.authToken) this._userAuthService.setUserDetails(res);

        } else {
            let error = response?.error.error;
            this.state.formErrorMessage = error.ErrorCode + ": " + error.ErrorMessage;
            this.reset('otp');
            routingInfo.setQueryParams({ 
                response: response.error.error,
                status: "failed" });
        }
        return routingInfo;
    }
}
