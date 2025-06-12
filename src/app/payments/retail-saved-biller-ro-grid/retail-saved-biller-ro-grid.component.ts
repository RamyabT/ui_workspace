import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailSavedBillerRoGridHelper } from './retail-saved-biller-ro-grid.helper';
import { BilleraccountService } from '../billeraccount-service/billeraccount.service';
import { Billeraccount } from '../billeraccount-service/billeraccount.model';

@Component({
 selector: 'app-retail-saved-biller-ro-grid',
  templateUrl: './retail-saved-biller-ro-grid.component.html',
  styleUrls: ['./retail-saved-biller-ro-grid.component.scss'],
   providers : [ RetailSavedBillerRoGridHelper]
 })
export class RetailSavedBillerRoGridComponent extends BaseFpxROGridComponent< Billeraccount, RetailSavedBillerRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailSavedBillerRoGridHelper: RetailSavedBillerRoGridHelper,
    protected billeraccountService: BilleraccountService
  ) {
    super(retailSavedBillerRoGridHelper);
  }
  protected override doPostInit(): void {
    if(this.retailSavedBillerRoGridHelper?.serviceCode == 'RETAILSAVEDBILLER'){
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

  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.billeraccountService);
    this.setGridTitle('RetailSavedBillerRoGrid.title');
  }
}
