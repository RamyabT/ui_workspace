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
import { ApplyvirtualcardService } from '../applyvirtualcard-service/applyvirtualcard.service';
import { Applyvirtualcard } from '../applyvirtualcard-service/applyvirtualcard.model';
import { AppConfigService } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
export class applyVirtualCardState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	charges:any={
	  isCurrEditable: true,
	  CurrencyList: [{ id: 'INR', text:'INR'}],
	   amountInWords : false,
	   initCurrency : 'AED',
	   defaultFetch : false,
	}
	addtowallet:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class applyVirtualCardHelper extends BaseFpxFormHelper<applyVirtualCardState>{

   constructor( private applyVirtualCardService: ApplyvirtualcardService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService,private _commonService:CommonService
   ) 
    {
        super(new applyVirtualCardState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("COBAPPLYVIRTUALCARD");
 
 this.setReadonly("charges", true);

 
  
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("cardspendlimit", this.handleAmountOnValueChange);
  }

  public handleAmountOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let baseCurrency=this._appConfig.baseCurrency

    this._commonService.fetchCharges(value.amount,'CASAONBOARDING',baseCurrency,'').subscribe({
      next:(res)=>{
        this.setValue('charges',{amount:res?.totalChargeAmtChargeCcy,currencyCode:'AED'})
      }
    })



    

  }
  
 
  public override preSubmitInterceptor(payload: Applyvirtualcard):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Applyvirtualcard){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.applyvirtualcard.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ 
        response: response.error.error,
        status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

