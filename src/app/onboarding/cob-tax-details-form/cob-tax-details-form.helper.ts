import { EventEmitter, Injectable, Output } from "@angular/core";
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
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { StatesService } from "src/app/foundation/states-service/states.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Cobtaxdetails } from "../cobtaxdetails-service/cobtaxdetails.model";
import { CobtaxdetailsService } from "../cobtaxdetails-service/cobtaxdetails.service";
export class CobTaxDetailsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class CobTaxDetailsFormHelper extends BaseFpxFormHelper<CobTaxDetailsFormState>{
  maxCountryCount :number = 2;
  getCountryOfTaxData:any[]=[];
  public countryOfTax$:BehaviorSubject<any> = new BehaviorSubject(null);

   constructor( private cobTaxDetailsFormService: CobtaxdetailsService, private _httpProvider : HttpProviderService,private _router: Router, private _statesService: StatesService, public _appConfig: AppConfigService) 
    {
        super(new CobTaxDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCOBTAXDETAILS");
 }
   

  public override doPostInit(): void {
    this.setHidden("remarks",true);
    this.setHidden("reasonForNoTin",true);
    this.setValue("taxPayerIdAvailable","1");
    this.addValueChangeHandler("countryOfBirth", this.handleCountryOfBirthOnvalueChange);
    this.addValueChangeHandler("countryOfTax",this.handleCountryOfTaxOnvalueChange);
    this.addValueChangeHandler("taxPayerIdAvailable",this.handleTaxpayerIdAvailableOnvalueChange);
    this.addValueChangeHandler("reasonForNoTin",this.handleReasonForNoTinOnvalueChange);
  }
  public handleCountryOfBirthOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
      this.reset("cityOfBirth");
  };
 
  public handleCountryOfTaxOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: string,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
      this.countryOfTax$.next({value:value});
     
  };
  getCountryOfTaxTrigger(){
    return this.countryOfTax$.asObservable();
  }
  public handleReasonForNoTinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset("remarks");
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
     if(value=="2"){
      this.setHidden("remarks",false);
     }
  };
  public handleTaxpayerIdAvailableOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) =>{
      if(value==1){
        this.setHidden('taxPayerId',false);
        this.setHidden('reasonForNoTin',true);
        this.setHidden('investmentSchemaFlag',true);
        this.setHidden('otherResidentJurisdictionsFlag',true);
        this.setHidden('payingTaxInPrevYear',true);
        this.setHidden('remarks',true);
      }
      if(value==0){
        this.setHidden('taxPayerId',true);
        this.setHidden('reasonForNoTin',false);
        this.setHidden('investmentSchemaFlag',false);
        this.setHidden('otherResidentJurisdictionsFlag',false);
        this.setHidden('payingTaxInPrevYear',false);
        this.setHidden('remarks',true);
      }
  }

  
 
  public override preSubmitInterceptor(payload: Cobtaxdetails):any {
     // WRITE CODE HERE TO HANDLE 
    this.getCountryOfTaxData = [...this.formGroup.get('addCountryOfTax')?.value];
    this.getCountryOfTaxData?.map((res:any,ind:number)=>{payload.addCountryOfTax[ind].serial = ind+1})
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Cobtaxdetails){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.cobtaxdetails,
        transRef: response.success?.body?.cobtaxdetails.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId', response.success?.body?.cobtaxdetails.applicantId)
      this._appConfig.setData('processId', response.success?.body?.cobtaxdetails.processId)
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

