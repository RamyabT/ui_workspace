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
import { Loanrepaymentschedule } from '../../loans/loanrepaymentschedule-service/loanrepaymentschedule.model';
import { Observable } from 'rxjs';

@Injectable()
export class RetailLoanRepaymentScheduleROGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService) {
    super();
    this.addHandleActions('onClick', this.retailLoanRepaymentScheduleROGridView);
    this.addHandleActions('modify', this.retailLoanRepaymentScheduleROGridModify);
    this.addHandleActions('add', this.retailLoanRepaymentScheduleROGridEntry);
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
        _isSortSearch.set('serialNo',"sort&search");   		 
        _isSortSearch.set('repaymentDate',"sort&search");   		 
        _isSortSearch.set('loanAmount',"sort&search");   		 
        _isSortSearch.set('interestAmount',"sort&search");   		 
        _isSortSearch.set('installmentAmount',"sort&search");   		 
        _isSortSearch.set('principalOutstandingAmount',"sort&search");   		 
    return _isSortSearch;
  }

  private retailLoanRepaymentScheduleROGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loanrepaymentschedule
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailLoanRepaymentScheduleROGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Loanrepaymentschedule
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailLoanRepaymentScheduleROGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loanrepaymentschedule
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
  this.setNgTemplateName('repaymentScheduleTmplt');
  this.setNgTemplateClass('repayment-schedule-tmplt');
  }
  
  
 override doPostInit(): void {
  }  
 
  override postFindallInterceptor = (payload: any) => {
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data
    });
    return payload;
  }
 
}


 
 
