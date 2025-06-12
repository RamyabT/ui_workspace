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
import { PpCard } from '../ppCard-service/ppCard.model';

@Injectable()
export class RetailPrepaidCardsSummaryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailPrepaidCardsSummaryRoGridView);
    this.addHandleActions('modify', this.retailPrepaidCardsSummaryRoGridModify);
    this.addHandleActions('add', this.retailPrepaidCardsSummaryRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,160,400,100,100,100,400,100];
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
        _isSortSearch.set('cardReference',"sort&search");   		 
        _isSortSearch.set('cardNumber',"sort&search");   		 
        _isSortSearch.set('cardType',"sort&search");   		 
        _isSortSearch.set('status',"sort&search");   		 
        _isSortSearch.set('productDesc',"sort&search");   		 
        _isSortSearch.set('branchDesc',"sort&search");   		 
        _isSortSearch.set('validThru',"sort&search");   		 
    return _isSortSearch;
  }

  private retailPrepaidCardsSummaryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:PpCard
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailPrepaidCardsSummaryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: PpCard
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailPrepaidCardsSummaryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:PpCard
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


 
 
