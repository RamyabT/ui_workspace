import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailLoanDisclosureDisplayGridHelper } from './retail-loan-disclosure-display-grid.helper';
import { LoandisclosureService } from '../loandisclosure-service/loandisclosure.service';
import { Loandisclosure } from '../loandisclosure-service/loandisclosure.model';
import { StopchequeService } from 'src/app/accounts/stopcheque-service/stopcheque.service';

@Component({
 selector: 'app-retail-loan-disclosure-display-grid',
  templateUrl: './retail-loan-disclosure-display-grid.component.html',
  styleUrls: ['./retail-loan-disclosure-display-grid.component.scss'],
   providers : [ RetailLoanDisclosureDisplayGridHelper]
 })
export class RetailLoanDisclosureDisplayGridComponent extends BaseFpxROGridComponent< Loandisclosure, RetailLoanDisclosureDisplayGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailLoanDisclosureDisplayGridHelper: RetailLoanDisclosureDisplayGridHelper,
    protected loandisclosureService: LoandisclosureService

  ) {
    super(retailLoanDisclosureDisplayGridHelper);
  }
                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailLoanDisclosureDisplayGrid.docName.label','RetailLoanDisclosureDisplayGrid.dateOfGeneration.label']);
    this.setGridIdentifiers(['SELECT','docName','dateOfGeneration']);
    this.setGridColumnTypes(['Checkbox','String','String']);
    this.addGridDataService(this.loandisclosureService);
    this.setGridTitle('RetailLoanDisclosureDisplayGrid.title');
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
