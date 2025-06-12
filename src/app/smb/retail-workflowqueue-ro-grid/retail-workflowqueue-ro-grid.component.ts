import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailWorkflowqueueRoGridHelper } from './retail-workflowqueue-ro-grid.helper';
import { WorkflowqService } from '../workflowq-service/workflowq.service';
import { workflowq } from '../workflowq-service/workflowq.model';

@Component({
 selector: 'app-retail-workflowqueue-ro-grid',
  templateUrl: './retail-workflowqueue-ro-grid.component.html',
  styleUrls: ['./retail-workflowqueue-ro-grid.component.scss'],
   providers : [ RetailWorkflowqueueRoGridHelper]
 })
export class RetailWorkflowqueueRoGridComponent extends BaseFpxROGridComponent< workflowq, RetailWorkflowqueueRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;
  private observer: any;
 constructor(
    protected retailWorkflowqueueRoGridHelper: RetailWorkflowqueueRoGridHelper,
    protected workflowqService: WorkflowqService
  ) {
    super(retailWorkflowqueueRoGridHelper);
  }
                                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailWorkflowqueueRoGrid.taskInstanceId.label','RetailWorkflowqueueRoGrid.action.label','RetailWorkflowqueueRoGrid.owner.label','RetailWorkflowqueueRoGrid.potOwner.label','RetailWorkflowqueueRoGrid.pendingSince.label','RetailWorkflowqueueRoGrid.serviceCode.label','RetailWorkflowqueueRoGrid.serviceName.label','RetailWorkflowqueueRoGrid.flowInstanceId.label','RetailWorkflowqueueRoGrid.initBy.label','RetailWorkflowqueueRoGrid.customerCode.label','RetailWorkflowqueueRoGrid.workflowType.label','RetailWorkflowqueueRoGrid.actionOn.label']);
    this.setGridIdentifiers(['SELECT','taskInstanceId','action','owner','potOwner','pendingSince','serviceCode','serviceName','flowInstanceId','initBy','customerCode','workflowType','actionOn']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.workflowqService);
    this.setGridTitle('RetailWorkflowqueueRoGrid.title');
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
