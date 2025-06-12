
import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { WallethistroyService } from './../../wallet/trans-history-service/wallethistroy.service';
import { RewardsTransactionSummaryHelper, RewardsTransactionSummaryState } from './rewards-transaction-summary.helper';

@Component({
  selector: 'app-rewards-transaction-summary',
  templateUrl: './rewards-transaction-summary.component.html',
  styleUrls: ['./rewards-transaction-summary.component.scss'],
  providers: [
    RewardsTransactionSummaryHelper,
    WallethistroyService
  ]
})
export class RewardsTransactionSummaryComponent extends BaseFpxFormComponent<RewardsTransactionSummaryHelper,RewardsTransactionSummaryState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _RewardsTransactionSummaryHelper: RewardsTransactionSummaryHelper,
  ) { 
    super(formBuilder, router,controlContainer, _RewardsTransactionSummaryHelper);
  }

  override doPreInit(){
    this.addElement('transferHistoryGrid');
  }

}



















