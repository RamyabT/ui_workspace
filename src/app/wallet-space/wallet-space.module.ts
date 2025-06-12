import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletSpaceRoutingModule } from './wallet-space-routing.module';
import { WalletSpaceComponent } from './wallet-space.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { FoundationModule } from '../foundation/foundation.module';
import { WalletModule } from '../wallet/wallet.module';
import { widgetModule } from '../widget/widget.module';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsSpaceModule } from '../accounts-space/accounts-space.module';
import { WallethistroyService } from '../wallet/trans-history-service/wallethistroy.service';


@NgModule({
  declarations: [
    WalletSpaceComponent
  ],
  imports: [
    CommonModule,
    WalletSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
    FoundationModule,
    WalletModule,
    ThirdPartyModule,
    widgetModule,
    AccountsModule,
    AccountsSpaceModule     
  ],
   providers:[
     WallethistroyService
   ],
})
export class WalletSpaceModule { }
