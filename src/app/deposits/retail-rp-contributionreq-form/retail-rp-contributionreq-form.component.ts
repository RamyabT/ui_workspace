import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRpContributionreqFormHelper, RetailRpContributionreqFormState } from './retail-rp-contributionreq-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RpcontributionreqService } from '../rpcontributionreq-service/rpcontributionreq.service';
import { Rpcontributionreq } from '../rpcontributionreq-service/rpcontributionreq.model';



@Component({
  selector: 'app-retail-rp-contributionreq-form',
  templateUrl: './retail-rp-contributionreq-form.component.html',
  styleUrls: ['./retail-rp-contributionreq-form.component.scss'],
  providers: [RetailRpContributionreqFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailRpContributionreqFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailRpContributionreqFormComponent)
    }]
})

export class RetailRpContributionreqFormComponent extends BaseFpxFormComponent<RetailRpContributionreqFormHelper, RetailRpContributionreqFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRpContributionreqFormHelper: RetailRpContributionreqFormHelper,
    public rpcontributionreqService: RpcontributionreqService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailRpContributionreqFormHelper);
    this.setServiceCode("RETAILRPCONTRIBUTION");
  }
  protected override doPreInit(): void {
    this.setDataService(this.rpcontributionreqService);
    this.addFormControl('debitAccount', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('creditAccount', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('amount', '', [Validators.required,], [], 'blur', 1, false);
    // this.addFormControl('debitAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
    // this.addFormControl('creditAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
    this.addFormControl('remarks', '', [], [], 'blur', 1, false);
    this.addFormControl('charges', '', [], [], 'blur', 1, false);
    this.setServiceCode("RETAILRPCONTRIBUTION");

  }


  protected override doPostInit(): void {

  }

}

