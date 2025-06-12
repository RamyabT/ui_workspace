import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { workflowHistoryService } from '../workflow-history-service/workflow-history.service';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-workflow-history',
  templateUrl: './workflow-history.component.html',
  styleUrls: ['./workflow-history.component.scss']
})
export class WorkflowHistoryComponent implements OnInit {
  workflowHistoryDetails: any;
  workflowRef: number=0;
  accordionOpen:boolean=true;
  accordionGroupCollapse:boolean=true;
  shellType: any;
  workflowDetails: any;

  constructor(private _workflowHistoryService:workflowHistoryService,private _route: ActivatedRoute,private _appConfigService:AppConfigService) { 
    
  }

  ngOnInit() {
    this.workflowDetails = this._appConfigService.getData('currentWorkFlow');

    this.shellType = 'DECISION';
    if(this.shellType=='DECISION' || 'DISPLAY')
      this.accordionOpen=false;
    this._route.queryParams.subscribe((params:any) => {
    this.workflowRef=params.inventoryNumber || params.tranRef;
  });
    this._workflowHistoryService.fetchWorkflowHistory(this.workflowRef).subscribe({
      next:(res:any)=>{
          this.workflowHistoryDetails=res.body.workflowHistory;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  ngOnDestroy() {
    this._appConfigService.removeData('currentWorkFlow');
  }

}
