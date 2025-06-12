import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterCardStatementHelper, RegisterCardStatementState } from './retail-register-card-statement-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RegistercardstatementService } from '../registercardstatement-service/registercardstatement.service';


@Component({
  selector: 'app-retail-register-card-statement-form',
  templateUrl: './retail-register-card-statement-form.component.html',
  styleUrls: ['./retail-register-card-statement-form.component.scss'],
  providers: [RegisterCardStatementHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RegisterCardStatementComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RegisterCardStatementComponent)
    }]
})

export class RegisterCardStatementComponent extends BaseFpxFormComponent<RegisterCardStatementHelper, RegisterCardStatementState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public registerCardStatementHelper: RegisterCardStatementHelper,
    public registercardstatementService: RegistercardstatementService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, registerCardStatementHelper);
    this.setServiceCode("RETAILVISACARDSTMTREQ");
  }
  protected override doPreInit(): void {
    this.setDataService(this.registercardstatementService);
    this.addFormControl('emailId', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('action', '', [Validators.required,], [], 'change', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'change', 1, false, 0);
    this.setServiceCode("RETAILVISACARDSTMTREQ");

  }


  protected override doPostInit(): void {

  }

}

