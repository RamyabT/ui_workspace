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
import { Loanrepaymentschedule } from '../loanrepaymentschedule-service/loanrepaymentschedule.model';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';

@Injectable()
export class RetailLoanRepaymentscheduleCalcRoHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _appConfig:AppConfigService,) {
    super();
    this.addHandleActions('onClick', this.retailLoanRepaymentscheduleCalcRoView);
    this.addHandleActions('modify', this.retailLoanRepaymentscheduleCalcRoModify);
    this.addHandleActions('add', this.retailLoanRepaymentscheduleCalcRoEntry);
   
    
  }
   


  public getGridColumnWidth(): number[] {
    return  [3,12,12,12,12,12,12,12];
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
        _isSortSearch.set('repaymentDate',"sort&search");   		 
        _isSortSearch.set('interestRate',"sort&search");   		 
        _isSortSearch.set('serialNo',"sort&search");   		 
        _isSortSearch.set('principalOutstandingAmount',"sort&search");   		 
        _isSortSearch.set('installmentAmount',"sort&search");   		 
        _isSortSearch.set('loanAmount',"sort&search");   		 
        _isSortSearch.set('interestAmount',"sort&search");   		 
    return _isSortSearch;
  }

  private retailLoanRepaymentscheduleCalcRoView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loanrepaymentschedule
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailLoanRepaymentscheduleCalcRoModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Loanrepaymentschedule
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailLoanRepaymentscheduleCalcRoEntry: BaseFpxRoGridHandleAction = (
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
  this.setNgTemplateName('loanRepaymentScheduleTmplt');
  this.setNgTemplateClass('repayment-schedule-tmplt');
  }
  
  override postFindallInterceptor= (payload: any) => {
    debugger
    return payload;
  }
 override doPostInit(): void {
 
  }  
 
 
}


 
 
