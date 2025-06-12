import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { loadmoneyHelper, loadmoneyState } from './loadmoney.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { LoadmoneyService } from '../loadmoney-service/loadmoney.service';
import { Loadmoney } from '../loadmoney-service/loadmoney.model';



@Component({
  selector: 'app-loadmoney',
  templateUrl: './loadmoney.component.html',
  styleUrls: ['./loadmoney.component.scss'],
  providers: [loadmoneyHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => loadmoneyComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => loadmoneyComponent)
    }]
})

export class loadmoneyComponent extends BaseFpxFormComponent<loadmoneyHelper, loadmoneyState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public loadmoneyHelper: loadmoneyHelper,
    public loadmoneyService: LoadmoneyService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, loadmoneyHelper);
    this.setServiceCode("COBLOADMONEY");
  }
  protected override doPreInit(): void {
    this.setDataService(this.loadmoneyService);
    this.addFormControl('loadMoneyType', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('nameOnCard', '', [], [], 'blur', 1, false);
    this.addFormControl('cardNumber', '', [], [], 'blur', 1, false);
    this.addFormControl('cvv', '', [], [], 'blur', 1, false);
    this.addFormControl('cardexpirymonth', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('cardexpiryyear', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('loadMoneyMethod', '', [], [], 'change', 1, false);
    this.addFormControl('virtualPaymentAddress', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('iSOCodeList', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('mobileNumber', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('amount', '', [Validators.required,], [], 'blur', 1, false);
    this.addElement('mobileNumberGroup');
    this.setServiceCode("COBLOADMONEY");

  }


  protected override doPostInit(): void {

  }

}

