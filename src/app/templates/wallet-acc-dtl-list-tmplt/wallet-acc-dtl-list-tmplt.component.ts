import { Component, inject, Input, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { WalletsummaryService } from 'src/app/wallet/wallet-summary-service/walletsummary.service';

@Component({
  selector: 'app-wallet-acc-dtl-list-tmplt',
  templateUrl: './wallet-acc-dtl-list-tmplt.component.html',
  styleUrls: ['./wallet-acc-dtl-list-tmplt.component.scss']
})
export class WalletAccDtlListTmpltComponent implements OnInit {

  @Input('selectedData') selectedData: any;

  protected appConstant: any = APPCONSTANTS;

  constructor(
    private _casaAccountService: CasaaccountService, private _walletService : WalletsummaryService
  ) { }

  ngOnInit(): void {
    console.log("selectedData: ", this.selectedData);
  }

  // shareInfo($event: MouseEvent) {
  //   $event.stopPropagation();
  //   this._casaAccountService.shareAccountInfo(this.selectedData);
  // }

}
