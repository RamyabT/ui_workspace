


import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { WallethistroyService } from 'src/app/wallet/trans-history-service/wallethistroy.service';
import { EditLoanInfoFormHelper, EditLoanInfoFormState } from './edit-loan-info-form.helper';




@Component({
  selector: 'app-edit-loan-info-form',
  templateUrl: './edit-loan-info-form.component.html',
  styleUrls: ['./edit-loan-info-form.component.scss'],
  providers: [EditLoanInfoFormHelper]
})

export class EditLoanInfoFormFormComponent extends BaseFpxFormComponent<EditLoanInfoFormHelper, EditLoanInfoFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public editLoanInfoFormHelper: EditLoanInfoFormHelper,
    public WallethistroyService: WallethistroyService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, editLoanInfoFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('propCost', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('downPayment', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('tenor', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('loanAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('vehicleCost', '', [], [], 'blur', 1, false, 0);
    this.setDataService(this.WallethistroyService);
    this.setServiceCode("completedpymnts");

  }


  protected override doPostInit(): void {

  }

}
