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
import { DcunblockrequestService } from '../dcunblockrequest-service/dcunblockrequest.service';
import { Dcunblockrequest } from '../dcunblockrequest-service/dcunblockrequest.model';
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { DebitcardService } from "../debitcard-service/debitcard.service";
export class retaildcunblockState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
   termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
	charges:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text:this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}
  cardData!: Debitcard;
}


@Injectable()
export class retaildcunblockHelper extends BaseFpxFormHelper<retaildcunblockState>{
  debitcardDetails: any;
   constructor( private retaildcunblockService: DcunblockrequestService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService,
    private retaildebitcardformService: DebitcardService,) 
    {
        super(new retaildcunblockState());
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
     public handlereasonOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
     ) => {
      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
      if (value == '7'){
        this.setHidden('unBlockOtherReason',false)
     }
     else{
      this.setHidden('unBlockOtherReason',true)
     }
    }


    public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
     ) => {
      if(value){
        if(value == 'N'){
          this.setValue('termsFlag',null);
        }
      }
    }

  override doPreInit(): void {
    this.addValueChangeHandler("blockReason", this.handleBlockReasonOnvalueChange);
    this.addValueChangeHandler("reason", this.handlereasonOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
 this.setServiceCode("RETAILDCUNBLOCK");
 this.addResetHandler("reset",this.resetForm.bind(this))
 }
 resetForm() {
  console.log(this.formGroup)
  this.reset('reason',"");
  this.reset('unBlockOtherReason',"");
  this.reset('remarks',"");
  this.reset('termsFlag',"")
 
  }
 public handleFormOnLoad(){
  this.setValue('termsFlag',null);
  this.setReadonly('charges', true);
  this.setHidden('unBlockOtherReason',true);
  this.state.cardData = this._appConfig.getData('debitCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber)

  let key: any ={
    cardRefNumber: this.state.cardData?.cardRefNumber
  }
  this.retaildebitcardformService.findByKey(key)().subscribe(res =>{
    console.log("Debitcard service", res)
    this.debitcardDetails = res;
        this.setValue('blockReason',this.debitcardDetails.blockReason);
        this.setValue('otherReason',this.debitcardDetails.otherReason)
       this.setReadonly('blockReason',true);
  })
}
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
  public override preSubmitInterceptor(payload: Dcunblockrequest):any {
     // WRITE CODE HERE TO HANDLE 
   
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Dcunblockrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.dcunblockrequest;
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
  
  // public override postSubmitInterceptor(response: any): RoutingInfo {
  //   console.log(response);
  //   let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     let res = response.success?.body?.dcunblockrequest;
  //     routingInfo.setQueryParams({
  //       response: res,
  //       serviceCode: this.serviceCode
  //     });
  //   } else if (response.error) {
  //     let error = response.error.error;
  //     routingInfo.setQueryParams({
  //       result: {
  //         statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
  //         message: error.ErrorMessage,
  //         description: error.ErrorDescription,
  //         serviceCode: this.serviceCode,
  //       }
  //     });
  //   }
  //   return routingInfo;
  // }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
