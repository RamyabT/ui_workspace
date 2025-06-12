import { inject, Injectable } from "@angular/core";
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
import { RpcontractaccountinfoService } from '../rpcontractaccountinfo-service/rpcontractaccountinfo.service';
import { Rpcontractaccountinfo } from '../rpcontractaccountinfo-service/rpcontractaccountinfo.model';
import { AppConfigService } from "@dep/services";
export class RetailRPAccountInfoState extends BaseFpxComponentState {
 	private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	depositAmount:any={
	  isCurrEditable: true,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : false,
	}

  
	fromAccount:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class RetailRPAccountInfoHelper extends BaseFpxFormHelper<RetailRPAccountInfoState>{

   constructor( private retailRPAccountInfoService: RpcontractaccountinfoService, 
    private _httpProvider : HttpProviderService,private _router: Router,private _appConfig: AppConfigService) 
    {
        super(new RetailRPAccountInfoState());
    }
  
  override doPreInit(): void {
  //  this.setServiceCode("RETAILRPNCTFSA");
    this.setServiceCode(this._appConfig.getData('serviceCode'));
    this.formGroup.controls['segmentId'].setValue(this._appConfig.getData('rpSegmentId'));
    this.formGroup.controls['productId'].setValue(this._appConfig.getData('rpProductId'));
 }
   
  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Rpcontractaccountinfo):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Rpcontractaccountinfo){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.rpcontractaccountinfo.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

