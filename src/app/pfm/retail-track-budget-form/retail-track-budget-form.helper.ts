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
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PfmbudgetService } from '../pfmbudget-service/pfmbudget.service';
import { Pfmbudget } from '../pfmbudget-service/pfmbudget.model';
import { retailTrackBudgetService } from "../retail-track-budget-service/retail-track-budget.service";
import { AppConfigService } from "@dep/services";

export class RetailTrackBudgetFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  budgetSegmentList$: any;
  isDataReceived: boolean = false;
  gridData: any;
}


@Injectable()
export class RetailTrackBudgetFormHelper extends BaseFpxFormHelper<RetailTrackBudgetFormState> {
  segments: { type: string; count: any }[] = [];
  activeSegmentIndex: number = 0;
  constructor(private retailTrackBudget: retailTrackBudgetService, private retailTrackBudgetFormService: PfmbudgetService, private _httpProvider: HttpProviderService, private _router: Router,
      private _appConfig:AppConfigService) {
    super(new RetailTrackBudgetFormState());
  }

  override doPreInit(): void {
 this.setServiceCode("RETAILPFMBUDGETREQ");
 this.state.budgetSegmentList$ = of([
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
 }
   


  public override doPostInit(): void {
   this.setValue("budgetSegments", "ALL");
    this.addValueChangeHandler("budgetSegments", this.handlebudgetSegmentsOnvalueChange);
    this.handleFormOnload();
  }
  handleFormOnload(){
     if (this._appConfig.hasData('pfmActionPublisher$')) {
        this._appConfig.getData('pfmActionPublisher$').observable.subscribe(
          (res: any) => {
            if(res?.action == "DELETEBUDGET"){
              this.setValue('categoryCode',res.budgetData.categoryCode.categoryCode);
              this.setValue('pfmSubCategory',res.budgetData.pfmSubCategory);
              this.setValue('currencyCode',res.budgetData.currencyCode);
              this.setValue('budgetAmount',res.budgetData.budgetAmount);
              this.setValue('startDate',res.budgetData.startDate);
              this.setValue('endDate',res.budgetData.endDate);
              this.setValue('frequency',res.budgetData.budgetFrequency);
              this.triggerSubmit();
            }
          }
        );
      }
  }
  public handlebudgetSegmentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const criteriaQuery = new CriteriaQuery();
    if (value != "ALL") {
      criteriaQuery.addFilterCritertia("budgetFrequency", "String", "equals", {
        searchText: value,
      });
    }
    this.setGridCriteria("budgetGrid", criteriaQuery);
  }
 
  public override preSubmitInterceptor(payload: Pfmbudget):any {
     // WRITE CODE HERE TO HANDLE 
    payload.operationMode='D';
    return payload;
  }

  trackBudgetRoGridEvent($event:any){
      if($event.eventName == 'afterDataFetch'){
        this.state.isDataReceived = true;
        this.state.gridData = $event.payload;
      }
  }
 public override postDataFetchInterceptor(payload: Pfmbudget){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
   let res:any;
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      res=response.success?.body?.pfmbudgetreq;
      routingInfo.setQueryParams({
        // transRef: response.success?.body?.pfmbudget.categoryCode.customerCode.tenantId,
        response:res,
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


