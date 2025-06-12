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
import { BehaviorSubject, Observable, Subject, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
// import { CasatransactiondtlsService } from "../casatransactiondtls-service/casatransactiondtls.service";
// import { Casatransactiondtls } from "../casatransactiondtls-service/casatransactiondtls.model";
// import { retailcasatrandtlsfilterformComponent } from "../retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { InvestmenttransactionsummaryService } from "../investmenttransactionsummary-service/investmenttransactionsummary.service";
import { Investmenttransactionsummary } from "../investmenttransactionsummary-service/investmenttransactionsummary.model";
import { Deposits } from "../deposits-service/deposits.model";
import { InvestmentTransactionSummaryFilterComponent } from "../investment-transaction-summary-filter/investment-transaction-summary-filter.component";
import { DepositsService } from "../deposits-service/deposits.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InvestmentTransactionSummaryDownloadFilterComponent } from "../investment-transaction-summary-download-filter/investment-transaction-summary-download-filter.component";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
//import { retailcasatrandtlsDownloadfilterformComponent } from "../retailcasatrandtlsDownloadfilterform/retail-casa-tran-dtls-download-filter-form.component";

export class ViewDepositsTransactionFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  transactionsListRoGrid: Subject<FpxActionMap> = new Subject();
  formValues: any;
  currentActiveAccount!: Deposits;
}


@Injectable()
export class ViewDepositsTransactionFormComponentHelper extends BaseFpxFormHelper<ViewDepositsTransactionFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  casaTransactionApiReceived: boolean = false;
  totalRecordCount: number = -1;
  securities: any;
  marketInvestments: any;
  showViewAll: boolean = false;
  showCard:boolean= false;
  cardData: any;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    public device: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _investmentTranSum: InvestmenttransactionsummaryService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private route: ActivatedRoute,
    public _depositsService: DepositsService,
    private activeService:ActiveSpaceInfoService,
    protected _accountSpaceMgr: AccountsSpaceManager,
     @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) {
    super(new ViewDepositsTransactionFormComponentState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid) this.onLoadForm();
    });
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.removeShellBtn("BACK");

    
    // this.accountNumber='10100091913888';

    // console.log(this._activeSpaceInfoService.getdepositList())
    // let isTermDepositAccount=this._activeSpaceInfoService.getdepositList()[0].accountDetails.find(x=>x.accountNumber===this.getRoutingParam("accountNumber"))
    // if(isTermDepositAccount){
    //   this.state.currentActiveAccount=isTermDepositAccount
    //   return 
    // }
    // let isAviso=this._activeSpaceInfoService.getdepositList()[1].accountDetails.find(x=>x.accountNumber===this.getRoutingParam("accountNumber"))
    // if(isAviso){
    //   this.state.currentActiveAccount=isAviso
    //   return 
    // }
    // let isRegisteredProd=this._activeSpaceInfoService.getdepositList()[2].accountDetails.find(x=>x.accountNumber===this.getRoutingParam("accountNumber"))
    // if(isRegisteredProd){
    //   this.state.currentActiveAccount=isRegisteredProd
    //   return 
    // }
    let investmentTranscations$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('investmentTranscations$', {
      "observable": investmentTranscations$.asObservable(),
      "subject": investmentTranscations$
    });

    if (this._appConfig.hasData('investmentTranscations$')) {
      this._appConfig.getData('investmentTranscations$').observable.subscribe(
        (res: any) => {
          console.log("investmentTranscations", res);
          if(res?.investmentTranscations){
            this.showCard=false;
            this.handleFormOnLoad();
          }
        });
    }


  }



  onLoadForm(){
    // this._depositsService.depositList.find(x=>x.)
   
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
   
    //this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    // this.state.cardData = this._appConfig.getData('accountCardData')[0];
    // this.state.cardData=this._appConfig.getData('activeInvestmentCard');
    this.marketInvestments = this._accountSpaceMgr.getDeposits();
    let activeAccountNumber= this._activeSpaceInfoService.getAccountNumber();
    if(activeAccountNumber){
      this.securities= this.marketInvestments.filter((item: any) => activeAccountNumber == item.accountNumber);
    }
    let selectedSecurity=this._activeSpaceInfoService.getDepositSecurity();
    if(selectedSecurity){
      this.cardData=null;
    }
    let security=this.securities[0].securities.filter((item: any) => selectedSecurity.securityNum == item.securityNum);
    this.cardData=security[0];
    this.cardData.accountCurrency=this.securities[0].accountCurrency;
    if(this.cardData){
      setTimeout(()=>{
        this.showCard=true;
      },1);
    }
    const criteriaQuery = new CriteriaQuery();
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'Date');
    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDCRITERIA',
      value: criteriaQuery,
      nestedControl: '',
      rowIndex: undefined
    });
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  filter() {
    let modal = new FpxModal();
    modal.setComponent(InvestmentTransactionSummaryFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "InvestmentTransactionSummaryFilter.title",
      accountNumber: this.accountNumber,
    });
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    const criteriaQuery = new CriteriaQuery();
    if (payload.fromDate && payload.toDate) {
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: payload.fromDate, dateTo: payload.toDate });
    }

    let productCode:any;
    let activeCardDetails:any=this._appConfig.getData('activeInvestmentCard');
    productCode=activeCardDetails['productCode'];
  criteriaQuery.addFilterCritertia('productCode','String','equals',{
    searchText: productCode
  })


    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');
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
      productCode:payload.productCode,
    }
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    if(payload){
    const criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.accountNumber });
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');
    criteriaQuery.setPageCount(20);

    this.state.formValues = {
      ...this.formGroup.value,
      accountNumber: this.getRoutingParam('accountNumber'),
      rangeType: payload.rangeType,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      productCode:payload.productCode,
    }
  }
  }

  updateGridData(statements: Investmenttransactionsummary[] = []) {
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
    modal.setComponent(InvestmentTransactionSummaryDownloadFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(true);
    modal.setAfterClosed(this.contextmenuModelAfterClose1);
    modal.setData({
      title: "investmenttransactionsummarydownloadfilter.title",
      accountNumber: this.accountNumber,
      accountType:this.cardData.accountType
    });
    this.openModal(modal);
  }

  casaTransactionGridEvent($event: any){
    if ($event.eventName == 'afterDataFetch') {
      this.casaTransactionApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
    }
  }
  override ngOnDestroy(): void {
    this._accountSpaceMgr.setInvestmentNavigation(false);
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}