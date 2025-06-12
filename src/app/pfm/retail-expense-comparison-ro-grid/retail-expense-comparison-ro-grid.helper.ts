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
// import { Servicerequestlog } from '../servicerequestlog-service/servicerequestlog.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailExpenseComparisonRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  public appConfigService : AppConfigService) {
    super();
    this.addHandleActions('onclick', this.retailExpenseComparisonRoGridView);
    this.addHandleActions('modify', this.retailExpenseComparisonRoGridModify);
    this.addHandleActions('add', this.retailExpenseComparisonRoGridEntry);
  }
   
  public getGridColumnWidth(): number[] {
    return  [3,];
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
    return _isSortSearch;
  }

  
  private retailExpenseComparisonRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:any
  ) => {
    //WRITE YOUR CODE HERE 

  };
  private retailExpenseComparisonRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: any
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailExpenseComparisonRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:any
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
  this.setNgTemplateName('expenseComparisonTmplt');
  this.setNgTemplateClass('expense-comparison-tmplt');
  }
  
  
 override doPostInit(): void {
  }  

 
}


 
 
