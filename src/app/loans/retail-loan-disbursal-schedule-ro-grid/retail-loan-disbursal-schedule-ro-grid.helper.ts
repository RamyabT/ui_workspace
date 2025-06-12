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
import { Loandisbursalschedule } from '../loandisbursalschedule-service/loandisbursalschedule.model';

@Injectable()
export class RetailLoanDisbursalScheduleROGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailLoanDisbursalScheduleROGridView);
    this.addHandleActions('modify', this.retailLoanDisbursalScheduleROGridModify);
    this.addHandleActions('add', this.retailLoanDisbursalScheduleROGridEntry);
  }
   	                              	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,40,40,40,40,40,40];
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
        _isSortSearch.set('disbursalId',"sort&search");   		 
        _isSortSearch.set('disbursalTo',"sort&search");   		 
        _isSortSearch.set('disbursalAmount',"sort&search");   		 
        _isSortSearch.set('accountNumber',"sort&search");   		 
        _isSortSearch.set('disbursalType',"sort&search");   		 
        _isSortSearch.set('paymentMode',"sort&search");   		 
    return _isSortSearch;
  }

  private retailLoanDisbursalScheduleROGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loandisbursalschedule
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailLoanDisbursalScheduleROGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Loandisbursalschedule
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailLoanDisbursalScheduleROGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loandisbursalschedule
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
  this.setNgTemplateName('disburseScheduleTmplt');
  this.setNgTemplateClass('disbursement-schedule-tmplt');
  }
  
  
 override doPostInit(): void {
  } 
  
  override postFindallInterceptor = (payload: any) => {
    return payload;
  }
 
 
}


 
 
