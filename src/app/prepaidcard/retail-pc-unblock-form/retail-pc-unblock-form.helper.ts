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
import { PcunblockrequestService } from '../pcunblockrequest-service/pcunblockrequest.service';
import { Pcunblockrequest } from '../pcunblockrequest-service/pcunblockrequest.model';
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
//import { PrepaidcardService } from "../prepaidcard-service/prepaidcard.service";
import { PpCardService } from "../ppCard-service/ppCard.service";

export class retailpcunblockState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  cardData!: Prepaidcard;
}


@Injectable()
export class retailpcunblockHelper extends BaseFpxFormHelper<retailpcunblockState>{
  prepaidcardDetails:any
   constructor( private retailpcunblockService: PcunblockrequestService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService, private retailPrepaidcardService:PpCardService) 
    {
        super(new retailpcunblockState());
    }
   
    public handleFormOnLoad(){
      this.setValue('termsFlag',null);
      this.state.cardData = this._appConfig.getData('prepaidCardData');
      this.setValue('cardReference',this.state.cardData?.cardRefNumber)
           let key: any ={
            cardReference: this.state.cardData?.cardRefNumber
          }
          this.retailPrepaidcardService.findByKey(key)().subscribe(res =>{
            console.log("prepaidcard service", res)
            this.prepaidcardDetails = res;
                this.setValue('blockReason',this.prepaidcardDetails.blockReason);
                this.setValue('otherReason',this.prepaidcardDetails.otherReason)
               this.setReadonly('blockReason',true);
          })
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
        this.setHidden('unblkOtherReason', false)
      }
      else{
        this.setHidden('unblkOtherReason', true)
      }
     }
  override doPreInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("blockReason", this.handleBlockReasonOnvalueChange);
    this.addValueChangeHandler("reason", this.handleunBlockotherReasonOnvalueChange);
 this.setServiceCode("RETAILPCUNBLOCK");
 this.addResetHandler("reset",this.resetForm.bind(this))
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
 resetForm() {
  console.log(this.formGroup)
  //this.reset('reason',"");
  this.reset('unblkOtherReason',"");
  //this.reset('otherReason',"");
  this.reset('remarks',"");
  this.reset('reason',"")
  this.reset('termsFlag',"")
 } 

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Pcunblockrequest):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Pcunblockrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public handleFormOnPostsubmit(response:any,routingInfo:any){
    // WRITE CODE HERE TO HANDLE
  if (response.success) {
       let res = response.success?.body?.pcunblockrequest;
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
 
 
