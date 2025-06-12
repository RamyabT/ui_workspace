import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailFavouritePaymentsRoGridHelper } from './retail-favourtie-payments-ro-grid.helper';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';
import { Favpayments } from '../favpayments-service/favpayments.model';

@Component({
 selector: 'app-retail-favourtie-payments-ro-grid',
  templateUrl: './retail-favourtie-payments-ro-grid.component.html',
  styleUrls: ['./retail-favourtie-payments-ro-grid.component.scss'],
   providers : [ RetailFavouritePaymentsRoGridHelper]
 })
export class RetailFavouritePaymentsRoGridComponent extends BaseFpxROGridComponent< Favpayments, RetailFavouritePaymentsRoGridHelper> {
 constructor(
    protected retailFavouritePaymentsRoGridHelper: RetailFavouritePaymentsRoGridHelper,
    protected favpaymentsService: FavpaymentsService
  ) {
    super(retailFavouritePaymentsRoGridHelper);
  }
                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailFavouritePaymentsRoGrid.inventoryNumber.label','RetailFavouritePaymentsRoGrid.customerCode.label','RetailFavouritePaymentsRoGrid.serviceCode.label','RetailFavouritePaymentsRoGrid.paymentId.label','RetailFavouritePaymentsRoGrid.debitAccount.label','RetailFavouritePaymentsRoGrid.creditAccount.label','RetailFavouritePaymentsRoGrid.paymentCurrency.label','RetailFavouritePaymentsRoGrid.beneficiaries.label']);
    this.setGridIdentifiers(['SELECT','inventoryNumber','customerCode','serviceCode','paymentId','debitAccount','creditAccount','paymentCurrency','beneficiaries']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.favpaymentsService);
    this.setGridTitle('RetailFavouritePaymentsRoGrid.title');
  }
}
