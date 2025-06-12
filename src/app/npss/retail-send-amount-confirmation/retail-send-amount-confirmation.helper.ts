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
import { NpsssendmoneyService } from "../npsssendmoney-service/npsssendmoney.service";
import { Npsssendmoney } from "../npsssendmoney-service/npsssendmoney.model";
import { AppConfigService } from "@dep/services";
export class NPSSSendMoneyState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  customerDetails: any = {

  }

  debitAccountDetails: any = {

  }
  accountBalance: any;
  serviceCodeVal:any


}


@Injectable()
export class NPSSSendMoneyHelper extends BaseFpxFormHelper<NPSSSendMoneyState>{

  constructor(private nPSSSendMoneyService: NpsssendmoneyService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private appConfigService: AppConfigService) {
    super(new NPSSSendMoneyState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILNPSSSENDMONEY");
    this.state.serviceCodeVal = this.getRoutingParam('serviceCode');
    let customerDetails:any;
    if(this.state.serviceCodeVal=='RETAILAPPROVEREQ'){
      customerDetails =  this.appConfigService.getData('npssApprovedReq');
    }
    else{
     customerDetails = this.appConfigService.getData('npssSendMoney');
  }
  customerDetails.customerName = customerDetails?.firstName + ' ' + customerDetails?.lastName;
    customerDetails.initial = customerDetails?.firstName.charAt(0) + customerDetails?.lastName.charAt(0);
    this.state.customerDetails = customerDetails;
  
    let debitAccountDetails = this.appConfigService.getData('npssDetails');
    if(!this.state.customerDetails?.transactionAmount){
    this.setValue('receipientAccNumber', this.state.customerDetails?.accountNumber);
    }
    this.setValue('beneValue', this.state.customerDetails?.mobileNumber)
    for (let i = 0; i < debitAccountDetails.accountDetails?.length; i++) {
      if (debitAccountDetails.accountDetails[i]?.defaultAccount == 'Y') {
        this.state.debitAccountDetails = debitAccountDetails.accountDetails[i];
        this.setValue('iban', this.state.debitAccountDetails[i]?.iban)
        this.setAmountCurrencyList('transactionAmount', [{
          id: debitAccountDetails.accountDetails[i]?.currency,
          text: debitAccountDetails.accountDetails[i]?.currency
        }]);
      }
    }

   
  
}


  handleFormOnLoad() {
    if (this.state.customerDetails?.transactionAmount) {
      this.setValue('transactionAmount', { amount:this.state.customerDetails?.transactionAmount,currencyCode:this.state.customerDetails?.currency});
      this.setValue('transactionCurrency',this.state.customerDetails?.currency);
      this.setValue('remarks',this.state.customerDetails?.remarks);
      this.setReadonly('transactionAmount',true);
      this.setValue('receipientAccNumber',this.state.customerDetails?.senderIban);
    }


  }


  public handleTransactionAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.amount) {
      if (value.amount > this.state.debitAccountDetails.availableBalance) {
        this.setErrors('transactionAmount', 'maxError');
      }
      // else {
      //   this.setValue('transactionAmount', value.amount);
      //   this.setValue('transactionCurrency', value.currencyCode);
      // }


    }

  }


  public override doPostInit(): void {
    this.addValueChangeHandler('transactionAmount', this.handleTransactionAmountOnvalueChange);
    this.handleFormOnLoad();


  }

  handleFormOnPresubmit(payload: any) {
    payload.receipientCustomerId = this.state.customerDetails?.receipientCustomerId;
    payload.iban = this.state.debitAccountDetails?.iban;
    payload.receipientAccNumber = this.state.customerDetails?.iban;
    payload.firstName = this.state.customerDetails?.firstName;
    payload.debitAccount = this.state.debitAccountDetails?.iban;

    // payload.beneValue=this.state.debitAccountDetails?.beneValue;
    payload.requestToPayID=this.state.customerDetails?.requestToPayID;
    payload.lastName = this.state.customerDetails?.lastName;
    payload.email = this.state.customerDetails?.email;
    payload.mobileNumber = this.state.customerDetails?.mobileNumber;
    payload.transactionCurrency = this.getValue('transactionAmount').currencyCode;
    payload.transactionAmount = this.getValue('transactionAmount').amount;
    if(this.state.serviceCodeVal=='RETAILAPPROVEREQ'){
      payload.operationMode = "S"
    }
  }


  public override preSubmitInterceptor(payload: Npsssendmoney): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Npsssendmoney) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.npsssendmoney
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
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


