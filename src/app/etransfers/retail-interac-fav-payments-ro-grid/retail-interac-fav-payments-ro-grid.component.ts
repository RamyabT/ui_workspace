import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailInteracFavPaymentsRoGridHelper } from './retail-interac-fav-payments-ro-grid.helper';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';
import { Favpayments } from '../favpayments-service/favpayments.model';

@Component({
 selector: 'app-retail-interac-fav-payments-ro-grid',
  templateUrl: './retail-interac-fav-payments-ro-grid.component.html',
  styleUrls: ['./retail-interac-fav-payments-ro-grid.component.scss'],
   providers : [ RetailInteracFavPaymentsRoGridHelper]
 })
export class RetailInteracFavPaymentsRoGridComponent extends BaseFpxROGridComponent< Favpayments, RetailInteracFavPaymentsRoGridHelper> {
 constructor(
    protected retailInteracFavPaymentsRoGridHelper: RetailInteracFavPaymentsRoGridHelper,
    protected favpaymentsService: FavpaymentsService
  ) {
    super(retailInteracFavPaymentsRoGridHelper);
  }
                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailInteracFavPaymentsRoGrid.inventoryNumber.label','RetailInteracFavPaymentsRoGrid.customerCode.label','RetailInteracFavPaymentsRoGrid.serviceCode.label','RetailInteracFavPaymentsRoGrid.paymentId.label','RetailInteracFavPaymentsRoGrid.debitAccount.label','RetailInteracFavPaymentsRoGrid.creditAccount.label','RetailInteracFavPaymentsRoGrid.paymentCurrency.label','RetailInteracFavPaymentsRoGrid.beneficiaries.label']);
    this.setGridIdentifiers(['SELECT','inventoryNumber','customerCode','serviceCode','paymentId','debitAccount','creditAccount','paymentCurrency','beneficiaries']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.favpaymentsService);
    this.setGridTitle('RetailInteracFavPaymentsRoGrid.title');
  }
}
