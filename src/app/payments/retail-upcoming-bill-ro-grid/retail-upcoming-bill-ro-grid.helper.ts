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
  FpxAppConfig,
} from "@fpx/core";
import { Upcomingbill } from '../upcomingbill-service/upcomingbill.model';
import moment from 'moment';
import { AppConfigService } from '@dep/services';
import { PaymentsService } from '../payments.service';

@Injectable()
export class RetailUpcomingBillRoGridHelper extends BaseFpxRoGridHelper {
  initialGridLoad: boolean = true;

  constructor(private _router: Router,
    public fpxappConfig:FpxAppConfig,
    private paymentsServices:PaymentsService,
    private _appConfig:AppConfigService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retailUpcomingBillRoGridView);
    this.addHandleActions('modify', this.retailUpcomingBillRoGridModify);
    this.addHandleActions('add', this.retailUpcomingBillRoGridEntry);
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

  private retailUpcomingBillRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Upcomingbill
  ) => {
    //WRITE YOUR CODE HERE 
      let serviceCode:string = 'RETAILSINGLEPAYMENT';
      let service:any = this.fpxappConfig.getServiceDetails(serviceCode);
      if(service){
        this._appConfig.setData('billData',data);
        this._router.navigate(service?.servicePath, {
          queryParams: {
            routeFrom:"UPCOMINGGRID",
            serviceCode: serviceCode,
          },
        });
  }
  };
  private retailUpcomingBillRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Upcomingbill
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailUpcomingBillRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Upcomingbill
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

  this.setNgTemplateName('upcomingBillTmplt');
  this.setNgTemplateClass('upcoming-bill-tmpl');
  // this.initialLoad = false;
  let  upcomingCriteriaQuery = new CriteriaQuery();
  upcomingCriteriaQuery.addSortCriteria('dueDate','asc','Timestamp');
  this.setInitialCriteria(upcomingCriteriaQuery);

  }
  
  
 override doPostInit(): void {
  
  }  

  
  override postFindallInterceptor = (payload: any) => {
    if(this.initialGridLoad){
      this.initialGridLoad = false
      this.triggerGridOutputEvent('UPCOMINGBILLDATA',payload)
    }
    if(payload && payload?.data?.length>0){
      let tempPayload:any[] = [];
      payload.data.forEach((element:any) => {
        let date = this.getMessage(element);
        let amount = element?.currency + " " + this._currencyFormatter.transform((element?.totalDueAmount || 0), element?.currency)
        tempPayload.push({...element,date:date,amount:amount})
      });
      payload.data = tempPayload;
    }
    this.paymentsServices.upcomingBillData = payload;
    return payload;
  }

  getMessage(element:any):any{
    if(element?.dueDate && element?.dueDate !== ''){
    let duuDate = moment(element?.dueDate);
       let currentDte = moment(this._appConfig.getCBD())
        let days = moment(element?.dueDate).diff(moment(this._appConfig.getCBD()),'days');
        let isAfter = moment(this._appConfig.getCBD()).isAfter(moment(element?.dueDate));
        let isBefore = moment(this._appConfig.getCBD()).isBefore(moment(element?.dueDate));
        let issame = moment(element?.dueDate).isSame(moment(this._appConfig.getCBD()));
    if(issame){
      return `<span class="danger">Due for today<span>`
    }
    if(isAfter){
      if(days<7){
        return `<span class="danger">Bill past due ${Math.abs(days)} day</span>`
      }else if(days > 7){
        return `<span class="danger">Bill past due date</span>`
      }
    }else if(isBefore){
      if(days<7){
        return `<span>Due in ${Math.abs(days)} day</span>`
      }else if(days === 7){
        return `<span>Due in 1w</span>`
      } else if(days > 7){
        return `<span>Due in ${Math.abs(days)} day</span>`
      }
    }else{
      return `<span class="danger">Due for today<span>`
    }
  }else{
    return undefined
  }
  }

 
 
}


 
 
