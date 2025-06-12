import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailVisaEStatementHelper } from './retail-visa-estatement-grid.helper';
import { CreditcardStatementService } from '../creditcardStatement-service/creditcardStatement.service';
import { CreditcardStatement } from '../creditcardStatement-service/creditcardStatement.model';

@Component({
 selector: 'app-retail-visa-estatement-grid',
  templateUrl: './retail-visa-estatement-grid.component.html',
  styleUrls: ['./retail-visa-estatement-grid.component.scss'],
   providers : [ RetailVisaEStatementHelper]
 })
export class RetailVisaEStatementComponent extends BaseFpxROGridComponent< CreditcardStatement, RetailVisaEStatementHelper> {
 constructor(
    protected retailVisaEStatementHelper: RetailVisaEStatementHelper,
    protected creditcardStatementService: CreditcardStatementService
  ) {
    super(retailVisaEStatementHelper);
  }
               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailVisaEStatement.dateOfGeneration.label']);
    this.setGridIdentifiers(['SELECT','dateOfGeneration']);
    this.setGridColumnTypes(['Checkbox','String']);
    this.addGridDataService(this.creditcardStatementService);
    this.setGridTitle('RetailVisaEStatement.title');
  }
}
