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
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { CasatransactiondtlsService } from "../casatransactiondtls-service/casatransactiondtls.service";
import { Casatransactiondtls } from "../casatransactiondtls-service/casatransactiondtls.model";
import { retailcasatrandtlsfilterformComponent } from "../retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsDownloadfilterformComponent } from "../retailcasatrandtlsDownloadfilterform/retail-casa-tran-dtls-download-filter-form.component";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { TranslateService } from "@ngx-translate/core";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";

export class ViewCasaTransactionFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  cardData!: Casaaccount;
  transactionsListRoGrid: Subject<FpxActionMap> = new Subject();
  formValues: any;
 
}


@Injectable()
export class ViewCasaTransactionFormComponentHelper extends BaseFpxFormHelper<ViewCasaTransactionFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  casaTransactionApiReceived: boolean = false;
  totalRecordCount: number = -1;
  showClearButton: boolean = false;
  appliedFilterData: any;
  isClearButtonClicked:boolean=false;
  showResetFilter:boolean=false;
  viewAll: boolean = false;
  handleError: boolean = false;
  formValues:any={
    fromDate:"",
    toDate:""
  }
  
  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    public deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _casaTransactionDtlsService: CasatransactiondtlsService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private route: ActivatedRoute,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _translate: TranslateService,
  ) {
    super(new ViewCasaTransactionFormComponentState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid) {
        this.showClearButton = false;
        this.isClearButtonClicked = true;
        this.showResetFilter=false;
        if(this.state.formValues) {
          this.state.formValues.fromDate="";
          this.state.formValues.toDate="";
        }
        this.onLoadForm();
      }
    });
  }

  override doPreInit(): void {
    // if (this.deviceDetectorService.isDesktop()) {
    //   if(this._appConfig.hasData('showStopChequeDetails$')){
    //   this._appConfig.getData('showStopChequeDetails$').subject.next({
    //     showStopChequeDetails: false
    //   });
    // }
    // }
    this.hideShellActions();
    this.removeShellBtn("BACK");
  }

  onLoadForm(){
    this.casaTransactionApiReceived = false;
    this.showClearButton = false;
    this.showResetFilter=false;

    this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    this.state.cardData = this._appConfig.getData('accountCardData');

    const accountNumber = this._activeSpaceInfoService.getAccountNumber();
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: accountNumber
    });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);


    // this.appliedFilterData = {
    //   rangeType: undefined,
    //   fromDate: undefined,
    //   toDate: undefined,
    //   transactionCategoryId: undefined,
    //   filterSearch: undefined,
    //   transactionDescription: undefined,
    //   transactionAmount: undefined,
    //   chequeNumber: undefined,
    //   confirmationNumber: undefined
    // }


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
    modal.setComponent(retailcasatrandtlsfilterformComponent);

    if (this.deviceDetectorService.isMobile()) {
      // modal.setPanelClass('dep-info-popup');
      // modal.setPanelClass('dep-alert-popup');
      // modal.setBackDropClass(['dep-popup-back-drop','payment-accounts-list-popup-back-drop']);
      
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    } else {
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass(['casa-summary-filter-backdrop']);
    }
    modal.setDisableClose(true);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "retailcasatrandtlsfilterform.title",
      accountNumber: this.accountNumber,
      rangeType: this.state.formValues?.rangeType,
      transType: this.state.formValues?.transType,
      filterSearch: this.state.formValues?.filterSearch,
      transactionCategoryId: this.state.formValues?.transactionCategoryId,
      transactionDescription: this.state.formValues?.transactionDescription,
      confirmationNumber:this.state.formValues?.confirmationNumber,
      chequeNumber:this.state.formValues?.chequeNumber,
      transactionAmount:this.state.formValues?.transactionAmount,
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate,
      isClearButtonClicked: !this.showResetFilter,
      totalRowCount:this.totalRecordCount
    });
    this.openModal(modal);
  }

  override doDestroy(): void {
    this.viewAll = false;
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
    
    this._casaTransactionDtlsService.resetCorrelationId();

    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);
    
    this.casaTransactionApiReceived = false;

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
      transType: payload.transType,
      filterSearch: payload.filterSearch,
      transactionCategoryId: payload.transactionCategoryId,
      transactionDescription: payload.transactionDescription,
      confirmationNumber:payload.confirmationNumber,
      chequeNumber:payload.chequeNumber,
      transactionAmount:payload.transactionAmount,
    }
  }
 
  }

  noFilterModelAfterClose:FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(payload==0){
      this.showClearButton = false;
      this.isClearButtonClicked = true;
      this.showResetFilter=false;
      this.state.formValues.fromDate="";
      this.state.formValues.toDate="";
      this.onLoadForm();
    }
    else{
      this.filter();
    }
  }

  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    if(payload){
    const criteriaQuery = new CriteriaQuery();
    this._casaTransactionDtlsService.resetCorrelationId();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);

  }
  }

  updateGridData(statements: Casatransactiondtls[] = []) {
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
    modal.setComponent(retailcasatrandtlsDownloadfilterformComponent);
    if (this.deviceDetectorService.isMobile()) {
      // modal.setPanelClass('dep-info-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    } else {
      modal.setBackDropClass(['casa-summary-filter-backdrop']);
    }
    modal.setPanelClass('dep-alert-popup');
    modal.setDisableClose(true);
    modal.setAfterClosed(this.contextmenuModelAfterClose1);
    modal.setData({
      title: "retailcasatrandtlsDownloadfilterform.title",
      accountNumber: this.accountNumber,
      // rangeType: this.state.formValues?.rangeType,
      // transType: this.state.formValues?.transType,
      // filterSearch: this.state.formValues?.filterSearch,
      // transactionCategoryId: this.state.formValues?.transactionCategoryId,
      // transactionDescription: this.state.formValues?.transactionDescription,
      // confirmationNumber:this.state.formValues?.confirmationNumber,
      // chequeNumber:this.state.formValues?.chequeNumber,
      // transactionAmount:this.state.formValues?.transactionAmount,
      // fromDate: this.state.formValues?.fromDate,
      // toDate: this.state.formValues?.toDate
    });
    this.openModal(modal);
  }

  clearFilter() {
    this.showClearButton = false;
    this.isClearButtonClicked = true;
    this.onLoadForm();
  }
  resetclearFilter(){
    this.showResetFilter=false;
    this.isClearButtonClicked = true;
    this.onLoadForm();
    this.state.formValues.fromDate="";
    this.state.formValues.toDate="";
  }

  viewAllTransfers(){
      this.viewAll = !this.viewAll;
      this._accountsSpaceMgr.setViewAll(true);
    //  window.scrollTo(0,0);
  }

  casaTransactionGridEvent($event: any) {
    if(this.deviceDetectorService.isDesktop()){
      this._appConfig.getData('showTransactionDetails$').subject.next({
        showTransactionDetails: false,
        viewChequeImg :false})
    }
    if ($event.eventName == 'afterDataFetch') {
      this.handleError=false;
      this.casaTransactionApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
    }
    if(this.state.formValues?.fromDate || this.state.formValues?.toDate){
      if(this.totalRecordCount==0){
        this.showResetFilter=false;
        this.isClearButtonClicked = true;
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
        modal.setDisableClose(true);
        modal.setAfterClosed(this.noFilterModelAfterClose);
        modal.setData({
          title: 'viewCasaTransactionForm.noFilterDataTitle',
          message: 'viewCasaTransactionForm.noFilterDataMsg',
          confirmationIcon: 'alert',
          okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
          cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
        });
        this.openModal(modal);
      }
      else if(this.totalRecordCount>0 && !(this.totalRecordCount==undefined)){
        this.showResetFilter=true;
        this.isClearButtonClicked = false;
      }
    }
    if($event.eventName=='handleError'){
      this.handleError=true;
      this.casaTransactionApiReceived = true;
    }
  }
  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    setTimeout(() => {
      this.onLoadForm();
    });
}

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}