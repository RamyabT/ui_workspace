import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailViewAllFavouritePaymentsRoGridHelper } from './retail-view-all-favourtie-payments-ro-grid.helper';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';
import { Favpayments } from '../favpayments-service/favpayments.model';

@Component({
 selector: 'app-retail-view-all-favourtie-payments-ro-grid',
  templateUrl: './retail-view-all-favourtie-payments-ro-grid.component.html',
  styleUrls: ['./retail-view-all-favourtie-payments-ro-grid.component.scss'],
   providers : [ RetailViewAllFavouritePaymentsRoGridHelper]
 })
export class RetailViewAllFavouritePaymentsRoGridComponent extends BaseFpxROGridComponent< Favpayments, RetailViewAllFavouritePaymentsRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  
 constructor(
    protected retailFavouritePaymentsRoGridHelper: RetailViewAllFavouritePaymentsRoGridHelper,
    protected favpaymentsService: FavpaymentsService
  ) {
    super(retailFavouritePaymentsRoGridHelper);
  }
                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailViewAllFavouritePaymentsRoGrid.inventoryNumber.label','RetailViewAllFavouritePaymentsRoGrid.customerCode.label','RetailViewAllFavouritePaymentsRoGrid.serviceCode.label','RetailViewAllFavouritePaymentsRoGrid.paymentId.label','RetailViewAllFavouritePaymentsRoGrid.debitAccount.label','RetailViewAllFavouritePaymentsRoGrid.creditAccount.label','RetailViewAllFavouritePaymentsRoGrid.paymentCurrency.label','RetailViewAllFavouritePaymentsRoGrid.beneficiaries.label']);
    this.setGridIdentifiers(['SELECT','inventoryNumber','customerCode','serviceCode','paymentId','debitAccount','creditAccount','paymentCurrency','beneficiaries']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.favpaymentsService);
    this.setGridTitle('RetailViewAllFavouritePaymentsRoGrid.title');
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
