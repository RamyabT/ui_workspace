import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailManageBeneRoGridHelper } from './retail-manage-bene-ro-grid.helper';
import { BeneficiariesService } from '../beneficiaries-service/beneficiaries.service';
import { Beneficiaries } from '../beneficiaries-service/beneficiaries.model';

@Component({
 selector: 'app-retail-manage-bene-ro-grid',
  templateUrl: './retail-manage-bene-ro-grid.component.html',
  styleUrls: ['./retail-manage-bene-ro-grid.component.scss'],
   providers : [ RetailManageBeneRoGridHelper]
 })
export class RetailManageBeneRoGridComponent extends BaseFpxROGridComponent< Beneficiaries, RetailManageBeneRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  constructor(
    protected retailManageBeneRoGridHelper: RetailManageBeneRoGridHelper,
    protected beneficiariesService: BeneficiariesService
  ) {
    super(retailManageBeneRoGridHelper);
  }
                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailManageBeneRoGrid.customerCode.label','RetailManageBeneRoGrid.beneAccount.label','RetailManageBeneRoGrid.status.label','RetailManageBeneRoGrid.isFavourite.label','RetailManageBeneRoGrid.externalRef.label','RetailManageBeneRoGrid.remarks.label','RetailManageBeneRoGrid.entityCode.label','RetailManageBeneRoGrid.addressLine1.label','RetailManageBeneRoGrid.benePhoto.label']);
    this.setGridIdentifiers(['SELECT','customerCode','beneAccount','status','isFavourite','externalRef','remarks','entityCode','addressLine1','benePhoto','createdOn']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.beneficiariesService);
    // this.setGridTitle('RetailManageBeneRoGrid.title');
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
