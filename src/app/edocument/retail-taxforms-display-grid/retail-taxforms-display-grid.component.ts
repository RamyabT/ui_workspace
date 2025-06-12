import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailTaxformsDisplayGridHelper } from './retail-taxforms-display-grid.helper';
import { TaxformsService } from '../taxforms-service/taxforms.service';
import { Taxforms } from '../taxforms-service/taxforms.model';
import { StopchequeService } from 'src/app/accounts/stopcheque-service/stopcheque.service';

@Component({
 selector: 'app-retail-taxforms-display-grid',
  templateUrl: './retail-taxforms-display-grid.component.html',
  styleUrls: ['./retail-taxforms-display-grid.component.scss'],
   providers : [ RetailTaxformsDisplayGridHelper]
 })
export class RetailTaxformsDisplayGridComponent extends BaseFpxROGridComponent< Taxforms, RetailTaxformsDisplayGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailTaxformsDisplayGridHelper: RetailTaxformsDisplayGridHelper,
    protected taxformsService: TaxformsService
  ) {
    super(retailTaxformsDisplayGridHelper);
  }
                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailTaxformsDisplayGrid.taxformName.label','RetailTaxformsDisplayGrid.dateOfGeneration.label']);
    this.setGridIdentifiers(['SELECT','taxformName','dateOfGeneration']);
    this.setGridColumnTypes(['Checkbox','String','String']);
    this.addGridDataService(this.taxformsService);
    this.setGridTitle('RetailTaxformsDisplayGrid.title');
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
