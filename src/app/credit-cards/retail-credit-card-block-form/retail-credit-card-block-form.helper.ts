import { Injectable,inject } from "@angular/core";
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
import { CcstatusrequestService } from '../ccstatusrequest-service/ccstatusrequest.service';
import { Ccstatusrequest } from '../ccstatusrequest-service/ccstatusrequest.model';
import { Creditcard } from "../creditcard-service/creditcard.model";
import { AppConfigService } from "@dep/services";
export class retailcreditcardblockState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	// charges:any={
	//   isCurrEditable: false,
	//   CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
	//    amountInWords : false,
	//    initCurrency : this._appConfig.baseCurrency,
	//    defaultFetch : false,
	// }
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  cardData!: Creditcard;
}


@Injectable()
export class retailcreditcardblockHelper extends BaseFpxFormHelper<retailcreditcardblockState>{
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
   constructor( private retailcreditcardblockService: CcstatusrequestService, 
    private _appConfig: AppConfigService,private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new retailcreditcardblockState());
    }
   
  override doPreInit(): void {
    this.setHidden('otherReason', true);
    this.addValueChangeHandler("reason", this.handleBlockReasonOnvalueChange);
 this.setServiceCode("RETAILCCBLOCK");
 this.addResetHandler("reset",this.resetForm.bind(this))
 }

 resetForm() {
  console.log(this.formGroup)
  this.reset('otherReason',"");
  this.reset('reason',"");
  this.reset('remarks',"");
  this.reset('termsFlag',"")
 
  }
  addlimitCountriesLink() {
    let beneServicode='RETAILCCLIMITS'
    let _serviceDetail:any
    _serviceDetail = this._serviceCodeDetails.getServiceDetails(beneServicode);
    setTimeout(() => {
      this._router.navigate(_serviceDetail.servicePath, {
        queryParams: {
          // accountNumber: this.state.cardData?.accountNumber,
          cardRefNumber: this.state.cardData?.cardRefNumber,
          selecetedIndex: 3,
          serviceCode: 'RETAILCCLIMITS'
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



//  public handleFormOnLoad(){
//   this.state.cardData = this._appConfig.getData('creditCardData');
//   // this.setReadonly('charges', true);
//  }
 
public override doPostInit(): void {
  if(this.getRoutingParam('cardReference')){
    this.setValue('cardReference', this.getRoutingParam('cardReference'));
  }
  this.state.cardData = this._appConfig.getData('creditCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber);
}

  public handleCardReferenceOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
console.log('kayal')
  }
  public override preSubmitInterceptor(payload: Ccstatusrequest):any {

    let cardEndNumber;
    if(this.state.cardData.creditCardNumber.includes(' ')){
        cardEndNumber=this.state.cardData.creditCardNumber.split(' ')[3];
    }else{
       cardEndNumber=this.state.cardData.creditCardNumber.slice(12,16);
    }
      this._appConfig.setData('cardEndNumber', cardEndNumber);
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Ccstatusrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.ccstatusrequest;
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
    this.handleFormOnPostsubmit(response, routingInfo);
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
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
