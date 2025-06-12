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
import { Etransfercontactlog } from '../etransfercontactlog-service/etransfercontactlog.model';
import { EtransfercontactlogService } from '../etransfercontactlog-service/etransfercontactlog.service';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class etransfercontactlogtemplateHelper extends BaseFpxRoGridHelper {
  routingService: any
  beneId: string | undefined;
  constructor(private _router: Router,
    private etransfercontactlogService: EtransfercontactlogService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    private _device: DeviceDetectorService) {
    super();
    this.addHandleActions('onclick', this.etransfercontactlogtemplateView);
    this.addHandleActions('modify', this.etransfercontactlogtemplateModify);
    this.addHandleActions('add', this.etransfercontactlogtemplateEntry);
  }

  public getGridColumnWidth(): number[] {
    return [100,];
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
    return _isSortSearch;
  }

  private etransfercontactlogtemplateView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransfercontactlog
  ) => {
    //WRITE YOUR CODE HERE 
    if(!this._device.isMobile() && this.routingService=='RETAILMANAGEETRANSFERCONTACT'){
      let show = Object.keys(data).length === 0 ? false : true;
      if (this.routingService == 'RETAILMANAGEETRANSFERCONTACT') {
        this._appConfig.setData('EtransferSendMoneyData', data);
        this._appConfig.setData('EtransferRequestMoneyData', data);
        this.beneId = data.beneId;
        this._appConfig.setData('selectedContactQueryParams', {
          beneId: data.beneId,
          serviceCode: data.serviceCode, //RETAILETRANSFERMANAGECONTACT
          mode: 'M'
        });
        this._appConfig.getData('showContactForm$').subject.next({
          showContactForm: show,
          contact: data
        });
      }
      return;
    }
    if(this.routingService=='RETAILMANAGEETRANSFERCONTACT'){
      let service = this._appConfig.getServiceDetails(data.serviceCode);
      this._appConfig.setData('EtransferSendMoneyData', data);
      this._appConfig.setData('EtransferRequestMoneyData',data);
      let servicePath = service.servicePath;
      this._appConfig.setData('selectedContactQueryParams', {
        beneId: data.beneId,
        serviceCode: data.serviceCode, //RETAILETRANSFERMANAGECONTACT
        mode: 'M',
        contact: data
      });
      this._angularRouter.navigate(servicePath, {
        queryParams: {
          beneId: data.beneId,
          serviceCode: data.serviceCode, //RETAILETRANSFERMANAGECONTACT
          mode: 'M'
        }
      });
    }
    if(this.routingService=='RETAILMANAGEETRANSFERSENDMONEY'){
      this._appConfig.setData('EtransferSendMoneyData',data);
      let service = this._appConfig.getServiceDetails('ETRANSFERSENDMONEY');
      let servicePath = service.servicePath;
      this._angularRouter.navigate(servicePath, {
        queryParams: {
          serviceCode: 'ETRANSFERSENDMONEY',
          tranCat: 'C'
        }
      });
    }
    if(this.routingService=='RETAILMANAGEETRANSFERREQUESTMONEY'){
      this._appConfig.setData('EtransferRequestMoneyData',data);
      let service = this._appConfig.getServiceDetails('ETRANSFERREQUESTMONEY');
      let servicePath = service.servicePath;
      this._angularRouter.navigate(servicePath, {
        queryParams: {
          serviceCode: 'ETRANSFERREQUESTMONEY',
          tranCat: 'C'
        }
      });
    }
  };
  private etransfercontactlogtemplateModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransfercontactlog
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private etransfercontactlogtemplateEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransfercontactlog
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {

    this.routingService = this.getRoutingParam('serviceCode');
    this.setNgTemplateName('etransfercontactTmplt');
    this.setNgTemplateClass('manage-bene-list-tmpl panning-template');
    const criteriaQuery= new CriteriaQuery();
    criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' });
    this.setInitialCriteria(criteriaQuery);

    let refreshContactGrid$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('refreshContactGrid$', {
      "observable": refreshContactGrid$.asObservable(),
      "subject": refreshContactGrid$
    });
    if (this._appConfig.hasData('refreshContactGrid$')) {
      this._appConfig.getData('refreshContactGrid$').observable.subscribe(
        (res: any) => {
          console.log("Clear Row Selection Here");
          this.refreshGrid$.next('');
      })
    }
  }

  override doDestroy(): void {
    if (this._appConfig.hasData('refreshContactGrid$')) {
      this._appConfig.removeData('refreshContactGrid$');
    }
  }


  override doPostInit(): void {

  }

  override postFindallInterceptor = (payload: any) => {
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload
    });

    return payload;
  }

}




