import { Inject, Injectable } from "@angular/core";
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
import { RetailtaxformfilterformService } from "../retailtaxformfilterform-service/retailtaxformfilterform.service";
import { Retailtaxformfilterform } from "../retailtaxformfilterform-service/retailtaxformfilterform.model";
import { DeviceDetectorService } from "@dep/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import moment from "moment";
export class RetailTaxFormFilterFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	dateFrom:any={
	   minDate: "",
       maxDate: "",
     }
	dateTo:any={
	   minDate: "",
       maxDate: "",
     }
     formValues: any;
     startDate: any
     endDate: any
}


@Injectable()
export class RetailTaxFormFilterFormHelper extends BaseFpxFormHelper<RetailTaxFormFilterFormState>{

   constructor( private retailTaxFormFilterFormService: RetailtaxformfilterformService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
    public deviceDetectorService: DeviceDetectorService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any
  ) 
    {
        super(new RetailTaxFormFilterFormState());
    }
   
  override doPreInit(): void {
  this.hideShellActions();
 this.setServiceCode("RETAILGETTAXFORMS");
 this.addValueChangeHandler("dateFrom", this.handleFromDateOnvalueChange);
 this.addValueChangeHandler("dateTo", this.handleToDateOnvalueChange);
 let newDate = new Date();
 this.state.dateFrom.minDate = moment(newDate).subtract(7, 'years');
 this.state.dateFrom.maxDate = new Date();
 this.state.dateTo.maxDate = new Date();
 this.state.dateTo.minDate = this.state.dateFrom.minDate;
 }
 public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    this.reset('dateTo','');
    this.state.dateTo.minDate = value;
    this.state.startDate=this.getValue('dateFrom');

  }
}
public handleToDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    this.state.endDate=this.getValue('dateTo');
  }
} 

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('dateFrom', this._dialogData?.dateFrom);
    this.setValue('dateTo', this._dialogData?.dateTo);
    
  }
  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    this.reset('dateFrom');
    this.reset('dateTo');
  }
  public onViewClick: BaseFpxControlEventHandler = (payload: any) => {
    // let raw=this.formGroup.getRawValue();
    this.state.formValues = {
      ...this.formGroup.value,
      dateFrom: this.state.startDate,
      dateTo: this.state.endDate,
    }
    this._dialogRef.close(this.state.formValues);
  }
  public override preSubmitInterceptor(payload: Retailtaxformfilterform):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Retailtaxformfilterform){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
close() {
  this._dialogRef.close(0);
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailtaxformfilterform,
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
 

