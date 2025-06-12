import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
  FpxModal,
} from "@fpx/core";
import { Casatransactiondtls } from '../casatransactiondtls-service/casatransactiondtls.model';
import { CasaTransactionInfoComponent } from '../casa-transaction-info/casa-transaction-info.component';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import moment from 'moment';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RetailCasaTransactionDtlsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(
    private _router: Router,
    private _httpProvider: HttpProviderService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _deviceService:DeviceDetectorService,
    private _appConfig:AppConfigService

  ) {
    super();
    this.addHandleActions('onclick', this.retailCasaTransactionDtlsRoGridView);
  }

  public getGridColumnWidth(): number[] {
    return [3,];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    _isSortSearch.set('transactionDate', "sort&search");
    _isSortSearch.set('transactionAmount', "sort&search");
    _isSortSearch.set('transactionReference', "sort&search");
    _isSortSearch.set('transactionDescription', "sort&search");
    _isSortSearch.set('balance', "sort&search");
    return _isSortSearch;
  }

  private retailCasaTransactionDtlsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Casatransactiondtls,
    currentRowData: Casatransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
    if(APPCONSTANTS.enableViewCasaTransactionsInfo){
      const fpxModal = new FpxModal();
      fpxModal.setComponent(CasaTransactionInfoComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('info-popup');
      fpxModal.setBackDropClass(['casa-transaction-info-back-drop']);
      fpxModal.setData({
        title: 'Transaction Details',
        transactionData: currentRowData
      });
      this.openModal(fpxModal);
    }

    if(!this._deviceService.isMobile()){
      let show = Object.keys(data).length === 0 ? false : true;
      if(show){
        this._appConfig.getData('showTransactionDetails$').subject.next({
          showTransactionDetails: true,
          casaTransactionDetailsObj:data,
          viewChequeImg :false
        });
        return;
      }
      else{
          this._appConfig.getData('showTransactionDetails$').subject.next({
            showTransactionDetails: false,
            casaTransactionDetailsObj:data,
            viewChequeImg :false
          });
          return;
      }
    }
    else{
      this._appConfig.setData('casatransactionData',data);
      this._angularRouter.navigate(['accounts-space','display-shell','accounts','view-casa-tran-dtls-form']);
      if(this._deviceService.isHybrid()){
        this._activeSpaceInfoService.setOrginSpace("accounts-space");
      }
    }
  };
  private retailCasaTransactionDtlsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Casatransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailCasaTransactionDtlsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Casatransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;
  }

  public override getGridWidth(): number {
    return 100;
  }
  
  override doPreInit(): void {

    let refreshTransferHistoryGrid$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('refreshTransferHistoryGrid$', {
      "observable": refreshTransferHistoryGrid$.asObservable(),
      "subject": refreshTransferHistoryGrid$
    });
    if (this._appConfig.hasData('refreshTransferHistoryGrid$')) {
      this._appConfig.getData('refreshTransferHistoryGrid$').observable.subscribe(
        (res: any) => {
          console.log("Clear Row Selection Here");
          // this.refreshGrid$.next('');
          this.resetRowSelection(undefined);
        })
    }
    this.setNgTemplateName('casaTransactionsDtlsListTmplt');
    this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
    // this.setNgTemplateClass('casa-transactions-dtls-list-tmpl');

    const accountNumber = this._activeSpaceInfoService.getAccountNumber();
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: accountNumber
    });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
   
    this.setInitialCriteria(criteriaQuery);
  }

  override doPostInit(): void {
  }
  override setPageSize(): number {
    return 20;
  }

  override postFindallInterceptor = (payload: any) => {
    let rowData: Casatransactiondtls[] = [];
    let _date = "";
    let _dateGroupName = "";
    if(payload.data){
    payload.data.forEach((element: any) => {
      if (_date != element.transactionDate) {
        let paymentDate = _date = element.transactionDate;
        let currentDate = moment().format('YYYY-MM-DD');
        if (moment(paymentDate).diff(moment(currentDate), 'days') == 0) _dateGroupName = 'Today';
        else if (moment(paymentDate).diff(moment(currentDate), 'days') == -1) _dateGroupName = 'Yesterday';
        else _dateGroupName = moment(paymentDate).format('DD MMM YYYY');
        let rowGroup: any = {
          rowGroupTitle: _dateGroupName
        }
        rowData.push(rowGroup);
      }
      rowData.push(element);
    });
    payload.data = rowData;

    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data.length
    });
    console.log("payload",payload);
  return payload;

  }
  else{
   if(payload?.data?.length == 0 || payload?.data?.ErrorCode || payload.data?.ErrorDescription || payload.data==null){    
      // return {
      //   // "data": [{NoData:"NoData"}],
      //   "totalRowCount": null
      // }
      this.gridOutputEvent.next({
        name: 'handleError',
        payload: payload?.data?.length
      });
      return payload
    }
  }

}
}
