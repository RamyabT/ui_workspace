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
import { CcactivationService } from '../ccactivation-service/ccactivation.service';
import { Ccactivation } from '../ccactivation-service/ccactivation.model';
import { AppConfigService } from "@dep/services";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { ActivateCCValidationService } from "src/app/foundation/validator-service/activatecc-validation.service";
export class RetailCCActivationFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
  visiblityChange: boolean = false;
  autoComplete: boolean = false;
   termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  cardData!: Creditcard;
}


@Injectable()
export class RetailCCActivationFormHelper extends BaseFpxFormHelper<RetailCCActivationFormState>{

   constructor( private retailCCActivationFormService: CcactivationService, 
    private _activateCCValidationService: ActivateCCValidationService,
    private _appConfig: AppConfigService,private _httpProvider : HttpProviderService,private _router: Router) 
   
    {
        super(new RetailCCActivationFormState());
    }
   
  override doPreInit(): void {
     this.setServiceCode("RETAILCCACTIVATION");
     this.addResetHandler("reset",this.resetForm.bind(this));
     this.setHidden('cardHolderName',true);
 }
 resetForm() {
  console.log(this.formGroup)
  this.reset('cardHolderName',"");
  this.reset('expiryMonth',"");
  this.reset('expiryYear',"");
  this.reset('cvv',"");
  this.reset('remarks',"");
  this.reset('termsFlag',"");
 }

  public override doPostInit(): void {
    if(this.getRoutingParam('cardReference')){
      this.setValue('cardReference', this.getRoutingParam('cardReference'));
    }
    this.state.cardData = this._appConfig.getData('creditCardData');
    this.setValue('cardReference',this.state.cardData?.cardRefNumber);
    this.addValueChangeHandler("cvv", this.handleCvvOnvalueChange);
    this.addValueChangeHandler("expiryMonth", this.handleexpiryMonthOnvalueChange);
    this.addValueChangeHandler("expiryYear", this.handleexpiryYearOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
  }
  
    public handleFormOnLoad() {
      this.setValue('termsFlag',null);
    }
   public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
     if(value == 'N'){
      this.setValue('termsFlag',null);
     }
    }
  }
  public handleCvvOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
      this._activateCCValidationService.activateCCValidation(this.formGroup.controls['cvv'])?.subscribe((error) => {
        console.log("Error is:", error);
        if (error) {
          this.setErrors('cvv', error);
        }
      });

    }
  }
  public handleexpiryMonthOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
      this.reset('cvv','')

    }
    
   
  }
  public handleexpiryYearOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
    this.reset('cvv','')

  }
  
  }
 
  public override preSubmitInterceptor(payload: Ccactivation):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Ccactivation){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

  public handleFormOnPostsubmit(response:any,routingInfo:any){
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.ccactivation;
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
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response,routingInfo);
    
     return routingInfo;
   }
    
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
