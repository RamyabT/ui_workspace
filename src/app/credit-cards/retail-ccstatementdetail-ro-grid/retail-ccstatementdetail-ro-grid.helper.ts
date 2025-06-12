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
import { Ccstatementdetail } from '../ccstatementdetail-service/ccstatementdetail.model';

@Injectable()
export class RetailCcstatementdetailRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailCcstatementdetailRoGridView);
    this.addHandleActions('modify', this.retailCcstatementdetailRoGridModify);
    this.addHandleActions('add', this.retailCcstatementdetailRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10,40,40,40];
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
        _isSortSearch.set('transactionReference',"sort&search");   		 
        _isSortSearch.set('transactionDate',"sort&search");   		 
        _isSortSearch.set('valueDate',"sort&search");   		 
        _isSortSearch.set('transactionAmount',"sort&search");   		 
        _isSortSearch.set('merchantId',"sort&search");   		 
        _isSortSearch.set('transactionCat',"sort&search");   		 
        _isSortSearch.set('transactionCurrency',"sort&search");   		 
        _isSortSearch.set('transactionDescription',"sort&search");   		 
    return _isSortSearch;
  }

  private retailCcstatementdetailRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Ccstatementdetail
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailCcstatementdetailRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Ccstatementdetail
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailCcstatementdetailRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Ccstatementdetail
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
  }
  
  
 override doPostInit(): void {
  }  
 
 
}


 
 
