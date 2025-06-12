import { ChangeDetectorRef, Injectable } from "@angular/core";
import { AppConfigService } from "@dep/services";
import {
  BaseFpxComponentState,
  BaseFpxControlEventHandler,
  BaseFpxFormHelper,
  CriteriaQuery,
  FpxModal,
  FpxModalAfterClosed,
} from "@fpx/core";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { RetailDcTransactionExFilterComponent } from "../retailDCTransactionExFilter/retail-dc-transaction-ex-filter.component";
import { RetailDcTransactionDownloadFilterComponent } from "../retailDcTransactionDownloadFilter/RetailDcTransactionDownloadFilter.component";
import { DebitcardService } from "../debitcard-service/debitcard.service";

export class RetailDcTransactionSummaryFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  cardData: Debitcard | undefined;
  formValues: any;
  isDataReceived: boolean = false;
    gridData: any;
}


@Injectable()
export class RetailDcTransactionSummaryFormComponentHelper extends BaseFpxFormHelper<RetailDcTransactionSummaryFormComponentState>{
  showFavTransaction: boolean = false;
  accountNumber: any;
  fromDate: any;
  toDate: any;

  constructor(
    private cd: ChangeDetectorRef,
    private _appConfig: AppConfigService,
    private debitcardService: DebitcardService) {
    super(new RetailDcTransactionSummaryFormComponentState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.removeShellBtn("BACK");
    this.state.cardData = this._appConfig.getData('debitCardData');

    this.debitcardService.onChangeDebitCard$.subscribe((debitcard: Debitcard) => {
      this.state.cardData = debitcard;
      this.reloadGrid();
    });
  }

  reloadGrid() {
    const criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.state.cardData!.accountNumber });
    criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: this.state.cardData!.cardRefNumber });
    this.setGridCriteria('dctransactionSummaryGrid', criteriaQuery);
  }

  public override doPostInit(): void {
  }

  filter() {
    let modal = new FpxModal();
    modal.setComponent(RetailDcTransactionExFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "DcTransactionHistoryGrid.title",
      accountNumber: this.state.formValues?.accountNumber,
      // minAmount:this.state.formValues?.minAmount,
      // maximumAmount:this.state.formValues?.maximumAmount,
      // cardRefNumber:this.state.formValues?.cardRefNumber,
      // downloadFileFormat:this.state.formValues?.downloadFileFormat,
      // transactionRangeType:this.state.formValues?.transactionRangeType,
      // toDate:this.state.formValues?.toDate,
      // fromDate:this.state.formValues?.fromDate,
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
     criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: payload.accountNumber });
     criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: payload.cardRefNumber });
    criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.fromDate, dateTo: this.toDate });
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
    // ...this.formGroup.value,
    transactionRangeType:payload.transactionRangeType,
    // accountNumber:payload.accountNumber,
    // cardRefNumber: payload.cardRefNumber,
    // minAmount: payload.minAmount,
    // maximumAmount:payload.maximumAmount,
    // fromDate: payload.fromDate,
    // toDate: payload.toDate,
    // downloadFileFormat: payload.downloadFileFormat
  }
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'Date');
    this.setGridCriteria('dctransactionSummaryGrid', criteriaQuery);
  }
 public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {
    let modal = new FpxModal();
    modal.setComponent(RetailDcTransactionDownloadFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "DcTransactionHistoryGridDownload.title",
      accountNumber: this.state.formValues?.accountNumber,
      cardRefNumber: this.state.formValues?.cardRefNumber,
      // transactionRangeType: this.state.formValues?.transactionRangeType,
      // maximumAmount: this.state.formValues?.maximumAmount,
      // minAmount: this.state.formValues?.minAmount,
      // fromDate: this.state.formValues?.fromDate,
      // toDate: this.state.formValues?.toDate,
      // downloadFileFormat: this.state.formValues?.downloadFileFormat
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }


  unDcTransactionRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    }
  }




  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}