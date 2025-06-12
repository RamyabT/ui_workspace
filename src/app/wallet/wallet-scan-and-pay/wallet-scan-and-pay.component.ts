import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletScanAndPayHelper, WalletScanAndPayState } from './wallet-scan-and-pay.helper';

@Component({
  selector: 'app-wallet-scan-and-pay',
  templateUrl: './wallet-scan-and-pay.component.html',
  styleUrls: ['./wallet-scan-and-pay.component.scss'],
  providers: [WalletScanAndPayHelper]
})
export class WalletScanAndPayComponent extends BaseFpxFormComponent<WalletScanAndPayHelper, WalletScanAndPayState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _walletScanAndPayService: WalletScanAndPayHelper,
  ) { 
    super(formBuilder, router,controlContainer, _walletScanAndPayService);
    
  }
  protected override doPreInit(): void {
    this.setServiceCode("RETAILSCANANDPAY");
  }

}
