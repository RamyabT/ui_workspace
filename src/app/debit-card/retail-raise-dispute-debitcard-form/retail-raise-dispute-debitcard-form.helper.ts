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
import { RaisedisputedebitcardService } from '../raisedisputedebitcard-service/raisedisputedebitcard.service';
import { Raisedisputedebitcard } from '../raisedisputedebitcard-service/raisedisputedebitcard.model';
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { DctransactiondtlsService } from "../dctransactiondtls-service/dctransactiondtls.service";
import { DebitcardService } from "../debitcard-service/debitcard.service";
import moment from "moment";
export class raisedisputedebitcardState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionDate: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  supportingDocuments: any = {
    minSize: "1024",
    maxSize: "10000024",
    extensions: ".pdf,.jpg,.png,application/pdf,image/jpg,image/png"
  }
  FieldId_16: any = {
    text: " Sample text"
  }
  cardData!: Debitcard;
  transferHistoryDetails: any;

}


@Injectable()
export class raisedisputedebitcardHelper extends BaseFpxFormHelper<raisedisputedebitcardState> {
  debitcardDetails: any;
  transactionDetails: any;
  constructor(private raisedisputedebitcardService: RaisedisputedebitcardService, private _httpProvider: HttpProviderService, private _router: Router,
    private _dctransactiondtlsService: DctransactiondtlsService,
    private retaildebitcardformService: DebitcardService,
    private _appConfig: AppConfigService) {
    super(new raisedisputedebitcardState());
  }

  override doPreInit(): void {
    this.addValueChangeHandler("disputeLetter", this.handleDisputeLetterOnvalueChange);
    this.addValueChangeHandler("reason", this.handlereasonOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);

    this.setServiceCode("RETAILDCRAISEDISPUTE");
    this.addResetHandler("reset", this.resetForm.bind(this));
    
    if (this.getFormMode() == 'ADD') {
      this.setHidden('cardNumber', true);
      this.setValue('termsFlag',null);
    }
    else {
      this.setHidden('cardNumber', false);
    }

    this.setReadonly('cardType', true);
    this.setReadonly('cardHolderName', true);
    this.setReadonly('transactionAmount', true);
    this.setReadonly('transactionReference', true);
    this.setReadonly('transactionDate', true);
    this.state.transferHistoryDetails = this._appConfig.getData('dcTransferHistory');
    this._appConfig.removeData('dcTransferHistory');
      this.setValue('cardReference', this.state.transferHistoryDetails?.cardRefNumber);
    let transactionDate: any = moment(this.state.transferHistoryDetails?.transactionDate, 'YYYY-MM-DD HH24:mm:ss').format('YYYY-MM-DD');
    this.setValue('transactionDate', transactionDate);
      // this.setValue('transactionDate', this.state.transferHistoryDetails?.transactionDate);
      this.setValue('transactionAmount', this.state.transferHistoryDetails?.transactionAmount);
      this.setValue('transType', this.state.transferHistoryDetails?.transType);
      this.setValue('transactionCurrency', this.state.transferHistoryDetails?.transactionCurrency);
      this.setValue('transactionReference', this.state.transferHistoryDetails?.transactionReference);
      this.setHidden('otherReason',true);
  }



  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('termsFlag',null)
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
    this.reset('remarks', "");
    this.reset('termsFlag', "");
    this.reset('reason', "");
    this.reset('supportingDocuments', "")

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


  public override preSubmitInterceptor(payload: Raisedisputedebitcard): any {
    // WRITE CODE HERE TO HANDLE 
    if (payload.inventoryNumber=='' ||payload.inventoryNumber==undefined) {
      delete payload.inventoryNumber
    }
	payload.transactionAmount=Number(payload.transactionAmount);
  this._appConfig.setData('transactionReference', this.state.transferHistoryDetails?.transactionReference);

  payload.merchantId=this.state.transferHistoryDetails?.merchantId;
  payload.transactionDescription=this.state.transferHistoryDetails?.transactionDescription;
  payload.transCat=this.state.transferHistoryDetails?.transCat;


  if(payload.supportingDocuments?.length==0){
    delete payload.supportingDocuments
  }
  if(payload.remarks==""){
    delete payload.remarks
  }
 delete payload?.cardNumber;
    return payload;
  }


  public override postDataFetchInterceptor(payload: Raisedisputedebitcard) {
    // WRITE CODE HERE TO HANDLE 
   this.state.transferHistoryDetails=payload
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.raisedisputedebitcard;
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

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);

    return routingInfo;
  }


  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


