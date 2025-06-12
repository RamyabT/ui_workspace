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
import { Viewscheduledbills } from '../viewscheduledbills-service/viewscheduledbills.model';
import moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailViewScheduledBillsDisplayGridHelper extends BaseFpxRoGridHelper {

  rowDatas: any[] = [];

  constructor(private _router: Router,
    public currency: CurrencyPipe,
    public _device: DeviceDetectorService,
    private _httpProvider: HttpProviderService,
    private _appConfig: AppConfigService
  ) {
    super();
    this.addHandleActions('onclick', this.retailViewScheduledBillsDisplayGridView);
    this.addHandleActions('modify', this.retailViewScheduledBillsDisplayGridModify);
    this.addHandleActions('add', this.retailViewScheduledBillsDisplayGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [16, 17, 18, 15, 18, 16];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    // _isSortSearch.set('paymentDate',"sort&search");   		 
    // _isSortSearch.set('beneficiaryName',"sort&search");   		 
    // _isSortSearch.set('sourceAccount',"sort&search");   		 
    // _isSortSearch.set('paymentAmount',"sort&search");   		 
    // _isSortSearch.set('scheduleType',"sort&search");   		 
    // _isSortSearch.set('operationMode',"sort&search");   		 
    return _isSortSearch;
  }

  private retailViewScheduledBillsDisplayGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: any
  ) => {

    console.log(data)

    if (this._appConfig.hasData('selectedScheduleBill$')) {
      this._appConfig.getData('selectedScheduleBill$').subject.next({ selectedData: data });
    }

    //WRITE YOUR CODE HERE 
  };
  private retailViewScheduledBillsDisplayGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Viewscheduledbills
  ) => {
    console.log(data)
    //WRITE YOUR CODE HERE 
  };
  private retailViewScheduledBillsDisplayGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Viewscheduledbills
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
   transformMap.set('paymentDate', this.paymentDate);
   transformMap.set('paymentAmount', this.paymentAmount);
   transformMap.set('scheduleType', this.scheduleType);
    return transformMap;

  }
  paymentDate: GridTransformFn<Viewscheduledbills> = (payload: Viewscheduledbills) => {
   if(payload?.paymentDate){
    return moment(payload?.paymentDate).format('DD MMM YYYY');
   }
   else{
    return '';
   }
  }
  paymentAmount: GridTransformFn<Viewscheduledbills> = (payload: Viewscheduledbills) => {
    if(payload?.paymentAmount){
     return '$'+' '+this.currency.transform(payload?.paymentAmount, ' ', false)
    }
    else{
     return '';
    }
   }
   scheduleType: GridTransformFn<Viewscheduledbills> = (payload: Viewscheduledbills) => {
    if(payload.scheduleType=='1'){
     return 'Pay Now';
    }
    else if(payload.scheduleType=='2'){
     return 'Pay Later';
    }
    else if(payload.scheduleType=='3'){
      return 'Reccurring';
    }
    else{
      return ''
    }
   }

  
  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {

    const initialCriteria = new CriteriaQuery();
    initialCriteria.addSortCriteria('paymentDate', 'asc', 'Date');
    this.setInitialCriteria(initialCriteria);
    
    this._showPagination = false;
    if (this._device.isMobile()) {
      this.setNgTemplateName('viewScheduledBillsMobTmplt');
      this.setNgTemplateClass('view-scheduled-bills-mob-tmpl');
    }
    else {
      this.setNgTemplateName('viewScheduledBillsTmplt');
      this.setNgTemplateClass('view-scheduled-bills-tmpl');
    }
    
    if (this._appConfig.hasData('closeScheduleBill$')) {
      this._appConfig.getData('closeScheduleBill$').observable.subscribe(
        (res: any) => {
          console.log("Clear Row Selection Here");

          this.refreshGrid$.next('');
          if (this._appConfig.hasData('selectedScheduleBill$')) {
            this._appConfig.getData('selectedScheduleBill$').subject.next({});
          }
        })
    }
  }


  override doPostInit(): void {
  }
  override postFindallInterceptor = (payload: any) => {
    console.log("payload", payload);
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data.length
    });

    let rowData: any = [];
    let _date = "";

    payload.data.forEach((element: any) => {
      let dateStr = new Date(element.paymentDate).toDateString();
      if (_date != dateStr) {
        _date = dateStr;
        let rowGroup: any = {
          rowGroupTitle: _date
        }
        rowData.push(rowGroup);
      }
      rowData.push(element);
    })

    rowData.forEach((element: any) => {
      element.selectedGridRow = false;
    });

    console.log("rowData", rowData);
    console.log("payload", payload);


    this.rowDatas = rowData;
    console.log("this.rowDatas", this.rowDatas)

    return rowData;
  }


}


 
 
