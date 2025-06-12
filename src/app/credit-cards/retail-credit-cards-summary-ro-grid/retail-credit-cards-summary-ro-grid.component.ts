import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailCreditCardsSummaryRoGridHelper } from './retail-credit-cards-summary-ro-grid.helper';
import { CreditcardService } from '../creditcard-service/creditcard.service';
import { Creditcard } from '../creditcard-service/creditcard.model';

@Component({
 selector: 'app-retail-credit-cards-summary-ro-grid',
  templateUrl: './retail-credit-cards-summary-ro-grid.component.html',
  styleUrls: ['./retail-credit-cards-summary-ro-grid.component.scss'],
   providers : [ RetailCreditCardsSummaryRoGridHelper]
 })
export class RetailCreditCardsSummaryRoGridComponent extends BaseFpxROGridComponent< Creditcard, RetailCreditCardsSummaryRoGridHelper> {
 constructor(
    protected retailCreditCardsSummaryRoGridHelper: RetailCreditCardsSummaryRoGridHelper,
    protected creditcardService: CreditcardService
  ) {
    super(retailCreditCardsSummaryRoGridHelper);
  }
                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailCreditCardsSummaryRoGrid.creditCardNumber.label','RetailCreditCardsSummaryRoGrid.cardType.label','RetailCreditCardsSummaryRoGrid.status.label','RetailCreditCardsSummaryRoGrid.productDesc.label','RetailCreditCardsSummaryRoGrid.branchDesc.label','RetailCreditCardsSummaryRoGrid.cardRefNumber.label','RetailCreditCardsSummaryRoGrid.validThru.label','RetailCreditCardsSummaryRoGrid.issueDate.label']);
    this.setGridIdentifiers(['SELECT','creditCardNumber','cardType','status','productDesc','branchDesc','cardRefNumber','validThru','issueDate']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.creditcardService);
    this.setGridTitle('RetailCreditCardsSummaryRoGrid.title');
  }
}
