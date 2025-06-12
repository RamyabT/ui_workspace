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
import { Etransfer } from '../etransfer-service/etransfer.model';
import moment from 'moment';
import { AppConfigService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ETransferHistoryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _appConfig: AppConfigService,
  private _deviceService: DeviceDetectorService,
  private _activeSpaceInfoService: ActiveSpaceInfoService) {
    super();
    this.addHandleActions('onclick', this.eTransferHistoryRoGridView);
    this.addHandleActions('modify', this.eTransferHistoryRoGridModify);
    this.addHandleActions('add', this.eTransferHistoryRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10,10];
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
        _isSortSearch.set('paymentDate',"sort&search");   		 
        _isSortSearch.set('contactName',"sort&search");   		 
        _isSortSearch.set('contactEmailId',"sort&search");   		 
        _isSortSearch.set('contactPhoneNumber',"sort&search");   		 
        _isSortSearch.set('paymentAmount',"sort&search");   		 
        _isSortSearch.set('paymentStatus',"sort&search");   		 
    return _isSortSearch;
  }

  private eTransferHistoryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Etransfer
  ) => {
    //WRITE YOUR CODE HERE
    if(!this._deviceService.isMobile()){
      let show = Object.keys(data).length === 0 ? false : true;
      if(!show){
        this._appConfig.getData('closeContactForm$').subject.next({
          showContactForm: false,
          showSendMoneyDetails: false,
          showRequestMoneyDetails: false
        });
        return;
      }
      if(data.serviceCode=='ETRANSFERSENDMONEY'){
        this._appConfig.getData('showSendMoneyDetails$').subject.next({
          showSendMoneyDetails: show,
          sendMoneyDetailsObj: data,
          showReceiveMoneyDetails: false,
          showRequestMoneyDetails: false
        });
      }
      if(data.serviceCode=='ETRANSFERRECEIVEMONEY'){
        this._appConfig.getData('showReceiveMoneyDetails$').subject.next({
          showReceiveMoneyDetails: show,
          receiveMoneyDetailsObj: data,
          showSendMoneyDetails: false,
          showRequestMoneyDetails: false
        });
      }
      if(data.serviceCode=='ETRANSFERREQUESTMONEY'){
        this._appConfig.getData('showRequestMoneyDetails$').subject.next({
          showRequestMoneyDetails: show,
          requestMoneyDetailsObj: data,
          showSendMoneyDetails: false,
          showReceiveMoneyDetails: false
        });
      }
      return;
    }
    // ETRANSFERSENDMONEY GETETRANSFERSEND
    // ETRANSFERREQUESTMONEY GETETRANSFERREQUEST
    // ETRANSFERRECEIVEMONEY GETETRANSFERRECEIVE 
    this._activeSpaceInfoService.setOrginSpace(this._activeSpaceInfoService.getActiveSpace());
    this._appConfig.setData('getServiceCode', data.serviceCode?this.getServiceCode(data.serviceCode):'');
    this._appConfig.setData('requestURLInfo', {
      requestId: data.paymentId,
      tenantId: data.tenantId,
      data: data
    });
    let service = this._appConfig.getServiceDetails(data.serviceCode);
    let servicePath = service.servicePath.map((path: string) => { return path.replace('entry-shell', 'display-shell') });
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        action: "VIEW",
        paymentId: data.paymentId,
        serviceCode: data.serviceCode,
        mode: "V"
      }
    });
  };

  getServiceCode(serviceCode: string): string {
    if(serviceCode == 'ETRANSFERSENDMONEY') serviceCode = 'GETETRANSFERSEND';
    if(serviceCode == 'ETRANSFERREQUESTMONEY') serviceCode = 'GETETRANSFERREQUEST';
    if(serviceCode == 'ETRANSFERRECEIVEMONEY') serviceCode = 'GETETRANSFERRECEIVE';
    return serviceCode;
  }
  private eTransferHistoryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransfer
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private eTransferHistoryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Etransfer
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
  let refreshTransferHistoryGrid$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('refreshTransferHistoryGrid$', {
      "observable": refreshTransferHistoryGrid$.asObservable(),
      "subject": refreshTransferHistoryGrid$
    });
    if (this._appConfig.hasData('refreshTransferHistoryGrid$')) {
      this._appConfig.getData('refreshTransferHistoryGrid$').observable.subscribe(
        (res: any) => {
          console.log("Clear Row Selection Here");
          this.refreshGrid$.next('');
        })
    }
  this.setNgTemplateName('eTransferHistoryTmplt');
  this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
   this.initialLoad=false;
  }

  override doPostInit(): void {
  }

  override doDestroy(): void {
    if (this._appConfig.hasData('refreshTransferHistoryGrid$')) {
      this._appConfig.removeData('refreshTransferHistoryGrid$');
    }
  }
  
  override postFindallInterceptor = (payload: any) => {
    let rowData: any[] = [];
    let _date = "";
    let _dateGroupName = "";
    // if (payload.data) {
      payload.data.forEach((element: any) => {
        if (_date != moment(element.paymentDate).format('YYYY-MM-DD')) {
          _date = moment(element.paymentDate).format('YYYY-MM-DD');
          let paymentDate = element.paymentDate;
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
    // }
    // else {
    //   if (payload?.data?.length == 0 || payload?.data?.ErrorCode || payload.data?.ErrorDescription) {
    //     return {
    //       "totalRowCount": null
    //     }
    //   }
    // }

  }

}




