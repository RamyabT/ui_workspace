import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


import { EmiPaymentOptionsControlService } from './emi-payment-options-control.service';


@Component({
  selector: 'app-emi-payment-options-control',
  templateUrl: './emi-payment-options-control.component.html',
  styleUrls: ['./emi-payment-options-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmiPaymentOptionsControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmiPaymentOptionsControlComponent extends BaseFpxControlComponent {

  constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
    , private emiPaymentOptionsControlService: EmiPaymentOptionsControlService
  ) {
    super(controlContainer, changeDetectorRef);
  }

  override doPreInit(): void {
    this.setDataSource(this.emiPaymentOptionsControlService);

  }

}

