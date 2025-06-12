import { Inject, Injectable } from "@angular/core";
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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsfilterformComponent } from "src/app/accounts/retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { Casatransactiondtls } from "src/app/accounts/casatransactiondtls-service/casatransactiondtls.model";
import { RetailFilterTransactionComponent } from "src/app/transfers/retail-filter-transaction-form/retail-filter-transaction-form.component";
import { retailDownloadTransactionFormComponent } from "src/app/transfers/retail-download-transaction-form/retail-download-transaction-form.component";
import { WalletFilterTransactionFormComponent } from "../wallet-filter-transaction-form/wallet-filter-transaction-form.component";
 
export class WalletTransactionSummaryState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
}

@Injectable()
export class WalletTransactionSummaryHelper extends BaseFpxFormHelper<WalletTransactionSummaryState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
  ) {
    super(new WalletTransactionSummaryState());
  }

  override doPreInit(): void {
    this.hideShellActions();
           let criteriaQuery:CriteriaQuery = new CriteriaQuery();
          let accno = this._appConfig.getData('walletID');
          criteriaQuery.addFilterCritertia("accountNumber", "String", "equals", {
          searchText: accno,
          });
          this.setGridCriteria("transferHistoryGrid",criteriaQuery);
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  filter() {
    let modal = new FpxModal();
    modal.setComponent(WalletFilterTransactionFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "TransferHistoryGrid.title"
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    const criteriaQuery = new CriteriaQuery();
    if (payload?.fromDate && payload?.toDate) {
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: payload.fromDate, dateTo: payload.toDate });
    }
    if (payload.walletName != "") {
      criteriaQuery.addFilterCritertia('walletName', 'String', 'contains', { searchText: payload.walletName });
    }
    if (payload.transactionReference != "") {
      criteriaQuery.addFilterCritertia('transactionReference', 'String', 'equals', { searchText: payload.transactionReference });
    }
    if(payload.transactionAmount != ""){
      criteriaQuery.addFilterCritertia('transactionAmount', 'String', 'equals', { searchText: payload.transactionAmount });
    }
    if(payload.transType != ""){
      criteriaQuery.addFilterCritertia('transType', 'String', 'equals', { searchText: payload.transType });
    }


    this.setGridCriteria('transferHistoryGrid', criteriaQuery);

    this.state.formValues = {
      ...this.formGroup.value,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      transactionPeriod: payload.transactionPeriod,
      walletName:payload.walletName,
      transactionReference: payload.transactionReference, 
      transType:payload.transType,
      transactionAmount:payload.transactionAmount,
     }
  }

  onDownloadClick() {
    let modal = new FpxModal();
    modal.setComponent(retailDownloadTransactionFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "retailDownloadTransactionFormComponent.title"
    });
    this.openModal(modal);
  }

  initiateNewTransaction() {
    this._angularRouter.navigate(['transfers-space', 'display-shell', 'transfers', 'initiate-a-transfers']);
  }

  handleTransfersHistoryGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    }
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}