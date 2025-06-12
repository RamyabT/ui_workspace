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
import { AddressdetailService } from '../addressdetail-service/addressdetail.service';
import { Addressdetail } from '../addressdetail-service/addressdetail.model';
import { StatesService } from "src/app/foundation/states-service/states.service";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
export class AddressDetailFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class AddressDetailFormHelper extends BaseFpxFormHelper<AddressDetailFormState>{
  title: any;
   constructor(private _appcongif:AppConfigService,public _appConfig: AppConfigService, private addressDetailFormService: AddressdetailService, private _httpProvider : HttpProviderService,
    private _router: Router, private _device : DeviceDetectorService, public _activeSpaceInfoService: ActiveSpaceInfoService,
    private _statesService:StatesService) 
    {
        super(new AddressDetailFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("CASAONBOARDING");
 if(this._device.isMobile()){
  this.setLabel("iSOCodeList", "AddressDetailForm.iSOList.label");
 }
 this.setHidden('district', true);
 this.setHidden('city',true);
 this.setHidden('town',true);

  let serviceName = this._activeSpaceInfoService.serviceCode;
  if(serviceName == 'RETAILEMPLOYMENTINFO'){
    this.setHidden('homeOwnership', true);
    this.setHidden('udf1',true);
    this.setHidden('udf2',true);
    this.setHidden('udf3',true);
    this.setHidden('landlineNumber',true);
    this.setHidden('extensionNumber',true);
    this.setHidden('iSOCodeList',true);
  }
 }
   


  public override doPostInit(): void {
    this.addValueChangeHandler("country", this.handleCountryOnvalueChange);
    this.addValueChangeHandler("states", this.handleStatesOnvalueChange);
    this.addValueChangeHandler("city", this.handleCityOnvalueChange);
    // this.setValue('country', 'IN');
    // this.setValue('iSOCodeList', '+91');
    setTimeout(() => {
      const addressDtl = this._appcongif.getData('addressDtl');
      if(addressDtl){
        this.setValue('addressLine1',addressDtl.addressLine1);
        this.setValue('addressLine2',addressDtl.addressLine2);
        this.setValue('addressLine3',addressDtl.addressLine3);
        this.setValue('city',addressDtl.city);
        this.setValue('country',addressDtl.country);
        this.setValue('region',addressDtl.region);
        this.setValue('states',addressDtl.states);
        this.setValue('district',addressDtl.district);
        // this.setValue('addressType',addressDtl.addressType);
        // this.setValue('iSOCodeList',addressDtl.isdcode);
        // this.setValue('landlineNumber',addressDtl.landlineNumber);
        // this.setValue('extensionNumber',addressDtl.extensionNumber);
        // this.setValue('homeOwnership',addressDtl.homeOwnership);
        this.setValue('town',addressDtl.town);
        this.setValue('udf1',addressDtl.udf1);
        this.setValue('udf2',addressDtl.udf2);
        this.setValue('udf3',addressDtl.udf3);
        this.setValue('zipCode',addressDtl.zipcode);
      }
    }, 500);
    // this.setReadonly('country',true);

  }
  public handleCountryOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
       if(value){
        this.reset("states", true);
        this.setDataService(this._statesService);
        this.reset("region",true);
        this.setHidden('district', true);
        this.setHidden('city',true);
        this.setHidden('town',true);
       }
   
}
  public handleStatesOnvalueChange:BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
  )=>{
    if(value){
      this.reset("district",true);
      this.reset("city",true);
      this.setHidden('town',true);
       this.setHidden('district', false);
    this.setHidden('city',false);
    }
       
  }
  public handleCityOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
      if(value){
        this.reset("town", true);
        this.setHidden('town',false);
      }
      
}
  public override preSubmitInterceptor(payload: Addressdetail):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Addressdetail){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.addressdetail.inventoryNumber,
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
 
 
