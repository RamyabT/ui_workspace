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
import { Membershiptransactiondtls } from '../membershiptransactiondtls-service/membershiptransactiondtls.model';
import { ActiveSpaceInfoService } from 'src/app/dep/core/class/active-space-info.service';
import { APPCONSTANTS } from '@dep/constants';
import { CasaTransactionInfoComponent } from 'src/app/accounts/casa-transaction-info/casa-transaction-info.component';

@Injectable()
export class RetailMembershipTransactionDtlsROGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _activeSpaceInfoService: ActiveSpaceInfoService) {
    super();
    this.addHandleActions('onClick', this.retailMembershipTransactionDtlsROGridView);
    // this.addHandleActions('modify', this.retailMembershipTransactionDtlsROGridModify);
    // this.addHandleActions('add', this.retailMembershipTransactionDtlsROGridEntry);
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
    return _isSortSearch;
  }

  private retailMembershipTransactionDtlsROGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Membershiptransactiondtls,
    currentRowData: Membershiptransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
    if (APPCONSTANTS.enableViewCasaTransactionsInfo) {
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
  };
  private retailMembershipTransactionDtlsROGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Membershiptransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailMembershipTransactionDtlsROGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Membershiptransactiondtls
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
    this.setNgTemplateName('MembershipTranDtlsListTmplt');
    this.setNgTemplateClass('casa-transactions-dtls-list-tmpl');

    const accountNumber = this._activeSpaceInfoService.getAccountNumber();
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: accountNumber
    });
    criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
    criteriaQuery.setPageCount(20);
    this.setInitialCriteria(criteriaQuery);
  }


  override doPostInit(): void {
  }

  override setPageSize(): number {
    return 20;
  }

  override postFindallInterceptor = (payload: any) => {
    let rowData: Membershiptransactiondtls[] = [];
    let _date = "";
    if(payload.data){
    payload.data.forEach((element: any) => {
      if (_date != element.transactionDate) {
        _date = element.transactionDate;
        let rowGroup: any = {
          rowGroupTitle: _date
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
   if(payload?.data?.length == 0 || payload?.data?.ErrorCode || payload.data?.ErrorDescription){    
      return {
        // "data": [{NoData:"NoData"}],
        "totalRowCount": null
      }
    }
  }

}
}




