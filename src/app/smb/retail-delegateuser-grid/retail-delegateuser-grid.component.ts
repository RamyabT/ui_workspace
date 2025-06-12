import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailDelegateuserGridHelper } from './retail-delegateuser-grid.helper';
import { DelegateuserService } from '../delegateuser-service/delegateuser.service';
import { Delegateuser } from '../delegateuser-service/delegateuser.model';

@Component({
 selector: 'app-retail-delegateuser-grid',
  templateUrl: './retail-delegateuser-grid.component.html',
  styleUrls: ['./retail-delegateuser-grid.component.scss'],
   providers : [ RetailDelegateuserGridHelper]
 })
export class RetailDelegateuserGridComponent extends BaseFpxROGridComponent< Delegateuser, RetailDelegateuserGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;

 constructor(
    protected retailDelegateuserGridHelper: RetailDelegateuserGridHelper,
    protected delegateuserService: DelegateuserService
  ) {
    super(retailDelegateuserGridHelper);
  }
                                                                                                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailDelegateuserGrid.userName.label','RetailDelegateuserGrid.customerCode.label','RetailDelegateuserGrid.customerName.label','RetailDelegateuserGrid.enabled.label','RetailDelegateuserGrid.entityCode.label','RetailDelegateuserGrid.firstName.label','RetailDelegateuserGrid.lastName.label','RetailDelegateuserGrid.emailAddress.label','RetailDelegateuserGrid.mobileNumber.label','RetailDelegateuserGrid.address.label','RetailDelegateuserGrid.status.label','RetailDelegateuserGrid.nationality.label','RetailDelegateuserGrid.operationMode.label','RetailDelegateuserGrid.remarks.label','RetailDelegateuserGrid.accessLevel.label','RetailDelegateuserGrid.createdBy.label']);
    this.setGridIdentifiers(['SELECT','userName','customerCode','customerName','enabled','entityCode','firstName','lastName','emailAddress','mobileNumber','address','status','nationality','operationMode','remarks','accessLevel','createdBy']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.delegateuserService);
    this.setGridTitle('RetailDelegateuserGrid.title');
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
