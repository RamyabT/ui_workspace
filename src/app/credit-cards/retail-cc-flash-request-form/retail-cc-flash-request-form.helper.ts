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
import { CcflashrequestService } from "../ccflashrequest-service/ccflashrequest.service";
import { Ccflashrequest } from "../ccflashrequest-service/ccflashrequest.model";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { AppConfigService } from "@dep/services";
//import { CcflashrequestService } from '../ccflashrequest-service/ccflashrequest.service';
//import { Ccflashrequest } from '../ccflashrequest-service/ccflashrequest.model';
export class RetailCCFlashRequestFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	validThru:any={
	   minDate:"",
       maxDate:"",
     }
	validFrom:any={
	   minDate:"",
       maxDate:"",
     }
     cardData!: Creditcard;
}


@Injectable()
export class RetailCCFlashRequestFormHelper extends BaseFpxFormHelper<RetailCCFlashRequestFormState>{

   constructor( private retailCCFlashRequestFormService: CcflashrequestService, 
    private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService) 
    {
        super(new RetailCCFlashRequestFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCCFLASH");
 }
   
public handleFormOnLoad(){
  this.state.cardData = this._appConfig.getData('creditCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber)
}

public onCardRefNumberDataReceived:BaseFpxControlEventHandler = (payload: any) => {
// WRITE CODE HERE TO HANDLE 
this.setValue('cardNumber', payload.cardRefNumber);
this.setValue('cardHolderName', payload.cardHolderName);
this.setValue('cvv', payload.cvv);
this.setValue('validThru', payload.validThru);
this.setValue('validFrom', payload.issueDate);
}


public onTapClick:BaseFpxControlEventHandler = (payload: any) => {
// WRITE CODE HERE TO HANDLE 
}

  public override doPostInit(): void {
 this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
 this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Ccflashrequest):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Ccflashrequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response:any,routingInfo:any){
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.ccflashrequest;
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
 
 
