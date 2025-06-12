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
import { ApplyDebitCardService } from '../applyDebitCard-service/applyDebitCard.service';
import { ApplyDebitCard } from '../applyDebitCard-service/applyDebitCard.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { Dcaddonrequest } from "../dcaddonrequest-service/dcaddonrequest.model";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService } from "@dep/core";
//import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';
export class RetailApplyDebitCardState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
   charges:any={
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
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
    email: "",
    mobile: ""
  }
}


@Injectable()
export class RetailApplyDebitCardHelper extends BaseFpxFormHelper<RetailApplyDebitCardState>{
  addressInfo! : FormGroup;

   constructor( private retailApplyDebitCardService: ApplyDebitCardService, private _httpProvider : HttpProviderService,private _router: Router, private _customerService:CustomerService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
   ) 
    {
        super(new RetailApplyDebitCardState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILAPPLYDEBITCARD");
 }
   
 public handleDlvryOptionOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  // WRITE CODE HERE TO HANDLE 
  //tool generated code based on Orchestration Instructions
  if (value == '2') {
    this.setHidden('branches', true);
   // this.setHidden('authPersonName', false);
   // this.setHidden('authPersonId', false);
    this.setHidden('addressInfo', false);
  
  }
  else {
    this.setHidden('branches', false);
    this.setHidden('authPersonName', false);
    this.setHidden('authPersonId', false);
    this.setHidden('addressInfo', true);
  }
}
public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {
 
  if (payload) {
    this.state.addressInfo.buildingDetails = payload.buildingId + "," + payload.buildingName
    this.state.addressInfo.cityDetails = payload.city
    this.state.addressInfo.stateDetails = payload.stateName
    this.state.addressInfo.countryDetails = payload.countryName
    this.state.addressInfo.pinCode = payload.pincode
    this.state.addressInfo.mobile=payload.mobileNumber
  }


}

public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  if(this.formMode=="ADD"){
  this.setValue('deliveryOption', '2');
  let accNum = this._activeSpaceInfoService.getAccountNumber();
  if(accNum){
    this.setValue('accountNumber', accNum);
  }
}
//this.setReadonly('charges', true);

 }

 public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  // WRITE CODE HERE TO HANDLE 
  //tool generated code based on Orchestration Instructions
  if (value) {
    this.reset('terms',"");
   // this.setHidden('exchangeDetails', true);
  }
}

  public override doPostInit(): void {
 //this.addressInfo=this.formGroup.get("addressInfo") as FormGroup;
 this.addressInfo=this.formGroup.get("addressInfo") as FormGroup;
 this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
 //this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
 this.addControlEventHandler('onCustomerDetailsDataReceived', this.handleCustomerDetailsDataReceived);
 this.addValueChangeHandler("deliveryOption", this.handleDlvryOptionOnvalueChange);
 this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Dcaddonrequest):any {
     // WRITE CODE HERE TO HANDLE 
    //  payload.charges=this.getValue('charges').amount;
    //  payload.currency=this.getValue('charges').currencyCode;
     if (!payload.charges) {
      delete payload.charges,
      delete payload.currency
    return payload;
  }}
  
  
  public override postDataFetchInterceptor(payload: Dcaddonrequest){
    // WRITE CODE HERE TO HANDLE 
   return payload;
 }

 public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
if (response.success) {
     let res = response.success?.body?.applyDebitCard;
     routingInfo.setQueryParams({
       response: res
     });
   } else if (response.error) {
     let error = response.error.error;
     routingInfo.setQueryParams({
       result: {
         statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
         message: error.ErrorMessage,
         description: error.ErrorDescription,
         serviceCode: this.serviceCode,
       }
     });
   }
   return response;
 }
  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.applyDebitCard.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n

 let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response,routingInfo);
  return routingInfo;}
}
 
 
