import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { WalletSelectContactROGRIDHelper } from './wallet-select-contact-ro-grid.helper';

@Component({
 selector: 'app-wallet-select-contact-ro-grid',
  templateUrl: './wallet-select-contact-ro-grid.component.html',
  styleUrls: ['./wallet-select-contact-ro-grid.component.scss'],
   providers : [ WalletSelectContactROGRIDHelper]
 })
export class WalletSelectContactROGRIDComponent extends BaseFpxROGridComponent< WalletSelectContactROGRIDHelper, WalletSelectContactROGRIDHelper> {
 constructor(
    protected walletSelectContactROGRIDHelper: WalletSelectContactROGRIDHelper,
  ) {
    super(walletSelectContactROGRIDHelper);
  }
                               
  protected override doPreInit(): void {
  }
}
