import { Injectable, inject } from "@angular/core";
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
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import moment from "moment";
import { formatDate } from "@angular/common";
import { AccountStmtReq } from "../accountStmtReq-service/accountStmtReq.model";
import { AccountStmtReqService } from "../accountStmtReq-service/accountStmtReq.service";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailAdhocAccStmtReqFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
	fromDate:any={
	   minDate: "",
       maxDate: "",
     }
	toDate:any={
	   minDate: "",
       maxDate: "",
     }
     chargesAmount:any={
      isCurrEditable: true,
      CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
       amountInWords : false,
       initCurrency : this._appConfig.baseCurrency,
       defaultFetch : false,
    }
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	Disclaimer:any={
	 text:" Sample Text"
	}
  address: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
    email: "",
    mobile: ""
  }
  communicationInfo:any
  LogDate = new Date()
  startDate: any
  endDate: any
  customerEmail:string ="";
  email: any;
}


@Injectable()
export class RetailAdhocAccStmtReqFormHelper extends BaseFpxFormHelper<RetailAdhocAccStmtReqFormState>{
  address! : FormGroup;
   constructor( private retailAdhocAccStmtReqFormService: AccountStmtReqService,
    private userService:CustomerService,
    private appConfigService:AppConfigService,
    private _httpProvider : HttpProviderService,private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) 
    {
        super(new RetailAdhocAccStmtReqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILADHOCACCSTMT");
 }

 public handleFormOnLoad() {
  if(this.formMode =='VIEW'){
    if(this.formGroup.controls['reason'].value == '4'){
      this.setHidden('otherReason',false);
      this.setDisabled('otherReason',true);
  }
  else{
    this.setHidden('otherReason',true);
  }
  if(this.getValue('deliveryOption')=='1'){
  this.setValue('deliveryOption','1');
  this.setHidden('address',true);
  this.setHidden('branch',false);
  this.setHidden('emailId',true);
  this.setDisabled('branch',true);
  }
  else if(this.getValue('deliveryOption')=='2')
  {
  this.setValue('deliveryOption','2');
  this.setHidden('address',false);
  this.setHidden('emailId',true);
  this.setHidden('branch',true);
  this.setHidden('chargesAmount',true);
  }
  else{
    this.setValue('deliveryOption','3');
    this.setHidden('address',true);
    this.setHidden('branch',true);
    this.setHidden('emailId',false);
    this.setHidden('chargesAmount',true);

  }
}
else{
  this.setValue('termsFlag',null);
  let accNum = this._activeSpaceInfoService.getAccountNumber();
  if (accNum) {
    this.setValue('accountNumber', accNum);
  }
  this.setValue('deliveryOption','2');
  this.setHidden('address',false);
  this.setHidden('email',true);
  this.setValue('requestFor','1');
  this.setHidden('otherReason',true);
  this.setReadonly('fromDate',true);
  this.setReadonly('toDate',true);
  // this.setHidden('emailId',false);
  // this.setReadonly('emailId', true);
  this.setHidden('chargesAmount',true);
  this.state.chargesAmount.amount = 5;
  this.setAmountCurrencyList('chargesAmount',[{
    id:this.appConfigService.baseCurrency,text:this.appConfigService.baseCurrency}]);
    this.setValue('chargesAmount',{amount:this.state.chargesAmount.amount,currencyCode:this.getValue('currency')})
  this.setReadonly('chargesAmount',true);



        let newDate = new Date();
        let date = newDate.getDate();
        this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US');
        this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
        this.setValue('fromDate',this.state.startDate);
        this.setValue('toDate',this.state.endDate);
  }

}

public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

  if (payload) {
    this.state.address.buildingDetails = payload.buildingId + "," + payload.buildingName;
    this.state.address.cityDetails = payload.city;
    this.state.address.stateDetails = payload.stateName;
    this.state.address.countryDetails = payload.countryName;
    this.state.address.pinCode = payload.pincode;
    this.setValue('addressInformation',this.state.address.buildingDetails+","+this.state.address.cityDetails+","+this.state.address.stateDetails+","+this.state.address.countryDetails+","+this.state.address.pinCode);
    this.state.email=payload.emailId;
    
  }

}
 public handleReasonOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {
    if(this.formGroup.controls['reason'].value == '4'){
      this.setHidden('otherReason',false);
  }
  else{
    this.setHidden('otherReason',true);
    this.reset('otherReason',true);
  }
   // WRITE CODE HERE TO HANDLE 
     //tool generated code based on Orchestration Instructions
}

