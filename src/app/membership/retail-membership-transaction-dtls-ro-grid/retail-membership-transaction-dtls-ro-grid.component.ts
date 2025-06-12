import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailMembershipTransactionDtlsROGridHelper } from './retail-membership-transaction-dtls-ro-grid.helper';
import { MembershiptransactiondtlsService } from '../membershiptransactiondtls-service/membershiptransactiondtls.service';
import { Membershiptransactiondtls } from '../membershiptransactiondtls-service/membershiptransactiondtls.model';

@Component({
 selector: 'app-retail-membership-transaction-dtls-ro-grid',
  templateUrl: './retail-membership-transaction-dtls-ro-grid.component.html',
  styleUrls: ['./retail-membership-transaction-dtls-ro-grid.component.scss'],
   providers : [ RetailMembershipTransactionDtlsROGridHelper]
 })
export class RetailMembershipTransactionDtlsROGridComponent extends BaseFpxROGridComponent< Membershiptransactiondtls, RetailMembershipTransactionDtlsROGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  constructor(
    protected retailMembershipTransactionDtlsROGridHelper: RetailMembershipTransactionDtlsROGridHelper,
    protected membershiptransactiondtlsService: MembershiptransactiondtlsService
  ) {
    super(retailMembershipTransactionDtlsROGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.membershiptransactiondtlsService);
    // this.setGridTitle('RetailMembershipTransactionDtlsROGrid.title');
    this.setGridTitle('');
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
