import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {debitcardHelper } from './retail-debitcard-summary-ro-grid.helper';
import { DebitcardService } from '../debitcard-service/debitcard.service';
import { Debitcard } from '../debitcard-service/debitcard.model';

@Component({
 selector: 'app-retail-debitcard-summary-ro-grid',
  templateUrl: './retail-debitcard-summary-ro-grid.component.html',
  styleUrls: ['./retail-debitcard-summary-ro-grid.component.scss'],
   providers : [ debitcardHelper]
 })
export class debitcardComponent extends BaseFpxROGridComponent< Debitcard, debitcardHelper> {
 constructor(
    protected debitcardHelper: debitcardHelper,
    protected debitcardService: DebitcardService
  ) {
    super(debitcardHelper);
  }
                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','debitcard.cardNumber.label','debitcard.cardType.label','debitcard.status.label','debitcard.productDesc.label','debitcard.branchDesc.label','debitcard.validThru.label','debitcard.cardReference.label','debitcard.issueDate.label']);
    this.setGridIdentifiers(['SELECT','cardNumber','cardType','status','productDesc','branchDesc','validThru','cardReference','issueDate']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.debitcardService);
    this.setGridTitle('debitcard.title');
  }
}
