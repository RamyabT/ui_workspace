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
import { Creditcard } from "../creditcard-service/creditcard.model";
import { CcunblockedService } from '../ccunblocked-service/ccunblocked.service';
import { AppConfigService } from "@dep/services";
import { Ccunblocked } from '../ccunblocked-service/ccunblocked.model';
import { CreditcardService } from "../creditcard-service/creditcard.service";
export class retailccunblockedState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}

  cardData!: Creditcard;

	FieldId_7:any={
	 text:" Sample Text"
	}
}


@Injectable()
export class retailccunblockedHelper extends BaseFpxFormHelper<retailccunblockedState>{
  creditcardDetails: any;
   constructor( private retailccunblockedService: CcunblockedService, 
    private _appConfig: AppConfigService,
    private retailcredicardformService: CreditcardService,private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new retailccunblockedState());
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
        this.setReadonly('otherReason',true)
      }
      else{
        this.setHidden('otherReason', true)
      }
     }
   
     public handleunBlockotherReasonOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
     ) => {
      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
      if (value == '7'){
        this.setHidden('unBlockOtherReason', false);
      }
      else{
        this.setHidden('unBlockOtherReason', true);
      }
     }
  override doPreInit(): void {
    this.addValueChangeHandler("blockReason", this.handleBlockReasonOnvalueChange);
    this.addValueChangeHandler("unblockReason", this.handleunBlockotherReasonOnvalueChange);

 this.setServiceCode("RETAILCCUNBLOCK");
 this.addResetHandler("reset",this.resetForm.bind(this))
 }
 resetForm() {
  console.log(this.formGroup)
  this.reset('unblockReason',"");
  this.reset('unBlockOtherReason',"");
  this.reset('otherReason',"");
  this.reset('remarks',"");
  this.reset('termsFlag',"");
  this.setValue('otherReason',this.creditcardDetails.otherReason);
 
  }
  public handleFormOnLoad(){
    this.state.cardData = this._appConfig.getData('creditCardData');
    this.setValue('cardReference',this.state.cardData?.cardRefNumber)
  
    let key: any ={
      cardRefNumber: this.state.cardData?.cardRefNumber
    }
    this.retailcredicardformService.findByKey(key)().subscribe(res =>{
      console.log("CreditCard service", res)
      this.creditcardDetails = res;
          this.setValue('blockReason',this.creditcardDetails.blockReason);
          this.setValue('otherReason',this.creditcardDetails.otherReason)
         this.setReadonly('blockReason',true);
    })
  }



  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Ccunblocked):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Ccunblocked){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  


public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.ccunblocked;
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

  override onReview(): void {
    if (!this.getValue('remarks')) {
      this.setHidden('remarks', true);
    }
  }

  override backToEntryMode(): void {
    this.setHidden('remarks', false);
  }
}
