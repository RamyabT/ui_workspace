import { ChangeDetectorRef, Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDcTransactionSummaryFormComponentHelper, RetailDcTransactionSummaryFormComponentState } from './retail-dc-transaction-summary-form.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-retail-dc-transaction-summary-form',
  templateUrl: './retail-dc-transaction-summary-form.component.html',
  styleUrls: ['./retail-dc-transaction-summary-form.component.scss'],
  providers: [
    RetailDcTransactionSummaryFormComponentHelper,
  ]
})
export class RetailDcTransactionSummaryFormComponent extends BaseFpxFormComponent<RetailDcTransactionSummaryFormComponentHelper, RetailDcTransactionSummaryFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _retailDcTransactionSummaryFormHelper: RetailDcTransactionSummaryFormComponentHelper,
    public device: DeviceDetectorService
  ) { 
    super(formBuilder, router,controlContainer, _retailDcTransactionSummaryFormHelper);
  }

  override doPreInit(){
    this.addElement('dctransactionSummaryGrid');
  }

}
