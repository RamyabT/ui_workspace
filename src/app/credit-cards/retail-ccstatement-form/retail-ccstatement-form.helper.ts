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
import { CcstatementService } from '../ccstatement-service/ccstatement.service';
import { Ccstatement } from '../ccstatement-service/ccstatement.model';
import moment from "moment";
import { formatDate } from "@angular/common";
export class RetailCcstatementFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   LogDate = new Date();
	fromDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
	toDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
}


@Injectable()
export class RetailCcstatementFormHelper extends BaseFpxFormHelper<RetailCcstatementFormState>{
  ccstatementdetail! : FormArray;

   constructor( private retailCcstatementFormService: CcstatementService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailCcstatementFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCCSTATEMENT");
 }
   
public handleFormOnLoad(){
	 // WRITE CODE HERE TO HANDLE
	this.setValue('transactionsRange','3');
	this.setValue('toDate',formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US'));
  let newDate:any=new Date();
  let date:any=newDate.getDate();
	this.setValue('fromDate',formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US'));
	}
public handleTransactionsRangeOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
  let newDate:any=new Date();
  let date:any=newDate.getDate();
  let toDate:any=moment(newDate).format("YYYY-MM-DD");
  let dateReset:any=new Date(newDate.setDate(newDate.getDate() - Number(date) + 5));
  let finalDate:any=dateReset.setMonth(dateReset.getMonth() - 1);;
  let lastDate:any=new Date(dateReset.getFullYear(), dateReset.getMonth() + 1, 4);
   if (value == "3") {
	this.setValue('toDate',toDate);
this.state.toDate.maxDate = toDate;
	this.setValue('fromDate',formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US'));
   this.setReadonly('fromDate',false);
   this.setReadonly('toDate',false);
  	}
    else if  (value == "1") {
	this.setValue('fromDate',formatDate(finalDate, 'yyyy-MM-dd', 'en-US'));
	this.setValue('toDate',formatDate(lastDate, 'yyyy-MM-dd', 'en-US'));
   this.setReadonly('fromDate',true);
   this.setReadonly('toDate',true);
 	}
    else{
  let lastDate:any=new Date(dateReset.getFullYear(), dateReset.getMonth() + 1, 5);
	this.setValue('fromDate',formatDate(lastDate, 'yyyy-MM-dd', 'en-US'));
	this.setValue('toDate',formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US'));
   this.setReadonly('fromDate',true);
   this.setReadonly('toDate',true);
  	}
}

  public override doPostInit(): void {
 this.ccstatementdetail=this.formGroup.get("ccstatementdetail") as FormArray;
 this.addValueChangeHandler("transactionsRange", this.handleTransactionsRangeOnvalueChange);
  
 this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Ccstatement):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Ccstatement){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.ccstatement.cardRefNumber,
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
 
 
