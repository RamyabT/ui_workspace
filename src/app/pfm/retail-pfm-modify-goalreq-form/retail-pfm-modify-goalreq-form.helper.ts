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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PfmgoalsreqService } from '../pfmgoalsreq-service/pfmgoalsreq.service';
import { Pfmgoalsreq } from '../pfmgoalsreq-service/pfmgoalsreq.model';
export class RetailPfmModifyGoalReqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	goalAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
	startDate:any={
	   minDate:"",
       maxDate:"",
     }
	advanceDebitAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
	debitAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
	accruedAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
}


@Injectable()
export class RetailPfmModifyGoalReqFormHelper extends BaseFpxFormHelper<RetailPfmModifyGoalReqFormState>{

   constructor( private retailPfmModifyGoalReqFormService: PfmgoalsreqService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailPfmModifyGoalReqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILMODIFYPFMGOALSREQ");
 }
//  public handleFormOnLoad(){
//   let key: any = {
//    // cardRefNumber: this.cardData?.cardRefNumber,
//   };
//   this.retailPfmModifyGoalReqFormService
//   .fetchPfmGoals(key)()
//   .subscribe((res) =>  {
//         if (res) {
//           // this.setValue('lastName', res.lastName);
//           // this.setValue('dob', res.dob);
         
//           // this.setValue('postalCode', res.addresses[0].pincode);

//         }})

//   this.setReadonly('lastName',true);
//   this.setReadonly('postalCode',true);
//   this.setReadonly('dob',true);
//  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("goalDuration", this.handlegoalDurationOnvalueChange);
    this.addValueChangeHandler("advanceDebitAmount", this.handleadvanceDebitAmountOnvalueChange);
    this.addValueChangeHandler("goalAmount", this.handlegoalAmountOnvalueChange);
  }
  calculateContributionAmount(){
    if(this.getValue('goalAmount') && this.getValue('advanceDebitAmount') && this.getValue('goalDuration')){
     let goalAmount= this.getValue('goalAmount');
     let advanceDebitAmount =this.getValue('advanceDebitAmount');
      let goalDuration = this.getValue('goalDuration');
      let debitAmount =(goalAmount.amount - advanceDebitAmount.amount) / goalDuration;
      debitAmount=Math.floor(debitAmount);
      this.setValue('debitAmount',{amount:debitAmount,currency: goalAmount.currency});
  }
  }
  public handlegoalAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
   ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value && this.getValue('advanceDebitAmount').amount>=0){
      if(value.amount>this.getValue('advanceDebitAmount').amount){
        this.calculateContributionAmount();
      }
      else{
        this.setErrors('goalAmount','minGoalAmt')
      }
    }
    
  }
  
  
  public handleadvanceDebitAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
   ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.calculateContributionAmount();
    }
    
  }
  public handlegoalDurationOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
   ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.calculateContributionAmount();
    }
    
  }
public handleFormOnLoad(){
  let inventoryNumber:any= this.getRoutingParam('inventoryNumber');
  let key: any = {
    inventoryNumber: inventoryNumber
  }

  this.retailPfmModifyGoalReqFormService.findByKey(key)().subscribe((res: any) => {
      if (res) {
        this.setValue('goalName', res?.goalName);
        this.setValue('goalAmount', { amount: res?.goalAmount});
        this.setValue('debitAccount', res?.debitAccount);
        this.setValue('advanceDebitAmount',{ amount: res?.advanceDebitAmount});
        this.setValue('goalDuration', res?.goalDuration);
        this.setValue('startDate', res?.startDate);
        this.setValue('frequency', res?.frequency);
        this.setValue('goalInventoryNumber',res?.inventoryNumber);
      }
    },
  )

  
  //this.setReadonly('budgetAmount',true);
 
   
  this.setReadonly('advanceDebitAmount',true);
  this.setReadonly('debitAmount',true);
  this.setReadonly('mode',true);
  
 }
 

  public override preSubmitInterceptor(payload: Pfmgoalsreq):any {
     // WRITE CODE HERE TO HANDLE 
     payload.mode='M';
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Pfmgoalsreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.pfmgoalsreq.tenantId.inventoryNumber,
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
 

