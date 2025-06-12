import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailApplyCreditCardHelper, RetailApplyCreditCardState } from './retail-apply-credit-card.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ApplyCreditCardService } from '../applyCreditCard-service/applyCreditCard.service';
import { ApplyCreditCard } from '../applyCreditCard-service/applyCreditCard.model';



@Component({
  selector: 'app-retail-apply-credit-card',
  templateUrl: './retail-apply-credit-card.component.html',
  styleUrls: ['./retail-apply-credit-card.component.scss'],
  providers: [RetailApplyCreditCardHelper]
})

export class RetailApplyCreditCardComponent extends BaseFpxFormComponent<RetailApplyCreditCardHelper, RetailApplyCreditCardState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailApplyCreditCardHelper: RetailApplyCreditCardHelper,
    public applyCreditCardService: ApplyCreditCardService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailApplyCreditCardHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',1,true,0);
    this.addFormControl('accountNumber', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('creditcardtype', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('deliveryOption', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('creditCardLimit', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('supplementaryCard', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('sourceOfIncome', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('income', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('lengthOfService', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('monthlyLiabilityRepayment', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    //this.addFormControl('charges', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('reason', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('branches', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addElement('addressInfo');
    this.addFormControl('addressInformation','',[] ,[],'blur',1,false,0); 
    this.setDataService(this.applyCreditCardService);
    this.setServiceCode("RETAILAPPLYCREDITCARD");

  }


  protected override doPostInit(): void {

  }

}
