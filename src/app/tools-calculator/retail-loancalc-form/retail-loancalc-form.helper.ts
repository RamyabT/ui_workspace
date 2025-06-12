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
import { LoancalcService } from "../loancalc-service/loancalc.service";
import { Loancalc } from "../loancalc-service/loancalc.model";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import moment from "moment";
import { AppConfigService } from "@dep/services";

export class RetailLoanCalcFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
  

	downPaymentAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
	vehicleCost:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
	propertyValue:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
  
  LogDate = new Date()
	// requestDate:any={
	//    minDate: "",
  //      maxDate: ""
      
  // }
  startDate:any
     endDate:any
 

     tenureLabel: any = {
      text: " <span></span><span></span><span>Loan Tenure</span>"
    }

    loanamtsliderMonth: any = {
      min: 5000,
      max: 100000,
      step: 100,
      currencyCode: ''
    }
    loanamtsliderYear: any = {
      min: 100,
      max: 1000,
      step: 100,
      currencyCode: ''
    }

  //  	loanAmount:any={
  //     min: 100,
  //       max: 1000000,
  //       step: 100,
  //       currencyCode: ''
  //  }

//   tenure:any={
//     min: 1,
//     max: 12,
//     step: 1,
//     currencyCode: ''
// }  

   	loanAmount:any={
      min: '',
        max: '',
        step: 100,
        currencyCode: ''
   }
  
  //  tenure:any={
  //       min: '',
  //       max: '',
  //       step: 1,
  //       currencyCode: ''
  //  }  
   tenure: any = {
    min: 1,
    max: 12,
    step: 1,
    currencyCode: ''
  }

   loantenureMonthslider: any = {
    min: 1,
    max: 12,
    step: 1,
    currencyCode: ''
  }
  loantenureYearslider: any = {
    min: 1,
    max: 5,
    step: 1,
    currencyCode: ''
  }
  // loantenureslider: any = {
  //   min: 1,
  //   max: 12,
  //   step: 1,
  //   currencyCode: ''
  // }

  requestDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
     
}


@Injectable()
export class RetailLoanCalcFormHelper extends BaseFpxFormHelper<RetailLoanCalcFormState>{
  public tenureYMode = true;
   constructor( private retailLoanCalcFormService: LoancalcService,
     private _httpProvider : HttpProviderService,
     private _router: Router,
     private momentService: MomentService,
    private _appConfig:AppConfigService,
    private loancalculatorService: LoancalcService) 
    {
        super(new RetailLoanCalcFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANCALCULATOR");
 this.setDisbursementDate();
 this.setTenureYear(true);


 let currencyCode = this._appConfig.baseCurrency;
 this.state.loanAmount.currencyCode = currencyCode;
 this.state.loanamtsliderMonth.currencyCode = currencyCode;
 this.state.loanamtsliderYear.currencyCode = currencyCode;
 }
   

 public handleFormOnLoad() {
      this.setReadonly('requestDate',true);
      this.setReadonly('loanAmount',true);
      this.setReadonly('tenure',true);
      this.setReadonly('loantenurevalue',true);
 }



public handleLoanProductTypeOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {
   // WRITE CODE HERE TO HANDLE 
     //tool generated code based on Orchestration Instructions

     this.callLoanTypeLookupAPI(value);
     this.setReadonly('requestDate',false);
     this.setReadonly('loanAmount',false);
     this.setReadonly('tenure',false);
     this.setReadonly('loantenurevalue',false);
}

public handleloantenurevalueOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {

  if (value && !isNaN(value) && value!=null) {
    value = +value;
    if (value >= this.state.tenure.min && value <= this.state.tenure.max) {
      this.setValue("tenure", value);
    }
    else {
      this.setErrors("tenure", "pattern");
    }
  }
  else {
    this.setErrors("tenure", "required");
  }

  // this.setValue('loantenurevalue',value);
}

public handleloantenuresliderOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {

  this.setValue('loantenurevalue', value);
}





setTenureYear(mode: boolean) {
  this.tenureYMode = mode;
  this.state.tenure = this.state.loantenureMonthslider; //month mode

  if (mode) //year mode
  {
    this.state.tenure = this.state.loantenureYearslider; //month mode
  }
  this.setValue('loantenurevalue', this.state.tenure.min);
  this.setValue('tenure', this.state.tenure.min);
  this.setLoanAmountYear(mode);
}

setLoanAmountYear(mode: boolean) {
  this.state.loanAmount = this.state.loanamtsliderMonth; //month mode

  if (mode) //year mode
  {
    this.state.loanAmount = this.state.loanamtsliderYear;
  }

  this.setValue("loanAmount", this.state.loanAmount.min);
}


public handleloanamtslidervalueOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if(value && status=='VALID'){
    // _helper.tenureYMode?month:yes
    //_helper.tenureYMode?5:12
    if(this.tenureYMode){
      if(value<100){
        this.setErrors("loanamtslider", "minAmountErr",{minamount:"100"});
      }else if(value>100000){
        this.setErrors("loanamtslider", "maxAmountErr",{maxamount:"100000"});
      }
    }else{
      if(value<1){
        this.setErrors("loanamtslider", "minAmountErr",{minamount:"1"});
      }else if(value>5000){
        this.setErrors("loanamtslider", "maxAmountErr",{maxamount:"5000"});
      }
    }
  }

}

