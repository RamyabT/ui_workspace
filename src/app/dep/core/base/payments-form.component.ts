import { Directive, inject, Optional } from "@angular/core";
import { FormBuilder, ControlContainer } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfigService, CommonValidatorService } from "@dep/services";
import { BaseFpxFormComponent } from "@fpx/core";

@Directive()
export abstract class PaymentsFormComponent extends BaseFpxFormComponent<any, any> {
    private _commonValidatorService: CommonValidatorService = inject(CommonValidatorService);
    private _appConfig: AppConfigService = inject(AppConfigService);
    public validateError: any

    constructor(
        _formBuilder: FormBuilder,
        _router: Router,
        @Optional() controlContainer: ControlContainer,
        _helper: any,

    ) {
        super(_formBuilder, _router, controlContainer, _helper);
    }

    override doPreInit() {
        this.formToShellNotification$.next({
            action: 'SETFREEZEFORM',
            value: true
        });

        let serviceCode = this.serviceCode.value;

        this._commonValidatorService.validateChecklist({
            "serviceCode": serviceCode
        }).subscribe({
            next: (res) => {
                this.formToShellNotification$.next({
                    action: 'SETFREEZEFORM',
                    value: false
                });
            },
            error: (reason) => {
                let error = reason.error;
                this._appConfig.setData("iserror", reason.error.ErrorCode);
                this._appConfig.setData("nextPaymentDate", reason.error.nextPaymentDate);
                // this.validateError=reason.error.ErroCode
                if ( (this.serviceCode.value == 'RETAILSCHDOM' || this.serviceCode.value =='RETAILSCHSWIFT' || this.serviceCode.value =='RETAILSCHCC' || this.serviceCode.value =='RETAILSCHCC' || this.serviceCode.value =='RETAILSCHOAT' || this.serviceCode.value =='RETAILSCHINTBT')) {
                    this.formToShellNotification$.next({
                        action: 'SETFREEZEFORM',
                        value: false
                    });
                }
                else if ((reason.error.ErrorCode == 'DEPERR90001' || reason.error.ErrorCode == 'DEPERR900016' || reason.error.ErrorCode == 'DEPERR90002') && (this.serviceCode.value == 'RETAILTRANDOMESTIC' || this.serviceCode.value =='RETAILTRANSWIFT' || this.serviceCode.value =='RETAILTRANCC')) {
                    this.formToShellNotification$.next({
                        action: 'SETFREEZEFORM',
                        value: false
                    });
                }
                else{
                    if(reason.error.ErrorCode =='DEPERR900016' && (this.serviceCode.value == 'RETAILTRANOAT' || this.serviceCode.value =='RETAILTRANINTBT' || this.serviceCode.value =='RETAILTRANINSTA') ){
                        this.formToShellNotification$.next({
                            action: 'SETFREEZEFORM',
                            value: false
                        });
                    }
                    else{
                    this.formToShellNotification$.next({
                        action: 'SETFREEZEFORM',
                        value: {
                            title: "Error Message",
                            message: error.ErrorMessage
                        }
                    });
                }
                }
            }
        });
        this.doPreInitAddOn();
    }

    protected doPreInitAddOn() { }
}