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
//import { CompletedpymntsService } from "../completedpymnts-service/completedpymnts.service";
//import { FavpaymentsService } from "../favpayments-service/favpayments.service";
//import { RetailFilterTransactionComponent } from "../retail-filter-transaction-form/retail-filter-transaction-form.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
//import { retailDownloadTransactionFormComponent } from "../retail-download-transaction-form/retail-download-transaction-form.component";

export class WorkflowComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
  approvedGridData: any;
  pendingGridData: any;
  completedGridData: any;
}

@Injectable()
export class WorkflowComponentHelper extends BaseFpxFormHelper<WorkflowComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  private _gridData:any;
  isDataReceived: boolean = false;
  tabs: any[] = [{name:'Approved', active: false}, {name:'Rejected / Expired', acive: false}];
  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
  ) {
    super(new WorkflowComponentState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("CHECKERWF");
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    let criteriaQuery =  new CriteriaQuery();
    criteriaQuery.addQueryparam('status','R');
    this.onTabChanged({index: 1});
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  filter() {
    let modal = new FpxModal();
   // modal.setComponent(RetailFilterTransactionComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "TransferHistoryGrid.title",
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate,
      transactionPeriod: this.state.formValues?.transactionPeriod,
      beneficiaryName:this.state.formValues?.beneficiaryName,
      // transactionReference: this.state.formValues?.transactionReference,
      paymentAmount: this.state.formValues?.paymentAmount,
      purpose: this.state.formValues?.purpose,
      transferType: this.state.formValues?.transferType
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    const criteriaQuery = new CriteriaQuery();
    if (payload.fromDate && payload.toDate) {
      criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', { dateFrom: payload.fromDate, dateTo: payload.toDate });
    }
    if (payload.beneficiaryName != "") {
      criteriaQuery.addFilterCritertia('beneName', 'String', 'contains', { searchText: payload.beneficiaryName });
    }
    // if (payload.transactionReference != "") {
    //   criteriaQuery.addFilterCritertia('paymentId', 'String', 'equals', { searchText: payload.transactionReference });
    // }
    if(payload.paymentAmount != ""){
      criteriaQuery.addFilterCritertia('paymentAmount', 'String', 'equals', { searchText: payload.paymentAmount });
    }
    if(payload.purpose != ""){
      criteriaQuery.addFilterCritertia('allPurpose', 'String', 'equals', { searchText: payload.purpose });
    }
    // if(payload.beneficiaryBank != ""){
    //   criteriaQuery.addFilterCritertia('beneficiaryBank', 'String', 'equals', { searchText: payload.beneficiaryBank });
    // }
    if(payload.transferType != ""){
      criteriaQuery.addFilterCritertia('transferType', 'String', 'equals', { searchText: payload.transferType });
    }


    this.setGridCriteria('transMgmtGrid', criteriaQuery);

    this.state.formValues = {
      ...this.formGroup.value,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      transactionPeriod: payload.transactionPeriod,
      beneficiaryName:payload.beneficiaryName,
      // transactionReference: payload.transactionReference,
      // beneficiaryBank:payload.beneficiaryBank,
      transferType:payload.transferType,
      paymentAmount:payload.paymentAmount,
      purpose:payload.purpose
    }
  }

  onDownloadClick() {
    let modal = new FpxModal();
   // modal.setComponent(retailDownloadTransactionFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "retailDownloadTransactionFormComponent.title",
      // transactionReference: this.state.formValues?.transactionReference,
      transactionPeriod: this.state.formValues?.transactionPeriod,
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate,
      beneficiaryName:this.state.formValues?.beneficiaryName,
      paymentAmount:this.state.formValues?.paymentAmount,
      purpose:this.state.formValues?.purpose,
      transferType:this.state.formValues?.transferType,
      fileFormat:this.state.formValues?.fileFormat
    });
    this.openModal(modal);
  }

  initiateNewTransaction() {
    this._angularRouter.navigate(['transfers-space', 'display-shell', 'transfers', 'initiate-a-transfers']);
  }

  onTabChanged($event:any){
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    if($event.index == 0){
        // criteriaQuery.addFilterCritertia('status', 'String', 'equals', { searchText: 'A' });
        criteriaQuery.addQueryparam('status', 'A');
        criteriaQuery.addSortCriteria('initOn','desc','String');
        this.setGridCriteria('approvedTransMgmtGrid', criteriaQuery);
    } else if ($event.index == 1) {
      criteriaQuery.addQueryparam('status', 'O');
      criteriaQuery.addSortCriteria('initOn','desc','String');
      this.setGridCriteria('pendingTransMgmtGrid', criteriaQuery);
    } else if ($event.index == 2) {
      // criteriaQuery.addFilterCritertia('status', 'String', 'equals', { searchText: 'O' });
      this.tabs.forEach((item)=>{
        item.active = false
      });
      this.tabs[0].active = true;
      criteriaQuery.addSortCriteria('initOn','desc','String');
      this.setGridCriteria('completedTransMgmtGrid', criteriaQuery);
    }
  }
  onTabClick(tab: any, i: number) {
    this.tabs.forEach((item)=>{
      item.active = false
    });
    tab.active = true;
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    if(i == 0){
      // criteriaQuery.addFilterCritertia('status', 'String', 'equals', { searchText: 'O' });
      criteriaQuery.addSortCriteria('initOn','desc','String');
      this.setGridCriteria('completedTransMgmtGrid', criteriaQuery);
    } else if (i == 1) {
      criteriaQuery.addQueryparam('status', 'R');
      criteriaQuery.addSortCriteria('initOn','desc','String');
      this.setGridCriteria('completedTransMgmtGrid', criteriaQuery);
    }
  }

  // handleTransfersHistoryGridEvent($event:any){
  //   if($event.eventName == 'afterDataFetch'){
  //     this.state.isDataReceived = true;
  //     this.state.gridData = $event.payload;
  //   }
  // }


  approvedRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.approvedGridData = $event.payload;
    }
  }

  pendingRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.pendingGridData = $event.payload;
    }
  }

  completedRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.completedGridData = $event.payload;
    }
  }

  gotoWorkflow(){
    this._angularRouter.navigate(['smb-transaction-management-space']);
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}