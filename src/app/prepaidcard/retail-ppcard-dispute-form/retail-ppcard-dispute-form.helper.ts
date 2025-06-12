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
import { RaisedisputePrepaidCardService } from '../raisedisputePrepaidCard-service/raisedisputePrepaidCard.service';
import { RaisedisputePrepaidCard } from '../raisedisputePrepaidCard-service/raisedisputePrepaidCard.model';
import { AppConfigService } from "@dep/services";
import { PctransactiondtlsService } from "../pctransactiondtls-service/pctransactiondtls.service";
import moment from "moment";
export class raisedisputePrepaidCardState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionDate: any = {
    minDate: "",
    maxDate: "",
  }

  transactionAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }

  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }

  supportingDocuments: any = {
    minSize: "1024",
    maxSize: "10000024",
    extensions: ".pdf,.jpg,.png,application/pdf,image/jpg,image/png"
  }
  FieldId_7: any = {
    text: " Sample Text"
  }
  transferHistoryDetails: any;
}


@Injectable()
export class raisedisputePrepaidCardHelper extends BaseFpxFormHelper<raisedisputePrepaidCardState> {

  constructor(private raisedisputedebitcardService: RaisedisputePrepaidCardService,

    private _httpProvider: HttpProviderService, private _router: Router,
    private _pctransactiondtlsService: PctransactiondtlsService,
    private _appConfig: AppConfigService) {
    super(new raisedisputePrepaidCardState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILPPDISPUTE");
    this.state.transferHistoryDetails = this._appConfig.getData('pcTransferHistory');
    this._appConfig.removeData('pcTransferHistory');
    this.addResetHandler("reset", this.resetForm.bind(this));
    this.addValueChangeHandler("reason", this.handlereasonOnvalueChange);
    let transactionDate: any = moment(this.state.transferHistoryDetails?.transactionDate, 'YYYY-MM-DD HH24:mm:ss').format('YYYY-MM-DD');
    this.setValue('transactionDate', transactionDate);
    // this.setValue('transactionDate', this.state.transferHistoryDetails?.transactionDate);
    this.setValue('transactionAmount', this.state.transferHistoryDetails?.transactionAmount);
    this.setValue('transType', this.state.transferHistoryDetails?.transType);
    this.setValue('transactionCurrency', this.state.transferHistoryDetails?.transactionCurrency);
    this.setValue('transactionReference', this.state.transferHistoryDetails?.transactionReference);
    this.addValueChangeHandler("terms", this.handleTermsFlagOnvalueChange);
    this.setHidden('otherReason',true);
    if (this.getFormMode() == 'ADD') {
      this.setHidden('cardNumber', true);
    }
    else {
      this.setHidden('cardNumber', false);
    }

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
    this.reset('reason', "");
    this.reset('supportingDocuments', "");
    this.reset('remarks', "");
    this.reset('terms', "")
  }

 public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,

    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value =="N"){
      this.setValue('terms',null);
    }
  }

  public override doPostInit(): void {


  }


  public override preSubmitInterceptor(payload: RaisedisputePrepaidCard): any {
    // WRITE CODE HERE TO HANDLE 
    if (payload.inventoryNumber=='' ||payload.inventoryNumber==undefined) {
      delete payload.inventoryNumber
    }
    payload.cardReference = this.state.transferHistoryDetails.cardRefNumber;
    payload.transactionAmount = Number(payload.transactionAmount);
    this._appConfig.setData('transactionReference', this.state.transferHistoryDetails.transactionReference);
    payload.merchantId=this.state.transferHistoryDetails.merchantId;
    payload.transactionDescription=this.state.transferHistoryDetails.transactionDescription;
    payload.transCat=this.state.transferHistoryDetails.transCat;
    

    if(payload.supportingDocuments?.length==0){
      delete payload.supportingDocuments
    }
    if(payload.remarks==""){
      delete payload.remarks
    }
    delete payload?.cardNumber;
      return payload;
  }


  public override postDataFetchInterceptor(payload: RaisedisputePrepaidCard) {
    // WRITE CODE HERE TO HANDLE \
    this.state.transferHistoryDetails = payload;
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.raisedisputePrepaidCard;
      routingInfo.setQueryParams({
        response: res,

      });
    }
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode:this.serviceCode.value
      });
    }
    return routingInfo;
  }


  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


