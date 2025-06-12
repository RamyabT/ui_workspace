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
import { DcstatusrequestService } from '../dcstatusrequest-service/dcstatusrequest.service';
import { Dcstatusrequest } from '../dcstatusrequest-service/dcstatusrequest.model';
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
export class RetailDebitCardBlockFormState extends BaseFpxComponentState {
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
export class RetailDebitCardBlockFormHelper extends BaseFpxFormHelper<RetailDebitCardBlockFormState>{
  
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
   constructor( private retailDebitCardBlockFormService: DcstatusrequestService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService) 
    {
        super(new RetailDebitCardBlockFormState());
    }
   
  override doPreInit(): void {
    this.addValueChangeHandler("reason", this.handleBlockReasonOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.setServiceCode("RETAILDCBLOCK");
    this.addResetHandler("reset",this.resetForm.bind(this))
 }

 resetForm() {
 console.log(this.formGroup)
 this.reset('reason',"");
 this.reset('remarks',"");
 this.reset('termsFlag',"");
 this.reset('otherReason',"");
 this.handleFormOnLoad();


 }
 addlimitCountriesLink() {
  let beneServicode='RETAILDCLIMITS'
  let _serviceDetail:any
  _serviceDetail = this._serviceCodeDetails.getServiceDetails(beneServicode);
  setTimeout(() => {
    this._router.navigate(_serviceDetail.servicePath, {
      queryParams: {
        // accountNumber: this.state.cardData?.accountNumber,
        cardRefNumber: this.state.cardData?.cardRefNumber,
        // selecetedIndex: 3,
        fromServiceCode:this.serviceCode
      }
    });
  });
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


 public handleFormOnLoad(){
  this.setValue('termsFlag',null);
  this.setReadonly('charges', true);
  this.state.cardData = this._appConfig.getData('debitCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber)
}
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Dcstatusrequest):any {
  
  let cardEndNumber;
  if(this.state.cardData.cardNumber.includes(' ')){
    //k1
      cardEndNumber=this.state.cardData.cardNumber.split(' ')[3];
  }else{
    //k4
     cardEndNumber=this.state.cardData.cardNumber.slice(12,16);
  }
    this._appConfig.setData('cardEndNumber', cardEndNumber);
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Dcstatusrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.dcstatusrequest.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }


  // public override postSubmitInterceptor(response: any): RoutingInfo {
  //   console.log(response);
  //   let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     let res = response.success?.body?.dcstatusrequest;
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

  public handleFormOnPostsubmit(response:any,routingInfo:any){
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.dcstatusrequest;
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
 
 
