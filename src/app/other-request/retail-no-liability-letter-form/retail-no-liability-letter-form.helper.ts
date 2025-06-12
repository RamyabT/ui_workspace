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
import { AppConfigService } from "@dep/services";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import moment from "moment";
import { NoLiabilityletter } from "src/app/service-request/noLiabilityletter-service/noLiabilityletter.model";
import { NoLiabilityletterService } from "src/app/service-request/noLiabilityletter-service/noLiabilityletter.service";
export class RetailNoLiabilityLetterState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
   customerEmail:string="";
	date:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }

     addressDetails: any = {
      buildingDetails: "",
      cityDetails: "",
      stateDetails:"",
      countryDetails: "",
      pinCode: ""
    }

	chargesAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class RetailNoLiabilityLetterHelper extends BaseFpxFormHelper<RetailNoLiabilityLetterState>{

   constructor( private retailNoLiabilityLetterService: NoLiabilityletterService, private _httpProvider : HttpProviderService,private _router: Router,
    private userService:CustomerService,private appConfigService:AppConfigService,) 

    {
        super(new RetailNoLiabilityLetterState());
    }

    public handleFormOnLoad(){
      this.reset('termsFlag');
      if(this.formMode =='VIEW'){
        if(this.formGroup.controls['Reason'].value == '11'){
          this.setHidden('otherReason',false);
          this.setDisabled('otherReason',true);
      }
      else{
        this.setHidden('otherReason',true);
      }
      if(this.getValue('deliveryOption')=='1'){
      this.setValue('deliveryOption','1');
      this.setHidden('addressDetails',true);
      this.setHidden('deliveryBranch',false);
      this.setDisabled('deliveryBranch',true);
      }
      else{
      this.setValue('deliveryOption','2');
      this.setHidden('addressDetails',false);
      this.setHidden('deliveryBranch',true);
      this.setHidden('chargesAmount',true);
      }
    }
    else{
      this.setValue('deliveryOption','2');
    this.setReadonly('date',true);
    this.setHidden('addressDetails', false);
    this.setHidden('otherReason', true);
    this.setHidden('deliveryBranch', true);
    this.setHidden('chargesAmount', true);


      this.setAmountCurrencyList('chargesAmount',[{
        id:this.appConfigService.baseCurrency,text:this.appConfigService.baseCurrency}]);
      

let currentDate = moment().format("YYYY-MM-DD");
this.state.date.minDate=currentDate;
this.setValue('date',currentDate);

    }
  }

    public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
      ) => {

        if(value=='1'){
          this.setHidden('addressDetails',true);   
          this.setHidden('email', true);
          this.setHidden('deliveryBranch',false);
          this.setHidden('chargesAmount',false);
          this.setReadonly('chargesAmount', true);

        }
          if(value=='2'){
            this.setHidden('addressDetails',false);
            this.setHidden('email', true);
            // this.setDisabled('addressDetails',true);
            this.setHidden('deliveryBranch',true);
            this.setHidden('chargesAmount',true);
            if(!this.state.addressDetails || (this.state.addressDetails.buildingDetails && this.state.addressDetails.cityDetails && this.state.addressDetails.pinCode && this.state.addressDetails.stateDetails) ==""){
              this.formGroup.get('deliveryOption')?.markAsTouched()
            }
          }
        // WRITE CODE HERE TO HANDLE 
         //tool generated code based on Orchestration Instructions
         if (value == '3') {
          this.setHidden('addressInfo', true);
          this.setHidden('email', false);
          this.setHidden('deliveryBranch', true);
          this.setHidden('chargesAmount', true);
        }
  }

  public handleReasonOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
      if(this.formGroup.controls['Reason'].value == '11'){
        this.setHidden('otherReason',false);
    }
    else{
      this.setHidden('otherReason',true);
    }
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
}

public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

  if (payload) {
    this.state.addressDetails.buildingDetails = payload.buildingName;
    this.state.addressDetails.cityDetails = payload.city;
    this.state.addressDetails.stateDetails = payload.stateName;
    this.state.addressDetails.countryDetails = payload.countryName;
    this.state.addressDetails.pinCode = payload.pincode;
    this.setValue('email', payload.emailId);


  }

}

   
  override doPreInit(): void {
 this.setServiceCode("RETAILNOLIABILITY");
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

  public override doPostInit(): void {
    this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.addValueChangeHandler("Reason", this.handleReasonOnvalueChange);
    this.addControlEventHandler("onCustomerDetailsDataReceived", this.handleCustomerDetailsDataReceived);
    this.handleFormOnLoad();
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
      payload.chargesAmount = 0.00;
  }
 
  public override preSubmitInterceptor(payload: NoLiabilityletter):any {
     // WRITE CODE HERE TO HANDLE 
     this.handleFormOnPresubmit(payload);
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: NoLiabilityletter){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.noLiabilityletter;
      routingInfo.setQueryParams({
        response: res
      });
    }  else if (response.error) {
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
 
 
