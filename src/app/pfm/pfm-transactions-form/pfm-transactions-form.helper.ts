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
  FpxModal,
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PfmtransactionService } from '../pfmtransaction-service/pfmtransaction.service';
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class PfmTransactionsFormState extends BaseFpxComponentState {
   protected _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	paymentDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
	transactionAmount:any={
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
	}
  


@Injectable()
export class PfmTransactionsFormHelper extends BaseFpxFormHelper<PfmTransactionsFormState>{
  PfmtransactionService: any;

   constructor( private pfmTransactionsFormService: PfmtransactionService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new PfmTransactionsFormState());
    }
   
  override doPreInit(): void {
  //this.setServiceCode("RETAILPFMTRANSACTION");
    // this.addSubmitHandler('submit', this.customSubmitHandler);
    // this.setServiceCode("RETAILPFMTRANCATMAPPING")

 }


 
 public handleFormOnLoad(){
  let key: any = {
    tenantId: 'INTELLECT',
    inventoryNumber: '20230529112354058021'
  }

  this.pfmTransactionsFormService.findByKey(key)().subscribe((res: any) => {
      if (res) {
        this.setValue('externalReferenceNumber', res?.inventoryNumber);
        this.setValue('paymentDate', res?.paymentDate);
        this.setValue('transactionAmount', res?.transactionAmount);
        this.setValue('transactionAmount', { amount: res?.transactionAmount, currencyCode: res?.transactionCurrency });
        this.setValue('transactioncategory', res?.transactionDescription);
        this.setValue('categoryCode', res?.categoryCode);
        this.setValue('merchant', res?.merchantCode?.merchantName);
      }
    },
  )

  this.setReadonly('externalReferenceNumber',true);
  this.setReadonly('paymentDate',true);
  this.setReadonly('transactionAmount',true);
  this.setReadonly('transactioncategory',true);
  // this.setReadonly('categoryCode',true);
  this.setReadonly('merchantName',true);
  
 }
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Pfmtransaction):any {
     // WRITE CODE HERE TO HANDLE 
    payload.transactionAmount=this.getValue('transactionAmount').amount;
    payload.transactionRef=this.getValue('externalReferenceNumber');
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Pfmtransaction){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  let res = response.success?.body?.pfmtrancatmappingreq;
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

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.pfmtransaction.tenantId.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

