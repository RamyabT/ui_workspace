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
import { PrePaidActivationService } from '../prePaidActivation-service/prePaidActivation.service';
import { PrePaidActivation } from '../prePaidActivation-service/prePaidActivation.model';
import { DcactivatecardService } from "src/app/debit-card/dcactivatecard-service/dcactivatecard.service";
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class retailActivePrepaidCardState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	   cvv:any={
	    visibilityChange:  false,
 		autoComplete: false,
	   } 
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  cardData!: Prepaidcard;
}


@Injectable()
export class retailActivePrepaidCardHelper extends BaseFpxFormHelper<retailActivePrepaidCardState>{

   constructor( private retailActivePrepaidCardService: PrePaidActivationService, private _httpProvider : HttpProviderService,private _router: Router,
    private activateddc: ActivateDCValidationService, private _appConfig: AppConfigService) 
    {
        super(new retailActivePrepaidCardState());
    }
   
    public handleFormOnLoad(){
      this.setValue('termsFlag',null);
      this.state.cardData = this._appConfig.getData('prepaidCardData');
      this.setValue('cardRefNumber',this.state.cardData?.cardRefNumber)
    } 
  override doPreInit(): void {
    this.handleFormOnLoad();
 this.setServiceCode("RETAILPPACTIVATION");
 this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
 this.addResetHandler("reset",this.resetForm.bind(this))
 }
 resetForm() {
  console.log(this.formGroup)
  this.reset('expiryYear',"");
  this.reset('expiryMonth',"");
  this.reset('cvv',"");
  this.reset('remarks',"");
  this.reset('termsFlag',"");
 }  

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,

    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value =="N"){
      this.setValue('termsFlag',null);
    }
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("cvv", this.handleCvvOnvalueChange);
  
  }
  public handleCvvOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
      this.activateddc.activatePCValidation(this.formGroup.controls['cvv'])?.subscribe((error) => {
        console.log("Error is:", error);
        if (error) {
          this.setErrors('cvv', error);
        }
      });

    }
  }
 
  public override preSubmitInterceptor(payload: PrePaidActivation):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: PrePaidActivation){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
if (response.success) {
     let res = response.success?.body?.prePaidActivation;
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
 
 
