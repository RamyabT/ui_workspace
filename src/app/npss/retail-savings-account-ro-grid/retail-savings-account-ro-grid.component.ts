import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailSavingsAccountRoGridHelper } from './retail-savings-account-ro-grid.helper';
import { SaaccountService } from '../saaccount-service/saaccount.service';
import { Saaccount } from '../saaccount-service/saaccount.model';

@Component({
 selector: 'app-retail-savings-account-ro-grid',
  templateUrl: './retail-savings-account-ro-grid.component.html',
  styleUrls: ['./retail-savings-account-ro-grid.component.scss'],
   providers : [ RetailSavingsAccountRoGridHelper, SaaccountService]
 })
export class RetailSavingsAccountRoGridComponent extends BaseFpxROGridComponent< Saaccount, RetailSavingsAccountRoGridHelper> {
 constructor(
    protected retailSavingsAccountRoGridHelper: RetailSavingsAccountRoGridHelper,
    protected saaccountService: SaaccountService
  ) {
    super(retailSavingsAccountRoGridHelper);
  }
                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailSavingsAccountRoGrid.accountType.label','RetailSavingsAccountRoGrid.iban.label']);
    this.setGridIdentifiers(['SELECT','accountType','iban']);
    this.setGridColumnTypes(['Checkbox','String','String']);
    this.addGridDataService(this.saaccountService);
    this.setGridTitle('RetailSavingsAccountRoGrid.title');
  }
}
