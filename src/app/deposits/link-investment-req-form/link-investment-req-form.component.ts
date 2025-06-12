import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkInvestmentReqFormHelper, LinkInvestmentReqFormState } from './link-investment-req-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { LinkinvestmentreqService } from '../linkinvestmentreq-service/linkinvestmentreq.service';
import { Linkinvestmentreq } from '../linkinvestmentreq-service/linkinvestmentreq.model';



@Component({
  selector: 'app-link-investment-req-form',
  templateUrl: './link-investment-req-form.component.html',
  styleUrls: ['./link-investment-req-form.component.scss'],
  providers: [LinkInvestmentReqFormHelper,LinkinvestmentreqService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => LinkInvestmentReqFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => LinkInvestmentReqFormComponent)
    }]
})

export class LinkInvestmentReqFormComponent extends BaseFpxFormComponent<LinkInvestmentReqFormHelper, LinkInvestmentReqFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public linkInvestmentReqFormHelper: LinkInvestmentReqFormHelper,
    public linkinvestmentreqService: LinkinvestmentreqService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, linkInvestmentReqFormHelper);
    this.setServiceCode("RETAILLINKINVESTMENT");
  }
  protected override doPreInit(): void {
    this.setDataService(this.linkinvestmentreqService);
    // this.addFormControl('customerCode', '', [], [], 'blur', 1, false);
    this.addFormControl('clientNumber', '', [Validators.required],[], 'blur', 0, false);
    this.addFormControl('linkAccount', '', [Validators.required],[], 'blur', 0, false);
    this.addFormControl('lastName', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('postalCode', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('dob', '', [Validators.required], [], 'blur', 1, false);
    this.setDataService(this.linkinvestmentreqService);
    this.setServiceCode("RETAILLINKINVESTMENT");

  }


  protected override doPostInit(): void {

  }

}

