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
import { FbgoalserviceService } from "../fb-goal-service/fbgoalservice.service";
 import { GoalsService } from "../goals-service/goals.service";
import { GoalData } from "../goals-service/goals.model";
import { GoallogService } from "../goallog-service/goallog.service";
import { Goallog } from "../goallog-service/goallog.model";
export class MemberViewGoalsFormState extends BaseFpxComponentState {
  showSuggestion : boolean = false;
   goalSegmentList$: any;
  isDataReceived: boolean = false;
  gridData: any;
}


@Injectable()
export class MemberViewGoalsFormHelper extends BaseFpxFormHelper<MemberViewGoalsFormState>{
  childrenData: any;
   constructor( private retailTrackGoalsFormService: GoallogService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService
   ) 
    {
        super(new MemberViewGoalsFormState());
    }
   
  override doPreInit(): void {
    this.addValueChangeHandler("goalSegments", this.handlegoalSegmentsOnvalueChange);
    let activeGoal = "Active Goal" + " " + "("+this._appConfig.getData('goalStatusCount').pendingStatus+")";
    let completedGoal = "Completed Goal" + " " + "("+this._appConfig.getData('goalStatusCount').completedStatus+")";
    this.state.goalSegmentList$ = of([
      {
        id: "P",
        text: activeGoal
      },
      {
        id: "C",
        text: completedGoal
      }
    ]);
    this.setServiceCode("RETAILGOALINFO");
  }
   

  public override doPostInit(): void {
    this.setValue("goalSegments", "P");
    this.addValueChangeHandler("goalSegments", this.handlegoalSegmentsOnvalueChange);
    this.handleFormOnload();
  }
  handleFormOnload(){
     if (this._appConfig.hasData('fbActionPublisher$')) {
        this._appConfig.getData('fbActionPublisher$').observable.subscribe(
          (res: any) => {
            if(res?.action == "DELETEGOAL"){
              this.setValue('debitAcc',"400000003049");
              this.setValue('childAcc',res.goalData.childAcc);
              this.setValue('dueDt',res.goalData.dueDt);
              this.setValue('initialContribution',res.goalData.contributionAmount);
              this.setValue('targetAmt',res.goalData.targetAmt);
              this.setValue('goalname',res.goalData.goalName );
              this.setValue('status',res.goalData?.status);
              this.setValue('goalInventoryNumber',res.goalData?.inventoryNumber);
              this.setValue('operationMode','D');
              this.triggerSubmit();
            }
          }
        );
      }
  }
  
  public handlegoalSegmentsOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
    ) => {
      const criteriaQuery = new CriteriaQuery();
      this.childrenData =  JSON.parse(this._appConfig.getData('childrenData'));
      let accno = this.childrenData?.childAccount;
       criteriaQuery.setPageCount(1000)
        criteriaQuery.addFilterCritertia("childAcc", "String", "equals", {
        searchText: accno,
      });
        criteriaQuery.addFilterCritertia("status", "String", "equals", {
          searchText: value,
        });
       this.setGridCriteria("goalsGrid", criteriaQuery);
    }
 
  public override preSubmitInterceptor(payload: any):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Goallog){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

trackGoalsRoGridEvent($event:any){
  if($event.eventName == 'afterDataFetch'){
    this.state.isDataReceived = true;
    this.state.gridData = $event.payload;
  }
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
   let res:any;
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      res=response.success?.body?.goallog;
      routingInfo.setQueryParams({
        // transRef: response.success?.body?.pfmgoals.inventoryNumber.tenantId,
        response:res,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

