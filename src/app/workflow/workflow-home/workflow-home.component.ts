import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { WorkflowComponentHelper, WorkflowComponentState } from './workflow-home.helper';

@Component({
  selector: 'app-workflow-home',
  templateUrl: './workflow-home.component.html',
  styleUrls: ['./workflow-home.component.scss'],
  providers: [WorkflowComponentHelper]
})
export class WorkflowHomeComponent extends BaseFpxFormComponent<WorkflowComponentHelper,WorkflowComponentState> {
  protected activeTabIndex: number = 0;
  
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    
    public _workflowComponentHelper: WorkflowComponentHelper,
    // public retailFilterTransactionHelper:RetailFilterTransactionHelper,
    // public _retailDownloadTransactionFormHelper:retailDownloadTransactionFormHelper
  ) { 
    super(formBuilder, router,controlContainer, _workflowComponentHelper);
    this.setServiceCode("CHECKERWF");
  }

  

  onTabChanged($event:any){

  }

}
