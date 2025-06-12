import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanClosureFormHelper, RetailLoanClosureFormState } from './retail-loan-closure-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { LoanclosureService } from '../../loans/loanclosure-service/loanclosure.service';



@Component({
  selector: 'app-retail-loan-closure-form',
  templateUrl: './retail-loan-closure-form.component.html',
  styleUrls: ['./retail-loan-closure-form.component.scss'],
  providers: [RetailLoanClosureFormHelper]
})

export class RetailLoanClosureFormComponent extends BaseFpxFormComponent<RetailLoanClosureFormHelper, RetailLoanClosureFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanClosureFormHelper: RetailLoanClosureFormHelper,
    public loanclosureService: LoanclosureService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailLoanClosureFormHelper);
  }
  protected readonly remarks_minlength: any = 1;
  protected readonly remarks_maxlength: any = 150;
  protected override doPreInit(): void {
    this.addFormControl('loanAccountNumber', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('debitAccount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('closureDate', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [ Validators.required,Validators.minLength(this.remarks_minlength),Validators.maxLength(this.remarks_maxlength)], [], 'blur', 1, false, 0);
    // this.addFormControl('exchangeRate', '', [], [], 'blur', 1, false, 0);
    // this.addFormControl('baseRate', '', [], [], 'blur', 1, false, 0);
    // this.addFormControl('amount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addElement('exchangeDetails');
    this.addElement('infoNote');
    this.addElement('loanDetails');
    this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);			   		 
    this.setDataService(this.loanclosureService);
    this.setServiceCode("RETAILLOANCLOSURE");

  }


  protected override doPostInit(): void {

  }

}
