import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';

@Component({
  selector: 'app-pfm-transaction-summary-card',
  templateUrl: './pfm-transaction-summary-card.component.html',
  styleUrls: ['./pfm-transaction-summary-card.component.scss']
})
export class PfmTransactionSummaryCardComponent extends BaseFpxFunctionality implements OnInit {

  @Input('cardData') cardData!: any;

  constructor(
   public appConfig:AppConfigService
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
