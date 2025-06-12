import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailVisaEStatementReqFormHelper, RetailVisaEStatementReqFormState } from './retail-visa-estatement-req-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { CreditcardStatementService } from '../creditcardStatement-service/creditcardStatement.service';

@Component({
  selector: 'app-retail-visa-estatement-req-form',
  templateUrl: './retail-visa-estatement-req-form.component.html',
  styleUrls: ['./retail-visa-estatement-req-form.component.scss'],
  providers: [RetailVisaEStatementReqFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailVisaEStatementReqFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailVisaEStatementReqFormComponent)
    }]
})

export class RetailVisaEStatementReqFormComponent extends BaseFpxFormComponent<RetailVisaEStatementReqFormHelper, RetailVisaEStatementReqFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailVisaEStatementReqFormHelper: RetailVisaEStatementReqFormHelper,
    public creditcardStatementService: CreditcardStatementService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailVisaEStatementReqFormHelper);
    this.setServiceCode("RETAILCCSTATEMENT");
  }
  protected override doPreInit(): void {
    this.addElement('RetailVisaEstatementGrid');

    this.setDataService(this.creditcardStatementService);
    this.addFormControl('cardRefNumber', '', [Validators.required,],
      [], 'blur', 0, false);
    this.addFormControl('year', '', [Validators.required,], [], 'blur', 1, false);

    this.setServiceCode("RETAILCCSTATEMENT");

  }


  protected override doPostInit(): void {

  }

}

