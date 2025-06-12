import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { TransferSummaryFormComponentHelper, TransferSummaryFormComponentState } from './transfer-summary-form.helper';
import { retailDownloadTransactionFormHelper } from '../retail-download-transaction-form/retail-download-transaction-form.helper';

@Component({
  selector: 'transfer-summary-form',
  templateUrl: './transfer-summary-form.component.html',
  styleUrls: ['./transfer-summary-form.component.scss'],
  providers: [
    TransferSummaryFormComponentHelper,
    CasatransactiondtlsService
  ]
})
export class TransferSummaryFormComponent extends BaseFpxFormComponent<TransferSummaryFormComponentHelper,TransferSummaryFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _transferSummaryFormComponentHelper: TransferSummaryFormComponentHelper,
  ) { 
    super(formBuilder, router,controlContainer, _transferSummaryFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('transferHistoryGrid');
  }

}
