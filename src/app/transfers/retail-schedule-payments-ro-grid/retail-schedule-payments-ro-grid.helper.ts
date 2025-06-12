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
  FpxModal,
} from "@fpx/core";
import { TransfersInfoFormComponent } from '../transfers-info-form/transfers-info-form.component';
import { TempScheduleRep } from '../tempScheduleRep-service/tempScheduleRep.model';
import { TempScheduleRepService } from '../tempScheduleRep-service/tempScheduleRep.service';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { MomentService } from 'src/app/foundation/validator-service/moment-service';
import { DeviceDetectorService } from '@dep/core';
import moment from 'moment';
import { AppConfigService } from '@dep/services';


@Injectable()
export class RetailSchedulePaymentsRoGridHelper extends BaseFpxRoGridHelper {

  _date = "";


  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _tempScheduleRepService: TempScheduleRepService,
  private momentService: MomentService,
  public _device: DeviceDetectorService) {
    
    super();
    // this.addHandleActions('onclick', this.retailSchedulePaymentsRoGridView);
    // this.addHandleActions('modify', this.retailSchedulePaymentsRoGridModify);
    // this.addHandleActions('add', this.retailSchedulePaymentsRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,400,400,400,400,400,400,400,400,400,400,400,400];
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
        _isSortSearch.set('serviceCode',"sort&search");   		 
        _isSortSearch.set('scheduleType',"sort&search");   		 
        _isSortSearch.set('paymentAmount',"sort&search");   		 
        _isSortSearch.set('sourceAccount',"sort&search");   		 
        _isSortSearch.set('creditAccountNumber',"sort&search");   		 
        _isSortSearch.set('beneficiaryName',"sort&search");   		 
        _isSortSearch.set('nextPaymentDate',"sort&search");   		 
        _isSortSearch.set('paymentFrequency',"sort&search");   		 
        _isSortSearch.set('numberOfPayments',"sort&search");   		 
        _isSortSearch.set('paymentStatus',"sort&search");   		 
        _isSortSearch.set('paymentDate',"sort&search");   		 
        _isSortSearch.set('paymentId',"sort&search");   		 
    return _isSortSearch;
  }

  private retailSchedulePaymentsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:TempScheduleRep
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailSchedulePaymentsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: TempScheduleRep
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailSchedulePaymentsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:TempScheduleRep
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
   transformMap.set('serviceCode', this.transformServiceCode);
    return transformMap;

  }
  
  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    // this.setNgTemplateName('scheduleTransactionsDtlsListTmplt');
    // this.setNgTemplateClass('schedule-transactions-dtls-list-tmpl panning-template');
    this.setNgTemplateName('viewscheduleTransactionsDtlsListTmplt')
    console.log(this._router.url);
    if (this._router.url.includes('view-scheduled-transfers')) {
      this.setNgTemplateClass('view-scheduled-bills-tmpl panning-template');
    } else {
      this.setNgTemplateClass('view-scheduled-bills-landing-tmpl panning-template');
    }
    const initialCriteria = new CriteriaQuery();
    initialCriteria.addSortCriteria('nextPaymentDate', 'asc', 'Date');
    initialCriteria.addFilterCritertia('scheduledCategory', 'String', 'equals', {
      searchText: '1'
    });
    this.setInitialCriteria(initialCriteria);
  }


  private transformServiceCode: GridTransformFn<TempScheduleRep> = (payload: TempScheduleRep) => {
    let serviceCodeDescription: string = '';
    if (payload.serviceCode === 'RETAILSCHINTBT') {
      serviceCodeDescription = "WithinBank";
    }
    else if (payload.serviceCode === 'RETAILSCHOAT') {
      serviceCodeDescription = "Own Account";
    }
    else if ((payload.serviceCode === 'RETAILSCHDOM') || (payload.serviceCode === "RETAILSCHFTS")) {
      serviceCodeDescription = "Domestic";
    }
    else if (payload.serviceCode === 'RETAILSCHCC') {
      serviceCodeDescription = "Credit Card";
    }
    else if(payload.serviceCode==='RETAILSCHSWIFT') {

      serviceCodeDescription="International";
    }
    else if(payload.serviceCode==='RETAILSCHCBAED') {
      serviceCodeDescription="Cross Border";
    }
    
    return serviceCodeDescription;

  };
  
  
 override doPostInit(): void {
  }  
 
  override postFindallInterceptor = (payload: any) => {
    let rowData: any[] = [];
    let _dateGroupName = "";

    console.log("payload", payload);

    if (payload.status === 200) {
      payload.data.forEach((element: any) => {
        console.log("element", element.paymentDate);
        console.log("_date", this._date)
        if (this._date != element.paymentDate) {
          let paymentDate = this._date = element.paymentDate;
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
        payload: payload?.totalRowCount,
      });
      console.log("payload", payload);
      return payload;
    } else if (payload.status !== 200) {
      this.gridOutputEvent.next({
        name: 'errorHandling',
        payload: 0
      });
      return payload;
    }

  }

}


 
 
