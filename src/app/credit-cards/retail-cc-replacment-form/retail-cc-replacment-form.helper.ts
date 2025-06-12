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
import { CcaddonrequestService } from '../ccaddonrequest-service/ccaddonrequest.service';
import { Ccaddonrequest } from '../ccaddonrequest-service/ccaddonrequest.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import { Creditcard } from "../creditcard-service/creditcard.model";
//import {  Cobaddressinfo } from '../../accounts/cobaddressinfo-service/cobaddressinfo.model';
//import { CustomerService } from "src/app/foundation/validator-service/customer.service";
export class RetailCCReplacementFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
   charges:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
	   amountInWords : true,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
    email: "",
    mobile: ""
  }
  baseCurrency: string = this._appConfig.baseCurrency;
  cardData!: Creditcard;
}


@Injectable()
export class RetailCCReplacementFormHelper extends BaseFpxFormHelper<RetailCCReplacementFormState>{
  
  addressInfo! : FormGroup;
   constructor( private retailCCReplacementFormService: CcaddonrequestService, private _httpProvider : HttpProviderService,private _router: Router, private _customerService: CustomerService,
    private _appConfig: AppConfigService) 
    {
        super(new RetailCCReplacementFormState());
    }
   

    public handleBlockReasonOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
     ) => {
      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
      if(value){
        if (value == '4'){
          this.setHidden('otherReason', false)
        }
        else{
          this.setHidden('otherReason', true)
        }
      }
    
     }




  override doPreInit(): void {
    this.addValueChangeHandler("reason", this.handleBlockReasonOnvalueChange);
    this.addResetHandler("reset", this.resetForm.bind(this));
  this.addValueChangeHandler("deliveryOption", this.handleDlvryOptionOnvalueChange);
  this.addControlEventHandler('onCustomerDetailsDataReceived', this.handleCustomerDetailsDataReceived);
  this.addValueChangeHandler("deliveryOption", this.handleDlvryOptionOnvalueChange);

 this.setServiceCode("RETAILCCREPLACE");
 }

 resetForm(){
  this.reset('dlvryBranch',"");
  this.reset('otherReason',"");
  this.reset('deliveryOption',"");
  this.reset('reason',"");
  this.reset('remarks',"");
  this.reset('termsFlag',"");
  this.setValue('deliveryOption', '2');

 }
public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  this.setValue('charges', { amount: 100, currencyCode: this.state.baseCurrency });

  this.setValue('deliveryOption', '2');
  this.setHidden('otherReason',true);
  if(this.getRoutingParam('cardReference')){
    this.setValue('cardReference', this.getRoutingParam('cardReference'));
  }
  this.state.cardData = this._appConfig.getData('creditCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber)

this.setReadonly('charges', true);

 }



public handleCardRefNumberOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {
   // WRITE CODE HERE TO HANDLE 
     //tool generated code based on Orchestration Instructions
 if (value) {
 this.reset('dlvryBranch',"");
 this.reset('reason',"");
 this.reset('termsFlag',"");
  }
  }

public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {
 
  if (payload) {
    if(payload.buildingId!=undefined && payload.buildingName!=undefined){
      this.state.addressInfo.buildingDetails = payload.buildingId + "," + payload.buildingName
    }
    if(payload.city!=undefined){
      this.state.addressInfo.cityDetails = payload.city
    }
    if(payload.countryName!=undefined){
     this.state.addressInfo.countryDetails = payload.countryName
    }
   if(payload.stateName!=undefined){
    this.state.addressInfo.stateDetails = payload.stateName
   }
   if(payload.pincode!=undefined){
    this.state.addressInfo.pinCode = payload.pincode
   }
   if(payload.mobileNumber!=undefined){
    this.state.addressInfo.mobile = payload.mobileNumber
   }
   this.setValue('addressInformation',this.state.addressInfo?.buildingDetails+","+this.state.addressInfo?.cityDetails+","+this.state.addressInfo?.stateDetails+","+this.state.addressInfo?.countryDetails+","+this.state.addressInfo?.pinCode);
   this.setValue('contactNumber',this.state.addressInfo?.mobile);
  }


}
public handleDlvryOptionOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  // WRITE CODE HERE TO HANDLE 
  //tool generated code based on Orchestration Instructions
  if(value){
    if (value == '2') {
      // this.setHidden('addressInfo', false);
      //   // this.setDisabled('addressInfo', true);
      //   this.setHidden('dlvryBranch', true);
      this.setHidden('dlvryBranch', false);
      this.setHidden('addressInfo', true);
    }
    else {
      // this.setHidden('dlvryBranch', false);
      // this.setHidden('addressInfo', true);

      this.setHidden('addressInfo', false);
        //this.setDisabled('addressInfo', true);
      this.setHidden('dlvryBranch', true);
    }
  }
  
}

   

 public override doPostInit(): void {

  setTimeout(() => {
    window.scrollTo(0,0);
  },100);
  this.addressInfo=this.formGroup.get("addressInfo") as FormGroup
  
    if(this.formMode == 'ADD') {
        this.handleFormOnLoad();
    }   
   }
   
 
  public override preSubmitInterceptor(payload: Ccaddonrequest):any {
     // WRITE CODE HERE TO HANDLE 
     payload.charges=this.getValue('charges').amount;
     payload.currency=this.getValue('charges').currencyCode;
     delete payload.inventoryNumber;
     if(payload.remarks==""){
       delete payload.remarks;
     }
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Ccaddonrequest){
   // WRITE CODE HERE TO HANDLE 
   payload.charges={amount:payload.charges,currencyCode:this._appConfig.baseCurrency};
  return payload;
}
  

  
  public handleFormOnPostsubmit(response:any,routingInfo:any){
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.ccaddonrequest;
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
    this.handleFormOnPostsubmit(response,routingInfo);
    return routingInfo;
  }



 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
