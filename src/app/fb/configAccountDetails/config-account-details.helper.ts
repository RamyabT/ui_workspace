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
import { ChildreqaccountdtlService } from '../childreqaccountdtl-service/childreqaccountdtl.service';
import { Childreqaccountdtl } from '../childreqaccountdtl-service/childreqaccountdtl.model';
import { AppConfigService } from "@dep/services";
import { DatePipe } from "@angular/common";
import { ChildlogService } from "../childlog-service/childlog.service";
export class configAccountDetailsState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	initialBalance:any={
	  isCurrEditable: true,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	recurringAmount:any={
	  isCurrEditable: true,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
	   initCurrency : this._appConfig.baseCurrency,
	}
	startDate:any={
	   minDate:"",
       maxDate:"",
     }
	endDate:any={
	   minDate:"",
       maxDate:"",
     }
}


@Injectable()
export class configAccountDetailsHelper extends BaseFpxFormHelper<configAccountDetailsState>{
  frequencyMultipliers: { [key: string]: number } = {
    '1': 1,
    '2': 3,
    '3': 6,
    '4': 12,
    '5': 0
  };
  startDate:any
   constructor( private configAccountDetailsService: ChildreqaccountdtlService, private _httpProvider : HttpProviderService,private _router: Router, private datePipe: DatePipe , private _childlog : ChildlogService) 
    {
        super(new configAccountDetailsState());
    }
   
  override doPreInit(): void {
//  this.setServiceCode("childreqaccountdtl");
 this.setReadonly("endDate",true);
 }
   

  public override doPostInit(): void {
    this.addValueChangeHandler("recurringfrequency", this.noOfPaymentsOnvalueChange);
    this.addValueChangeHandler("startDate", this.noOfPaymentsOnvalueChange);
    this.addValueChangeHandler("noOfInstallments", this.noOfPaymentsOnvalueChange);
    this.addValueChangeHandler("debitAccNo", this.debitAccNoOnvalueChange);
  }

  public noOfPaymentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const startDate = this.getValue('startDate');
    const numberOfPayments = this.getValue('noOfInstallments');
    const frequency = this.getValue('recurringfrequency');

    if (frequency && startDate && numberOfPayments) {
      const startDateObj = new Date(startDate);
      let monthsToAdd = (this.frequencyMultipliers[frequency] || 0) * numberOfPayments;
      let endDate: Date;

      if (frequency === '5') {
        endDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
      }
      else {
        endDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + monthsToAdd, startDateObj.getDate() - 1);
      }
      let endDateF = this.datePipe.transform(endDate, 'yyyy-MM-dd')
      this.setValue("endDate", endDateF);
    }
  }

  public debitAccNoOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(value);  
    this._childlog.accNumberValue.next(value);
  }

 
  public override preSubmitInterceptor(payload: Childreqaccountdtl):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Childreqaccountdtl){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.childreqaccountdtl.tenantId.inventoryNumber,
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
 

