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
import { PfmbudgetService } from '../pfmbudget-service/pfmbudget.service';
import { Pfmbudget } from '../pfmbudget-service/pfmbudget.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";export class PfmBudgetModifyFormState extends BaseFpxComponentState {
  protected _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	startDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
	endDate:any={
	   minDate:"",
       maxDate:"",
     }
     budgetAmount:any={
      isCurrEditable: false,
      CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
      amountInWords: false,
      initCurrency: this._appConfig.baseCurrency,
      defaultFetch: false,
    }
}


@Injectable()
export class PfmBudgetModifyFormHelper extends BaseFpxFormHelper<PfmBudgetModifyFormState>{

   constructor( private pfmBudgetModifyFormService: PfmbudgetService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new PfmBudgetModifyFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILMODIFYPFMBUDGET");
 }
   
 public handleFormOnLoad(){
  let categoryCode:any= this.getRoutingParam('categoryCode');
  let key: any = {
    categoryCode: categoryCode
  }

  this.pfmBudgetModifyFormService.findByKey(key)().subscribe((res: any) => {
      if (res) {
        this.setValue('budgetAmount', { amount: res?.budgetAmount});
        this.setValue('categoryCode', res?.categoryCode?.categoryCode);
        this.setValue('pfmSubCategory', res?.subCategoryCode);
        this.setValue('startDate', res?.startDate);
        this.setValue('endDate', res?.endDate);
        this.setValue('frequency', res?.budgetFrequency);
        this.setValue('currencyCode',res?.currencyCode)
        
      }
    },
  )

  
  //this.setReadonly('budgetAmount',true);
  this.setReadonly('categoryCode',true);
  this.setReadonly('pfmSubCategory',true);
  this.setReadonly('startDate',true);
  this.setReadonly('endDate',true);
  this.setReadonly('frequency',true);
  this.setReadonly('categoryCode',true);
  this.setReadonly('currencyCode',true)
  
 }
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Pfmbudget):any {
    payload.budgetAmount=payload.budgetAmount.amount;
     // WRITE CODE HERE TO HANDLE 
     payload.operationMode='M';
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Pfmbudget){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  let res = response.success?.body?.pfmbudgetreq;
  if (response.success) {
    routingInfo.setQueryParams({
      response: res,
      status: "success"
    });
  } else if (response.error) {
    let error = response.error.error;
    routingInfo.setQueryParams({
      response: error,
      serviceCode: this.serviceCode.value
    });
  }
  return res;
}

public override postSubmitInterceptor(response: any): RoutingInfo {
  console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response, routingInfo);

  return routingInfo;
}

  

//   public override postSubmitInterceptor(response:any): RoutingInfo {
//    console.log(response);
//   let routingInfo: RoutingInfo = new RoutingInfo();
//     routingInfo.setNavigationURL("confirmation");
//     if (response.success) {
//       routingInfo.setQueryParams({
//         transRef: response.success?.body?.pfmbudget.categoryCode.customerCode.tenantId,
//         status: "success",
//       });
//     } else if (response.error) {
//       routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
//     }
//     return routingInfo;
//   }
//  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

