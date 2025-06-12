import { inject, Injectable } from "@angular/core";
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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { TasklogService } from "../tasklog-service/tasklog.service";
import { Tasklog } from "../tasklog-service/tasklog.model";
import { GoalsService } from "../goals-service/goals.service";
import { TasksService } from "../tasks-service/tasks.service";
 
export class RetailAddTaskFromState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	dueDate:any={
	   minDate:"",
       maxDate:"",
     }
	rewardAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : true,
	}
  mode: string = "";
  inventoryNumber: string = "";
}


@Injectable()
export class RetailAddTaskFromHelper extends BaseFpxFormHelper<RetailAddTaskFromState>{
  currentDateAndTime: any;
  proof:boolean = false;

   constructor( private retailAddTaskFromService: TasklogService, private _httpProvider : HttpProviderService,private _router: Router, private _datePipe:DatePipe, private appConfigService: AppConfigService,private _appConfig: AppConfigService,private taskService:TasksService, private goalsService: GoalsService) 
    {
        super(new RetailAddTaskFromState());
    }
   
  override doPreInit(): void {
    this.setServiceCode("RETAILTASKINFO");
    this.addValueChangeHandler("proofRequired", this.handleProofRequiredOnvalueChange);
   // this.addValueChangeHandler("rewardCurrency", this.handleRewardCurrencyOnvalueChange);
   // this.addControlEventHandler("mappedGoal", this.onGoalListDataReceived);
   this.addValueChangeHandler("childAccNo", this.handleChildAccountNumberOnvalueChange);
   this.decisionOnLoad();
 }
   

  public override doPostInit(): void {
    this.currentDateAndTime = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.state.mode = this.getRoutingParam("mode");
    this.setValue('rewardAmount', { currencyCode: this.appConfigService.baseCurrency });
    // this.addControlEventHandler("mappedGoal", this.onGoalListDataReceived);
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Tasklog):any {
     // WRITE CODE HERE TO HANDLE 
     payload.rewardCurrency=payload.rewardAmount.currencyCode;
     payload.rewardAmount=payload.rewardAmount.amount;
     payload.operationMode = this.state.mode || "A";
     payload.status='P';
     if(this.state.mode == "M") payload.inventoryNumber = this.state.inventoryNumber;
     
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Tasklog){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleProofRequiredOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      // this.proof = true;
      this.setHidden('supportingDocument', true);
    } else {
      // this.proof = false
      this.setHidden('supportingDocument', false);
    }
    
  };

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
		// WRITE CODE HERE TO HANDLE
		if (response.success) {
			let res: any = response.success?.body?.tasklog;
			routingInfo.setQueryParams({
				response: res
			});
		}
		else if (response.error) {
			let error: any = response.error.error;
			routingInfo.setQueryParams({
				response: error,
				serviceCode: this.serviceCode.value
			});
		}
		return response;
	}

  public handleChildAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.goalsService.fetchGoals(value).subscribe({
      next: (res: any) => {
				let goalList:any=res?.childList;
				goalList.map((item:any) =>{
					item.id = item.goalname;
					item.text=item.goalname;
				}
			);
        this.setStaticDropdown('mappedGoal',goalList);
				// this.setSelectableData(of(goalList));
			}
    })

  }

  public handleFormOnLoad() {
    if (this.state.mode == "M") {
      let inventoryNumber: any = this.getRoutingParam('inventoryNumber');
      let chAccNo = this._appConfig.getData('childAccNo');
      let key: any = {
        inventoryNumber: inventoryNumber,
        childAccNo: chAccNo
      }
      this.taskService.findByKey(key)().subscribe((res: any) => {
        console.log("qwerty",res);
        
        if (res) {
          this.setValue('taskName', res?.taskName);
            this.setValue('childAccNo', res?.childAccNo);
          this.setValue('debitAccNo', res?.debitAccNo.accountNumber);
            this.setValue('dueDate', res?.dueDate);
            this.setValue('rewardAmount', { amount: res?.rewardAmount ,currencyCode:res?.rewardCurrency });
            this.setValue('remarks', res?.remarks);
            this.setValue('mappedGoal', res?.mappedGoal);
            this.setValue('proofRequired', res?.proofRequired);
            this.setValue('taskInventoryNumber', res?.inventoryNumber);

        }
      },
      )
      this.setReadonly('childAccNo', true);
      
    }
  }
 

 public decisionOnLoad() {
  if (this.getRoutingParam("action") == "DECISION") {
    let inventoryNumber: any = this.getRoutingParam('inventoryNumber');
    let key: any = {
      inventoryNumber: inventoryNumber,
    }
    this.retailAddTaskFromService.findByKey(key)().subscribe((res: any) => {
      console.log("qwerty",res);
      
      if (res) {
        this.setValue('taskName', res?.taskName);
          this.setValue('childAccNo', res?.childAccNo);
        this.setValue('debitAccNo', res?.debitAccNo);
          this.setValue('dueDate', res?.dueDate);
          this.setValue('rewardAmount', { amount: res?.rewardAmount ,currencyCode:res?.rewardCurrency });
          this.setValue('proofRequired', res?.startDate);
          this.setValue('remarks', res?.remarks);
          this.setValue('mappedGoal', res?.mappedGoal);
          this.setValue('proofRequired', res?.proofRequired);
          this.setValue('taskInventoryNumber', res?.inventoryNumber);
      }
    },
    )      
  }
}

}
 

