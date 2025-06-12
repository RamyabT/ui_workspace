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
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';

@Injectable()
export class PfmTransactionHistoryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.pfmTransactionHistoryRoGridView);
    this.addHandleActions('modify', this.pfmTransactionHistoryRoGridModify);
    this.addHandleActions('add', this.pfmTransactionHistoryRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100];
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
        _isSortSearch.set('inventoryNumber',"sort&search");   		 
        _isSortSearch.set('customerCode',"sort&search");   		 
        _isSortSearch.set('categoryCode',"sort&search");   		 
        _isSortSearch.set('paymentDate',"sort&search");   		 
        _isSortSearch.set('transactionAmount',"sort&search");   		 
        _isSortSearch.set('transactionCurrency',"sort&search");   		 
        _isSortSearch.set('transactionDescription',"sort&search");   		 
        _isSortSearch.set('externalReferenceNumber',"sort&search");   		 
        _isSortSearch.set('merchantCode',"sort&search");   		 
        _isSortSearch.set('accountNumber',"sort&search");   		 
        _isSortSearch.set('transactioncategory',"sort&search");   		 
        _isSortSearch.set('authOn',"sort&search");   		 
        _isSortSearch.set('pfmSubCategory',"sort&search");   		 
        _isSortSearch.set('modifiedOn',"sort&search");   		 
        _isSortSearch.set('createdBy',"sort&search");   		 
        _isSortSearch.set('createdOn',"sort&search");   		 
        _isSortSearch.set('currency',"sort&search");   		 
    return _isSortSearch;
  }

  private pfmTransactionHistoryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Pfmtransaction
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private pfmTransactionHistoryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Pfmtransaction
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private pfmTransactionHistoryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Pfmtransaction
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
  let categoryCode:any = this.getRoutingParam('categoryCode');
  let criteriaQuery:CriteriaQuery = new CriteriaQuery();
  criteriaQuery.addQueryparam('period','2023-05');
  criteriaQuery.addQueryparam('categoryCode',categoryCode);
  this.setInitialCriteria(criteriaQuery);
  this.setNgTemplateName('pfmTransHistTmplt');
  this.setNgTemplateClass('pfm-trans-hist-tmplt');
  }
  
  
 override doPostInit(): void {
  }  
 
  override postFindallInterceptor = (payload: any) => {
    console.log(payload);
    
    return payload
  }
 
}


 
 
