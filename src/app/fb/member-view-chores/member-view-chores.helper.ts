import { Injectable, Input } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";

import { AppConfigService } from "@dep/services";
import { Tasklog } from "../tasklog-service/tasklog.model";
//import { FbchoresdetailsService } from "../fb-chores-service/fbchoresdetails.service";
import { Tasks } from "../tasks-service/tasks.model";
import { TasksService } from "../tasks-service/tasks.service";
import { TasklogService } from "../tasklog-service/tasklog.service";
//import { tasks } from "../fb-chores-service/fbchoresdetails.model";
export class MemberViewChoresState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  goalSegmentList$: any;
  isDataReceived: boolean = false;
  gridData: any;
}


@Injectable()
export class MemberViewChoresHelper extends BaseFpxFormHelper<MemberViewChoresState> {
  childrenData: any;
  @Input('cardData') cardData!: any;


  constructor(private retailTrackGoalsFormService: TasklogService, private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new MemberViewChoresState());
  }

  override doPreInit(): void {
    let childrenData = JSON.parse(this._appConfig.getData('childrenData'))
    let peningchore = "Pending" + " " + "("+childrenData.totalPendingTasks+")";
    let completedchore = "Completed" + " " + "("+childrenData.totalCompletedTasks+")";
    let goalselectedData = this._appConfig.getData('goalsViewDataata');
    if (goalselectedData) {
      this.selectedGoaldataCall(goalselectedData.goalName)
    } else {
      this.addValueChangeHandler("goalSegments", this.handlegoalSegmentsOnvalueChange);
    }
    this.state.goalSegmentList$ = of([
      {
        id: "P",
        text: peningchore
      },
      {
        id: "C",
        text: completedchore
      }
    ]);
    this.setServiceCode("RETAILTASKINFO");
  }


  public override doPostInit(): void {
    this.setValue("goalSegments", "P");
    this.handleFormOnload();

  }
  handleFormOnload() {
    if (this._appConfig.hasData('fbActionPublisher$')) {
      this._appConfig.getData('fbActionPublisher$').observable.subscribe(
        (res: any) => {
          if (res?.action == "DELETECHORE") {
            this.setValue('taskName', res?.choreData.taskName);
            this.setValue('childAccNo', res?.choreData.childAccNo);
            this.setValue('debitAccNo', res?.choreData.debitAccNo.accountNumber);
            this.setValue('dueDate', res?.choreData.dueDate);
            this.setValue('rewardCurrency', res?.choreData.rewardCurrency  );
            this.setValue('rewardAmount', res?.choreData.rewardAmount  );
            this.setValue('remarks', res?.choreData.remarks);
            this.setValue('mappedGoal', res?.choreData.mappedGoal);
            this.setValue('supportingDocument', res?.choreData.supportingDocument);
            this.setValue('proofRequired', res?.choreData.proofRequired);
            this.setValue('taskInventoryNumber', res?.choreData.inventoryNumber);
            this.setValue('status', res?.choreData.status);
            this.setValue('operationMode', 'D');
            this.triggerSubmit();
          }
        }
      );
    }
  }

  selectedGoaldataCall(value: any) {
    const criteriaQuery = new CriteriaQuery();
    this.childrenData = JSON.parse(this._appConfig.getData('childrenData'));
    let accno = this.childrenData?.childAccount;
    criteriaQuery.addFilterCritertia("childAccNo", "String", "equals", {
      searchText: accno,
    });
    criteriaQuery.addFilterCritertia("mappedGoal", "String", "equals", {
      searchText: value,
    });
    this._appConfig.setData('taskCount', 1000);
    this.setGridCriteria("choresGrid", criteriaQuery);
  }

  public handlegoalSegmentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const criteriaQuery = new CriteriaQuery();
    this.childrenData = JSON.parse(this._appConfig.getData('childrenData'));
    let accno = this.childrenData?.childAccount;
    //this._appConfig.setData('childAccNo', accno);
    criteriaQuery.addFilterCritertia("childAccNo", "String", "equals", {
      searchText: accno,
    });
    criteriaQuery.addFilterCritertia("status", "String", "equals", {
      searchText: value,
    });
    this._appConfig.setData('taskCount', 1000);
    this.setGridCriteria("choresGrid", criteriaQuery);
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Tasklog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  trackchoreRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
      this._appConfig.setData("choreGirdData",this.state.gridData);
    }
   }


  public override postSubmitInterceptor(response: any): RoutingInfo {
     let res: any;
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      res = response.success?.body?.tasklog;
      routingInfo.setQueryParams({
        // transRef: response.success?.body?.pfmgoals.inventoryNumber.tenantId,
        response: res,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


