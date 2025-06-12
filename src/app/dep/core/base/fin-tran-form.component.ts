import { Directive, Inject, Optional, inject } from "@angular/core";
import { ControlContainer, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonValidatorService } from "@dep/services";
import { BaseFpxComponentState, BaseFpxFormComponent, BaseFpxFormHelper } from "@fpx/core";
import { catchError, combineLatest, firstValueFrom } from "rxjs";

@Directive()
export abstract class FinTranFormComponent extends BaseFpxFormComponent<any, any> {
    private _commonValidatorService:CommonValidatorService = inject(CommonValidatorService);
    constructor(
        _formBuilder: FormBuilder,
        _router: Router,
        @Optional() controlContainer: ControlContainer,
        _helper: any
    ) {
        super(_formBuilder, _router, controlContainer, _helper);
    }

    override doPreInit(){
        this.formToShellNotification$.next({
            action: 'SETFREEZEFORM',
            value: true
        });

        let serviceCode = this.serviceCode.value;
        // let validateChecklist$ = this._commonValidatorService.validateChecklist({
        //     "serviceCode": serviceCode
        // });
        // let validateLimitChecklist$ = this._commonValidatorService.validateChecklist({
        //     "serviceCode": serviceCode
        // }); 

        this._commonValidatorService.validateChecklist({
            "serviceCode": serviceCode
        }).subscribe({
            next: (res) => {
                console.log("RES: ", res);
                this.formToShellNotification$.next({
                    action: 'SETFREEZEFORM',
                    value: false
                });
            },
            error: (reason) => {
                let error = reason.error;
                this.formToShellNotification$.next({
                    action: 'SETFREEZEFORM',
                    value: {
                        title: "Error Message",
                        message: error.ErrorCode + ": " + error.ErrorMessage
                    }
                });
            }
        });
        this.doPreInitAddOn();
    }

    protected doPreInitAddOn() { }
}