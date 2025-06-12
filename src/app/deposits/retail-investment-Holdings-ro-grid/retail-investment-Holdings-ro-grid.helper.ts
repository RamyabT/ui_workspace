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
import { InvestmentHoldings } from '../investmentHoldings-service/investmentHoldings.model';

@Injectable()
export class InvestmentHoldingsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    // this.addHandleActions('onClick', this.investmentHoldingsRoGridView);
    // this.addHandleActions('modify', this.investmentHoldingsRoGridModify);
    // this.addHandleActions('add', this.investmentHoldingsRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [15,15,15,15,15,15];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    // toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    // toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    //toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
        _isSortSearch.set('securityName',"sort&search");   		 
        _isSortSearch.set('symbol',"sort&search");   		 
        _isSortSearch.set('quantity',"sort&search");   		 
        _isSortSearch.set('accountNumber',"sort&search");   		 
        _isSortSearch.set('price',"sort&search");   		 
        _isSortSearch.set('marketPrice',"sort&search");   		 
    return _isSortSearch;
  }

  private investmentHoldingsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:InvestmentHoldings
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private investmentHoldingsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: InvestmentHoldings
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private investmentHoldingsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:InvestmentHoldings
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
  this.setRefreshOption(false);
  this.setNgTemplateName('viewPortfolioHoldingsTmplt');
  this.setNgTemplateClass('dc-transactions-dtls-list-tmpl panning-template');

  }
  
  
 override doPostInit(): void {
  }  
 
 
}


 
 
