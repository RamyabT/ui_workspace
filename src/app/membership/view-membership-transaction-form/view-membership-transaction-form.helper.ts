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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfigService } from "@dep/services";

import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { MembershiptransactiondtlsService } from "../membershiptransactiondtls-service/membershiptransactiondtls.service";
import { Membership } from "src/app/home/membership-panel/membership.model";
import { retailmembershiptrandtlsdownloadfilterformComponent } from "../retailMembershipTranDtlsDownloadFilterFormComponent/retail-membership-tran-dtls-download-filter-form.component";
import { retailmembershiptrandtlsfilterformComponent } from "../retailMembershipTranDtlsFilterForm/retail-membership-tran-dtls-filter-form.component";



export class ViewMembershipTransactionFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  cardData!: Membership;
  transactionsListRoGrid: Subject<FpxActionMap> = new Subject();
  formValues: any;
}


@Injectable()
export class ViewMembershipTransactionFormComponentHelper extends BaseFpxFormHelper<ViewMembershipTransactionFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  MembershipTranApiReceived: boolean = false;
  totalRecordCount: number = -1;
  showClearButton: boolean = false;
  appliedFilterData: any;
  isClearButtonClicked:boolean=false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    public deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _membershipTransactionDtlsService: MembershiptransactiondtlsService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private route: ActivatedRoute
  ) {
    super(new ViewMembershipTransactionFormComponentState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid) this.onLoadForm();
    });
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.removeShellBtn("BACK");
  }

  onLoadForm(){
    this.MembershipTranApiReceived = false;
    this.showClearButton = false;

    this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    this.state.cardData = this._appConfig.getData('accountCardData');

    const accountNumber = this._activeSpaceInfoService.getAccountNumber();
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: accountNumber
    });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);


    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDCRITERIA',
      value: criteriaQuery,
      nestedControl: '',
      rowIndex: undefined
    });
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    this.state.cardData = this._appConfig.getData('accountCardData');
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  filter() {
    let modal = new FpxModal();
    modal.setComponent(retailmembershiptrandtlsfilterformComponent);

    if (this.deviceDetectorService.isMobile()) {
      modal.setPanelClass('dep-info-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }

    modal.setBackDropClass(['casa-summary-filter-backdrop']);
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "retailmembershiptrandtlsfilterform.title",
      accountNumber: this.accountNumber,
      rangeType: this.state.formValues?.rangeType,
      transType: this.state.formValues?.transType,
      filterSearch: this.state.formValues?.filterSearch,
      transactionCategoryId: this.state.formValues?.transactionCategoryId,
      transactionDescription: this.state.formValues?.transactionDescription,
      transactionAmount:this.state.formValues?.transactionAmount,
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate,
      isClearButtonClicked:this.isClearButtonClicked,
    });
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);

    console.log(payload)
    console.log(JSON.stringify(payload))
    console.log(JSON.stringify(this.appliedFilterData))
    if(payload!=0){
      this.isClearButtonClicked = false;
    if (payload) {
      this.showClearButton = JSON.stringify(payload) === JSON.stringify(this.appliedFilterData) ? false : true;
    }

    //this.appliedFilterData = payload;
    const criteriaQuery = new CriteriaQuery();
    if (payload.fromDate && payload.toDate) {
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: payload.fromDate, dateTo: payload.toDate });
    }

    if(payload.transactionCategoryId == "1"){
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    }
    else if( payload.transactionCategoryId=="2"){

      criteriaQuery.addFilterCritertia('debitCreditFlag', 'String', 'equals', { searchText: 'C' });
    }
    else if( payload.transactionCategoryId=="3"){
      criteriaQuery.addFilterCritertia('debitCreditFlag', 'String', 'equals', { searchText: 'D' });
    }
    else if(payload.transactionCategoryId=="4"){
      criteriaQuery.addFilterCritertia('transactionCategoryId', 'String', 'equals', { searchText: payload.transactionCategoryId });
    }
    else if(payload.transactionCategoryId=="5"){
      criteriaQuery.addFilterCritertia('transactionCategoryId', 'String', 'equals', { searchText: payload.transactionCategoryId });
    }

   
    if(payload.transactionDescription){
      criteriaQuery.addFilterCritertia('transactionDescription', 'String', 'contains', { searchText: payload.transactionDescription });
    } else if(payload.confirmationNumber){
      criteriaQuery.addFilterCritertia('confirmationNumber', 'String', 'equals', { searchText: payload.confirmationNumber });
    } else if(payload.transactionAmount){
      criteriaQuery.addFilterCritertia('transactionAmount', 'String', 'equals', { searchText: payload.transactionAmount });
    }else if(payload.chequeNumber){
      criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'equals', { searchText: payload.chequeNumber });
    }
    
    this._membershipTransactionDtlsService.resetCorrelationId();

    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);
    
    this.MembershipTranApiReceived = false;

    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDCRITERIA',
      value: criteriaQuery,
      nestedControl: '',
      rowIndex: undefined
    });

    this.state.formValues = {
      ...this.formGroup.value,
      accountNumber: this._activeSpaceInfoService.getAccountNumber(),
      rangeType: payload.rangeType,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      transactionCategoryId: payload.transactionCategoryId,
      transactionDescription: payload.transactionDescription,
      transactionAmount:payload.transactionAmount,
    }
  }
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    if(payload){
    const criteriaQuery = new CriteriaQuery();

    // this._membershipTransactionDtlsService.resetCorrelationId();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);

    
  }
  }

  updateGridData(statements: [] = []) {
    statements.forEach(element => {

    });

    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDDATA',
      value: statements,
      nestedControl: '',
      rowIndex: undefined
    });
  }

  public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {
    let modal = new FpxModal();
    modal.setComponent(retailmembershiptrandtlsdownloadfilterformComponent);
    if (this.deviceDetectorService.isMobile()) {
      modal.setPanelClass('dep-info-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }
    modal.setBackDropClass(['casa-summary-filter-backdrop']);
    modal.setDisableClose(true);
    modal.setAfterClosed(this.contextmenuModelAfterClose1);
    modal.setData({
      title: "retailmembershiptrandtlsfilterform.title",
      accountNumber: this.accountNumber,
    });
    this.openModal(modal);
  }

  clearFilter() {
    this.showClearButton = false;
    this.isClearButtonClicked = true;
    this.onLoadForm();
  }

  membershipTranGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.MembershipTranApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
    }
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}