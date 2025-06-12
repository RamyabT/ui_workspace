import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
 import { WallethistroyService } from '../trans-history-service/wallethistroy.service';
import { WalletreceiveService } from '../trans-history-service/walletreceive.service';
import { WalletRequestedSummaryHelper, WalletRequestedSummaryState } from './wallet-requested-summary.helper';

@Component({
  selector: 'app-wallet-requested-summary',
  templateUrl: './wallet-requested-summary.component.html',
  styleUrls: ['./wallet-requested-summary.component.scss'],
  providers: [
    WalletRequestedSummaryHelper,
    WalletreceiveService
  ]
})
export class WalletRequestedSummaryComponent extends BaseFpxFormComponent<WalletRequestedSummaryHelper,WalletRequestedSummaryState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _WalletReceivedSummaryHelper: WalletRequestedSummaryHelper,
  ) { 
    super(formBuilder, router,controlContainer, _WalletReceivedSummaryHelper);
  }

  override doPreInit(){
    this.addElement('requestSummaryGrid');
  }

}