  public override doPostInit(): void {
    // this.addValueChangeHandler("loanType", this.handleLoanTypeOnvalueChange);
    this.addValueChangeHandler("tenure", this.handleloantenuresliderOnvalueChange);
    this.addValueChangeHandler("loantenurevalue", this.handleloantenurevalueOnvalueChange);
    this.addValueChangeHandler("loanAmount", this.handleloanamtslidervalueOnvalueChange);
    this.addValueChangeHandler("loanProductType", this.handleLoanProductTypeOnvalueChange);
    this.handleFormOnLoad();
  }
  public handleFormOnPresubmit(payload:any){
    // WRITE CODE HERE TO HANDLE
  
   let loantenurevalue = this.getValue('loantenurevalue');
   loantenurevalue = (this.tenureYMode) ? (loantenurevalue * 12) : loantenurevalue; 
   payload.loanType = this.getValue("loanProductType");
   payload.tenure = loantenurevalue;
   let formData={
    loanAmount: this.getValue('loanAmount'),
    tenure: this.getValue('loantenurevalue'),
    currency: this._appConfig.baseCurrency,
    loanType: this.getValue('loanProductType')
};
   this._appConfig.setData('formData',formData);

  }

  public override preSubmitInterceptor(payload: Loancalc):any {
     // WRITE CODE HERE TO HANDLE 
     this.handleFormOnPresubmit(payload);
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Loancalc){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      this._appConfig.setData('loansBreakUpData',response.success.body);
      setTimeout(() => {
        this._router.navigate(['tools-space','display-shell','tools-calculator','app-loans-breakup']);
        }, 500);
      routingInfo.setQueryParams({
        transRef: response.success?.body?.loancalc.loanType,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }

  setDisbursementDate() {
    const moment = require('moment'); // import moment.js
    // Get current date
    const currentDate = moment().format("YYYY-MM-DD");;

    // Get minimum date as tomorrow
    const tomorrowDate = moment().add(1, 'days').format("YYYY-MM-DD");;

    // Get maximum date as three months from now
    const threeMonthsLater = moment().add(3, 'months').format("YYYY-MM-DD");;

    this.state.requestDate.minDate = tomorrowDate;
    this.state.requestDate.maxDate = threeMonthsLater;
    this.setValue('requestDate', tomorrowDate);
  }

  callLoanTypeLookupAPI(id: string) {
    let thisme: any = this;
    this.loancalculatorService.loanTypelookup(id)().subscribe(function (response: any) {

      if (response?.body) {
        let data: any = response.body;
        if (data.loanproducts) {
          let loanproducts: any = data.loanproducts;
          let loanparameters: any = loanproducts.loanparameters;
          if (loanparameters.length > 0) {
            loanparameters.forEach(function (element: any) {
              if (element.tenorUnit == "M") {
                thisme.state.loanAmount.min = element.minimumAmount;
                thisme.state.loanAmount.max = element.maximumAmount;
                thisme.state.tenure.min = element.minimumUnits;
                thisme.state.tenure.max = element.maximumUnits;
              }
              else if (element.tenorUnit == "Y") {
                thisme.state.loanAmount.min = element.minimumAmount;
                thisme.state.loanAmount.max = element.maximumAmount;
                thisme.state.tenure.min = element.minimumUnits;
                thisme.state.tenure.max = element.maximumUnits;
              }
            });
            thisme.setTenureYear(thisme.tenureYMode);
          }

          let loanAllowedCurrency: any = loanproducts.loanAllowedCurrency;
          if (loanAllowedCurrency.length > 0) {
            // loanAllowedCurrency[0]['currencyCode'];
          }
        }
      }

    });
  }

 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

