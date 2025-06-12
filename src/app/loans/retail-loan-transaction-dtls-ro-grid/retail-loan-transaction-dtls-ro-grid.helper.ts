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
} from "@fpx/core";
import { Loantransactiondtls } from '../loantransactiondtls-service/loantransactiondtls.model';
import { ActiveSpaceInfoService } from '@dep/core';

@Injectable()
export class RetailLoanTransactionDtlsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _activeSpaceInfoService: ActiveSpaceInfoService) {
    super();
    this.addHandleActions('onClick', this.retailLoanTransactionDtlsRoGridView);
    this.addHandleActions('modify', this.retailLoanTransactionDtlsRoGridModify);
    this.addHandleActions('add', this.retailLoanTransactionDtlsRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10,10,10];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
        _isSortSearch.set('valuedate',"sort&search");   		 
        _isSortSearch.set('transactionDate',"sort&search");   		 
        _isSortSearch.set('transactionDescription',"sort&search");   		 
        _isSortSearch.set('transactionReference',"sort&search");   		 
        _isSortSearch.set('transactionType',"sort&search");   		 
        _isSortSearch.set('transactionAmount',"sort&search");   		 
        _isSortSearch.set('balance',"sort&search");   		 
    return _isSortSearch;
  }

  private retailLoanTransactionDtlsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loantransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailLoanTransactionDtlsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Loantransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailLoanTransactionDtlsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loantransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {
    this.setNgTemplateName('loanTransactionsDtlsListTmplt');
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
    let rowData: Loantransactiondtls[] = [];
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


 
 
