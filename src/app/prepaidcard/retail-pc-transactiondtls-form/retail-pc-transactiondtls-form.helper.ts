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
  FpxModal,
  FpxModalAfterClosed,
  CriteriaQuery,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PctransactiondtlsService } from "../pctransactiondtls-service/pctransactiondtls.service";
import { Pctransactiondtls } from "../pctransactiondtls-service/pctransactiondtls.model";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { RetailpcTransactionFilterComponent } from "../retail-pc-transaction-filter/retail-pc-transaction-filter.component";
import { RetailPcTransactionDownloadFilterComponent } from "../retail-pc-transaction-download-filter/retail-pc-transaction-download-filter.component";
import { PrepaidcardService } from "../prepaidcard-service/prepaidcard.service";
export class RetailPCTransactiondtlsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  cardData!: Prepaidcard;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
}

@Injectable()
export class RetailPCTransactiondtlsFormHelper extends BaseFpxFormHelper<RetailPCTransactiondtlsFormState> {
  accountNumber: any;
  fromDate: any;
  toDate: any;
  constructor(
    private retailPCTransactiondtlsFormService: PctransactiondtlsService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _prepaidcardService: PrepaidcardService
  ) {
    super(new RetailPCTransactiondtlsFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.removeShellBtn("BACK");
    this.state.cardData = this._appConfig.getData('prepaidCardData'); 

    this._prepaidcardService.onChangePrepaidCard$.subscribe((creditcard: Prepaidcard) => {
      this.state.cardData = creditcard;
      this.reloadGrid();
    });
  }

  reloadGrid() {
    const criteriaQuery = new CriteriaQuery();
    // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.state.cardData!.accountNumber });
    criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: this.state.cardData!.cardRefNumber });
    this.setGridCriteria('pctransactionSummaryGrid', criteriaQuery);
  } 

  public override doPostInit(): void {}

  handlePcTransactionGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    }
  }

  public override preSubmitInterceptor(payload: Pctransactiondtls): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Pctransactiondtls) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef:
          response.success?.body?.pctransactiondtls.transactionReference,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

  filter() {
    let modal = new FpxModal();
    modal.setComponent(RetailpcTransactionFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "DcTransactionHistoryGrid.title",
      accountNumber: this.state.formValues?.accountNumber,
      minAmount:this.state.formValues?.minAmount,
      maximumAmount:this.state.formValues?.maximumAmount,
      cardRefNumber:this.state.formValues?.cardRefNumber,
      downloadFileFormat:this.state.formValues?.downloadFileFormat,
      transactionRangeType:this.state.formValues?.transactionRangeType,
      toDate:this.state.formValues?.toDate,
      fromDate:this.state.formValues?.fromDate,
      transactionReference:this.state.formValues?.transactionReference
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    this.fromDate = payload.fromDate;
    this.toDate = payload.toDate;
    
    // this.accountNumber = payload.debitAccountNumber;
    const criteriaQuery = new CriteriaQuery();
    // let cardRefNumber= this.getRoutingParam('cardRefNumber');
    //  criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: payload.accountNumber });
     criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: payload.cardRefNumber });
    criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.fromDate, dateTo: this.toDate });
    criteriaQuery.addFilterCritertia('transactionReference', 'String', 'equals', { searchText: payload.transactionReference });
    
    if(payload.maximumAmount && payload.minAmount == '') {
      payload.minAmount = 0;
    }
    if((payload.minAmount != "" || payload.minAmount == 0) && payload.maximumAmount != "") {
      criteriaQuery.addFilterCritertia('transactionAmount','Numeric','inRange',{
        fromValue : payload.minAmount,
        toValue : payload.maximumAmount
      })
    }
    
  this.state.formValues ={
    ...this.formGroup.value,
    transactionRangeType:payload.transactionRangeType,
    accountNumber:payload.accountNumber,
    cardRefNumber: payload.cardRefNumber,
    minAmount: payload.minAmount,
    maximumAmount:payload.maximumAmount,
    fromDate: payload.fromDate,
    toDate: payload.toDate,
    transactionReference:payload.transactionReference,
    downloadFileFormat: payload.downloadFileFormat
  }
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'Date');
    this.setGridCriteria('pctransactionSummaryGrid', criteriaQuery);
  }
 public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {
    let modal = new FpxModal();
    modal.setComponent(RetailPcTransactionDownloadFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "DcTransactionHistoryGridDownload.title",
      accountNumber: this.state.formValues?.accountNumber,
      cardRefNumber: this.state.formValues?.cardRefNumber,
      transactionRangeType: this.state.formValues?.transactionRangeType,
      maximumAmount: this.state.formValues?.maximumAmount,
      minAmount: this.state.formValues?.minAmount,
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate,
      transactionReference:this.state.formValues?.transactionReference,
      downloadFileFormat: this.state.formValues?.downloadFileFormat
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
}
