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
  FpxModal,
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { NpsssendmoneyService } from "../npsssendmoney-service/npsssendmoney.service";
import { Npsssendmoney } from "../npsssendmoney-service/npsssendmoney.model";
import { AppConfigService } from "@dep/services";
import { NpssMainService } from "../npss-service/npss-main.service";
export class RetailSplitBillsQrcodeState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  accountBalance: any;
  totalAmount:any;
  noOfPerson:any;
  splitAmount:any;
  iban:any;
  senderMobileNumber: any;
  currency: any;
  remarks: any;
  individualAmount:any;
  npssDetail:any

}


@Injectable()
export class RetailSplitBillsQrcodeHelper extends BaseFpxFormHelper<RetailSplitBillsQrcodeState>{

  constructor(private nPSSSendMoneyService: NpsssendmoneyService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private appConfigService: AppConfigService,
    private _npssMainService:NpssMainService,
    protected _appConfig: AppConfigService) {
    super(new RetailSplitBillsQrcodeState
      ());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSPLITQRCODE");
    this.setServiceCode("RETAILSPLITREQTOPAY");
    this.state.npssDetail = this.appConfigService.getData('npssDetails');
}


  handleFormOnLoad() {
    this._appConfig.getData('controlFlag');
    if(this._appConfig.getData('controlFlag')=="0"){
      this.setDisabled('personCount', true);
      this.setHidden('personCountElement',true);
    }
    else{
      this.setHidden('personCountElement',false);
      this.setDisabled('personCount', false);
    }
  }

  customSubmitHandler: FpxSubmitHandler = () => {

    this.state.totalAmount = this.getValue('transactionAmount').amount;
    this.state.noOfPerson = this.getValue('personCount');
    this.state.iban = this.state.npssDetail.accountDetails[0].iban;
    this.state.senderMobileNumber = this.state.npssDetail.customerDetails.mobileNumber;
    this.state.splitAmount = (this.state.totalAmount/this.state.noOfPerson).toFixed(2);
    this.state.currency = this.getValue('transactionAmount').currencyCode;
    this.state.remarks = this.getValue('remarks');
    
   let payload ={
      totalAmount:this.state.totalAmount,
      noOfPerson: this.state.noOfPerson ,
      iban:this.state.iban,
      senderMobileNumber:this.state.senderMobileNumber,
      splitAmount:this.state.splitAmount ,
      currency:this.state.currency,
      remarks:this.state.remarks
   }
   this._appConfig.setData('splitBillData',payload);
      if(this._appConfig.getData('controlFlag')=="1"){
        this._npssMainService.fetchSplitQrRequest(payload).subscribe({
          next: (response:any) => {
            this._appConfig.setData('reqToPay', response.splitbillqrrequest.reqToPay);
            this._appConfig.setData('splitAmount', this.state.splitAmount);
            this._appConfig.setData('currency',this.state.currency);
            this._appConfig.setData('expireTime',response.splitbillqrrequest.expireTime);
           
             
            
    this._router.navigate(
      [
      "npss-space",
      "entry-shell",
      "npss",
      "scan-qr"
      ]
    );
          }
        });
  
  }
  else if(this._appConfig.getData('controlFlag')=="0"){
    this._router.navigate(
      [
      "npss-space",
      "display-shell",
      "npss",
      "retail-add-members-contact"
      ]
    );
  }
  return {
    success: (response: any) => {
      console.log('submit handler success');
    },
    error: (error: any) => {
      console.log("error");
    }
  }
  }

  public handleTransactionAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  }


  public override doPostInit(): void {
    this.addValueChangeHandler('transactionAmount', this.handleTransactionAmountOnvalueChange);
    this.handleFormOnLoad();
    this.addSubmitHandler('submit', this.customSubmitHandler);



  }

  handleFormOnPresubmit(payload: any) {

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


