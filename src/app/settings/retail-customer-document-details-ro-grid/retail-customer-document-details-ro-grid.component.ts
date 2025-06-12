import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailCustomerDocumentDetailsRoGridHelper } from './retail-customer-document-details-ro-grid.helper';
import { CustomerdocumentdtlsService } from '../customerdocumentdtls-service/customerdocumentdtls.service';
import { Customerdocumentdtls } from '../customerdocumentdtls-service/customerdocumentdtls.model';

@Component({
 selector: 'app-retail-customer-document-details-ro-grid',
  templateUrl: './retail-customer-document-details-ro-grid.component.html',
  styleUrls: ['./retail-customer-document-details-ro-grid.component.scss'],
   providers : [ RetailCustomerDocumentDetailsRoGridHelper]
 })
export class RetailCustomerDocumentDetailsRoGridComponent extends BaseFpxROGridComponent< Customerdocumentdtls, RetailCustomerDocumentDetailsRoGridHelper> {
 constructor(
    protected retailCustomerDocumentDetailsRoGridHelper: RetailCustomerDocumentDetailsRoGridHelper,
    protected customerdocumentdtlsService: CustomerdocumentdtlsService
  ) {
    super(retailCustomerDocumentDetailsRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.customerdocumentdtlsService);
    this.setGridTitle('RetailCustomerDocumentDetailsRoGrid.title');
  }
}
