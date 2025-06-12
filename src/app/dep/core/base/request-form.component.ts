import { Directive, inject, Optional } from "@angular/core";
import { FormBuilder, ControlContainer } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonValidatorService } from "@dep/services";
import { BaseFpxFormComponent } from "@fpx/core";

@Directive()
export abstract class RequestFormComponent extends BaseFpxFormComponent<any, any> {
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
                        message: error.ErrorMessage
                    }
                });
            }
        });
        this.doPreInitAddOn();
    }

    protected doPreInitAddOn() { }
}