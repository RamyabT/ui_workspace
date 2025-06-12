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
import { Transferhistory } from '../transferhistory-service/transferhistory.model';
import { TransferhistoryService } from '../transferhistory-service/transferhistory.service';

@Injectable()
export class RetailTransferHistoryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _transferhistoryService: TransferhistoryService) {
    super();
    this.addHandleActions('onClick', this.retailTransferHistoryRoGridView);
    this.addHandleActions('modify', this.retailTransferHistoryRoGridModify);
    this.addHandleActions('add', this.retailTransferHistoryRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,100,100,100,100,100,100,100,100,100,100,100];
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
        _isSortSearch.set('uETR',"sort&search");   		 
        _isSortSearch.set('valueDate',"sort&search");   		 
        _isSortSearch.set('initiationDate',"sort&search");   		 
        _isSortSearch.set('paymentType',"sort&search");   		 
        _isSortSearch.set('paymentAmount',"sort&search");   		 
        _isSortSearch.set('debitAccountNumber',"sort&search");   		 
        _isSortSearch.set('beneficiaryAccountNumber',"sort&search");   		 
        _isSortSearch.set('transactionReference',"sort&search");   		 
        _isSortSearch.set('status',"sort&search");   		 
        _isSortSearch.set('paymentId',"sort&search");   		 
        _isSortSearch.set('beneficiaryName',"sort&search");   		 
    return _isSortSearch;
  }

  private retailTransferHistoryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Transferhistory
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailTransferHistoryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Transferhistory
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailTransferHistoryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Transferhistory
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
  this.setNgTemplateName('transferHistoryListTmplt');
  this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
  }
  
  
 override doPostInit(): void {
  }  
  override postFindallInterceptor = (payload: any) => {
    let rowData: Transferhistory[] = [];
    let _date = "";
    
    payload.data.forEach((element: any) => {
      if (_date != element.paymentDate) {
        _date = element.paymentDate;
        let rowGroup: any = {
          rowGroupTitle: _date
        }
        rowData.push(rowGroup);
      }
      rowData.push(element);
    });
    payload.data = rowData;
    return payload;
  }
 
 
}


 
 