 public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {

    if (value == '2') {
      //this.setHidden('deliveryBranch', true);
      this.setHidden('branch', true);
      this.setHidden('address',false);
      this.setHidden('emailId',true);
      this.setHidden('chargesAmount',true);
      this.reset('branch')
      if(!this.state.address|| (this.state.address.buildingDetails && this.state.address.cityDetails && this.state.address.pinCode && this.state.address.stateDetails) ==""){
        this.formGroup.get('deliveryOption')?.markAsTouched()
      }
      }
      if(value=='3'){
       this.setReadonly('emailId',true);
       this.setHidden('address', true);  
       this.setHidden('branch', true);
       this.setHidden('emailId',false);
       this.setValue('emailId',this.state.email);
       this.setHidden('chargesAmount',true);
      }
      if(value=='1'){    
      this.setHidden('address', true);  
      this.setHidden('emailId',true);
      this.setHidden('branch',false);
      this.setHidden('chargesAmount',false);
      }
      
  
}

public handleRequestForOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {

    if(value=='4'){
      this.setReadonly('fromDate',false);
      this.setReadonly('toDate',false);
    }
    else{
      this.setReadonly('fromDate',true);
      this.setReadonly('toDate',true);
    }
    if (value) {
      if (value == "1") {
        //Current Month
        this.setHidden('fromDate', false);
        this.setHidden('toDate', false);
        let newDate = new Date();
        let date = newDate.getDate();
        this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US');
        this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
        this.setValue('fromDate',this.state.startDate);
        this.setValue('toDate',this.state.endDate);

      }
      else if (value == "2") {
        //Last Month
        this.setHidden('fromDate', false);
        this.setHidden('toDate', false);
        let newDate = new Date();
        let date = newDate.getDate()
        let dateReset: any = new Date(newDate.setDate(newDate.getDate() - Number(date) + 1));
        let finalDate = dateReset.setMonth(dateReset.getMonth() - 1);
        this.state.startDate = formatDate(finalDate, 'yyyy-MM-dd', 'en-US');
        let lastDate = new Date(dateReset.getFullYear(), dateReset.getMonth() + 1, 0)
        this.state.endDate = formatDate(lastDate, 'yyyy-MM-dd', 'en-US');
        this.setValue('fromDate',this.state.startDate);
        this.setValue('toDate',this.state.endDate);
      }
      else if (value == '3') {
        //Last 3 Months
        let NewDate = new Date()
        this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
        let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3))
        this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
        this.setValue('fromDate',this.state.startDate);
        this.setValue('toDate',this.state.endDate);
      }
      else {
        this.setHidden('fromDate', false);
        this.setHidden('toDate', false);
        this.reset('fromDate', "")
        this.reset('toDate', "")
        let newDate = new Date();
        this.state.fromDate.minDate = moment(newDate).subtract(12, 'months').format('yyyy-MM-DD');;
        this.state.fromDate.maxDate = new Date();
        this.state.toDate.maxDate = new Date();
        this.state.toDate.minDate = this.state.fromDate.minDate;
        this.setValue('fromDate',this.state.fromDate.minDate);
        this.setValue('toDate',this.state.toDate.minDate);
      }
    }
   // WRITE CODE HERE TO HANDLE 
     //tool generated code based on Orchestration Instructions
}

public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    console.log("fromdate", value);
    this.state.toDate.minDate = value;
    this.setValue('toDate', this.state.toDate.minDate);
  }
}

private _onReset = () => {
  // this.setHidden('accountNumber',true);
  this.handleFormOnLoad();
  this.reset('termsFlag',true);
  this.reset('reason',true);
  this.reset('otherReason',true);
}
   

  public override doPostInit(): void {
    this.address=this.formGroup.get("address") as FormGroup;
    this.addResetHandler('reset',this._onReset);
    this.addControlEventHandler("onCustomerDetailsDataReceived",this.handleCustomerDetailsDataReceived);
    this.addValueChangeHandler("reason", this.handleReasonOnvalueChange);
    this.addValueChangeHandler("requestFor", this.handleRequestForOnvalueChange);
    this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler('termsFlag', this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
  }
  
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
      payload.chargesAmount = 5;
      return payload;
  }
 
  public override preSubmitInterceptor(payload: AccountStmtReq):any {
     // WRITE CODE HERE TO HANDLE 
     this.handleFormOnPresubmit(payload);
    return payload;
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('termsFlag',null)
    }
  }
  
  
 public override postDataFetchInterceptor(payload: AccountStmtReq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
   let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success) {
      let res = response.success?.body?.accountStmtReq;
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
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
