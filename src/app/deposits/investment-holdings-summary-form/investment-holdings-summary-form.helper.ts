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
import { InvestmentHoldingsService } from '../investmentHoldings-service/investmentHoldings.service';
import { InvestmentHoldings } from '../investmentHoldings-service/investmentHoldings.model';
import { Deposits } from "../deposits-service/deposits.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";

export class investmentHoldingsState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	accountNumber:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  isDataReceived: boolean | undefined;
  cardData!: Deposits;

}


@Injectable()
export class investmentHoldingsHelper extends BaseFpxFormHelper<investmentHoldingsState>{

   constructor( private investmentHoldingsService: InvestmentHoldingsService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService
   ) 
    {
        super(new investmentHoldingsState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILINVESTMENTHOLDINGS");
 }
 public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
 
  //this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
  this.state.cardData = this._appConfig.getData('accountCardData')[0];
  
}

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: InvestmentHoldings):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: InvestmentHoldings){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
InvestmentHoldingsRoGrid($event:any){
  if($event.eventName == 'afterDataFetch'){
    this.state.isDataReceived = true;
   // this.state.billedGridData = $event.payload;
  }
}
  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.investmentHoldings.tenantId.customerCode,
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
 

