import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailBillerListRoGridHelper } from './retail-biller-list-ro-grid.helper';
import { BillerService } from '../biller-service/biller.service';
import { Biller } from '../biller-service/biller.model';

@Component({
 selector: 'app-retail-biller-list-ro-grid',
  templateUrl: './retail-biller-list-ro-grid.component.html',
  styleUrls: ['./retail-biller-list-ro-grid.component.scss'],
   providers : [ RetailBillerListRoGridHelper]
 })
export class RetailBillerListRoGridComponent extends BaseFpxROGridComponent< Biller, RetailBillerListRoGridHelper> {
 constructor(
    protected retailBillerListRoGridHelper: RetailBillerListRoGridHelper,
    protected billerService: BillerService
  ) {
    super(retailBillerListRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.billerService);
    this.setGridTitle('RetailBillerListRoGrid.title');
  }
}
