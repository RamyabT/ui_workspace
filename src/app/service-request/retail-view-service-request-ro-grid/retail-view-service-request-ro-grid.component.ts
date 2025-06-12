import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailViewServiceRequestRoGridHelper } from './retail-view-service-request-ro-grid.helper';
import { ServicerequestlogService } from '../servicerequestlog-service/servicerequestlog.service';
import { Servicerequestlog } from '../servicerequestlog-service/servicerequestlog.model';

@Component({
 selector: 'app-retail-view-service-request-ro-grid',
  templateUrl: './retail-view-service-request-ro-grid.component.html',
  styleUrls: ['./retail-view-service-request-ro-grid.component.scss'],
   providers : [ RetailViewServiceRequestRoGridHelper]
 })
export class RetailViewServiceRequestRoGridComponent extends BaseFpxROGridComponent< Servicerequestlog, RetailViewServiceRequestRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  
 constructor(
    protected retailViewServiceRequestRoGridHelper: RetailViewServiceRequestRoGridHelper,
    protected servicerequestlogService: ServicerequestlogService
  ) {
    super(retailViewServiceRequestRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.servicerequestlogService);
    this.setGridTitle('RetailViewServiceRequestRoGrid.title');
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
