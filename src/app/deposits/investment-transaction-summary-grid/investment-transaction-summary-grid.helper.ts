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
import { Investmenttransactionsummary } from '../investmenttransactionsummary-service/investmenttransactionsummary.model';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from '@dep/services';

@Injectable()
export class InvestmentTransactionSummaryGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private activeService:ActiveSpaceInfoService,
private _activeSpaceInfoService: ActiveSpaceInfoService,
private appConfigService:AppConfigService) {
    super();
    this.addHandleActions('onclick', this.investmentTransactionSummaryGridView);
    this.addHandleActions('modify', this.investmentTransactionSummaryGridModify);
    this.addHandleActions('add', this.investmentTransactionSummaryGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
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
        // _isSortSearch.set('transactionCurrency',"sort&search");   		 
        // _isSortSearch.set('transactionReference',"sort&search");   		 
        // _isSortSearch.set('transactionDateTime',"sort&search");   		 
        // _isSortSearch.set('transactionDescription',"sort&search");   		 
        // _isSortSearch.set('transactionDate',"sort&search");   		 
        // _isSortSearch.set('accountNumber',"sort&search");   		 
        // _isSortSearch.set('debitCreditFlag',"sort&search");   		 
        // _isSortSearch.set('balance',"sort&search");   		 
        // _isSortSearch.set('transactionAmount',"sort&search");   		 
        // _isSortSearch.set('transactionCategory',"sort&search");   		 
        // _isSortSearch.set('quantity',"sort&search");   		 
        // _isSortSearch.set('price',"sort&search");   		 
        // _isSortSearch.set('commission',"sort&search");   		 
        // _isSortSearch.set('product_code',"sort&search");   		 
    return _isSortSearch;
  }

  private investmentTransactionSummaryGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Investmenttransactionsummary
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private investmentTransactionSummaryGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Investmenttransactionsummary
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private investmentTransactionSummaryGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Investmenttransactionsummary
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

  this.setNgTemplateName('depositsTransactionsDtlsListTmplt');
  this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
  // let productCode:any;
  // let activeCardDetails:any=this.appConfigService.getData('activeInvestmentCard');
  // let accountNumber:any='10100091913888';
  // productCode=activeCardDetails['productCode'];

  // criteriaQuery.addFilterCritertia('productCode','String','equals',{
  //   searchText: productCode
  // })
  // const criteriaQuery: CriteriaQuery = new CriteriaQuery();
  // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
  //   searchText: accountNumber
  // });
  // criteriaQuery.addSortCriteria('transactionDate','desc','Date')
  // this.setInitialCriteria(criteriaQuery);
  this.initialLoad=false;
  }
  
  
 override doPostInit(): void {
  }  

  override setPageSize(): number {
    return 20;
  }

  override postFindallInterceptor = (payload: any) => {
      let rowData: Investmenttransactionsummary[] = [];
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


 
 
