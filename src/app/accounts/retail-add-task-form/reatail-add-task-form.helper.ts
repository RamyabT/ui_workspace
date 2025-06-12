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
import { TasklogService } from '../tasklog-service/tasklog.service';
import { Tasklog } from '../tasklog-service/tasklog.model';
import { DatePipe } from "@angular/common";
import { AppConfigService } from "@dep/services";
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

   constructor( private retailAddTaskFromService: TasklogService, private _httpProvider : HttpProviderService,private _router: Router, private _datePipe:DatePipe, private appConfigService: AppConfigService,private _appConfig: AppConfigService,private taskLogService: TasklogService) 
    {
        super(new RetailAddTaskFromState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILTASKINFO");
 this.addValueChangeHandler("proofRequired", this.handleProofRequiredOnvalueChange);
// this.addValueChangeHandler("rewardCurrency", this.handleRewardCurrencyOnvalueChange);
 }
   

  public override doPostInit(): void {
    this.currentDateAndTime = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.state.mode = this.getRoutingParam('mode') || "A";
    this.setValue('rewardAmount', { currencyCode: this.appConfigService.baseCurrency });
  }
  
 
  public override preSubmitInterceptor(payload: Tasklog):any {
     // WRITE CODE HERE TO HANDLE 
     payload.rewardCurrency=payload.rewardAmount.currencyCode;
     payload.rewardAmount=payload.rewardAmount.amount;
     payload.operationMode = this.state.mode;
     payload.status='S';
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


 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

