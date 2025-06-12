import { Injectable } from "@angular/core";
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
import { PfmgoalsService } from '../pfmgoals-service/pfmgoals.service';
import { Pfmgoals } from '../pfmgoals-service/pfmgoals.model';
import { AppConfigService } from "@dep/services";
export class RetailTrackGoalsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   goalSegmentList$: any;
  isDataReceived: boolean = false;
  gridData: any;
}


@Injectable()
export class RetailTrackGoalsFormHelper extends BaseFpxFormHelper<RetailTrackGoalsFormState>{

   constructor( private retailTrackGoalsFormService: PfmgoalsService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService
   ) 
    {
        super(new RetailTrackGoalsFormState());
    }
   
  override doPreInit(): void {
 this.state.goalSegmentList$ = of([
  {
    id: "ALL",
    text: "All"
  },
  {
    id: "1",
    text: "Monthly"
  },
  {
    id: "2",
    text: "Quarterly"
  },
  {
    id: "3",
    text: "Yearly"
  }
]);
 this.setServiceCode("RETAILPFMGOALSREQ");
 }
   

  public override doPostInit(): void {
    this.setValue("goalSegments", "ALL");
    this.addValueChangeHandler("goalSegments", this.handlegoalSegmentsOnvalueChange);
    this.handleFormOnload();
  }
  handleFormOnload(){
     if (this._appConfig.hasData('pfmActionPublisher$')) {
        this._appConfig.getData('pfmActionPublisher$').observable.subscribe(
          (res: any) => {
            if(res?.action == "DELETEGOAL"){
              this.setValue('debitAccount',res.goalData.debitAccount);
              this.setValue('advanceDebitAmount',res.goalData.advanceDebitAmount);
              this.setValue('debitAmount',res.goalData.goalAmount);
              this.setValue('goalDuration',res.goalData.goalDuration);
              this.setValue('frequency',res.goalData.frequency);
              this.setValue('status',res.goalData.status);
              this.setValue('accruedAmount',res.goalData.accruedAmount);
              this.setValue('goalName',res.goalData?.goalName);
              this.setValue('goalInventoryNumber',res.goalData?.inventoryNumber);
              this.setValue('mode','D');
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
      if (value != "ALL") {
        criteriaQuery.addFilterCritertia("frequency", "String", "equals", {
          searchText: value,
        });
      }
      this.setGridCriteria("goalsGrid", criteriaQuery);
    }
 
  public override preSubmitInterceptor(payload: any):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Pfmgoals){
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
      res=response.success?.body?.pfmgoalsreq;
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
 

