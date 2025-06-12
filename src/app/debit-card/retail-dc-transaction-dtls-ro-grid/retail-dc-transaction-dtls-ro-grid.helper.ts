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
import { Dctransactiondtls } from '../dctransactiondtls-service/dctransactiondtls.model';
import { RetailDcTransactionExFilterComponent } from '../retailDCTransactionExFilter/retail-dc-transaction-ex-filter.component'
import moment from 'moment';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
import { Debitcard } from '../debitcard-details-service/debitcard-details.model';
@Injectable()
export class RetailDcTransactionDtlsRoGridHelper extends BaseFpxRoGridHelper {

  cardData!: Debitcard;
  constructor(private _router: Router, private _appConfig: AppConfigService,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailDcTransactionDtlsRoGridView);
    this.addHandleActions('modify', this.retailDcTransactionDtlsRoGridModify);
    this.addHandleActions('add', this.retailDcTransactionDtlsRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [4,14,14,14,14,14,13,13];
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
        _isSortSearch.set('valueDate',"sort&search");   		 
        _isSortSearch.set('transactionDate',"sort&search");   		 
        _isSortSearch.set('transactionDescription',"sort&search");   		 
        _isSortSearch.set('transactionReference',"sort&search");   		 
        _isSortSearch.set('transType',"sort&search");   		 
        _isSortSearch.set('transactionAmount',"sort&search");   		 
        _isSortSearch.set('balance',"sort&search");   		 
    return _isSortSearch;
  }

  private retailDcTransactionDtlsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Dctransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailDcTransactionDtlsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Dctransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailDcTransactionDtlsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Dctransactiondtls
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
  this.setFilterFormComponent(RetailDcTransactionExFilterComponent);
  this.setNgTemplateName('dcTransactionsDtlsListTmplt');
    this.setNgTemplateClass('dc-transactions-dtls-list-tmpl panning-template');

    this.cardData = this._appConfig.getData('debitCardData');
    const criteriaQuery = new CriteriaQuery();
  //  let cardRefNumber= this.getRoutingParam('cardRefNumber');
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: this.cardData?.accountNumber });
    criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: this.cardData?.cardRefNumber });
    this.setInitialCriteria(criteriaQuery)
  }
    
  
 override doPostInit(): void {
  }  
//   override externalFilterCriteriaTransform = (payload :any , criteriaQuery : CriteriaQuery) : CriteriaQuery | undefined => {

//     criteriaQuery.addFilterCritertia('transactionDate','Date','inRange',{
//       dateFrom : payload.transactionDate,
//       dateTo : payload.valueDate
//     })
//     criteriaQuery.addFilterCritertia('transactionAmount','String','inRange',{
//       fromValue : payload.minAmount,
//       toValue : payload.maximumAmount
//     })
//     criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');
//   return criteriaQuery
// }

override postFindallInterceptor = (payload: any) => {
  let rowData: any[] = [];
  let _date = "";
  let _dateGroupName = "";
    payload.data.forEach((element: any) => {
    if (_date != element.transactionDate) {
      let transactionDate = _date = element.transactionDate;
      let currentDate = moment().format('YYYY-MM-DD');
      if(moment(transactionDate).diff(moment(currentDate),'days') == 0) _dateGroupName = 'Today';
      else if(moment(transactionDate).diff(moment(currentDate),'days') == -1) _dateGroupName = 'Yesterday';
      else _dateGroupName = moment(transactionDate).format('DD MMM YYYY');
      // else _dateGroupName=moment(transactionDate).format('MMM YYYY');

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


 
 
