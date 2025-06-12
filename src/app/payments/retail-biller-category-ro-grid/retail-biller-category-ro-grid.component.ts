import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailBillerCategoryRoGridHelper } from './retail-biller-category-ro-grid.helper';
import { BillercategoryService } from '../billercategory-service/billercategory.service';
import { Billercategory } from '../billercategory-service/billercategory.model';

@Component({
 selector: 'app-retail-biller-category-ro-grid',
  templateUrl: './retail-biller-category-ro-grid.component.html',
  styleUrls: ['./retail-biller-category-ro-grid.component.scss'],
   providers : [ RetailBillerCategoryRoGridHelper]
 })
export class RetailBillerCategoryRoGridComponent extends BaseFpxROGridComponent< Billercategory, RetailBillerCategoryRoGridHelper> {
 constructor(
    protected retailBillerCategoryRoGridHelper: RetailBillerCategoryRoGridHelper,
    protected billercategoryService: BillercategoryService
  ) {
    super(retailBillerCategoryRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.billercategoryService);
    this.setGridTitle('RetailBillerCategoryRoGrid.title');
  }
}
