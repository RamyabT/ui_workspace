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
import { IbanLetterReq } from "../ibanLetterReq-service/ibanLetterReq.model";
import { IbanLetterReqService } from "../ibanLetterReq-service/ibanLetterReq.service";
export class RetailIBANLetterReqFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	chargesAmount:any={
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
     amountInWords : false,
     initCurrency : this._appConfig.baseCurrency,
     defaultFetch : false,
  }
  address: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails:"",
    countryDetails: "",
    pinCode: ""
  }
  customerEmail:string="";
}


@Injectable()
export class RetailIBANLetterReqFormHelper extends BaseFpxFormHelper<RetailIBANLetterReqFormState>{
  address! : FormGroup;
   constructor( private retailIBANLetterReqFormService: IbanLetterReqService, 
    private userService:CustomerService,
    private appConfigService:AppConfigService,
    private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailIBANLetterReqFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILIBANLETTER");
 }

public handleFormOnLoad(){
      this.setValue('deliveryOption','1');
      this.setHidden('address',true);
      this.setHidden('emailId',false);
      this.setHidden('deliveryBranch',true);
      this.setReadonly('iBAN',true);
      this.setReadonly('emailId', true);
      this.reset('termsFlag');
      this.setHidden('chargesAmount',true);


 this.setAmountCurrencyList('chargesAmount',[{
  id:this.appConfigService.baseCurrency,text:this.appConfigService.baseCurrency}]);

this.setReadonly('chargesAmount',true);

this.userService.fetchCustomer(sessionStorage.getItem('customerCode'))
.subscribe((res) => {
  if(res){
    if (res.emailId) {
      this.setValue('emailId', res.emailId);
      this.state.customerEmail=res.emailId;
    }
    if (!res.emailId || res.emailId =="" || res.emailId == undefined || res.emailId == null) {
      this.setErrors('emailId', "Email_Error");
    }
}});
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

public onAccountNumberDataReceived:BaseFpxControlEventHandler = (payload: any) => {
  // WRITE CODE HERE TO HANDLE 
  if(payload){
    this.setValue('iBAN',payload.iban);
  }
  }

  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {
 
    if (payload) {
      this.setValue('emailId',payload.emailId);
      this.address=this.formGroup.get("address") as FormGroup;
      this.state.address.buildingDetails = payload.buildingId + "," + payload.buildingName
      this.state.address.cityDetails = payload.city
      this.state.address.stateDetails = payload.stateName
      this.state.address.countryDetails = payload.countryName
      this.state.address.pinCode = payload.pincode
      this.state.address.mobile=payload.mobileNumber
      
    }
  
  
  }

public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {
    if(value=='1'){
      this.reset('deliveryBranch',true);
      this.setHidden('address',true);
        this.setHidden('emailId',false);
        this.setReadonly('emailId',true);
        this.setHidden('deliveryBranch',true);
        this.setHidden('chargesAmount',true);
        this.userService.fetchCustomer(sessionStorage.getItem('customerCode'))
        .subscribe((res) => {
          if(res){
            if (res.emailId) {
              this.setValue('emailId', res.emailId);
              this.state.customerEmail=res.emailId;
            }
            if (!res.emailId || res.emailId =="" || res.emailId == undefined || res.emailId == null) {
              this.setErrors('emailId', "Email_Error");
            }
        }}); 
    }
      if(value=='2'){
        this.reset('deliveryBranch',true);
        this.setHidden('address',false);
        this.setReadonly('address',true);
        this.setHidden('emailId',true);
        this.setHidden('deliveryBranch',true);
        this.setHidden('chargesAmount',true);
        if(!this.state.address || (this.state.address.buildingDetails && this.state.address.cityDetails && this.state.address.pinCode && this.state.address.stateDetails) ==""){
          this.formGroup.get('deliveryOption')?.markAsTouched()
        }
      }
      if(value=='3'){
        this.setHidden('address',true);
        this.setHidden('emailId',true);
        this.setHidden('deliveryBranch',false);
        this.setHidden('chargesAmount',false);
      }

   // WRITE CODE HERE TO HANDLE 
     //tool generated code based on Orchestration Instructions
}
   
private _onReset = () => {
  // this.setHidden('accountNumber',true);
  this.handleFormOnLoad();
  this.reset('termsFlag',true);
  this.reset('remarks',true);
  this.reset('deliveryBranch',true);
}

  public override doPostInit(): void {
    this.addResetHandler('reset',this._onReset);
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    this.addControlEventHandler("onCustomerDetailsDataReceived", this.handleCustomerDetailsDataReceived);
    this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();

  }
  
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
      payload.chargesAmount = 0.00;
  }
 
  public override preSubmitInterceptor(payload: IbanLetterReq):any {
    this.handleFormOnPresubmit(payload);
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: IbanLetterReq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

public override postSubmitInterceptor(response:any): RoutingInfo {
  console.log(response);
 let routingInfo: RoutingInfo = new RoutingInfo();
   routingInfo.setNavigationURL("confirmation");
   if (response.success) {
    let res = response.success?.body?.ibanLetterReq;
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
 
 
