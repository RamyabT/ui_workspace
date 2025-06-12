
import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
 import { WalletTransactionSummaryHelper, WalletTransactionSummaryState } from './wallet-transaction-summary.helper';
import { WallethistroyService } from '../trans-history-service/wallethistroy.service';

@Component({
  selector: 'app-wallet-transaction-summary',
  templateUrl: './wallet-transaction-summary.component.html',
  styleUrls: ['./wallet-transaction-summary.component.scss'],
  providers: [
    WalletTransactionSummaryHelper,
    WallethistroyService
  ]
})
export class WalletTransactionSummaryComponent extends BaseFpxFormComponent<WalletTransactionSummaryHelper,WalletTransactionSummaryState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _WalletTransactionSummaryHelper: WalletTransactionSummaryHelper,
  ) { 
    super(formBuilder, router,controlContainer, _WalletTransactionSummaryHelper);
  }

  override doPreInit(){
    this.addElement('transferHistoryGrid');
  }

}
