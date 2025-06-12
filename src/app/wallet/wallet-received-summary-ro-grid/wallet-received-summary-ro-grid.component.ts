import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';

 import { wallettransactiondtls } from '../trans-history-service/transactionhistory.model';
import { TranhistoryService } from 'src/app/transfers/tranhistory-service/tranhistory.service';
import { WallethistroyService } from '../trans-history-service/wallethistroy.service';
import { WalletReceivedSummaryRoGridHelper } from './wallet-received-summary-ro-grid.helper';
import { WalletreceiveService } from '../trans-history-service/walletreceive.service';

@Component({
  selector: 'app-wallet-received-summary-ro-grid',
  templateUrl: './wallet-received-summary-ro-grid.component.html',
  styleUrls: ['./wallet-received-summary-ro-grid.component.scss'],
   providers : [ WalletReceivedSummaryRoGridHelper]
 })
export class WalletReceivedSummaryRoGridComponent extends BaseFpxROGridComponent< wallettransactiondtls, WalletReceivedSummaryRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  
 constructor(
    protected WalletReceivedSummaryRoGridHelper: WalletReceivedSummaryRoGridHelper,
    protected completedpymntsService: WalletreceiveService
  ) {
    super(WalletReceivedSummaryRoGridHelper);
  }
                                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','completedpymnts.valueDate.label','completedpymnts.initiationDate.label','completedpymnts.paymentType.label','completedpymnts. beneficiaryAccountNumber.label','completedpymnts.debitAccountNumber.label','completedpymnts.beneficiaryName.label','completedpymnts.transactionReference.label','completedpymnts.paymentAmount.label','completedpymnts.paymentCurrency.label','completedpymnts.uETR.label','completedpymnts.status.label']);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.completedpymntsService);
    this.setGridTitle('completedpymnts.title');
  }

  protected override doPostInit(): void {
    this.observer = new IntersectionObserver(entries => {
      var entry = entries[0];
      if (entry.isIntersecting && !this.fpxRoGrid?.loading) {
        this._helper.loadMore();
      }
    }, {
      rootMargin: '0px',
      threshold: 0.9
    });

    this.observer.observe(this.loadMore.nativeElement);
  }

}
