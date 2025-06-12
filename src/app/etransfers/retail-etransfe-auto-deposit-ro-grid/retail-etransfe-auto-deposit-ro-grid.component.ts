import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailEtransferAutoDepositRoGridHelper } from './retail-etransfe-auto-deposit-ro-grid.helper';
import { EtransferautodepositService } from '../etransferautodeposit-service/etransferautodeposit.service';
import { Etransferautodeposit } from '../etransferautodeposit-service/etransferautodeposit.model';

@Component({
 selector: 'app-retail-etransfe-auto-deposit-ro-grid',
  templateUrl: './retail-etransfe-auto-deposit-ro-grid.component.html',
  styleUrls: ['./retail-etransfe-auto-deposit-ro-grid.component.scss'],
   providers : [ RetailEtransferAutoDepositRoGridHelper]
 })
export class RetailEtransferAutoDepositRoGridComponent extends BaseFpxROGridComponent< Etransferautodeposit, RetailEtransferAutoDepositRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailEtransferAutoDepositRoGridHelper: RetailEtransferAutoDepositRoGridHelper,
    protected etransferautodepositService: EtransferautodepositService
  ) {
    super(retailEtransferAutoDepositRoGridHelper);
  }
                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailEtransferAutoDepositRoGrid.emailID.label','RetailEtransferAutoDepositRoGrid.mobileNumber.label','RetailEtransferAutoDepositRoGrid.depositAccount.label','RetailEtransferAutoDepositRoGrid.depositAccountName.label']);
    this.setGridIdentifiers(['SELECT','emailID','mobileNumber','depositAccount','depositAccountName']);
    this.setGridColumnTypes(['Checkbox','String','String','String']);
    this.addGridDataService(this.etransferautodepositService);
    this.setGridTitle('RetailEtransferAutoDepositRoGrid.title');
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
