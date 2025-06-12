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
  FpxModal,
  FpxAppConfig
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PpcardBlockedService } from '../ppcardBlocked-service/ppcardBlocked.service';
import { PpcardBlocked } from '../ppcardBlocked-service/ppcardBlocked.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
export class RetailPrepaidBlockFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	termsAndCondition:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  cardData!: Prepaidcard;
}


@Injectable()
export class RetailPrepaidBlockFormHelper extends BaseFpxFormHelper<RetailPrepaidBlockFormState>{
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
   constructor( private retailPrepaidBlockFormService: PpcardBlockedService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService) 
    {
        super(new RetailPrepaidBlockFormState());
    }
   
    public handleBlockReasonOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
     ) => {
      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
      if (value == '4'){
        this.setHidden('otherReason', false)
      }
      else{
        this.setHidden('otherReason', true)
      }
     }
  override doPreInit(): void {
    this.addValueChangeHandler("blockReason", this.handleBlockReasonOnvalueChange);
 this.setServiceCode("RETAILPREPAIDBLOCK");
 this.addResetHandler("reset",this.resetForm.bind(this))
 }

 resetForm() {
  console.log(this.formGroup)
  this.reset('reason',"");
  this.reset('blockReason',"");
  this.reset('otherReason',"");
  this.reset('remarks',"");
  this.reset('termsAndCondition',"")
 }
   
 public handleFormOnLoad(){
  this.setValue('termsAndCondition',null);
  this.state.cardData = this._appConfig.getData('prepaidCardData');
  this.setValue('cardRefNumber',this.state.cardData?.cardRefNumber)
}  
  public override doPostInit(): void {
    this.addValueChangeHandler("termsAndCondition", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
  
  }
  
  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
     if(value == 'N'){
      this.setValue('termsAndCondition',null);
     }
    }
  }

  addlimitCountriesLink() {
    let beneServicode='RETAILPCLIMITS'
    let _serviceDetail:any
    _serviceDetail = this._serviceCodeDetails.getServiceDetails(beneServicode);
    setTimeout(() => {
      this._router.navigate(_serviceDetail.servicePath, {
        queryParams: {
          // accountNumber: this.state.cardData?.accountNumber,
          cardRefNumber: this.state.cardData?.cardRefNumber,
          selecetedIndex: 3
        }
      });
    });
  }	
 
  public override preSubmitInterceptor(payload: PpcardBlocked):any {
     // WRITE CODE HERE TO HANDLE 
    let cardEndNumber;
    if(this.state.cardData.cardNumber.includes(' ')){
        cardEndNumber=this.state.cardData.cardNumber.split(' ')[3];
    }else{
       cardEndNumber=this.state.cardData.cardNumber.slice(12,16);
    }
      this._appConfig.setData('cardEndNumber', cardEndNumber);
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: PpcardBlocked){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
if (response.success) {
     let res = response.success?.body?.ppcardBlocked;
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
  public override postSubmitInterceptor(response:any): RoutingInfo {
  let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response,routingInfo);
  return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
