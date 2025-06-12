import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {completedpymntsHelper } from './retail-completed-payments-ro-grid.helper';
import { CompletedpymntsService } from '../completedpymnts-service/completedpymnts.service';
import { Completedpymnts } from '../completedpymnts-service/completedpymnts.model';
import { Tranhistory } from '../tranhistory-service/tranhistory.model';
import { TranhistoryService } from '../tranhistory-service/tranhistory.service';

@Component({
 selector: 'app-retail-completed-payments-ro-grid',
  templateUrl: './retail-completed-payments-ro-grid.component.html',
  styleUrls: ['./retail-completed-payments-ro-grid.component.scss'],
   providers : [ completedpymntsHelper]
 })
export class completedpymntsComponent extends BaseFpxROGridComponent< Tranhistory, completedpymntsHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  
 constructor(
    protected completedpymntsHelper: completedpymntsHelper,
    protected completedpymntsService: TranhistoryService
  ) {
    super(completedpymntsHelper);
  }
                                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','completedpymnts.valueDate.label','completedpymnts.initiationDate.label','completedpymnts.paymentType.label','completedpymnts. beneficiaryAccountNumber.label','completedpymnts.debitAccountNumber.label','completedpymnts.beneficiaryName.label','completedpymnts.transactionReference.label','completedpymnts.paymentAmount.label','completedpymnts.paymentCurrency.label','completedpymnts.uETR.label','completedpymnts.status.label']);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.completedpymntsService);
    this.setGridTitle('completedpymnts.title');
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
