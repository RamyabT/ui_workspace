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
  FpxModal,
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { GoallogService } from '../goallog-service/goallog.service';
import { Goallog } from '../goallog-service/goallog.model';
import { AppConfigService } from "@dep/services";
import { FormBuilder } from '@angular/forms'; 
import { GoalsService } from "../goals-service/goals.service";

export class RetailAddGoalState extends BaseFpxComponentState {
  //nidhi
   private _appConfig: AppConfigService = inject(AppConfigService);
  //nidhi
 	showSuggestion : boolean = false;
	targetAmt:any={
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
     amountInWords : false,
     initCurrency : this._appConfig.baseCurrency,
     defaultFetch : true, 

	}
	dueDt:any={
	   minDate:"",
       maxDate:"",
     }
	initialContribution:any={
      isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
     amountInWords : false,
     initCurrency : this._appConfig.baseCurrency,
     defaultFetch : true, 
	}
  //nidhi 
  mode: string = "";
  inventoryNumber: string = "20250318121441003310"; 

 // this.onDueDateChange();
  //nidhi  
  
}


@Injectable()
export class RetailAddGoalHelper extends BaseFpxFormHelper<RetailAddGoalState>{

   constructor( private retailAddGoalService: GoalsService, private _httpProvider : HttpProviderService,private _router: Router,
        private _appConfig: AppConfigService,private appConfigService: AppConfigService,private fb: FormBuilder
   ) 
    {      
        super(new RetailAddGoalState());
         
    }

  override doPreInit(): void {
    
 this.setServiceCode("RETAILGOALINFO");
//  if(this.formMode=='MODIFY'){
//   this.addSubmitHandler('submit', this.customSubmitHandler);
//  }
 }

 //nidhi 
 public handleFormOnLoad() {
    
  if(this.state.mode == "M"){
    this.state.inventoryNumber = this.getRoutingParam('inventoryNumber');

    let key: any = {
      inventoryNumber: this.state.inventoryNumber
    }

    this.retailAddGoalService.findByKey(key)().subscribe({
      next: (res: any) => {
        if (res) {
          this.setValue('goalname', res?.goalName);
          this.setValue('childAcc', res?.childAcc);
          this.setValue('targetAmt', { amount: res?.targetAmt });
          this.setValue('debitAcc', res?.debitAcc);
         this.setValue('initialContribution', { amount: res?.contributionAmount });
         //this.setReadonly('initialContribution', true);
          this.setValue('dueDt', res?.dueDt);
          // this.validateDueDate(res?.dueDt);
          this.setValue('goalInventoryNumber', res?.inventoryNumber);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.setReadonly('mode', true);
  } 
  if(this.state.mode == "D"){
    this.state.inventoryNumber = this.getRoutingParam('inventoryNumber');
    let key: any = {
      inventoryNumber: this.state.inventoryNumber
    }
    this.retailAddGoalService.findByKey(key)().subscribe({
      next: (res: any) => {
        if (res) {
          this.setValue('goalname', res?.goalName);
          this.setValue('childAcc', res?.childAcc);
          this.setValue('targetAmt', { amount: res?.targetAmt });
          this.setValue('debitAcc', res?.debitAcc);
          this.setValue('initialContribution', { amount: res?.contributionAmount });
          this.setValue('dueDt', res?.dueDt);
          this.setValue('goalInventoryNumber', res?.inventoryNumber);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.setReadonly('mode', true);
  } 

}

 //nidhi

  public override doPostInit(): void {
  //nidhi
  this.state.mode = this.getRoutingParam('mode');
  this.setValue('targetAmt', { currencyCode: this.appConfigService.baseCurrency });
  this.setValue('initialContribution', { currencyCode: this.appConfigService.baseCurrency });
  //this.subscribeToDueDateChanges();
  this.handleFormOnLoad();
  //nidhi
  }
 
 
  public override preSubmitInterceptor(payload: Goallog):any {
     payload.targetAmt=payload.targetAmt.amount;
     payload.initialContribution=payload.initialContribution.amount;
    // payload.operationMode = this.state.mode;
     payload.operationMode = this.state.mode || "A";
    
    payload.mode = this.state.mode;
    // if(this.state.mode == "M") {
    //   payload.inventoryNumber = this.state.inventoryNumber;
    // }  
    if(this.state.mode == "M") {
      payload.goalInventoryNumber = this.state.inventoryNumber;
    } 
    else if(this.state.mode == "D") {
      payload.goalInventoryNumber = this.state.inventoryNumber;
    } 


    payload.status='P';
     //nidhi

    return payload;
  }
  
 public override postDataFetchInterceptor(payload: Goallog){
  return payload;
}

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.goallog;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);

    return routingInfo;
  }
 
//02-04-2025 
private validateDueDate(dueDate: string): void {
  const today = new Date();
  const selectedDate = new Date(dueDate);
  if (selectedDate <= today) {  
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 1); // Set to tomorrow
      this.setValue('dueDt', futureDate.toISOString().split('T')[0]); // Format as 'yyyy-MM-dd'
      //console.warn('Due date must be in the future. Setting to tomorrow.');
      window.alert('Please select a future date for due date.'); 
  }
}

// public onDueDateChange(selectedDate: string): void {
//   const today = new Date();
//   const chosenDate = new Date(selectedDate);
//   if (chosenDate <= today) {
//       window.alert('Please select a future date for due date.'); 
//       this.setValue('dueDt', ''); 
//   } else {
//       this.setValue('dueDt', selectedDate); 
//   }
// } 

 
//nidhi

}
 

