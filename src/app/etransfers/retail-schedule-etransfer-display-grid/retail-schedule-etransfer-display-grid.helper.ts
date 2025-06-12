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
import { Scheduleetransfer } from '../scheduleetransfer-service/scheduleetransfer.model';
import moment from 'moment';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailScheduleEtransferDisplayGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _appConfig: AppConfigService,) {
    super();
    this.addHandleActions('onclick', this.retailScheduleEtransferDisplayGridView);
    this.addHandleActions('modify', this.retailScheduleEtransferDisplayGridModify);
    this.addHandleActions('add', this.retailScheduleEtransferDisplayGridEntry);
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

  private retailScheduleEtransferDisplayGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Scheduleetransfer
  ) => {
    //WRITE YOUR CODE HERE
    this._appConfig.setData('EtransferSendMoneyData',data);
    let service = this._appConfig.getServiceDetails('ETRANSFERSENDMONEY'); 
    let servicePath = service.servicePath;
      this._angularRouter.navigate(servicePath, {
        queryParams: {
          paymentId: data.paymentId,
          serviceCode: 'ETRANSFERSENDMONEY',
          mode:'M'
        }
      });
  };
  private retailScheduleEtransferDisplayGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Scheduleetransfer
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailScheduleEtransferDisplayGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Scheduleetransfer
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
  const criteriaQuery: CriteriaQuery = new CriteriaQuery();
  criteriaQuery.addFilterCritertia('scheduledCategory', 'String', 'equals', {
    searchText: '3'
  });
  criteriaQuery.addSortCriteria('paymentDate', 'asc', 'Date')
  this.setInitialCriteria(criteriaQuery)
  this.setNgTemplateName('eTransferScheduledTmplt');
  this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
  }
  
  
 override doPostInit(): void {
  }  
 
  override postFindallInterceptor = (payload: any) => {
    let rowData: any[] = [];
    let _date = "";
    let _dateGroupName = "";
      payload.data.forEach((element: any) => {
        if (_date != element.paymentDate) {
          let paymentDate = _date = element.paymentDate;
          let currentDate = moment().format('YYYY-MM-DD');
          if (moment(paymentDate).diff(moment(currentDate), 'days') == 0) _dateGroupName = 'Today';
          else if (moment(paymentDate).diff(moment(currentDate), 'days') == -1) _dateGroupName = 'Yesterday';
          else _dateGroupName = moment(paymentDate).format('DD MMM YYYY');

          let rowGroup: any = {
            rowGroupTitle: _dateGroupName
          }
          rowData.push(rowGroup);
        }
        rowData.push(element);
      });
      payload.data = rowData;
      this.gridOutputEvent.next({
        name: 'afterDataFetch',
        payload: payload?.data
      });
      return payload;

  }
}


 
 
