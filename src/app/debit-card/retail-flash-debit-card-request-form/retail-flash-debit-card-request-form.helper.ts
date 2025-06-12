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
import { FlashdebitcardrequestService } from '../flashdebitcardrequest-service/flashdebitcardrequest.service';
import { Flashdebitcardrequest } from '../flashdebitcardrequest-service/flashdebitcardrequest.model';
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
export class RetailFlashDebitCardRequestFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   cardData!: Debitcard;
}


@Injectable()
export class RetailFlashDebitCardRequestFormHelper extends BaseFpxFormHelper<RetailFlashDebitCardRequestFormState>{

   constructor( private retailFlashDebitCardRequestFormService: FlashdebitcardrequestService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService) 
    {
        super(new RetailFlashDebitCardRequestFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILFLASHDEBITCARD");
 this.setDisabled('cardNumber',true);
 this.setDisabled('cardHolderName',true);
 this.setDisabled('cvv',true);
 this.setDisabled('validThru',true);
 this.setDisabled('validFrom',true);
 }
 public handleFormOnLoad(){
  this.state.cardData = this._appConfig.getData('debitCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber)
}

  public override doPostInit(): void {
    this.addControlEventHandler("cardReferenceDataReceived", this.onCardRefNumberDataReceived);
    this.handleFormOnLoad();
  
  }
  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.setValue('cardNumber', payload.cardRefNumber);
      this.setValue('cardHolderName', payload.cardHolderName);
      this.setValue('cvv', payload.cvv);
      this.setValue('validThru', payload.validThru);
      this.setValue('validFrom', payload.issueDate);

    }
  }
  
 
  public override preSubmitInterceptor(payload: Flashdebitcardrequest):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Flashdebitcardrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
if (response.success) {
     let res = response.success?.body?.flashdebitcardrequest;
     routingInfo.setQueryParams({
       response: res
     });
   } else if (response.error) {
     let error = response.error.error;
     routingInfo.setQueryParams({
       result: {
         statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
         message: error.ErrorMessage,
         description: error.ErrorDescription,
         serviceCode: this.serviceCode,
       }
     });
   }
   return response;
 }
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    // if (response.success) {
    //   routingInfo.setQueryParams({
    //     transRef: response.success?.body?.flashdebitcardrequest.inventoryNumber,
    //     status: "success",
    //   });
    // } else if (response.error) {
    //   routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    // }
    this.handleFormOnPostsubmit(response,routingInfo);
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
