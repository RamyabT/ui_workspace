import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailDepositsSummaryRoGridHelper } from './retail-deposits-summary-ro-grid.helper';
import { DepositsService } from '../deposits-service/deposits.service';
import { Deposits } from '../deposits-service/deposits.model';

@Component({
 selector: 'app-retail-deposits-summary-ro-grid',
  templateUrl: './retail-deposits-summary-ro-grid.component.html',
  styleUrls: ['./retail-deposits-summary-ro-grid.component.scss'],
   providers : [ RetailDepositsSummaryRoGridHelper]
 })
export class RetailDepositsSummaryRoGridComponent extends BaseFpxROGridComponent< Deposits, RetailDepositsSummaryRoGridHelper> {
 constructor(
    protected retailDepositsSummaryRoGridHelper: RetailDepositsSummaryRoGridHelper,
    protected depositsService: DepositsService
  ) {
    super(retailDepositsSummaryRoGridHelper);
  }
  
  protected override doPreInit(): void {
    
  }
}
