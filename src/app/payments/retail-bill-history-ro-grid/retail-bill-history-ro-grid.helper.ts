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
  FpxCurrenyFormatterPipe,
} from "@fpx/core";
import { Billsummary } from '../billsummary-service/billsummary.model';
import { AppConfigService } from '@dep/services';
import moment from 'moment';

@Injectable()
export class RetailBillHistoryRoGridHelper extends BaseFpxRoGridHelper {
  initialGridLoad: boolean = true;
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _appConfig:AppConfigService,
  private _currencyFormatter: FpxCurrenyFormatterPipe) {
    super();
    this.addHandleActions('onclick', this.retailBillHistoryRoGridView);
    this.addHandleActions('modify', this.retailBillHistoryRoGridModify);
    this.addHandleActions('add', this.retailBillHistoryRoGridEntry);
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

  private retailBillHistoryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Billsummary
  ) => {
    //WRITE YOUR CODE HERE 
    let queryParams: any = {
      "tranRef": data?.transferReference
    }
    let serviceCode=data.serviceCode;

    let service = this._appConfig.getServiceDetails(serviceCode);
    let route:any;
    // service.servicePath[1] = 'display-shell'
    // route = 'display-shell'
    this._router.navigate([
      "payments-space",
      "display-shell",
      "payments",
      "view-single-bill-form"
    ], {
      queryParams: {
        "serviceCode": serviceCode,
        action:'VIEW',
        routeFrom:"BILLERSUMMARY",
        status:data?.statusType,
        ...service.queryParams,
        ...queryParams
      }
    });
  };
  private retailBillHistoryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Billsummary
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailBillHistoryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Billsummary
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
  this.initialGridLoad = true
  this.setNgTemplateName('billHistoryTmplt');
  this.setNgTemplateClass('biller-history-tmpl');
 }
  
  
 override doPostInit(): void {
  
  }  
 

  override postFindallInterceptor = (payload: any) => {
    if(this.initialGridLoad){
      this.initialGridLoad = false
      this.triggerGridOutputEvent('UPCOMINGBILLDATA',payload);
    }
    let _date = "";
    if(payload && payload?.data?.length>0){
      let tempPayload:any[] = [];
      
      payload.data.forEach((element:any) => {
        let displayDate =   moment(element?.paymentDate).format('MMM DD');
        let displayTime =   moment(element?.paymentDate).format("hh:mm a");
        let _d = element?.paymentDate?.split(' ')[0];
        if(moment(this._appConfig.getCBD()).isSame(moment(element?.paymentDate).format('YYYY-MM-DD'))){
          _d = 'Today';
        }else if(moment(this._appConfig.getCBD()).subtract(1,'day').isSame(moment(element?.paymentDate).format('YYYY-MM-DD'))){
          _d = 'Yesterday';
        }else{
          _d = moment(_d).format('DD MMM yyyy');
        }
        if (_date != _d) {
          _date = _d;
          let rowGroup: any = {
            rowGroupTitle: _date
          }
          tempPayload.push(rowGroup);
        }
        tempPayload.push({...element,displayDate:displayDate,displayTime:displayTime})
      });
      payload.data = tempPayload;
    }
    return payload;
  }
 
}


 
 
