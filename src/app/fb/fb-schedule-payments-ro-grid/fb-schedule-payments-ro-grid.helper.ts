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
 import { TempScheduleRep } from '../tempScheduleRep-service/tempScheduleRep.model';
import { TempScheduleRepService } from '../tempScheduleRep-service/tempScheduleRep.service';
 import { MomentService } from 'src/app/foundation/validator-service/moment-service';


@Injectable()
export class FbSchedulePaymentsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _tempScheduleRepService: TempScheduleRepService,
  private momentService: MomentService) {
    
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
  this.setNgTemplateName('fbScheduleTransactionsDtlsListTmplt');
  this.setNgTemplateClass('schedule-transactions-dtls-list-tmpl panning-template');
   let  upcomingCriteriaQuery = new CriteriaQuery();
           upcomingCriteriaQuery.addFilterCritertia('scheduleType', 'String', 'inRange', {
               fromValue : "2",
               toValue : "3"
             });
            upcomingCriteriaQuery.addFilterCritertia('scheduledCategory', 'Numeric', 'equals', { searchText: '4' });

           this.setInitialCriteria(upcomingCriteriaQuery);

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

  private transformServiceType: GridTransformFn<TempScheduleRep> = (payload: TempScheduleRep) => {
    let serviceTypeDescription: string = '';
    // if (payload.scheduleType == "2") {
    //   serviceTypeDescription = "Pay later";
    // }
    // else if (payload.scheduleType == "3") {
    //   serviceTypeDescription = "Recurring";
    // }

    return serviceTypeDescription;
  }
  
  
 override doPostInit(): void {
  }  
 
  override postFindallInterceptor = (payload: any) => {
    let rowData: TempScheduleRep[] = [];
    let _date = "";
    
    payload.data.map((element: any) => element.serviceCodeDescription = this.transformServiceCode(element));
    payload.data.map((element: any) => element.serviceTypeDescription = this.transformServiceType(element));

    payload.data.forEach((element: any) => {
      if (_date != element.nextPaymentDate) {
        _date = element.nextPaymentDate;
        let rowGroup: any = {
          rowGroupTitle: _date
        }
        rowData.push(rowGroup);
      }
      rowData.push(element);
    });
    payload.data = rowData;
    
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload.data
    });

    return payload;
  }
 
}


 
 
