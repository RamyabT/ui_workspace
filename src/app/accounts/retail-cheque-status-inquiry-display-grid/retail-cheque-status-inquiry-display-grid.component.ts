import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailChequeStatusInquiryDisplayGridHelper } from './retail-cheque-status-inquiry-display-grid.helper';
import { ChequeStatusInquiryService } from '../chequeStatusInquiry-service/chequeStatusInquiry.service';
import { ChequeStatusInquiry } from '../chequeStatusInquiry-service/chequeStatusInquiry.model';

@Component({
 selector: 'app-retail-cheque-status-inquiry-display-grid',
  templateUrl: './retail-cheque-status-inquiry-display-grid.component.html',
  styleUrls: ['./retail-cheque-status-inquiry-display-grid.component.scss'],
   providers : [ RetailChequeStatusInquiryDisplayGridHelper]
 })
export class RetailChequeStatusInquiryDisplayGridComponent extends BaseFpxROGridComponent< ChequeStatusInquiry, RetailChequeStatusInquiryDisplayGridHelper> {
 constructor(
    protected retailChequeStatusInquiryDisplayGridHelper: RetailChequeStatusInquiryDisplayGridHelper,
    protected chequeStatusInquiryService: ChequeStatusInquiryService
  ) {
    super(retailChequeStatusInquiryDisplayGridHelper);
  }
                                                                                             
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailChequeStatusInquiryDisplayGrid.chequeNumber.label','RetailChequeStatusInquiryDisplayGrid.chequeAmount.label','RetailChequeStatusInquiryDisplayGrid.chequeStatus.label','RetailChequeStatusInquiryDisplayGrid.payeeName.label','RetailChequeStatusInquiryDisplayGrid.accountCurrency.label','RetailChequeStatusInquiryDisplayGrid.paidDate.label']);
    this.setGridIdentifiers(['SELECT','chequeNumber','chequeAmount','chequeStatus','payeeName','accountCurrency','paidDate']);
    this.setGridColumnTypes(['Checkbox','Numeric','String','String','String','String','String']);
    this.addGridDataService(this.chequeStatusInquiryService);
    // this.setGridTitle('RetailChequeStatusInquiryDisplayGrid.title');
  }
}
