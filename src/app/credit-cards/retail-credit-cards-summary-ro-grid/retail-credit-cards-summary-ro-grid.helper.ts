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
import { Creditcard } from '../creditcard-service/creditcard.model';

@Injectable()
export class RetailCreditCardsSummaryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailCreditCardsSummaryRoGridView);
    this.addHandleActions('modify', this.retailCreditCardsSummaryRoGridModify);
    this.addHandleActions('add', this.retailCreditCardsSummaryRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [4,16,12,8,12,12,16,10,10];
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
        _isSortSearch.set('creditCardNumber',"sort&search");   		 
        _isSortSearch.set('cardType',"sort&search");   		 
        _isSortSearch.set('status',"sort&search");   		 
        _isSortSearch.set('productDesc',"sort&search");   		 
        _isSortSearch.set('branchDesc',"sort&search");   		 
        _isSortSearch.set('cardRefNumber',"sort&search");   		 
        _isSortSearch.set('validThru',"sort&search");   		 
        _isSortSearch.set('issueDate',"sort&search");   		 
    return _isSortSearch;
  }

  private retailCreditCardsSummaryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Creditcard
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailCreditCardsSummaryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Creditcard
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailCreditCardsSummaryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Creditcard
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
  this.setNgTemplateName('casaTransactionsDtlsListTmplt');
  }
  
  
 override doPostInit(): void {
  }  
 
 
}


 
 
