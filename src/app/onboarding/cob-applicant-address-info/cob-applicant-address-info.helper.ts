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
import { ApplicantaddressinfoService } from '../applicantaddressinfo-service/applicantaddressinfo.service';
import { Applicantaddressinfo } from '../applicantaddressinfo-service/applicantaddressinfo.model';
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";

export class COBApplicantAddressInfoState extends BaseFpxComponentState {
  title1:any={
    text: "Communication Address"
   }
   hint:any={
    text: "Communication Address"
   }
   header1:any={
    text: "Communication Address"
   }
   header2:any={
    text: "Permanent Address"
   }
 	showSuggestion : boolean = false;
}


@Injectable()
export class COBApplicantAddressInfoHelper extends BaseFpxFormHelper<COBApplicantAddressInfoState>{
  Address:any;
  communicationAddressInv! : FormGroup;
  permenantAddressInv! : FormGroup;


   constructor( private cOBApplicantAddressInfoService: ApplicantaddressinfoService, private _httpProvider : HttpProviderService,private _router: Router,
    public _deviceDetectorService: DeviceDetectorService, 
    public _appConfig: AppConfigService,
    public _activeSpaceInfoService: ActiveSpaceInfoService
    ) 
    {
        super(new COBApplicantAddressInfoState());
    }
    public handleFormOnLoad(){
      // WRITE CODE HERE TO HANDLE
     this.setValue('permenantAddressFlag',"1");
     }
  override doPreInit(): void {
 this.setServiceCode("RETAILADDRESSINFO");

 let serviceName = this._activeSpaceInfoService.serviceCode;
 if(serviceName == 'RETAILADDRESSINFO'){
  this._appConfig.setData('title','');
 }
 }
 public handleCommunicationAddressInvOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
  ) => {
   // WRITE CODE HERE TO HANDLE 
     //tool generated code based on Orchestration Instructions
     this.Address=value;
 
}
   
public handlePermenantAddressFlagOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
       
       if (value=="1") {
        this.setHidden('headerbox',true);
        this.setHidden('communicationAddressInv',true);
        }
        if(value=="0"){
          this.setHidden('headerbox',false)
          this.setHidden('communicationAddressInv',false);
        }
     
}

  public override doPostInit(): void {
 this.communicationAddressInv=this.formGroup.get("communicationAddressInv") as FormGroup;
 this.permenantAddressInv=this.formGroup.get("permenantAddressInv") as FormGroup;
 this.addValueChangeHandler("permenantAddressFlag", this.handlePermenantAddressFlagOnvalueChange);
 this.addValueChangeHandler("communicationAddressInv", this.handleCommunicationAddressInvOnvalueChange);
 this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Applicantaddressinfo):any {
     // WRITE CODE HERE TO HANDLE 
     payload.permenantAddressFlag = parseInt(payload.permenantAddressFlag);
     const prePayload: { applicantId?: string } = {
      ...payload,
     }

     delete prePayload['applicantId'];
    return prePayload;
  }
  
  
 public override postDataFetchInterceptor(payload: Applicantaddressinfo){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.applicantaddressinfo,
        transRef: response.success?.body?.applicantaddressinfo.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId', response.success?.body?.applicantaddressinfo.applicantId)
      this._appConfig.setData('processId', response.success?.body?.applicantaddressinfo.processId)
    } else if (response.error) {
      routingInfo.setQueryParams({ 
        response: response.error.error,
        status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
