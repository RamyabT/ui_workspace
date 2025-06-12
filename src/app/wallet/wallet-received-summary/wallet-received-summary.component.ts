import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
 import { WallethistroyService } from '../trans-history-service/wallethistroy.service';
import { WalletReceivedSummaryHelper, WalletReceivedSummaryState } from './wallet-received-summary.helper';
import { WalletreceiveService } from '../trans-history-service/walletreceive.service';

@Component({
  selector: 'app-wallet-received-summary',
  templateUrl: './wallet-received-summary.component.html',
  styleUrls: ['./wallet-received-summary.component.scss'],
  providers: [
    WalletReceivedSummaryHelper,
    WalletreceiveService
  ]
})
export class WalletReceivedSummaryComponent extends BaseFpxFormComponent<WalletReceivedSummaryHelper,WalletReceivedSummaryState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _WalletReceivedSummaryHelper: WalletReceivedSummaryHelper,
  ) { 
    super(formBuilder, router,controlContainer, _WalletReceivedSummaryHelper);
  }

  override doPreInit(){
    this.addElement('receiveSummaryGrid');
  }

}
