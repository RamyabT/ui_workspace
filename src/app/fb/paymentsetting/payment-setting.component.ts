import { Component, EventEmitter, Input, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { paymentsettingHelper, paymentsettingState } from './payment-setting.helper';
import { BaseFpxFormComponent, HttpProviderService, HttpRequest, ValidatorService } from '@fpx/core';
import { PaymentsettingService } from '../paymentsetting-service/paymentsetting.service';
import { Paymentsetting } from '../paymentsetting-service/paymentsetting.model';



@Component({
  selector: 'app-payment-setting',
  templateUrl: './payment-setting.component.html',
  styleUrls: ['./payment-setting.component.scss'],
  providers: [paymentsettingHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => paymentsettingComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => paymentsettingComponent)
    }]
})

export class paymentsettingComponent extends BaseFpxFormComponent<paymentsettingHelper, paymentsettingState> {
  @Input() selectedData!: any;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public paymentsettingHelper: paymentsettingHelper,
    public paymentsettingService: PaymentsettingService,
    private validatorService: ValidatorService,
    private _httpProvider: HttpProviderService

  ) {
    super(formBuilder, router, controlContainer, paymentsettingHelper);
    // this.setServiceCode("paymentsetting");
  }
  protected override doPreInit(): void {
    this.setDataService(this.paymentsettingService);
    this.addFormControl('scanandPayAllowed', '', [], [], 'change', 1, false);
    this.addFormControl('maxTranLimit', '', [], [], 'blur', 1, false);
    this.addFormControl('dailTranLimit', '', [], [], 'blur', 1, false);
    this.addFormControl('themeCode', '', [], [], 'change', 1, false);
    this.addFormControl('issueCard', '', [], [], 'change', 1, false);
    this.addFormControl('atmlimit', '', [], [], 'blur', 1, false);
    this.addFormControl('contactlesspaymentLimit', '', [], [], 'blur', 1, false);
    this.addFormControl('poslimit', '', [], [], 'blur', 1, false);
    // this.setServiceCode("paymentsetting");

  }


  protected override doPostInit(): void {

  }

}

