import { ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, inject, Optional } from '@angular/core';
import { Component } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxGridComponent } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { gsap } from "gsap";
import { RetailMultiBillRequestReviewGridHelper, RetailMultiBillRequestReviewGridState } from './retail-multi-bill-request-review-grid.helper';

declare let $: any;

@Component({
  selector: 'app-retail-multi-bill-request-review-grid',
  templateUrl: './retail-multi-bill-request-review-grid.component.html',
  styleUrls: ['./retail-multi-bill-request-review-grid.component.scss'],
  providers: [RetailMultiBillRequestReviewGridHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RetailMultiBillRequestReviewGridComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RetailMultiBillRequestReviewGridComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RetailMultiBillRequestReviewGridComponent extends BaseFpxGridComponent<RetailMultiBillRequestReviewGridHelper, RetailMultiBillRequestReviewGridState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMultiBillReviewGridHelper: RetailMultiBillRequestReviewGridHelper,
    private changeDetectorRef: ChangeDetectorRef,
    protected device: DeviceDetectorService 
  ) {
    super(formBuilder, controlContainer, router, retailMultiBillReviewGridHelper, changeDetectorRef);
  }

  protected override doPreInit(): void {
    //this.addRow();
  }
  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  protected _appConfig: AppConfigService = inject(AppConfigService);
  count: number = 0;
  

  protected override setGridDefinition(): void {
    console.log('adding row');
    this.addElement('addRowAction');
    this.addElement('deleteAction');
    this.addElement('actions_column');
    this.addElement('actions_column_header');

    this.addFormControl('nickName', '', [Validators.required,], [], 'blur', 1);
    this.addFormControl('billerCreditAccount', '', [], [], 'blur', 1);

    this.addFormControl('orderSl', '', [], [], 'blur', 1);
    this.addFormControl('billReference', '', [Validators.required], [], 'blur', 1);
    this.addFormControl('billerBeneficiaryId', '', [Validators.required,], [], 'blur', 1);
    this.addFormControl('currency', '', [Validators.required], [], 'blur', 1);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'blur', 1);
    this.addFormControl('scheduleType', '', [], [], 'change', 1);
    this.addFormControl('paymentFrequency', '', [], [], 'blur', 1);
    this.addFormControl('numberOfPayments', '', [], [], 'blur', 1);
    this.addFormControl('paymentEndDate', '', [], [], 'blur', 1);

    this.addFormControl('totalBillAmount', '', [Validators.required,], [], 'blur', 1);
    this.addElement('totalBillAmount_column');
    this.addElement('totalBillAmount_column_header');

    this.addFormControl('paymentDate', '', [Validators.required,], [], 'blur', 1);
    this.addElement('paymentDate_column');
    this.addElement('paymentDate_column_header');


  }



}
