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
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CcraisedisputeService } from '../ccraisedispute-service/ccraisedispute.service';
import { Ccraisedispute } from '../ccraisedispute-service/ccraisedispute.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { CreditcardService } from "../creditcard-service/creditcard.service";
import { Ccstatementdetail } from "../ccstatementdetail-service/ccstatementdetail.model";
import { CctransactionsummaryService } from "../cctransactionsummary-service/cctransactionsummary.service";
import moment from "moment";
export class ccraisedisputeState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionDate: any = {
    minDate: "",
    maxDate: "",
  }
  transactionAmount: any = {
    //  min: 100,
    //    max: 10000,
    //    step: 100,
    //    currencyCode: this._appConfig.baseCurrency
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  supportingDocuments: any = {
    minSize: "1024",
    maxSize: "10000024",
    extensions: ".pdf,.jpg,.png,application/pdf,image/jpg,image/png"
  }
  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  cardData!: Creditcard;
  transferHistoryDetails: any;
}


@Injectable()
export class ccraisedisputeHelper extends BaseFpxFormHelper<ccraisedisputeState>{
  creditcardDetails: any;
  constructor(private ccraisedisputeService: CcraisedisputeService,
    private retailcreditcardformService: CreditcardService,
    private _cctransactiondtlsService: CctransactionsummaryService, private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new ccraisedisputeState());
  }

  override doPreInit(): void {
    this.addValueChangeHandler("disputeLetter", this.handleDisputeLetterOnvalueChange);
    this.addValueChangeHandler("reason", this.handlereasonOnvalueChange);
    this.addResetHandler("reset", this.resetForm.bind(this));
    this.setServiceCode("RETAILCCRAISEDISPUTE");

    if (this.getFormMode() == 'ADD') {
      this.setHidden('cardNumber', true);
    }
    else {
      this.setHidden('cardNumber', false);
    }

    this.setReadonly('cardType', true);
    this.setReadonly('cardHolderName', true);
    this.setReadonly('transactionAmount', true);
    this.setReadonly('transactionReference', true);
    this.setReadonly('transactionDate', true);

    this.state.transferHistoryDetails = this._appConfig.getData('ccTransferHistory');
    this._appConfig.removeData('ccTransferHistory');
    this.setValue('cardRefNumber', this.state.transferHistoryDetails?.cardRefNumber);
    let transactionDate: any = moment(this.state.transferHistoryDetails?.transactionDate, 'YYYY-MM-DD HH24:mm:ss').format('YYYY-MM-DD');
    this.setValue('transactionDate', transactionDate);
    this.setValue('transactionAmount', this.state.transferHistoryDetails?.transactionAmount);
    this.setValue('transType', this.state.transferHistoryDetails?.transType);
    this.setValue('transactionCurrency', this.state.transferHistoryDetails?.transactionCurrency);
    this.setValue('transactionReference', this.state.transferHistoryDetails?.transactionReference);
    this.setHidden('otherReason',true);
  }
  public handlereasonOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
   ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      if (value == '13'){
        this.setHidden('otherReason',false)
     }
     else{
      this.setHidden('otherReason',true)
     }
    }
   
  }
  resetForm() {
    console.log(this.formGroup)
    this.reset('remarks', "");
    this.reset('terms', "");
    this.reset('reason', "");
    this.reset('supportingDocument', "")

  }

  public override doPostInit(): void {

  }
    public handleDisputeLetterOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    console.log("111111111", value);
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.ccraisedispute;
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

  public override preSubmitInterceptor(payload: Ccraisedispute): any {
    // WRITE CODE HERE TO HANDLE 
    if (payload.inventoryNumber=='' ||payload.inventoryNumber==undefined) {
      delete payload.inventoryNumber
    }
    payload.transactionAmount=Number(payload.transactionAmount);
    this._appConfig.setData('transactionReference', this.state.transferHistoryDetails?.transactionReference);
    payload.merchantId=this.state.transferHistoryDetails?.merchantId;
    payload.transactionDescription=this.state.transferHistoryDetails?.transactionDescription;
    payload.transCat=this.state.transferHistoryDetails?.transCat;

    if(payload.supportingDocument?.length==0){
      delete payload.supportingDocument
    }
    if(payload.remarks==""){
      delete payload.remarks
    }
    delete payload?.cardNumber;
      return payload;
    
  }


  public override postDataFetchInterceptor(payload: Ccraisedispute) {
    // WRITE CODE HERE TO HANDLE 
    this.state.transferHistoryDetails=payload
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  override onReview(): void {
    if (!this.getValue('remarks')) {
      this.setHidden('remarks', true);
    }
    let supportingDocument = this.getValue('supportingDocument');
    if (!supportingDocument || supportingDocument.length == 0) {
      this.setHidden('supportingDocument', true);
      this.setHidden('infoNote', true);
    }
  }

  override backToEntryMode(): void {
    this.setHidden('remarks', false);
    this.setHidden('supportingDocument', false);
    this.setHidden('infoNote', false);
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


