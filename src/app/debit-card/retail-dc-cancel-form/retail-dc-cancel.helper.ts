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
import { CanceldebitcardService } from '../canceldebitcard-service/canceldebitcard.service';
import { Canceldebitcard } from '../canceldebitcard-service/canceldebitcard.model';
import { AppConfigService } from "@dep/services";
export class retaildccancelState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

 	showSuggestion : boolean = false;
	terms:any={
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
	FieldId_5:any={
	 text:" Sample Text"
	}
}


@Injectable()
export class retaildccancelHelper extends BaseFpxFormHelper<retaildccancelState>{

   constructor( private retaildccancelService: CanceldebitcardService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new retaildccancelState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILDCCANCEL");
 }
   
 public handleFormOnLoad(){
  this.setReadonly('charges', true);
}

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

 
  public override preSubmitInterceptor(payload: Canceldebitcard):any {
     // WRITE CODE HERE TO HANDLE 
     payload.charges=this.getValue('charges').amount;
     payload.currency=this.getValue('charges').currencyCode;
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Canceldebitcard){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.canceldebitcard;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
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
    return routingInfo;
  }


 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
